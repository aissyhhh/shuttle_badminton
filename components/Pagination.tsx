interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1}
        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-sm text-[#823F3F] disabled:opacity-40"
      >
        -
      </button>

      {pages.map((item) => (
        <button key={item} onClick={() => onPageChange(item)} className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium ${
            item === currentPage ? "bg-[#914D4D] text-white" : "border border-gray-200 text-[#823F3F]"
          }`}
        >
          {item}
        </button>
      ))}

      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages}
        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-sm text-[#823F3F] disabled:opacity-40"
      >
        -
      </button>
    </div>
  );
}