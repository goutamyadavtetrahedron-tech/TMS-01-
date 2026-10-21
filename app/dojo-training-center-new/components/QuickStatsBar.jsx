"use client";

import React from "react";
import { Zap, TrendingUp, AlertTriangle, ShieldCheck, DollarSign } from "lucide-react";

export default function QuickStatsBar() {
  const stats = [
    {
      icon: <Zap className="w-5 h-5 text-[#ff5722]" />,
      value: "80%",
      label: "Faster Onboarding",
      subtext: "5–7 days vs. 4–6 weeks traditional OJT",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      value: "Zero",
      label: "Training Scrap",
      subtext: "Reusable off-line simulation test dowels",
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
      value: "60%–80%",
      label: "Drop in Near-Misses",
      subtext: "Controlled experiential danger awareness",
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-cyan-600" />,
      value: "3–6 Mo.",
      label: "Capital Payback (ROI)",
      subtext: "Immediate defect & warranty reduction",
    },
    {
      icon: <DollarSign className="w-5 h-5 text-[#002244]" />,
      value: "₹35,000+",
      label: "Annual Operator Savings",
      subtext: "Lower rework, scrap & attrition cost",
    },
  ];

  return (
    <section className="relative -mt-10 sm:-mt-12 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/80 p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {stats.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col ${index > 0 ? "pt-4 lg:pt-0 lg:pl-6" : ""}`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1.5 rounded-lg bg-slate-50 border border-slate-100">
                  {item.icon}
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#002244] tracking-tight">
                  {item.value}
                </span>
              </div>
              <span className="text-sm font-bold text-slate-800 leading-snug">
                {item.label}
              </span>
              <span className="text-xs text-slate-500 leading-relaxed mt-0.5">
                {item.subtext}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
