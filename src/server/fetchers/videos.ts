import { sleep } from "@/src/common/utils/utils";
import { db } from "../db";
import { getBaseUrl } from "../utils/url";

export interface OwnerFragment {
  name: string;
  url: string;
  thumbnailUrl: string;
  badge?: "verified";
}

export interface VideoFragment {
  id: string;
  title: string;
  thumbnailUrl: string;
  url: string;
  owner: OwnerFragment;
  length: string;
  viewCount: number;
  publishedAt: Date;
}

export async function getVideos(): Promise<VideoFragment[]> {
  await sleep(2000);

  const videos = await db.query.videos.findMany({ with: { owner: true } });

  const videosWithThumbnails: VideoFragment[] = videos.map((video) => ({
    ...video,
    url: `${getBaseUrl()}/watch/${video.id}`,
    thumbnailUrl: "http://dummyimage.com/720x404.png/cc0000/ffffff",
    owner: {
      ...video.owner,
      url: `${getBaseUrl()}/channel/${video.owner.id}`,
      thumbnailUrl: "https://picsum.photos/id/237/200/200",
    },
  }));

  return videosWithThumbnails;
}
