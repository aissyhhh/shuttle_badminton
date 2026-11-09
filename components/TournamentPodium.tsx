"use client";

import Image from "next/image";
import { useState } from "react";
import { players } from "@/lib/players";
import { tournaments } from "@/lib/tournaments";

interface TournamentPodiumProps { tournamentId: string }

export function TournamentPodium({ tournamentId }: TournamentPodiumProps) {
  const [category, setCategory] = useState("MS");

  const tournament = tournaments.find(
    (tournament) => tournament.id === tournamentId,
  );

  const categoryMap: Record<string, string> = {
    MS: "tunggal-putra",
    WS: "tunggal-putri",
    MD: "ganda-putra",
    WD: "ganda-putri",
    XD: "ganda-campuran",
  };

  const draw = tournament?.draw?.find((item) => item.category === categoryMap[category]);
  const finalMatch = draw?.final?.[0];
  const semifinalMatches = draw?.semiFinal ?? [];
  const winnerId = finalMatch?.winnerId;

  const runnerUpId = finalMatch
    ? finalMatch.player1Id === winnerId
      ? finalMatch.player2Id
      : finalMatch.player1Id
    : undefined;

  const semifinalLosers = semifinalMatches
    .map((match) => {
      if (!match.winnerId) {
        return undefined;
      }

      return match.winnerId === match.player1Id
        ? match.player2Id
        : match.player1Id;
    })
    .filter(Boolean) as string[];

  const podiumIds = [
    winnerId,
    runnerUpId,
    semifinalLosers[0],
    semifinalLosers[1],
  ];

  const podiumPlayers = podiumIds
    .map((id) => players.find((player) => player.id === id))
    .filter(Boolean);

  
return (
  <section className="mt-6 w-full min-w-0 sm:mt-8">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-lg font-bold text-[#873B3B]">PODIUM RESULT</h2>
      <div className="relative w-full sm:w-56">
        <label className="absolute left-3 top-1 text-[7px] text-[#66727C]">
          Age Category
        </label>

        <select value={category} onChange={(e) => setCategory(e.target.value)}
          className="h-10 w-full appearance-none rounded-md border border-[#C8D0D6] bg-[#F8F8F8] px-3 pt-2 text-[10px] text-[#263D50] outline-none focus:border-[#BD6868]"
        >
          <option value="MS">MS</option>
          <option value="WS">WS</option>
          <option value="MD">MD</option>
          <option value="WD">WD</option>
          <option value="XD">XD</option>
        </select>

        <span className="pointer-events-none absolute right-3 top-3 text-[10px] text-[#263D50]">
          v
        </span>
      </div>
    </div>

    {podiumPlayers.length === 0 ? (
      <div className="mt-6 rounded-lg border border-dashed border-[#C8D0D6] px-4 py-12 text-center text-sm text-[#9BA3AA]">
        Data podium belum tersedia.
      </div>
    ) : (
      <div className="mt-6 w-full overflow-x-auto pb-4">
        <div className="mx-auto flex w-max min-w-full items-end justify-center gap-3 px-1 sm:gap-4 lg:gap-5">
          {podiumPlayers.map((player, index) => {
            if (!player) return null;

            const isWinner = index === 0;
            const cardHeights = [
              "h-64 sm:h-72",
              "h-56 sm:h-64",
              "h-52 sm:h-60",
              "h-48 sm:h-56",
            ];

            const imageSizes = [
              "h-24 w-24 sm:h-32 sm:w-32",
              "h-20 w-20 sm:h-28 sm:w-28",
              "h-[72px] w-[72px] sm:h-24 sm:w-24",
              "h-16 w-16 sm:h-20 sm:w-20",
            ];

            return (
              <div key={player.id} className={`relative flex w-[155px] shrink-0 flex-col items-center justify-center rounded-md px-3 sm:w-[190px] lg:w-[210px] ${cardHeights[index]} ${
                  isWinner ? "bg-[#C06D6D]" : "bg-[#F7F7F7]"
                }`}
              >
                <span className={`absolute left-3 top-3 text-base font-bold sm:left-5 sm:top-4 sm:text-lg ${
                    isWinner ? "text-white" : "text-[#873B3B]"
                  }`}
                >
                  {index + 1}
                </span>

                <div className={`relative shrink-0 overflow-hidden rounded-full border-2 border-white ${imageSizes[index]}`}>
                  <Image src={player.image} alt={player.name} fill sizes="(max-width: 640px) 96px, 128px" className="object-cover"/>
                </div>

                <h3 className={`mt-3 max-w-full break-words text-center text-[10px] font-semibold sm:mt-4 sm:text-xs ${
                    isWinner ? "text-white" : "text-[#263D50]"
                  }`}
                >
                  {player.name}
                </h3>

                <div className="mt-1 flex items-center gap-1">
                  <Image src="/indo.png" alt="Indonesia" width={14} height={9} className="object-cover"/>
                  <span className={`text-[8px] ${
                      isWinner ? "text-white" : "text-[#873B3B]"
                    }`}
                  >
                    INDONESIA
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )}
  </section>
);

}
