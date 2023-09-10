import { mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const videoUploads = mysqlTable("video-uploads", {
  id: varchar("id", { length: 36 }).notNull().primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
