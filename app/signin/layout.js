"use client";

import { BetaForm } from "@/components/Beta/BetaForm";
import Cookies from "js-cookie";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isBetaAuthorized, setIsBetaAuthorized] = useState(false);

  useEffect(() => {
    const betaPassword = Cookies.get("betaPassword");
    if (
      process.env.NEXT_PUBLIC_BETA_MODE === "true" &&
      betaPassword === process.env.NEXT_PUBLIC_BETA_PASSWORD
    ) {
      setIsBetaAuthorized(true);
    }
  }, []);

  if (process.env.NEXT_PUBLIC_BETA_MODE === "true" && !isBetaAuthorized) {
    return <BetaForm setAuthorize={setIsBetaAuthorized} />;
  }

  return <>{children}</>;
}
