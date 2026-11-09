"use client";

import { useState } from "react";
import { players, PlayerCategory } from "@/lib/players";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Pagination } from "@/components/Pagination";
import { RankHero } from "@/components/RankHero";
import { RankFilter } from "@/components/RankFilter";
import { RankTable } from "@/components/RankTable";

const PAGE_SIZE = 10;

export default function RankingPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<PlayerCategory>("tunggal-putra");
  const [page, setPage] = useState(1);

  const filteredPlayers = players
    .filter((player) => {
      const matchSearch = player.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchCategory = player.category === category;

      return matchSearch && matchCategory;
    })
    .filter((player) => player.worldRank !== undefined)
    .sort((a, b) => (a.worldRank ?? 999) - (b.worldRank ?? 999));

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
    <>
      <Navbar />
      <RankHero />
      <main className="min-h-screen bg-white">
<div className="mx-auto w-full max-w-[1376px] px-4 py-10 sm:px-6 lg:px-8">          <RankFilter
            search={search}
            category={category}
            onSearchChange={handleSearch}
            onCategoryChange={handleCategoryChange}
          />
          <RankTable players={currentPlayers} />

          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}