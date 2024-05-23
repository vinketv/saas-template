import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { prisma } from "./lib/prisma";
import { stripe } from "./lib/stripe";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin",
  },
  events: {
    createUser: async (message) => {
      const userID = message.user.id;
      const email = message.user.email;
      const name = message.user.name;

      if (!userID || !email) {
        return;
      }
      const stripeCustomer = await stripe.customers.create({
        email,
        name: name ?? undefined,
      });

      await prisma.user.update({
        where: {
          id: userID,
        },
        data: {
          stripeCustomerId: stripeCustomer.id,
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, profile }) {
      if (!user.username) {
        // Générez un username basé sur les informations disponibles
        // Par exemple, utilisez une partie de l'email ou un nom d'utilisateur généré aléatoirement
        user.username =
          profile.email.split("@")[0] + Math.floor(Math.random() * 1000);
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { plan: true, role: true },
        });
        token.plan = dbUser?.plan;
        token.role = dbUser?.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.plan = token.plan;
      session.user.role = token.role;
      return session;
    },
  },
  ...authConfig,
});
