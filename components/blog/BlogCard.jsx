"use client";

import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { getOptimizedCloudinaryUrl, stripHtmlAndMarkdown } from "@/lib/richTextRenderer";

export default function BlogCard({ blog }) {
  if (!blog) return null;

  const blogLink = `/${blog.slug || blog._id}`;

  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Recent";

  // Calculate estimated reading time (~200 words/min)
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
    const mins = Math.max(3, Math.ceil(wordCount / 200));
    return `${mins} min read`;
  };

  // Clean excerpt
  const getExcerpt = () => {
    if (blog.excerpt) return stripHtmlAndMarkdown(blog.excerpt);
    if (blog.sections && blog.sections.length > 0) {
      const firstSec = blog.sections[0];
      if (firstSec.content && firstSec.content.length > 0) {
        return stripHtmlAndMarkdown(firstSec.content[0]);
      }
    }
    return "Explore actionable insights and engineering frameworks from Tetrahedron experts.";
  };

  const imageUrl = getOptimizedCloudinaryUrl(
    blog.image?.url || (typeof blog.image === "string" ? blog.image : "/assets/images/blog/default-blog.jpg"),
    { width: 800, quality: "auto" }
  );

  const category = blog.category || "Manufacturing";

  return (
    <article className="group flex flex-col bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Thumbnail with floating category */}
      <Link href={blogLink} className="relative aspect-[16/10] overflow-hidden bg-slate-100 block">
        <img
          src={imageUrl}
          alt={blog.image?.alt || blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-white/95 text-[#001659] shadow-2xs backdrop-blur-xs">
          {category}
        </span>
      </Link>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Meta row: Date + Reading Time */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[#FF5E14]" />
            <span>{formattedDate}</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{calculateReadTime()}</span>
          </span>
        </div>

        {/* Title */}
        <div className="mb-1.5">
          <Link
            href={blogLink}
            className="text-sm sm:text-base font-bold text-[#001659] hover:text-[#FF5E14] leading-snug line-clamp-2 transition-colors block focus:outline-none"
          >
            {blog.title}
          </Link>
        </div>

        {/* Excerpt */}
        <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed mb-3 flex-1 font-normal">
          {getExcerpt()}
        </p>

        {/* Card Footer: Read CTA */}
        <div className="mt-auto pt-2.5 border-t border-slate-100 flex items-center justify-between">
          <Link
            href={blogLink}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#FF5E14] group-hover:text-[#c2410c] transition-colors"
          >
            <span>Read Article</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
