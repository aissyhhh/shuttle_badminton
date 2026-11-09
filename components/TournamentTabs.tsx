"use client";

import Link from "next/link";

interface TournamentTabsProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  tournamentId?: string;
}

const tabs = ["INFORMASI", "PLAYERS", "DRAW", "MATCH"];

export function TournamentTabs({ activeTab, onTabChange, tournamentId }: TournamentTabsProps) {
  return (
    <div className="relative z-20 mx-6 -mt-6 md:mx-20">
      <div className="grid grid-cols-4 overflow-hidden rounded-lg bg-white shadow-[0_2px_8px_rgba(0,0,0,0.16)]">
        {tabs.map((tab, index) => {
          const tabClassName = `px-4 py-3 text-center text-[11px] font-semibold transition
            ${index !== tabs.length - 1
                ? "border-r border-[#B8B8B8]" 
                : ""
            }
            ${activeTab === tab
                ? "text-[#263D50] underline underline-offset-4"
                : "text-[#52616D] hover:text-[#BD6868]"
            }
          `;

          if (tournamentId) {
            return (
              <Link key={tab} href={`/turnamen/${tournamentId}?tab=${tab}`} className={tabClassName}>
                {tab}
              </Link>
            );
          }

          return (
            <button key={tab} type="button" onClick={() => onTabChange?.(tab)} className={tabClassName}>
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}