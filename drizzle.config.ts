import type { Config } from "drizzle-kit";

export default {
  schema: "./src/server/db/schema/*",
  out: "./migrations",
} satisfies Config;
