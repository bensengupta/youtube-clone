import { createTRPCContext, createTRPCRouter } from "@/server/api/trpc";
import { videosRouter } from "./routers/videos";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  videos: videosRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export async function createTRPCCaller() {
  return appRouter.createCaller(await createTRPCContext());
}
