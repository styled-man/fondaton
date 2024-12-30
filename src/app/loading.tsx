import Image from "next/image";

export default function loading() {
  return (
    <>
      <main className="w-screen h-screen flex items-center justify-center bg-black">
        <div className="relative w-52 h-52">
          <Image className="animate-spin" src="/assets/logo/dark.png" alt="Logo" fill />
        </div>
      </main>
    </>
  );
}
