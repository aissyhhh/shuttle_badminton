"use client";
import { SearchInput } from "./SearchInput";
import { FilterButton } from "./FilterButton";

export const categories = [
  { label: "Semua", value: "semua" },
  { label: "Turnamen", value: "turnamen" },
  { label: "Atlet", value: "atlet" },
  { label: "Tips & Techniques", value: "kiat dan teknik" },
];

interface ArticleFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
}

export function ArticleFilter({
  search, onSearchChange,
  category, onCategoryChange,
}: ArticleFilterProps) {
  return (
    <div className="mb-8 flex w-full flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center">
      <div className="w-full lg:flex-1">
        <SearchInput value={search} onChange={onSearchChange}/>
      </div>

      <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:flex-wrap lg:w-auto lg:flex-nowrap lg:gap-3">
        {categories.map((item) => (
          <FilterButton key={item.value} label={item.label} active={category === item.value} onClick={() => onCategoryChange(item.value)}/>
        ))}
      </div>
    </div>
  );
}