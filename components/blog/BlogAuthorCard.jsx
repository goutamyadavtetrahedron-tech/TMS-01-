"use client";

import { ShieldCheck, ArrowRight, Building2, CheckCircle2 } from "lucide-react";

export default function BlogAuthorCard({ author, onOpenConsultModal }) {
  const authorName = author?.name || "Tetrahedron Manufacturing Advisory";
  const authorRole =
    author?.role || "Operational Excellence & Smart Factory Practice";
  const authorBio =
    author?.bio ||
    "Advising 300+ industrial plants across automotive, aerospace & discrete manufacturing on lean diagnostics and automation.";

  return (
    <div className="mt-10 pt-8 border-t border-slate-100">
      <div className="blog-author-card relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50/50 to-blue-50/20 border border-slate-200/90 p-5 sm:p-6 lg:p-7 shadow-xs hover:shadow-sm transition-all duration-300">
        {/* Subtle brand color accent line on top */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#001659] via-[#FF5E14] to-[#001659]" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          {/* Author Details Column */}
          <div className="flex items-start gap-3.5 sm:gap-4.5 min-w-0 flex-1">
            {/* Polished Monogram Avatar with verified shield disc */}
            <div className="relative shrink-0 mt-0.5">
              <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-br from-[#001659] via-[#092570] to-[#FF5E14] text-white flex items-center justify-center font-extrabold text-lg sm:text-xl shadow-md border border-white/20">
                T
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full bg-white flex items-center justify-center shadow-xs border border-slate-100"
                title="Verified Industry Advisory"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5E14]" />
              </div>
            </div>

            {/* Text and Badges */}
            <div className="min-w-0 flex-1 space-y-2">
              <div>
                <h4 className="blog-author-title">
                  {authorName}
                </h4>
                <div className="pt-1 pb-0.5">
                  <span className="blog-author-role-badge">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FF5E14] shrink-0" />
                    <span>{authorRole}</span>
                  </span>
                </div>
              </div>

              <p className="blog-author-bio max-w-2xl">
                {authorBio}
              </p>

              {/* Trust Indicators Chips */}
              <div className="pt-1 flex flex-wrap items-center gap-2">
                <span className="blog-author-stat-chip">
                  <Building2 className="w-3.5 h-3.5 text-[#FF5E14] shrink-0" />
                  <span>300+ Industrial Plants Advised</span>
                </span>
                <span className="blog-author-stat-chip">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14] shrink-0" />
                  <span>Automotive & Aerospace</span>
                </span>
                <span className="blog-author-stat-chip">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>Lean Diagnostics & Industry 4.0</span>
                </span>
              </div>
            </div>
          </div>

          {/* CTA Action Column with context to balance right side */}
          {onOpenConsultModal && (
            <div className="blog-author-cta-box shrink-0 self-start md:self-center flex flex-col items-start md:items-end justify-center gap-1.5 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF5E14]">
                Direct Advisory Access
              </span>
              <button
                type="button"
                onClick={() => onOpenConsultModal("Author Advisory Inquiry")}
                className="blog-author-cta-btn"
              >
                <span>Consult Team</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <span className="text-[11px] text-slate-400 font-medium">
                Free 30-min strategy session
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
