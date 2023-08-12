import { drizzle } from "drizzle-orm/planetscale-serverless";
import { migrate } from "drizzle-orm/planetscale-serverless/migrator";
import { connect } from "@planetscale/database";

import * as AuthSchema from "./schema/auth";
import * as VideoSchema from "./schema/videos";
import { env } from "@/env.mjs";

const connection = connect({
  host: env.DATABASE_HOST,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
});

export const db = drizzle(connection, {
  schema: { ...AuthSchema, ...VideoSchema },
});

if (env.NODE_ENV === "development") {
  migrate(db, { migrationsFolder: "./migrations" }).catch((err) =>
    console.log("Migration error in db/index.ts:", err)
  );
}
