import {
  VideoCard,
  VideoCardSkeleton,
} from "@/src/client/components/video-card";
import { getVideosForList } from "@/src/server/fetchers/videos";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="relative">
      <main className="flex flex-row flex-wrap justify-center gap-x-4 gap-y-8 p-5">
        <Suspense fallback={<HomePageSkeleton />}>
          <HomePage />
        </Suspense>
      </main>
    </div>
  );
}

async function HomePage() {
  const videos = await getVideosForList();

  return (
    <>
      {videos.map((video) => (
        <HomeVideoCardContainer key={video.id}>
          <VideoCard video={video} />
        </HomeVideoCardContainer>
      ))}
    </>
  );
}

function HomePageSkeleton() {
  const VIDEO_PLACEHOLDERS = Array(24)
    .fill(undefined)
    .map((_, idx) => idx);
  return (
    <>
      {VIDEO_PLACEHOLDERS.map((id) => (
        <HomeVideoCardContainer key={id}>
          <VideoCardSkeleton />
        </HomeVideoCardContainer>
      ))}
    </>
  );
}

function HomeVideoCardContainer({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-w-[320px] flex-1 md:max-w-[360px]">{children}</div>
  );
}
