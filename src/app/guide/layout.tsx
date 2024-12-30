import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

export default function layout({ children }: LayoutProps) {
  const cooieStore = cookies();

  if (cooieStore.get("guide-status")?.value === "done") {
    return redirect("/");
  }

  return children;
  
}

