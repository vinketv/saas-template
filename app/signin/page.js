import { providerMap, signIn } from "@/auth.js";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default async function SignInPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="flex flex-col sm:shadow-xl px-8 py-8 bg-white rounded-xl space-y-8 justify-items-center items-center w-4/5 sm:w-3/4 lg:w-2/4 xl:w-1/4">
        <Image src="/icon.png" width={64} height={64}></Image>
        <div className="border-slate-300 border w-full md:w-3/4"></div>
        <form className="w-full md:w-3/4">
          <div className="grid w-full items-center gap-1.5 my-5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <div className="grid w-full items-center gap-1.5 my-5">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" />
          </div>
          <div className="w-full text-center gap-1.5 my-5">
            <button className="text-white w-full  bg-primary hover:bg-primary/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Sign in
            </button>
          </div>
        </form>
        <div className="border-slate-300 border w-full md:w-3/4"></div>
        {Object.values(providerMap).map((provider, id) => (
          <form
            className="w-full md:w-3/4"
            key={id}
            action={async () => {
              "use server";
              await signIn(provider.id, { redirectTo: "/dashboard" });
            }}
          >
            <button
              type="submit"
              className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
            >
              <svg
                className="mr-2 -ml-1 w-4 h-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Sign in with {provider.name}
              <div></div>
            </button>
          </form>
        ))}
        {/* <p className="text-center text-xs text-slate-500">
          Don’t have an account yet?{" "}
          <Link className="text-primary hover:underline" href="/register">
            Sign up here
          </Link>{" "}
        </p> */}
      </div>
    </div>
  );
}
