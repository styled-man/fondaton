"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import Footer from "../Footer";

export default function FoundationMatch() {
  const router = useRouter();

  async function handleStartButton(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const request = await fetch("/api/guide/", {
      method: "POST",
      headers: {
        ContentType: "application/json",
      },
      body: JSON.stringify({
        status: "done",
      }),
    });

    if (request.ok) {
      router.push("/");
    }
  }

  return (
    <div className="relative min-h-screen">
      <div className="relative w-full">
        <div className="absolute bottom-0 w-full h-3/4 bg-gradient-to-t from-white to-transparent" />
        <div>
          <Image
            className="h-[50vh] object-cover"
            src="/assets/images/guide/foundation-match.png"
            alt="Make up person's face"
            width={430}
            height={695}
            sizes="100vw"
            priority
          />
        </div>
      </div>

      <Footer
        title="Enjoy all the benefits with pro subscriptions"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor..."
        nextStep={{ onClick: handleStartButton, label: "Get Started" }}
        currentStep={3}
        style="dark"
      />
    </div>
  );
}
