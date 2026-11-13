"use client";

import React from "react";
import Image from "next/image";
import {
  FileCheck2,
  Lightbulb,
  Laptop,
  Wrench,
  Users,
  TrendingUp,
  ArrowRight,
  ArrowDown,
  Maximize2,
} from "lucide-react";

export default function ImplementationRoadmap({ onOpenImage }) {
  const steps = [
    {
      num: "01",
      stepNum: "1",
      title: "Requirement Assessment & Strategic Alignment",
      image: "/images/dojo/steps/step-01.png",
      bullets: [
        "Understand manufacturing processes and critical operations",
        "Analyze skill gaps, workforce needs and training challenges",
        "Define business objectives and measurable metrics of success",
        "Align with applicable OEM requirements and compliance standards",
      ],
      deliverable: "Clear roadmap and project plan",
      icon: FileCheck2,
    },
    {
      num: "02",
      stepNum: "2",
      title: "Solution Design & Technology Selection",
      image: "/images/dojo/steps/step-02.png",
      bullets: [
        "Define the 4-pillar DOJO 2.0 framework for your plant",
        "Select suitable AR/VR solutions, digital tools, IoT sensors and dashboards",
        "Design training modules aligned to process takt and workforce scope",
        "Finalize hardware specifications, software platforms and tech stack",
      ],
      deliverable: "Tailored solution design & tech architecture",
      icon: Lightbulb,
    },
    {
      num: "03",
      stepNum: "3",
      title: "Content Development & Customization",
      image: "/images/dojo/steps/step-03.png",
      bullets: [
        "Develop process-specific training content and physical simulations",
        "Create AR/VR scenarios, interactive applications and digital quizzes",
        "Customize digital skill matrices, defect galleries and refresher modules",
        "Incorporate safety, quality, maintenance and abnormality handling drills",
      ],
      deliverable: "Ready-to-deploy training content & simulations",
      icon: Laptop,
    },
    {
      num: "04",
      stepNum: "4",
      title: "Infrastructure Setup & Integration",
      image: "/images/dojo/steps/step-04.png",
      bullets: [
        "Fabricate and install training stations, hardware and simulators",
        "Set up VR headsets, large dashboard displays, tablets and network connectivity",
        "Integrate AR/VR systems, evaluation tools and management dashboards",
        "Commission training area infrastructure (power, footprint, safety provisions)",
      ],
      deliverable: "Fully configured & commissioned DOJO 2.0 setup",
      icon: Wrench,
    },
    {
      num: "05",
      stepNum: "5",
      title: "Pilot Implementation & Deployment",
      image: "/images/dojo/steps/step-05.png",
      bullets: [
        "Conduct pilot training batches with target line operators",
        "Evaluate system performance, gather feedback and refine modules",
        "Execute Train-the-Trainer (TTT) certification for internal DOJO master trainers",
        "Roll out DOJO 2.0 across production lines and plant shifts",
      ],
      deliverable: "Validated solution & certified internal trainers",
      icon: Users,
    },
    {
      num: "06",
      stepNum: "6",
      title: "Performance Monitoring & Continuous Improvement",
      image: "/images/dojo/steps/step-06.png",
      bullets: [
        "Monitor training effectiveness through real-time digital dashboards",
        "Track competency levels, training completion and skill-gap closure",
        "Correlate DOJO training with customer defects and line rejection drops",
        "Continuously refresh modules to support audit and compliance readiness",
      ],
      deliverable: "Data-driven improvement & long-term audit readiness",
      icon: TrendingUp,
    },
  ];

  const stage1Steps = steps.slice(0, 3);
  const stage2Steps = steps.slice(3, 6);

  return (
    <section
      id="dojo-roadmap"
      className="py-12 sm:py-16 lg:py-20 bg-slate-50/60 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header: Single Line Title */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-[#001730] tracking-tight leading-tight whitespace-nowrap">
            Our Approach to Implementing <span className="text-[#ff5722]">DOJO 2.0</span>
          </h2>
          <div className="w-16 h-1 bg-[#ff5722] mx-auto mt-2.5 rounded-full" />
        </div>

        {/* 3x2 Two-Row Pipeline Architecture */}
        <div className="space-y-6 lg:space-y-8">
          
          {/* ================= STAGE 1 ================= */}
          <div>
            {/* Stage 1 Header Bar */}
            <div className="flex items-center gap-3 mb-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0052cc] text-xs font-bold tracking-wide uppercase shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#0052cc]" />
                <span>Stage 1: Strategy, Architecture &amp; Content Development</span>
              </div>
              <div className="flex-1 h-[1px] bg-slate-200/90 hidden sm:block" />
            </div>

            {/* Row 1 Grid (Steps 01, 02, 03) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
              {stage1Steps.map((s, idx) => {
                const DeliverableIcon = s.icon;
                return (
                  <div
                    key={s.num}
                    className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#0052cc]/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                  >
                    {/* Top Flow Bar */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-lg bg-[#001730] text-white font-mono font-bold text-xs flex items-center justify-center shadow-2xs group-hover:bg-[#ff5722] transition-colors">
                          {s.num}
                        </span>
                        <span className="text-[11px] font-black uppercase text-[#0052cc] tracking-wider">
                          Phase {s.stepNum}
                        </span>
                      </div>

                      {/* Directional arrow between cards on desktop */}
                      {idx < stage1Steps.length - 1 && (
                        <div className="hidden lg:flex items-center gap-1 text-slate-300 group-hover:text-[#0052cc] transition-colors">
                          <span className="text-[11px] font-semibold">Next</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    {/* Step Title: Uniform Baseline */}
                    <h3 className="text-base sm:text-[17px] font-bold text-[#001730] tracking-tight leading-snug mb-3.5 min-h-[46px] flex items-center">
                      {s.title}
                    </h3>

                    {/* Step Photo: 16:9 Widescreen Showcase */}
                    <div
                      onClick={() => onOpenImage?.(s.image)}
                      className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden border border-slate-200/90 bg-slate-100 shadow-2xs mb-4 cursor-pointer group-hover:border-slate-300 transition-all"
                    >
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Bullet Points: Generous Width for High Readability */}
                    <ul className="space-y-2 mb-4 flex-1">
                      {s.bullets.map((b, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722] shrink-0 mt-2" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Deliverable Box: Full Text Display, No Cut-Off, No Repeated Label */}
                    <div className="min-h-[52px] sm:min-h-[56px] bg-[#fff8f4] border border-[#ffe4d4] rounded-xl p-2.5 sm:p-3 flex items-center gap-3 mt-auto shadow-2xs hover:border-[#ff5722]/60 transition-colors">
                      <div className="w-7 h-7 rounded-lg bg-[#ff5722]/10 flex items-center justify-center text-[#ff5722] shrink-0">
                        <DeliverableIcon className="w-4 h-4" />
                      </div>
                      <p className="text-xs sm:text-[13px] font-bold text-[#001730] leading-snug flex-1">
                        {s.deliverable}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Transition Pipeline Between Stage 1 & Stage 2 */}
          <div className="flex items-center justify-center py-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold text-slate-700">
              <span className="font-bold text-[#0052cc]">Phases 01–03 Ready</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#ff5722] animate-bounce" />
              <span>Transitioning to Physical &amp; Digital Plant Deployment</span>
            </div>
          </div>

          {/* ================= STAGE 2 ================= */}
          <div>
            {/* Stage 2 Header Bar */}
            <div className="flex items-center gap-3 mb-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-[#ff5722] text-xs font-bold tracking-wide uppercase shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#ff5722]" />
                <span>Stage 2: On-Site Infrastructure, Pilot &amp; Continuous Improvement</span>
              </div>
              <div className="flex-1 h-[1px] bg-slate-200/90 hidden sm:block" />
            </div>

            {/* Row 2 Grid (Steps 04, 05, 06) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
              {stage2Steps.map((s, idx) => {
                const DeliverableIcon = s.icon;
                return (
                  <div
                    key={s.num}
                    className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#ff5722]/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                  >
                    {/* Top Flow Bar */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-lg bg-[#001730] text-white font-mono font-bold text-xs flex items-center justify-center shadow-2xs group-hover:bg-[#ff5722] transition-colors">
                          {s.num}
                        </span>
                        <span className="text-[11px] font-black uppercase text-[#ff5722] tracking-wider">
                          Phase {s.stepNum}
                        </span>
                      </div>

                      {/* Directional arrow between cards on desktop */}
                      {idx < stage2Steps.length - 1 && (
                        <div className="hidden lg:flex items-center gap-1 text-slate-300 group-hover:text-[#ff5722] transition-colors">
                          <span className="text-[11px] font-semibold">Next</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    {/* Step Title: Uniform Baseline */}
                    <h3 className="text-base sm:text-[17px] font-bold text-[#001730] tracking-tight leading-snug mb-3.5 min-h-[46px] flex items-center">
                      {s.title}
                    </h3>

                    {/* Step Photo: 16:9 Widescreen Showcase */}
                    <div
                      onClick={() => onOpenImage?.(s.image)}
                      className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden border border-slate-200/90 bg-slate-100 shadow-2xs mb-4 cursor-pointer group-hover:border-slate-300 transition-all"
                    >
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Bullet Points: Generous Width for High Readability */}
                    <ul className="space-y-2 mb-4 flex-1">
                      {s.bullets.map((b, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722] shrink-0 mt-2" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Deliverable Box: Full Text Display, No Cut-Off, No Repeated Label */}
                    <div className="min-h-[52px] sm:min-h-[56px] bg-[#fff8f4] border border-[#ffe4d4] rounded-xl p-2.5 sm:p-3 flex items-center gap-3 mt-auto shadow-2xs hover:border-[#ff5722]/60 transition-colors">
                      <div className="w-7 h-7 rounded-lg bg-[#ff5722]/10 flex items-center justify-center text-[#ff5722] shrink-0">
                        <DeliverableIcon className="w-4 h-4" />
                      </div>
                      <p className="text-xs sm:text-[13px] font-bold text-[#001730] leading-snug flex-1">
                        {s.deliverable}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Process Chevron Arrow Banner */}
          <div className="pt-4 flex justify-center">
            <div
              className="w-full max-w-2xl py-3 px-8 text-center text-xs sm:text-sm font-bold text-white tracking-wide shadow-sm bg-gradient-to-r from-blue-900/60 via-[#003b80] to-[#0059b3]"
              style={{
                clipPath:
                  "polygon(0% 0%, calc(100% - 16px) 0%, 100% 50%, calc(100% - 16px) 100%, 0% 100%)",
              }}
            >
              <span>From Planning to Continuous Improvement</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
