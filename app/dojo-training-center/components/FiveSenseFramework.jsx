"use client";

import React from "react";
import { Eye, Ear, Hand, Activity, Wind, CheckCircle } from "lucide-react";

export default function FiveSenseFramework() {
  const senses = [
    {
      sense: "Tactile (Touch / Feeling)",
      icon: <Hand className="w-6 h-6 text-[#ff5722]" />,
      workElement: "Thread engagement, surface roughness, terminal pin latching",
      failureRisk: "Cross-threading, incomplete terminal seating, loose crimps",
      calibrationRig: "Blind Pin & Thread Rig",
      rigDetails:
        "Trainees engage fasteners and seat pins solely through fingertip tactile feedback without looking, eliminating visual dependency.",
    },
    {
      sense: "Auditory (Hearing / Sound)",
      icon: <Ear className="w-6 h-6 text-blue-600" />,
      workElement: "Pneumatic exhaust, relay click, bearing hum, torque wrench click",
      failureRisk: "Ignoring micro air leaks, improper torque wrench snap, dry bearing friction",
      calibrationRig: "Audio Discrimination Board",
      rigDetails:
        "Calibrates hearing to distinguish subtle sound frequencies between healthy and defective mechanical components.",
    },
    {
      sense: "Kinesthetic (Muscle Memory)",
      icon: <Activity className="w-6 h-6 text-purple-600" />,
      workElement: "Two-handed simultaneous reach, balanced push, standard walking rhythm",
      failureRisk: "One-handed slow assembly, conveyor jams, excessive torso rotation",
      calibrationRig: "Symmetrical POU Reach & Conveyor Rig",
      rigDetails:
        "Conditions simultaneous left-right hand motor coordination, cutting cycle takt times by up to 35%.",
    },
    {
      sense: "Visual (Sight / Perception)",
      icon: <Eye className="w-6 h-6 text-emerald-600" />,
      workElement: "Component sorting, color codes, hairline scratches, seal polarity",
      failureRisk: "Mixing M6 with M8 bolts, missing O-rings, mounting reversed brackets",
      calibrationRig: "Lux-Calibrated Defect Inspection Booth",
      rigDetails:
        "Rapid part discrimination training under strobe, glare, and calibrated Lux lighting to train sub-second defect spotting.",
    },
    {
      sense: "Olfactory (Smell / Hazard)",
      icon: <Wind className="w-6 h-6 text-amber-600" />,
      workElement: "Overheated wire insulation, burning hydraulic oil, chemical solvent vapor",
      failureRisk: "Delayed evacuation during electrical hot spots or VOC tank leaks",
      calibrationRig: "Scent Discrimination & Safe VOC Rig",
      rigDetails:
        "Safely exposes trainees to distinct solvent, chemical, and scorch odors to trigger instant emergency reaction instincts.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase text-[#ff5722] tracking-wider">
            Frontline Sensory Calibration
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002244] tracking-tight mt-2">
            The 5-Sense Industrial Mapping Framework
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            During standard assembly, an operator's nervous system processes thousands of sensory signals per minute. Here is how our custom simulation rigs calibrate human senses into autonomic reflexes:
          </p>
        </div>

        {/* 5-Sense Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {senses.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 block">Sense #{idx + 1}</span>
                    <h3 className="text-base sm:text-lg font-bold text-[#002244]">
                      {item.sense}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-slate-800 block text-xs uppercase tracking-wide">
                      Target Shopfloor Element:
                    </span>
                    <p className="text-slate-600 mt-0.5">{item.workElement}</p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-red-50/70 border border-red-100">
                    <span className="font-bold text-red-700 block text-[11px] uppercase tracking-wide">
                      Defect / Risk Prevented:
                    </span>
                    <p className="text-red-900/80 text-xs mt-0.5">{item.failureRisk}</p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-100">
                    <span className="font-bold text-[#002244] block text-[11px] uppercase tracking-wide">
                      Simulation Rig Solution:
                    </span>
                    <p className="text-blue-900 font-semibold text-xs mt-0.5">{item.calibrationRig}</p>
                    <p className="text-slate-600 text-xs mt-1">{item.rigDetails}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-emerald-700">
                <CheckCircle className="w-3.5 h-3.5 mr-1" />
                <span>Sensory Feedback Gate</span>
              </div>
            </div>
          ))}

          {/* Bonus 6th Card: Turnkey Rig Engineering */}
          <div className="bg-gradient-to-br from-[#002244] to-[#043468] text-white rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <span className="inline-block px-2.5 py-1 rounded bg-[#ff5722] text-xs font-bold uppercase mb-3">
                Proprietary Jigs
              </span>
              <h3 className="text-xl font-bold text-white mb-2">
                Custom Calibrated to Your Exact Products
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
                We don't sell off-the-shelf generic toys. Every tactile, auditory, and visual rig is reverse-engineered from your specific assembly components, fasteners, voltages, and customer defect logs.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 text-xs text-orange-300 font-semibold">
              ✦ Modular tooling plates for fast changeover
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
