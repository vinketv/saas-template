import Cookies from "@/components/Cookies/Cookies";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Template",
    template: "Template - %s",
  },
  generator: "Next.js",
  applicationName: "Template",
  referrer: "origin-when-cross-origin",
  keywords: [""],
  authors: [
    { name: "Kevin" },
    { name: "Sanches", url: "https://github.com/vinketv" },
  ],
  creator: "Kevin Sanches",
  publisher: "Kevin Sanches",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  description: "",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
    favicon: [
      { rel: "icon", url: "/favicon-16x16.png", sizes: "16x16" },
      { rel: "icon", url: "/favicon-32x32.png", sizes: "32x32" },
      { rel: "icon", url: "/favicon-96x96.png", sizes: "96x96" },
    ],
  },
  metadataBase: new URL("https://Template.vercel.app/"),
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/fr-FR",
    },
  },
  openGraph: {
    type: "website",
    url: "https://Template.vercel.app/",
    title: "Template",
    description: "",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Template Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    creator: "@yourtwitterhandle",
    title: "Template",
    description: "",
    images: [
      {
        url: "/logo.png",
        alt: "Template Logo",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={(inter.className, "h-full")}>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {children}
        <Cookies></Cookies>
        <Toaster />
      </body>
    </html>
  );
}
