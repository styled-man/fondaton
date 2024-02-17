import Button from "@/components/Button";
import Title from "@/components/Title";
import Text from "@/components/Text";
import Link from "next/link";
import Indicator from "../Indicator";
import Image from "next/image";

export default function FoundationMatch() {
  return (
    <>
      <div className="relative w-full">
        <div className="absolute bottom-0 w-full h-3/4 bg-gradient-to-t from-white to-transparent" />
        <Image
          src="/assets/placeholder.jpeg"
          alt="Make up person's face"
          width={1000}
          height={666}
          sizes="100vw"
          priority
        />
      </div>

      <div className="flex flex-col gap-7 mb-10 px-5 pt-10 text-center">
        <Title>Enjoy all the benefits with pro subscriptions</Title>
        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</Text>
      </div>

      <Indicator currentStep={3} />

      <div className="px-5 py-5 border-t border-t-gray-200">
        <Link href="/api/auth/signin">
          <Button>Get Started</Button>
        </Link>
      </div>
    </>
  );
}
