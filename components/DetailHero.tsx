import Image from "next/image";
import { Player } from "@/lib/players";

interface DetailHeroProps {
  player: Player;
}

export function DetailHero({ player }: DetailHeroProps) {
  const categoryNames = {
    "tunggal-putra": "Tunggal Putra",
    "tunggal-putri": "Tunggal Putri",
    "ganda-putra": "Ganda Putra",
    "ganda-putri": "Ganda Putri",
    "ganda-campuran": "Ganda Campuran",
  };

  return (
    <section className="relative min-h-[390px] w-full overflow-hidden sm:min-h-[370px] lg:h-80 lg:min-h-0">
      <Image
        src="/hero-detail.png"
        alt="Badminton"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 mx-auto flex min-h-[390px] w-full max-w-[1376px] flex-col items-center justify-center px-5 pb-6 translate-y-8 sm:min-h-[370px] sm:translate-y-6 lg:h-80 lg:min-h-0 lg:flex-row lg:items-center lg:px-6 lg:py-0 lg:translate-y-6">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white sm:h-28 sm:w-28 lg:h-37.5 lg:w-37.5">
          <Image
            src={player.image}
            alt={player.name}
            fill
            sizes="(max-width: 640px) 96px, (max-width: 1024px) 112px, 150px"
            className="object-cover"
          />
        </div>

        <div className=" mt-3 w-full max-w-[330px] sm:max-w-[430px] lg:ml-6 lg:mt-0 lg:max-w-none">
          <div className="flex justify-center lg:justify-start">
            <span className="inline-block rounded-full bg-[#BD6868] px-3 py-1 text-[10px] font-semibold text-white sm:px-4 sm:text-xs">
              Atlet
            </span>
          </div>

          <div className="mt-2 flex items-center gap-4">
            <div className="min-w-0 flex-1 text-left">
              <h1 className=" break-words text-xl font-bold leading-tight text-white sm:text-2xl lg:text-4xl">
                {player.name}
              </h1>

              <div className="mt-1 flex items-center gap-2">
                <Image
                  src="/indo.png"
                  alt="Indonesia"
                  width={20}
                  height={14}
                  className="h-auto w-5 object-cover"
                />
                <span className="text-xs text-white sm:text-sm">
                  {player.country}
                </span>
              </div>

              <p className="mt-0.5 text-xs text-white sm:text-sm">
                {categoryNames[player.category]}
              </p>
            </div>

            <div className="shrink-0">
              <div className="w-28 rounded-xl bg-[#10202D]/80 px-4 py-2.5 text-center text-white sm:w-32 sm:px-5 sm:py-3 lg:w-34">
                <p className="text-[10px] font-medium sm:text-xs">WORLD RANK</p>

                <p className="mt-0.5 text-2xl font-bold sm:text-3xl">
                  #{player.worldRank ?? "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
