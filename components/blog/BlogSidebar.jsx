"use client";

import { useState } from "react";
import Link from "next/link";
import { Share2, Check, Copy, ArrowRight, Sparkles, MessageSquare } from "lucide-react";
import TableOfContents from "./TableOfContents";
import { getOptimizedCloudinaryUrl } from "@/lib/richTextRenderer";

// Social Share Icons
function LinkedInIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function TwitterIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

export default function BlogSidebar({
  tocSections = [],
  recentBlogs = [],
  currentUrl = "",
  title = "",
  onOpenConsultModal,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const encodedUrl = encodeURIComponent(currentUrl || (typeof window !== "undefined" ? window.location.href : ""));
  const encodedTitle = encodeURIComponent(title);

  return (
    <aside className="w-full lg:w-[340px] 2xl:w-[360px] shrink-0 sticky top-24 self-start flex flex-col gap-4 sm:gap-4.5 z-10">
      {/* 1. Table of Contents (if multi-section article) */}
      {tocSections.length >= 2 && <TableOfContents sections={tocSections} />}

      {/* 2. Compact Social Share Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-xs">
        <div className="flex items-center gap-1.5 pb-2 mb-2.5 border-b border-slate-100">
          <Share2 className="w-3.5 h-3.5 text-[#FF5E14]" />
          <span className="text-[11px] font-bold tracking-wider uppercase text-slate-600">
            Share Insight
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
            className="flex items-center justify-center h-9 rounded-lg bg-slate-50 hover:bg-[#0077b5] text-slate-600 hover:text-white transition-all shadow-2xs"
          >
            <LinkedInIcon className="w-3.5 h-3.5" />
          </a>

          {/* Twitter / X */}
          <a
            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Twitter"
            className="flex items-center justify-center h-9 rounded-lg bg-slate-50 hover:bg-black text-slate-600 hover:text-white transition-all shadow-2xs"
          >
            <TwitterIcon className="w-3 h-3" />
          </a>

          {/* WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on WhatsApp"
            className="flex items-center justify-center h-9 rounded-lg bg-slate-50 hover:bg-[#25D366] text-slate-600 hover:text-white transition-all shadow-2xs"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
          </a>

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            aria-label="Copy link"
            className={`flex items-center justify-center h-9 rounded-lg transition-all shadow-2xs cursor-pointer ${
              copied
                ? "bg-emerald-600 text-white"
                : "bg-slate-50 hover:bg-slate-200 text-slate-600 hover:text-slate-900"
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
        {copied && (
          <p className="text-[10.5px] text-emerald-600 font-semibold text-center mt-1.5">
            Link copied!
          </p>
        )}
      </div>

      {/* 3. Sleek Expert Consultation Card */}
      <div className="bg-gradient-to-br from-[#0B1A30] via-[#091e42] to-[#041440] text-white rounded-2xl p-4 sm:p-5 shadow-sm relative overflow-hidden border border-white/10">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF5E14]/15 rounded-full blur-xl pointer-events-none" />
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#FF7A3D] uppercase tracking-wider mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FF7A3D]" />
            <span>Industrial Diagnostic</span>
          </span>
          <div className="!text-[17px] sm:!text-[18px] !font-bold text-white mb-2 leading-snug tracking-tight">
            Transform Your Operations
          </div>
          <p className="!text-[13px] sm:!text-[13.5px] text-slate-200/90 leading-relaxed mb-4">
            Schedule a diagnostic with senior consultants on throughput, automation ROI & DOJO.
          </p>
          <button
            type="button"
            onClick={() => {
              if (onOpenConsultModal) {
                onOpenConsultModal("Article Consultation");
              }
            }}
            className="blog-sidebar-cta-btn w-full"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4. Recent Articles Section */}
      {recentBlogs && recentBlogs.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-xs">
          <div className="pb-2 mb-3 border-b border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
              Recent Publications
            </span>
          </div>
          <div className="space-y-3">
            {recentBlogs.slice(0, 4).map((b) => {
              const imgUrl = getOptimizedCloudinaryUrl(
                b.image?.url || (typeof b.image === "string" ? b.image : "/assets/images/blog/default-blog.jpg"),
                { width: 140 }
              );
              return (
                <Link
                  key={b.slug || b._id}
                  href={`/${b.slug || b._id}`}
                  className="flex items-start gap-2.5 group/item"
                >
                  <img
                    src={imgUrl}
                    alt={b.title}
                    className="w-14 h-12 object-cover rounded-lg shrink-0 border border-slate-100 group-hover/item:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="!text-[12.5px] !font-semibold !text-slate-800 group-hover/item:!text-[#FF5E14] transition-colors line-clamp-2 leading-snug mb-0.5">
                      {b.title}
                    </div>
                    {b.category && (
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {b.category}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}
