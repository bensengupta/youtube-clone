import {
  VideoCardCompact,
  VideoCardCompactSkeleton,
} from "@/src/client/components/video-card-compact";
import { getVideosForList } from "@/src/server/fetchers/videos";
import { Suspense } from "react";
import { VideoSection, VideoSectionSkeleton } from "./video-section";

export default function Page({ params }: { params: { videoId: string } }) {
  return (
    <div className="flex flex-1 justify-center">
      <div className="flex max-w-screen-2xl flex-1 flex-col gap-6 p-6 lg:flex-row">
        <Suspense fallback={<VideoSectionSkeleton />}>
          <VideoSection videoId={params.videoId} />
        </Suspense>
        <aside className="w-96">
          <Suspense fallback={<RelatedVideosSkeleton />}>
            <RelatedVideos />
          </Suspense>
        </aside>
      </div>
    </div>
  );
}

function RelatedVideosSkeleton() {
  const placeholders = Array(15)
    .fill(undefined)
    .map((_, idx) => idx);

  return (
    <div className="flex flex-col">
      {placeholders.map((key) => (
        <VideoCardCompactSkeleton key={key} />
      ))}
    </div>
  );
}

async function RelatedVideos() {
  const videos = await getVideosForList();

  return (
    <div className="flex flex-col">
      {videos.map((video) => (
        <VideoCardCompact key={video.id} video={video} />
      ))}
    </div>
  );
}
