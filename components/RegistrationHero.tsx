import Image from "next/image";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { Tournament } from "@/lib/tournaments";

interface RegistrationHeroProps { tournament: Tournament }

export function RegistrationHero({ tournament }: RegistrationHeroProps) {
  return (
    <section className="relative h-[190px] overflow-hidden md:h-[205px]">
      <Image src="/hero.png" alt="Badminton" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1300px] flex-col justify-center px-5">
        <Image src="/shutter.png" alt="Shuttler" width={90} height={40} className="mb-2 h-auto w-[78px] object-contain object-left" />
        <h1 className="max-w-[620px] text-[21px] font-bold leading-[1.2] text-white md:text-[24px]">
          Pendaftaran Peserta
          <br />
          {tournament.name}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-5 text-[11px] text-white md:text-[12px]">
          <div className="flex items-center gap-2">
            <MdOutlineCalendarMonth size={15} />
            <span>{tournament.date}</span>
          </div>

          <div className="flex items-center gap-2">
            <SlLocationPin size={15} />
            <span>{tournament.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}