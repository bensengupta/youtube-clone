import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import { env } from "@/src/env.mjs";
import * as AuthSchema from "./schema/auth";
import * as VideoSchema from "./schema/videos";

const connection = connect({
  url: env.DATABASE_URL,
});

export const db = drizzle(connection, {
  schema: {
    ...AuthSchema,
    ...VideoSchema,
  },
});

// if (env.NODE_ENV === "development") {
//   await migrate(db, { migrationsFolder: "./migrations" }).catch((err) =>
//     console.error("Migration error in src/server/db/index.ts:", err)
//   );
// }
