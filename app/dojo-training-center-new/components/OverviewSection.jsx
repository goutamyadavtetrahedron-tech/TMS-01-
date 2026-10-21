"use client";

import React from "react";
import Image from "next/image";
import { Brain, Layers, CheckCircle, ArrowRight, UserCheck, ShieldAlert, Award } from "lucide-react";

export default function OverviewSection({ onOpenModal }) {
  const skillLevels = [
    {
      level: "Level 1 (L1)",
      title: "Novice & Theoretical Knowledge",
      tag: "Classroom / Digital Gate",
      description:
        "Trainee masters the standard operating procedures (SOP), PPE protocols, quality defect libraries, and 5S principles via interactive digital kiosks.",
      badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    },
    {
      level: "Level 2 (L2)",
      title: "Dojo Certified / Simulation Mastery",
      tag: "Off-Line Dojo Gate",
      description:
        "Trainee achieves 100% standard cycle speed with zero defects across 20 consecutive cycles on calibrated offline simulation jigs.",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      level: "Level 3 (L3)",
      title: "Supervised Line Qualified",
      tag: "Shopfloor Buddy Gate",
      description:
        "Trainee operates on active commercial production lines under designated supervisor observation, hitting takt time consistently with zero scrap.",
      badgeColor: "bg-orange-50 text-[#ff5722] border-orange-200",
    },
    {
      level: "Level 4 (L4)",
      title: "Autonomous Expert & Dojo Master",
      tag: "Continuous Improvement Gate",
      description:
        "Operator achieves flawless First-Time-Right (FTR), leads shopfloor Kaizen micro-improvements, and is accredited to train and certify junior operators.",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#ff5722] text-xs font-bold uppercase tracking-wider mb-3">
            <Brain className="w-4 h-4" />
            The Experiential Skilling Paradigm
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002244] tracking-tight">
            Why Traditional Training Fails & How Dojo Builds Subconscious Muscle Memory
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Theoretical lectures yield less than 20% retention after 30 days. Putting rookie workers directly onto active production lines results in line micro-stoppages, customer defect escapes, and safety near-misses.
          </p>
        </div>

        {/* Two-Column Deep Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left: The Dojo Philosophy & Muscle Memory */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl sm:text-2xl font-bold text-[#002244] mb-4">
                The Bicycle Equilibrium Principle
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                When learning to ride a bicycle, conscious effort is required just to maintain balance while looking down at the pedals. Once muscle memory develops, the brain offloads motor execution to the cerebellum—steering, pedaling, and braking occur automatically without conscious distraction.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                A <strong className="text-slate-900 font-semibold">Tetrahedron Dojo Training Center</strong> conditions this exact autonomic reflex for shopfloor assembly: screw fastening, harness insertion, blind part discrimination, and hazardous energy lockout.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="p-4 rounded-xl bg-red-50/70 border border-red-100">
                  <div className="flex items-center gap-2 text-red-700 font-bold text-sm mb-1">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    Traditional OJT Line Shadowing
                  </div>
                  <p className="text-xs text-red-900/80 leading-relaxed">
                    Stressful, noisy, generates high customer scrap, and trainees inadvertently inherit senior workers' bad ergonomic shortcuts.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-1">
                    <Award className="w-4 h-4 shrink-0" />
                    Off-Line Dojo Simulation
                  </div>
                  <p className="text-xs text-emerald-900/80 leading-relaxed">
                    Zero-harm safe environment with instant sensory biofeedback timers, buzzers, and reusable test fixtures until 100% mastery.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Real Shopfloor Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
              <div className="relative h-80 sm:h-96 w-full">
                <Image
                  src="/images/blog/dojo-in-manufacturing.png"
                  alt="Dojo in Manufacturing Turnkey Setup"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="inline-block px-2.5 py-1 rounded bg-[#ff5722] text-xs font-bold uppercase mb-2">
                    Sensory Calibration
                  </span>
                  <h4 className="text-lg font-bold leading-snug">
                    Standardized Shopfloor Work Stations & Rapid Problem-Solving Zones
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Engineered to eliminate reach waste (muda) and enforce 100% adherence to standard operating procedures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Level Operator Skill Matrix (L1 to L4) */}
        <div className="mt-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase text-[#ff5722] tracking-wider">
                Competency Progression
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#002244] mt-1">
                The Standardized 4-Level Operator Skill Matrix (L1–L4)
              </h3>
            </div>
            <p className="text-sm text-slate-500 max-w-md mt-2 md:mt-0">
              Alignd with World Class Manufacturing (WCM) and ISO 9001 operator qualification standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillLevels.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-[#ff5722]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-extrabold text-[#002244] tracking-tight">
                      Step {index + 1}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${item.badgeColor}`}>
                      {item.level}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-1 leading-snug">
                    {item.title}
                  </h4>
                  <span className="text-xs font-semibold text-[#ff5722] block mb-3">
                    {item.tag}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-[#002244]">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mr-1.5" />
                  <span>Objective Metric Gate</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick CTA Banner under matrix */}
          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-[#002244] to-[#0a3560] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-bold">Want an L1–L4 Skill Matrix customized to your plant's assembly lines?</h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Our industrial engineers evaluate your cycle times, defect Pareto, and station SOPs.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenModal("Schedule an L1-L4 Matrix Consultation")}
              className="shrink-0 px-6 py-3 rounded-xl bg-[#ff5722] hover:bg-[#f4511e] text-white text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              Get Custom Matrix Blueprint
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
