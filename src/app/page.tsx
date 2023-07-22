import { VideoCardSkeleton } from "@/components/video-card";
import { nanoid } from "nanoid";

const sampleVideos = [
  {
    title: "Trip to the Toronto zoo",
  },
  {
    title: "Lego star wars unboxing",
  },
  {
    title: "Sound of freedom movie review",
  },
  {
    title: "Debate on political issues",
  },
];

const videos = [
  ...sampleVideos,
  ...sampleVideos,
  ...sampleVideos,
  ...sampleVideos,
  ...sampleVideos,
  ...sampleVideos,
].map((v) => ({ id: nanoid(), ...v }));

export default function Home() {
  return (
    <div className="relative">
      <main className="flex flex-row flex-wrap justify-center gap-x-4 gap-y-12 p-5">
        {videos.map(({ id, title }) => (
          <VideoCardSkeleton key={id} />
        ))}
      </main>
    </div>
  );
}
