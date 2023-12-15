import {
  FILE_PART_SIZE,
  MAX_VIDEO_SIZE_IN_BYTES,
  VIDEO_VALID_MIMETYPES,
} from "@/src/common/config/shared-constants";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/src/server/utils/trpc-server";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { pendingUploads } from "../db/schema/uploads";
import {
  ObjectPrefix,
  completeVideoMultipartUpload,
  createUploadKey,
  getVideoUploadPartPresignedUrls,
  initiateVideoMultipartUpload,
} from "../s3";

export const videosRouter = createTRPCRouter({
  initiateVideoUpload: protectedProcedure
    .input(
      z.object({
        fileSize: z.number().int(),
        contentType: z.enum(VIDEO_VALID_MIMETYPES),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { fileSize, contentType } = input;
      const userId = ctx.session.user.id;

      if (fileSize > MAX_VIDEO_SIZE_IN_BYTES) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "File too large" });
      }

      const uploadKey = createUploadKey(ObjectPrefix.Video);

      await ctx.db.insert(pendingUploads).values({
        key: uploadKey,
        ownerId: userId,
      });

      const multipartUploadId = await initiateVideoMultipartUpload({
        uploadKey,
        contentType,
      });

      const partSize = FILE_PART_SIZE;
      const numParts = Math.ceil(fileSize / partSize);

      const presignedUrls = await getVideoUploadPartPresignedUrls({
        uploadKey,
        multipartUploadId: multipartUploadId,
        numParts,
      });

      return {
        uploadKey,
        multipartUploadId,
        presignedUrls,
        partSize,
      };
    }),

  completeVideoUpload: protectedProcedure
    .input(
      z.object({
        uploadKey: z.string(),
        multipartUploadId: z.string(),
        parts: z.array(z.object({ PartNumber: z.number(), ETag: z.string() })),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { uploadKey, multipartUploadId, parts } = input;
      const userId = ctx.session.user.id;

      const pendingUpload = await ctx.db.query.pendingUploads.findFirst({
        where: eq(pendingUploads.key, uploadKey),
        columns: { ownerId: true },
      });

      if (!pendingUpload) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No pending upload with the given key",
        });
      }

      if (pendingUpload.ownerId !== userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await completeVideoMultipartUpload({
        uploadKey,
        multipartUploadId,
        parts,
      });

      return { uploadKey };
    }),
});
