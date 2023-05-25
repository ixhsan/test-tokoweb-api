import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      data: {
        id: number;
        name: string;
        email: string;
        email_verified_at: string;
        created_at: string;
        updated_at: string;
        token: string;
      };
      pagination: null;
      error: null;
      iat: number;
      exp: number;
      jti: string;
    };
  }
}
