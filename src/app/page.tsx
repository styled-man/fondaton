import Image from "next/image";

export default function Home() {
  return (
    <>
      <header className="w-full h-24"></header>

      <main className="w-full relative flex items-center justify-center mb-10 h-[55vh] max-w-[80vw] mx-auto">
        <Image
          className="object-contain"
          src={"/assets/logo.webp"}
          alt="Logo"
          fill
          priority
        />
        <div className="absolute text-center">
          <h1 className="text-4xl lg:text-8xl font-leaguespartan font-bold">
            Foundatone .
          </h1>
          <h2 className="text-xl font-quicksand tracking-[0.5rem] lg:tracking-[1rem]">
            cosmetics
          </h2>
        </div>
      </main>

      <footer className="grid grid-cols-2 md:grid-cols-3">
        <div>
          <Image
            className="col-span-1 mx-auto"
            src={"/assets/design.webp"}
            alt="Logo"
            height={100}
            width={100}
          />
        </div>
        <div className="w-full col-span-1 text-center">
          <h3 className="font-quicksand">Since 2023</h3>
        </div>
      </footer>
    </>
  );
}
