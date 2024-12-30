import Image from "next/image";
import Footer from "../Footer";

export default function SkinDiagnostics() {
  
  return (
    <main className="relative bg-dark min-h-screen">
      <div className="pt-10">
        <Image
          className="h-[65vh] object-contain mx-auto"
          src="/assets/images/guide/skin-diagnostics.png"
          alt="Make up person's face"
          width={229}
          height={675}
          sizes="100vw"
          priority
        />
      </div>

      <Footer
        title="Unleash your creativity with AI toolbox"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor..."
        nextStep={{ url: "/guide/foundation-match/", label: "Continue" }}
        currentStep={2}
        style="light"
      />
    </main>
  );
}
