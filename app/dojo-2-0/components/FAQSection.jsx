"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "What is DOJO 2.0 and what are its four pillars?",
      a: "DOJO 2.0 combines practical hands-on training with workforce planning, digital learning, competency tracking, and management review dashboards to improve employee skills and shop-floor performance. Introduced as a compliance benchmark by Maruti Suzuki and adopted by leading automotive OEMs, its four pillars are: 1) Advanced Manpower Planning, 2) Process-Specific DOJO Training, 3) Digital Tools & AR/VR Applications, and 4) Management Review Dashboards.",
    },
    {
      q: "What is the difference between DOJO and DOJO 2.0?",
      a: "A traditional DOJO focuses on practical, hands-on employee training through physical simulators, manual paper-based skill matrices, and standardized training activities. DOJO 2.0 extends this foundational approach by integrating Advanced Manpower Planning, Process-Specific Training, Digital Tools and AR/VR Applications, and Live Management Review Dashboards to support real-time competency tracking, defect correlation, and data-driven workforce development.",
    },
    {
      q: "Is it compulsory to have AR/VR or digital tools in a DOJO Centre?",
      a: "No. AR/VR and digital tools are not mandatory for every DOJO Centre. However, they may be required if specifically outlined in your OEM's supplier qualification guidelines (e.g. Maruti Suzuki DOJO 2.0 tier-1 mandates). A DOJO can be established with physical simulators and training boards, with digital solutions and AR/VR added according to client requirements, training objectives, and budget.",
    },
    {
      q: "What are Advanced Manpower Planning and Management Review Dashboards in DOJO 2.0?",
      a: "These are digital dashboards displayed on screens inside the DOJO Centre, showing real data on workforce availability, absenteeism, skill gaps, and employee skill evaluations. Management Review Dashboards track customer defects, internal rejections, training plan adherence, and improvement actions to support better operational decision-making and continuous improvement.",
    },
    {
      q: "What is a Digital Skill Evaluation System?",
      a: "A Digital Skill Evaluation System is a software tool for recording, evaluating, and monitoring employee competencies through digital assessments, practical evaluation checklists, and digital skill matrices. It helps identify competency gaps, track employee progress, plan targeted training interventions, and maintain auditable training records for management review and customer audits.",
    },
    {
      q: "Is VR-based training effective for manufacturing operations?",
      a: "Yes. VR training is much more than watching a video. It allows trainees to perform operations themselves in an immersive virtual environment, practice complex or high-risk processes (such as robotic welding, spray painting, leak testing, and fire safety) that may be difficult or risky to develop on active lines, and build muscle-memory reflexes before working on the shop floor.",
    },
    {
      q: "Can an existing DOJO Centre be upgraded to DOJO 2.0?",
      a: "Yes. An existing DOJO Centre can be assessed and upgraded in phases. Typical upgrades include integrating digital skill evaluation software, competency tracking, Advanced Manpower Planning dashboards, and AR/VR-based training modules. The upgrade roadmap is tailored to your existing facility layout, workforce data, and implementation priorities.",
    },
    {
      q: "What is the cost and timeline for setting up a DOJO 2.0 Centre?",
      a: "Tetrahedron offers customized DOJO solutions starting from ₹2 lakh onwards, with the final cost depending on the modules, hardware simulators, level of customization, and digital/AR-VR integration. Commissioning typically spans 6 to 10 weeks depending on custom simulation fabrication and software integration.",
    },
  ];

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="dojo-faqs" className="py-12 sm:py-16 lg:py-20 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#001730] tracking-tight leading-tight">
            DOJO 2.0 <span className="text-[#ff5722]">FAQs</span>
          </h2>
          <div className="w-20 h-1 bg-[#ff5722] mx-auto mt-3.5 rounded-full" />
        </div>

        {/* Minimalist Line-Divider Accordion List */}
        <div className="max-w-5xl mx-auto divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="transition-colors">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left py-5 sm:py-6 flex items-center justify-between gap-4 cursor-pointer group"
                >
                  <span className="text-base sm:text-lg font-bold text-[#001730] group-hover:text-[#ff5722] transition-colors leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-orange-100 text-[#ff5722] rotate-180"
                        : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="pb-6 pr-6 sm:pr-12 text-sm sm:text-base text-slate-600 leading-relaxed animate-in fade-in-50 duration-200">
                    {faq.a}
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
