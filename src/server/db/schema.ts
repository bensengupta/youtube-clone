import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id").notNull().primaryKey(),
  username: varchar("username", { length: 40 }).notNull(),
  password: varchar("password", { length: 100 }).notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
