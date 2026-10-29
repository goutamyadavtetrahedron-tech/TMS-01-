"use client";

import React from "react";
import Image from "next/image";
import {
  Factory,
  ShieldCheck,
  CheckCircle2,
  Trophy,
  Video,
  ArrowRight,
} from "lucide-react";

export default function WhyChooseTetrahedron({ onOpenVideoModal }) {
  const capabilities = [
    {
      num: "01",
      title: "COMPLETE TURNKEY SOLUTION",
      image: "/images/dojo/why-tetrahedron-icons/card-01.png",
      desc: "End-to-end solution from concept, design, manufacturing, installation, training to continuous improvement.",
      color: "bg-blue-600 text-white",
    },
    {
      num: "02",
      title: "IN-HOUSE MANUFACTURING",
      image: "/images/dojo/why-tetrahedron-icons/card-02.png",
      desc: "State-of-the-art manufacturing facility ensuring high quality, on-time delivery and cost optimization.",
      color: "bg-emerald-700 text-white",
    },
    {
      num: "03",
      title: "CUSTOMIZED SIMULATORS",
      image: "/images/dojo/why-tetrahedron-icons/card-03.png",
      desc: "Industry & process specific simulators designed to match your real operations and training needs.",
      color: "bg-purple-700 text-white",
    },
    {
      num: "04",
      title: "AR / VR INTEGRATION",
      image: "/images/dojo/why-tetrahedron-icons/card-04.png",
      desc: "Immersive AR/VR based training for better understanding, higher retention and safe learning environment.",
      color: "bg-orange-600 text-white",
    },
    {
      num: "05",
      title: "INDUSTRY 4.0 EXPERTISE",
      image: "/images/dojo/why-tetrahedron-icons/card-05.png",
      desc: "Smart, connected and data-driven DOJO solutions aligned with Industry 4.0 and digital transformation.",
      color: "bg-blue-600 text-white",
    },
    {
      num: "06",
      title: "AUTOMATION EXPERTISE",
      image: "/images/dojo/why-tetrahedron-icons/card-06.png",
      desc: "Deep expertise in Robotics, AGV/AMR, Smart Automation and integration with DOJO training systems.",
      color: "bg-teal-600 text-white",
    },
    {
      num: "07",
      title: "EXPERIENCED CONSULTANTS",
      image: "/images/dojo/why-tetrahedron-icons/card-07.png",
      desc: "Team of industrial experts with rich experience in setting up high impact DOJO centers across industries.",
      color: "bg-emerald-600 text-white",
    },
    {
      num: "08",
      title: "PAN INDIA SUPPORT",
      image: "/images/dojo/why-tetrahedron-icons/card-08.png",
      desc: "Strong PAN India support network ensuring quick response, maintenance and continuous service excellence.",
      color: "bg-blue-700 text-white",
    },
    {
      num: "09",
      title: "APPLICATION & VIDEO BASED GAME",
      image: "/images/dojo/why-tetrahedron-icons/card-09.png",
      desc: "Application & video based interactive games to make learning engaging, effective and result oriented.",
      color: "bg-orange-600 text-white",
    },
    {
      num: "10",
      title: "ADVANCED DESIGN",
      image: "/images/dojo/why-tetrahedron-icons/card-10.png",
      desc: "Advanced 2D/3D design & simulation for realistic, safe and highly effective training experiences.",
      color: "bg-teal-600 text-white",
    },
    {
      num: "11",
      title: "MAN–MACHINE LINKED SIMULATOR",
      image: "/images/dojo/why-tetrahedron-icons/card-11.png",
      desc: "Man-machine linked simulators that replicate real operations for hands-on & immersive training.",
      color: "bg-blue-600 text-white",
    },
    {
      num: "12",
      title: "AUTOMATIC ASSESSMENT (NOT SUPERVISION DEPENDENT)",
      image: "/images/dojo/why-tetrahedron-icons/card-12.png",
      desc: "AI based automatic assessment ensures objective evaluation, accuracy and reduces human bias.",
      color: "bg-purple-700 text-white",
    },
    {
      num: "13",
      title: "DOJO 2.0 – COMPLETE INTEGRATION",
      image: "/images/dojo/why-tetrahedron-icons/card-13.png",
      desc: "DOJO 2.0 platform with complete integration of training, assessment, analytics, certification and continuous improvement.",
      color: "bg-emerald-700 text-white",
    },
  ];

  return (
    <section className="pt-10 sm:pt-12 pb-8 sm:pb-10 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: 2 Balanced Lines */}
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#001730] tracking-tight leading-tight">
            Why Choose Tetrahedron for <br />
            <span className="text-[#ff5722]">DOJO Design &amp; Implementation?</span>
          </h2>
        </div>

        {/* Executive Value Pillars: Showcasing the 2 Core Content Paragraphs */}
        <div className="max-w-5xl mx-auto mb-10 sm:mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card A: Turnkey Engineering */}
          <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-100/80 text-[#ff5722] flex items-center justify-center shrink-0">
                <Factory className="w-5 h-5 text-[#ff5722]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Turnkey Engineering
              </h3>
            </div>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Tetrahedron delivers <strong className="text-slate-900 font-semibold">end-to-end DOJO solutions</strong>, combining in-house manufacturing, customized simulators, AR/VR integration, Industry 4.0 technologies, and application-based learning to create practical, engaging training environments tailored to your plant&apos;s exact requirements.
            </p>
          </div>

          {/* Card B: Lean & OEM Compliance */}
          <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100/80 text-[#001730] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Lean &amp; OEM Compliance
              </h3>
            </div>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              With experienced consultants and expertise in lean manufacturing, automation, and digital learning, we help organizations enhance workforce competency, improve productivity, strengthen safety, and meet evolving OEM expectations through integrated DOJO and DOJO 2.0 solutions.
            </p>
          </div>
        </div>

        {/* Highlight Banner: DOJO 2.0 Live Dashboards & OEM Compliance */}
        <div className="mb-10 sm:mb-12 rounded-3xl bg-gradient-to-br from-[#001730] via-[#002244] to-[#001224] text-white p-6 sm:p-10 shadow-2xl border border-white/10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-5">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
                DOJO 2.0: Smarter Workforce Management &amp; Live Dashboards
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                DOJO 2.0 combines hands-on physical simulators with digital competency tracking and management review screens. Developed to meet strict OEM vendor compliance requirements, it equips plant leadership with real-time visibility into operator readiness.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs font-bold text-[#ff7a45] uppercase tracking-wider mb-1">
                    Screen 01
                  </div>
                  <div className="text-sm font-semibold text-white">
                    Advanced Manpower Planning
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-normal">
                    Real-time workforce availability, absenteeism trends, operator skill matrix, and competency gap analysis.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs font-bold text-[#ff7a45] uppercase tracking-wider mb-1">
                    Screen 02
                  </div>
                  <div className="text-sm font-semibold text-white">
                    Management Review Dashboard
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-normal">
                    Continuous monitoring of customer defects (-32%), internal rejections (-40%), training adherence (95%), and CAPA actions.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Approved for OEM Supplier Audits</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Digital Skill Matrix &amp; IATF 16949 Ready</span>
                </div>
              </div>
            </div>

            {/* Right Photo: The Live Dashboards with Engineers */}
            <div className="lg:col-span-6">
              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                <Image
                  src="/images/dojo/dojo-2-dashboards.jpeg"
                  alt="Maruti Suzuki Aligned DOJO 2.0 Dashboards: Advanced Manpower Planning & Management Review"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 13 Capabilities Grid (Exact 5, 5, 3 Layout from 2.Why-Tetrahedron.jpeg) */}
        <div className="mb-8">
          {/* Replaced Header Headline */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-slate-900 tracking-tight leading-snug">
              We Deliver More Than Training <br className="hidden sm:inline" />
              <span className="text-[#ff5722]">We Build Skilled, Safe &amp; Future—Ready Workforce</span>
            </h3>
          </div>

          {/* Responsive 5-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {capabilities.map((c) => (
              <div
                key={c.num}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-4.5 border border-slate-200/90 shadow-xs hover:border-[#ff5722]/50 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Centered Top Header: Cohesive Navy Badge + Centered Title */}
                  <div className="flex flex-col items-center text-center gap-1.5 mb-2">
                    <span className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#001730] text-white group-hover:bg-[#ff5722] transition-colors flex items-center justify-center text-[11px] sm:text-xs font-bold font-mono shrink-0 shadow-2xs">
                      {c.num}
                    </span>
                    <h4 className="text-xs sm:text-[12.5px] font-bold text-slate-900 leading-snug uppercase tracking-tight text-center min-h-[32px] flex items-center justify-center">
                      {c.title}
                    </h4>
                  </div>

                  {/* Centered Clean Graphic with Compact Vertical Padding */}
                  <div className="relative h-13 sm:h-14 w-full my-1.5 flex items-center justify-center">
                    <Image
                      src={c.image}
                      alt={c.title}
                      width={200}
                      height={64}
                      className="max-h-13 sm:max-h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Centered Description with Compact Margins */}
                  <p className="text-[11.5px] sm:text-xs text-slate-600 leading-relaxed text-center mt-2">
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* Card 14 & 15 Combined: The Tetrahedron Advantage Box (Clean Executive Navy Contrast Card) */}
            <div className="bg-gradient-to-br from-[#001730] via-[#002244] to-[#001428] rounded-xl sm:rounded-2xl p-5 border border-white/15 shadow-xl flex flex-col justify-between col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-2 relative overflow-hidden group">
              {/* Header with Clean Title (No Pill Badge) */}
              <div className="flex items-center gap-2 pb-3.5 border-b border-white/10 relative z-10">
                <Trophy className="w-4 h-4 text-[#ff5722] shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  The Tetrahedron Advantage
                </span>
              </div>

              {/* Body Content - Evenly Spaced with Generous Margins & No Dead Space */}
              <div className="flex-1 flex flex-col justify-evenly py-2 relative z-10">
                {/* Clean Headline with Clear Bottom Padding & Margin */}
                <h4 className="text-[15px] sm:text-base font-bold text-white tracking-tight leading-snug pb-2.5">
                  Future-Ready Workforce for Future-Ready Industries
                </h4>

                {/* 3 Outcome Rows with Balanced Spacing & Uniform Icons */}
                <div className="space-y-3 sm:space-y-3.5 pt-1">
                  <div className="flex items-start gap-3 text-xs sm:text-[13.5px]">
                    <CheckCircle2 className="w-4 h-4 text-[#ff5722] shrink-0 mt-0.5" />
                    <span className="text-slate-200 leading-relaxed">
                      <strong className="text-white font-semibold">Higher Skills:</strong> Practical &amp; interactive simulation rigs
                    </span>
                  </div>

                  <div className="flex items-start gap-3 text-xs sm:text-[13.5px]">
                    <CheckCircle2 className="w-4 h-4 text-[#ff5722] shrink-0 mt-0.5" />
                    <span className="text-slate-200 leading-relaxed">
                      <strong className="text-white font-semibold">Better Productivity:</strong> Measurable &amp; sustainable throughput
                    </span>
                  </div>

                  <div className="flex items-start gap-3 text-xs sm:text-[13.5px]">
                    <CheckCircle2 className="w-4 h-4 text-[#ff5722] shrink-0 mt-0.5" />
                    <span className="text-slate-200 leading-relaxed">
                      <strong className="text-white font-semibold">Zero Compromise on Safety:</strong> Instant hazard reflex calibration
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Footer with Tagline and Balanced Consult Expert Button */}
              <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-3 relative z-10">
                <span className="text-xs text-slate-400 font-medium tracking-tight">
                  Built for Today. Ready for Tomorrow.
                </span>
                <a
                  href="https://cal.com/tetrahedron/dojo"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onOpenVideoModal?.();
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#ff5722] hover:bg-[#f4511e] active:scale-[0.98] text-white text-xs font-semibold transition-all cursor-pointer shadow-xs shrink-0"
                >
                  <span>Consult Expert</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Transformation Banner from 2.Why-Tetrahedron.jpeg (Centered & Hugging Text) */}
          <div className="mt-6 flex justify-center">
            <div className="rounded-full bg-[#001730] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-center text-xs sm:text-sm font-semibold tracking-wide shadow-sm border border-slate-800">
              WE DON&apos;T JUST TRAIN PEOPLE, WE <span className="text-yellow-400 font-bold">TRANSFORM</span> THEM INTO HIGH-PERFORMING PROFESSIONALS.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
