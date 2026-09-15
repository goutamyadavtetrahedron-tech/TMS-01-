"use client";

import Link from "next/link";
import { Compass, ArrowRight, Clock, Calendar } from "lucide-react";
import { getOptimizedCloudinaryUrl, stripHtmlAndMarkdown } from "@/lib/richTextRenderer";

export default function RelatedBlogs({ blogs = [] }) {
  if (!blogs || blogs.length === 0) return null;

  return (
    <section className="mt-8 pt-6 border-t border-slate-200/80">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#FF5E14]" />
          <div className="!text-[15px] sm:!text-base !font-bold !text-[#001659] tracking-tight">
            Related Industry Insights
          </div>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#FF5E14] hover:text-[#c2410c] transition-colors"
        >
          <span>All Publications</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Modern Compact 3-Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.slice(0, 3).map((blog) => {
          const blogLink = `/${blog.slug || blog._id}`;
          const category = blog.category || "Manufacturing";
          const imageUrl = getOptimizedCloudinaryUrl(
            blog.image?.url || (typeof blog.image === "string" ? blog.image : "/assets/images/blog/default-blog.jpg"),
            { width: 600, quality: "auto" }
          );

          // Estimate read time
          let wordCount = 0;
          if (blog.title) wordCount += blog.title.split(/\s+/).length;
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
          const readTime = `${Math.max(3, Math.ceil(wordCount / 200))} min read`;

          return (
            <article
              key={blog.slug || blog._id}
              className="group flex flex-col bg-white rounded-xl border border-slate-200/70 hover:border-orange-300 shadow-2xs hover:shadow-md transition-all duration-200 overflow-hidden p-3"
            >
              {/* Thumbnail Container */}
              <Link
                href={blogLink}
                className="relative aspect-[16/9] rounded-lg overflow-hidden bg-slate-100 block mb-2.5"
              >
                <img
                  src={imageUrl}
                  alt={blog.image?.alt || blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 text-[9.5px] font-bold tracking-wider uppercase rounded-full bg-white/95 text-[#001659] shadow-2xs backdrop-blur-xs">
                  {category}
                </span>
              </Link>

              {/* Title & Meta */}
              <div className="flex flex-col flex-1 justify-between">
                <Link
                  href={blogLink}
                  className="!text-[13.5px] sm:!text-[14px] !font-bold !text-slate-900 group-hover:!text-[#FF5E14] line-clamp-2 !leading-snug mb-3 transition-colors block"
                >
                  {blog.title}
                </Link>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{readTime}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#FF5E14] group-hover:text-[#c2410c] text-[11px]">
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
