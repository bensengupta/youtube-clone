import { and, eq, placeholder } from "drizzle-orm";
import { nanoid } from "nanoid";
import type { Adapter } from "next-auth/adapters";
import { db } from ".";
import { accounts, sessions, users, verificationTokens } from "./schema/auth";

export const DrizzleAdapter = (): Adapter => {
  return {
    createUser: async ({ name, ...userData }) => {
      const id = crypto.randomUUID();
      await db.insert(users).values({
        id,
        name: name ?? `user-${nanoid()}`,
        ...userData,
      });

      const user = await pGetUserById.execute({ id });
      if (!user) throw new Error("User not found");
      return user;
    },

    getUser: async (id) => {
      const user = await pGetUserById.execute({ id });
      return user ?? null;
    },

    getUserByEmail: async (email) => {
      const user = await pGetUserByEmail.execute({ email });
      return user ?? null;
    },

    getUserByAccount: async ({ provider, providerAccountId }) => {
      const account = await pGetUserByAccount.execute({
        provider,
        providerAccountId,
      });

      return account?.user ?? null;
    },

    updateUser: async ({ id, name, ...data }) => {
      const updateData = name ? { ...data, name } : data;
      await db.update(users).set(updateData).where(eq(users.id, id));
      const user = await pGetUserById.execute({ id });
      if (!user) throw new Error("User not found");
      return user;
    },

    deleteUser: async (id) => {
      await db.delete(users).where(eq(users.id, id));
    },

    linkAccount: async (account) => {
      await db.insert(accounts).values({
        id: crypto.randomUUID(),
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        type: account.type,
        userId: account.userId,
        accessToken: account.access_token,
        expiresAt: account.expires_at,
        idToken: account.id_token,
        refreshToken: account.refresh_token,
        scope: account.scope,
        sessionState: account.session_state,
        tokenType: account.token_type,
      });
    },

    unlinkAccount: async ({ provider, providerAccountId }) => {
      await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.providerAccountId, providerAccountId),
            eq(accounts.provider, provider)
          )
        );
    },

    createSession: async (data) => {
      await db.insert(sessions).values(data);
      const session = await pGetSessionByToken.execute({
        sessionToken: data.sessionToken,
      });
      if (!session) throw new Error("Session not found");
      return session;
    },

    getSessionAndUser: async (sessionToken) => {
      const data = await pGetSessionAndUser.execute({ sessionToken });

      if (!data) return null;
      const { user, ...session } = data;
      return {
        user,
        session,
      };
    },

    updateSession: async (data) => {
      await db
        .update(sessions)
        .set(data)
        .where(eq(sessions.sessionToken, data.sessionToken));
      const session = await pGetSessionByToken.execute({
        sessionToken: data.sessionToken,
      });
      return session ?? null;
    },

    deleteSession: async (sessionToken) => {
      await db.delete(sessions).where(eq(sessions.sessionToken, sessionToken));
    },

    createVerificationToken: async (verificationToken) => {
      await db.insert(verificationTokens).values(verificationToken);
      const token = await pGetVerificationTokenByToken.execute({
        token: verificationToken.token,
      });
      return token ?? null;
    },

    useVerificationToken: async (verificationToken) => {
      const token = await pGetVerificationTokenByToken.execute({
        token: verificationToken.token,
      });

      if (!token) return null;
      await db
        .delete(verificationTokens)
        .where(
          and(
            eq(verificationTokens.token, verificationToken.token),
            eq(verificationTokens.identifier, verificationToken.identifier)
          )
        );
      return token;
    },
  };
};

const pGetUserByEmail = db.query.users
  .findFirst({
    where: (user, { eq }) => eq(user.email, placeholder("email")),
  })
  .prepare();

const pGetUserById = db.query.users
  .findFirst({
    where: (user, { eq }) => eq(user.id, placeholder("id")),
  })
  .prepare();

const pGetUserByAccount = db.query.accounts
  .findFirst({
    where: (account, { eq, and }) =>
      and(
        eq(account.providerAccountId, placeholder("providerAccountId")),
        eq(account.provider, placeholder("provider"))
      ),
    with: {
      user: true,
    },
  })
  .prepare();

const pGetSessionByToken = db.query.sessions
  .findFirst({
    where: (session, { eq }) =>
      eq(session.sessionToken, placeholder("sessionToken")),
  })
  .prepare();

const pGetSessionAndUser = db.query.sessions
  .findFirst({
    where: (session, { eq }) =>
      eq(session.sessionToken, placeholder("sessionToken")),
    with: {
      user: true,
    },
  })
  .prepare();

const pGetVerificationTokenByToken = db.query.verificationTokens
  .findFirst({
    where: (vt, { eq }) => eq(vt.token, placeholder("token")),
  })
  .prepare();
