"use client";

import React from "react";
import { CheckCircle2, XCircle, ShieldCheck, Layers } from "lucide-react";

export default function DojoDefinition({ onOpenVideoModal }) {
  return (
    <section className="pt-10 sm:pt-12 pb-8 sm:pb-10 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Pure, Clean 2 Balanced Lines (No Floating Eyebrow Pill) */}
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#001730] tracking-tight leading-tight">
            DOJO Training Center <br />
            <span className="text-[#ff5722]">Empowering Manufacturing Excellence</span>
          </h2>
        </div>

        {/* The 2 Definition Content Cards: Pure, Readable Editorial Craft */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto mb-10 sm:mb-12">
          {/* Card 1: Hands-On Controlled Skilling */}
          <div className="bg-white rounded-2xl p-7 sm:p-9 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-start hover:border-slate-300 hover:shadow-md transition-all">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-slate-600 to-slate-800" />

            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#001730] shrink-0">
                <Layers className="w-6 h-6 text-[#001730]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Hands-On Controlled Skilling
              </h3>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              A <strong className="text-slate-900 font-semibold">DOJO</strong> is a dedicated, hands-on training environment where employees develop, practice, and validate their manufacturing skills in a controlled setting before applying them on the shop floor. Inspired by Japanese learning principles, it bridges the gap between theoretical knowledge and practical application through process-specific training modules, standardized work practices, and competency-based assessments.
            </p>
          </div>

          {/* Card 2: Supplier Readiness & SPQDM */}
          <div className="bg-white rounded-2xl p-7 sm:p-9 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-start hover:border-[#ff5722]/40 hover:shadow-md transition-all">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ff5722] to-[#ff7a45]" />

            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#ff5722] shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#ff5722]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Supplier Readiness &amp; SPQDM
              </h3>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Tetrahedron designs customized DOJO solutions to help manufacturers improve workforce competency, product quality, safety, and productivity. As leading OEMs increasingly emphasize structured employee training and skill validation in supplier assessments, a well-designed DOJO helps organizations strengthen supplier readiness, prepare for customer audits, and meet applicable OEM training and compliance requirements.
            </p>
          </div>
        </div>

        {/* Clean Side-by-Side: Traditional Classroom vs. The Dojo Standard */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-[#001730] mt-1">
              Why Traditional Training Fails vs. How Dojo Builds Reflexes
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Card 1: Traditional Classroom */}
            <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden transition-all hover:shadow-md">
              <div className="absolute top-0 left-0 right-0 h-1 bg-slate-300" />
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-5">
                  Classroom Lectures &amp; SOP Manuals
                </h3>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                      <XCircle className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-600">
                      <strong className="text-slate-800 font-semibold">Over 70% skill loss</strong> within 48 hours without hands-on tactile repetition.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                      <XCircle className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-600">
                      <strong className="text-slate-800 font-semibold">Trial-and-error on active lines</strong>, leading to expensive part scrap, customer escapes, and line stops.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                      <XCircle className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-600">
                      <strong className="text-slate-800 font-semibold">High safety hazard risk</strong> when uncalibrated operators touch rotating machines and live presses.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-rose-600">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>Slow ramp-up &amp; unpredictable shopfloor defects</span>
              </div>
            </div>

            {/* Card 2: The Dojo Standard */}
            <div className="rounded-2xl bg-white border-2 border-[#ff5722]/30 p-6 sm:p-8 flex flex-col justify-between shadow-md relative overflow-hidden transition-all hover:border-[#ff5722] hover:shadow-lg">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ff5722] to-[#ff7a45]" />
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-5">
                  Hands-On Tactile Simulation Academy
                </h3>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700">
                      <strong className="text-slate-900 font-semibold">Subconscious muscle memory</strong> calibrated via real torque wrenches, wiring jigs, and defect limit samples.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700">
                      <strong className="text-slate-900 font-semibold">Zero-scrap offline practice</strong> using reusable jigs and mistake-proofing (Poka-Yoke) sensors.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700">
                      <strong className="text-slate-900 font-semibold">Certified zero-error operators</strong> ready for takt speed from Day 1 on active commercial lines.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-orange-100 flex items-center gap-2 text-xs font-bold text-[#ff5722]">
                <span className="w-2 h-2 rounded-full bg-[#ff5722]" />
                <span>80% faster onboarding &amp; zero training scrap</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
