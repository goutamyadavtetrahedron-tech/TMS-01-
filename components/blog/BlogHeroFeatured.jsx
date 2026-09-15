"use client";

import Link from "next/link";
import { Sparkles, Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { getOptimizedCloudinaryUrl, stripHtmlAndMarkdown } from "@/lib/richTextRenderer";

export default function BlogHeroFeatured({ blog }) {
  if (!blog) return null;

  const blogLink = `/${blog.slug || blog._id}`;

  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recent";

  // Calculate estimated read time
  const calculateReadTime = () => {
    let wordCount = 0;
    if (blog.title) wordCount += blog.title.split(/\s+/).length;
    if (blog.excerpt) wordCount += stripHtmlAndMarkdown(blog.excerpt).split(/\s+/).length;
    if (blog.sections && Array.isArray(blog.sections)) {
      blog.sections.forEach((sec) => {
        if (sec.heading) wordCount += sec.heading.split(/\s+/).length;
        if (sec.content && Array.isArray(sec.content)) {
          sec.content.forEach((c) => {
            wordCount += stripHtmlAndMarkdown(c).split(/\s+/).length;
          });
        }
      });
    }
    const mins = Math.max(4, Math.ceil(wordCount / 200));
    return `${mins} min read`;
  };

  const getExcerpt = () => {
    if (blog.excerpt) return stripHtmlAndMarkdown(blog.excerpt);
    if (blog.sections && blog.sections.length > 0) {
      const firstSec = blog.sections[0];
      if (firstSec.content && firstSec.content.length > 0) {
        return stripHtmlAndMarkdown(firstSec.content[0]);
      }
    }
    return "Explore actionable insights, benchmarks, and operational frameworks from Tetrahedron principal consultants.";
  };

  const imageUrl = getOptimizedCloudinaryUrl(
    blog.image?.url || (typeof blog.image === "string" ? blog.image : "/assets/images/blog/default-blog.jpg"),
    { width: 1200, quality: "auto" }
  );

  const category = blog.category || "Manufacturing & Automation";

  return (
    <section className="mb-8 sm:mb-10">
      <div className="group relative bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Hero Image Column (7 cols on desktop) */}
          <Link
            href={blogLink}
            className="lg:col-span-7 relative min-h-[220px] sm:min-h-[280px] lg:min-h-[320px] overflow-hidden bg-slate-900 block"
          >
            <img
              src={imageUrl}
              alt={blog.image?.alt || blog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
            <span className="absolute top-3 left-3 px-2.5 py-0.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-white/95 text-[#001659] shadow-xs backdrop-blur-xs">
              {category}
            </span>
          </Link>

          {/* Right Content Column (5 cols on desktop) */}
          <div className="lg:col-span-5 p-5 sm:p-6 lg:p-7 flex flex-col justify-between bg-white">
            <div>
              {/* Flagship Badge Row */}
              <div className="flex items-center gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-50 text-[#FF5E14] border border-orange-200/60 uppercase tracking-wide">
                  <Sparkles className="w-3 h-3 text-[#FF5E14]" />
                  <span>Featured Insight</span>
                </span>
                <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{calculateReadTime()}</span>
                </span>
              </div>

              {/* Title */}
              <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-[#001659] group-hover:text-[#FF5E14] transition-colors leading-snug mb-2.5">
                <Link href={blogLink} className="focus:outline-none">
                  {blog.title}
                </Link>
              </h2>

              {/* Excerpt */}
              <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4 font-normal">
                {getExcerpt()}
              </p>
            </div>

            {/* Author Byline & CTA Action */}
            <div className="pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <div className="w-6 h-6 rounded-full bg-[#001659] text-white flex items-center justify-center font-bold text-xs">
                  T
                </div>
                <div>
                  <div className="font-semibold text-slate-800 text-xs">Tetrahedron Advisory</div>
                  <div className="text-slate-400 text-xs">{formattedDate}</div>
                </div>
              </div>

              <Link
                href={blogLink}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FF5E14] hover:bg-[#c2410c] text-white text-xs font-bold shadow-xs hover:shadow-sm transition-all active:scale-95"
              >
                <span>Read Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
