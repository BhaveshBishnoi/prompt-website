import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.provider = account.provider;
      }
      if (profile && typeof profile === "object") {
        // Persist minimal profile details for convenience
        const anyProfile = profile as Record<string, unknown>;
        if (typeof anyProfile.name === "string") token.name = anyProfile.name;
        if (typeof anyProfile.avatar_url === "string") token.picture = anyProfile.avatar_url as string;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = session.user ?? {} as any;
      if (token && typeof token === "object") {
        (session.user as any).name = (token as any).name ?? session.user?.name;
        (session.user as any).image = (token as any).picture ?? session.user?.image;
        (session as any).provider = (token as any).provider;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};


