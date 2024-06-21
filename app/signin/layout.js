"use client";

import { BetaForm } from "@/components/Beta/BetaForm";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const [isBetaAuthorized, setIsBetaAuthorized] = useState(false);

  useEffect(() => {
    const betaPassword = Cookies.get("betaPassword");
    console.log(process.env.NEXT_PUBLIC_BETA_PASSWORD);
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
