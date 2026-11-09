import { Player } from "@/lib/players";

interface RankingTableProps {players: Player[]}

export function RankTable({ players }: RankingTableProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-white p-7 shadow-[0_2px_10px_rgba(0,0,0,0.15)]">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#8795A1] text-left text-sm text-[#263D50]">
              <th className="px-4 py-3 font-medium">RANK</th>
              <th className="px-4 py-3 font-medium">NAME</th>
              <th className="px-4 py-3 text-center font-medium">NATION</th>
              <th className="px-4 py-3 text-center font-medium">TOURNAMENTS</th>
              <th className="px-4 py-3 text-center font-medium">POINTS</th>
            </tr>
          </thead>

          <tbody>
            {players.length > 0 ? (players.map((player) => (
                <tr key={player.id} className="border-b border-gray-200 text-sm text-[#263D50]">
                  <td className="px-4 py-4 font-semibold">{player.worldRank}</td>
                  <td className="max-w-100 px-4 py-4 font-semibold">{player.name}</td>
                  <td className="px-4 py-4 text-center font-semibold">INA</td>
                  <td className="px-4 py-4 text-center font-semibold">{player.tournaments ?? "-"}</td>
                  <td className="px-4 py-4 text-center font-semibold">{player.points ?? "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-12 text-center text-sm text-[#9BA3AA]">Pemain tidak ditemukan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}