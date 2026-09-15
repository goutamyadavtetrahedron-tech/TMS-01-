"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BlogPagination({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 9,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  // Generate page numbers with smart ellipsis (e.g., 1, 2, 3 ... 8)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show page 1
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        start = 2;
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
        end = totalPages - 1;
      }

      if (start > 2) {
        pages.push("ellipsis-1");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("ellipsis-2");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <nav
      aria-label="Blog pagination navigation"
      className="mt-10 sm:mt-12 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      {/* Informative Results Counter */}
      <div className="blog-pagination-counter text-slate-500 font-medium order-2 sm:order-1">
        Showing{" "}
        <span className="font-extrabold text-[#001659]">{startItem}</span>–
        <span className="font-extrabold text-[#001659]">{endItem}</span> of{" "}
        <span className="font-extrabold text-[#001659]">{totalItems}</span>{" "}
        publications
      </div>

      {/* Page Navigation Controls */}
      <div className="flex items-center gap-1.5 order-1 sm:order-2">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          style={{ borderRadius: "8px" }}
          className={`blog-pagination-btn blog-pagination-nav transition-all cursor-pointer ${
            currentPage === 1
              ? "opacity-40 cursor-not-allowed text-slate-400 bg-slate-100/80 border border-slate-200/60"
              : "text-slate-700 bg-white hover:bg-slate-50 hover:text-[#FF5E14] hover:border-slate-300 border border-slate-200/90 shadow-2xs active:scale-95"
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Numeric Page Buttons */}
        <div className="flex items-center gap-1">
          {pages.map((page, idx) => {
            if (typeof page === "string" && page.startsWith("ellipsis")) {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-1 text-slate-400 text-xs font-bold select-none tracking-widest"
                >
                  •••
                </span>
              );
            }

            const isCurrent = page === currentPage;
            return (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                aria-current={isCurrent ? "page" : undefined}
                style={{ borderRadius: "8px" }}
                className={`blog-pagination-btn blog-pagination-num transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-[#001659] text-white shadow-xs ring-1 ring-[#001659]/15 scale-105"
                    : "bg-white text-slate-700 hover:bg-slate-50 hover:text-[#001659] hover:border-slate-300 border border-slate-200/90 shadow-2xs active:scale-95"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
          style={{ borderRadius: "8px" }}
          className={`blog-pagination-btn blog-pagination-nav transition-all cursor-pointer ${
            currentPage === totalPages
              ? "opacity-40 cursor-not-allowed text-slate-400 bg-slate-100/80 border border-slate-200/60"
              : "text-slate-700 bg-white hover:bg-slate-50 hover:text-[#FF5E14] hover:border-slate-300 border border-slate-200/90 shadow-2xs active:scale-95"
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </nav>
  );
}
