import { auth, signOut } from "@/auth.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { SignInButton } from "./Sign-in";

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
            <Link href="/dashboard" className="cursor-pointer">
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
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
        {!session?.user ? <SignInButton /> : <UserAvatar session={session} />}
      </div>
    </>
  );
}
