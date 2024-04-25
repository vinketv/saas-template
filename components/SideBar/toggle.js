"use client";

// DrawerContext.js
import { createContext, useContext, useState } from "react";

const DrawerContext = createContext();

export function useDrawer() {
  return useContext(DrawerContext);
}

export const DrawerProvider = ({ children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};
