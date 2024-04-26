"use client";

import { signIn } from "next-auth/react";

export function SignInButton() {
  return (
    <button
      className="rounded-full border border-primary bg-primary p-1.5 px-4 text-sm shadow-sm font-semibold text-white transition-all hover:bg-white hover:text-primary"
      onClick={() => signIn()}
    >
      Sign in
    </button>
  );
}
