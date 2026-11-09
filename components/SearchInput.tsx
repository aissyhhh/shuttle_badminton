"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Cari...",
  className = "",
}: SearchInputProps) {
  return (
    <div className="relative w-full">
      <Search size={17} className=" absolute left-3 top-1/2 -translate-y-1/2 text-[#9BA3AA] sm:left-3.5"/>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={` h-10 w-full rounded-full border border-[#C8D0D6] bg-white pl-9 pr-3 text-xs text-[#263D50] outline-none transition-colors focus:border-[#C06D6D] sm:h-11 sm:pl-10 sm:text-sm ${className} `}/>
    </div>
  );
}