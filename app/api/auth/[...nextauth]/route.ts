import { authOptions } from "@/src/server/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions) as () => unknown;

export { handler as GET, handler as POST };
