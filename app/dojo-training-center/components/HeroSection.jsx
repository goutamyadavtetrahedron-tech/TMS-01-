"use client";

import React from "react";
import Image from "next/image";
import { Video, Download } from "lucide-react";

export default function HeroSection({ onOpenVideoModal, onOpenBrochureModal }) {
  const stats = [
    { value: "80%", label: "Faster Onboarding" },
    { value: "Zero", label: "Training Scrap" },
    { value: "60–80%", label: "Near-Miss Drop" },
    { value: "3–6 Mo.", label: "Capital Payback" },
  ];

  return (
    <section className="relative bg-[#001730] text-white pt-14 pb-12 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Heading & Value Proposition (5 Cols) */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-5">
            <h1 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[46px] font-bold tracking-tight leading-[1.18] text-white">
              DOJO Training <br className="hidden sm:inline" />
              <span className="text-[#ff5722]">Center Setup</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg">
              Hands-on simulation training to eliminate assembly defects and build zero-error manufacturing quality from Day 1.
            </p>

            {/* Focused Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://cal.com/tetrahedron/dojo"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onOpenVideoModal?.();
                }}
                id="hero-book-meeting-btn"
                className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-gradient-to-r from-[#ff5722] to-[#ff6f00] hover:from-[#f4511e] hover:to-[#ff5722] text-white font-semibold text-sm shadow-lg shadow-orange-950/40 hover:shadow-orange-900/60 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer border border-orange-400/30"
              >
                <Video className="w-4 h-4 text-white shrink-0 group-hover:scale-110 transition-transform" />
                <span>Book a Virtual Meeting</span>
              </a>

              <button
                type="button"
                id="hero-download-brochure-btn"
                onClick={onOpenBrochureModal}
                className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-white text-[#001730] hover:bg-orange-50 active:scale-[0.98] font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border border-white/90"
              >
                <Download className="w-4 h-4 text-[#ff5722] shrink-0 group-hover:scale-110 transition-transform" />
                <span>Download Brochure</span>
              </button>
            </div>
          </div>

          {/* Right Column: Wide Cinematic Shopfloor Visual (7 Cols) */}
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900/40">
              <Image
                src="/images/dojo/hero-gurukul-dojo.jpeg"
                alt="Tetrahedron Gurukul Dojo Training Center Shopfloor Facility"
                fill
                sizes="(max-width: 1024px) 100vw, 750px"
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
        </div>

        {/* Clean, 2-line Stat Bar with subtle dividers */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-white/10">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-center px-0 lg:px-6 first:lg:pl-0"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-[#ff7a45] tracking-tight font-mono leading-none">
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-300 mt-2 leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
