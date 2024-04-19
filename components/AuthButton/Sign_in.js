import { signIn, signOut } from "@/auth.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export async function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button
        value="Sign in"
        aria-label="Sign in"
        className="rounded-full border border-black bg-black p-1.5 px-4 text-sm shadow-sm font-semibold text-white transition-all hover:bg-white hover:text-black"
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
            <a className="cursor-pointer" aria-label="Profile">
              Profile
            </a>
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
