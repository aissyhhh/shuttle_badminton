import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-[650px] w-full overflow-hidden sm:min-h-[700px] lg:min-h-screen">
      <Image src="/hero.png" alt="Badminton Banner" fill priority className="object-cover"/>
      <div className="absolute right-5 top-1/2 -translate-y-[10%] text-right text-white sm:right-8 md:right-10 lg:right-12">        
        <a href="/turnamen" className="mb-4 inline-block rounded-full bg-[#E89595] px-5 py-2.5 text-sm font-semibold sm:mb-5 sm:px-6 sm:py-3 sm:text-base lg:mb-6 lg:px-7">Join Tournament</a>

        <h1 className="text-4xl font-bold leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl">
          LEVEL UP <br /> YOUR GAME.
        </h1>

        <h2 className="mt-2 text-4xl font-bold text-[#E89595] sm:mt-3 sm:text-5xl md:text-6xl lg:text-7xl">
          OWN THE COURT.
        </h2>

        <p className="ml-auto mt-4 max-w-[330px] text-sm leading-relaxed text-white/90 sm:mt-5 sm:max-w-[430px] sm:text-base">
            Elevate your game. Connect with top athletes and experience sports in a breathable, boundless new arena.
        </p>
      </div>
    </section>
  );
}