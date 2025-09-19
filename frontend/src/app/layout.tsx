import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Providers } from "~/components/providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "MUSIC GENERATOR",
  description: "MUSIC GENERATOR",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="min-h-svh flex-col" suppressHydrationWarning>
        <Providers>
          {children}
          <Toaster/>
        </Providers>
      </body>
    </html>
  );
}