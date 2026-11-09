"use client";

interface FilterButtonProps {
  label: string;
  active?: boolean;
  onClick: () => void;
}

export function FilterButton({label, active = false, onClick}: FilterButtonProps) {
  return (
    <button type="button" onClick={onClick} className={`h-10 w-full whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium transition-colors sm:h-10.5 sm:w-32 sm:px-5 sm:text-sm md:w-37.5
      ${active
          ? "border-[#BD6868] bg-[#BD6868] text-white"
          : "border-[#BD6868] bg-white text-[#BD6868] hover:bg-[#BD6868] hover:text-white"
        }
      `}
    >
      {label}
    </button>
  );
}