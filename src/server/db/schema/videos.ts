import {
  VideoProcessingStatus,
  VideoStatus,
  VideoVisibility,
} from "@/src/common/constants";
import { relations } from "drizzle-orm";
import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { users } from "./auth";

export const videos = mysqlTable("videos", {
  id: varchar("id", { length: 36 }).notNull().primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  status: varchar("status", {
    length: 15,
    enum: [VideoStatus.Published, VideoStatus.Draft],
  }).notNull(),
  processingStatus: varchar("processing_status", {
    length: 15,
    enum: [
      VideoProcessingStatus.Uploading,
      VideoProcessingStatus.Processing,
      VideoProcessingStatus.Idle,
    ],
  }).notNull(),
  duration: int("duration"),
  visibility: varchar("visibility", {
    length: 15,
    enum: [VideoVisibility.Public, VideoVisibility.Unlisted],
  })
    .notNull()
    .default(VideoVisibility.Unlisted),
  filename: varchar("filename", { length: 256 }).notNull(),
  ownerId: varchar("owner_id", { length: 191 }).notNull(),
  viewCount: int("view_count").notNull().default(0),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  metadataId: varchar("metadata_id", { length: 36 }),
});

export const videoRelations = relations(videos, ({ one }) => ({
  owner: one(users, {
    fields: [videos.ownerId],
    references: [users.id],
  }),
}));
