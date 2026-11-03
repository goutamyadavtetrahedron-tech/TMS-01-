"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Video,
  Maximize2,
  X,
  ArrowRight,
} from "lucide-react";

export default function DojoSetupJourney({ onOpenVideoModal }) {
  const [isFloorplanModalOpen, setIsFloorplanModalOpen] = useState(false);

  const steps = [
    {
      step: "01",
      title: "Understand Your Requirements",
      desc: "We understand your manufacturing processes, workforce skill gaps, training needs, available space, and applicable OEM requirements.",
    },
    {
      step: "02",
      title: "Design Your DOJO",
      desc: "We create a customized layout and recommend the right training modules, simulators, tools, and digital solutions for your facility.",
    },
    {
      step: "03",
      title: "Develop Your Training Modules",
      desc: "We develop process-specific training content, practical exercises, visual aids, simulations, and standardized work instructions.",
    },
    {
      step: "04",
      title: "Build & Equip Your DOJO",
      desc: "We manufacture and arrange the required training equipment, workstations, simulators, and safety features to bring your DOJO to life.",
    },
    {
      step: "05",
      title: "Prepare Your Trainers",
      desc: "We train your designated team to conduct effective sessions, evaluate employee skills, and manage day-to-day DOJO activities.",
    },
    {
      step: "06",
      title: "Test & Fine-Tune",
      desc: "We conduct trial training sessions, collect feedback, and make necessary improvements before the full rollout.",
    },
    {
      step: "07",
      title: "Launch Your DOJO",
      desc: "We support the implementation of your DOJO training program, helping integrate it with your existing workforce development and operational processes.",
    },
    {
      step: "08",
      title: "Track Progress & Improve",
      desc: "We help you monitor training effectiveness, maintain digital skill matrices, identify competency gaps, and continuously improve workforce performance.",
    },
  ];

  return (
    <section className="pt-8 sm:pt-10 pb-8 sm:pb-10 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-7">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#001730] tracking-tight leading-tight">
            Setting Up Your DOJO: <br className="hidden sm:inline" />
            <span className="text-[#ff5722]">A Simple, Step-by-Step Journey</span>
          </h2>
        </div>

        {/* Real Floor Showcase Image Banner - Full DOJO Titles Visible & Responsive */}
        <div className="mb-6 sm:mb-8 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-lg relative group">
          <div className="relative h-[250px] sm:h-[360px] md:h-[420px] lg:h-[450px] w-full">
            <Image
              src="/images/dojo/dojo-setup-floorplan.jpeg"
              alt="Tetrahedron Complete DOJO Training Center Floor Setup: Quality, Machining, Electrical, VR, Safety bays"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
              priority
              className="object-cover object-[center_20%] sm:object-[center_25%] group-hover:scale-[1.01] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between gap-3 text-white">
              <div>
                <h3 className="text-sm sm:text-lg md:text-xl font-bold drop-shadow-sm">
                  Comprehensive Multi-Bay DOJO Center
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsFloorplanModalOpen(true)}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-slate-900 text-[11px] sm:text-xs font-semibold border border-white/30 transition-all cursor-pointer shadow-sm shrink-0"
              >
                <Maximize2 className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                <span>Enlarge View</span>
              </button>
            </div>
          </div>
        </div>

        {/* 8 Steps Grid - Option 1: Connected Industrial Stepper Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs hover:border-[#ff5722]/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-start overflow-hidden text-left"
            >
              {/* Top Accent Indicator */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 group-hover:bg-[#ff5722] transition-colors duration-300" />

              {/* Stepper Header: Number Badge + Step Flow Arrow */}
              <div className="flex items-center justify-between mb-4">
                <span className="w-9 h-9 rounded-xl bg-[#001730] text-white font-mono font-bold text-xs inline-flex items-center justify-center group-hover:bg-[#ff5722] transition-colors shadow-2xs">
                  {s.step}
                </span>

                {idx < 7 ? (
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#ff5722] group-hover:translate-x-1 transition-all" />
                ) : (
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                    Go-Live
                  </span>
                )}
              </div>

              {/* Title */}
              <h4 className="text-[17px] sm:text-lg font-bold text-slate-900 group-hover:text-[#ff5722] transition-colors leading-snug mb-2">
                {s.title}
              </h4>

              {/* Description - Tight & Highly Legible */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-6 text-center">
          <a
            href="https://cal.com/tetrahedron/dojo"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpenVideoModal?.();
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#ff5722] to-[#ff6f00] hover:from-[#f4511e] hover:to-[#ff5722] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-orange-950/20 hover:shadow-orange-900/40 transition-all cursor-pointer"
          >
            <Video className="w-4 h-4" />
            <span>Book a 1-on-1 Layout Consultation</span>
          </a>
        </div>

        {/* Floorplan Modal */}
        {isFloorplanModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsFloorplanModalOpen(false)}
          >
            <div
              className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden p-2 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsFloorplanModalOpen(false)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative w-full h-[80vh]">
                <Image
                  src="/images/dojo/dojo-setup-floorplan.jpeg"
                  alt="Tetrahedron Complete DOJO Center Floor Plan"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
