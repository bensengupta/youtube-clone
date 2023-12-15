import { getVideos } from "@/src/server/fetchers/videos";
import { Watch } from "./watch";

export default async function Page({
  params,
}: {
  params: { videoId: string };
}) {
  console.log(params.videoId);
  const video = await getVideos();
  return <Watch video={video[0]} />;
}
