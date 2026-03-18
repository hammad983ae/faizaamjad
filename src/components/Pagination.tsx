"use client";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const pages = [];
  // Show a few pages around current
  for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
    pages.push(i);
  }

  return (
    <div className="mt-16 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 border border-slate-200 rounded-lg hover:border-primary transition-colors disabled:opacity-40"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      {currentPage > 2 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="w-10 h-10 rounded-lg font-medium hover:bg-slate-100"
          >
            1
          </button>
          {currentPage > 3 && <span className="px-2 text-slate-400">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg font-medium transition-colors ${currentPage === page
              ? "bg-primary text-white font-bold"
              : "hover:bg-slate-100"
            }`}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages - 1 && (
        <>
          {currentPage < totalPages - 2 && <span className="px-2 text-slate-400">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="w-10 h-10 rounded-lg font-medium hover:bg-slate-100"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 border border-slate-200 rounded-lg hover:border-primary transition-colors disabled:opacity-40"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  );
}
