import Button from "@/components/Button";
import Title from "@/components/Title";
import Text from "@/components/Text";
import Image from "next/image";
import Link from "next/link";
import Indicator from "../Indicator";

export default function AiMakeUp() {
  return (
    <>
      <div className="relative w-full">
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
        <Title>Edit your photos simply in just one click</Title>
        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</Text>
      </div>

      <Indicator currentStep={1} />

      <div className="px-5 py-5 border-t border-t-gray-200">
        <Link href="/guide/skin-diagnostics">
          <Button>Continue</Button>
        </Link>
      </div>
    </>
  );
}