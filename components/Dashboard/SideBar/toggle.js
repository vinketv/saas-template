"use client";

// DrawerContext.js
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const DrawerContext = createContext();

export function useDrawer() {
  return useContext(DrawerContext);
}

export const DrawerProvider = ({ children }) => {
  const pathname = usePathname();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};
