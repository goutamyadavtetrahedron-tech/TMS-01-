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
  Sparkles,
} from "lucide-react";

export default function SixZonesBlueprint({ onOpenVideoModal }) {
  const [activeZone, setActiveZone] = useState(0);

  const zones = [
    {
      number: "Zone 01",
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
      title: "Standardized Work Stations & Assembly",
      consultingModule: "Module: Standardized Work Stations",
      icon: <Wrench className="w-4 h-4" />,
      tagline: "SOP Repetition & Takt-Time Synchronization",
      image: "/images/blog/dojo-training-1.jpg",
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
      title: "Kaizen & Continuous Improvement Area",
      consultingModule: "Module: Kaizen & Autonomous Maintenance",
      icon: <Cpu className="w-4 h-4" />,
      tagline: "Hands-On Kaizen & Autonomous Maintenance",
      image: "/images/blog/dojo-training.jpg",
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
      title: "Problem-Solving Zones & Digital Assessment",
      consultingModule: "Module: Problem-Solving & Modularity",
      icon: <MonitorCheck className="w-4 h-4" />,
      tagline: "RCA Methodologies & L1–L4 Skill Certification",
      image: "/images/servicesData/dojoherosection.png",
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

  return (
    <section id="six-zones" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Clean Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 border border-orange-200 text-xs font-semibold text-[#ff5722] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consulting Areas & Turnkey Setup Modules</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#001730] tracking-tight leading-tight">
            The Proven 6-Zone Dojo Blueprint &amp;{" "}
            <span className="text-[#ff5722]">Consulting Modules</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Integrating all 7 core manufacturing training areas—from standardized workstations to problem-solving and safety simulation.
          </p>
        </div>

        {/* Viewport Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: 6 Vertical Tabs */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            {zones.map((z, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveZone(idx)}
                className={`w-full text-left px-4 py-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                  activeZone === idx
                    ? "bg-[#001730] text-white border-[#001730] shadow-md ring-1 ring-[#001730]"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                      activeZone === idx
                        ? "bg-[#ff5722] text-white"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <div>
                    <span className="text-xs sm:text-sm font-bold block leading-snug">
                      {z.title}
                    </span>
                    <span
                      className={`text-[11px] block mt-0.5 font-medium ${
                        activeZone === idx ? "text-orange-300" : "text-slate-500"
                      }`}
                    >
                      {z.consultingModule}
                    </span>
                  </div>
                </div>

                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    activeZone === idx ? "bg-[#ff5722]" : "bg-transparent"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Right: Active Zone Details Panel */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#001730] text-white text-xs font-bold">
                    {current.number}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-orange-100 text-[#ff5722] text-xs font-semibold">
                    {current.consultingModule}
                  </span>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  ✦ {current.impact}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {current.title}
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {current.description}
              </p>

              {/* Station Image & Equipment Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 mt-5 pt-5 border-t border-slate-200 items-center">
                {/* Equipment List */}
                <div className="sm:col-span-6 space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Simulation Workstations Included:
                  </span>
                  {current.equipment.map((eq, eIdx) => (
                    <div key={eIdx} className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ff5722] shrink-0 mt-0.5" />
                      <span className="leading-snug">{eq}</span>
                    </div>
                  ))}
                </div>

                {/* Station Photo */}
                <div className="sm:col-span-6 relative h-48 sm:h-52 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-3 text-xs text-white font-medium">
                    {current.number} Workstation Layout
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Panel CTA */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Designed for modularity and adaptation to specific plant line constraints.
              </span>
              <button
                type="button"
                onClick={() => onOpenVideoModal(`Blueprint Layout for ${current.title}`)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-md hover:shadow-orange-900/30 shrink-0"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Discuss {current.number} Layout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
