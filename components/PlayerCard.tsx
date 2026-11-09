import Image from "next/image";
import Link from "next/link";
import { Player } from "@/lib/players";

interface PlayerCardProps {player: Player}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="flex h-[215px] min-w-0 flex-col items-center overflow-hidden rounded-[9px] bg-white px-2 pt-3 shadow-[0_2px_9px_rgba(0,0,0,0.16)] sm:h-[225px] sm:px-3 sm:pt-4">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full sm:h-24 sm:w-24 lg:h-25.5 lg:w-25.5">
        <Image src={player.image} alt={player.name} fill sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 102px" className="object-cover"/>
      </div>

      <h2 className="mt-2 line-clamp-2 w-full break-words text-center text-xs font-semibold leading-snug text-[#263D50] sm:mt-3 sm:text-[13px]">
        {player.name}
      </h2>

      <div className="mt-1 flex items-center justify-center gap-1">
        <Image src="/indo.png" alt="Indonesia" width={14} height={10} className="shrink-0 object-cover"/>
        <span className="text-[9px] text-[#9BA3AA]">{player.country}</span>
      </div>

      <p className="mt-0.5 text-center text-[9px] text-[#263D50]">
        {getCategoryName(player.category)}
      </p>

      <Link href={`/pemain/${player.id}`} className=" mt-auto mb-3 text-[10px] font-medium text-[#BD6868] transition-colors hover:text-[#914747]">
        Lihat Profil →
      </Link>
    </div>
  );
}

function getCategoryName(category: Player["category"]) {
  const categories = {
    "tunggal-putra": "Tunggal Putra",
    "tunggal-putri": "Tunggal Putri",
    "ganda-putra": "Ganda Putra",
    "ganda-putri": "Ganda Putri",
    "ganda-campuran": "Ganda Campuran",
  };

  return categories[category];
}