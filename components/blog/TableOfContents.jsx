"use client";

import { useState, useEffect } from "react";
import { ListCollapse, ChevronRight } from "lucide-react";

export default function TableOfContents({ sections = [] }) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (!sections.length) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(`chapter-${sections[i].index}`);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(`chapter-${sections[i].index}`);
          return;
        }
      }
      if (sections.length > 0) {
        setActiveId(`chapter-${sections[0].index}`);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  if (!sections || sections.length < 2) return null;

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const yOffset = -90; // offset for sticky navbar
      const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Table of contents"
      className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-xs"
    >
      <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <ListCollapse className="w-3.5 h-3.5 text-[#FF5E14]" />
          <span className="text-[11px] font-bold tracking-wider uppercase text-slate-600">
            Table of Contents
          </span>
        </div>
        <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
          {sections.length} parts
        </span>
      </div>

      <ol
        className="max-h-[280px] overflow-y-auto pr-1.5 space-y-0.5 text-[12px]"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#e2e8f0 transparent",
        }}
      >
        {sections.map((sec, idx) => {
          const targetId = `chapter-${sec.index}`;
          const isActive = activeId === targetId;
          const chapterNum = String(idx + 1).padStart(2, "0");

          return (
            <li key={sec.index}>
              <a
                href={`#${targetId}`}
                onClick={(e) => handleLinkClick(e, targetId)}
                className={`group flex items-start gap-2 py-1 px-2 rounded-md transition-all duration-150 ${
                  isActive
                    ? "bg-orange-50 text-[#FF5E14] font-semibold shadow-2xs"
                    : "text-slate-600 hover:text-[#001659] hover:bg-slate-50"
                }`}
              >
                <span
                  className={`text-[10px] font-mono shrink-0 mt-0.5 ${
                    isActive ? "text-[#FF5E14] font-bold" : "text-slate-400 group-hover:text-slate-500"
                  }`}
                >
                  {chapterNum}
                </span>
                <span className="line-clamp-2 leading-snug flex-1">
                  {sec.heading}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
