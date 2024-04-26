import { auth, signIn, signOut } from "@/auth.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export async function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/home" });
      }}
    >
      <button
        value="Sign in"
        aria-label="Sign in"
        className="rounded-full border border-primary bg-primary p-1.5 px-4 text-sm shadow-sm font-semibold text-white transition-all hover:bg-white hover:text-primary"
      >
        Sign in
      </button>
    </form>
  );
}

export function UserAvatar({ session }) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <a className="cursor-pointer" aria-label="">
            <img
              className="rounded-full w-10 h-10"
              src={
                session?.user.image ??
                "https://source.boringavatars.com/marble/120"
              }
              alt="User Avatar"
            />
          </a>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/home" className="cursor-pointer">
              Home
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/home" className="cursor-pointer">
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button aria-label="Sign out" type="submit">
                Sign Out
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export async function Avatar() {
  const session = await auth();
  return (
    <>
      <div>
        {!session?.user ? <SignIn /> : <UserAvatar session={session} />}
      </div>
    </>
  );
}
