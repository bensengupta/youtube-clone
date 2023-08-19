import { relations } from "drizzle-orm";
import {
  datetime,
  int,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

export const accounts = mysqlTable(
  "accounts",
  {
    id: varchar("id", { length: 191 }).notNull().primaryKey(),
    userId: varchar("user_id", { length: 191 }).notNull(),
    type: varchar("type", { length: 191 }).notNull(),
    provider: varchar("provider", { length: 191 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 191,
    }).notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: int("expires_at"),
    tokenType: varchar("token_type", { length: 191 }),
    scope: varchar("scope", { length: 191 }),
    idToken: text("id_token"),
    sessionState: varchar("session_state", { length: 191 }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (account) => ({
    providerIndex: uniqueIndex("provider_idx").on(
      account.provider,
      account.providerAccountId
    ),
  })
);

export const sessions = mysqlTable(
  "sessions",
  {
    userId: varchar("user_id", { length: 191 }).notNull(),
    expires: datetime("expires").notNull(),
    sessionToken: varchar("session_token", { length: 191 }).notNull(),
  },
  (session) => ({
    sessionTokenIndex: primaryKey(session.sessionToken),
  })
);

export const verificationTokens = mysqlTable(
  "verification_tokens",
  {
    identifier: varchar("identifier", { length: 191 }).notNull(),
    token: varchar("token", { length: 191 }).notNull(),
    expires: datetime("expires").notNull(),
  },
  (request) => ({
    identifierTokenIndex: uniqueIndex("identifier_token_idx").on(
      request.identifier,
      request.token
    ),
  })
);

export const users = mysqlTable(
  "users",
  {
    id: varchar("id", { length: 191 }).notNull().primaryKey(),
    name: varchar("name", { length: 191 }).notNull(),
    email: varchar("email", { length: 191 }).notNull(),
    emailVerified: timestamp("email_verified"),
    image: varchar("image", { length: 191 }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (user) => ({
    emailIndex: uniqueIndex("email_idx").on(user.email),
  })
);

export const userRelations = relations(users, ({ many }) => ({
  account: many(accounts),
  session: many(sessions),
}));

export const accountRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));
