"use client";

import React from "react";
import { Video, PhoneCall, ShieldCheck, Mail, Download } from "lucide-react";

export default function BottomCTA({ onOpenVideoModal, onOpenBrochureModal }) {
  return (
    <section className="relative overflow-hidden py-16 bg-[#001b3a] text-white border-t border-white/10">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-orange-300 text-xs font-semibold tracking-wider border border-white/15">
          8-Week Implementation &amp; Launch
        </span>

        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
          Ready to Build a Zero-Defect Dojo Academy in 8 Weeks?
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
          Book a 1-on-1 virtual meeting with our Principal Dojo Architects to review your plant&apos;s assembly bottlenecks, custom CAD floor plans, and measurable ROI.
        </p>

        {/* Refined, Well-Proportioned Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href="https://calendly.com/kartikey-tetrahedron/new-meeting"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#ff5722] to-[#ff6f00] hover:from-[#f4511e] hover:to-[#ff5722] active:scale-[0.98] text-white font-semibold text-sm shadow-lg shadow-orange-950/40 hover:shadow-orange-900/60 hover:-translate-y-0.5 transition-all cursor-pointer border border-orange-400/30"
          >
            <Video className="w-4 h-4 text-white" />
            <span>Book a Virtual Meeting</span>
          </a>

          <button
            type="button"
            onClick={onOpenBrochureModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white text-[#001730] hover:bg-orange-50 active:scale-[0.98] font-semibold text-sm shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer border border-white/90"
          >
            <Download className="w-4 h-4 text-[#ff5722]" />
            <span>Download Brochure</span>
          </button>

          <a
            href="tel:+917506927976"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/20 hover:border-white/40 hover:-translate-y-0.5 transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
            <span>+91 75069 27976</span>
          </a>
        </div>

        {/* Trust Points */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Guaranteed ROI in 3 to 6 months
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            Calendar invitation sent instantly
          </span>
        </div>
      </div>
    </section>
  );
}
