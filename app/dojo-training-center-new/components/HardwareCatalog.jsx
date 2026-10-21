"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ShieldAlert,
  Wrench,
  Gauge,
  ShieldCheck,
  Eye,
  RotateCcw,
  Activity,
  Target,
  CheckCircle2,
  ZoomIn,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import ImageLightboxModal from "./ImageLightboxModal";

export default function HardwareCatalog({ onOpenVideoModal, onOpenImage }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const simulations = [
    {
      id: "01",
      icon: ShieldAlert,
      category: "Safety & Hazard Prevention",
      title: "Hand Safety Simulation",
      tag: "Pinch-Point Recognition & Safe Reflexes",
      image: "/assets/images/dojo-physical-simulation/hand-safety.webp",
      desc: "A practical training activity that helps employees recognize hand hazards, understand pinch points, and develop safe working practices around machinery and moving components.",
      specs: [
        "Pinch-Point Reaction Drill",
        "CE Sensor Safety Interlocks",
        "Emergency Stop Reflex Calibration",
      ],
    },
    {
      id: "02",
      icon: Wrench,
      category: "TPM & Equipment Reliability",
      title: "TPM Pillar Simulation",
      tag: "Autonomous Maintenance & 5S Discipline",
      image: "/assets/images/dojo-physical-simulation/TPM-Pillar.webp",
      desc: "An interactive learning experience that introduces employees to Total Productive Maintenance (TPM), its key pillars, and their role in equipment maintenance, reliability, and workplace productivity.",
      specs: [
        "8 TPM Pillars Interactive Model",
        "Autonomous Cleaning & Inspection (CLITA)",
        "Zero Breakdowns Discipline",
      ],
    },
    {
      id: "03",
      icon: Gauge,
      category: "Process Data & Metrics",
      title: "Process Parameter Awareness",
      tag: "SI Units & Software Display Values",
      image: "/assets/images/dojo-physical-simulation/process-parameter-awareness.jpg",
      desc: "An interactive learning activity designed to help employees understand standard process parameters, measurement units, and reference values used in manufacturing processes and software displays.",
      specs: [
        "SI Pressure, Temp & Flow Units",
        "HMI Software Display Matching",
        "Upper/Lower Tolerance Limits",
      ],
    },
    {
      id: "04",
      icon: ShieldCheck,
      category: "PPE Selection & Compliance",
      title: "PPE Matrix Simulation",
      tag: "Hazard-Specific PPE Selection & Usage",
      image: "/assets/images/dojo-physical-simulation/PPE-Matrix.webp",
      desc: "A practical training module that educates employees on selecting and using the correct Personal Protective Equipment (PPE) based on specific plant activities and workplace hazards.",
      specs: [
        "Activity-to-PPE Matrix Board",
        "Chemical & Thermal Resistance Check",
        "Proper Fitment & Donning Inspection",
      ],
    },
    {
      id: "05",
      icon: Eye,
      category: "Sensory Quality Calibration",
      title: "Five Senses – Metal Aggregation",
      tag: "Tactile, Acoustic & Visual Metal Identification",
      image: "/assets/images/dojo-physical-simulation/5-senses-metal-seggration.webp",
      desc: "An engaging sensory training activity where employees identify and categorize different types of metals using visual inspection, sound, and touch.",
      specs: [
        "Acoustic Pitch Discrimination",
        "Surface Texture & Weight Balance",
        "Blind Material Sorting Drill",
      ],
    },
    {
      id: "06",
      icon: RotateCcw,
      category: "Fastening & Joint Integrity",
      title: "Torquing & Detorquing Simulation",
      tag: "Torque Specs, Fastener Integrity & Tool Handling",
      image: "/assets/images/dojo-physical-simulation/torquing-detorquing.webp",
      desc: "A hands-on training module focused on standard tightening and loosening techniques, proper tool handling, and following specified torque requirements to ensure joint integrity.",
      specs: [
        "Angle & Torque Verification",
        "Cross-Threading Prevention (Poka-Yoke)",
        "Calibrated Click & Digital Nutrunner",
      ],
    },
    {
      id: "07",
      icon: Activity,
      category: "Ergonomics & Fatigue Prevention",
      title: "Standing Posture Simulation",
      tag: "Body Alignment & Fatigue-Reducing Positions",
      image: "/assets/images/dojo-physical-simulation/standing-posture.webp",
      desc: "A posture-awareness training activity that demonstrates correct standing posture, body alignment, and ergonomic working positions to reduce fatigue and prevent physical strain.",
      specs: [
        "Anti-Fatigue Posture Alignment",
        "Spine & Core Strain Biomechanics",
        "Repetitive Reach Zone Ergonomics",
      ],
    },
    {
      id: "08",
      icon: Target,
      category: "Motor Skills & Agility",
      title: "Hand Stability Simulation",
      tag: "Fine Motor Control & Buzzer-Wire Precision",
      image: "/assets/images/dojo-physical-simulation/hand-stabilization-buzz-wire.webp",
      desc: "A buzzer-wire inspired agility exercise designed to test and improve hand stability, fine motor control, and hand-eye coordination for precision assembly tasks.",
      specs: [
        "Auditory Fault Alarm Buzzer",
        "Precision Path Steady-Hand Drill",
        "Takt-Time Synchronization",
      ],
    },
  ];

  const activeSim = simulations[activeIdx];
  const ActiveIcon = activeSim.icon;

  const handlePrevSim = () =>
    setActiveIdx((prev) => (prev - 1 + simulations.length) % simulations.length);

  const handleNextSim = () =>
    setActiveIdx((prev) => (prev + 1) % simulations.length);

  return (
    <section id="simulations-catalog" className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Clean Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase text-[#ff5722] tracking-wider">
            Interactive Industrial Modules
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#001730] mt-1 tracking-tight">
            Industrial Training Simulations{" "}
            <span className="text-[#ff5722]">We Develop</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            Hands-on sensory calibration benches and physical simulation rigs designed to instill zero-defect reflexes, safe muscle memory, and standard operating procedures.
          </p>
        </div>

        {/* Interactive Stage + Selector Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* LEFT: Featured Stage (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-sm flex flex-col justify-between">
            <div>
              {/* Large Featured Photo with Click-To-Open Lightbox */}
              <div
                onClick={() => setLightboxIndex(activeIdx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setLightboxIndex(activeIdx);
                  }
                }}
                title="Click to view full image in lightbox"
                className="relative h-64 sm:h-80 md:h-[340px] w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200/60 shadow-inner cursor-zoom-in group/img"
              >
                <Image
                  src={activeSim.image}
                  alt={activeSim.title}
                  fill
                  className="object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover/img:opacity-60 transition-opacity" />

                {/* Top Overlay: Category Badge & Zoom Hint */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-xs font-semibold shadow-sm">
                    <ActiveIcon className="w-3.5 h-3.5 text-[#ff5722]" />
                    <span>{activeSim.category}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-slate-800 text-[11px] font-bold shadow-sm group-hover/img:bg-[#ff5722] group-hover/img:text-white transition-colors">
                    <ZoomIn className="w-3 h-3 text-[#ff5722] group-hover/img:text-white" />
                    <span>Enlarge</span>
                  </span>
                </div>

                {/* Bottom Overlay: Tag & Counter */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="font-semibold text-white/95 truncate drop-shadow-sm">
                    ✦ {activeSim.tag}
                  </span>
                  <span className="bg-black/50 backdrop-blur-xs px-2.5 py-0.5 rounded text-[11px] font-mono font-medium border border-white/20 shrink-0">
                    Rig {activeIdx + 1} of {simulations.length}
                  </span>
                </div>
              </div>

              {/* Title & Complete Legible Description */}
              <div className="mt-5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#ff5722]">
                    {activeSim.category}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    100% Turnkey Fabricated Rig
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  {activeSim.title}
                </h3>

                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {activeSim.desc}
                </p>
              </div>

              {/* Key Competencies / Specs */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Key Simulation Competencies &amp; Rig Features:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeSim.specs.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ff5722] shrink-0" />
                      <span>{spec}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stage Footer: Consultation CTA & Prev/Next Stepper */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onOpenVideoModal(`Specs Request: ${activeSim.title}`)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-orange-500/20 transition-all cursor-pointer"
              >
                <span>Request Specs &amp; 3D CAD</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevSim}
                  aria-label="Previous Rig"
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono font-bold text-slate-600">
                  {activeIdx + 1} / {simulations.length}
                </span>
                <button
                  type="button"
                  onClick={handleNextSim}
                  aria-label="Next Rig"
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Interactive Rig Selector (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Available Physical Rigs
              </span>
              <span className="text-[11px] font-semibold text-[#ff5722] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                8 Ready Modules
              </span>
            </div>

            {/* List of 8 Rigs with Thumbnails */}
            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {simulations.map((item, idx) => {
                const isActive = idx === activeIdx;
                const ItemIcon = item.icon;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    className={`w-full text-left p-2.5 sm:p-3 rounded-xl transition-all flex items-center gap-3 cursor-pointer border ${
                      isActive
                        ? "bg-orange-50/80 border-[#ff5722] shadow-sm ring-1 ring-[#ff5722]/30"
                        : "bg-white hover:bg-slate-50 border-slate-200/80 hover:border-slate-300"
                    }`}
                  >
                    {/* Miniature Thumbnail */}
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0 border border-slate-200/80 bg-slate-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-[#ff5722]/20 border-2 border-[#ff5722] rounded-lg" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#ff5722]">
                        <ItemIcon className="w-3 h-3 shrink-0" />
                        <span className="truncate">{item.category}</span>
                      </div>

                      <h4
                        className={`text-xs sm:text-[13px] font-bold mt-0.5 truncate ${
                          isActive ? "text-[#001730]" : "text-slate-800"
                        }`}
                      >
                        {item.title}
                      </h4>

                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {item.tag}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <div
                      className={`shrink-0 transition-transform ${
                        isActive
                          ? "text-[#ff5722] translate-x-0.5"
                          : "text-slate-300"
                      }`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Sub-banner */}
        <div className="mt-8 p-5 rounded-2xl bg-orange-50/70 border border-orange-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#ff5722] text-white flex items-center justify-center shrink-0 shadow-sm">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-slate-900 font-bold block sm:inline">
                Need custom physical or sensory simulation activities engineered for your plant?
              </strong>{" "}
              <span>
                We fabricate bespoke benches calibrated to your specific components, safety protocols, and takt times.
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onOpenVideoModal("Custom Simulation Jigs Inquiry")}
            className="whitespace-nowrap px-5 py-2 rounded-full bg-[#001730] hover:bg-slate-900 text-white font-semibold shadow-sm transition-colors cursor-pointer"
          >
            Consult on Custom Jigs
          </button>
        </div>

        {/* Full-View Translucent Lightbox Modal */}
        {lightboxIndex !== null && (
          <ImageLightboxModal
            images={simulations.map((s) => ({
              src: s.image,
              alt: s.title,
              title: s.title,
            }))}
            currentIndex={lightboxIndex}
            onIndexChange={setLightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </div>
    </section>
  );
}
