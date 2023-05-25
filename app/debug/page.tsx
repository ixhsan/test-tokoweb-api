import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "../components/buttons.component";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { User } from "../components/user.component";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log("🚀 ~ SERVER SESSION", session);

  return (
    <main>
      <div className="container max-w-7xl mx-auto my-20">
        {session?.user ? (
          <div className="flex flex-col gap-4 justify-center items-center">
            <>
              <div className="flex flex-row gap-8">
                <LogoutButton />
                <ProfileButton />
              </div>
              <div className="outline-dashed flex flex-col p-8 gap-4 w-3/4 mx-auto">
                <div className="flex flex-col p-2 w-[40vw] outline-dashed h-auto">
                  <h1 className="text-xl font-bold">Server Session</h1>
                  <p className="text-sm font-light text-purple-500 break-all">
                    {JSON.stringify(session)}
                  </p>
                </div>
                <User />
              </div>
            </>
          </div>
        ) : (
          <div className="flex flex-col gap-4 justify-center items-center">
            <LoginButton />
            <RegisterButton />
          </div>
        )}
      </div>
    </main>
  );
}
