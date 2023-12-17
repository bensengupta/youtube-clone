import "dotenv/config";

import { env } from "@/src/env.mjs";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/server/db/schema/*",
  out: "./migrations",
  driver: "mysql2",
  dbCredentials: {
    uri: env.DATABASE_URL,
  },
} satisfies Config;
