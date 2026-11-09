"use client";

import { useState } from "react";
import { players, PlayerCategory } from "@/lib/players";
import { SearchInput } from "@/components/SearchInput";
import { PlayerFilter } from "@/components/PlayerFilter";
import { PlayerCard } from "@/components/PlayerCard";
import { Pagination } from "@/components/Pagination";

const PAGE_SIZE = 10;

export function Players() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<PlayerCategory>("tunggal-putra");
  const [page, setPage] = useState(1);

  const filteredPlayers = players.filter((player) => {
    const matchSearch = player.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory = player.category === category;

    return matchSearch && matchCategory;
  });

  const totalPages = Math.max(1, Math.ceil(filteredPlayers.length / PAGE_SIZE));
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

  const handleCategoryChange = (value: PlayerCategory) => {
    setCategory(value);
    setPage(1);
  };

  return (
    <div className="mx-4 py-7 sm:mx-6 lg:mx-10">
      <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="w-full lg:w-[420px] lg:shrink-0 xl:w-[520px]">
  <SearchInput
    value={search}
    onChange={handleSearch}
    placeholder="Cari Pemain..."
  />
</div>

        <PlayerFilter
          category={category}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {currentPlayers.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
          {currentPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-[16px] text-[#9BA3AA]">Pemain tidak ditemukan.</p>
        </div>
      )}

      <div className="mt-10 flex justify-center sm:mt-12">
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}