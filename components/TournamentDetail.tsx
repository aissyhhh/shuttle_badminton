"use client";

import { useState } from "react";

import { TournamentTabs } from "./TournamentTabs";
import { TournamentInfo } from "./TournamentInfo";
import { TournamentPlayer } from "./TournamentPlayer";
import { TournamentDraw } from "./TournamentDraw";
import { TournamentMatch } from "./TournamentMatch";
import { TurnamenApi } from "@/lib/tournamentsApi";

interface TournamentDetailProps {
  tournament: TurnamenApi;
  initialTab?: string;
}

export function TournamentDetail({ tournament, initialTab }: TournamentDetailProps) {
  const [activeTab, setActiveTab] = useState( initialTab || "INFORMASI" );

  return (
    <>
      <TournamentTabs activeTab={activeTab} onTabChange={setActiveTab}/>

      <main className="bg-white px-6 py-7 md:px-20">
        {activeTab === "INFORMASI" && (
          <TournamentInfo
            tournament={tournament as unknown as Parameters<typeof TournamentInfo>[0]["tournament"]}
          />
        )}

        {activeTab === "PLAYERS" && (
          <TournamentPlayer tournamentId={String(tournament.id)} />
        )}

        {activeTab === "DRAW" && (
          <TournamentDraw tournamentId={String(tournament.id)} />
        )}

        {activeTab === "MATCH" && (
          <TournamentMatch tournamentId={String(tournament.id)} status={tournament.status} />
        )}
      </main>
    </>
  );
}