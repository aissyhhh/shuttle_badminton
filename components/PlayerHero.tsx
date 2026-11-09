import Image from "next/image"
export function PlayerHero() {
    return (
      <section className="relative h-70 overflow-hidden">
        <Image src="/playerhero.png" alt="Pemain badminton" fill priority className="object-cover"/>
          <div className="absolute inset-0 bg-black/55" />
            <div className="relative z-10 flex h-full items-end">
              <div className="px-8 pb-10">
                <h1 className="text-[32px] font-bold text-white">PEMAIN</h1>
                  <p className="mt-2 max-w-97.5 text-[15px] leading-5 text-white">
                     Kenali para pebulu tangkis Indonesia dan ikuti perjalanan mereka
                  </p>
             </div>
            </div>
      </section>
    )
}