import { auth } from "@/auth.js";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isUserLoggedIn = req.auth;
  const { pathname } = req.nextUrl;

  // Rediriger l'utilisateur connecté
  if (isUserLoggedIn && pathname.startsWith("/signin")) {
    return NextResponse.redirect(new URL("/dashboard", req.url)); // Redirige vers la page dashboard
  }

  // Rediriger l'utilisateur non connecté
  if (!isUserLoggedIn && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signin", req.url)); // Redirige vers la page de connexion
  }

  // Vérifier l'accès pour les routes d'administration
  if (pathname.startsWith("/dashboard/admin")) {
    if (!isUserLoggedIn || isUserLoggedIn?.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url)); // Redirige vers la page de connexion si non connecté ou non admin
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/signin/:function*", "/dashboard/:function*"],
};
