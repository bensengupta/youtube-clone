import { VideoCard } from "@/components/video-card";
import { getVideos } from "@/server/fetchers/videos";
import { HomeLayout, HomeVideoCardContainer } from "./components";

export default async function Page() {
  const videos = await getVideos();

  return (
    <HomeLayout>
      {videos.map((video) => (
        <HomeVideoCardContainer key={video.id}>
          <VideoCard video={video} />
        </HomeVideoCardContainer>
      ))}
    </HomeLayout>
  );
}
