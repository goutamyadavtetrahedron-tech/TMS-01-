"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Video, Sparkles, Building2, ShieldCheck } from "lucide-react";

export default function HeroSection({ onOpenVideoModal }) {
  const scrollToBlueprint = (e) => {
    e.preventDefault();
    const element = document.getElementById("six-zones");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const stats = [
    { value: "80%", label: "Faster Onboarding", sub: "5–7 days to takt speed" },
    { value: "Zero", label: "Training Scrap", sub: "Reusable simulation jigs" },
    { value: "60–80%", label: "Near-Miss Drop", sub: "Controlled hazard awareness" },
    { value: "3–6 Mo.", label: "Capital Payback", sub: "Measured plant ROI" },
  ];

  return (
    <section className="relative bg-[#001730] text-white pt-14 pb-12 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-medium text-orange-300">
              <Sparkles className="w-3.5 h-3.5 text-[#ff5722]" />
              <span>Industrial Capability Academy</span>
              <span className="text-white/30">•</span>
              <span className="text-white/80">WCM & TPS Benchmark</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight leading-tight text-white">
              Complete{" "}
              <span className="text-[#ff5722]">
                Dojo Training Center
              </span>{" "}
              Setup
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Cut blue-collar onboarding by <strong className="text-white font-semibold">80%</strong> and eliminate assembly defects. Tetrahedron engineers, fabricates, and commissions complete 6-zone sensory academies equipped with custom simulation jigs and L1–L4 skill matrices in <strong className="text-white font-semibold">8 weeks</strong>.
            </p>

            {/* High-Craft, Modern Industrial Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                type="button"
                id="hero-book-meeting-btn"
                onClick={() => onOpenVideoModal("Full-Scale Dojo Setup (600–2,000 sq.ft)")}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#ff5722] to-[#ff6f00] hover:from-[#f4511e] hover:to-[#ff5722] text-white font-semibold text-sm shadow-lg shadow-orange-950/40 hover:shadow-orange-900/60 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer border border-orange-400/30"
              >
                <Video className="w-4 h-4 text-white shrink-0 group-hover:scale-110 transition-transform" />
                <span>Book a Virtual Meeting</span>
              </button>

              <button
                type="button"
                onClick={scrollToBlueprint}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white font-medium text-sm border border-white/20 hover:border-white/40 backdrop-blur-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                <span>Explore 6-Zone Blueprint</span>
                <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Proof Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-medium">
                <Building2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                200+ Plants Commissioned
              </span>
              <span className="text-white/20">•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                CE/OSHA Safety Interlocks
              </span>
              <span className="text-white/20">•</span>
              <span className="text-slate-300 font-medium">IATF 16949 & VDA 6.3 Audit Ready</span>
            </div>
          </div>

          {/* Right Column: Expansive Shopfloor Visual */}
          <div className="lg:col-span-5">
            <div className="relative h-80 sm:h-96 lg:h-[400px] xl:h-[420px] w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
              <Image
                src="/images/servicesData/dojoherosection.png"
                alt="Tetrahedron Dojo Training Center Shopfloor"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="inline-block px-3 py-1 rounded-full bg-[#ff5722] text-[10px] font-bold uppercase tracking-wider mb-1.5 shadow-sm">
                  Complete Setup & Handover
                </span>
                <p className="text-xs sm:text-sm font-medium text-slate-100 leading-snug">
                  Custom sensory simulation jigs & standardized shopfloor workstations
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Straight-Line Aligned Stat Ribbon (Clean, borderless, sitting directly on navy background) */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 py-2">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-center px-4 py-1 border-l-2 border-[#ff5722]/70 first:border-l-0 lg:first:border-l-2"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-[#ff7a45] whitespace-nowrap tracking-tight font-mono leading-none">
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white whitespace-nowrap mt-2 leading-tight">
                  {s.label}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-300 whitespace-nowrap mt-1 leading-normal">
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
