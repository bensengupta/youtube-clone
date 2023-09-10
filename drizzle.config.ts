import "dotenv/config";

import { env } from "@/env.mjs";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/server/db/schema/*",
  out: "./migrations",
  driver: "libsql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;
