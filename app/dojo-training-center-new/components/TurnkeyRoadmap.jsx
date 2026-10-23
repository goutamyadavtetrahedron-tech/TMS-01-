"use client";

import React from "react";
import {
  Calendar,
  CheckCircle2,
  Flag,
  Trophy,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function TurnkeyRoadmap() {
  const phases = [
    {
      step: "01",
      weeks: "Weeks 1 – 2",
      category: "Plant Study & Skill Analysis",
      title: "Understanding Your Plant's Defects & Training Needs",
      desc: "We visit your plant to understand your assembly line issues, common operator mistakes, safety risks, and the exact practical skills your workers need to master.",
      milestone: "Clear Skill Gap & Training Plan",
    },
    {
      step: "02",
      weeks: "Week 3",
      category: "Layout & 3D Center Design",
      title: "Designing Your Dojo Floor Layout in 3D",
      desc: "We create a customized 3D layout plan for your available space (600–2,000 sq.ft) with optimal workstation positions, power points, and worker movement flow.",
      milestone: "Final 3D Layout & Workstation Design",
    },
    {
      step: "03",
      weeks: "Weeks 4 – 5",
      category: "Rig Fabrication & Setup",
      title: "Building Your Custom Simulation Benches",
      desc: "Our engineering team fabricates custom hands-on training benches, safety demonstration rigs, and mistake-proofing jigs tailored to your specific plant components.",
      milestone: "Ready-to-Install Training Rigs",
    },
    {
      step: "04",
      weeks: "Week 6",
      category: "Training Modules & Work SOPs",
      title: "Creating Simple Step-by-Step Training Manuals",
      desc: "We prepare easy-to-follow visual training manuals, standard operating procedures (SOPs), and clear evaluation checklists in local languages so workers learn fast.",
      milestone: "Visual SOP Cards & Evaluation Sheets",
    },
    {
      step: "05",
      weeks: "Week 7",
      category: "Trainer Certification",
      title: "Training & Certifying Your In-House Trainers",
      desc: "We coach your plant supervisors and senior operators on how to run practical drills, guide new trainees, and grade worker performance confidently.",
      milestone: "Certified In-House Dojo Trainers",
    },
    {
      step: "06",
      weeks: "Week 8",
      category: "Testing, Handover & Go-Live",
      title: "Running First Batch & Final Handover",
      desc: "We conduct a trial training session with your first batch of workers, fine-tune the practical drills, and officially hand over your fully operational Dojo center.",
      milestone: "First Batch Certified & Center Live",
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Clean Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase text-[#ff5722] tracking-wider">
            Our 8-Week Execution Process
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#001730] mt-1 tracking-tight">
            How We Set Up Your Dojo Center in{" "}
            <span className="text-[#ff5722]">8 Weeks</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            From studying your plant floor challenges to delivering custom training benches and certifying your internal trainers — we handle the complete setup end-to-end.
          </p>
        </div>

        {/* Snake Path / Alternating Ladder Timeline */}
        <div className="relative">
          {/* Central Vertical Connector Spine */}
          <div className="hidden lg:block absolute left-1/2 -ml-0.5 top-8 bottom-8 w-1 bg-gradient-to-b from-[#ff5722] via-orange-300 to-[#001730] rounded-full" />
          <div className="lg:hidden absolute left-6 top-8 bottom-8 w-1 bg-gradient-to-b from-[#ff5722] via-orange-300 to-[#001730] rounded-full" />

          {/* Top Kickoff Marker */}
          <div className="flex items-center justify-start lg:justify-center mb-10 pl-2 lg:pl-0">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-[#ff5722] border border-orange-200 text-xs font-bold shadow-xs z-10">
              <Flag className="w-3.5 h-3.5" />
              <span>Week 0: Project Kickoff &amp; Plant Alignment</span>
            </div>
          </div>

          {/* Alternating Rungs / Cards */}
          <div className="space-y-10 lg:space-y-12">
            {phases.map((p, idx) => {
              const isEven = idx % 2 === 1; // 0: Left, 1: Right, 2: Left, 3: Right...

              return (
                <div
                  key={idx}
                  className="relative flex flex-col lg:flex-row items-center justify-between gap-6"
                >
                  {/* Left Column (Card on Even/Odd depending on side) */}
                  <div
                    className={`w-full lg:w-[45%] pl-14 lg:pl-0 ${
                      isEven ? "lg:order-3" : "lg:order-1"
                    }`}
                  >
                    <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm hover:border-[#ff5722] hover:bg-white hover:shadow-md transition-all group">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-extrabold text-[#ff5722] tracking-wider">
                          PHASE {p.step}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 bg-white px-2.5 py-0.5 rounded-full border border-slate-200 shadow-xs">
                          <Calendar className="w-3 h-3 text-[#ff5722]" />
                          <span>{p.weeks}</span>
                        </span>
                      </div>

                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        {p.category}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-[#ff5722] transition-colors mb-2">
                        {p.title}
                      </h3>

                      <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-4">
                        {p.desc}
                      </p>

                      <div className="pt-3 border-t border-slate-200/70">
                        <div className="inline-flex items-center gap-1.5 text-xs text-slate-800 bg-white px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-xs">
                          <Sparkles className="w-3.5 h-3.5 text-[#ff5722] shrink-0" />
                          <span className="font-semibold">{p.milestone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Central Milestone Node (Ladder Rung Hub) */}
                  <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border-4 border-[#ff5722] text-[#001730] font-extrabold text-sm sm:text-base flex items-center justify-center shadow-md">
                      {p.step}
                    </div>
                  </div>

                  {/* Opposite Column (Visual Timeline Context Badge) */}
                  <div
                    className={`hidden lg:flex w-[45%] flex-col ${
                      isEven
                        ? "lg:order-1 items-end text-right pr-6"
                        : "lg:order-3 items-start text-left pl-6"
                    }`}
                  >
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Timeline Milestone
                    </span>
                    <span className="text-xl font-extrabold text-slate-800 tracking-tight mt-0.5">
                      {p.weeks}
                    </span>
                    <span className="text-sm sm:text-[15px] font-bold text-slate-800 max-w-sm mt-1 leading-snug">
                      {p.category} • Handover Milestone
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Finish Trophy Marker */}
          <div className="flex items-center justify-start lg:justify-center mt-12 pl-2 lg:pl-0">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md z-10">
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>Week 8: Dojo Commissioned &amp; Operators Certified!</span>
            </div>
          </div>
        </div>

        {/* Bottom Roadmap Sub-banner */}
        <div className="mt-14 p-5 rounded-2xl bg-orange-50/70 border border-orange-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#ff5722] text-white flex items-center justify-center shrink-0 shadow-sm">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-slate-900 font-bold block sm:inline">
                Guaranteed 8-Week Commissioning:
              </strong>{" "}
              <span>
                Includes spatial layout, precision fixtures, customized bilingual SOP curriculum, and Train-the-Trainer accreditation.
              </span>
            </div>
          </div>
          <a
            href="https://cal.com/tetrahedron/dojo"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpenVideoModal?.();
            }}
            className="whitespace-nowrap px-5 py-2 rounded-full bg-[#001730] hover:bg-slate-900 text-white font-semibold shadow-sm transition-colors cursor-pointer"
          >
            Review Plant Timeline
          </a>
        </div>
      </div>
    </section>
  );
}
