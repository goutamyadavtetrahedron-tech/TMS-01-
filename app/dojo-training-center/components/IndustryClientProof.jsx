"use client";

import React from "react";
import Image from "next/image";
import { Factory, Award, TrendingUp, Users } from "lucide-react";

export default function IndustryClientProof() {
  const industries = [
    {
      name: "Automotive OEMs & Tier-1",
      description: "Engine assembly, transmission lines, wiring harnesses, EV battery packs & brake systems.",
      metric: "Zero cross-threading & 100% torque audit compliance",
    },
    {
      name: "Heavy Engineering & Machinery",
      description: "Hydraulic valves, gearbox fabrication, CNC turning, robotic welding & casting finishing.",
      metric: "65% drop in machine maintenance micro-stoppages",
    },
    {
      name: "Electrical & White Goods",
      description: "Switchgear assembly, motor winding, domestic appliances, PCB handling & solder QA.",
      metric: "40% reduction in aesthetic cosmetic scratch defects",
    },
    {
      name: "Pharma & FMCG Packaging",
      description: "High-speed blister cartoners, aseptic cleanroom gowning, bottle filling & seal inspection.",
      metric: "100% SOP adherence on line sanitization & changeover",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase text-[#ff5722] tracking-wider">
            Industrial Reach
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002244] tracking-tight mt-2">
            Engineered for Precision Across Diverse Manufacturing Sectors
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            From high-speed sub-second electronic assembly to heavy automotive power-trains, Tetrahedron customizes Dojo fixtures to your exact line constraints.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {industries.map((ind, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#002244]/40 transition-all"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#002244] mb-4">
                  <Factory className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {ind.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {ind.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold text-[#ff5722] uppercase tracking-wide block">
                  Measured Impact:
                </span>
                <span className="text-xs font-semibold text-slate-800 mt-0.5 block">
                  {ind.metric}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Client Logos / Proof Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-bold uppercase text-[#ff5722] tracking-wider">
                Proven Track Record
              </span>
              <h3 className="text-2xl font-extrabold text-[#002244] leading-snug">
                Trusted by India's Top Industrial Leaders & Global Multinationals
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Tetrahedron has successfully engineered, fabricated, and commissioned over 200+ dedicated and mini Dojo Training Centers across India.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>VDA 6.3 Audit Approved</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>50,000+ Workers Certified</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border border-slate-100 shadow-inner bg-slate-50 p-4">
                <div className="relative h-48 sm:h-56 w-full">
                  <Image
                    src="/assets/images/dojo _client.jpeg"
                    alt="Dojo Clients and Industry Partners"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
