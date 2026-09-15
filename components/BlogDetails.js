"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Calendar, Clock, User, ShieldCheck, Sparkles, ListOrdered, ChevronDown } from "lucide-react";
import ContactFormModal from "./ContactFormModal";
import ContactForm from "./ContactForm";
import ReadingProgressBar from "./blog/ReadingProgressBar";
import BlogSidebar from "./blog/BlogSidebar";
import BlogAuthorCard from "./blog/BlogAuthorCard";
import RelatedBlogs from "./blog/RelatedBlogs";
import BlogEditorialContent from "./blog/BlogEditorialContent";
import {
  getOptimizedCloudinaryUrl,
  stripHtmlAndMarkdown,
} from "@/lib/richTextRenderer";

export default function BlogDetails({ blog, recentBlogs = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalButtonText, setModalButtonText] = useState("Quick Support");
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);

  if (!blog) return null;

  const openContactModal = (btnText = "Quick Support") => {
    setModalButtonText(btnText);
    setIsModalOpen(true);
  };

  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently Published";

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
    const mins = Math.max(4, Math.ceil(wordCount / 200));
    return `${mins} min read`;
  };

  // Filter sections with headings for Table of Contents
  const tocSections = Array.isArray(blog.sections)
    ? blog.sections
        .map((sec, idx) => ({ heading: sec.heading, index: idx }))
        .filter((s) => s.heading && s.heading.trim())
    : [];

  const mainImageUrl = getOptimizedCloudinaryUrl(
    blog.image?.url || (typeof blog.image === "string" ? blog.image : ""),
    { width: 1400, quality: "auto" }
  );

  const category = blog.category || "Manufacturing & Automation";

  // Schema for SEO & Rich Snippets
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: blog.title,
    description: blog.metaDescription || blog.title,
    image: [blog.image?.url || blog.image].filter(Boolean),
    datePublished: blog.createdAt || new Date().toISOString(),
    dateModified: blog.updatedAt || blog.createdAt || new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: "Tetrahedron Manufacturing Advisory",
      url: "https://tetrahedron.in",
    },
    publisher: {
      "@type": "Organization",
      name: "Tetrahedron",
      logo: {
        "@type": "ImageObject",
        url: "https://tetrahedron.in/assets/images/Tetrahedron%20Logo.png",
      },
    },
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <ReadingProgressBar />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article className="blog-modern-layout bg-[#f8fafc] min-h-screen">
        {/* Sleek Compact Editorial Header */}
        <header className="bg-gradient-to-b from-[#001659] via-[#051f6d] to-[#0a2c5e] text-white py-6 sm:py-8 lg:py-9 px-4 sm:px-6 shadow-sm">
          <div className="max-w-5xl mx-auto">
            {/* Top Row: Compact Breadcrumb & Category Badge */}
            <div className="flex items-center justify-between gap-3 mb-2.5 flex-wrap">
              <nav className="flex items-center gap-1.5 text-[11.5px] font-medium text-slate-300">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-[#FF7A3D] font-semibold truncate max-w-[200px] sm:max-w-xs">
                  {category}
                </span>
              </nav>

              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-orange-500/15 text-orange-300 border border-orange-500/25 uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-[#FF7A3D]" />
                <span>{category}</span>
              </span>
            </div>

            {/* Modern Article Headline */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-extrabold text-white leading-tight tracking-tight mb-3 sm:mb-4 max-w-4xl">
              {blog.title}
            </h1>

            {/* Compact Editorial Byline Row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-5 pt-3 border-t border-white/10 text-[11.5px] sm:text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-[#FF5E14] text-white font-bold flex items-center justify-center text-[10px] shadow-2xs">
                  T
                </div>
                <span className="font-semibold text-white">Tetrahedron Advisory</span>
              </div>
              <span className="text-white/30">•</span>
              <div className="flex items-center gap-1 text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-[#FF7A3D]" />
                <span>{formattedDate}</span>
              </div>
              <span className="text-white/30">•</span>
              <div className="flex items-center gap-1 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{calculateReadTime()}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Article Layout Container: Main Column + Clean Sticky Sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          <div className="flex flex-col lg:flex-row items-start gap-7 lg:gap-10">
            {/* Primary Reading Column (70% on desktop) */}
            <div className="flex-1 min-w-0 w-full">
              {/* Featured Cover Image */}
              {mainImageUrl && (
                <div className="relative aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md mb-8 sm:mb-10 bg-slate-900 border border-slate-200">
                  <img
                    src={mainImageUrl}
                    alt={blog.image?.alt || blog.title}
                    className="w-full h-full object-cover"
                    priority="true"
                  />
                </div>
              )}

              {/* Mobile Quick Jump Table of Contents Drawer */}
              {tocSections.length >= 2 && (
                <div className="lg:hidden mb-6 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
                    className="w-full flex items-center justify-between text-left font-bold text-[#001659] text-sm cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <ListOrdered className="w-4 h-4 text-[#FF5E14]" />
                      <span>In This Guide ({tocSections.length} Chapters)</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                        isMobileTocOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isMobileTocOpen && (
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 max-h-60 overflow-y-auto">
                      {tocSections.map((item, i) => (
                        <a
                          key={i}
                          href={`#chapter-${item.index}`}
                          onClick={() => setIsMobileTocOpen(false)}
                          className="flex items-start gap-2 py-1.5 px-2 rounded-lg text-xs text-slate-700 hover:text-[#FF5E14] hover:bg-orange-50/60 transition-colors"
                        >
                          <span className="font-bold text-[#001659] shrink-0">
                            {String(i + 1).padStart(2, "0")}.
                          </span>
                          <span className="line-clamp-1">{item.heading}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Article Content Sections */}
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 sm:p-10 lg:p-12 shadow-xs">
                <BlogEditorialContent
                  sections={blog.sections}
                  cta={blog.cta}
                  blogTitle={blog.title}
                  onOpenConsultModal={openContactModal}
                />

                {/* Author Card at bottom of article */}
                <BlogAuthorCard onOpenConsultModal={openContactModal} />
              </div>

              {/* Related Articles Section */}
              <RelatedBlogs blogs={recentBlogs} />

              {/* Compact Modern Contact Section */}
              <section className="mt-8 flex flex-col items-center">
                <div className="w-full max-w-[420px] text-center mb-3">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#FF5E14] mb-1">
                    Next Steps
                  </span>
                  <div className="text-[16px] sm:text-[17px] font-bold text-[#001659] leading-snug">
                    Ready to Modernize Your Shopfloor Operations?
                  </div>
                </div>

                <div className="w-full max-w-[420px]">
                  <ContactForm compact={true} />
                </div>
              </section>
            </div>

            {/* Modern Non-Colliding Sticky Sidebar */}
            <BlogSidebar
              tocSections={tocSections}
              recentBlogs={recentBlogs}
              title={blog.title}
              onOpenConsultModal={openContactModal}
            />
          </div>
        </div>
      </article>

      {/* Global Consultation Modal */}
      <ContactFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        buttonText={modalButtonText}
      />
    </>
  );
}