import { auth } from "@/auth";
import { Button_Manage } from "@/components/Button/Button";

export default async function Page() {
  const session = await auth();

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Settings</h2>
      </div>

      <div className="flex items-center justify-start h-24 mb-8 bg-white shadow-md rounded-lg">
        <div className="flex flex-row justify-center items-center gap-4 py-4 ml-4">
          <img
            className="rounded-full w-16 h-16 sm:w-20 sm:h-20"
            src={
              session?.user.image ??
              "https://source.boringavatars.com/marble/120"
            }
            alt="User Avatar"
          />
          <div className="flex flex-col">
            <h3 className="text-xl font-bold">{session?.user.username}</h3>
            <p className="text-sm text-slate-400">{session?.user.email}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-around h-24 mb-8 bg-white shadow-md rounded-lg">
        <div className="flex flex-row justify-between items-center gap-4 py-4 ml-4 mr-4 w-full">
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold">{session?.user.plan}</h3>
            <p className="text-sm text-slate-400">Plan</p>
          </div>
          <div>
            <Button_Manage />
          </div>
        </div>
      </div>
    </>
  );
}
