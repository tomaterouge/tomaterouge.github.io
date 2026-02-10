interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-12 gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 disabled:opacity-50 hover:bg-zinc-700 transition disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span className="px-4 py-2 text-zinc-500 flex items-center">
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 disabled:opacity-50 hover:bg-zinc-700 transition disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}