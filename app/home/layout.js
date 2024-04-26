import { NavDashboard } from "@/components/NavDashboard/NavDashboard";
import { DrawerProvider } from "@/components/SideBar/toggle";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function ProfileLayout({ children }) {
  return (
    <>
      <DrawerProvider>
        <NavDashboard></NavDashboard>
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            {children}
          </div>
        </div>
      </DrawerProvider>
    </>
  );
}