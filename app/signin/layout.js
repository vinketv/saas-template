import { BetaClosed } from "@/components/Beta/BetaClosed";
import { BetaForm } from "@/components/Beta/BetaForm";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export default async function RootLayout({ children }) {
  const cookieStore = cookies();
  const betaPasswordCookie = cookieStore.get("betaPassword");
  const betaPassword = betaPasswordCookie ? betaPasswordCookie.value : null;
  const countBetaMember = await prisma.user.count({
    where: {
      plan: "BETA",
    },
  });

  if (
    countBetaMember >= process.env.BETA_MEMBER_MAX &&
    process.env.NEXT_PUBLIC_BETA_MODE === "true"
  ) {
    return <BetaClosed />;
  } else if (
    process.env.NEXT_PUBLIC_BETA_MODE === "true" &&
    betaPassword !== process.env.BETA_PASSWORD &&
    countBetaMember < process.env.BETA_PASSWORD
  ) {
    return <BetaForm />;
  }

  return <>{children}</>;
}
