import { VideoProcessingStatus } from "@/src/common/constants";
import { env } from "@/src/env.mjs";
import { db } from "@/src/server/db";
import { videos } from "@/src/server/db/schema/videos";
import { eq } from "drizzle-orm";
import { z } from "zod";

export async function POST(
  request: Request,
  { params }: { params: { event: string; secret: string } }
) {
  if (params.secret !== env.VIDEO_WORKER_SECRET) {
    return new Response("Invalid secret", { status: 401 });
  }

  switch (params.event) {
    case "complete":
      return await handleCompleteEvent(request);
    default:
      return new Response(`Invalid event '${params.event}'`, { status: 400 });
  }
}

const RequestUploadBodySchema = z.object({
  video_id: z.string().max(50),
  duration: z.number().int(),
});

async function handleCompleteEvent(request: Request): Promise<Response> {
  const body = (await request.json()) as unknown;
  const input = RequestUploadBodySchema.parse(body);

  await db
    .update(videos)
    .set({
      processingStatus: VideoProcessingStatus.Idle,
      duration: input.duration,
    })
    .where(eq(videos.id, input.video_id));

  return new Response("OK");
}
