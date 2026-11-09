import Image from "next/image";

export function TournamentHero() {
  return (
    <section className="relative h-80 overflow-hidden">
      <Image src="/hero-detail.png" alt="Badminton Tournament" fill priority className="object-cover"/>
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 px-10 mt-15 flex h-full items-center px-6">
        <div className="max-w-130 text-white">
          <h1 className="text-4xl font-bold">
            Tournaments
          </h1>

          <p className="mt-4 text-base leading-6">
            Finds information on Shuttler Badminton tournaments, view live scores, results, draws and upcoming events.
          </p>
        </div>
      </div>
    </section>
  );
}