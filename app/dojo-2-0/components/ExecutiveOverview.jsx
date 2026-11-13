"use client";

import React from "react";
import {
  Cpu,
  BarChart3,
  TrendingUp,
  Brain,
  MonitorCheck,
} from "lucide-react";

export default function ExecutiveOverview() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading: Strictly 1 Line */}
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#001730] tracking-tight leading-tight whitespace-nowrap">
            Industrial Training:{" "}
            <span className="text-[#ff5722]">From Physical to Phygital</span>
          </h2>
          <div className="w-16 h-1 bg-[#ff5722] mx-auto mt-2.5 rounded-full" />
        </div>

        {/* Narrative Written in Clean, High-Readability Editorial Card */}
        <div className="w-full mb-8 sm:mb-10">
          <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-9 border border-slate-200/90 shadow-2xs border-l-4 border-l-[#ff5722]">
            <div className="space-y-3.5 sm:space-y-4 text-slate-700 text-sm sm:text-base lg:text-[16px] leading-relaxed font-normal">
              <p>
                While traditional DOJO centres focus on hands-on practice, standardized work, and lean manufacturing principles, <strong className="text-slate-900 font-semibold">DOJO 2.0</strong> takes workforce development to the next level by integrating AR/VR, IoT connectivity, digital skill matrices, and learning analytics to create a smart, technology-driven training ecosystem.
              </p>
              <p>
                It develops problem-solving capabilities, digital proficiency, and process competency for modern manufacturing environments. Through competency tracking, structured training records, and management dashboards, DOJO 2.0 helps identify skill gaps, standardize training across shifts, monitor performance, and strengthen readiness for applicable OEM requirements, supplier assessments, and customer audits.
              </p>
            </div>
          </div>
        </div>

        {/* Horizontal Cards (One by One) Spanning Full Container Width */}
        <div className="space-y-4 sm:space-y-5 w-full mb-8 sm:mb-10">
          {/* Card 1: Manpower & Process DOJO */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 lg:p-8 border border-slate-200/90 shadow-2xs hover:border-blue-400 hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col md:flex-row md:items-center gap-5 sm:gap-6 group">
            <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#0052cc] hidden md:block" />
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0052cc] md:hidden" />
            
            {/* Left Title Column with Gradient Icon */}
            <div className="flex items-center gap-3.5 md:w-64 md:shrink-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-[#0052cc] flex items-center justify-center text-white shadow-sm shadow-blue-500/20 shrink-0 group-hover:scale-105 transition-transform">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug">
                Manpower &amp; Process DOJO
              </h3>
            </div>

            {/* Right Detailed Description */}
            <p className="text-sm sm:text-[14.5px] lg:text-[15px] text-slate-600 leading-relaxed font-normal flex-1">
              DOJO 2.0 takes traditional training to the next level by integrating{" "}
              <strong className="text-slate-900 font-semibold">
                Advanced Manpower Planning
              </strong>{" "}
              and{" "}
              <strong className="text-slate-900 font-semibold">
                Process-Specific DOJO Training
              </strong>{" "}
              to identify skill gaps, maintain digital skill matrices, and deliver hands-on training for critical manufacturing processes, quality, safety, and standardized work practices.
            </p>
          </div>

          {/* Card 2: AR/VR & Live Dashboards */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 lg:p-8 border border-slate-200/90 shadow-2xs hover:border-orange-400 hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col md:flex-row md:items-center gap-5 sm:gap-6 group">
            <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#ff5722] hidden md:block" />
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#ff5722] md:hidden" />

            {/* Left Title Column with Gradient Icon */}
            <div className="flex items-center gap-3.5 md:w-64 md:shrink-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff5722] to-[#ff7a45] flex items-center justify-center text-white shadow-sm shadow-orange-500/20 shrink-0 group-hover:scale-105 transition-transform">
                <MonitorCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug">
                AR/VR &amp; Live Dashboards
              </h3>
            </div>

            {/* Right Detailed Description */}
            <p className="text-sm sm:text-[14.5px] lg:text-[15px] text-slate-600 leading-relaxed font-normal flex-1">
              Through{" "}
              <strong className="text-slate-900 font-semibold">
                Digital Tools &amp; AR/VR Applications
              </strong>{" "}
              and{" "}
              <strong className="text-slate-900 font-semibold">
                Management Review Dashboards
              </strong>
              , DOJO 2.0 enables interactive learning, digital competency assessments, real-time performance tracking, and structured training records to strengthen readiness for applicable OEM training, supplier qualification, and customer audit compliance.
            </p>
          </div>
        </div>

        {/* 3 Core Highlight Cards Spanning Full Container Width */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 w-full">
          {/* Item 1 */}
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-xs transition-all flex items-center justify-between gap-3 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 text-[#0052cc] flex items-center justify-center shrink-0 group-hover:bg-[#0052cc] group-hover:text-white transition-colors">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight leading-tight">
                Process-Specific Competency
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
          </div>

          {/* Item 2 */}
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs hover:border-orange-300 hover:shadow-xs transition-all flex items-center justify-between gap-3 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-100 text-[#ff5722] flex items-center justify-center shrink-0 group-hover:bg-[#ff5722] group-hover:text-white transition-colors">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight leading-tight">
                Real-Time Data Visibility
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#ff5722] shrink-0" />
          </div>

          {/* Item 3 */}
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs hover:border-emerald-300 hover:shadow-xs transition-all flex items-center justify-between gap-3 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight leading-tight">
                Continuous Improvement
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          </div>
        </div>

      </div>
    </section>
  );
}
