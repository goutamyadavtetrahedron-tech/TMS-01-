"use client";

import React, { useState, useEffect } from "react";
import { Video, X, ArrowRight } from "lucide-react";

export default function SilentMeetingPopup({ onOpenVideoModal }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show after 1.5 seconds or immediately when scrolling > 80px
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  if (isDismissed) return null;

  return (
    <aside
      aria-label="Book a virtual meeting popup"
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[9990] w-[calc(100%-2rem)] sm:w-auto max-w-xl pointer-events-none"
      style={{ fontFamily: "var(--font-poppins, 'Poppins', sans-serif)" }}
    >
      <div
        className={`relative overflow-hidden bg-slate-950/45 hover:bg-slate-950/55 backdrop-blur-xl backdrop-saturate-150 text-white border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.25)] rounded-2xl sm:rounded-full p-3 sm:px-5 sm:py-2.5 flex items-center justify-between sm:justify-center gap-3 sm:gap-4 transition-all duration-500 ease-out transform ${
          isVisible
            ? "translate-y-0 opacity-100 pointer-events-auto scale-100"
            : "translate-y-24 opacity-0 pointer-events-none scale-95"
        }`}
      >
        {/* Subtle Glass Top Rim Reflection */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

        {/* Pulsing Live Availability Indicator */}
        <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#ff5722]/20 border border-[#ff5722]/30 text-[#ff5722] shrink-0">
          <Video className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#ff5722]" />
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
        </div>

        {/* Text Pitch */}
        <div className="flex-1 pr-1 sm:pr-2">
          <div className="text-xs sm:text-[14px] font-semibold text-white leading-tight flex items-center gap-1.5">
            <span>Book a Virtual Meeting</span>
          </div>
          <div className="text-[11px] sm:text-xs text-slate-300/90 mt-0.5 leading-tight">
            1-on-1 with Principal Dojo Architects • Live Virtual Booking
          </div>
        </div>

        {/* Action Button & Dismiss */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://cal.com/tetrahedron/dojo"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpenVideoModal?.();
            }}
            className="group inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#ff5722] to-[#ff6f00] hover:from-[#f4511e] hover:to-[#ff5722] text-white text-xs sm:text-sm font-semibold shadow-[0_2px_12px_rgba(255,87,34,0.4)] hover:shadow-[0_4px_16px_rgba(255,87,34,0.6)] hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer border border-orange-400/30"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss meeting popup"
            className="w-7 h-7 rounded-full text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
