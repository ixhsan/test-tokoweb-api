"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <div className="mr-5">
      <button className="p-4 bg-blue-500 text-white rounded-lg px-8" onClick={() => signIn()}>Sign in</button>
    </div>
  );
};

export const LogoutButton = () => {
  return (
    <div className="mr-5">
      <button className="px-6 py-4 bg-orange-500 text-white rounded-lg" onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};
