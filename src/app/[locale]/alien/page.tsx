import Image from "next/image";

export default function AlienPage() {
  return (
    <main className="w-full min-h-dvh bg-[#ff60a8] grid place-items-center overflow-hidden">
      <section className="flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">
        <div className="relative w-[140px] md:w-[220px] aspect-square">
          <Image
            src="/alien.png"
            alt="alien"
            fill
            className="object-contain"
            priority
          />
        </div>
      </section>
    </main>
  );
}
