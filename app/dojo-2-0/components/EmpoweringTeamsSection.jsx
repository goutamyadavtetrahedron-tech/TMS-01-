"use client";

import React from "react";
import Image from "next/image";

export default function EmpoweringTeamsSection() {
  const proofMetrics = [
    {
      value: "80+",
      label: "Enterprise Plants Transformed",
    },
    {
      value: "50,000+",
      label: "Operators Digitally Certified",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Single Line Title */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-[#001730] tracking-tight leading-tight whitespace-nowrap">
            Empowering Teams Across Industries
          </h2>
          <div className="w-16 h-1 bg-[#ff5722] mx-auto mt-2.5 rounded-full" />
        </div>

        {/* 2 Quick Impact Counters Centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-12 max-w-3xl mx-auto w-full">
          {proofMetrics.map((m, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs text-center"
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

        {/* Client Logos: Full-Width Presentation Without Enclosing White Box */}
        <div className="w-full">
          <div className="relative w-full max-w-6xl mx-auto aspect-[16/8]">
            <Image
              src="/assets/images/dojo _client.jpeg"
              alt="Empowering Teams Across Industries - Client Logos including Hero, Royal Enfield, Autoliv, Mahindra CIE, Tata Motors, Blue Star, Minda, ADM, and SKH"
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
