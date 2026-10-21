"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export default function FAQSection() {
  const [openIndices, setOpenIndices] = useState([0]);
  const [showAll, setShowAll] = useState(false);

  const faqs = [
    {
      q: "What is the ideal size for a Dojo Training Center?",
      a: "The ideal size depends on your plant's trainee headcount, operational complexity, and target stations. A full-scale 6-zone Dojo typically spans 600 to 2,000 sq.ft. For plants with limited space or specific bottleneck operations, Tetrahedron also designs compact Mini Line-Side Dojos occupying just 150 to 300 sq.ft. directly adjacent to the shopfloor line.",
    },
    {
      q: "How long does it take to set up and commission a Dojo?",
      a: "Our standardized execution roadmap delivers a fully commissioned Dojo within 8 weeks. This structured process covers on-site diagnostic assessment, 3D CAD spatial layout, custom precision jig fabrication, visual SOP matrix development, and certified Train-the-Trainer (TTT) facilitator handover.",
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

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 6);

  const toggleFaq = (idx) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return Array.from(next);
    });
  };

  const leftColumnFaqs = visibleFaqs
    .map((faq, originalIndex) => ({ faq, originalIndex }))
    .filter((_, i) => i % 2 === 0);

  const rightColumnFaqs = visibleFaqs
    .map((faq, originalIndex) => ({ faq, originalIndex }))
    .filter((_, i) => i % 2 === 1);

  const renderFaqCard = ({ faq, originalIndex }) => {
    const isOpen = openIndices.includes(originalIndex);
    return (
      <div
        key={originalIndex}
        className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
          isOpen
            ? "border-[#ff5722]/50 bg-white shadow-md ring-1 ring-orange-500/10"
            : "border-slate-200 bg-white hover:border-slate-300 shadow-xs"
        }`}
      >
        <button
          type="button"
          onClick={() => toggleFaq(originalIndex)}
          className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
        >
          <span className="text-xs sm:text-sm font-bold text-[#001730] leading-snug">
            {faq.q}
          </span>
          <span
            className={`p-1.5 rounded-full shrink-0 transition-colors ${
              isOpen
                ? "bg-orange-100 text-[#ff5722]"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {isOpen ? (
              <ChevronUp className="w-4 h-4 text-[#ff5722]" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </span>
        </button>
        {isOpen && (
          <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
            {faq.a}
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="dojo-faqs" className="py-20 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-[#ff5722] tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#001730] tracking-tight leading-tight">
            Dojo Training Center <span className="text-[#ff5722]">FAQs</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            Clear, transparent answers on spatial requirements, setup timelines, ROI, custom curriculum, and manufacturing audit compliance.
          </p>
        </div>

        {/* 2-Column Responsive FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-start">
          {/* Left Column */}
          <div className="space-y-4">{leftColumnFaqs.map(renderFaqCard)}</div>

          {/* Right Column */}
          <div className="space-y-4">{rightColumnFaqs.map(renderFaqCard)}</div>
        </div>

        {/* View More / Show Less Toggle Button */}
        {faqs.length > 6 && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-slate-50 text-[#001730] font-semibold text-xs sm:text-sm border border-slate-300 shadow-xs hover:border-[#ff5722] hover:shadow-sm transition-all cursor-pointer"
            >
              <span>
                {showAll
                  ? "Show Fewer FAQs"
                  : `View More FAQs (${faqs.length - 6} More)`}
              </span>
              {showAll ? (
                <ChevronUp className="w-4 h-4 text-[#ff5722]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#ff5722]" />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
