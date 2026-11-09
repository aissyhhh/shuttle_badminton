"use client";

import { PlayerCategory } from "@/lib/players";
import { FilterButton } from "@/components/FilterButton";

interface PlayerFilterProps {
  category: PlayerCategory;
  onCategoryChange: (value: PlayerCategory) => void;
}

const categories: { label: string; value: PlayerCategory }[] = [
  { label: "Tunggal Putra", value: "tunggal-putra" },
  { label: "Tunggal Putri", value: "tunggal-putri" },
  { label: "Ganda Putra", value: "ganda-putra" },
  { label: "Ganda Putri", value: "ganda-putri" },
  { label: "Ganda Campuran", value: "ganda-campuran" },
];

export function PlayerFilter({ category, onCategoryChange }: PlayerFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {categories.map((item) => (
        <FilterButton
          key={item.value}
          label={item.label}
          active={category === item.value}
          onClick={() => onCategoryChange(item.value)}
        />
      ))}
    </div>
  );
}