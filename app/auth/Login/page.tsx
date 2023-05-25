"use client";

import React from "react";

const LoginPage = () => {
  return (
    <section id="login">
      <div className="container max-w-7xl mx-auto">
        <form action="" className="w-1/2">
          <input type="email" name="email" placeholder="example@example.com" />
          <input type="password" name="password" placeholder="password" />
          <button>Login</button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
