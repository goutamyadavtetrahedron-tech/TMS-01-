"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "What is the ideal size for a Dojo Training Center?",
      a: "The ideal size depends on your plant's trainee headcount, operational complexity, and target stations. A full-scale 6-zone Dojo typically spans 600 to 2,000 sq.ft. For plants with limited space or specific bottleneck operations, Tetrahedron also designs compact Mini Line-Side Dojos occupying just 150 to 300 sq.ft. directly adjacent to the shopfloor line.",
    },
    {
      q: "How long does it take to set up and commission a Dojo?",
      a: "Our standardized execution roadmap delivers a fully commissioned, turnkey Dojo within 8 weeks. This structured process covers on-site diagnostic assessment, 3D CAD spatial layout, custom precision jig fabrication, visual SOP matrix development, and certified Train-the-Trainer (TTT) facilitator handover.",
    },
    {
      q: "Is a Dojo only for new employees?",
      a: "No. While Dojos cut new-hire onboarding by 80% (reaching 100% takt speed in 5–7 days), world-class plants use their Dojo continuously for: upskilling existing operators, cross-skilling across multiple line stations, re-certifying operators after leave, qualifying workers on new product variants, and conducting mandatory annual LOTO & safety refresher drills.",
    },
    {
      q: "How do you measure the effectiveness and ROI of a Dojo?",
      a: "Effectiveness is tracked quantitatively through: pre-and-post skill matrix evaluations, reduction in training scrap (saving ₹35,000+ per technician), drop in shopfloor assembly defects, First-Time-Right (FTR) fastening rates, and 60%–80% drops in near-misses. Most industrial plants achieve full capital payback within 3 to 6 months.",
    },
    {
      q: "Can a Dojo be virtual or digital (AR/VR / Dojo 2.0)?",
      a: "Yes. While physical tactile jigs remain foundational for developing muscle memory and hand-eye coordination, Tetrahedron offers a hybrid Dojo 2.0. This integrates AR/VR immersive headsets for complex maintenance teardowns, IoT digital torque telemetry, and automated biometric skill scorecards connected to your plant HRMS.",
    },
    {
      q: "Are the danger and safety simulation rigs safe for workers?",
      a: "100% safe. All hazard rigs—including rotating roller pinch points, electrical static, and LOTO manifolds—are engineered with redundant electronic interlocks, pneumatic pressure regulators, torque limiters, and micro-amperage thresholds calibrated strictly below harm levels to deliver physiological and psychological awareness without any physical injury.",
    },
    {
      q: "Can Tetrahedron customize training jigs for our specific plant components?",
      a: "Yes. 100% of our simulation jigs are custom-engineered. Our mechanical design team studies your live production parts—such as steering columns, wiring harnesses, brake calipers, cylinder heads, or PCB modules—and fabricates custom nests, fixtures, and Poka-Yoke jigs tailored to your exact manufacturing tolerances.",
    },
    {
      q: "How does a Dojo prepare our plant for IATF 16949 and VDA 6.3 audits?",
      a: "IATF 16949 (Clause 7.2 Competence) and VDA 6.3 require documented, objective proof of operator qualification. A Tetrahedron Dojo provides auditable biometric qualification logs, quantitative L1–L4 skill matrices, visual standard work instructions, and certified trainer scorecards that give Tier-1 automotive and global OEM auditors complete confidence.",
    },
    {
      q: "What is included in the Train-the-Trainer (TTT) accreditation?",
      a: "Tetrahedron doesn't just deliver hardware; we build self-sustaining internal capability. Our master coaches train your line supervisors and safety officers in adult learning pedagogy, Job Instruction Training (TWI-JI), quantitative evaluation rubrics, and daily 15-minute warmup drills, awarding them certified Dojo Master credentials.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-[#ff5722] tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#001730] tracking-tight leading-tight">
            Dojo Training Center FAQs
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Clear, transparent answers on spatial requirements, setup timelines, ROI, curriculum, and audit compliance.
          </p>
        </div>

        {/* Single Clean Accordion List */}
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-xs hover:border-slate-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-[#001730] leading-snug">
                    {f.q}
                  </span>
                  <span className="p-1.5 rounded-full bg-slate-100 text-slate-600 shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#ff5722]" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
