import { VideoCard } from "@/components/video-card";
import type { VideoListItem } from "@/ts/types";
import { nanoid } from "nanoid";

const DEFAULT_VIDEOS = Array(24).fill(undefined) as undefined[];

interface HomeProps {
  videos?: VideoListItem[];
}

export function Home(props: HomeProps) {
  const { videos = DEFAULT_VIDEOS } = props;
  return (
    <div className="relative">
      <main className="flex flex-row flex-wrap justify-center gap-x-4 gap-y-8 p-5">
        {videos.map((video) => (
          <div
            key={video ? video.id : nanoid()}
            className="flex min-w-[320px] flex-1 md:max-w-[360px]"
          >
            <VideoCard video={video} />
          </div>
        ))}
      </main>
    </div>
  );
}
