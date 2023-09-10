import { relations } from "drizzle-orm";
import { int, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const accounts = sqliteTable(
  "accounts",
  {
    id: text("id").notNull().primaryKey(),
    userId: text("user_id").notNull(),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: int("expires_at"),
    tokenType: text("token_type"),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
    createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  },
  (account) => ({
    providerIndex: uniqueIndex("provider_idx").on(
      account.provider,
      account.providerAccountId
    ),
  })
);

export const sessions = sqliteTable("sessions", {
  sessionToken: text("session_token").notNull().primaryKey(),
  userId: text("user_id").notNull(),
  expires: text("expires").notNull(),
});

export const verificationTokens = sqliteTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: text("expires").notNull(),
  },
  (request) => ({
    identifierTokenIndex: uniqueIndex("identifier_token_idx").on(
      request.identifier,
      request.token
    ),
  })
);

export const users = sqliteTable(
  "users",
  {
    id: text("id").notNull().primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    emailVerified: text("email_verified"),
    image: text("image"),
    createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
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
