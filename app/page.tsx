import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LoginButton } from "./components/buttons.component";
import Dashboard from "./dashboard/page";
import Unauthenticated from "./dashboard/unauthenticated";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <div className="container max-w-7xl mx-auto">
        {session?.user ? (
          <>
            <Dashboard />
          </>
        ) : (
          <>
            <Unauthenticated />
          </>
        )}
      </div>
    </main>
  );
}
