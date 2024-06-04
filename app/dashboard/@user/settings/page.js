import { auth } from "@/auth";
import { Button_Manage } from "@/components/Button/Button";
import { ToggleButton } from "@/components/Button/ButtonEdit";
import { prisma } from "@/lib/prisma";

export default async function Page() {
  const session = await auth();

  const data = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      plan: true,
      username: true,
      email: true,
      image: true,
    },
  });

  return (
    <>
      <div className="grid grid-cols-1 mb-8">
        <div className="flex flex-row items-center justify-between gap-4">
          <h2 className="text-3xl font-bold">Settings</h2>
          <ToggleButton user={data} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <div className="flex flex-row justify-start items-center gap-4 py-4 bg-white rounded-lg shadow-md">
          <div className="flex flex-row items-center gap-4 mx-6 w-full">
            <img
              className="rounded-full w-16 h-16 sm:w-20 sm:h-20"
              src={data.image ?? "https://source.boringavatars.com/marble/120"}
              alt="User Avatar"
            />
            <div className="flex flex-col">
              <h3 className="text-xl font-bold">{data.username}</h3>
              <p className="text-sm text-slate-400">{data.email}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-start items-center gap-4 py-4 bg-white rounded-lg shadow-md">
          <div className="flex flex-row justify-between items-center gap-4 mx-6 w-full">
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold">{data.plan}</h3>
              <p className="text-sm text-slate-400">Plan</p>
            </div>
            <div>
              {process.env.SUBCRIPTION != "true" ? null : <Button_Manage />}
            </div>
          </div>
        </div>
      </div>

      {/* support */}

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <div className="flex flex-row justify-start items-center gap-4 py-4 pl-4 bg-white rounded-lg shadow-md"></div>
        <div className="flex flex-row justify-start items-center gap-4 py-4 pl-4 bg-white rounded-lg shadow-md"></div>
      </div> */}
    </>
  );
}
