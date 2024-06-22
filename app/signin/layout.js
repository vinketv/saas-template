import { BetaForm } from "@/components/Beta/BetaForm";
import { cookies } from "next/headers";

export default function RootLayout({ children }) {
  const cookieStore = cookies();
  const betaPasswordCookie = cookieStore.get("betaPassword");
  const betaPassword = betaPasswordCookie ? betaPasswordCookie.value : null;

  if (
    process.env.NEXT_PUBLIC_BETA_MODE === "true" &&
    betaPassword !== process.env.BETA_PASSWORD
  ) {
    console.log("test");
    return <BetaForm />;
  }

  return <>{children}</>;
}
