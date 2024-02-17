"use client";

import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TitleProps {
  children?: ReactNode;
  style?: "dark" | "light";
  className?: HTMLHeadingElement["className"];
}

export default function TitleProps({ children, className, style = "dark" }: TitleProps) {
  return <p className={twMerge(style === "dark" ? "text-dark" : "text-white", className)}>{children}</p>;
}
