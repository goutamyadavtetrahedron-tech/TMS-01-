"use client";

import React from "react";
import Image from "next/image";
import { Video, Download } from "lucide-react";

export default function HeroSection({
  onOpenVideoModal,
  onOpenBrochureModal,
  onSelectPillar,
}) {
  const pillars = [
    {
      id: "manpower-planning",
      line1: "Advanced",
      line2: "Manpower Planning",
      circleBg: "bg-[#0b4d9c]",
      barColor: "bg-[#0b4d9c]",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 sm:w-6.5 sm:h-6.5 text-white"
        >
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 3s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      ),
    },
    {
      id: "process-dojo",
      line1: "Process-Specific",
      line2: "DOJO Training",
      circleBg: "bg-[#0a8754]",
      barColor: "bg-[#0a8754]",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 sm:w-6.5 sm:h-6.5 text-white"
        >
          <rect x="3" y="19" width="18" height="3" rx="1" fill="currentColor" />
          <circle cx="8" cy="15" r="2.5" fill="currentColor" />
          <path d="M8 15l4-7" />
          <circle cx="12" cy="8" r="2.5" fill="currentColor" />
          <path d="M12 8l4-3" />
          <path d="M16 5l2-1" />
          <path d="M17 7l2 1" />
        </svg>
      ),
    },
    {
      id: "ar-vr-tools",
      line1: "Digital Tools &",
      line2: "AR/VR Applications",
      circleBg: "bg-[#642bb5]",
      barColor: "bg-[#642bb5]",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 sm:w-6.5 sm:h-6.5 text-white"
        >
          <path d="M3 10a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-3l-2-2h-4l-2 2H5a2 2 0 0 1-2-2v-4Z" />
          <circle cx="8.5" cy="12" r="1.5" fill="currentColor" />
          <circle cx="15.5" cy="12" r="1.5" fill="currentColor" />
          <path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
        </svg>
      ),
    },
    {
      id: "review-dashboards",
      line1: "Management",
      line2: "Review Dashboards",
      circleBg: "bg-[#f37021]",
      barColor: "bg-[#f37021]",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 sm:w-6.5 sm:h-6.5 text-white"
        >
          <path d="M4 19h16v2H4v-2zm2-4h3v3H6v-3zm5-5h3v8h-3v-8zm5-4h3v12h-3V6z" />
        </svg>
      ),
    },
  ];

  const handlePillarClick = (idx) => {
    if (onSelectPillar) {
      onSelectPillar(idx);
    } else {
      const el = document.getElementById("dojo-pillars");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative w-full bg-[#f0f7fd] text-[#001730] overflow-hidden border-b border-slate-200/80">
      {/* Maximum Proportional Wrapper Matching 1600x639 Banner Aspect Ratio */}
      <div className="relative w-full max-w-[1600px] mx-auto min-h-[580px] lg:h-[clamp(580px,46vw,700px)] flex items-center">
        {/* Background Graphic: The High-Resolution DOJO 2.0 Workshop Scene (True 1:1 Scale, Zero Ghosting) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/dojo/dojo-2-hero-banner-clean.png"
            alt="DOJO 2.0 Transforming Workforce Skills into Manufacturing Excellence"
            fill
            priority
            sizes="(max-width: 1600px) 100vw, 1600px"
            className="object-cover object-right opacity-100"
          />

          {/* Soft Mobile Top-to-Bottom Readability Fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0f7fd]/95 via-[#f0f7fd]/80 to-transparent lg:hidden z-[1]" />
        </div>

        {/* Main Content Area: Proper Whitespace Distribution & Impressive Typography */}
        <div className="relative z-10 w-full pl-6 sm:pl-10 md:pl-12 lg:pl-14 xl:pl-18 pr-4 sm:pr-6 py-6 sm:py-8 lg:py-8 flex flex-col justify-center h-full">
          <div className="w-full lg:max-w-[48%] xl:max-w-[45%] flex flex-col justify-center space-y-4 sm:space-y-5">
            
            {/* Main Title & Subheading with Clean Breathing Room */}
            <div>
              {/* Impressive, bold DOJO 2.0 */}
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] xl:text-[64px] font-black text-[#0b4d9c] tracking-tight font-outfit uppercase leading-none mb-3.5 sm:mb-4 lg:mb-5">
                DOJO 2.0
              </h1>

              {/* 3-Line Subheading: Authoritative, Clear, Well-Spaced */}
              <h2 className="text-lg sm:text-xl lg:text-[23px] xl:text-[26px] font-extrabold text-[#001730] tracking-tight leading-[1.22] uppercase font-poppins max-w-md lg:max-w-lg">
                Transforming <br />
                Workforce Skills into <br />
                <span className="text-[#0066cc]">Manufacturing Excellence</span>
              </h2>

              {/* Tagline */}
              <p className="mt-3 sm:mt-3.5 lg:mt-4 text-xs sm:text-[13.5px] lg:text-[14px] font-medium text-slate-600 leading-relaxed max-w-md">
                A digital, data-driven training ecosystem for a skilled, compliant and future-ready workforce.
              </p>
            </div>

            {/* Dual Action CTAs: Sleek, Compact, High-Craft Buttons with Proper Breathing Room */}
            <div className="flex flex-wrap items-center gap-3 pt-2.5 sm:pt-3">
              <a
                href="https://cal.com/tetrahedron/dojo"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onOpenVideoModal?.();
                }}
                id="hero-book-meeting-btn"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ff5722] to-[#ff6f00] hover:from-[#f4511e] hover:to-[#ff5722] text-white font-semibold text-xs sm:text-[13px] shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer border border-orange-400/30"
              >
                <Video className="w-4 h-4 text-white shrink-0 group-hover:scale-110 transition-transform" />
                <span>Book a Virtual Meeting</span>
              </a>

              <button
                type="button"
                id="hero-download-brochure-btn"
                onClick={onOpenBrochureModal}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/95 hover:bg-white text-[#001730] font-semibold text-xs sm:text-[13px] shadow-xs hover:shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer border border-slate-300 hover:border-slate-400"
              >
                <Download className="w-4 h-4 text-[#ff5722] shrink-0 group-hover:scale-110 transition-transform" />
                <span>Download Technical Brochure</span>
              </button>
            </div>

            {/* 4 Pillars Badge Row: Moved Downward with Generous Spacing */}
            <div className="mt-2.5 sm:mt-3.5 lg:mt-5 pt-3 sm:pt-4 lg:pt-5 w-full max-w-lg xl:max-w-xl">
              <div className="grid grid-cols-4 gap-2 sm:gap-3 lg:gap-4 text-center">
                {pillars.map((p, idx) => (
                  <div
                    key={idx}
                    onClick={() => handlePillarClick(idx)}
                    className="flex flex-col items-center group cursor-pointer transition-transform duration-200 hover:-translate-y-1"
                  >
                    {/* Generous Circle Icon */}
                    <div
                      className={`w-12 h-12 sm:w-13 sm:h-13 lg:w-[54px] lg:h-[54px] rounded-full ${p.circleBg} flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-105`}
                    >
                      {p.icon}
                    </div>

                    {/* Clean 2-Line Label */}
                    <span className="text-[10px] sm:text-[11px] lg:text-[11.5px] font-bold text-[#001730] mt-2 leading-tight tracking-tight text-center min-h-[30px] flex flex-col justify-center">
                      <span>{p.line1}</span>
                      <span>{p.line2}</span>
                    </span>

                    {/* Underline Bar */}
                    <div
                      className={`w-7 sm:w-8 h-1 rounded-full ${p.barColor} mt-1.5 transition-all duration-300 group-hover:w-11`}
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
