"use client";

import Image from "next/image";
import { players } from "@/lib/players";
import { liveScores } from "@/lib/liveScores";
import { tournaments } from "@/lib/tournaments";

interface TournamentLiveScoreProps { tournamentId: string }

const CATEGORY_LABEL: Record<string, string> = {
  "tunggal-putra": "MS",
  "tunggal-putri": "WS",
  "ganda-putra": "MD",
  "ganda-putri": "WD",
  "ganda-campuran": "XD",
};

const COUNTRY_CODE: Record<string, string> = {
  Indonesia: "INA", Malaysia: "MAS", Japan: "JPN", China: "CHN", Denmark: "DEN", India: "IND", Thailand: "THA",
  Singapore: "SGP", Vietnam: "VIE", Taiwan: "TPE", "South Korea": "KOR", Korea: "KOR", England: "ENG", France: "FRA",
};

const MIN_GAMES = 3;

const countryCode = (country?: string) => (country ? COUNTRY_CODE[country] ?? country.slice(0, 3).toUpperCase() : "-");

function EmptyState({ message }: { message: string }) {
  return <div className="py-10 text-center text-sm text-[#9BA3AA]">{message}</div>;
}

export function TournamentLiveScore({ tournamentId }: TournamentLiveScoreProps) {
  const tournamentName = tournaments.find((item) => item.id === tournamentId)?.name ?? "Turnamen";
  const tournamentLiveScore = liveScores.find((score) => score.tournamentId === tournamentId);

  if (!tournamentLiveScore) return <EmptyState message="Tidak ada data live score." />;

  const liveMatch = tournamentLiveScore.matches.find((match) => match.status === "live");
  if (!liveMatch) return <EmptyState message="Tidak ada pertandingan yang sedang berlangsung." />;

  const player1 = players.find((player) => player.id === liveMatch.player1Id);
  const player2 = players.find((player) => player.id === liveMatch.player2Id);
  if (!player1 || !player2) return <EmptyState message="Data pemain tidak ditemukan." />;

  const otherMatches = tournamentLiveScore.matches.filter((match) => match.id !== liveMatch.id);

  const gameCount = Math.max(MIN_GAMES, liveMatch.score1.length, liveMatch.score2.length);
  const gameColumns = { gridTemplateColumns: `minmax(0,1.5fr) repeat(${gameCount}, minmax(0,1fr))` };
  const category = CATEGORY_LABEL[liveMatch.category];

  return (
    <section className="w-full min-w-0 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#B8B8B8] pb-3">
        <h2 className="text-sm font-bold text-[#914747] sm:text-base">{tournamentName}</h2>

        <span className="inline-flex items-center gap-2 rounded-md bg-[#E50909] px-4 py-2 text-[10px] font-semibold text-white sm:px-6">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          LIVE
        </span>
      </div>

      <div className="mt-5 rounded-lg bg-white p-3 shadow-[0_2px_10px_rgba(0,0,0,0.16)] sm:mt-6 sm:p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#AFAFAF] pb-3 text-[9px] font-medium text-[#263D50] sm:text-[10px]">
          <span>{[category, liveMatch.round].filter(Boolean).join(" - ")}</span>
          <span>Court {liveMatch.court}</span>
        </div>

        <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:mt-8 sm:gap-5">
          {[player1, player2].map((player, index) => (
            <div key={player.id} className={`flex min-w-0 flex-col items-center text-center ${index === 1 ? "order-3" : "order-1"}`}>
              <div className="relative h-16 w-16 overflow-hidden rounded-full sm:h-24 sm:w-24 md:h-28 md:w-28">
                <Image src={player.image} alt={player.name} fill sizes="(max-width: 640px) 64px, 112px" className="object-cover" />
              </div>

              <h3 className="mt-2 w-full break-words text-[10px] font-semibold text-[#263D50] sm:mt-3 sm:text-xs md:text-sm">{player.name}</h3>
              <span className="mt-1 text-[8px] uppercase text-[#9BA3AA] sm:text-[9px]">{player.country}</span>
            </div>
          ))}

          <div className="order-2 min-w-0 text-center">
            <p className="text-[10px] font-bold text-[#263D50] sm:text-sm">GAME {liveMatch.currentGame}</p>

            <div className="mt-2 flex items-center justify-center gap-2 sm:mt-4 sm:gap-4 md:gap-5">
              <span className="text-3xl font-bold leading-none text-[#263D50] sm:text-4xl md:text-5xl">{liveMatch.currentScore1}</span>
              <span className="text-xl font-normal text-[#263D50] sm:text-2xl md:text-3xl">-</span>
              <span className="text-3xl font-bold leading-none text-[#263D50] sm:text-4xl md:text-5xl">{liveMatch.currentScore2}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 overflow-x-auto sm:mt-10">
          <div className="min-w-[300px]">
            <div className="grid items-center border-b border-[#E5E7EB] pb-3 text-[9px] font-semibold text-[#BD6868] sm:text-[10px]" style={gameColumns}>
              <span>Name</span>
              {Array.from({ length: gameCount }, (_, i) => (
                <span key={i} className="text-center">Game {i + 1}</span>
              ))}
            </div>

            {[player1, player2].map((player, index) => {
              const scores = index === 0 ? liveMatch.score1 : liveMatch.score2;

              return (
                <div key={player.id} className="grid items-center gap-1 border-b border-[#F0F0F0] py-3 text-[9px] text-[#263D50] sm:text-[10px]" style={gameColumns}>
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="h-2 w-1 shrink-0 rounded-sm bg-[#E50909]" />
                    <span className="truncate font-medium">{player.name}</span>
                  </div>

                  {Array.from({ length: gameCount }, (_, i) => (
                    <span key={i} className="text-center">{scores[i] ?? "-"}</span>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {otherMatches.length > 0 && (
        <div className="mt-8 sm:mt-10">
          <h2 className="border-b border-[#B8B8B8] pb-3 pl-1 text-base font-bold text-[#914747] sm:pl-2">Other Matches</h2>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {otherMatches.map((match) => {
              const matchPlayer1 = players.find((player) => player.id === match.player1Id);
              const matchPlayer2 = players.find((player) => player.id === match.player2Id);
              if (!matchPlayer1 || !matchPlayer2) return null;

              return (
                <div key={match.id} className="min-w-0 rounded-md bg-white p-4 shadow-[0_2px_7px_rgba(0,0,0,0.16)]">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-[10px] font-bold text-[#914747] sm:text-xs">{tournamentName}</h3>
                      <p className="mt-1 text-[8px] text-[#9BA3AA] sm:text-[9px]">{match.round}</p>
                    </div>

                    {match.status === "live" && <span className="shrink-0 rounded bg-[#E50909] px-2 py-1 text-[8px] font-semibold text-white">LIVE</span>}
                  </div>

                  {[
                    { player: matchPlayer1, scores: match.score1 },
                    { player: matchPlayer2, scores: match.score2 },
                  ].map(({ player, scores }, index) => (
                    <div key={player.id} className={`${index === 0 ? "mt-4" : "mt-3"} flex items-center justify-between gap-3`}>
                      <div className="min-w-0">
                        <p className="break-words text-[10px] font-medium text-[#263D50] sm:text-xs">{player.name}</p>
                        <p className="mt-0.5 text-[8px] text-[#9BA3AA]">{countryCode(player.country)}</p>
                      </div>

                      <div className="flex shrink-0 gap-3 text-[10px] font-semibold text-[#E50909]">
                        {scores.map((score, i) => (
                          <span key={i}>{score}</span>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#EEEEEE] pt-3">
                    <span className="text-[8px] text-[#263D50] sm:text-[9px]">Game {match.currentGame} - Court {match.court}</span>
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