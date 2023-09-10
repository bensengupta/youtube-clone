import { mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const pendingUploads = mysqlTable("pending-uploads", {
  id: varchar("id", { length: 36 }).notNull().primaryKey(),
  key: varchar("key", { length: 64 }).notNull().primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
