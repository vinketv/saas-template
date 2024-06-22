import { auth } from "@/auth.js";
import { NavDashboard } from "@/components/Dashboard/NavDashboard/NavDashboard";
import { SideBar } from "@/components/Dashboard/SideBar/index";
import { DrawerProvider } from "@/components/Dashboard/SideBar/toggle";
import { Cards } from "@/components/Front/Pricing/card";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Dashboard",
  description: "Generated by create next app",
};

export default async function ProfileLayout({ children }) {
  const session = await auth();
  const data = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      plan: true,
      role: true,
    },
  });

  if (
    data.plan != "BETA" &&
    process.env.SUBCRIPTION === "false" &&
    process.env.NEXT_PUBLIC_BETA_MODE === "true"
  ) {
    try {
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          plan: "BETA",
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  } else if (
    data.plan === "BETA" &&
    process.env.SUBCRIPTION === "true" &&
    process.env.NEXT_PUBLIC_BETA_MODE === "false"
  ) {
    try {
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          plan: null,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <>
      {process.env.SUBCRIPTION === "true" ? (
        data.plan != null && data.plan != "BETA" ? (
          <div className="flex flex-col min-h-screen bg-slate-100">
            <DrawerProvider>
              <NavDashboard></NavDashboard>
              <SideBar role={data.role}></SideBar>
            </DrawerProvider>
            <div className=" flex-grow p-4 sm:ml-64">
              {/* <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"> */}
              <div className="p-2 sm:p-4 rounded-lg dark:border-gray-700 mt-14">
                {children}
              </div>
            </div>
          </div>
        ) : (
          <Cards></Cards>
        )
      ) : (
        <div className="flex flex-col min-h-screen bg-slate-100">
          <DrawerProvider>
            <NavDashboard></NavDashboard>
            <SideBar role={data.role}></SideBar>
          </DrawerProvider>
          <div className=" flex-grow p-4 sm:ml-64">
            {/* <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"> */}
            <div className="p-2 sm:p-4 rounded-lg dark:border-gray-700 mt-14">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
