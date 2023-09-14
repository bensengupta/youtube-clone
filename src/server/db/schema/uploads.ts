import { relations } from "drizzle-orm";
import { mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { users } from "./auth";

export const pendingUploads = mysqlTable("pending_uploads", {
  key: varchar("key", { length: 128 }).primaryKey(),
  ownerId: varchar("user_id", { length: 191 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const pendingUploadRelations = relations(pendingUploads, ({ one }) => ({
  owner: one(users, {
    fields: [pendingUploads.ownerId],
    references: [users.id],
  }),
}));
