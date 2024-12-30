"useClient";

import { MouseEventHandler, ReactNode } from "react";
import Button from "@/components/Button";
import Title from "@/components/Title";
import Text from "@/components/Text";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface FooterProps {
  title: ReactNode;
  description: ReactNode;
  currentStep: number;
  nextStep: { label: string } & ({ url: string } | { onClick: MouseEventHandler });
  style?: "light" | "dark";
}

export default function Footer(props: FooterProps) {
  const { title, description, currentStep, style = "dark", nextStep: nextSteps } = props;
  const totalSteps = 3;

  return (
    <footer className="absolute bottom-5 w-full px-5">
      <div className="max-w-96 text-center mx-auto">
        <div className="space-y-5">
          <Title style={style}>{title}</Title>
          <Text style={style}>{description}</Text>
        </div>

        {/* indicator to show which step the user is currently on */}
        <div className="flex items-center justify-center gap-1 my-8">
          {[...Array(totalSteps)].map((step, index) => (
            <div
              className={twMerge(
                "w-3 h-3 rounded-full opacity-30",
                style === "dark" ? "bg-dark" : "bg-white", // pick the default color based on the style
                currentStep === index + 1 && "w-7 opacity-100" // make the current step bigger than the rest
              )}
              key={step + index.toString() + Math.floor(Math.random() * 10000).toString()}
            />
          ))}
        </div>

        <div className="px-5 py-5 border-t border-t-gray-200">
          {"url" in nextSteps ? (
            <Link href={nextSteps.url}>
              <Button style={style}>{nextSteps.label}</Button>
            </Link>
          ) : (
            <Button style={style} onClick={nextSteps.onClick}>
              {nextSteps.label}
            </Button>
          )}
        </div>
      </div>
    </footer>
  );
}
