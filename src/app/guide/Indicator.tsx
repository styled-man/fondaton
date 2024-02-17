import { twMerge } from "tailwind-merge";

interface IndicatorProps {
  currentStep: number;
  style?: "light" | "dark";
}

export default function Indicator({ currentStep, style = "dark" }: IndicatorProps) {
  const totalSteps = 3;

  return (
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
  );
}
