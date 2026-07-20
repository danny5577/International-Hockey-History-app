import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      return isOnAdmin ? isLoggedIn : true;
    },
  },
  providers: [], // deliberately empty — see lib/auth.ts
} satisfies NextAuthConfig;