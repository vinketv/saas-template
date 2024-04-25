import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { FaDiscord, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <>
      <div className="absolute w-full py-10 rounded-md shadow-2xl">
        <div className="mx-auto grid grid-rows-5 md:grid-rows-none md:grid-cols-5 gap-16 max-w-screen-2xl py-10 px-14 justify-center text-center md:text-left">
          <div className="flex flex-col">
            <p className="font-medium mb-3 text-black">Language</p>
            <Select>
              <SelectTrigger className="w-auto max-w-36 min-w-28">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="français">Français</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="font-medium mb-3 text-black">Product</p>
            <ul className="flex flex-col items-center md:items-start gap-2">
              <li className="text-slate-500 hover:text-primary">
                <Link href="/">Advertise</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-medium mb-3 text-black">Ressource</p>
            <ul className="flex flex-col items-center md:items-start gap-2">
              <li className="text-slate-500 hover:text-primary">
                <Link href="/">List your business</Link>
              </li>
              <li className="text-slate-500 hover:text-primary">
                <Link href="/">Support & FAQ</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-medium mb-3 text-gray-900">Infos</p>
            <ul className="flex flex-col items-center md:items-start gap-2">
              <li className="text-slate-500 hover:text-primary">
                <Link href="/">About us</Link>
              </li>
              <li className="text-slate-500 hover:text-primary">
                <Link href="/">Feedback</Link>
              </li>
              <li className="text-slate-500 hover:text-primary">
                <Link href="/">Terms & Conditions</Link>
              </li>
              <li className="text-slate-500 hover:text-primary">
                <Link href="/">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-medium mb-3 text-gray-900">Social</p>
            <ul className="flex flex-col items-center md:items-start gap-2">
              <li className="text-slate-500 hover:text-primary cursor-pointer">
                <FaDiscord className="w-6 h-6" />
              </li>
              <li className="text-slate-500 hover:text-primary cursor-pointer">
                <FaTwitter className="w-6 h-6" />
              </li>
            </ul>
          </div>
        </div>
        <div className="border border-slate-500 w-1/2 m-auto" />
        <div className="mt-10 text-center">
          <p className="text-slate-500">© Template 2024.</p>
          <p className="text-slate-500">
            A project by{" "}
            <Link
              href="https://github.com/vinketv"
              target="_blank"
              className="text-slate-900 font-medium cursor-pointer hover:border-b-2 hover:border-black"
            >
              Kevin Sanches
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
