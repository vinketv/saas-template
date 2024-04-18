import Image from "next/image";
import Link from "next/link";
import { SignIn, UserAvatar } from "@/components/AuthButton/Sign_in"
import { auth } from "@/auth.js"

export const Navbar = async() => {

    const session = await auth()

    return (
        <>
            <header className="w-full">
                <div className="w-full flex justify-center">
                    <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
                        <Link href="/" className="flex items-center font-display text-2xl">
                            <Image
                                src="/icon.png"
                                width={32}
                                height={32}
                                quality={100}
                            ></Image>
                            <p className="font-medium ml-1 text-black">Template</p>
                        </Link>
                        <div>
                            {
                                !session?.user ? <SignIn /> : <UserAvatar session={session} />
                            }
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
};