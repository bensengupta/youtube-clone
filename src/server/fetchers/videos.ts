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
  viewCount: number;
  publishedAt: Date;
  metadata: {
    length: string;
  } | null;
}

export async function getVideos(): Promise<VideoFragment[]> {
  const videos = await db.query.videos.findMany({
    with: {
      owner: { columns: { id: true, name: true, image: true } },
      metadata: { columns: { length: true } },
    },
    columns: { id: true, title: true, publishedAt: true, viewCount: true },
  });

  const videosWithThumbnails: VideoFragment[] = videos.map((video) => ({
    id: video.id,
    title: video.title,
    viewCount: video.viewCount,
    publishedAt: video.publishedAt,
    url: `${getBaseUrl()}/watch/${video.id}`,
    thumbnailUrl: "http://dummyimage.com/720x404.png/cc0000/ffffff",
    owner: {
      id: video.owner.id,
      name: video.owner.name,
      url: `${getBaseUrl()}/channel/${video.owner.id}`,
      thumbnailUrl: "https://picsum.photos/id/237/200/200",
    },
    metadata: video.metadata,
  }));

  return videosWithThumbnails;
}
