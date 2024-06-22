import { prisma } from "@/lib/prisma";
import { getPlanFromPriceId, stripe } from "@/lib/stripe";
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

      // Récupérer le plan choisi à partir de la session
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
        {
          limit: 1,
        }
      );

      if (lineItems.data.length > 0) {
        const priceId = lineItems.data[0].price.id;
        const plan = getPlanFromPriceId(priceId);

        console.log(plan);

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            plan: plan,
          },
        });
      }
    }
    case "invoice.paid": {
      const invoice = body.data.object;
      const stripeCustomerId = invoice.customer;
      const user = await findUserFromCustomerId(stripeCustomerId);

      if (!user?.id) {
        break;
      }

      // Récupérer le plan choisi à partir de l'abonnement
      const subscription = await stripe.subscriptions.retrieve(
        invoice.subscription
      );
      const priceId = subscription.items.data[0].price.id;
      const plan = getPlanFromPriceId(priceId);

      console.log(plan);

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          plan: plan,
        },
      });
      break;
    }
    case "customer.subscription.updated": {
      const subscription = body.data.object;
      const stripeCustomerId = subscription.customer;
      const user = await findUserFromCustomerId(stripeCustomerId);

      if (!user?.id) {
        break;
      }

      // Récupérer le plan choisi à partir de la subscription
      const subscriptionItems = await stripe.subscriptionItems.list({
        subscription: subscription.id,
        limit: 1,
      });

      if (subscriptionItems.data.length > 0) {
        const priceId = subscriptionItems.data[0].price.id;
        const plan = getPlanFromPriceId(priceId);

        console.log(plan);

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            plan: plan,
          },
        });
      }
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
          plan: "STARTER",
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
          plan: "STARTER",
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
