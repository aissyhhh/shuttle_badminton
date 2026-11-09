"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { SearchInput } from "./SearchInput";
import { TournamentPodium } from "./TournamentPodium";
import { players } from "@/lib/players";
import { tournaments } from "@/lib/tournaments";

interface TournamentMatchProps {
  tournamentId: string;
  status: string;
}
const dates = [
  "30 AUG",
  "31 AUG",
  "01 SEP",
  "02 SEP",
  "PODIUM",
];

const courtOptions = ["Court 1", "Court 2", "Court 3"];

type MatchData = {
  id: string;
  player1: string;
  player2: string;
  score1?: number;
  score2?: number;
  winnerId?: string;
  player1Id?: string;
  player2Id?: string;
  category: string;
  round: string;
  court: string;
};

const roundConfig = [
  ["round32", "R32"],
  ["round16", "R16"],
  ["quarterFinal", "QF"],
  ["semiFinal", "SF"],
  ["final", "FINAL"],
] as const;

export function TournamentMatch({
  tournamentId,
  status,
}: TournamentMatchProps) {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("08 SEP");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCourts, setSelectedCourts] = useState<string[]>([
    "Court 1",
    "Court 2",
    "Court 3",
  ]);

  if (status !== "ongoing") return null;
  const tournament = tournaments.find((item) => item.id === tournamentId);

  const matches: MatchData[] =
    tournament?.draw?.flatMap((draw) =>
      roundConfig.flatMap(([roundKey, roundLabel]) =>
        (draw[roundKey] ?? []).map((match, index) => {
          const player1 = players.find(
            (player) => player.id === match.player1Id,
          );
          const player2 = players.find(
            (player) => player.id === match.player2Id,
          );
          const courtNumber =
            Number(match.court?.match(/\d+/)?.[0]) || (index % 3) + 1;

          return {
            id: `${draw.category}-${roundLabel}-${index}`,
            player1: player1?.name ?? match.player1Id ?? "TBD",
            player2: player2?.name ?? match.player2Id ?? "TBD",
            score1: match.score1,
            score2: match.score2,
            winnerId: match.winnerId,
            player1Id: match.player1Id,
            player2Id: match.player2Id,
            category: draw.category,
            round: roundLabel,
            court: `Court ${courtNumber}`,
          };
        }),
      ),
    ) ?? [];

  const filteredMatches = matches.filter((match) => {
    const keyword = search.toLowerCase().trim();

    const matchesSearch =
      match.player1.toLowerCase().includes(keyword) ||
      match.player2.toLowerCase().includes(keyword);

    return matchesSearch && selectedCourts.includes(match.court);
  });

  const toggleCourt = (court: string) => {
    setSelectedCourts((current) =>
      current.includes(court)
        ? current.filter((item) => item !== court)
        : [...current, court],
    );
  };

  return (
    <section>
      <div className="mt-7 border-b border-[#D9DDE0]">
        <div className="flex gap-8 overflow-x-auto">
          {dates.map((date) => (
            <button key={date} type="button" onClick={() => setSelectedDate(date)} className={`whitespace-nowrap pb-3 text-[10px] font-semibold ${
                selectedDate === date
                  ? "border-b-2 border-[#BD6868] text-[#914747]"
                  : "text-[#52616D] hover:text-[#BD6868]"
              }`}
            >
              {date}
            </button>
          ))}
        </div>
      </div>

      {selectedDate === "PODIUM" ? (
        <TournamentPodium tournamentId={tournamentId} />
      ) : (
        <>
          <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-[#263D50]">
                MATCH SCHEDULE
              </h2>
              <p className="mt-1 text-sm text-[#52616D]">
                {tournament?.date ?? ""}
              </p>
            </div>

            <div className="relative flex items-center gap-3">
              <div className="w-64">
                <SearchInput value={search} onChange={setSearch} placeholder="Cari pemain..."/>
              </div>

              <button type="button" onClick={() => setShowFilter((current) => !current)} className="flex h-10 items-center gap-2 rounded-md bg-[#BD6868] px-4 text-xs font-semibold text-white transition hover:bg-[#914747]">
                <SlidersHorizontal size={15} />
                Filter
              </button>

              {showFilter && (
                <div className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-[#D9DDE0] bg-white p-5 shadow-[0_5px_20px_rgba(0,0,0,0.15)]">
                  <h3 className="text-sm font-bold text-[#263D50]">
                    Filter Court
                  </h3>

                  <p className="mt-1 text-xs text-[#777777]">
                    Pilih court yang ingin ditampilkan.
                  </p>

                  <div className="mt-4 space-y-3">
                    {courtOptions.map((court) => (
                      <label key={court} className="flex cursor-pointer items-center gap-3 text-sm text-[#52616D]"> 
                      <input type="checkbox" checked={selectedCourts.includes(court)} onChange={() => toggleCourt(court)} className="h-4 w-4 accent-[#BD6868]" />
                        {court}
                      </label>
                    ))}
                  </div>

                  <div className="mt-5 flex gap-2">
                    <button type="button" onClick={() =>   setSelectedCourts(["Court 1", "Court 2", "Court 3"]) } className="flex-1 rounded-md border border-[#D9DDE0] py-2 text-xs font-semibold text-[#52616D]">
                      Reset
                    </button>

                    <button type="button" onClick={() => setShowFilter(false)} className="flex-1 rounded-md bg-[#BD6868] py-2 text-xs font-semibold text-white"> 
                      Selesai
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {filteredMatches.length === 0 ? (
            <div className="mt-8 rounded-xl border border-dashed border-[#C8D0D6] bg-white py-16 text-center">
              <p className="text-sm font-semibold text-[#263D50]">
                Tidak ada pertandingan.
              </p>
              <p className="mt-2 text-xs text-[#9BA3AA]">
                Coba ubah kata kunci atau pilihan court.
              </p>
            </div>
          ) : (
            <div className="mt-8 overflow-x-auto pb-4">
              <div className="flex min-w-max items-start gap-5">
                {courtOptions
                  .filter((court) => selectedCourts.includes(court))
                  .map((court) => {
                    const courtMatches = filteredMatches.filter( (match) => match.court === court,
                    );

                    return (
                      <div key={court} className="w-[320px] shrink-0 md:w-[360px]">
                        <div className="mb-4 rounded-lg border border-[#D9DDE0] bg-[#F5F6F7] px-4 py-3">
                          <h3 className="text-sm font-bold text-[#263D50]">
                            {court}
                          </h3>
                          <p className="mt-1 text-xs text-[#77838D]">
                            {courtMatches.length} pertandingan
                          </p>
                        </div>

                        <div className="space-y-4">
                          {courtMatches.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-[#D9DDE0] px-4 py-8 text-center">
                              <p className="text-xs text-[#9BA3AA]">
                                Belum ada pertandingan.
                              </p>
                            </div>
                          ) : (
                            courtMatches.map((match) => (
                              <MatchCard key={match.id} match={match} />
                            ))
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}

function MatchCard({ match }: { match: MatchData }) {
  return (
    <div className="overflow-hidden rounded-xl bg-[#202020] shadow-[0_5px_15px_rgba(0,0,0,0.18)]">
      <div className="flex h-11 items-center justify-between bg-[#292929] px-4">
        <span className="rounded-md bg-[#E8BFC0] px-3 py-1 text-[10px] font-bold text-[#263D50]">MATCH</span>
        <span className="text-[10px] font-semibold text-white">
          {match.round}
        </span>
      </div>

      <div className="px-4 py-4">
        <PlayerMatchRow name={match.player1} score={match.score1} winner={!!match.winnerId && match.winnerId === match.player1Id}/>
        <PlayerMatchRow name={match.player2} score={match.score2} winner={!!match.winnerId && match.winnerId === match.player2Id}/>
      </div>

      <div className="border-t border-[#383838] bg-[#1A1A1A] px-4 py-3">
        <p className="text-[10px] font-semibold text-white">
          {match.category}
          <span className="mx-1 text-[#BD6868]">•</span>
          {match.round}
        </p>
      </div>
    </div>
  );
}

function PlayerMatchRow({
  name,
  score,
  winner = false,
}: {
  name: string;
  score?: number;
  winner?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="h-5 w-7 shrink-0 overflow-hidden rounded-sm">
        <div className="h-1/2 bg-red-500" />
        <div className="h-1/2 bg-white" />
      </div>

      <div className="min-w-0 flex-1">
        <p className={`truncate text-xs font-semibold ${
            winner ? "text-white" : "text-[#A9A9A9]"
          }`}
        >
          {name}
        </p>
      </div>

      <span className={`w-8 text-center text-sm font-bold ${
          winner ? "text-[#BD6868]" : "text-[#D5D5D5]"
        }`}
      >
        {score ?? "-"}
      </span>
    </div>
  );
}
