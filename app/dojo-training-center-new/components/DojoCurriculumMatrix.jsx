"use client";

import React from "react";
import {
  Wrench,
  Gauge,
  GitBranch,
  CheckSquare,
  ShieldAlert,
  Users2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function DojoCurriculumMatrix() {
  const skillCategories = [
    {
      title: "Technical & Job-Specific Skills",
      icon: Wrench,
      desc: "Assembly operations, mechanical fitting, machine maintenance, and line-speed cycle execution.",
      skills: [
        "Torque-Angle Fastening & Sequence Control",
        "Blind Pin & Thread Discrimination",
        "Wire Harness Routing & Terminal Insertion",
        "Pneumatic Fitting & Manifold Connections",
        "Takt-Time Cycle Synchronization",
      ],
    },
    {
      title: "Lean Manufacturing Tools & Techniques",
      icon: Gauge,
      desc: "Shopfloor elimination of muda (waste), pull systems, and continuous flow standardization.",
      skills: [
        "5S Workplace Organization & Visual Sorting",
        "Standard Work Combination Sheets (SWCS)",
        "Kanban Card Sign-off & Two-Bin Replenishment",
        "Poka-Yoke Mechanical & Sensor Error Proofing",
        "SMED Rapid Line Changeover Simulation",
      ],
    },
    {
      title: "Structured Problem-Solving (RCA & PDCA)",
      icon: GitBranch,
      desc: "Systematic tools to isolate root causes and prevent repetitive assembly line stoppages.",
      skills: [
        "5-Why Root Cause Drilldowns",
        "Fishbone (Ishikawa / 6M) Analysis",
        "A3 Structured Problem-Solving Sheets",
        "PDCA (Plan-Do-Check-Act) Kaizen Cycles",
        "8D Corrective Action Implementation",
      ],
    },
    {
      title: "Quality Assurance & Metrology",
      icon: CheckSquare,
      desc: "Zero-defect mindset with hands-on calibration, defect catalogs, and precision measurement.",
      skills: [
        "Vernier Caliper & Micrometer Calibration",
        "Go / No-Go Plug & Snap Gauge Verification",
        "Boundary & Limit Sample Discrimination",
        "Visual Inspection in Lux-Calibrated Lighting",
        "First-Piece & Last-Piece Inspection Protocol",
      ],
    },
    {
      title: "Safety Procedures & Hazard Recognition",
      icon: ShieldAlert,
      desc: "Zero-harm behavioral reflexes, kinetic hazard awareness, and life-critical lockout protocols.",
      skills: [
        "Lockout / Tagout (LOTO) Multi-Energy Isolation",
        "Pinch-Point & Rotating Roller Awareness",
        "Chemical Handling & Spill Control (MSDS)",
        "Biomechanical Lifting & Ergonomic Posture",
        "PPE Selection & Wearer Compliance Drills",
      ],
    },
    {
      title: "Leadership, Coaching & Teamwork",
      icon: Users2,
      desc: "Equipping supervisors and internal trainers to sustain standards and pass client audits.",
      skills: [
        "Train-the-Trainer (TTT) Demonstration Pedagogy",
        "Job Instruction Training (TWI Methodology)",
        "Multi-Operator Assembly Line Balancing",
        "Skill Matrix Evaluation & Competency Scoring",
        "IATF 16949 & VDA 6.3 Audit Demonstration",
      ],
    },
  ];

  return (
    <section className="py-14 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple, Clean Header (Zero Filter Clutter) */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-semibold text-[#001730] mb-2">
            <Sparkles className="w-3 h-3 text-[#ff5722]" />
            <span>Core Competencies</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#001730] tracking-tight leading-tight">
            Types of Skills Developed in a <span className="text-[#ff5722]">Tetrahedron Dojo</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            From basic sensory calibration to advanced supervisor coaching—practical skill modules engineered for immediate shopfloor execution.
          </p>
        </div>

        {/* Clean, Spacious 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-[#ff5722] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#ff5722] shadow-xs shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {cat.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-4">
                    {cat.desc}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-100">
                    {cat.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-[#ff5722] shrink-0 mt-0.5" />
                        <span className="font-semibold leading-snug">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
