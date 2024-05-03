"use client";

// toggle.js
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const DrawerContext = createContext();

export function useDrawer() {
  return useContext(DrawerContext);
}

export const DrawerProvider = ({ children }) => {
  const pathname = usePathname();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [userData, setUserData] = useState({});

  const toggleDrawer = (user) => {
    setDrawerOpen(!isDrawerOpen);
    if (user) setUserData(user);
  };

  useEffect(() => {
    setDrawerOpen(false);
    setUserData({}); // Réinitialiser les données de l'utilisateur lorsque vous naviguez
  }, [pathname]);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawer, userData }}>
      {children}
    </DrawerContext.Provider>
  );
};
