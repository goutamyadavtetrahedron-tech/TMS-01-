// components/BlogDetails.js
import React, { useRef, useState } from "react";
import ContactFormModal from "./ContactFormModal";
import Link from "next/link";
import ContactForm from "./ContactForm";
import { renderRichText, renderBlogContentBlock, getOptimizedCloudinaryUrl, splitContentIntoBlocks } from "@/lib/richTextRenderer";

export default function BlogDetails({ blog, recentBlogs }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const titleRef = useRef(null);
  const ctaRef = useRef(null);

  if (!blog) return null;

  // Helper to render section headings with ref and anchor ID for Table of Contents
  const renderHeading = (text, level = 2, key, sectionIdx) => {
    const Tag = `h${level}`;
    return (
      <Tag
        key={key}
        id={`chapter-${sectionIdx}`}
        ref={node => {
          if (node) {
            node.style.setProperty("font-family", "var(--font-poppins)", "important");
            const resizeHeading = () => {
              if (window.innerWidth < 600) {
                node.style.fontSize = "22px";
                node.style.margin = "22px 0 10px 0";
              } else {
                node.style.fontSize = "28px";
                node.style.margin = "32px 0 14px 0";
              }
            };
            resizeHeading();
            window.addEventListener('resize', resizeHeading);
          }
        }}
        style={{
          fontWeight: 700,
          margin: "32px 0 14px 0",
          scrollMarginTop: "100px",
          color: "#0a2c5e",
        }}
      >
        {text}
      </Tag>
    );
  };

  // Helper to render section images with Cloudinary auto-optimization
  let imageFloatDirection = 0; // 0: left, 1: right
  const renderImage = (src, alt = "Blog Image", isMain = false, floatDir = "left") => {
    const optimizedSrc = getOptimizedCloudinaryUrl(src, { width: isMain ? 1200 : 800 });

    return (
      <img
        src={optimizedSrc}
        alt={alt}
        loading={isMain ? "eager" : "lazy"}
        ref={node => {
          if (node) {
            const resizeImg = () => {
              if (window.innerWidth < 600) {
                node.style.width = isMain ? "100%" : "90vw";
                node.style.maxWidth = isMain ? "98vw" : "95vw";
                node.style.margin = isMain ? "12px 0" : "0 0 12px 0";
                node.style.float = undefined;
                node.style.display = "block";
              } else {
                node.style.width = isMain ? "100%" : "240px";
                node.style.maxWidth = isMain ? "600px" : "320px";
                node.style.margin = isMain
                  ? "16px 0"
                  : floatDir === "left"
                    ? "0 24px 16px 0"
                    : "0 0 16px 24px";
                node.style.float = isMain ? undefined : floatDir;
                node.style.display = isMain ? "block" : "inline-block";
              }
            };
            resizeImg();
            window.addEventListener('resize', resizeImg);
          }
        }}
        style={{
          width: isMain ? "100%" : 240,
          maxWidth: isMain ? 600 : 320,
          borderRadius: 8,
          margin: isMain
            ? "16px 0"
            : floatDir === "left"
              ? "0 24px 16px 0"
              : "0 0 16px 24px",
          float: isMain ? undefined : floatDir,
          display: isMain ? "block" : "inline-block"
        }}
      />
    );
  };

  // Count headings to insert CTA after every 2
  let headingCount = 0;

  // Responsive main container and sidebar
  const mainContainerRef = useRef(null);
  const sidebarRef = useRef(null);
  const outerContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const handleBannerResize = () => {
      if (titleRef.current) {
        if (window.innerWidth < 600) {
          titleRef.current.style.fontSize = "30px";
        } else {
          titleRef.current.style.fontSize = "40px";
        }
      }
    };
    handleBannerResize();
    window.addEventListener('resize', handleBannerResize);
    return () => window.removeEventListener('resize', handleBannerResize);
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
      if (outerContainerRef.current) {
        if (window.innerWidth < 1200) {
          outerContainerRef.current.style.padding = "0 10px";
        } else {
          outerContainerRef.current.style.padding = "0";
        }
      }
      if (mainContainerRef.current) {
        if (window.innerWidth < 1200) {
          mainContainerRef.current.style.flexDirection = "column";
          mainContainerRef.current.style.gap = "0";
          mainContainerRef.current.style.padding = "0 8px";
        } else {
          mainContainerRef.current.style.flexDirection = "row";
          mainContainerRef.current.style.gap = "32px";
          mainContainerRef.current.style.padding = "0";
        }
      }
      if (sidebarRef.current) {
        if (window.innerWidth < 1200) {
          sidebarRef.current.style.maxWidth = "100%";
          sidebarRef.current.style.minWidth = "0";
          sidebarRef.current.style.marginTop = "32px";
        } else {
          sidebarRef.current.style.maxWidth = "320px";
          sidebarRef.current.style.minWidth = "260px";
          sidebarRef.current.style.marginTop = "0";
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter sections with headings for Table of Contents
  const tocSections = Array.isArray(blog.sections)
    ? blog.sections
        .map((sec, idx) => ({ heading: sec.heading, index: idx }))
        .filter(s => s.heading && s.heading.trim())
    : [];

  // JSON-LD Structured Schema for Google Rich Snippets & AI Overviews
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": blog.title,
    "description": blog.metaDescription || blog.title,
    "image": [blog.image?.url || blog.image].filter(Boolean),
    "datePublished": blog.createdAt || new Date().toISOString(),
    "dateModified": blog.updatedAt || blog.createdAt || new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": "Tetrahedron Advisory & Engineering",
      "url": "https://tetrahedron.in"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Tetrahedron Advisory & Engineering",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tetrahedron.in/assets/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://tetrahedron.in/${blog.slug}`
    }
  };

  return (
    <div className="blog-details-page" ref={outerContainerRef} style={{ background: "#fff" }}>
      {/* Auto-injected JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Banner */}
      <div
        style={{
          background: "#0a2c5e",
          color: "#fff",
          minHeight: 260,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "40px 16px",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto", width: "100%" }}>
          {blog.category && (
            <div style={{ marginBottom: 12 }}>
              <span
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  color: "#ff8a65",
                  padding: "4px 14px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {blog.category}
              </span>
            </div>
          )}
          {blog.title && (
            <h1
              ref={titleRef}
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 700,
                fontSize: 40,
                margin: 0,
                color: "#fff",
                lineHeight: 1.3,
              }}
            >
              {blog.title}
            </h1>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div
        className="container"
        ref={mainContainerRef}
        style={{ display: "flex", flexDirection: "row", gap: 32, maxWidth: 1200, margin: "36px auto" }}
      >
        {/* Blog Content */}
        <div style={{ flex: 3, minWidth: 0 }}>
          {blog.image && renderImage(blog.image.url || blog.image, blog.title, true)}

          {/* Auto-Generated Table of Contents (TOC) for multi-chapter articles */}
          {tocSections.length >= 2 && (
            <div className="blog-toc-card">
              <div className="blog-toc-header">
                <span className="blog-toc-icon">📑</span>
                <span className="blog-toc-title">Table of Contents</span>
              </div>
              <ol className="blog-toc-list">
                {tocSections.map(sec => (
                  <li key={sec.index} className="blog-toc-item">
                    <a href={`#chapter-${sec.index}`} className="blog-toc-link">
                      {sec.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {blog.sections && blog.sections.map((section, idx) => {
            let ctaToRender = null;
            let content = [];

            // Render heading if present
            if (section.heading) {
              headingCount++;
              content.push(renderHeading(section.heading, 2, `heading-${idx}`, idx));
            }

            // Always render image if present (alternate left/right)
            if (section.image) {
              const floatDir = imageFloatDirection % 2 === 0 ? "left" : "right";
              imageFloatDirection++;
              if (isMobile) {
                // In mobile, image above content
                content.push(
                  <div key={`img-content-${idx}`} style={{ width: "100%", marginBottom: 12 }}>
                    {renderImage(section.image.url || section.image, undefined, false, undefined)}
                  </div>
                );
              } else {
                // Desktop: image beside content
                content.push(
                  <div key={`img-content-${idx}`} style={{ overflow: "auto", minHeight: 120 }}>
                    {renderImage(section.image.url || section.image, undefined, false, floatDir)}
                  </div>
                );
              }
            }

            // Render content paragraphs with custom block support (Tables, FAQs, Takeaways, YouTube)
            if (section.content) {
              const paras = splitContentIntoBlocks(section.content);
              if (section.image && !isMobile) {
                // Desktop: paragraphs beside image
                content[content.length - 1] = (
                  <div key={`img-content-${idx}`} style={{ overflow: "auto", minHeight: 120 }}>
                    {renderImage(section.image.url || section.image, undefined, false, imageFloatDirection % 2 === 1 ? "left" : "right")}
                    <div style={{ overflow: "hidden" }}>
                      {paras.map((para, i) => renderBlogContentBlock(para, `para-${idx}-${i}`))}
                    </div>
                  </div>
                );
              } else {
                paras.forEach((para, i) => content.push(renderBlogContentBlock(para, `para-${idx}-${i}`)));
              }
            }

            // Insert CTA after every 2 headings (except on the last section)
            if (blog.cta && (blog.cta.text || blog.cta.buttonText) && headingCount > 0 && headingCount % 2 === 0 && idx < blog.sections.length - 1) {
              ctaToRender = (
                <div key={`cta-${idx}`} style={{ margin: "40px 0", background: "#f5f7fa", padding: 24, borderRadius: 12, textAlign: "center" }}>
                  {blog.cta.text && (
                    <h3
                      ref={ctaRef}
                      style={{ fontFamily: "var(--font-poppins)", fontWeight: 600, fontSize: 24, marginBottom: 16 }}
                    >
                      {blog.cta.text}
                    </h3>
                  )}
                  <button
                    type="button"
                    className="thm-btn"
                    style={{ fontSize: 18, padding: "12px 32px", borderRadius: 8, background: "#ff5722", color: "#fff", border: "none", fontWeight: 600, cursor: "pointer" }}
                    onClick={() => setIsModalOpen(true)}
                  >
                    {blog.cta.buttonText || "Contact Us"}
                  </button>
                </div>
              );
            }

            return (
              <React.Fragment key={`section-frag-${idx}`}>
                {content}
                {ctaToRender}
              </React.Fragment>
            );
          })}

          {/* Always render CTA at the end */}
          {blog.cta && (blog.cta.text || blog.cta.buttonText) && (
            <div style={{ margin: "40px 0", background: "#f5f7fa", padding: 24, borderRadius: 12, textAlign: "center" }}>
              {blog.cta.text && (
                <h3
                  ref={ctaRef}
                  style={{ fontFamily: "var(--font-poppins)", fontWeight: 600, fontSize: 24, marginBottom: 16 }}
                >
                  {blog.cta.text}
                </h3>
              )}
              <button
                type="button"
                className="thm-btn"
                style={{ fontSize: 18, padding: "12px 32px", borderRadius: 8, background: "#ff5722", color: "#fff", border: "none", fontWeight: 600, cursor: "pointer" }}
                onClick={() => setIsModalOpen(true)}
              >
                {blog.cta.buttonText || "Contact Us"}
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside
          ref={sidebarRef}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
            flex: 1,
            minWidth: 260,
            maxWidth: 420,
            position: "sticky",
            top: 32,
            alignSelf: "flex-start",
            zIndex: 3,
            height: "fit-content"
          }}
        >
          {/* Contact Form */}
          <div
            ref={node => {
              if (node) {
                node.style.setProperty("background", "#f5f7fa", "important");
                node.style.setProperty("borderRadius", "12px", "important");
                node.style.setProperty("marginBottom", "32px", "important");
                node.style.setProperty("width", "100%", "important");
                node.style.setProperty("maxWidth", "420px", "important");
                node.style.setProperty("alignSelf", "stretch", "important");
                node.style.setProperty("boxSizing", "border-box", "important");
                node.style.setProperty("position", "sticky", "important");
                node.style.setProperty("top", "32px", "important");
                node.style.setProperty("zIndex", "2", "important");
              }
            }}
          >
            <h3
              ref={node => {
                if (node) {
                  node.style.setProperty("font-family", "var(--font-poppins)", "important");
                  node.style.setProperty("fontWeight", "700", "important");
                  node.style.setProperty("fontSize", "24px", "important");
                  node.style.setProperty("marginBottom", "20px", "important");
                  node.style.setProperty("textAlign", "center", "important");
                }
              }}
            >
              Contact Us
            </h3>
            <ContactForm />
          </div>

          {/* Recent Blogs */}
          <div
            ref={node => {
              if (node) {
                node.style.setProperty("background", "#f5f7fa", "important");
                node.style.setProperty("borderRadius", "12px", "important");
                node.style.setProperty("padding", "24px", "important");
                node.style.setProperty("width", "100%", "important");
                node.style.setProperty("maxWidth", "320px", "important");
                node.style.setProperty("alignSelf", "flex-start", "important");
                node.style.setProperty("boxSizing", "border-box", "important");
                node.style.setProperty("position", "sticky", "important");
                node.style.setProperty("top", "340px", "important");
                node.style.setProperty("zIndex", "1", "important");
              }
            }}
          >
            <h3
              ref={node => {
                if (node) node.style.setProperty("font-family", "var(--font-poppins)", "important");
                if (node) node.style.setProperty("fontWeight", "700", "important");
                if (node) node.style.setProperty("fontSize", "22px", "important");
                if (node) node.style.setProperty("marginBottom", "20px", "important");
              }}
            >
              Recent Blogs
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {recentBlogs && recentBlogs.slice(0, 4).map((b) => (
                <li key={b.slug} style={{ marginBottom: 18, display: "flex", alignItems: "center" }}>
                  {b.image && (
                    <img
                      src={getOptimizedCloudinaryUrl(b.image.url || b.image, { width: 120 })}
                      alt={b.title}
                      style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 8, marginRight: 12 }}
                    />
                  )}
                  <div>
                    <Link href={`/${b.slug}`} style={{ color: "#0a2c5e", fontWeight: 600, textDecoration: "none", fontSize: 16 }}>
                      {b.title}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Contact Modal */}
      <ContactFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        buttonText={blog.cta?.buttonText || "Contact Us"}
      />

      {/* Global CSS for Blog Links, TOC, Tables, Callouts, FAQs, and Video Embeds */}
      <style jsx global>{`
        .blog-content-link {
          color: #1a73e8 !important;
          text-decoration: underline !important;
          text-underline-offset: 3px !important;
          text-decoration-thickness: 1.5px !important;
          font-weight: 500 !important;
          transition: all 0.15s ease !important;
          cursor: pointer !important;
        }
        .blog-content-link:hover {
          color: #ff5722 !important;
          text-decoration-color: #ff5722 !important;
        }

        /* Table of Contents Card */
        .blog-toc-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-left: 4px solid #0a2c5e;
          border-radius: 8px;
          padding: 20px 24px;
          margin: 28px 0 36px 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }
        .blog-toc-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }
        .blog-toc-icon {
          font-size: 18px;
        }
        .blog-toc-title {
          font-family: var(--font-poppins);
          font-size: 18px;
          font-weight: 700;
          color: #0a2c5e;
        }
        .blog-toc-list {
          margin: 0;
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .blog-toc-item {
          color: #64748b;
        }
        .blog-toc-link {
          color: #0284c7;
          text-decoration: none;
          font-weight: 500;
          font-size: 15.5px;
          transition: color 0.15s;
        }
        .blog-toc-link:hover {
          color: #ff5722;
          text-decoration: underline;
        }

        /* Key Takeaway Callout Box */
        .blog-takeaway-box {
          background: #eff6ff !important;
          border-left: 4px solid #2563eb !important;
          padding: 18px 22px !important;
          margin: 24px 0 !important;
          border-radius: 0 8px 8px 0 !important;
          color: #1e3a8a !important;
          font-size: 16.5px !important;
          line-height: 1.75 !important;
        }
        .blog-takeaway-box strong {
          color: #1d4ed8 !important;
          font-weight: 700 !important;
        }

        /* Comparison & Data Tables */
        .blog-table-container {
          margin: 28px 0;
          overflow-x: auto;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
        }
        .blog-data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 15px;
          text-align: left;
        }
        .blog-data-table th {
          background: #0a2c5e;
          color: #ffffff;
          padding: 12px 16px;
          font-weight: 600;
          border-bottom: 2px solid #031735;
        }
        .blog-data-table td {
          padding: 12px 16px;
          border-bottom: 1px solid #e2e8f0;
          color: #334155;
          line-height: 1.6;
        }
        .blog-data-table tbody tr:nth-child(even) {
          background: #f8fafc;
        }
        .blog-data-table tbody tr:hover {
          background: #f1f5f9;
        }

        /* FAQ Accordions (<details>) */
        .blog-faq-accordion,
        details.blog-faq-accordion {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 14px 18px;
          margin: 14px 0;
          background: #ffffff;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        details.blog-faq-accordion[open] {
          border-color: #2563eb;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.08);
          background: #f8fafc;
        }
        details.blog-faq-accordion summary {
          font-weight: 600;
          font-size: 16.5px;
          color: #0f172a;
          cursor: pointer;
          user-select: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        details.blog-faq-accordion summary:hover {
          color: #ff5722;
        }
        details.blog-faq-accordion p {
          margin: 12px 0 4px 0;
          color: #475569;
          font-size: 15.5px;
          line-height: 1.7;
        }

        /* Video Wrapper */
        .blog-video-wrapper {
          margin: 28px 0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }
      `}</style>
    </div>
  );
}