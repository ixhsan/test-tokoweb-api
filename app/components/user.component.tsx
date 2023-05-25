"use client";

import { useSession } from "next-auth/react";

export const User = () => {
  const { data: session } = useSession();
  // console.log("🚀 ~ CLIENT SESSION", session);

  // if (!session?.user) {

  // }

  return (
    <div className="flex flex-col p-2 w-full outline-dashed">
      <div className="w-1/2">
        <h1 className="text-xl font-bold">Client Session</h1>
        <p className="text-sm font-light text-purple-500 break-all">
          {JSON.stringify(session)}
        </p>
      </div>
      <div className="w-1/2">
    
      </div>
    </div>
  );
};
