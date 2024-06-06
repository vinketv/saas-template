import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export const Button_Manage = () => {
  return (
    <>
      <form>
        <Button
          className="bg-primary hover:bg-primary/75"
          formAction={async () => {
            "use server";
            const authSession = await auth();
            const user = await prisma.user.findUnique({
              where: {
                id: authSession?.user?.id ?? "",
              },
              select: {
                stripeCustomerId: true,
              },
            });

            const stripeCustomerId = user?.stripeCustomerId ?? undefined;

            if (!stripeCustomerId) {
              throw new Error("Missing stripe customer ID");
            }

            const session = await stripe.billingPortal.sessions.create({
              customer: user.stripeCustomerId,
              return_url: "http://localhost:3000/dashboard/settings",
            });

            if (!session.url) {
              throw new Error("url session missing!");
            }
            redirect(session.url);
          }}
        >
          Manage
        </Button>
      </form>
    </>
  );
};
