import Image from "next/image";
import Footer from "../Footer";

export default function AiMakeUp() {
  return (
    <div className="relative min-h-screen">
      <div className="md:my-10 overflow-hidden">
        <Image
          className="h-[55vh] sm:h-[65vh] sm:rounded-3xl object-cover mx-auto"
          src="/assets/images/guide/ai-make-up.png"
          alt="Make up person's face"
          width={430}
          height={695}
          sizes="100vw"
          priority
        />
      </div>

      <Footer
        title="Malak your photos simply in just one click"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor..."
        nextStep={{ url: "/guide/skin-diagnostics/", label: "Continue" }}
        currentStep={1}
        style="dark"
      />
    </div>
  );
}
