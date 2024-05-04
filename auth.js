import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());
const providers = [Google];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  pages: {
    signIn: "/signin",
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
  },
});
