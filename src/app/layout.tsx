import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { League_Spartan, Quicksand } from "next/font/google";
import "./globals.css";

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
  title: "Foundatone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={twMerge(leagueSpartan.variable, quickSand.variable)}
    >
      <body>{children}</body>
    </html>
  );
}
