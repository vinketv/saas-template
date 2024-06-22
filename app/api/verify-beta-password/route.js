import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const session = await auth();
    const res = await request.json();

    // Vérifiez si le nom d'utilisateur est fourni
    if (!res.password) {
      return new Response("Unlock beta error: please fill every input", {
        status: 400,
      });
    }

    if (res.password === process.env.BETA_PASSWORD) {
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          plan: "BETA",
        },
      });
      return new Response("Successful unlock beta!", {
        status: 200,
      });
    }
  } catch (error) {
    return new Response({
      status: 401,
    });
  }
}
