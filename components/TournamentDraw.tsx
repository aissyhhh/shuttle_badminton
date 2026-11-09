"use client";

import { useState } from "react";
import { players } from "@/lib/players";
import type { PlayerCategory } from "@/lib/players";
import { tournaments } from "@/lib/tournaments";
import type { DrawMatch as DrawMatchType } from "@/lib/tournaments";
import { FilterButton } from "./FilterButton";

interface TournamentDrawProps { tournamentId: string }

const categories: {
  label: string;
  value: PlayerCategory;
}[] = [
    { label: "Tunggal Putra", value: "tunggal-putra" },
    { label: "Tunggal Putri", value: "tunggal-putri" },
    { label: "Ganda Putra", value: "ganda-putra" },
    { label: "Ganda Putri", value: "ganda-putri" },
    { label: "Ganda Campuran", value: "ganda-campuran" },
  ];

const CARD_WIDTH = 185;
const CARD_HEIGHT = 64;
const COLUMN_WIDTH = 230;

export function TournamentDraw({ tournamentId }: TournamentDrawProps) {
  const [category, setCategory] = useState<PlayerCategory>("tunggal-putra");
  const tournament = tournaments.find((item) => item.id === tournamentId);
  const draw = tournament?.draw?.find((item) => item.category === category);

  return (
    <section>
      <h2 className="border-b border-[#A5A5A5] pb-3 text-base font-bold text-[#914747]">DRAW</h2>
      <div className="mt-6 grid grid-cols-2 gap-3 lg:flex lg:items-center">
  {categories.map((item) => (
    <FilterButton
      key={item.value}
      label={item.label}
      active={category === item.value}
      onClick={() => setCategory(item.value)}
    />
  ))}
</div>

      <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
        {!draw ? (
          <div className="min-w-287.5 py-16 text-center text-sm text-[#9BA3AA]">Draw belum tersedia.</div>
        ) : (
          <div className="min-w-287.5 p-5">
            <div className="relative h-[1550px]">
              <div className="absolute left-0 top-0 flex">
                <RoundHeader title="ROUND 32" />
                <RoundHeader title="ROUND 16" />
                <RoundHeader title="QUARTER FINAL" />
                <RoundHeader title="SEMI FINAL" />
                <RoundHeader title="FINAL" />
              </div>

              <DrawColumn matches={draw.round32 ?? []} round={0} />
              <DrawColumn matches={draw.round16 ?? []} round={1} />
              <DrawColumn matches={draw.quarterFinal ?? []} round={2} />
              <DrawColumn matches={draw.semiFinal ?? []} round={3} />
              <DrawColumn matches={draw.final ?? []} round={4} />

              <Lines matches={draw.round32 ?? []} round={0} />
              <Lines matches={draw.round16 ?? []} round={1} />
              <Lines matches={draw.quarterFinal ?? []} round={2} />
              <Lines matches={draw.semiFinal ?? []} round={3} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function RoundHeader({ title }: { title: string }) {
  return (
    <div className="flex justify-center" style={{ width: COLUMN_WIDTH }}>
      <div className="w-46.25 rounded-t-md bg-[#873B3B] py-2 text-center text-[10px] font-semibold text-white">
        {title}
      </div>
    </div>
  );
}

function DrawColumn({ matches, round }: {
  matches: DrawMatchType[];
  round: number;
}) {
  return (
    <div className="absolute left-0 top-0" style={{ width: COLUMN_WIDTH, left: round * COLUMN_WIDTH }}>
      {matches.map((match, index) => (
        <div key={index} className="absolute"
          style={{ left: 22, top: getTop(index, round), width: CARD_WIDTH }}
        >
          {round === 0 && (<MatchNumber index={index} />)}
          <MatchCard match={match} />
        </div>
      ))}
    </div>
  );
}

function getTop(
  index: number,
  round: number
) {
  const gap = 92 * Math.pow(2, round);

  return (
    50 + index * gap +
    ((Math.pow(2, round) - 1) * 92) / 2
  );
}

function MatchNumber({ index }: { index: number }) {
  return (
    <div className="absolute -left-5 top-1/2 flex -translate-y-1/2 flex-col justify-between text-[9px] font-semibold text-[#263D50]">
      <span>{index * 2 + 1}</span>
      <span>{index * 2 + 2}</span>
    </div>
  );
}

function MatchCard({ match }: { match: DrawMatchType }) {
  const player1 = players.find((player) => player.id === match.player1Id);
  const player2 = players.find((player) => player.id === match.player2Id);

  return (
    <div className="overflow-hidden rounded-md bg-[#873B3B] shadow-sm">
      <PlayerRow player={player1} score={match.score1}
        winner={
          match.winnerId === match.player1Id
        }
      />

      <PlayerRow player={player2} score={match.score2}
        winner={
          match.winnerId === match.player2Id
        }
      />
    </div>
  );
}

function PlayerRow({ player, score, winner }: {
  player?: (typeof players)[number];
  score?: number;
  winner: boolean;
}) {
  return (
    <div className={`flex h-8 items-center gap-2 border-b border-[#A45A5A] px-2 last:border-0 ${winner ? "bg-[#6F2F2F]" : ""
      }`}
    >
      <span className="min-w-0 flex-1 truncate text-[8px] text-white">
        {player?.name ?? "TBD"}
      </span>

      <span className="text-[9px] font-bold text-white">
        {score ?? "-"}
      </span>
    </div>
  );
}

function Lines({ matches, round }: {
  matches: DrawMatchType[];
  round: number;
}) {
  const gap = 92 * Math.pow(2, round);
  return (
    <>
      {Array.from({ length: Math.floor(matches.length / 2) }).map((_, index) => {
        const first = getTop(index * 2, round);
        const second = getTop(index * 2 + 1, round);
        const firstCenter = first + CARD_HEIGHT / 2;
        const secondCenter = second + CARD_HEIGHT / 2;
        const middle = (firstCenter + secondCenter) / 2;
        const left = round * COLUMN_WIDTH + 207;

        return (
          <div key={index}>
            <div className="absolute h-px bg-[#5E5E5E]"
              style={{ left, top: firstCenter, width: 23 }}
            />

            <div className="absolute h-px bg-[#5E5E5E]"
              style={{ left, top: secondCenter, width: 23 }}
            />

            <div className="absolute w-px bg-[#5E5E5E]"
              style={{
                left: left + 23, top: firstCenter,
                height: secondCenter - firstCenter,
              }}
            />

            <div className="absolute h-px bg-[#5E5E5E]"
              style={{ left: left + 23, top: middle, width: COLUMN_WIDTH - 23 }}
            />
          </div>
        );
      })}
    </>
  );
}