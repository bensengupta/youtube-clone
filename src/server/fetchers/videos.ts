import {
  getR2FileUrl,
  getUserChannelUrl,
  getVideoWatchUrl,
} from "@/src/common/utils/urls";
import { sleep } from "@/src/common/utils/utils";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { videos as videosSchema } from "../db/schema/videos";
import { ObjectKind } from "../s3";

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
  duration: number | null;
}

export async function getVideosForList(): Promise<VideoFragmentForList[]> {
  // simulate network latency to test loading skeletons
  await sleep(500);

  const videos = await db.query.videos.findMany({
    with: {
      owner: { columns: { id: true, name: true, image: true } },
    },
    columns: {
      id: true,
      title: true,
      publishedAt: true,
      viewCount: true,
      duration: true,
    },
  });

  const videosWithThumbnails: VideoFragmentForList[] = videos.map((video) => ({
    id: video.id,
    title: video.title,
    viewCount: video.viewCount,
    publishedAt: video.publishedAt,
    url: getVideoWatchUrl(video.id),
    thumbnailUrl: getR2FileUrl(`${ObjectKind.Video}/${video.id}/thumbnail.jpg`),
    owner: {
      id: video.owner.id,
      name: video.owner.name,
      url: getUserChannelUrl(video.owner.id),
      thumbnailUrl: "https://picsum.photos/id/237/200/200",
    },
    duration: video.duration,
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
    },
    columns: {
      id: true,
      title: true,
      publishedAt: true,
      viewCount: true,
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
    dashManifestUrl: getR2FileUrl(
      `${ObjectKind.Video}/${video.id}/manifest.mpd`
    ),
    hlsManifestUrl: getR2FileUrl(
      `${ObjectKind.Video}/${video.id}/manifest.m3u8`
    ),
    thumbnailUrl: getR2FileUrl(`${ObjectKind.Video}/${video.id}/thumbnail.jpg`),
    owner: {
      name: video.owner.name,
      url: getUserChannelUrl(video.owner.id),
      thumbnailUrl: "https://picsum.photos/id/237/200/200",
      subscriberCount: video.owner.subscriberCount,
    },
  };
}

export type VideoFragmentForWatch = NonNullable<
  Awaited<ReturnType<typeof getVideoForWatch>>
>;
