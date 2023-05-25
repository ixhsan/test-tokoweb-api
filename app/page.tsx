import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LoginButton } from "./components/buttons.component";
import Dashboard from "./dashboard/page";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log("🚀 ~ SERVER SESSION", session);

  return (
    <main>
      <div className="container max-w-7xl mx-auto">
        {session?.user ? (
          <>
            {/* <Dashboard /> */}
            <Dashboard />
          </>
        ) : (
          <div className="flex flex-col gap-4 p-8 mt-56 justify-center items-center">
            <div className="w-1/2">
              <div className="flex flex-col gap-4 w-full bg-gray-200 p-10 justify-center items-center rounded-2xl">
                <h4 className="font-bold text-2xl text-black text-center">
                  You&apos;re not logged in
                </h4>
                <LoginButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
