"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { players, PlayerCategory } from "@/lib/players";
import { tournaments } from "@/lib/tournaments";
import { SearchInput } from "./SearchInput";
import { FilterButton } from "./FilterButton";
import { Pagination } from "./Pagination";

interface TournamentPlayerProps { tournamentId: string }

const PAGE_SIZE = 10;

const categories: {
  label: string;
  value: PlayerCategory;
}[] = [
  {label: "Tunggal Putra", value: "tunggal-putra"},
  {label: "Tunggal Putri", value: "tunggal-putri"},
  {label: "Ganda Putra", value: "ganda-putra"},
  {label: "Ganda Putri", value: "ganda-putri"},
  {label: "Ganda Campuran", value: "ganda-campuran"},
];

export function TournamentPlayer({tournamentId}: TournamentPlayerProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<PlayerCategory>("tunggal-putra");
  const [page, setPage] = useState(1);

  const tournamentPlayers = useMemo(() => {
    const tournament = tournaments.find(
      (item) => item.id === tournamentId
    );

    if (!tournament) {
      return [];
    }

    return players.filter((player) => tournament.playerIds?.includes(player.id))
  }, [tournamentId]);

  const filteredPlayers = useMemo(() => {
    return tournamentPlayers.filter((player) => {
      const matchSearch = player.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory = player.category === category;
      return matchSearch && matchCategory;
    });
  }, [tournamentPlayers, search, category]);

  const totalPages = Math.max(1,
    Math.ceil(filteredPlayers.length / PAGE_SIZE)
  );

  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const currentPlayers = filteredPlayers.slice(
      startIndex,
      startIndex + PAGE_SIZE
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategory = (value: PlayerCategory) => {
    setCategory(value);
    setPage(1);
  };

  return (
    <section>
      <h2 className="border-b border-[#A5A5A5] pb-3 text-base font-bold text-[#914747]">PLAYERS</h2>
      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center">
  <div className="w-full lg:min-w-48 lg:max-w-113 lg:flex-1">
    <SearchInput
      value={search}
      onChange={handleSearch}
      placeholder="Cari Pemain..."
    />
  </div>

  <div className="grid grid-cols-2 gap-3 lg:flex lg:shrink-0 lg:items-center">
    {categories.map((item) => (
      <FilterButton
        key={item.value}
        label={item.label}
        active={category === item.value}
        onClick={() => handleCategory(item.value)}
      />
    ))}
  </div>
</div>

      <div className="mt-5 overflow-hidden rounded-lg bg-white shadow-[0_2px_8px_rgba(0,0,0,0.14)]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[11px] text-[#263D50]">
            <thead>
              <tr className="border-b border-[#9BA3AA]">
                <th className="w-16 px-4 py-3 text-left font-semibold">NO</th>
                <th className="px-4 py-3 text-left font-semibold">PLAYER</th>
                <th className="w-32 px-4 py-3 text-center font-semibold">NATION</th>
                <th className="w-36 px-4 py-3 text-center font-semibold">WORLD RANK</th>
              </tr>
            </thead>

            <tbody>
              {currentPlayers.length > 0 ? (currentPlayers.map((player, index) => (
                    <tr key={player.id} className="border-b border-[#D9DDE0] last:border-b-0">
                      <td className="px-4 py-3">{startIndex + index + 1}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                            <Image src={player.image} alt={player.name} fill sizes="36px" className="object-cover"/>
                          </div>

                          <span className="font-semibold">{player.name}</span>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-center">
                        {player.country === "Indonesia" ? "INA" : player.country}
                      </td>

                      <td className="px-4 py-3 text-center font-semibold">
                        {player.worldRank ? `#${player.worldRank}` : "-"}
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-[#9BA3AA]">
                    Pemain tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </section>
  );
}