"use client";

import React from "react";
import Image from "next/image";
import { Award, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function EmpoweringTeamsSection({ onOpenImage }) {
  const proofMetrics = [
    {
      value: "100+",
      label: "Dojos Commissioned",
      sub: "Across India & Global Plants",
    },
    {
      value: "50,000+",
      label: "Workers Certified",
      sub: "L1–L4 Competency Accredited",
    },
    {
      value: "100%",
      label: "Audit Pass Rate",
      sub: "IATF 16949 & VDA 6.3 Ready",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase text-[#ff5722] tracking-wider block mb-2">
            Proven Industrial Track Record
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#001730] tracking-tight leading-tight">
            Empowering Teams Across Industries
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Trusted by India&apos;s leading automotive OEMs, Tier-1 component manufacturers, engineering giants, and global multinationals to engineer their capability academies.
          </p>
        </div>

        {/* 3 Quick Impact Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {proofMetrics.map((m, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs text-center"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-[#001730] leading-tight">
                {m.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                {m.label}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {m.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Client Logos Container Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#ff5722]">
                Client Partnerships
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#001730] mt-0.5">
                30+ Enterprise Manufacturing Leaders Who Rely on Tetrahedron
              </h3>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1 font-semibold">
                <Award className="w-4 h-4 text-amber-500" />
                VDA 6.3 Approved
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                IATF 16949 Aligned
              </span>
            </div>
          </div>

          {/* High-Resolution Client Logo Grid Display */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-slate-50/50 border border-slate-200 p-2 sm:p-4 shadow-xs">
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

          <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#ff5722]" />
              Automotive OEMs &amp; Tier-1 Giants
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#ff5722]" />
              Heavy Engineering &amp; Robotics
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#ff5722]" />
              Electrical, Appliances &amp; White Goods
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#ff5722]" />
              Process &amp; FMCG Packaging
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
