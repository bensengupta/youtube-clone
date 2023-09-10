import { relations } from "drizzle-orm";
import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { users } from "./auth";
import { videoUploads } from "./video-uploads";

export const videos = mysqlTable("videos", {
  id: varchar("id", { length: 36 }).notNull().primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  ownerId: varchar("owner_id", { length: 191 }).notNull(),
  videoUploadId: varchar("video_upload_id", { length: 191 }).notNull(),
  length: varchar("length", { length: 32 }).notNull(),
  viewCount: int("view_count").notNull().default(0),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

export const videoRelations = relations(videos, ({ one }) => ({
  owner: one(users, {
    fields: [videos.ownerId],
    references: [users.id],
  }),
  videoUpload: one(videoUploads, {
    fields: [videos.videoUploadId],
    references: [videoUploads.id],
  }),
}));
