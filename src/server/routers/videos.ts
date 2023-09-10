import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/utils/trpc-server";

export const videosRouter = createTRPCRouter({
  getUploadPresignedUrl: protectedProcedure.query(() => {}),
});
