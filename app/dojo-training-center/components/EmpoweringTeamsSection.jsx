"use client";

import React from "react";
import Image from "next/image";

export default function EmpoweringTeamsSection() {
  const proofMetrics = [
    {
      value: "30+",
      label: "Enterprise Plants",
    },
    {
      value: "50,000+",
      label: "Operators Certified",
    },
    {
      value: "100%",
      label: "Audit Pass Rate",
    },
  ];

  return (
    <section className="pt-8 sm:pt-10 pb-8 sm:pb-10 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#001730] tracking-tight leading-tight">
            Empowering Teams Across Industries
          </h2>
        </div>

        {/* 3 Quick Impact Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {proofMetrics.map((m, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/90 shadow-2xs text-center"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-[#001730] leading-tight">
                {m.value}
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-700 mt-1.5">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Client Logos Container Card */}
        <div className="bg-slate-50/70 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs">
          <div className="pb-5 border-b border-slate-200/80 mb-6 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-[#001730]">
              30+ Enterprise Manufacturing Leaders Who Rely on Tetrahedron
            </h3>
          </div>

          {/* High-Resolution Client Logo Grid Display */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-white border border-slate-200 p-2 sm:p-4 shadow-xs">
            <div className="relative w-full h-[260px] sm:h-[380px] lg:h-[480px]">
              <Image
                src="/assets/images/dojo _client.jpeg"
                alt="Empowering Teams Across Industries - Client Logos including Hero, Royal Enfield, Autoliv, Mahindra CIE, Tata Motors, Blue Star, Minda, ADM, and SKH"
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
