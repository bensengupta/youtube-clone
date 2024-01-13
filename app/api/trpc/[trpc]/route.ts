import { env } from "@/src/env.mjs";
import { appRouter } from "@/src/server/routers";
import { createTRPCContext } from "@/src/server/utils/trpc-server";
import type { TRPCError } from "@trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

function onError({ path, error }: { path?: string; error: TRPCError }) {
  console.error(`❌ tRPC failed on ${path ?? "<no-path>"}:`, error);
}

const handler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: createTRPCContext,
    onError: env.NODE_ENV === "development" ? onError : undefined,
  });
};

export { handler as GET, handler as POST };
