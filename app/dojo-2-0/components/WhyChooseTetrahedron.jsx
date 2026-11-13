"use client";

import React from "react";
import Image from "next/image";
import {
  Factory,
  ShieldCheck,
  CheckCircle2,
  Trophy,
  ArrowRight,
  Cpu,
  MonitorCheck,
  LineChart,
} from "lucide-react";

export default function WhyChooseTetrahedron({ onOpenVideoModal }) {
  const capabilities = [
    {
      num: "01",
      title: "COMPLETE TURNKEY SOLUTION",
      image: "/images/dojo/why-tetrahedron-icons/card-01.png",
      desc: "End-to-end solution from concept, design, manufacturing, installation, training to continuous improvement.",
    },
    {
      num: "02",
      title: "IN-HOUSE MANUFACTURING",
      image: "/images/dojo/why-tetrahedron-icons/card-02.png",
      desc: "State-of-the-art manufacturing facility ensuring high quality, on-time delivery and cost optimization.",
    },
    {
      num: "03",
      title: "CUSTOMIZED SIMULATORS",
      image: "/images/dojo/why-tetrahedron-icons/card-03.png",
      desc: "Industry & process specific simulators designed to match your real operations and training needs.",
    },
    {
      num: "04",
      title: "AR / VR INTEGRATION",
      image: "/images/dojo/why-tetrahedron-icons/card-04.png",
      desc: "Immersive AR/VR based training for better understanding, higher retention and safe learning environment.",
    },
    {
      num: "05",
      title: "INDUSTRY 4.0 EXPERTISE",
      image: "/images/dojo/why-tetrahedron-icons/card-05.png",
      desc: "Smart, connected and data-driven DOJO solutions aligned with Industry 4.0 and digital transformation.",
    },
    {
      num: "06",
      title: "AUTOMATION EXPERTISE",
      image: "/images/dojo/why-tetrahedron-icons/card-06.png",
      desc: "Deep expertise in Robotics, AGV/AMR, Smart Automation and integration with DOJO training systems.",
    },
    {
      num: "07",
      title: "EXPERIENCED CONSULTANTS",
      image: "/images/dojo/why-tetrahedron-icons/card-07.png",
      desc: "Team of industrial experts with rich experience in setting up high impact DOJO centers across industries.",
    },
    {
      num: "08",
      title: "PAN INDIA SUPPORT",
      image: "/images/dojo/why-tetrahedron-icons/card-08.png",
      desc: "Strong PAN India support network ensuring quick response, maintenance and continuous service excellence.",
    },
    {
      num: "09",
      title: "APPLICATION & VIDEO BASED GAME",
      image: "/images/dojo/why-tetrahedron-icons/card-09.png",
      desc: "Application & video based interactive games to make learning engaging, effective and result oriented.",
    },
    {
      num: "10",
      title: "ADVANCED DESIGN",
      image: "/images/dojo/why-tetrahedron-icons/card-10.png",
      desc: "Modern, ergonomic and modular designs focused on safety, efficiency and high trainee engagement.",
    },
    {
      num: "11",
      title: "SAFETY & STANDARDS COMPLIANCE",
      image: "/images/dojo/why-tetrahedron-icons/card-11.png",
      desc: "Designed in compliance with national and international safety, quality and industrial training standards.",
    },
    {
      num: "12",
      title: "TRAIN THE TRAINER (TTT)",
      image: "/images/dojo/why-tetrahedron-icons/card-12.png",
      desc: "Comprehensive TTT programs to empower internal trainers for sustainable and long-term impact.",
    },
    {
      num: "13",
      title: "CONTINUOUS SUPPORT & UPGRADES",
      image: "/images/dojo/why-tetrahedron-icons/card-13.png",
      desc: "Ongoing support, content upgrades, maintenance and continuous improvement for sustained results.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Crisp 2-Line Headline */}
        <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#001730] tracking-tight leading-tight">
            Why Choose Tetrahedron for <br />
            <span className="text-[#ff5722]">DOJO 2.0 Design &amp; Implementation?</span>
          </h2>
          <div className="w-20 h-1 bg-[#ff5722] mx-auto mt-3.5 rounded-full" />
        </div>

        {/* Executive Value Briefing: 2 Strategic Pillars Spanning Full Container Width */}
        <div className="w-full mb-12 sm:mb-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card A: 10+ Years of DOJO Excellence & Advanced Learning */}
          <div className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-start">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-11 h-11 rounded-xl bg-orange-100/80 text-[#ff5722] flex items-center justify-center shrink-0">
                <Factory className="w-5 h-5 text-[#ff5722]" />
              </div>
              <h3 className="text-xl font-bold text-[#001730] tracking-tight">
                10+ Years of DOJO Excellence
              </h3>
            </div>
            <p className="text-sm sm:text-[15.5px] text-slate-600 leading-relaxed font-normal">
              Tetrahedron brings extensive hands-on experience in DOJO design and turnkey implementation, helping manufacturers build practical, process-specific training environments. Over the past 10 years, we have pioneered advanced learning solutions across India, including AR/VR applications, digital training tools, and management dashboards.
            </p>
          </div>

          {/* Card B: Unified DOJO 2.0 Ecosystem & OEM Audit Readiness */}
          <div className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-start">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-11 h-11 rounded-xl bg-blue-100/80 text-[#001730] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-[#001730] tracking-tight">
                OEM Audit &amp; Compliance Readiness
              </h3>
            </div>
            <p className="text-sm sm:text-[15.5px] text-slate-600 leading-relaxed font-normal">
              Our DOJO 2.0 approach integrates <strong className="text-slate-900 font-semibold">Advanced Manpower Planning, Process-Specific Training, Digital Tools &amp; AR/VR, and Management Dashboards</strong> into a unified ecosystem. These capabilities help organizations close skill gaps, maintain digital skill matrices, and strengthen readiness for OEM supplier assessments and audits.
            </p>
          </div>
        </div>

        {/* Spotlight Showcase: DOJO 2.0 Live Dashboards & Connected Shopfloor Intelligence */}
        <div className="mb-14 sm:mb-16 rounded-3xl bg-gradient-to-br from-[#001730] via-[#002244] to-[#001428] text-white p-7 sm:p-9 lg:p-11 border border-slate-700/80 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff5722]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-orange-400 text-xs font-bold uppercase tracking-wider border border-white/10 backdrop-blur-sm">
                <Cpu className="w-3.5 h-3.5 text-[#ff5722]" />
                <span>Connected Shopfloor Intelligence</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-white tracking-tight leading-tight">
                Live Dashboards &amp; Workforce Competency Analytics
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                DOJO 2.0 integrates physical training with real-time digital dashboards displayed directly inside your center. From Advanced Manpower Planning to Management Review, track skill levels, cycle-time adherence, and defect reduction in one unified view.
              </p>

              {/* 2 Interactive Screen Preview Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="rounded-2xl p-4 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-black text-[#ff5722] tracking-wider uppercase">
                      Screen 01
                    </span>
                    <LineChart className="w-3.5 h-3.5 text-orange-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white tracking-tight">
                    Advanced Manpower Planning
                  </h4>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed font-normal">
                    Real-time workforce availability, skill level distribution, absenteeism hedging, and critical station qualification.
                  </p>
                </div>

                <div className="rounded-2xl p-4 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-black text-[#ff5722] tracking-wider uppercase">
                      Screen 02
                    </span>
                    <MonitorCheck className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white tracking-tight">
                    Management Review Dashboard
                  </h4>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed font-normal">
                    Continuous monitoring of customer defects, internal rejections, training plan adherence, and CAPA action tracking.
                  </p>
                </div>
              </div>

              {/* Compliance & Audit Proof Badges */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Approved for OEM Supplier Audits</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-sky-300 bg-sky-500/10 border border-sky-500/20 px-3 py-1.5 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-sky-400" />
                  <span>Digital Skill Matrix &amp; IATF 16949 Ready</span>
                </div>
              </div>
            </div>

            {/* Right Photo: The Live Dashboards with Engineers */}
            <div className="lg:col-span-6">
              <div className="relative h-80 sm:h-[400px] lg:h-[440px] w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl group">
                <Image
                  src="/images/dojo/dojo-2-dashboards.jpeg"
                  alt="DOJO 2.0 Dashboards: Advanced Manpower Planning & Management Review"
                  fill
                  sizes="(max-width: 1024px) 100vw, 650px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 13 Capabilities Grid + Capstone Card */}
        <div className="mb-6">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-slate-900 tracking-tight leading-snug">
              We Deliver More Than Training <br className="hidden sm:inline" />
              <span className="text-[#ff5722]">We Build Skilled, Safe &amp; Future—Ready Workforce</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {capabilities.map((c) => (
              <div
                key={c.num}
                className="bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-200/90 shadow-2xs hover:border-[#ff5722]/50 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex flex-col items-center text-center gap-1.5 mb-2">
                    <span className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#001730] text-white group-hover:bg-[#ff5722] transition-colors flex items-center justify-center text-[11px] sm:text-xs font-bold font-mono shrink-0 shadow-2xs">
                      {c.num}
                    </span>
                    <h4 className="text-xs sm:text-[12.5px] font-bold text-slate-900 leading-snug uppercase tracking-tight text-center min-h-[32px] flex items-center justify-center">
                      {c.title}
                    </h4>
                  </div>

                  <div className="relative h-13 sm:h-14 w-full my-1.5 flex items-center justify-center">
                    <Image
                      src={c.image}
                      alt={c.title}
                      width={200}
                      height={64}
                      className="max-h-13 sm:max-h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <p className="text-[11.5px] sm:text-xs text-slate-600 leading-relaxed text-center mt-2">
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* Capstone Card: The Tetrahedron Advantage Box */}
            <div className="bg-gradient-to-br from-[#001730] via-[#002244] to-[#001428] rounded-2xl p-5 sm:p-6 border border-white/15 shadow-xl flex flex-col justify-between col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-2 relative overflow-hidden group">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10 relative z-10">
                <Trophy className="w-4 h-4 text-[#ff5722] shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  The Tetrahedron Advantage
                </span>
              </div>

              <div className="flex-1 flex flex-col justify-evenly py-3 relative z-10">
                <h4 className="text-[15px] sm:text-base font-bold text-white tracking-tight leading-snug pb-2">
                  Future-Ready Workforce for Future-Ready Industries
                </h4>

                <div className="space-y-3 pt-1">
                  <div className="flex items-start gap-2.5 text-xs sm:text-[13px]">
                    <CheckCircle2 className="w-4 h-4 text-[#ff5722] shrink-0 mt-0.5" />
                    <span className="text-slate-200 leading-relaxed">
                      <strong className="text-white font-semibold">Higher Skills:</strong> Practical &amp; interactive simulation rigs
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs sm:text-[13px]">
                    <CheckCircle2 className="w-4 h-4 text-[#ff5722] shrink-0 mt-0.5" />
                    <span className="text-slate-200 leading-relaxed">
                      <strong className="text-white font-semibold">Better Productivity:</strong> Measurable &amp; sustainable throughput
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs sm:text-[13px]">
                    <CheckCircle2 className="w-4 h-4 text-[#ff5722] shrink-0 mt-0.5" />
                    <span className="text-slate-200 leading-relaxed">
                      <strong className="text-white font-semibold">Zero Compromise on Safety:</strong> Instant hazard reflex calibration
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-3 relative z-10">
                <span className="text-xs text-slate-400 font-medium tracking-tight">
                  Built for Today. Ready for Tomorrow.
                </span>
                <button
                  type="button"
                  onClick={onOpenVideoModal}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#ff5722] hover:bg-[#f4511e] active:scale-[0.98] text-white text-xs font-semibold transition-all cursor-pointer shadow-xs shrink-0"
                >
                  <span>Consult Expert</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Transformation Banner */}
          <div className="mt-8 flex justify-center">
            <div className="rounded-full bg-[#001730] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-center text-xs sm:text-sm font-semibold tracking-wide shadow-sm border border-slate-800">
              WE DON&apos;T JUST TRAIN PEOPLE, WE <span className="text-yellow-400 font-bold">TRANSFORM</span> THEM INTO HIGH-PERFORMING PROFESSIONALS.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
