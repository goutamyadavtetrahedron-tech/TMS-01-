"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Compass,
  Eye,
  Shield,
  Wrench,
  Cpu,
  MonitorCheck,
  CheckCircle2,
  Video,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  ZoomIn,
} from "lucide-react";
import ImageLightboxModal from "./ImageLightboxModal";

export default function SixZonesBlueprint({ onOpenVideoModal, onOpenImage }) {
  const [activeZone, setActiveZone] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const zones = [
    {
      number: "Zone 01",
      shortTitle: "Culture & Visuals",
      title: "Induction, Culture & Visual Management",
      consultingModule: "Module: Visual Management Integration",
      icon: <Compass className="w-4 h-4" />,
      tagline: "Culture, Vision & Visual Controls",
      image: "/images/blog/dojo-in-manufacturing-0.jpg",
      description:
        "The starting gateway where new operators absorb plant quality heritage, visual controls, and customer defect impact before touching live machinery. Standardized performance boards and visual communication methods set the foundation.",
      equipment: [
        "Visual Management & Performance Board Kiosks",
        "Cutaway Finished Product Displays (End-User Context)",
        "Customer Defect Hall of Shame & Cost Impact Wall",
        "5S Workplace Standards & Core Lean Manufacturing Pillars",
      ],
      impact: "Instills zero-defect pride before shopfloor entry",
    },
    {
      number: "Zone 02",
      shortTitle: "Quality & Metrology",
      title: "Quality Assurance Practice & Sensory Calibration",
      consultingModule: "Module: Quality Assurance Practice",
      icon: <Eye className="w-4 h-4" />,
      tagline: "Sensory Reflexes & Measurement Precision",
      image: "/images/blog/dojo-training-0.jpg",
      description:
        "Dedicated stations for learning defect identification, precision measurement techniques, and sensory reflexes: distinguishing M6 vs M8 threads by touch, checking tolerances with calipers/gauges, and detecting air leaks by sound.",
      equipment: [
        "Vernier Caliper & Micrometer Calibration Fixtures",
        "Blind Part Sorting Boards (Thread & Pin discrimination)",
        "Two-Handed Symmetrical Reach & Assembly Rigs",
        "Lux-Calibrated Visual Defect & Defect Catalog Booth",
      ],
      impact: "Saves 4 to 8 seconds per repetitive assembly cycle",
    },
    {
      number: "Zone 03",
      shortTitle: "Safety & Danger Dome",
      title: "Safety Simulation & Hazard Danger Dome",
      consultingModule: "Module: Safety Simulation",
      icon: <Shield className="w-4 h-4" />,
      tagline: "Zero-Harm Experiential Hazard Simulations",
      image: "/images/blog/safety-dojo-0.jpg",
      description:
        "Focuses on practicing safety protocols, hazard identification, lockout/tagout (LOTO), and emergency stop reflexes in a 100% safe, sensor-interlocked environment—building instinctive caution without risking injury.",
      equipment: [
        "Lockout / Tagout (LOTO) Multi-Energy Isolation Panel",
        "Interlocked Rotating Roller & Pinch-Point Simulator",
        "Kinetic Lifting Spine Strain Biomechanical Dummy",
        "Chemical Splash & UV PPE Impermeability Booth",
      ],
      impact: "60%–80% reduction in plant near-misses & accidents",
    },
    {
      number: "Zone 04",
      shortTitle: "Standard Work & Assembly",
      title: "Standardized Work Stations & Assembly",
      consultingModule: "Module: Standardized Work Stations",
      icon: <Wrench className="w-4 h-4" />,
      tagline: "SOP Repetition & Takt-Time Synchronization",
      image: "/assets/images/dojo-physical-simulation/standardized-workstations.jpg",
      description:
        "Dedicated areas mimicking actual workstations where operators repeatedly practice Standard Operating Procedures (SOPs), high-torque fastening, harness routing, and takt-time pacing until flawless muscle memory is achieved.",
      equipment: [
        "Digital Torque-Angle Nutrunner Fastening Benches",
        "Standard Work Combination Sheet (SWCS) Stations",
        "Connector Terminal Pin Insertion & Click Rig",
        "Point-of-Use (POU) Gravity Flow Fastener Bins & Poka-Yoke",
      ],
      impact: "Guarantees 100% First-Time-Right (FTR) fastening",
    },
    {
      number: "Zone 05",
      shortTitle: "Kaizen & Maintenance",
      title: "Kaizen & Continuous Improvement Area",
      consultingModule: "Module: Kaizen & Autonomous Maintenance",
      icon: <Cpu className="w-4 h-4" />,
      tagline: "Hands-On Kaizen & Autonomous Maintenance",
      image: "/assets/images/dojo-physical-simulation/kaizen-continuous-improvement.jpg",
      description:
        "Facilitates hands-on practice of small, incremental improvements (Kaizen) and Autonomous Maintenance (Jishu Hozen): pneumatic valve maintenance, sensor alignment, bearing lubrication, and single-piece flow optimization.",
      equipment: [
        "Kaizen Suggestion & Rapid Prototyping Worktable",
        "Pneumatic Cylinder Circuit & Pressure Regulator Rigs",
        "Photoelectric & Inductive Sensor Alignment Board",
        "Cutaway Industrial Centrifugal Pump & Valve Manifolds",
      ],
      impact: "Reduces machine micro-stoppages by up to 40%",
    },
    {
      number: "Zone 06",
      shortTitle: "Problem-Solving & RCA",
      title: "Problem-Solving Zones & Digital Assessment",
      consultingModule: "Module: Problem-Solving & Modularity",
      icon: <MonitorCheck className="w-4 h-4" />,
      tagline: "RCA Methodologies & L1–L4 Skill Certification",
      image: "/assets/images/dojo-physical-simulation/problem-solving-digital-assessment.jpg",
      description:
        "Equipped with whiteboards and A3 templates for root cause analysis (5-Why, Fishbone/Ishikawa). Designed with modularity to adapt for evolving training modules, biometric skill evaluation, and real-time competency matrices.",
      equipment: [
        "5-Why, Fishbone & A3 Structured Problem-Solving Boards",
        "Biometric Trainee Check-in & Skill Profiling Kiosk",
        "Automated Digital Pass/Fail Time-Study Recorders",
        "Real-Time L1–L4 Competency Matrix Dashboard",
      ],
      impact: "100% audit compliance for Tier-1 customer audits",
    },
  ];

  const current = zones[activeZone];
  const nextIdx = (activeZone + 1) % zones.length;
  const prevIdx = (activeZone - 1 + zones.length) % zones.length;

  return (
    <section id="six-zones" className="py-10 sm:py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Clean Header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <span className="text-[11px] font-bold uppercase text-[#ff5722] tracking-wider block mb-1">
            Consulting Areas &amp; Core Setup Modules
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#001730] tracking-tight leading-tight">
            The Proven 6-Zone Dojo Blueprint &amp;{" "}
            <span className="text-[#ff5722]">Consulting Modules</span>
          </h2>
          <p className="mt-1 text-xs sm:text-[13px] text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Integrating all 6 core manufacturing training areas—from standardized workstations to problem-solving and safety simulation.
          </p>
        </div>

        {/* Viewport Split Grid (Clean 4-col Left Tabs, 8-col Spacious Right Showcase) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left: 6 Sleek Vertical Tabs with Short Titles and Hover Expansion */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-1.5">
            {zones.map((z, idx) => {
              const isActive = activeZone === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveZone(idx)}
                  className={`group w-full text-left px-3.5 py-2.5 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    isActive
                      ? "bg-[#001730] text-white border-[#001730] shadow-sm ring-1 ring-[#001730]"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-white hover:border-[#ff5722]/50 hover:shadow-xs"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold shrink-0 transition-colors ${
                        isActive
                          ? "bg-[#ff5722] text-white"
                          : "bg-slate-200 text-slate-700 group-hover:bg-orange-100 group-hover:text-[#ff5722]"
                      }`}
                    >
                      0{idx + 1}
                    </span>

                    <div className="min-w-0 flex-1">
                      {/* Short Name Always Visible, Full Name on Hover/Active */}
                      <span className="text-xs sm:text-[13px] font-bold block leading-tight truncate">
                        {isActive ? z.title : z.shortTitle}
                      </span>
                      <span
                        className={`text-[10px] block mt-0.5 font-medium truncate transition-all ${
                          isActive
                            ? "text-orange-300"
                            : "text-slate-400 group-hover:text-slate-600"
                        }`}
                      >
                        {z.consultingModule}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 ml-2">
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-[#ff5722] block ring-4 ring-orange-500/20" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#ff5722] group-hover:translate-x-0.5 transition-transform" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Active Zone Details Panel with Prominent Photo & Bottom-Right Next Button */}
          <div className="lg:col-span-8 bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#001730] text-white text-[11px] font-bold">
                    {current.number}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-orange-100 text-[#ff5722] text-[11px] font-semibold">
                    {current.consultingModule}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  ✦ {current.impact}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 leading-snug">
                {current.title}
              </h3>

              <p className="mt-1 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                {current.description}
              </p>

              {/* Station Image & Equipment Grid (Expansive 50/50 Split) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-4 pt-3.5 border-t border-slate-200 items-center">
                {/* Equipment List (5 cols) */}
                <div className="md:col-span-5 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Simulation Stations Included:
                  </span>
                  {current.equipment.map((eq, eIdx) => (
                    <div key={eIdx} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ff5722] shrink-0 mt-0.5" />
                      <span className="leading-snug">{eq}</span>
                    </div>
                  ))}
                </div>

                {/* Prominent, Expanded Station Photo (7 cols) - Click to Open */}
                <div
                  onClick={() => {
                    setLightboxIndex(activeZone);
                    if (onOpenImage) {
                      onOpenImage({
                        images: zones.map((z) => ({
                          src: z.image,
                          alt: z.title,
                          title: `${z.number}: ${z.title}`,
                        })),
                        currentIndex: activeZone,
                      });
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setLightboxIndex(activeZone);
                      if (onOpenImage) {
                        onOpenImage({
                          images: zones.map((z) => ({
                            src: z.image,
                            alt: z.title,
                            title: `${z.number}: ${z.title}`,
                          })),
                          currentIndex: activeZone,
                        });
                      }
                    }
                  }}
                  title="Click to view full image"
                  className="md:col-span-7 relative h-48 sm:h-52 rounded-xl overflow-hidden border border-slate-200 shadow-sm cursor-zoom-in group/img"
                >
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover group-hover/img:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80 group-hover/img:opacity-60 transition-opacity" />
                  
                  {/* View / Zoom Pill on Top Left */}
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium flex items-center gap-1 group-hover/img:bg-[#ff5722] transition-colors">
                    <ZoomIn className="w-3 h-3 text-[#ff5722] group-hover/img:text-white" />
                    <span>View</span>
                  </span>

                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px]">
                    <span className="font-semibold">
                      {current.number} • Workstation Architecture
                    </span>
                    <span className="bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-medium border border-white/20">
                      Step {activeZone + 1} of 6
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Panel CTA & Bottom-Right Next Button */}
            <div className="mt-4 pt-3.5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href="https://calendly.com/kartikey-tetrahedron/new-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs font-semibold transition-all cursor-pointer shadow-xs shrink-0"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Discuss {current.number} Layout</span>
              </a>

              {/* Bottom Right Next Button to see next card */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setActiveZone(prevIdx)}
                  aria-label="Previous Zone"
                  className="p-2 rounded-full bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors cursor-pointer shadow-xs"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveZone(nextIdx)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-[#001730] text-[#001730] hover:text-white border border-slate-300 hover:border-[#001730] text-xs font-bold transition-all shadow-xs cursor-pointer group"
                >
                  <span>Next: {zones[nextIdx].shortTitle}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#ff5722] group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <ImageLightboxModal
          images={zones.map((z) => ({
            src: z.image,
            alt: z.title,
            title: `${z.number}: ${z.title}`,
          }))}
          currentIndex={lightboxIndex}
          onIndexChange={(newIdx) => {
            setLightboxIndex(newIdx);
            setActiveZone(newIdx);
          }}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}
