
"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTournaments } from "@/lib/tournamentsApi";
import { TournamentFilter } from "./TournamentFilter";
import { TournamentCard } from "./TournamentCard";
import { Pagination } from "./Pagination";

const PAGE_SIZE = 5;

export function Tournament() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);

  // Mengambil data dari API
  const {
    data: tournaments = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["tournaments"],
    queryFn: getTournaments,
  });

  // Memfilter turnamen berdasarkan input pengguna
  const filteredTournaments = useMemo(() => {
    return tournaments.filter((tournament) => {
      const matchSearch = tournament.nama
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      const matchStatus =
        status === "all" || tournament.status === status;

      // Kategori diambil dari kelas_turnamen
      const matchCategory =
        category === "all" ||
        tournament.kelas_turnamen?.some((kelas) => {
          const sektor = kelas.sektor.toLowerCase();
          const kategoriUsia = kelas.kategori_usia
            .toLowerCase()
            .replace(/[\s_]+/g, "-");

          const categoryValue = category
            .toLowerCase()
            .replace(/[\s_]+/g, "-");

          const sektorMap: Record<string, string> = {
            ms: "tunggal-putra",
            ws: "tunggal-putri",
            md: "ganda-putra",
            wd: "ganda-putri",
            xd: "ganda-campuran",
          };

          return (
            sektor === categoryValue ||
            sektorMap[sektor] === categoryValue ||
            kategoriUsia === categoryValue
          );
        });

      // Bandingkan tanggal dalam format YYYY-MM-DD
      const matchFromDate =
        !fromDate ||
        tournament.tanggal_berakhir.slice(0, 10) >= fromDate;

      const matchToDate =
        !toDate ||
        tournament.tanggal_mulai.slice(0, 10) <= toDate;

      return (
        matchSearch &&
        matchStatus &&
        matchCategory &&
        matchFromDate &&
        matchToDate
      );
    });
  }, [
    tournaments,
    search,
    status,
    category,
    fromDate,
    toDate,
  ]);

  // Menghitung jumlah halaman
  const totalPages = Math.max(
    1,
    Math.ceil(filteredTournaments.length / PAGE_SIZE)
  );

  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;

  const currentTournaments = filteredTournaments.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  // Mengubah filter sekaligus kembali ke halaman pertama
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatus = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const handleCategory = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const handleFromDate = (value: string) => {
    setFromDate(value);
    setPage(1);
  };

  const handleToDate = (value: string) => {
    setToDate(value);
    setPage(1);
  };

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-stretch gap-6 lg:flex-row lg:items-start lg:gap-5">
          <TournamentFilter
            search={search}
            status={status}
            category={category}
            fromDate={fromDate}
            toDate={toDate}
            onSearchChange={handleSearch}
            onStatusChange={handleStatus}
            onCategoryChange={handleCategory}
            onFromDateChange={handleFromDate}
            onToDateChange={handleToDate}
          />

          <div className="flex flex-1 flex-col gap-3">
            {isLoading ? (
              <div className="flex min-h-50 items-center justify-center text-sm text-[#9BA3AA]">
                Memuat data turnamen...
              </div>
            ) : isError ? (
              <div className="flex min-h-50 items-center justify-center rounded-lg bg-white p-4 text-center text-sm text-red-500 shadow">
                Gagal memuat data turnamen. Silakan coba lagi.
              </div>
            ) : currentTournaments.length > 0 ? (
              currentTournaments.map((tournament) => (
                <TournamentCard
                  key={tournament.id}
                  tournament={tournament}
                />
              ))
            ) : (
              <div className="flex min-h-50 items-center justify-center rounded-lg bg-white shadow">
                <p className="text-sm text-[#9BA3AA]">
                  Turnamen tidak ditemukan.
                </p>
              </div>
            )}
          </div>
        </div>

        {!isLoading && !isError && filteredTournaments.length > 0 && (
          <div className="mt-10 flex justify-center">
            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </section>
  );
}
