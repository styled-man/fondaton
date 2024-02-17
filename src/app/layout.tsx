import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { League_Spartan, Quicksand } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-league-spartan",
});

const quickSand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "Fondaton",
  description: "",
  manifest: "/manifest.json",
  keywords: ["Beauty"],
  authors: [],
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={twMerge(leagueSpartan.variable, quickSand.variable)}>
      <body>{children}</body>
    </html>
  );
}
