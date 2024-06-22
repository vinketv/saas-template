"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";
import Image from "next/image";
import { useState } from "react";

export function BetaForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/verify-beta-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
      }),
    });

    if (res.status === 200) {
      Cookies.set("betaPassword", password, { expires: 365 * 100 });
      window.location.reload();
    } else {
      setError("Mot de passe incorrect");
    }
  };

  return (
    <div>
      <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
        <div className="flex flex-col sm:shadow-xl px-8 py-8 bg-white rounded-xl space-y-8 justify-items-center items-center w-4/5 sm:w-3/4 lg:w-2/4 xl:w-4/12 2xl:w-1/4">
          <Image src="/icon.png" width={64} height={64}></Image>
          <div className="flex flex-col items-center gap-4 w-full md:w-3/4">
            <h1>Beta Mode</h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-4 w-full md:w-3/4"
            >
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="w-full"
              />
              <Button className="bg-primary hover:bg-primary/75" type="submit">
                Accéder
              </Button>
            </form>
            {error && <p>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
