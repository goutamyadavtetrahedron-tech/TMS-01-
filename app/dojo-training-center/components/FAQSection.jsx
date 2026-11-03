"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Why is a DOJO Training Center important for manufacturing companies?",
      a: "A DOJO Training Center helps companies train employees faster, improve skills, reduce mistakes, and improve SPQDM (Safety, Productivity, Quality, Delivery, and Morale). For many OEMs, having a DOJO Center is mandatory for supplier approval and compliance, making it essential for companies aiming to become approved vendors.",
    },
    {
      q: "What is DOJO 2.0 and what are its four pillars?",
      a: "DOJO 2.0 combines practical training with workforce planning, digital learning, competency tracking, and management dashboards to improve employee skills and shop-floor performance. Introduced as a compliance requirement by Maruti Suzuki and adopted by other leading OEMs, its four pillars include: Advanced Manpower Planning, Process-Specific DOJO, Digital Tools & AR/VR Applications, and Management Review Dashboards.",
    },
    {
      q: "What equipment and modules are included, and can they be customized?",
      a: "A DOJO Center may include assembly simulators, component identification boards, quality inspection stations, precision measuring tools, safety hazard training setups, CLI stations, and process-specific models. The entire setup is customized to your specific manufacturing processes, production parts, quality standards, and training goals.",
    },
    {
      q: "How much space is required to set up a DOJO Center?",
      a: "Space requirements depend on the number of modules, trainee capacity, equipment dimensions, and plant scope. An existing room of almost any size can be utilized — ranging from compact 150–300 sq.ft. Mini Line-Side Dojos to 600–2,000+ sq.ft. comprehensive central training academies.",
    },
    {
      q: "What is the cost of setting up a DOJO or Mini DOJO Center?",
      a: "Tetrahedron offers customized DOJO solutions starting from ₹2 lakh onwards. The final cost depends on the chosen physical modules, simulation hardware, level of component customization, and whether digital dashboards or AR/VR solutions are integrated.",
    },
    {
      q: "How long does it take to set up and commission a DOJO Training Center?",
      a: "The timeline depends on the number of modules, custom simulation jigs, space availability, and project scope. Our structured turnkey execution roadmap typically completes plant diagnosis, 3D design, simulator fabrication, and certified trainer handover within a streamlined 8-week timeframe.",
    },
  ];

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="dojo-faqs" className="pt-8 sm:pt-10 pb-6 sm:pb-8 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-7">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#001730] tracking-tight leading-tight">
            DOJO Training Center <span className="text-[#ff5722]">FAQs</span>
          </h2>
        </div>

        {/* Minimalist Line-Divider Accordion List (Apple / Stripe Style) */}
        <div className="divide-y divide-slate-200 border-y border-slate-200">
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
