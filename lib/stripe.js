import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
  typescript: false,
});

// Fonction pour associer les price IDs aux plans
export const getPlanFromPriceId = (priceId) => {
  const priceIdToPlanMap = {
    [process.env.STRIPE_STARTER_PLAN]: "STARTER",
    [process.env.STRIPE_PRO_PLAN]: "PRO",
    // Ajoutez d'autres mappings selon vos tarifs
  };

  return priceIdToPlanMap[priceId] || "STARTER";
};
