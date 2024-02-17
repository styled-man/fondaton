"use client";

import Button from "@/components/Button";
import Title from "@/components/Title";
import Text from "@/components/Text";
import Indicator from "../Indicator";
import Image from "next/image";
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";

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
    <>
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

      <div className="flex flex-col gap-7 mb-10 px-5 pt-10 text-center">
        <Title>Enjoy all the benefits with pro subscriptions</Title>
        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</Text>
      </div>

      <Indicator currentStep={3} />

      <div className="px-5 py-5 border-t border-t-gray-200">
        <Button onClick={handleStartButton}>Get Started</Button>
      </div>
    </>
  );
}
