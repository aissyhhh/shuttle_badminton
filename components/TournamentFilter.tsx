
"use client";

import { SearchInput } from "./SearchInput";

interface TournamentFilterProps {
  search: string;
  status: string;
  category: string;
  fromDate: string;
  toDate: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onFromDateChange: (value: string) => void;
  onToDateChange: (value: string) => void;
}

export function TournamentFilter({
  search,
  onSearchChange,
  status,
  onStatusChange,
  category,
  onCategoryChange,
  fromDate,
  onFromDateChange,
  toDate,
  onToDateChange,
}: TournamentFilterProps) {
  return (
    <aside className="w-full rounded-lg bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.16)] sm:p-5 lg:w-72 lg:shrink-0 lg:p-6">
      <div className="relative">
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Cari Turnamen..."
          className="rounded-md"
        />
      </div>

      <h3 className="mt-6 text-xs font-bold text-[#263D50]">
        DATE
      </h3>

      <div className="mt-2 space-y-3">
        <div>
          <p className="mb-1 text-[10px] text-[#8795A1]">From</p>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => onFromDateChange(e.target.value)}
            max={toDate || undefined}
            className="h-10 w-full cursor-pointer rounded-md border border-[#C8D0D6] bg-[#F8F8F8] px-3 text-xs text-[#263D50] outline-none focus:border-[#C06D6D]"
          />
        </div>

        <div>
          <p className="mb-1 text-[10px] text-[#8795A1]">To</p>
          <input
            type="date"
            value={toDate}
            min={fromDate || undefined}
            onChange={(e) => onToDateChange(e.target.value)}
            className="h-10 w-full cursor-pointer rounded-md border border-[#C8D0D6] bg-[#F8F8F8] px-3 text-xs text-[#263D50] outline-none focus:border-[#C06D6D]"
          />
        </div>
      </div>

      <h3 className="mt-6 text-xs font-bold text-[#263D50]">
        TOURNAMENT
      </h3>

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="mt-2 h-10 w-full rounded-md border border-[#C8D0D6] bg-[#F8F8F8] px-3 text-xs text-[#263D50] outline-none focus:border-[#C06D6D]"
      >
        <option value="all">All</option>
        <option value="akan_datang">Upcoming</option>
        <option value="berlangsung">Ongoing</option>
        <option value="selesai">Completed</option>
      </select>

      <h3 className="mt-6 text-xs font-bold text-[#263D50]">
        AGE CATEGORY
      </h3>

      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="mt-2 h-10 w-full rounded-md border border-[#C8D0D6] bg-[#F8F8F8] px-3 text-xs text-[#263D50] outline-none focus:border-[#C06D6D]"
      >
        <option value="all">All</option>
        <option value="senior">Seniors</option>
        <option value="junior">Juniors</option>
      </select>
    </aside>
  );
}
