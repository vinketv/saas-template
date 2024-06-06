import { Avatar } from "@/components/Auth/Button";
import ToggleButton from "@/components/Dashboard/SideBar/index";
import Image from "next/image";
import Link from "next/link";

export const NavDashboard = () => {
  // const spanPro = (
  //   <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
  //     Pro
  //   </span>
  // );

  // const spanNumber = (
  //   <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
  //     3
  //   </span>
  // );

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <ToggleButton></ToggleButton>
              <Link
                href="/"
                className="flex items-center font-display text-2xl ml-4"
              >
                <Image
                  src="/icon.png"
                  width={36}
                  height={36}
                  quality={100}
                  alt="logo"
                ></Image>
                <p className="hidden sm:block font-medium ml-1 text-black ">
                  {process.env.NAME}
                </p>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center mr-10">
                <Avatar></Avatar>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
