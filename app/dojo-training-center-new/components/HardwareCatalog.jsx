"use client";

import React from "react";
import { ArrowRight, Video, Sparkles, Cog } from "lucide-react";

export default function HardwareCatalog({ onOpenVideoModal }) {
  const simulations = [
    {
      id: "01",
      title: "Hand Safety Simulation",
      tag: "Hand Safety & Hazard Identification",
      desc: "Helps workers recognize pinch points and develop safe hand reflexes around machinery and moving components.",
    },
    {
      id: "02",
      title: "TPM Pillar Simulation",
      tag: "TPM Principles & Equipment Care",
      desc: "Introduces Total Productive Maintenance (TPM) pillars, autonomous maintenance, and equipment reliability.",
    },
    {
      id: "03",
      title: "Process Parameter Awareness",
      tag: "SI Units & Standard Reference Values",
      desc: "Reinforces standard SI units, measurement symbols, and reference values used in software and process data.",
    },
    {
      id: "04",
      title: "PPE Matrix Simulation",
      tag: "PPE Selection & Workplace Safety",
      desc: "Teaches correct selection and usage of Personal Protective Equipment (PPE) for specific plant activities and hazards.",
    },
    {
      id: "05",
      title: "Five Senses – Metal Aggregation",
      tag: "Metal Identification & Sensory Awareness",
      desc: "Interactive sensory activity to distinguish and identify metal types through touch, sound, and visual observation.",
    },
    {
      id: "06",
      title: "Torquing & Detorquing Simulation",
      tag: "Fastening Practices & Torque Awareness",
      desc: "Teaches correct tightening/loosening techniques, proper tool handling, and specified torque compliance.",
    },
    {
      id: "07",
      title: "Standing Posture Simulation",
      tag: "Ergonomics & Posture Awareness",
      desc: "Ergonomic training on correct standing posture, body alignment, and fatigue-reducing workstation positions.",
    },
    {
      id: "08",
      title: "Hand Stability Simulation",
      tag: "Hand-Eye Coordination & Fine Control",
      desc: "Buzz-wire inspired agility exercise developing fine motor control, hand stability, and hand-eye precision.",
    },
  ];

  return (
    <section id="simulations-catalog" className="py-12 sm:py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Header */}
        <div className="text-center max-w-2xl mx-auto mb-7">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100/80 border border-orange-200 text-[11px] font-semibold text-[#ff5722] mb-1.5">
            <Sparkles className="w-3 h-3" />
            <span>Interactive Industrial Modules</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#001730] tracking-tight leading-tight">
            Industrial Training Simulations <span className="text-[#ff5722]">We Develop</span>
          </h2>
          <p className="mt-1.5 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
            Practical, interactive training solutions designed to improve employee safety awareness, technical knowledge, process understanding, and shopfloor skills through engaging learning experiences.
          </p>
        </div>

        {/* Viewport-Fitted 8-Card Grid (4 Columns, 2 Rows) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {simulations.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200 shadow-xs hover:border-[#ff5722] hover:shadow-sm transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-5 h-5 rounded-md bg-slate-100 text-[#001730] text-[10px] font-extrabold flex items-center justify-center group-hover:bg-[#ff5722] group-hover:text-white transition-colors">
                    {item.id}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    <Cog className="w-2.5 h-2.5 text-[#ff5722]" />
                    <span>Rig</span>
                  </span>
                </div>

                <h3 className="text-[13px] sm:text-sm font-bold text-slate-900 leading-snug mb-1.5 group-hover:text-[#ff5722] transition-colors">
                  {item.title}
                </h3>

                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {item.desc}
                </p>
              </div>

              <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[10px] font-medium text-slate-500 truncate" title={item.tag}>
                  ⚙️ {item.tag}
                </span>

                <button
                  type="button"
                  onClick={() => onOpenVideoModal(`Specs Request: ${item.title}`)}
                  className="shrink-0 inline-flex items-center gap-1 text-[11px] font-bold text-[#ff5722] hover:text-[#f4511e] hover:underline cursor-pointer"
                >
                  <span>Request Specs</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Compact Action Strip */}
        <div className="mt-7 p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-xs">
          <div className="text-center sm:text-left">
            <strong className="text-slate-900 font-bold block sm:inline">
              Need custom physical or sensory simulation activities engineered for your plant?
            </strong>{" "}
            <span className="text-slate-500 block sm:inline">
              We fabricate bespoke benches calibrated to your specific components and takt times.
            </span>
          </div>
          <button
            type="button"
            onClick={() => onOpenVideoModal("Custom Simulation Jigs Inquiry")}
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#001730] hover:bg-slate-900 text-white text-xs font-semibold transition-all cursor-pointer shadow-sm hover:-translate-y-0.5"
          >
            <Video className="w-3 h-3 text-orange-400" />
            <span>Consult on Custom Jigs</span>
          </button>
        </div>
      </div>
    </section>
  );
}
