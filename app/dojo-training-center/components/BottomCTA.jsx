"use client";

import React from "react";
import { Video, Download } from "lucide-react";

export default function BottomCTA({ onOpenVideoModal, onOpenBrochureModal }) {
  return (
    <section className="relative overflow-hidden pt-8 sm:pt-10 pb-8 sm:pb-10 bg-[#001730] text-white border-t border-white/10 border-b border-slate-800/80">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[160px] bg-[#ff5722]/10 blur-[90px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 sm:space-y-5">
        {/* Balanced Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-tight">
          Ready to Build a High-Impact <br className="hidden sm:inline" />
          <span className="text-[#ff5722]">DOJO Training Center?</span>
        </h2>

        {/* Action Buttons: Unified Primary & Secondary Hierarchy */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Primary CTA */}
          <a
            href="https://cal.com/tetrahedron/dojo"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpenVideoModal?.();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ff5722] to-[#ff6f00] hover:from-[#f4511e] hover:to-[#ff5722] active:scale-[0.98] text-white font-semibold text-sm shadow-lg shadow-orange-950/40 hover:shadow-orange-900/60 hover:-translate-y-0.5 transition-all cursor-pointer border border-orange-400/30"
          >
            <Video className="w-4 h-4 text-white shrink-0" />
            <span>Book a Virtual Meeting</span>
          </a>

          {/* Secondary CTA - Matching Hero White Solid Button */}
          <button
            type="button"
            onClick={onOpenBrochureModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#001730] hover:bg-orange-50 active:scale-[0.98] font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border border-white/90"
          >
            <Download className="w-4 h-4 text-[#ff5722] shrink-0" />
            <span>Download Brochure</span>
          </button>
        </div>
      </div>
    </section>
  );
}
