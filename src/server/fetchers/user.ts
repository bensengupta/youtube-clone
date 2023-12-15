import { authOptions } from "@/src/server/auth";
import { getServerSession } from "next-auth/next";

export const getAuthSession = () => {
  return getServerSession(authOptions);
};

export async function getCurrentUser() {
  const session = await getAuthSession();
  return session?.user;
}
