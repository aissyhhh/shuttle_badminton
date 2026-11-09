"use client";

import { PlayerCategory } from "@/lib/players";
import { SearchInput } from "@/components/SearchInput";
import { FilterButton } from "@/components/FilterButton";

interface RankFilterProps {
  search: string;
  category: PlayerCategory;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: PlayerCategory) => void;
}

const categories: { label: string; value: PlayerCategory }[] = [
  { label: "Tunggal Putra", value: "tunggal-putra" },
  { label: "Tunggal Putri", value: "tunggal-putri" },
  { label: "Ganda Putra", value: "ganda-putra" },
  { label: "Ganda Putri", value: "ganda-putri" },
  { label: "Ganda Campuran", value: "ganda-campuran" },
];

export function RankFilter({ search, onSearchChange, category, onCategoryChange }: RankFilterProps) {
  return (
  <div className="mb-6 flex w-full flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
    <div className="w-full lg:min-w-0 lg:flex-1">
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="Cari Pemain..."
      />
    </div>

    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:gap-3 [&>button]:h-10 [&>button]:w-full [&>button]:whitespace-nowrap [&>button]:text-xs sm:[&>button]:h-11 sm:[&>button]:text-sm lg:[&>button]:w-[140px]">
      {categories.map((item) => (
        <FilterButton
          key={item.value}
          label={item.label}
          active={category === item.value}
          onClick={() => onCategoryChange(item.value)}
        />
      ))}
    </div>
  </div>
);
}