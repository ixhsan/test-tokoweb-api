import api from "@/utils/api";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Toko Web",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password", placeholder: 'Password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as any;
        const { status, data } = await api.post("login", {
          email,
          password,
        });

        if (status) {
          return data;
        } else return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      // if (user) {
      //   console.log("🚀 ~ SESSION CALLBACK USER", user);
      // }
      // if (token) {
      //   console.log("🚀 ~ SESSION CALLBACK TOKEN", token);
      // }
      // if (session) {
      //   console.log("🚀 ~ SESSION CALLBACK TOKEN", token);
      // }
      session.user = token as any;
      return session;
    },
    async jwt({ token, user, account, profile }) {
      // console.log("🚀 ~ JWT CALLBACK TOKEN", token);

      // if (user) {
      //   console.log("🚀 ############ JWT CALLBACK USER ############", user);
      // }
      // if (account) {
      //   console.log("🚀 ~ JWT CALLBACK ACCOUNT", account);
      // }
      // if (profile) {
      //   console.log("🚀 ~ JWT CALLBACK PROFILE", profile);
      // }
      // Persist the OAuth access_token and or the user id to the token right after signin
      // if (account) {
      //   token.accessToken = account.access_token
      //   token.id = profile.id
      // }
      // return token
      return { ...token, ...user };
    },
  },
};
