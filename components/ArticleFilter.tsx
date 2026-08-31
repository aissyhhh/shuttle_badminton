"use client";

export const categories = [
  { label: "Semua", value: "semua" },
  { label: "Turnamen", value: "turnamen" },
  { label: "Atlet", value: "atlet" },
  { label: "Tips & Techniques", value: "tips" },
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
    <div className="mb-8 flex items-center gap-3">
      <div className="relative flex-1 ">
        <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input value={search} onChange={(e) => onSearchChange(e.target.value)} placeholder="Cari Pemain..."
          className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-[#C06D6D]"/>
      </div>

      {categories.map((item) => {
        const active = category === item.value;
        return (
          <button key={item.value} onClick={() => onCategoryChange(item.value)} className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              active ? "bg-[#914D4D] text-white" : "border border-gray-200 bg-white text-[#823F3F] hover:border-[#914D4D]"}`}>
            {item.label}
          </button>
        );
      })}
    </div>
  );
}