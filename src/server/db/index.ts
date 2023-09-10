import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";

import { env } from "@/env.mjs";
import { createClient } from "@libsql/client";
import * as AuthSchema from "./schema/auth";
import * as VideoUploadSchema from "./schema/video-uploads";
import * as VideoSchema from "./schema/videos";

const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, {
  schema: { ...AuthSchema, ...VideoSchema, ...VideoUploadSchema },
});

if (env.NODE_ENV === "development") {
  await migrate(db, { migrationsFolder: "./migrations" }).catch((err) =>
    console.error("Migration error in src/server/db/index.ts:", err)
  );
}
