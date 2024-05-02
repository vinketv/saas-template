import { NextResponse } from "next/server";
import { auth } from "./auth";

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

  return NextResponse.next();
});

export const config = {
  matcher: ["/signin/:function*", "/dashboard/:function*"],
};
