import Image from "next/image";

export default function Home() {
  return (
    <div className="group">
      <header className="w-full h-32 lg:h-44 pt-10">
        <div className="text-center">
          <h1 className="text-6xl lg:text-8xl font-leaguespartan font-bold text-black group-hover:text-primary">
            Fondaton
          </h1>
        </div>
      </header>

      <main className="w-full relative flex items-center justify-center mb-10 h-[55vh] max-w-[80vw] lg:max-w-[600px] mx-auto">
        <Image
          className="object-contain"
          src={"/assets/logo/dark.png"}
          alt="Logo"
          fill
          priority
        />
        <Image
          className="object-contain opacity-0 group-hover:opacity-100 ease-in-out transition-all duration-700"
          src={"/assets/logo/primary.png"}
          alt="Logo"
          fill
          priority
        />
      </main>

      <footer>
        <div className="w-full text-center">
          <h3 className="font-quicksand">Since 2023</h3>
        </div>
      </footer>
    </div>
  );
}
