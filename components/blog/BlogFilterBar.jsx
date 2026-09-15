"use client";

import { Search, X, Sparkles, SlidersHorizontal } from "lucide-react";

export default function BlogFilterBar({
  categories = [],
  activeCategory = "All",
  onSelectCategory,
  searchQuery = "",
  onSearchChange,
  totalResults = 0,
}) {
  const isFiltered = activeCategory !== "All" || Boolean(searchQuery.trim());

  return (
    <div className="mb-6 space-y-3">
      {/* Search Input & Real-time Indicator Bar */}
      <div className="blog-filter-bar-wrap flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        {/* Search Field */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search articles by title, topic, or keyword..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="blog-search-input w-full rounded-xl bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200/70 focus:border-[#FF5E14] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/15 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Counter & Active Filter Badge */}
        <div className="flex items-center justify-between sm:justify-end gap-2 px-1 text-slate-500 font-medium shrink-0">
          <div className="blog-search-counter inline-flex items-center gap-1.5 rounded-full bg-slate-100/90 text-slate-600 font-semibold whitespace-nowrap">
            <span>Showing</span>
            <span className="font-extrabold text-[#001659]">
              {totalResults}
            </span>
            <span>{totalResults === 1 ? "article" : "articles"}</span>
          </div>

          {isFiltered && (
            <button
              type="button"
              onClick={() => {
                onSelectCategory("All");
                onSearchChange("");
              }}
              className="blog-filter-pill inline-flex items-center gap-1 text-[#FF5E14] bg-orange-50 hover:bg-orange-100/80 border border-orange-200/70 transition-all cursor-pointer"
              style={{ borderRadius: "9999px" }}
            >
              <span>Reset</span>
              <X className="w-2.5 h-2.5" />
            </button>
          )}
        </div>
      </div>

      {/* Modern Topic Category Pills with Compact Geometry */}
      <div className="relative">
        <div
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 scrollbar-none no-scrollbar scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {categories.map((cat) => {
            const isActive =
              activeCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                style={{
                  borderRadius: "9999px",
                }}
                className={`blog-filter-pill inline-flex items-center whitespace-nowrap transition-all duration-200 cursor-pointer focus:outline-none shrink-0 ${
                  isActive
                    ? "bg-[#001659] text-white shadow-xs border border-[#001659]"
                    : "bg-white text-slate-600 hover:text-[#001659] hover:bg-slate-50 hover:border-slate-300 border border-slate-200/90 shadow-2xs"
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14] mr-1.5 inline-block shrink-0 animate-pulse" />
                )}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
