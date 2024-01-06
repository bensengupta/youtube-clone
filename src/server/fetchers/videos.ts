import {
  getUserChannelUrl,
  getVideoFileUrl,
  getVideoWatchUrl,
} from "@/src/common/utils/urls";
import { sleep } from "@/src/common/utils/utils";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { videos as videosSchema } from "../db/schema/videos";

export interface OwnerFragment {
  name: string;
  url: string;
  thumbnailUrl: string;
  badge?: "verified";
}

export interface VideoFragmentForList {
  id: string;
  title: string;
  thumbnailUrl: string;
  url: string;
  owner: OwnerFragment;
  viewCount: number;
  publishedAt: Date;
  metadata: {
    length: string;
  } | null;
}

export async function getVideosForList(): Promise<VideoFragmentForList[]> {
  // simulate network latency to test loading skeletons
  await sleep(500);

  const videos = await db.query.videos.findMany({
    with: {
      owner: { columns: { id: true, name: true, image: true } },
      metadata: { columns: { length: true } },
    },
    columns: { id: true, title: true, publishedAt: true, viewCount: true },
  });

  const videosWithThumbnails: VideoFragmentForList[] = videos.map((video) => ({
    id: video.id,
    title: video.title,
    viewCount: video.viewCount,
    publishedAt: video.publishedAt,
    url: getVideoWatchUrl(video.id),
    thumbnailUrl: "http://dummyimage.com/720x404.png/cc0000/ffffff",
    owner: {
      id: video.owner.id,
      name: video.owner.name,
      url: getUserChannelUrl(video.owner.id),
      thumbnailUrl: "https://picsum.photos/id/237/200/200",
    },
    metadata: video.metadata,
  }));

  return videosWithThumbnails;
}

export async function getVideoForWatch(id: string) {
  // simulate network latency to test loading skeletons
  await sleep(1000);

  const video = await db.query.videos.findFirst({
    with: {
      owner: {
        columns: { id: true, name: true, image: true, subscriberCount: true },
      },
      metadata: { columns: { length: true } },
    },
    columns: {
      id: true,
      title: true,
      publishedAt: true,
      viewCount: true,
      uploadKey: true,
    },
    where: eq(videosSchema.id, id),
  });

  if (!video) {
    return video;
  }

  return {
    id: video.id,
    title: video.title,
    viewCount: video.viewCount,
    publishedAt: video.publishedAt,
    url: getVideoWatchUrl(video.id),
    fileUrl: getVideoFileUrl(video.uploadKey),
    thumbnailUrl: "http://dummyimage.com/720x404.png/cc0000/ffffff",
    owner: {
      name: video.owner.name,
      url: getUserChannelUrl(video.owner.id),
      thumbnailUrl: "https://picsum.photos/id/237/200/200",
      subscriberCount: video.owner.subscriberCount,
    },
    metadata: video.metadata,
  };
}

export type VideoFragmentForWatch = NonNullable<
  Awaited<ReturnType<typeof getVideoForWatch>>
>;
