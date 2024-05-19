import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const session = await auth();

    // Vérifiez si la session est valide
    if (!session || !session.user || !session.user.id) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const res = await request.json();

    // Vérifiez si le nom d'utilisateur est fourni
    if (!res.data || !res.data.username) {
      return new Response("Update user error: please fill every input", {
        status: 400,
      });
    }

    const newUsername = res.data.username.trim();

    // Validation de base pour le nom d'utilisateur (vous pouvez ajouter plus de règles)
    if (newUsername.length < 3 || newUsername.length > 20) {
      return new Response(
        "Update user error: username must be between 3 and 20 characters",
        {
          status: 400,
        }
      );
    }

    // Vérifiez si le nom d'utilisateur est disponible
    const checkAvailable = await prisma.user.findFirst({
      where: { username: newUsername },
    });

    if (checkAvailable) {
      return new Response("Username not available", {
        status: 409, // 409 Conflict est un code plus approprié ici
      });
    }

    // Mettez à jour le nom d'utilisateur
    await prisma.user.update({
      where: { id: session.user.id },
      data: { username: newUsername },
    });

    return new Response("Successful update username!", {
      status: 200,
    });
  } catch (error) {
    const response = new Response(
      JSON.stringify({
        message: `Update username error: ${error.message}`,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  }
}
