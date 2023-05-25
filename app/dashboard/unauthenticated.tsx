import React from "react";
import { LoginButton } from "../components/buttons.component";

const Unauthenticated = () => {
  return (
    <>
      <header className="flex flex-row-reverse gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow">
        <LoginButton />
      </header>
      <div className="flex flex-col gap-4 p-8 mt-56 justify-center items-center">
        <h4 className="font-bold text-2xl text-black text-center">
          You&apos;re not logged in
        </h4>
      </div>
    </>
  );
};

export default Unauthenticated;
