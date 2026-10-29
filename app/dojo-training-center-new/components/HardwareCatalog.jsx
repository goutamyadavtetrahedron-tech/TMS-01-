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
  ZoomIn,
} from "lucide-react";
import ImageLightboxModal from "./ImageLightboxModal";

export default function HardwareCatalog({ onOpenVideoModal, onOpenImage }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const simulations = [
    {
      id: "01",
      shortName: "Hand Safety",
      icon: ShieldAlert,
      category: "Safety & Hazard",
      title: "Hand Safety Simulation",
      image: "/assets/images/dojo-physical-simulation/hand-safety.webp",
      desc: "Identifies machinery pinch-points and builds instant emergency-stop reflexes.",
      specs: [
        "Pinch-point reaction drill",
        "CE sensor safety interlocks",
        "Emergency stop reflex calibration",
      ],
    },
    {
      id: "02",
      shortName: "TPM Pillar",
      icon: Wrench,
      category: "TPM & Reliability",
      title: "TPM Pillar Simulation",
      image: "/assets/images/dojo-physical-simulation/TPM-Pillar.webp",
      desc: "Instills autonomous cleaning (CLITA) and daily machine inspection routines.",
      specs: [
        "8 TPM pillars interactive model",
        "Autonomous cleaning & inspection",
        "Zero-breakdown discipline",
      ],
    },
    {
      id: "03",
      shortName: "Process Data",
      icon: Gauge,
      category: "Process & Metrics",
      title: "Process Parameter Awareness",
      image: "/assets/images/dojo-physical-simulation/process-parameter-awareness.jpg",
      desc: "Teaches precise pressure, temperature, and software tolerance matching.",
      specs: [
        "SI pressure, temp & flow units",
        "HMI software display matching",
        "Upper & lower tolerance limits",
      ],
    },
    {
      id: "04",
      shortName: "PPE Matrix",
      icon: ShieldCheck,
      category: "PPE Compliance",
      title: "PPE Matrix Simulation",
      image: "/assets/images/dojo-physical-simulation/PPE-Matrix.webp",
      desc: "Simulates hazard-specific PPE selection and proper donning protocols.",
      specs: [
        "Activity-to-PPE matrix board",
        "Chemical & thermal resistance",
        "Proper fitment & donning drill",
      ],
    },
    {
      id: "05",
      shortName: "Sensory Quality",
      icon: Eye,
      category: "Sensory Quality",
      title: "Five Senses – Metal Aggregation",
      image: "/assets/images/dojo-physical-simulation/5-senses-metal-aggregation.webp",
      desc: "Calibrates sensory reflexes to detect alloy variations by pitch, finish & weight.",
      specs: [
        "Acoustic pitch discrimination",
        "Surface texture & weight balance",
        "Blind material sorting drill",
      ],
    },
    {
      id: "06",
      shortName: "Torquing",
      icon: RotateCcw,
      category: "Fastening Integrity",
      title: "Torquing & Detorquing Simulation",
      image: "/assets/images/dojo-physical-simulation/torquing-detorquing.webp",
      desc: "Builds muscle memory for torque angles and cross-threading prevention.",
      specs: [
        "Angle & torque verification",
        "Cross-threading poka-yoke",
        "Digital nutrunner calibration",
      ],
    },
    {
      id: "07",
      shortName: "Ergonomics",
      icon: Activity,
      category: "Ergonomics & Posture",
      title: "Standing Posture Simulation",
      image: "/assets/images/dojo-physical-simulation/standing-posture.webp",
      desc: "Demonstrates anti-fatigue posture to prevent strain across long shifts.",
      specs: [
        "Anti-fatigue posture alignment",
        "Spine & core strain biomechanics",
        "Repetitive reach ergonomics",
      ],
    },
    {
      id: "08",
      shortName: "Hand Stability",
      icon: Target,
      category: "Motor Skills & Agility",
      title: "Hand Stability Simulation",
      image: "/assets/images/dojo-physical-simulation/hand-stabilization-buzz-wire.webp",
      desc: "Hones fine-motor dexterity and steadiness using a takt-calibrated wire drill.",
      specs: [
        "Auditory fault alarm buzzer",
        "Precision path steady-hand drill",
        "Takt-time synchronization",
      ],
    },
  ];

  return (
    <section id="simulations-catalog" className="pt-8 sm:pt-10 pb-8 sm:pb-10 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#001730] tracking-tight whitespace-normal md:whitespace-nowrap">
            Industrial Training{" "}
            <span className="text-[#ff5722]">Simulations</span>
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Hands-on physical rigs and sensory benches engineered to build muscle memory and eliminate shopfloor defects.
          </p>
        </div>

        {/* 4-Column Balanced Grid (2 Rows of 4 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {simulations.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-[#ff5722]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Full-Width Top Photo - 16:10 Ratio for better wide-angle framing */}
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
                  className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden cursor-zoom-in group/img shrink-0"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                    className="object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
                  />

                  {/* Clean Magnifying Glass Icon (Shown Only on Hover) */}
                  <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover/img:opacity-100 group-hover/img:bg-[#ff5722] transition-all duration-200 shadow-md">
                    <ZoomIn className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-4 flex-1 flex flex-col justify-start">
                  {/* Category */}
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Icon className="w-3.5 h-3.5 text-[#ff5722] shrink-0" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff5722]">
                      {item.category}
                    </span>
                  </div>

                  {/* Title - Full, unclipped */}
                  <h3
                    className="text-sm font-bold text-slate-900 group-hover:text-[#ff5722] transition-colors leading-snug"
                    title={item.title}
                  >
                    {item.title}
                  </h3>

                  {/* Full Description - Complete, no cut-off ellipsis */}
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Custom Inquiry Strip - Single-Line Clean Action Strip */}
        <div className="mt-5 max-w-5xl mx-auto py-3 sm:py-3.5 px-5 sm:px-6 rounded-2xl bg-orange-50/70 border border-orange-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3 sm:gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff5722] flex items-center justify-center shrink-0">
              <Wrench className="w-4 h-4 text-[#ff5722]" />
            </div>
            <h4 className="text-sm sm:text-[15px] font-bold text-slate-900">
              Need custom simulation rigs for your specific parts?
            </h4>
          </div>
          <a
            href="https://cal.com/tetrahedron/dojo"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpenVideoModal?.();
            }}
            className="whitespace-nowrap px-5 py-2 rounded-lg bg-[#001730] hover:bg-[#ff5722] text-white font-semibold shadow-xs transition-colors cursor-pointer text-xs shrink-0"
          >
            Discuss Custom Jigs
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
