"use client";

import { MouseEventHandler, ReactNode } from "react";
import { MouseEvent } from "react";
import { twMerge } from "tailwind-merge";

interface Button {
  children?: ReactNode;
  onClick?: MouseEventHandler;
  style?: "dark" | "light";
}

export default function Button({ children, onClick, style = "dark" }: Button) {
  return (
    <button
      className={twMerge("w-full rounded-3xl p-3", style === "dark" ? "bg-dark text-white" : "bg-white text-dark")}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
    
  );
}
