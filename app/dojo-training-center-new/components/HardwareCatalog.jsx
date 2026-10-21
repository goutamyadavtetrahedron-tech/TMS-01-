"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
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
  ArrowRight,
} from "lucide-react";
import ImageLightboxModal from "./ImageLightboxModal";

export default function HardwareCatalog({ onOpenVideoModal, onOpenImage }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const simulations = [
    {
      id: "01",
      shortName: "Hand Safety",
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
      shortName: "TPM Pillar",
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
      shortName: "Process Data",
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
      shortName: "PPE Matrix",
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
      shortName: "Sensory Quality",
      icon: Eye,
      category: "Sensory Quality Calibration",
      title: "Five Senses – Metal Aggregation",
      tag: "Tactile, Acoustic & Visual Metal Identification",
      image: "/assets/images/dojo-physical-simulation/5-senses-metal-aggregation.webp",
      desc: "An engaging sensory training activity where employees identify and categorize different types of metals using visual inspection, sound, and touch.",
      specs: [
        "Acoustic Pitch Discrimination",
        "Surface Texture & Weight Balance",
        "Blind Material Sorting Drill",
      ],
    },
    {
      id: "06",
      shortName: "Torquing",
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
      shortName: "Ergonomics",
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
      shortName: "Hand Stability",
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

  return (
    <section id="simulations-catalog" className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <span className="text-xs font-bold uppercase text-[#ff5722] tracking-wider">
            Interactive Industrial Modules
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#001730] mt-1 tracking-tight">
            Industrial Training Simulations{" "}
            <span className="text-[#ff5722]">We Develop</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            Hands-on sensory calibration benches and physical simulation rigs designed to eliminate shopfloor defects, practice standard work, and build safe operator muscle memory.
          </p>
        </div>

        {/* 2-Column Continuous Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {simulations.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-[#ff5722] transition-all duration-300 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-5 group"
              >
                {/* Left Column in Card: Photo (Clickable Lightbox) */}
                <div
                  onClick={() => setLightboxIndex(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setLightboxIndex(idx);
                    }
                  }}
                  title="Click to view full image in lightbox"
                  className="relative w-full sm:w-[44%] h-52 sm:h-auto min-h-[220px] rounded-xl overflow-hidden bg-slate-100 border border-slate-200/60 shadow-inner cursor-zoom-in group/img shrink-0"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 400px"
                    className="object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-75 group-hover/img:opacity-50 transition-opacity" />

                  {/* Enlarge Pill on Top Right */}
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold flex items-center gap-1 group-hover/img:bg-[#ff5722] transition-colors shadow-sm">
                    <ZoomIn className="w-3 h-3 text-[#ff5722] group-hover/img:text-white" />
                    <span>Enlarge</span>
                  </span>

                  {/* Tag at bottom of photo */}
                  <span className="absolute bottom-2.5 left-2.5 right-2.5 text-[11px] font-semibold text-white/95 truncate drop-shadow-sm">
                    ✦ {item.tag}
                  </span>
                </div>

                {/* Right Column in Card: Content & Details */}
                <div className="flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Category */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#ff5722]">
                        <Icon className="w-3.5 h-3.5" />
                        <span>{item.category}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#ff5722] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    {/* Full Description */}
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>

                    {/* Key Competencies / Specs */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                        Key Competencies:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.specs.map((spec, sIdx) => (
                          <span
                            key={sIdx}
                            className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-700 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200"
                          >
                            <CheckCircle2 className="w-3 h-3 text-[#ff5722] shrink-0" />
                            <span>{spec}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom: Consultation Link */}
                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-semibold text-slate-500">
                      Physical Simulation Module
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        onOpenVideoModal &&
                        onOpenVideoModal(`Specs Request: ${item.title}`)
                      }
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#ff5722] hover:text-[#f4511e] hover:underline cursor-pointer"
                    >
                      <span>Request Specs</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Custom Inquiry Strip */}
        <div className="mt-12 p-5 rounded-2xl bg-orange-50/70 border border-orange-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-700">
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
          <a
            href="https://calendly.com/kartikey-tetrahedron/new-meeting"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap px-5 py-2 rounded-full bg-[#001730] hover:bg-slate-900 text-white font-semibold shadow-sm transition-colors cursor-pointer"
          >
            Consult on Custom Jigs
          </a>
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
