import { auth } from "@/auth";

export default async function Dashboard() {
  const session = await auth();

  return (
    <>
      <div className="flex items-center justify-start h-full mb-6 bg-white shadow-md rounded-lg">
        <div className="flex items-center justify-center py-4 ml-4">
          <div className="flex flex-row justify-center items-center gap-4">
            <img
              className="rounded-full w-20 h-20"
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
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="flex items-center justify-center h-24 bg-white shadow-md rounded-lg">
          <p className="text-2xl text-gray-400 dark:text-gray-500"></p>
        </div>
        <div className="flex items-center justify-center h-24 bg-white shadow-md rounded-lg">
          <p className="text-2xl text-gray-400 dark:text-gray-500"></p>
        </div>
        <div className="flex items-center justify-center h-24 bg-white shadow-md rounded-lg">
          <p className="text-2xl text-gray-400 dark:text-gray-500"></p>
        </div>
      </div>
    </>
  );
}
