import {
  FILE_PART_SIZE,
  MAX_VIDEO_SIZE_IN_BYTES,
  VIDEO_VALID_MIMETYPES,
} from "@/src/common/config/shared-constants";
import { VideoProcessingStatus, VideoStatus } from "@/src/common/constants";
import { getVideoWatchUrl } from "@/src/common/utils/urls";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/src/server/utils/trpc-server";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { videos } from "../db/schema/videos";
import {
  completeVideoMultipartUpload,
  createUploadKey,
  getVideoUploadPartPresignedUrls,
  initiateVideoMultipartUpload,
  ObjectPrefix,
} from "../s3";

export const videosRouter = createTRPCRouter({
  initiateVideoUpload: protectedProcedure
    .input(
      z.object({
        filename: z.string(),
        fileSize: z.number().int(),
        contentType: z.enum(VIDEO_VALID_MIMETYPES),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;

      if (input.fileSize > MAX_VIDEO_SIZE_IN_BYTES) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "File too large" });
      }

      const uploadKey = createUploadKey(ObjectPrefix.Video);

      const title = input.filename.split(".")[0]!;

      const video = {
        id: nanoid(),
        title,
        ownerId: userId,
        status: VideoStatus.Draft,
        filename: input.filename,
        uploadKey,
        processingStatus: VideoProcessingStatus.Uploading,
      };

      await ctx.db.insert(videos).values(video);

      const multipartUploadId = await initiateVideoMultipartUpload({
        uploadKey,
        contentType: input.contentType,
      });

      const partSize = FILE_PART_SIZE;
      const numParts = Math.ceil(input.fileSize / partSize);

      const presignedUrls = await getVideoUploadPartPresignedUrls({
        uploadKey,
        multipartUploadId: multipartUploadId,
        numParts,
      });

      return {
        video: {
          ...video,
          url: getVideoWatchUrl(video.id),
        },
        multipartUploadId,
        presignedUrls,
        partSize,
      };
    }),

  completeVideoUpload: protectedProcedure
    .input(
      z.object({
        videoId: z.string(),
        multipartUploadId: z.string(),
        parts: z.array(z.object({ PartNumber: z.number(), ETag: z.string() })),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;

      const video = await ctx.db.query.videos.findFirst({
        where: eq(videos.id, input.videoId),
        columns: { uploadKey: true, ownerId: true },
      });

      if (!video) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No video with the given video id",
        });
      }

      if (video.ownerId !== userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await completeVideoMultipartUpload({
        multipartUploadId: input.multipartUploadId,
        uploadKey: video.uploadKey,
        parts: input.parts,
      });

      await ctx.db
        .update(videos)
        .set({ processingStatus: VideoProcessingStatus.Processing })
        .where(eq(videos.id, input.videoId));
    }),

  updateVideoDetails: protectedProcedure
    .input(
      z.object({
        videoId: z.string(),
        title: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;

      const video = await ctx.db.query.videos.findFirst({
        where: eq(videos.id, input.videoId),
        columns: { uploadKey: true, ownerId: true },
      });

      if (!video) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No video with the given video id",
        });
      }

      if (video.ownerId !== userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await completeVideoMultipartUpload({
        multipartUploadId: input.multipartUploadId,
        uploadKey: video.uploadKey,
        parts: input.parts,
      });

      await ctx.db
        .update(videos)
        .set({ processingStatus: VideoProcessingStatus.Processing })
        .where(eq(videos.id, input.videoId));
    }),
});
