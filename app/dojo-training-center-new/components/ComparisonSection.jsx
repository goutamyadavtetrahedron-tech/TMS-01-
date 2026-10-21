"use client";

import React from "react";
import { Check, X, Sparkles } from "lucide-react";

export default function ComparisonSection({ onOpenModal }) {
  const comparisons = [
    {
      dimension: "Learning Environment",
      ojt: "Live production line (loud, stressful, rushed)",
      dojo1: "Dedicated off-line simulated workstation (focused, safe)",
      dojo2: "Immersive physical + AR/VR digital twins with real-time feedback",
    },
    {
      dimension: "Time to Qualification",
      ojt: "4 to 6 weeks of line shadowing",
      dojo1: "5 to 7 days in simulation academy",
      dojo2: "3 to 5 days with AI-adaptive sensory drills",
    },
    {
      dimension: "Training Scrap Cost",
      ojt: "High (defects produced directly on live customer parts)",
      dojo1: "Zero (simulations use reusable test dowels & jigs)",
      dojo2: "Zero (hybrid virtual + reusable physical rigs)",
    },
    {
      dimension: "Active Line Disruption",
      ojt: "Frequent micro-stoppages & pacing drags on line takt",
      dojo1: "Zero impact on shopfloor production speed",
      dojo2: "Zero impact + pre-hire aptitude screening",
    },
    {
      dimension: "Feedback Mechanism",
      ojt: "Subjective senior operator verbal correction",
      dojo1: "Objective digital timers, sensors & buzzer alarms",
      dojo2: "IoT sensor telemetry, AI posture & computer vision",
    },
    {
      dimension: "Defect Escape Rate (90d)",
      ojt: "12% to 18% first-year operator failure",
      dojo1: "Under 1.5% First-Time-Right (FTR) failure",
      dojo2: "Under 0.5% automated gate validation",
    },
    {
      dimension: "Audit & Customer Compliance",
      ojt: "Paper checklists & subjective sign-offs",
      dojo1: "WCM / TPS standard benchmark skilling center",
      dojo2: "Digital biometric competency logs (IATF / VDA 6.3 ready)",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase text-[#ff5722] tracking-wider">
            Operational Comparison
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002244] tracking-tight mt-2">
            Traditional OJT vs. Full-Scale Dojo vs. Dojo 2.0
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            See the quantifiable operational differences between outdated line shadowing and modern off-line sensory academies.
          </p>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs sm:text-sm">
                <th className="p-4 sm:p-5 font-bold text-slate-700 w-1/4">
                  Operational Parameter
                </th>
                <th className="p-4 sm:p-5 font-bold text-red-700 bg-red-50/50 w-1/4">
                  Traditional On-the-Job (OJT)
                </th>
                <th className="p-4 sm:p-5 font-extrabold text-[#002244] bg-blue-50/70 w-1/4 border-x border-blue-200">
                  Experiential Dojo Center
                </th>
                <th className="p-4 sm:p-5 font-bold text-purple-900 bg-purple-50/50 w-1/4">
                  <div className="flex items-center gap-1.5">
                    <span>Dojo 2.0 (AR/VR + IoT)</span>
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {comparisons.map((row, index) => (
                <tr key={index} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-slate-800 bg-slate-50/30">
                    {row.dimension}
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600 bg-red-50/20">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{row.ojt}</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 font-medium text-slate-900 bg-blue-50/30 border-x border-blue-100">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <strong className="font-semibold text-[#002244]">{row.dojo1}</strong>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-700 bg-purple-50/10">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <span>{row.dojo2}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom CTA for Upgrade */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-200 gap-4">
          <p className="text-xs sm:text-sm text-slate-600">
            Have an existing traditional training room? We offer complete retrofitting to transform it into a high-impact Dojo.
          </p>
          <button
            type="button"
            onClick={() => onOpenModal("Schedule a Dojo Retrofit Assessment")}
            className="shrink-0 px-6 py-2.5 rounded-xl bg-[#002244] hover:bg-[#003366] text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
          >
            Request Upgrade Assessment
          </button>
        </div>
      </div>
    </section>
  );
}
