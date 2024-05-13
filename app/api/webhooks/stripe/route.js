import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();

  switch (body.type) {
    case "checkout.session.completed": {
      const session = body.data.object;
      const stripeCustomerId = session.customer;
      const user = await findUserFromCustomerId(stripeCustomerId);

      if (!user?.id) {
        break;
      }

      // console.log("add session");

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          plan: "STARTER",
        },
      });
      break;
    }
    case "invoice.paid": {
      const invoice = body.data.object;
      const stripeCustomerId = invoice.customer;
      const user = await findUserFromCustomerId(stripeCustomerId);

      if (!user?.id) {
        break;
      }

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          plan: "STARTER",
        },
      });
      break;
    }
    case "invoice.payment_failed": {
      const invoice = body.data.object;
      const stripeCustomerId = invoice.customer;
      const user = await findUserFromCustomerId(stripeCustomerId);

      if (!user?.id) {
        break;
      }

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          plan: "FREE",
        },
      });
      break;
    }
    case "customer.subcription.deleted": {
      const subcription = body.data.object;
      const stripeCustomerId = subcription.customer;
      const user = await findUserFromCustomerId(stripeCustomerId);

      if (!user?.id) {
        break;
      }

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          plan: "FREE",
        },
      });
      break;
    }
    default: {
      console.log("Unhandled event type", body.type);
    }
  }
  return NextResponse.json({
    ok: true,
  });
};

export const findUserFromCustomerId = async (stripeCustomerId) => {
  if (typeof stripeCustomerId !== "string") {
    return null;
  }
  return prisma.user.findFirst({
    where: {
      stripeCustomerId: stripeCustomerId,
    },
  });
};
