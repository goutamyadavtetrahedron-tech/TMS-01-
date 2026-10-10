'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <section
      className="relative w-full bg-white py-14 sm:py-18 lg:py-22 overflow-hidden"
      style={{ fontFamily: "var(--font-poppins, 'Poppins', sans-serif)" }}
    >
      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Column: Clean, High-Contrast Editorial Text */}
          <div className="lg:col-span-7 xl:col-span-7 text-left">
            
            {/* Elegant Eyebrow with Brand Accent Bar */}
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="w-6 h-[2.5px] bg-[#ff5e14] rounded-full" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.16em] text-[#ff5e14] uppercase">
                ABOUT US
              </span>
            </div>

            {/* Main Headline */}
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] font-bold text-[#0a1c4c] leading-[1.18] tracking-tight mb-5 sm:mb-6"
              style={{ fontFamily: "var(--font-poppins, 'Poppins', sans-serif)", fontWeight: 700 }}
            >
              Tetrahedron Manufacturing Services Pvt Ltd
            </h2>

            {/* Body Text: Increased Size & Comfortable Leading */}
            <div className="space-y-4 text-slate-700 text-base sm:text-lg lg:text-[18px] leading-relaxed mb-8">
              <p>
                Tetrahedron provides manufacturing optimization consulting services. It is one of India&apos;s fastest-growing end-to-end solution providers to <strong className="font-semibold text-slate-900">280+ manufacturing companies</strong> across <strong className="font-semibold text-slate-900">20 different industry segments</strong>. TMS supports its customers in improving profitability and sustainability through 3 distinct service verticals.
              </p>
              <p className="text-slate-600">
                Manufacturing Management Consulting, Automation &amp; Industry 4.0, and Training &amp; Skill Development — by designing, developing, and implementing focused solutions.
              </p>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 pt-2">
              <a
                href="#business-verticals"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-[#ff5e14] hover:bg-[#ff732e] shadow-lg shadow-orange-600/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Business Verticals</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/manufacturing-operational-excellence-consulting/"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-[#0a1c4c] bg-slate-100 hover:bg-slate-200 border border-slate-200/80 transition-all duration-200"
              >
                <span>Consulting Services</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Clean, Large, Prominent Showcase Photo */}
          <div className="lg:col-span-5 xl:col-span-5">
            <div className="relative w-full max-w-[580px] lg:max-w-none mx-auto">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl shadow-slate-900/10 border border-slate-200/80 bg-white group">
                <img
                  src="/assets/images/resources/about-two-img3.jpg"
                  alt="Tetrahedron Manufacturing Services Engineers"
                  className="w-full h-auto max-h-[500px] object-cover object-center transform transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
