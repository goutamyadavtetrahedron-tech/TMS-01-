"use client";

import React from "react";
import {
  Brain,
  Wrench,
  Users,
  ClipboardList,
  Search,
  ShieldCheck,
  Sparkles,
  Layers,
  Target,
  ArrowRight,
} from "lucide-react";

export default function DojoFoundationStrengths({ onOpenVideoModal }) {
  const strengths = [
    {
      icon: Brain,
      title: "Accelerated Skill Enhancement",
      desc: "Provides a controlled, focused environment for rapid learning and mastery of practical tasks through structured repetition and immediate feedback.",
      metric: "80% faster cycle-time readiness",
      tag: "Tactile Repetition",
    },
    {
      icon: Wrench,
      title: "Bridging Theory & Practice",
      desc: "Translates classroom engineering theory into tangible, muscle-memory skills directly aligned with your plant's assembly line and machine constraints.",
      metric: "Zero classroom disconnect",
      tag: "Hands-On Simulation",
    },
    {
      icon: Users,
      title: "Building Lean Culture",
      desc: "Instills Japanese principles of 5S, Kaizen, standardized work, and relentless waste elimination into operator daily habits from day one.",
      metric: "100% lean mindset adoption",
      tag: "TPS & WCM Benchmark",
    },
    {
      icon: ClipboardList,
      title: "Reinforcing Standardization",
      desc: "Ensures uniform understanding and strict adherence to Standard Operating Procedures (SOPs), SOS sheets, and Takt time rhythms across all shifts.",
      metric: "Zero operator variance",
      tag: "SOP & Takt Compliance",
    },
    {
      icon: Search,
      title: "Effective Problem Solving",
      desc: "Develops critical thinking by equipping technicians with structured root-cause analysis tools: 5-Why, Fishbone (Ishikawa), and A3 problem-solving.",
      metric: "Root cause, not symptom fixes",
      tag: "5-Why & A3 Thinking",
    },
    {
      icon: ShieldCheck,
      title: "Improved Safety Awareness",
      desc: "Allows zero-risk experiential practice of dangerous pinch points, LOTO lockouts, and emergency interlocks without endangering workers.",
      metric: "60–80% drop in near-misses",
      tag: "Zero-Incident Habits",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Pill & Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase text-[#ff5722] tracking-wider">
            Practical Learning Environment
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#001730] mt-1 tracking-tight">
            What is a <span className="text-[#ff5722]">Dojo Training Center?</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            Bridging theoretical classroom knowledge and real shopfloor execution through tactile muscle memory and zero-risk simulation.
          </p>
        </div>

        {/* 3 Digestible Concept Cards (Replaces Dense Text Wall) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Japanese Origin */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#ff5722] hover:shadow-md transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#001730] font-bold text-sm mb-4">
                道場
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Cultural & Industrial Origin
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-2.5">
                From Martial Arts to Manufacturing
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                ‘Dojo’ signifies a <em>place of immersive, disciplined practice</em>. In TPS &amp; WCM manufacturing, it is a dedicated off-line hub where operators master standard work (SOPs) and defect recognition before touching live lines.
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722]" />
              Controlled, zero-risk practice space
            </div>
          </div>

          {/* Card 2: Classroom Failure */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#ff5722] hover:shadow-md transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#ff5722] mb-4">
                <Target className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff5722] block mb-1">
                The Practical Shopfloor Problem
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-2.5">
                Why Classroom Training Fails
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                PowerPoint slides result in over 70% skill drop-off within 48 hours. A Dojo replaces passive listening with <strong>sensory learning</strong>—operators feel fastener torque, hear pneumatic valve clicks, and spot micron-level defects.
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722]" />
              Tactile reflexes &amp; muscle memory
            </div>
          </div>

          {/* Card 3: Tetrahedron Advantage */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#ff5722] hover:shadow-md transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white mb-4">
                <Layers className="w-5 h-5 text-orange-400" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Engineering & Execution
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-2.5">
                The Tetrahedron Ecosystem
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                We engineer the complete capability architecture: custom CE-compliant simulation rigs, bilingual visual SOPs, L1–L4 skill matrices, and certified internal Train-the-Trainer (TTT) facilitators.
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722]" />
              End-to-end operational handover
            </div>
          </div>
        </div>

        {/* 6 Core Strengths Grid */}
        <div className="mb-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff5722]">
              Proven Operational Impact
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#001730] mt-1">
              Our 6 Core Dojo Strengths
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
              Each strength is engineered into every custom simulation rig and curriculum zone we commission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strengths.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-[#ff5722] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#ff5722] group-hover:bg-[#ff5722] group-hover:text-white transition-colors shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                        {s.tag}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 mb-2">
                      {s.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-semibold text-slate-400">Measured Outcome:</span>
                    <span className="font-bold text-[#ff5722]">{s.metric}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
