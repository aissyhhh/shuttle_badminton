
import Image from "next/image";
import Link from "next/link";
import {
  TurnamenApi,
  getTournamentImageUrl,
} from "@/lib/tournamentsApi";

type Props = {
  tournament: TurnamenApi;
};

const statusLabels = {
  akan_datang: "UPCOMING",
  berlangsung: "ONGOING",
  selesai: "SELESAI",
};

export function TournamentCard({ tournament }: Props) {
  const imageSrc = getTournamentImageUrl(tournament.gambar);

  const statusStyle = {
    akan_datang: "border-[#2C3947] text-[#2C3947]",
    berlangsung: "border-[#425B9A] text-[#425B9A]",
    selesai: "border-[#9BA3AA] text-[#52616D]",
  };

  return (
    <div className="flex min-h-32 w-full gap-5 bg-white p-3 shadow-[0_2px_8px_rgba(0,0,0,0.16)]">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-gray-100 sm:h-24 sm:w-24 md:h-26 md:w-28">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={tournament.nama}
            fill
            sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-gray-400">
            No Image
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col py-0.5 sm:py-1">
        <h2 className="line-clamp-2 text-sm font-bold text-[#263D50] sm:text-base md:text-lg">
          {tournament.nama}
        </h2>

        <div className="mt-1.5 text-[10px] text-[#52616D] sm:mt-2 sm:text-[11px]">
          <p className="truncate">{tournament.venue}</p>
          <p className="mt-1">{tournament.tanggal_mulai}</p>
        </div>
      </div>

      <div className="flex w-25 shrink-0 flex-col items-end justify-between py-1">
        <span
          className={`rounded-lg border px-3 py-1 text-[9px] font-semibold ${
            statusStyle[tournament.status]
          }`}
        >
          {statusLabels[tournament.status]}
        </span>

        <Link
          href={`/turnamen/${tournament.slug}`}
          className="text-[9px] text-[#BD6868] underline underline-offset-2"
        >
          Selengkapnya →
        </Link>
      </div>
    </div>
  );
}
