"use client";

import React, { useState, useEffect } from "react";
import { Video, X, ArrowRight } from "lucide-react";

export default function SilentMeetingPopup({ onOpenVideoModal }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user already dismissed it during this browser session
    try {
      const dismissed = sessionStorage.getItem("silent_meeting_dismissed");
      if (dismissed === "true") {
        setIsDismissed(true);
        return;
      }
    } catch (e) {
      // sessionStorage not available
    }

    // Timer to trigger silent pop up after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Or trigger when user has scrolled down > 250px
    const handleScroll = () => {
      if (window.scrollY > 250) {
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
    try {
      sessionStorage.setItem("silent_meeting_dismissed", "true");
    } catch (e) {
      // ignore
    }
  };

  if (isDismissed) return null;

  return (
    <aside
      aria-label="Book a virtual meeting popup"
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[9990] w-[calc(100%-2rem)] sm:w-auto max-w-xl pointer-events-none"
      style={{ fontFamily: "var(--font-poppins, 'Poppins', sans-serif)" }}
    >
      <div
        className={`relative bg-[#001730]/95 backdrop-blur-md text-white border border-white/20 shadow-2xl shadow-slate-950/50 rounded-2xl sm:rounded-full p-3 sm:px-5 sm:py-2.5 flex items-center justify-between sm:justify-center gap-3 sm:gap-4 transition-all duration-500 ease-out transform ${
          isVisible
            ? "translate-y-0 opacity-100 pointer-events-auto scale-100"
            : "translate-y-24 opacity-0 pointer-events-none scale-95"
        }`}
      >
        {/* Pulsing Live Availability Indicator */}
        <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#ff5722]/20 text-[#ff5722] shrink-0">
          <Video className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#ff5722]" />
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
        </div>

        {/* Text Pitch */}
        <div className="flex-1 pr-1 sm:pr-2">
          <div className="text-xs sm:text-[14px] font-bold text-white leading-tight flex items-center gap-1.5">
            <span>Book a Virtual Meeting</span>
          </div>
          <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5 leading-tight">
            1-on-1 with Principal Dojo Architects • Live Calendly Booking
          </div>
        </div>

        {/* Action Button & Dismiss */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://calendly.com/kartikey-tetrahedron/new-meeting"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#ff5722] to-[#ff6f00] hover:from-[#f4511e] hover:to-[#ff5722] text-white text-xs sm:text-sm font-semibold shadow-md shadow-orange-950/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss meeting popup"
            className="w-7 h-7 rounded-full hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
