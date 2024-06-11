import { createUser } from "@/app/services/user";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),

    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || "",
      clientSecret: process.env.NAVER_CLIENT_SECRET || "",
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user: { id, name, email } }) {
      if (!name) {
        return false;
      }

      createUser({
        id,
        email: email || "",
        name: name,
        userid: email ? email.split("@")[0] : name,
      });

      return true;
    },
    async session({ session, token }) {
      const user = session?.user;

      if (user && token.sub) {
        session.user = {
          id: token.sub,
          name: user.name,
          email: user.email,
          userid: user.email ? user.email.split("@")[0] : user.name,
          profileimage: "",
        };
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
