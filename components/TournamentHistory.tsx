"use client";

import { useState } from "react";

import { Player } from "@/lib/players";
import { SearchInput } from "./SearchInput";
import { Pagination } from "./Pagination";
import { ChevronDown } from "lucide-react";

interface TournamentHistoryProps { player: Player }

const HISTORY_PAGE_SIZE = 5;

export function TournamentHistory({player}: TournamentHistoryProps) {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("semua");
  const [page, setPage] = useState(1);

  const history = player.tournamentHistory ?? [];

  const filteredHistory = history.filter((item) => {
    const matchSearch = item.tournament
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchYear = year === "semua" || item.year === Number(year);

    return matchSearch && matchYear;
  });


  const totalPages = Math.max(1,
    Math.ceil(filteredHistory.length / HISTORY_PAGE_SIZE)
  );

  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * HISTORY_PAGE_SIZE;
  const currentHistory = filteredHistory.slice(
    startIndex,
    startIndex + HISTORY_PAGE_SIZE
  );

  const years = Array.from(
    new Set(history.map((item) => item.year))
  ).sort((a, b) => b - a);

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-[#263D50]">
          TOURNAMENT HISTORY
        </h2>

        <div className="flex gap-3">
          <SearchInput value={search} onChange={(value) => { setSearch(value), setPage(1)}}
            placeholder="Cari Turnamen..."/>

            <div className="relative">
                <select value={year} onChange={(e) => { setYear(e.target.value), setPage(1) }}
                    className="h-9 w-32 appearance-none rounded-full border border-gray-200 bg-white px-4 pr-9 text-xs text-[#263D50] outline-none focus:border-[#C06D6D]">
                        <option value="semua">Tahun</option>
                        {years.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                </select>

                <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#263D50]"/>
            </div>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl bg-white p-7 shadow-[0_2px_10px_rgba(0,0,0,0.15)]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#8795A1] text-left text-sm text-[#263D50]">
                <th className="px-4 py-3 font-medium">TURNAMEN</th>
                <th className="px-4 py-3 font-medium">TANGGAL</th>
                <th className="px-4 py-3 font-medium">HASIL</th>
                <th className="px-4 py-3 font-medium">POSISI AKHIR</th>
              </tr>
            </thead>

            <tbody>
              {currentHistory.length > 0 ? (
                currentHistory.map((item, index) => (
                  <tr key={`${item.tournament}-${item.date}-${index}`} className="border-b border-gray-200 text-sm text-[#263D50]">
                    <td className="px-4 py-3 font-semibold">{item.tournament}</td>
                    <td className="px-4 py-3">{item.date}</td>
                    <td className={`px-4 py-3 font-semibold ${
                      item.result.toLowerCase() === "menang" ? "text-[#186049]"
                        : item.result.toLowerCase() === "kalah" ? "text-[#BC0202]" : "text-[#263D50]"
                      }`}
                    >
                      {item.result}
                    </td>
                    <td className="px-4 py-3 font-semibold">{item.position}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-sm text-[#9BA3AA]">Riwayat turnamen tidak ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setPage}/>
          </div>
        )}
      </div>
    </section>
  );
}