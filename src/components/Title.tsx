"use client";

import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TitleProps {
  children?: ReactNode;
  style?: "dark" | "light";
  className?: HTMLHeadingElement["className"];
}


export default function TitleProps({ children, className, style = "dark" }: TitleProps) {
  return (
    <h1 className={twMerge("font-bold text-2xl", style === "dark" ? "text-dark" : "text-white", className)}>
      {children}
    </h1>
  );
}
