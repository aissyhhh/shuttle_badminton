import Image from "next/image";

export function Hero() {
    return(
        <section className="relative min-h-screen w-full overflow-hidden">
            <Image src="/hero.png" alt="Badminton Banner" fill priority className="object-cover"/>

            <div className="absolute right-12 top-[58%] -translate-y-1/2 text-right text-white">
                <a href="#turnamen" className="mb-6 inline-block rounded-full bg-[#E89595] px-7 py-3 text-base font-semibold text-white">
                    Join Turnament
                </a>
                <h1 className="text-7xl font-bold leading-0.95">
                    LEVEL UP
                    <br />
                    YOUR GAME.
                </h1>
                <h2 className="mt-3 text-7xl font-bold text-[#E89595]">
                    OWN THE COURT.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-white/90">
                    Elevate your game. Connect with top athletes and experience
                    <br />
                    sports in a breathable, boundless new arena.
                </p>
            </div>
        </section>
    )
}