import { Home } from "./home";
import { createTRPCCaller } from "@/server/api/root";

export default async function Page() {
  const trpc = await createTRPCCaller();
  const videos = await trpc.videos.list({ page: 1 });

  return <Home videos={videos} />;
}
