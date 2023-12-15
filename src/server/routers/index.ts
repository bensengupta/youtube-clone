import { createTRPCRouter } from "@/src/server/utils/trpc-server";
import { videosRouter } from "./videos";

export const appRouter = createTRPCRouter({
  videos: videosRouter,
});

export type AppRouter = typeof appRouter;
