import { FILE_PART_SIZE } from "@/src/common/config/shared-constants";
import { env } from "@/src/env.mjs";
import { db } from "@/src/server/db";
import { videos } from "@/src/server/db/schema/videos";
import {
  ObjectKind,
  completeVideoMultipartUpload,
  getVideoUploadPartPresignedUrls,
  initiateVideoMultipartUpload,
} from "@/src/server/s3";
import { eq } from "drizzle-orm";
import { z } from "zod";

export async function POST(
  request: Request,
  { params }: { params: { videoId: string; event: string; secret: string } }
) {
  if (params.secret !== env.VIDEO_WORKER_SECRET) {
    return new Response("Invalid secret", { status: 401 });
  }

  switch (params.event) {
    case "request-file-upload":
      return await handleRequestFileUploadEvent(request, params);
    case "finish-file-upload":
      return await handleFinishFileUploadEvent(request, params);
    default:
      return new Response(`Invalid event '${params.event}'`, { status: 400 });
  }
}

const RequestUploadBodySchema = z.object({
  file_name: z.string().max(50),
  content_type: z.string().max(50).optional(),
  file_size: z.number().int(),
});

async function handleRequestFileUploadEvent(
  request: Request,
  params: { videoId: string }
): Promise<Response> {
  const body = (await request.json()) as unknown;
  const input = RequestUploadBodySchema.parse(body);

  const video = await db.query.videos.findFirst({
    where: eq(videos.id, params.videoId),
    columns: { id: true },
  });

  if (!video) {
    return new Response(`Video with videoId '${params.videoId}' not found`, {
      status: 404,
    });
  }

  const uploadKey = `${ObjectKind.Video}/${params.videoId}/${input.file_name}`;

  const multipartUploadId = await initiateVideoMultipartUpload({
    uploadKey,
    contentType: input.content_type,
  });

  const partSize = FILE_PART_SIZE;
  const numParts = Math.ceil(input.file_size / partSize);

  const presignedUrls = await getVideoUploadPartPresignedUrls({
    uploadKey,
    multipartUploadId: multipartUploadId,
    numParts,
  });

  return Response.json({
    multipart_upload_id: multipartUploadId,
    presigned_urls: presignedUrls,
    part_size: partSize,
    upload_key: uploadKey,
  });
}

const FinishUploadBodySchema = z.object({
  multipart_upload_id: z.string(),
  upload_key: z.string(),
  parts: z.array(
    z.object({
      PartNumber: z.number().int(),
      ETag: z.string(),
    })
  ),
});

async function handleFinishFileUploadEvent(
  request: Request,
  params: { videoId: string }
): Promise<Response> {
  const body = (await request.json()) as unknown;
  const input = FinishUploadBodySchema.parse(body);

  await completeVideoMultipartUpload({
    multipartUploadId: input.multipart_upload_id,
    uploadKey: input.upload_key,
    parts: input.parts,
  });

  return new Response("Upload successful", { status: 201 });
}
