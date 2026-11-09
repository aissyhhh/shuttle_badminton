import Image from "next/image";

export function RankHero() {
  return (
    <section className="relative h-90 overflow-hidden sm:min-h-[380px] lg:h-90 lg:min-h-0">
      <Image src="/rank.png" alt="Player Rankings" fill priority className="object-cover"/>
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 mx-auto flex min-h-[360px] w-full max-w-[1376px] items-center justify-end px-6 py-8">
        <div className="max-w-120 text-right text-white">
          <h1 className="text-4xl mt-40 font-bold">Player Rankings</h1>
          <p className="mt-2 text-base leading-6">Get the latest information on the world of badminton, tournaments, athletes, and other activities.</p>
        </div>
      </div>
    </section>
  );
}