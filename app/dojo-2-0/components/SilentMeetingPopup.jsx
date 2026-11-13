"use client";

import React, { useState, useEffect } from "react";
import { Calendar, X, ArrowRight } from "lucide-react";

export default function SilentMeetingPopup({ onOpenVideoModal }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show after scrolling past 200px or after 3.5 seconds
    const handleScroll = () => {
      if (window.scrollY > 200 && !isDismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    const timer = setTimeout(() => {
      if (!isDismissed) setIsVisible(true);
    }, 3500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [isDismissed]);

  if (!isVisible || isDismissed) return null;

  return (
    <aside
      aria-label="Book a virtual meeting popup"
      className="dojo-modal-root modern-page fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[95vw] sm:max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="relative overflow-hidden bg-slate-950/50 hover:bg-slate-950/60 backdrop-blur-xl backdrop-saturate-150 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.25)] flex items-center justify-between gap-3 sm:gap-5 transition-all duration-300">
        {/* Subtle Glass Top Rim Reflection */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

        {/* Calendar Icon with Translucent Pill & Live Availability Pulse */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0 text-[#ff5722]">
            <Calendar className="w-4 h-4 text-[#ff5722]" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>

          <div className="text-left">
            <p className="text-xs sm:text-[13.5px] font-semibold text-white tracking-tight leading-tight whitespace-nowrap">
              Looking to implement DOJO 2.0?
            </p>
            {/* Strictly 1 Line Subtitle */}
            <p className="text-[11px] sm:text-xs text-slate-300/90 whitespace-nowrap leading-none mt-1">
              Discuss with our Smart DOJO Solutions Lead
            </p>
          </div>
        </div>

        {/* CTA Button & Dismiss Action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenVideoModal}
            className="group inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#ff5722] to-[#ff6f00] hover:from-[#f4511e] hover:to-[#ff5722] shadow-[0_2px_12px_rgba(255,87,34,0.4)] hover:shadow-[0_4px_16px_rgba(255,87,34,0.6)] hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer border border-orange-400/30 whitespace-nowrap"
          >
            <span>Book Meeting</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss popup"
            className="w-7 h-7 rounded-full text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
