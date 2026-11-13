"use client";

import React, { useState } from "react";
import {
  Users,
  Wrench,
  Glasses,
  BarChart4,
  ArrowRight,
  Layers,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

export default function FourPillarsDojo2({
  onOpenVideoModal,
  activeTab: controlledActiveTab,
  onTabChange,
}) {
  const [internalTab, setInternalTab] = useState(0);
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalTab;
  const setActiveTab = onTabChange || setInternalTab;

  const pillars = [
    {
      id: "01",
      number: "01",
      shortTitle: "Advanced Manpower Planning",
      subLabel: "Workforce intelligence",
      icon: Users,
      title: "Advanced Manpower Planning",
      desc: "Analyze workforce availability, absenteeism, attrition, and skill levels using digital dashboards and skill matrices. Identify competency gaps and plan training for critical stations such as CTQ and PDI.",
      deployment: "Digital manpower dashboards, skill matrices, and skill evaluations.",
      outcome: "Better workforce planning and targeted skill-gap closure.",
      validation: "Competency records and manpower planning reports.",
    },
    {
      id: "02",
      number: "02",
      shortTitle: "Process-Specific DOJO Training",
      subLabel: "Practical shop-floor skills",
      icon: Wrench,
      title: "Process-Specific DOJO Training",
      desc: "Customized, hands-on training programs designed around your manufacturing processes, critical operations, quality checkpoints, and safety requirements. Includes structured refresher modules to reinforce skills, address recurring issues, and train employees on process changes and abnormality handling.",
      deployment: "Process-specific training stations, defect galleries, gauge calibration, troubleshooting, and refresher modules.",
      outcome: "Consistent work practices, improved defect prevention, and sustained employee competency.",
      validation: "Practical assessments, refresher training records, and competency revalidation.",
    },
    {
      id: "03",
      number: "03",
      shortTitle: "Digital Tools & AR/VR Applications",
      subLabel: "Immersive digital learning",
      icon: Glasses,
      title: "Digital Tools & AR/VR Applications",
      desc: "Use AR/VR simulations and interactive digital learning for welding, painting, leak testing, inspection, material handling, and fire safety.",
      deployment: "AR/VR modules and interactive learning tools.",
      outcome: "Safer practice and improved skill retention.",
      validation: "Digital assessments and completion records.",
    },
    {
      id: "04",
      number: "04",
      shortTitle: "Management Review Dashboards",
      subLabel: "Performance & compliance readiness",
      icon: BarChart4,
      title: "Management Review Dashboards",
      desc: "Monitor customer defects, internal rejection trends, training-plan adherence, competency gaps, and improvement actions through structured dashboards.",
      deployment: "Live quality, training, and operational performance dashboards on central displays and tablet HMIs.",
      outcome: "Data-driven leadership decisions, rapid scrap-root-cause resolution, and continuous improvement across shifts.",
      validation: "Executive management review records, action-tracking reports, and audit-ready digital logs.",
    },
  ];

  const current = pillars[activeTab];

  return (
    <section
      id="dojo-pillars"
      className="py-12 sm:py-16 bg-slate-50/60 border-b border-slate-200 flex flex-col justify-center min-h-[580px] lg:min-h-[calc(100vh-80px)] lg:max-h-[840px]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center h-full">
        {/* Section Header: Crisp, Bold, Clean Title */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 shrink-0">
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#001730] tracking-tight leading-tight">
            The 4 Core Pillars of <span className="text-[#ff5722]">DOJO 2.0</span>
          </h2>
          <div className="w-14 h-1 bg-[#ff5722] rounded-full mx-auto mt-2" />
        </div>

        {/* Tabbed Interactive Grid with Fixed Height on Desktop to Eliminate Layout Shift */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-stretch lg:h-[490px]">
          {/* Left Column: 4 Tab Selectors with Locked Equal Heights */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-3 h-full">
            {pillars.map((pillar, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3.5 flex-1 relative overflow-hidden ${
                    isActive
                      ? "bg-[#001730] text-white border-[#001730] shadow-md shadow-navy-950/20 translate-x-1"
                      : "bg-white text-slate-800 border-slate-200/90 hover:bg-slate-50/80 hover:border-slate-300 shadow-2xs"
                  }`}
                >
                  {/* Active Indicator Bar on Left */}
                  {isActive && (
                    <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#ff5722]" />
                  )}

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-sm sm:text-base font-black shrink-0 ${
                        isActive ? "text-[#ff5722]" : "text-slate-400"
                      }`}
                    >
                      {pillar.number} ·
                    </span>
                    <div>
                      <h3
                        className={`text-sm sm:text-base font-bold tracking-tight leading-snug ${
                          isActive ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {pillar.shortTitle}
                      </h3>
                      <p
                        className={`text-xs mt-0.5 font-normal ${
                          isActive ? "text-slate-300" : "text-slate-500"
                        }`}
                      >
                        {pillar.subLabel}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive ? "text-[#ff5722] translate-x-1" : "text-slate-400 opacity-40"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Locked Height Detail Card (Zero Layout Shift) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 lg:p-8 shadow-sm flex flex-col justify-between h-full relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0052cc] via-[#ff5722] to-[#0052cc]" />

            {/* Dynamic Content Container */}
            <div key={activeTab} className="flex flex-col justify-between h-full">
              
              {/* Header + Narrative Description with Locked Space */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[#0052cc] text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Pillar {current.number} of 04</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-600">{current.subLabel}</span>
                </div>

                <h3 className="text-2xl sm:text-[28px] font-extrabold text-[#001730] tracking-tight mb-2 leading-tight">
                  {current.title}
                </h3>

                {/* Fixed/Stable Height Container for Description */}
                <div className="min-h-[72px] sm:min-h-[78px] flex items-start">
                  <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-normal">
                    {current.desc}
                  </p>
                </div>
              </div>

              {/* 3 Core Dimensions: Deployment, Outcome, Validation with Consistent Uniform Heights */}
              <div className="space-y-2.5 sm:space-y-3 pt-3.5 border-t border-slate-100">
                {/* Deployment */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-orange-50/60 border border-orange-200/70 min-h-[64px] sm:min-h-[68px]">
                  <div className="flex items-center gap-2 sm:w-36 shrink-0">
                    <div className="w-7 h-7 rounded-lg bg-[#ff5722]/10 flex items-center justify-center text-[#ff5722] shrink-0">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-black text-[#ff5722] tracking-wider uppercase">
                      Deployment
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13.5px] text-slate-800 font-medium leading-relaxed flex-1">
                    {current.deployment}
                  </p>
                </div>

                {/* Outcome */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-blue-50/60 border border-blue-200/70 min-h-[64px] sm:min-h-[68px]">
                  <div className="flex items-center gap-2 sm:w-36 shrink-0">
                    <div className="w-7 h-7 rounded-lg bg-[#0052cc]/10 flex items-center justify-center text-[#0052cc] shrink-0">
                      <TrendingUp className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-black text-[#0052cc] tracking-wider uppercase">
                      Outcome
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13.5px] text-slate-800 font-medium leading-relaxed flex-1">
                    {current.outcome}
                  </p>
                </div>

                {/* Validation */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-emerald-50/60 border border-emerald-200/70 min-h-[64px] sm:min-h-[68px]">
                  <div className="flex items-center gap-2 sm:w-36 shrink-0">
                    <div className="w-7 h-7 rounded-lg bg-emerald-600/10 flex items-center justify-center text-emerald-700 shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-black text-emerald-700 tracking-wider uppercase">
                      Validation
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13.5px] text-slate-800 font-medium leading-relaxed flex-1">
                    {current.validation}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
