import Link from "next/link"

export const Footer = () => {
    return (
        <>
            <div className="absolute w-full py-10 rounded-md shadow-2xl">
                <div className="mx-auto grid grid-rows-5 md:grid-rows-none md:grid-cols-5 gap-16 max-w-screen-2xl py-10 px-14 text-center md:text-left">
                    <div>
                        <p className="font-medium mb-3 text-gray-900">Language</p>
                        <select className="rounded border-2 border-slates-900 px-8">
                            <option>English</option>
                        </select>
                    </div>
                    <div>
                        <p className="font-medium mb-3 text-gray-900">Product</p>
                        <ul className="flex flex-col items-center md:items-start gap-2">
                            <li className="text-slate-500 hover:text-black"><Link href="/">Advertise</Link></li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-medium mb-3 text-gray-900">Ressource</p>
                        <ul className="flex flex-col items-center md:items-start gap-2">
                        <li className="text-slate-500 hover:text-black"><Link href="/">List your business</Link></li>
                            <li className="text-slate-500 hover:text-black"><Link href="/">Support & FAQ</Link></li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-medium mb-3 text-gray-900">Infos</p>
                        <ul className="flex flex-col items-center md:items-start gap-2">
                            <li className="text-slate-500 hover:text-black"><Link href="/">About us</Link></li>
                            <li className="text-slate-500 hover:text-black"><Link href="/">Feedback</Link></li>
                            <li className="text-slate-500 hover:text-black"><Link href="/">Terms & Conditions</Link></li>
                            <li className="text-slate-500 hover:text-black"><Link href="/">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-medium mb-3 text-gray-900">Social</p>
                        <ul className="flex flex-col items-center md:items-start gap-2">
                            <li className="text-slate-500 hover:text-black"><Link href="/">Discord</Link></li>
                            <li className="text-slate-500 hover:text-black"><Link href="/">Twitter</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-b-2 border-slate-500 w-1/2 m-auto" />
                <div className="mt-10 text-center">
                    <p className="text-slate-500">© Flyosophy 2024.</p>
                    <p className="text-slate-500">A project by <Link href="https://github.com/vinketv" target="_blank" className="text-slate-900 font-medium cursor-pointer hover:border-b-2 hover:border-black">Kevin Sanches</Link></p>
                </div>
            </div>
        </>
    )
};