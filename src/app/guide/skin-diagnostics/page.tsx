import Button from "@/components/Button";
import Title from "@/components/Title";
import Text from "@/components/Text";
import Link from "next/link";
import Indicator from "../Indicator";
import Image from "next/image";

export default function SkinDiagnostics() {
  return (
    <main className="bg-dark min-h-screen">
      <div className="relative w-full">
        <Image
          src="/assets/placeholder.jpeg"
          alt="Make up person's face"
          width={1000}
          height={666}
          sizes="100vw"
          priority
        />

        <div className="absolute bottom-0 flex flex-col gap-7 mb-10 px-5 pt-10 text-center">
          <Title style="light">Unleash your creativity with AI toolbox</Title>
          <Text style="light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</Text>
        </div>
      </div>

      <Indicator currentStep={2} style="light" />

      <div className="px-5 py-5 border-t border-t-gray-200">
        <Link href="/guide/foundation-match/">
          <Button style="light">Next</Button>
        </Link>
      </div>
    </main>
  );
}
