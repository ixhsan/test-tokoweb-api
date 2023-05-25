import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LoginButton } from "./components/buttons.component";
import Dashboard from "./dashboard/page";

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
            <header className="flex flex-row-reverse gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow">
              <LoginButton />
            </header>
            <div className="flex flex-col gap-4 p-8 mt-56 justify-center items-center">
              <h4 className="font-bold text-2xl text-black text-center">
                You&apos;re not logged in
              </h4>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
