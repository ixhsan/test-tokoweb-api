import React from "react";
import { LoginButton } from "../components/buttons.component";

const Unauthenticated = () => {
  return (
    <div className="flex flex-col justify-center items-center p-4 mt-20 max-w-7xl gap-4">
      <h1 className="text-lg text-red-400 font-bold text-center">
        You are not logged in
      </h1>
      <LoginButton />
    </div>
  );
};

export default Unauthenticated;
