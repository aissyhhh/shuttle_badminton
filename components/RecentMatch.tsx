import { players } from "@/lib/players";
import { tournaments } from "@/lib/tournaments";

export function RecentMatch() {
  const recentMatches = tournaments
    .flatMap((tournament) => {
      if (!tournament.draw) return [];

      return tournament.draw.flatMap((draw) => {
        const matches = draw.final ?? [];

        return matches.map((match) => {
          const player1 = players.find(
            (player) => player.id === match.player1Id,
          );

          const player2 = players.find(
            (player) => player.id === match.player2Id,
          );

          if (!player1 || !player2) return null;

          return {
            tournament: tournament.name,
            category: getCategoryName(draw.category),
            date: tournament.endDate,
            player1,
            player2,
            score1: match.score1 ?? 0,
            score2: match.score2 ?? 0,
          };
        });
      });
    })
    .filter(Boolean);

  return (
    <section className="bg-[#FAF8F7] px-4 py-10 sm:px-6 sm:py-12 lg:py-14">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-6 border-b border-[#C58B8B] pb-2">
          <h2 className="text-xl font-semibold text-[#823F3F] sm:text-2xl">
            Match Results
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {recentMatches.map((match, index) => {
            if (!match) return null;

            return (
              <div key={index} className="min-w-0 overflow-hidden rounded-lg bg-white shadow-[0_3px_12px_rgba(130,63,63,0.12)]">
                <div className="flex items-center justify-between gap-3 bg-[#914D4D] px-4 py-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-white">
                      {match.tournament}
                    </h3>

                    <p className="text-[10px] text-white/70">
                      {match.category}
                    </p>
                  </div>

                  <span className="shrink-0 text-[10px] text-white/70">
                    {match.date}
                  </span>
                </div>

                <div className="space-y-1 p-2 sm:p-3">
                  <MatchPlayer name={match.player1.name} country={match.player1.country} score={match.score1}/>

                  <MatchPlayer name={match.player2.name} country={match.player2.country} score={match.score2}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MatchPlayer({name, country, score}: {
  name: string;
  country: string;
  score: number;
}) {
  return (
    <div className="flex min-w-0 items-center px-2 py-3 sm:px-4">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[#823F3F]">{name}</p>

          <p className="text-[10px] text-[#756B6B]">{country}</p>
        </div>
      </div>

      <div className="shrink-0 text-sm font-bold text-[#823F3F]">{score}</div>
    </div>
  );
}

function getCategoryName(category: string) {
  const categories: Record<string, string> = {
    "tunggal-putra": "Men's Singles Final",
    "tunggal-putri": "Women's Singles Final",
    "ganda-putra": "Men's Doubles Final",
    "ganda-putri": "Women's Doubles Final",
    "ganda-campuran": "Mixed Doubles Final",
  };

  return categories[category] ?? category;
}