"use client";

import React from "react";
import {
  renderBlogContentBlock,
  getOptimizedCloudinaryUrl,
  splitContentIntoBlocks,
} from "@/lib/richTextRenderer";
import { Sparkles, ArrowRight } from "lucide-react";

/**
 * Editorial Article Content Component
 * Formats chapters, section imagery, rich typography, and mid-read strategic CTAs
 * using pure Tailwind CSS styling.
 */
export default function BlogEditorialContent({
  sections = [],
  cta = null,
  blogTitle = "",
  onOpenConsultModal,
}) {
  if (!sections || !Array.isArray(sections) || sections.length === 0) {
    return null;
  }

  let headingCount = 0;
  const totalHeadings = sections.filter((s) => s.heading && s.heading.trim()).length;

  return (
    <div className="space-y-6">
      {/* 0. Executive Summary / Strategic Takeaways Box */}
      {totalHeadings >= 2 && (
        <div className="mb-8 rounded-2xl overflow-hidden border border-blue-200/80 bg-gradient-to-b from-blue-50/40 via-white to-slate-50/30 shadow-xs">
          <div className="bg-gradient-to-r from-[#001659] via-[#051f6d] to-[#0a2c5e] text-white px-5 py-3.5 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-white/10 text-[#FF7A3D]">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs sm:text-sm font-bold tracking-tight">
                Executive Summary & Key Takeaways
              </span>
            </div>
            <span className="text-[11px] font-semibold text-orange-200 bg-white/10 px-2.5 py-0.5 rounded-full">
              ⏱️ 1-Min Strategic Brief
            </span>
          </div>
          <div className="p-5 sm:p-6 space-y-3">
            <p className="text-xs sm:text-[13px] text-slate-600 font-medium">
              Core strategic takeaways, toolsets, and operational disciplines explored in this guide:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {sections
                .filter((s) => s.heading && s.heading.trim())
                .slice(0, 4)
                .map((s, i) => {
                  const secIndex = sections.indexOf(s);
                  return (
                    <a
                      key={i}
                      href={`#chapter-${secIndex}`}
                      className="p-3 rounded-xl bg-white border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/30 transition-all flex items-start gap-2.5 group shadow-2xs"
                    >
                      <span className="w-5 h-5 rounded-md bg-blue-100 text-[#001659] font-extrabold text-[11px] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#001659] group-hover:text-white transition-colors">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs sm:text-[13px] font-semibold text-slate-700 group-hover:text-[#001659] transition-colors line-clamp-2 leading-snug">
                        {s.heading}
                      </span>
                    </a>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {sections.map((section, idx) => {
        let ctaElement = null;
        const contentElements = [];

        // 1. Chapter Heading with Chapter Badge & Anchor
        if (section.heading) {
          headingCount++;
          contentElements.push(
            <div key={`h2-wrap-${idx}`} className="pt-8 pb-3 border-b border-slate-100 first:pt-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-orange-500/10 text-[#FF5E14] text-[11px] font-bold uppercase tracking-wider border border-orange-500/20">
                  Section {String(headingCount).padStart(2, "0")}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  • Part {headingCount} of {totalHeadings}
                </span>
              </div>
              <h2
                id={`chapter-${idx}`}
                className="text-xl sm:text-2xl lg:text-[25px] font-extrabold text-[#001659] scroll-mt-28 tracking-tight leading-snug"
              >
                {section.heading}
              </h2>
            </div>
          );
        }

        // 2. Section Image with Cloudinary Optimization & Responsive Frame
        if (section.image) {
          const secImgUrl = getOptimizedCloudinaryUrl(
            section.image?.url || (typeof section.image === "string" ? section.image : ""),
            { width: 900 }
          );
          if (secImgUrl) {
            contentElements.push(
              <div
                key={`sec-img-${idx}`}
                className="my-5 rounded-xl overflow-hidden border border-slate-200/80 shadow-xs"
              >
                <img
                  src={secImgUrl}
                  alt={section.heading || blogTitle}
                  className="w-full h-auto object-cover max-h-[420px]"
                  loading="lazy"
                />
              </div>
            );
          }
        }

        // 3. Section Paragraphs, Rich Lists, Markdown Tables, Callouts
        if (section.content) {
          const parsedBlocks = splitContentIntoBlocks(section.content);
          parsedBlocks.forEach((block, blockIdx) => {
            contentElements.push(
              <div
                key={`block-${idx}-${blockIdx}`}
                className="my-3"
              >
                {renderBlogContentBlock(block, `para-${idx}-${blockIdx}`)}
              </div>
            );
          });
        }

        // 4. In-article Mid-Read Strategic Consultation CTA (every 3 chapters)
        if (
          cta &&
          (cta.text || cta.buttonText) &&
          headingCount > 0 &&
          headingCount % 3 === 0 &&
          idx < sections.length - 1
        ) {
          ctaElement = (
            <div
              key={`mid-cta-${idx}`}
              className="blog-mid-cta-card relative overflow-hidden rounded-2xl p-6 sm:p-7 my-8 sm:my-10 border border-orange-200/90 bg-gradient-to-br from-[#FFFBF7] via-[#FFF6EE] to-[#FEEDDC] shadow-xs"
            >
              {/* Subtle brand color accent stripe on left */}
              <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#FF5E14]" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6 pl-2">
                <div className="text-left space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FF5E14]/10 text-[#FF5E14] border border-[#FF5E14]/20 uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF5E14] shrink-0" />
                    <span>Specialist Advisory</span>
                  </div>
                  {cta.text && (
                    <h3 className="text-lg sm:text-xl md:text-[21px] font-extrabold text-[#001659] leading-snug tracking-tight mb-1.5">
                      {cta.text}
                    </h3>
                  )}
                  <p className="text-sm text-slate-600 leading-relaxed max-w-xl font-normal">
                    Discuss tailored implementation strategies with our manufacturing engineering experts.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenConsultModal?.(cta.buttonText || "Consult Experts")}
                  className="blog-mid-cta-btn shrink-0 self-start sm:self-center"
                >
                  <span>{cta.buttonText || "Talk to Principal Advisors"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        }

        return (
          <React.Fragment key={`frag-${idx}`}>
            {contentElements}
            {ctaElement}
          </React.Fragment>
        );
      })}
    </div>
  );
}
