"use client";

import Loading from "./loading";
import Unauthenticated from "./unauthenticated";
import { useSession } from "next-auth/react";

import Authenticated from "./authenticated";

const Dashboard = () => {
  const { data: session, status } = useSession();
  

  if (!session?.user.data.token && status === "unauthenticated") {
    return (
      <>
        <Unauthenticated />
      </>
    );
  }

  if (status === "loading") {
    return (
      <>
        <Loading />;
      </>
    );
  } else {
    return (
      <Authenticated/>
    );

  }

};

export default Dashboard;
