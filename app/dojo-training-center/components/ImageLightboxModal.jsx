"use client";

import React, { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageLightboxModal({
  images = [],
  currentIndex = 0,
  onIndexChange,
  image,
  onClose,
}) {
  const activeList =
    images && images.length > 0 ? images : image ? [image] : [];
  const activeIdx =
    typeof currentIndex === "number" &&
    currentIndex >= 0 &&
    currentIndex < activeList.length
      ? currentIndex
      : 0;
  const current = activeList[activeIdx] || null;
  const hasMultiple = activeList.length > 1;

  const handlePrev = useCallback(() => {
    if (!hasMultiple) return;
    const prevIndex =
      (activeIdx - 1 + activeList.length) % activeList.length;
    if (onIndexChange) onIndexChange(prevIndex);
  }, [hasMultiple, activeIdx, activeList.length, onIndexChange]);

  const handleNext = useCallback(() => {
    if (!hasMultiple) return;
    const nextIndex = (activeIdx + 1) % activeList.length;
    if (onIndexChange) onIndexChange(nextIndex);
  }, [hasMultiple, activeIdx, activeList.length, onIndexChange]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    },
    [onClose, handlePrev, handleNext]
  );

  useEffect(() => {
    if (!current) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [current, handleKeyDown]);

  if (!current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Preview"
      onClick={onClose}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md transition-opacity duration-200 select-none animate-in fade-in"
    >
      {/* Top Header / Bar - Clean Single Line with Title & Counter */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl flex items-center justify-between gap-3 mb-2.5 px-1 sm:px-2 text-white select-none"
      >
        <div className="flex items-center gap-2.5 truncate">
          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white drop-shadow truncate">
            {current.title}
          </h3>
          {hasMultiple && (
            <span className="text-[11px] sm:text-xs font-semibold text-white/90 bg-white/15 px-2.5 py-0.5 rounded-full border border-white/20 backdrop-blur-xs shrink-0">
              {activeIdx + 1} / {activeList.length}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:inline-block text-[11px] font-medium text-slate-300 bg-white/10 px-2 py-0.5 rounded border border-white/15">
            ESC / Arrows
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all border border-white/20 cursor-pointer shadow-md"
            aria-label="Close image modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image with Navigation Arrows */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full flex items-center justify-center"
      >
        {/* Prev Arrow Button */}
        {hasMultiple && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Image"
            className="absolute left-2 sm:-left-14 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-[#ff5722] backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/25 shadow-xl cursor-pointer hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Clean Floating Image (Transparent / Translucent Background, No Heavy Box) */}
        <div className="relative max-h-[75vh] flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.src}
            alt={current.alt || current.title}
            className="max-h-[72vh] max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl drop-shadow-2xl select-none"
          />
        </div>

        {/* Next Arrow Button */}
        {hasMultiple && (
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Image"
            className="absolute right-2 sm:-right-14 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-[#ff5722] backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/25 shadow-xl cursor-pointer hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
