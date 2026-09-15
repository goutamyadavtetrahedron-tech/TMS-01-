"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Layout from "@/components/layout/Layout";
import {
  fetchBlogs,
  selectBlogs,
  selectBlogsLoading,
  selectBlogsError,
} from "@/lib/store/blogSlice";
import BlogCard from "@/components/blog/BlogCard";
import BlogHeroFeatured from "@/components/blog/BlogHeroFeatured";
import BlogFilterBar from "@/components/blog/BlogFilterBar";
import BlogPagination from "@/components/blog/BlogPagination";
import BlogListSkeleton from "@/components/blog/BlogListSkeleton";
import { ChevronRight, BookOpen, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";

export default function BlogListingPage() {
  const dispatch = useDispatch();
  const blogs = useSelector(selectBlogs);
  const loading = useSelector(selectBlogsLoading);
  const error = useSelector(selectBlogsError);

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const gridAnchorRef = useRef(null);

  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    dispatch(
      fetchBlogs({
        page: 1,
        status: "published",
      })
    )
      .unwrap()
      .catch((err) => {
        console.error("fetchBlogs error:", err);
      })
      .finally(() => {
        setIsInitialLoading(false);
      });
  }, [dispatch]);

  // Safely dismiss initial loading if blogs are already populated
  useEffect(() => {
    if (blogs && blogs.length > 0) {
      setIsInitialLoading(false);
    }
  }, [blogs]);

  // Extract published blogs
  const publishedBlogs = useMemo(() => {
    return blogs.filter((b) => b.status === "published");
  }, [blogs]);

  // Extract and normalize categories dynamically from available blogs (Deduplicated)
  const categories = useMemo(() => {
    const categoryMap = new Map();
    const priorityOrder = [
      "All",
      "Automation",
      "Operational Excellence",
      "Employee Training & Development",
      "Skill Training",
      "Manufacturing Excellence",
      "Plant Engineering",
      "Industry 4.0",
    ];

    publishedBlogs.forEach((b) => {
      if (b.category && typeof b.category === "string" && b.category.trim()) {
        const raw = b.category.trim();
        const key = raw.toLowerCase();

        let normalized = raw;
        if (key === "operational excellence") normalized = "Operational Excellence";
        else if (key === "automation") normalized = "Automation";
        else if (key === "employee training & development") normalized = "Employee Training & Development";
        else if (key === "skill training") normalized = "Skill Training";
        else if (key === "manufacturing excellence") normalized = "Manufacturing Excellence";
        else if (key === "plant engineering") normalized = "Plant Engineering";
        else if (key === "industry 4.0") normalized = "Industry 4.0";
        else {
          normalized = raw.replace(/\b\w/g, (l) => l.toUpperCase());
        }

        if (!categoryMap.has(key)) {
          categoryMap.set(key, normalized);
        }
      }
    });

    const discovered = Array.from(categoryMap.values());
    const result = ["All"];

    priorityOrder.forEach((p) => {
      if (p !== "All" && discovered.some((d) => d.toLowerCase() === p.toLowerCase())) {
        result.push(p);
      }
    });

    discovered.forEach((d) => {
      if (!result.some((r) => r.toLowerCase() === d.toLowerCase())) {
        result.push(d);
      }
    });

    return result;
  }, [publishedBlogs]);

  // Filter blogs based on category and search query
  const filteredBlogs = useMemo(() => {
    return publishedBlogs.filter((blog) => {
      const matchesCategory =
        activeCategory === "All" ||
        (blog.category &&
          blog.category.toLowerCase().trim() === activeCategory.toLowerCase().trim());

      const matchesSearch =
        !searchQuery.trim() ||
        blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [publishedBlogs, activeCategory, searchQuery]);

  // The first published article can serve as the featured flagship post
  const featuredBlog = useMemo(() => {
    return publishedBlogs.length > 0 ? publishedBlogs[0] : null;
  }, [publishedBlogs]);

  // Grid posts: exclude the featured post when viewing "All" and no search query active
  const gridBlogs = useMemo(() => {
    if (activeCategory === "All" && !searchQuery.trim() && featuredBlog) {
      return filteredBlogs.filter(
        (b) => (b._id || b.id) !== (featuredBlog._id || featuredBlog.id)
      );
    }
    return filteredBlogs;
  }, [filteredBlogs, activeCategory, searchQuery, featuredBlog]);

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(gridBlogs.length / ITEMS_PER_PAGE));
  const paginatedBlogs = useMemo(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    return gridBlogs.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [gridBlogs, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (gridAnchorRef.current) {
      gridAnchorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Layout>
      <div className="blog-modern-layout bg-[#f8fafc] min-h-screen pb-16">
        {/* Balanced Full-Width Editorial Hero Banner */}
        <section className="blog-hero-banner bg-gradient-to-b from-[#001659] via-[#051f6d] to-[#0a2c5e] text-white py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 shadow-sm">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs font-medium mb-3.5" aria-label="Breadcrumb">
              <Link href="/" className="hero-breadcrumb-link hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="hero-breadcrumb-current">
                Insights & Publications
              </span>
            </nav>

            {/* 2-Column Balanced Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              {/* Left Column (7 cols): Editorial Title & Summary */}
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-orange-300 border border-white/15 uppercase tracking-wider mb-3.5 backdrop-blur-xs">
                  <BookOpen className="w-3.5 h-3.5 text-orange-300 shrink-0" />
                  <span>Tetrahedron Editorial & Research</span>
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug mb-3 text-white">
                  Manufacturing Intelligence & Operational Insights
                </h1>
                <p className="hero-description text-slate-200/90 leading-relaxed font-normal max-w-xl mb-0">
                  Research-backed frameworks, shopfloor automation blueprints, and capability-building methodologies from Tetrahedron principal consultants.
                </p>
              </div>

              {/* Right Column (5 cols): Glassmorphic Focus Areas Card */}
              <div className="lg:col-span-5">
                <div className="bg-white/[0.08] backdrop-blur-md border border-white/15 rounded-2xl p-5 sm:p-6 shadow-lg space-y-3.5">
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-white/10">
                    <span className="blog-hero-card-header font-bold uppercase tracking-wider">
                      Industrial Advisory Practice
                    </span>
                    <span className="blog-hero-card-count px-2.5 py-0.5 rounded-full bg-white/15 text-slate-200">
                      {publishedBlogs.length}+ Publications
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-slate-200">
                    <div className="blog-hero-focus-pill flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <span className="w-2 h-2 rounded-full bg-[#FF5E14] shrink-0" />
                      <span className="whitespace-nowrap">Smart Automation</span>
                    </div>
                    <div className="blog-hero-focus-pill flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                      <span className="whitespace-nowrap">Lean Operations</span>
                    </div>
                    <div className="blog-hero-focus-pill flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                      <span className="whitespace-nowrap">AGV & AMR Systems</span>
                    </div>
                    <div className="blog-hero-focus-pill flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                      <span className="whitespace-nowrap">Plant Engineering</span>
                    </div>
                  </div>

                  <p className="blog-hero-card-footer pt-0.5 mb-0">
                    Curated by Senior Advisory Consultants, Six Sigma Champions & Automation Leaders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading Skeleton UI */}
          {(isInitialLoading || (loading && publishedBlogs.length === 0)) && !error && (
            <BlogListSkeleton />
          )}

          {/* Error State */}
          {error && publishedBlogs.length === 0 && (
            <div className="p-8 rounded-2xl bg-red-50 border border-red-200 text-center max-w-xl mx-auto my-12">
              <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-red-800 mb-1">
                Unable to load publications
              </h3>
              <p className="text-sm text-red-600 mb-4">{error}</p>
              <button
                type="button"
                onClick={() => {
                  setIsInitialLoading(true);
                  dispatch(fetchBlogs({ page: 1, status: "published" }))
                    .unwrap()
                    .catch((err) => console.error(err))
                    .finally(() => setIsInitialLoading(false));
                }}
                className="px-5 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}

          {/* Published Content */}
          {!isInitialLoading && publishedBlogs.length > 0 && (
            <>
              {/* 1. Flagship Featured Hero (Only on Initial View without active search/category filter) */}
              {activeCategory === "All" && !searchQuery.trim() && currentPage === 1 && featuredBlog && (
                <BlogHeroFeatured blog={featuredBlog} />
              )}

              {/* Scroll Anchor for smooth pagination navigation */}
              <div ref={gridAnchorRef} className="scroll-mt-28" />

              {/* 2. Interactive Category Filter & Live Search */}
              <BlogFilterBar
                categories={categories}
                activeCategory={activeCategory}
                onSelectCategory={(cat) => {
                  setActiveCategory(cat);
                  setCurrentPage(1);
                }}
                searchQuery={searchQuery}
                onSearchChange={(query) => {
                  setSearchQuery(query);
                  setCurrentPage(1);
                }}
                totalResults={gridBlogs.length}
              />

              {/* 3. Modern Responsive Blog Grid (9 items per page) */}
              {paginatedBlogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
                  {paginatedBlogs.map((blog) => (
                    <BlogCard key={blog._id || blog.id} blog={blog} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto my-12">
                  <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-slate-800 mb-1">
                    No articles found
                  </h3>
                  <p className="text-sm text-slate-500 mb-5">
                    We couldn't find any articles matching your search criteria.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory("All");
                      setSearchQuery("");
                      setCurrentPage(1);
                    }}
                    className="px-5 py-2 rounded-full bg-[#001659] text-white text-xs font-bold hover:bg-[#051f6d] transition-colors cursor-pointer"
                  >
                    Reset all filters
                  </button>
                </div>
              )}

              {/* 4. Modern Numbered Pagination Controls */}
              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={gridBlogs.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={handlePageChange}
              />
            </>
          )}

          {/* Empty State when finished loading with 0 published blogs */}
          {!isInitialLoading && !error && publishedBlogs.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto my-12 shadow-2xs">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800 mb-1">
                No publications found
              </h3>
              <p className="text-sm text-slate-500 mb-5">
                New industrial research and insights will be posted here soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}