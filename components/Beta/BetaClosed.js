"use client";

import Image from "next/image";

export function BetaClosed() {
  return (
    <div>
      <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
        <div className="flex flex-col sm:shadow-xl px-8 py-8 bg-white rounded-xl space-y-8 justify-items-center items-center w-4/5 sm:w-3/4 lg:w-2/4 xl:w-4/12 2xl:w-1/4">
          <Image src="/icon.png" width={64} height={64}></Image>
          <div className="flex flex-col items-center text-center gap-4 w-full md:w-3/4">
            <h1>Beta Closed</h1>
            <p>Vous serez notifié par email quand le site sera ouvert.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
