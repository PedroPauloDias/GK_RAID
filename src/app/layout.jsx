import "../styles/globals.css"
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { Providers } from "./providers";
import { siteConfig } from "../config/site";
import { fontSans } from "../config/font";
// import { dbConnect } from '@/app/lib/mongo';

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}) {
  // const conn = await dbConnect();
  return (
    <html suppressHydrationWarning lang="pt-br">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex md:items-center md:justify-center flex-col h-screen   ">
            <main className=" md:container mx-auto max-w-7xl  px-6 mt-2  flex-grow ">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
