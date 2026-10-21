"use client";

import React from "react";
import { Video, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";

export default function TurnkeyRoadmap({ onOpenVideoModal }) {
  const phases = [
    {
      step: "01",
      weeks: "Weeks 1 – 2",
      title: "Needs Assessment & Scrap Pareto Audit",
      legacySteps: "Step 1: Needs Assessment",
      desc: "Comprehensive on-site plant assessment: identifying specific skill gaps, shopfloor defect logs, training objectives, and target technician cohorts.",
      milestone: "Scrap Pareto & Critical Process Map",
    },
    {
      step: "02",
      weeks: "Week 3",
      title: "Conceptual Design & 3D Floor Architecture",
      legacySteps: "Step 2: Conceptual Design",
      desc: "Planning the Dojo layout, ergonomics, station footprints, pneumatic/electrical routing, and learning modules based on plant constraints.",
      milestone: "Approved 3D Floor Plan & CAD Specs",
    },
    {
      step: "03",
      weeks: "Weeks 4 – 5",
      title: "Physical Setup & Precision Rig Fabrication",
      legacySteps: "Step 4: Physical Setup & Fixture Manufacturing",
      desc: "Fabrication of CE/OSHA compliant simulation benches, safety interlocking danger domes, sensorized jigs, and visual communication aids.",
      milestone: "Fabricated Simulation Jigs & Benches",
    },
    {
      step: "04",
      weeks: "Week 6",
      title: "Content Development & L1–L4 Competency Matrix",
      legacySteps: "Step 3: Content Development & SOPs",
      desc: "Creating tailored training materials, bilingual visual standard work instructions (SOS/SOPs), pass/fail rubrics, and digital scorecards.",
      milestone: "Visual SOP Sheets & Competency Rubrics",
    },
    {
      step: "05",
      weeks: "Week 7",
      title: "Train-the-Trainer (TTT) Master Accreditation",
      legacySteps: "Step 5: Trainer Training (Train-the-Trainer)",
      desc: "Intensive coaching and pedagogical certification of internal plant trainers and shift supervisors to effectively facilitate hands-on drills.",
      milestone: "Certified Internal Dojo Masters",
    },
    {
      step: "06",
      weeks: "Week 8",
      title: "Pilot Program, Full Rollout & Monitoring",
      legacySteps: "Steps 6, 7 & 8: Pilot, Integration & Monitoring",
      desc: "Running initial pilot training sessions, refinement based on operator feedback, full HR/operations integration, and continuous KPI impact tracking.",
      milestone: "Pilot Cohort Graduation & Full Handover",
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Clean Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase text-[#ff5722] tracking-wider">
            Our Approach & Implementation Process
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#001730] mt-1 tracking-tight">
            Setting Up Your Dojo:{" "}
            <span className="text-[#ff5722]">8-Week Execution Roadmap</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            A proven 8-step methodology engineered from initial diagnostic assessment to certified internal Dojo trainers and continuous performance tracking.
          </p>
        </div>

        {/* Clean 3-Column Phase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phases.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#ff5722] hover:bg-white hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold text-[#ff5722] tracking-wider">
                    PHASE {p.step}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-white px-2.5 py-0.5 rounded-full border border-slate-200 shadow-xs">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{p.weeks}</span>
                  </span>
                </div>

                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  {p.legacySteps}
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {p.title}
                </h3>

                <p className="mt-2.5 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-200/70 text-xs">
                <span className="text-slate-400 font-medium block text-[10px] uppercase tracking-wide">
                  Key Deliverable & Milestone:
                </span>
                <span className="font-semibold text-slate-800 block mt-0.5">
                  {p.milestone}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Roadmap Sub-banner */}
        <div className="mt-10 p-5 rounded-2xl bg-orange-50/70 border border-orange-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#ff5722] text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-slate-900 font-bold block sm:inline">
                Guaranteed 8-Week Commissioning:
              </strong>{" "}
              <span>
                Includes complete spatial layout, precision fixtures, customized bilingual SOP curriculum, and Train-the-Trainer accreditation.
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onOpenVideoModal("8-Week Implementation Consultation")}
            className="whitespace-nowrap px-5 py-2 rounded-full bg-[#001730] hover:bg-slate-900 text-white font-semibold shadow-sm transition-colors cursor-pointer"
          >
            Review Plant Timeline
          </button>
        </div>
      </div>
    </section>
  );
}
