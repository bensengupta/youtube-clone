import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";
import { Pool } from "@neondatabase/serverless";
import { env } from "@/env.mjs";

const pool = new Pool({ connectionString: env.NEON_CONNECTION_STRING });

export const db = drizzle(pool, { schema });
