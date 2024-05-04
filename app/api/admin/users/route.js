import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const res = await request.json();
    console.log(res);

    if (!res.data.username || !res.data.role || !res.data.email) {
      return new Response(`Update user error: please fill every input`, {
        status: 400,
      });
    }

    await prisma.user.update({
      where: { id: res.userId },
      data: {
        username: res.data.username,
        role: res.data.role,
        email: res.data.email,
      },
    });
  } catch (error) {
    const response = new NextResponse(
      JSON.stringify({
        message: `Update user error: ${error.message}`, // Assurez-vous que c'est 'message' pas 'messsage'
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  }

  return new Response("Successful update user!", {
    status: 200,
  });
}
