"use client";

import {
  FaBars,
  FaChartBar,
  FaCommentAlt,
  FaShoppingCart,
  FaThList,
  FaUser,
} from "react-icons/fa";
import { useDrawer } from "./toggle";

export default function ToggleButton() {
  const { toggleDrawer } = useDrawer();

  return (
    <>
      <button
        onClick={toggleDrawer}
        type="button"
        className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <FaBars />
      </button>
    </>
  );
}

export function SideBar() {
  const { isDrawerOpen } = useDrawer();

  const menuList = [
    {
      name: "Home",
      icon: <FaThList />,
    },
    {
      name: "Kanban",
      icon: <FaChartBar />,
    },
    {
      name: "Inbox",
      icon: <FaCommentAlt />,
    },
    {
      name: "Users",
      icon: <FaUser />,
    },
    {
      name: "Products",
      icon: <FaShoppingCart />,
    },
  ];

  return (
    <>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {menuList.map((feature, id) => (
              <li key={id}>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  {feature.icon}
                  <span className="ms-3">{feature.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}