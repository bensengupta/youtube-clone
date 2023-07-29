import { createTRPCCaller } from "@/server/api/root";
import { Watch } from "./watch";

export default async function Page({
  params,
}: {
  params: { videoId: string };
}) {
  const trpc = await createTRPCCaller();
  const video = await trpc.videos.getVideoById(params.videoId);
  return <Watch video={video} />;
}
