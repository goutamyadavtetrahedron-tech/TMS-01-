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
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 border border-orange-200 text-xs font-semibold text-[#ff5722] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Dojo Philosophy & Industrial Foundation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#001730] tracking-tight leading-tight">
            Hands-On Skill Development in a{" "}
            <span className="text-[#ff5722]">Practical Learning Environment</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Bridging the gap between theoretical classroom knowledge and real shopfloor execution through tactile muscle memory and zero-risk simulation.
          </p>
        </div>

        {/* Executive Overview: Origin & Definition Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Origin Context */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-slate-200 pb-6 lg:pb-0 lg:pr-8">
              <span className="inline-block px-3 py-1 rounded-md bg-[#001730] text-white text-[11px] font-bold tracking-wider uppercase mb-3">
                Cultural & Industrial Origin
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#001730] leading-snug">
                From Japanese Martial Arts to Manufacturing Benchmark
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                The term <strong>&lsquo;Dojo&rsquo; (道場)</strong> originates from Japanese martial arts, signifying a <em>&ldquo;place of immersive learning, disciplined practice, and continuous mastery.&rdquo;</em>
              </p>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                In modern world-class manufacturing (TPS / WCM), a Dojo is a dedicated, controlled industrial ecosystem where employees safely practice and master operational tasks, standard operating procedures (SOPs), and defect recognition before touching live production lines.
              </p>
            </div>

            {/* Right: Why a Dojo is Essential */}
            <div className="lg:col-span-7 lg:pl-4 space-y-4">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-orange-50/60 border border-orange-100">
                <div className="w-9 h-9 rounded-xl bg-[#ff5722] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Why Traditional Classroom Training Fails on the Shopfloor
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Classrooms rely on PowerPoint slides and theoretical lectures, resulting in over 70% skill drop-off within 48 hours. A Dojo replaces passive listening with <strong>experiential, sensory learning</strong>—allowing operators to feel fastener torque, hear pneumatic valve clicks, and spot micron-level defects in a controlled training pod.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-9 h-9 rounded-xl bg-[#001730] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Why Partner with Tetrahedron to Design & Build Your Dojo?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Tetrahedron leverages deep automotive and heavy engineering lean expertise to build customized Dojo ecosystems. We don&apos;t just install hardware—we engineer the complete learning architecture: custom physical rigs, L1–L4 skill progression matrices, and Train-the-Trainer (TTT) facilitator certification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Core Strengths Grid */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#ff5722]">
                Proven Operational Impact
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#001730] mt-1">
                Our 6 Core Dojo Strengths
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Each strength is engineered into every custom training rig and curriculum zone we commission.
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
