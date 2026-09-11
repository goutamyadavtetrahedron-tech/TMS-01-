"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Phone,
  Mail,
  Menu as MenuIcon,
  ArrowRight,
  Sparkles,
  Award,
  Factory,
  Cpu,
  GraduationCap,
  Wrench,
  TrendingUp,
  Target,
  Compass,
  Network,
  Users,
  Shield,
  LayoutGrid,
} from "lucide-react";
import { navigationData, contactInfo } from "./navigationData";
import MobileDrawer from "./MobileDrawer";
import ContactFormModal from "@/components/ContactFormModal";

// Crisp inline SVGs for social media icons
function FacebookIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TwitterIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [modalButtonText, setModalButtonText] = useState("Quick Support");

  const navbarRef = useRef(null);

  // Scroll detection for sticky navigation (Requirement 6)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dropdown Open/Close interaction (Requirement 5):
  // - Opens when mouse touches it (hover)
  // - Opens or toggles when clicked
  // - Stays open even if mouse moves away (so people can read slowly)
  // - Closes when clicking the active menu item again, clicking outside, or pressing Escape
  const handleMouseEnter = (title) => {
    setActiveDropdown(title);
  };

  const toggleDropdown = (title) => {
    setActiveDropdown((prev) => (prev === title ? null : title));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const openContactModal = (buttonText = "Quick Support") => {
    setModalButtonText(buttonText);
    setIsContactModalOpen(true);
  };

  return (
    <>
      {/* SCOPED CSS RULES: Guarantees modern aesthetics, refined font sizes, clean scrollbars, and zero truncation */}
      <style jsx global>{`
        .page-wrapper {
          overflow: clip !important;
        }
        .tetra-navbar {
          position: sticky !important;
          top: 0 !important;
          z-index: 1000 !important;
        }
        .tetra-navbar a,
        .tetra-navbar button {
          font-family: var(--font-poppins), Poppins, sans-serif !important;
        }
        .tetra-navbar .nav-link-item {
          font-size: 13.5px !important;
          font-weight: 600 !important;
          color: #001659 !important;
          letter-spacing: 0.1px !important;
          line-height: 1.2 !important;
          text-decoration: none !important;
          transition: color 0.15s ease !important;
        }
        @media (min-width: 1400px) {
          .tetra-navbar .nav-link-item {
            font-size: 14px !important;
          }
        }
        .tetra-navbar .nav-link-item:hover,
        .tetra-navbar .nav-link-active {
          color: #FF5E14 !important;
        }
        .tetra-navbar .top-link {
          color: #001659 !important;
          text-decoration: none !important;
          font-size: 13px !important;
        }
        .tetra-navbar .top-link:hover {
          color: #FF5E14 !important;
        }
        .tetra-navbar .quick-support-btn {
          font-size: 11px !important;
          font-weight: 600 !important;
        }
        @media (min-width: 640px) {
          .tetra-navbar .quick-support-btn {
            font-size: 11.5px !important;
          }
        }

        /* ABOUT US DROPDOWN STYLES */
        .tetra-navbar .about-dropdown-container {
          position: absolute !important;
          left: 50% !important;
          top: 100% !important;
          transform: translateX(-50%) translateY(4px) !important;
          transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s ease !important;
        }
        .tetra-navbar .about-dropdown-container.is-open {
          transform: translateX(-50%) translateY(0px) !important;
        }

        /* CUSTOM MODERN SCROLLBAR FOR SKILL TRAINING COLUMNS */
        .custom-menu-scrollbar::-webkit-scrollbar {
          width: 3.5px !important;
        }
        .custom-menu-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9 !important;
          border-radius: 4px !important;
        }
        .custom-menu-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1 !important;
          border-radius: 4px !important;
        }
        .custom-menu-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8 !important;
        }

        /* MEGA MENU - LEFT HERO CARD STYLES */
        .tetra-navbar .mega-hero-tag {
          font-size: 11px !important;
          font-weight: 700 !important;
          letter-spacing: 0.8px !important;
          text-transform: uppercase !important;
          color: #FF7A3D !important;
          display: block !important;
          margin-bottom: 6px !important;
          line-height: 1.2 !important;
        }
        .tetra-navbar .mega-hero-title {
          font-size: 17.5px !important;
          font-weight: 700 !important;
          color: #ffffff !important;
          line-height: 1.25 !important;
          margin-bottom: 8px !important;
        }
        .tetra-navbar .mega-hero-desc {
          font-size: 13px !important;
          font-weight: 400 !important;
          color: #cbd5e1 !important;
          line-height: 1.45 !important;
          margin-bottom: 12px !important;
        }
        .tetra-navbar .mega-hero-cta {
          font-size: 13.5px !important;
          font-weight: 700 !important;
          color: #ffffff !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 6px !important;
          text-decoration: none !important;
          transition: color 0.15s ease !important;
        }
        .tetra-navbar .mega-hero-cta:hover {
          color: #FF7A3D !important;
        }

        /* MEGA MENU - BOTTOM ACTION BAR */
        .tetra-navbar .mega-bottom-text {
          font-size: 12.5px !important;
          font-weight: 400 !important;
          color: #64748b !important;
          line-height: 1.2 !important;
        }
        .tetra-navbar .mega-bottom-cta {
          font-size: 13.5px !important;
          font-weight: 700 !important;
          color: #FF5E14 !important;
          line-height: 1.2 !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 5px !important;
          background: transparent !important;
          border: none !important;
          padding: 0 !important;
          cursor: pointer !important;
          transition: color 0.15s ease !important;
        }
        .tetra-navbar .mega-bottom-cta:hover {
          color: #c2410c !important;
        }

        /* MEGA MENU - COLUMN HEADERS */
        .tetra-navbar .mega-col-title {
          font-size: 15.5px !important;
          font-weight: 700 !important;
          color: #001659 !important;
          line-height: 1.25 !important;
          text-decoration: none !important;
          white-space: normal !important;
          word-break: normal !important;
          overflow: visible !important;
          text-overflow: clip !important;
          display: inline-block !important;
          transition: color 0.15s ease !important;
        }
        .tetra-navbar .mega-col-title:hover {
          color: #FF5E14 !important;
        }

        /* MEGA MENU - CONSULTING SERVICE ITEM TITLES & DESCRIPTIONS */
        .tetra-navbar .mega-item-title {
          font-size: 15px !important;
          font-weight: 600 !important;
          color: #001659 !important;
          line-height: 1.3 !important;
          transition: color 0.15s ease !important;
        }
        .tetra-navbar a:hover .mega-item-title,
        .tetra-navbar .group\/sub:hover .mega-item-title {
          color: #FF5E14 !important;
        }
        .tetra-navbar .mega-item-desc {
          font-size: 12px !important;
          font-weight: 400 !important;
          color: #64748b !important;
          line-height: 1.35 !important;
          margin-top: 2px !important;
        }

        /* MEGA MENU - SKILL TRAINING COURSE TITLES */
        .tetra-navbar .mega-course-title {
          font-size: 14.5px !important;
          font-weight: 500 !important;
          color: #0f172a !important;
          line-height: 1.4 !important;
          transition: color 0.15s ease !important;
        }
        .tetra-navbar a:hover .mega-course-title,
        .tetra-navbar .group\/sub:hover .mega-course-title {
          color: #FF5E14 !important;
          font-weight: 600 !important;
        }
      `}</style>

      <header
        ref={navbarRef}
        className={`tetra-navbar w-full sticky top-0 z-[1000] bg-white transition-all duration-300 ${
          isScrolled ? "shadow-md" : "border-b border-slate-200/90 shadow-2xs"
        }`}
      >
        <div className="w-full flex items-stretch">
          {/* BRAND LOGOS: Zero padding so images take up the complete space */}
          <div className="shrink-0 flex items-center p-0 bg-white">
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2 h-full pl-1 pr-1.5 focus:outline-none">
              <img
                src="/assets/images/Tetrahedron Logo.png"
                alt="Tetrahedron Logo"
                className={`w-auto object-contain transition-all duration-300 group-hover:scale-[1.02] ${
                  isScrolled ? "h-10 md:h-11" : "h-[68px] sm:h-[72px] lg:h-[76px]"
                }`}
              />
              <img
                src="/assets/images/logocertified.jpeg"
                alt="Incredible Workplaces Certified Badge"
                className={`w-auto object-contain rounded shadow-2xs transition-all duration-300 ${
                  isScrolled ? "h-7 md:h-8" : "h-[50px] sm:h-[54px] lg:h-[58px]"
                }`}
              />
            </Link>
          </div>

          {/* RIGHT SIDE: TWO ROWS (TOP UTILITY BAR + MAIN MENU BAR) */}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            {/* TOP UTILITY ROW (Hides smoothly on scroll - Requirement 6) */}
            <div
              className={`w-full flex items-center justify-between pl-2 sm:pl-3 pr-3 sm:pr-4 lg:pr-5 transition-all duration-300 ${
                isScrolled ? "hidden" : "hidden md:flex py-1 border-b border-slate-100"
              }`}
            >
              {/* Contact list with prominent orange icons */}
              <div className="flex items-center gap-4 lg:gap-6">
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="top-link flex items-center gap-1.5 font-medium transition-colors focus:outline-none"
                >
                  <Phone className="w-3.5 h-3.5 text-[#FF5E14] shrink-0" />
                  <span className="tracking-wide font-medium text-[#001659]">
                    {contactInfo.phoneDisplay}
                  </span>
                </a>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="top-link flex items-center gap-1.5 font-medium transition-colors focus:outline-none"
                >
                  <Mail className="w-3.5 h-3.5 text-[#FF5E14] shrink-0" />
                  <span className="font-medium text-[#001659]">
                    {contactInfo.email}
                  </span>
                </a>
              </div>

              {/* Social media icons with "Follow Us On:" */}
              <div className="flex items-center gap-3">
                <span className="text-[12.5px] lg:text-[13px] font-semibold text-[#001659] leading-none select-none">
                  Follow Us On:
                </span>
                <div className="flex items-center gap-2.5 text-[#001659]">
                  <a
                    href={contactInfo.socials[0].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="top-link flex items-center justify-center w-5 h-5 transition-colors"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={contactInfo.socials[1].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="top-link flex items-center justify-center w-5 h-5 transition-colors"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={contactInfo.socials[2].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter / X"
                    className="top-link flex items-center justify-center w-5 h-5 transition-colors"
                  >
                    <TwitterIcon className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={contactInfo.socials[3].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="top-link flex items-center justify-center w-5 h-5 transition-colors"
                  >
                    <LinkedInIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* MAIN NAVIGATION BAR (#F3F3F3 background container) */}
            <div className="w-full flex items-stretch justify-between bg-[#F3F3F3] min-h-[40px] lg:min-h-[44px]">
              {/* DESKTOP NAV LINKS (Visible on xl screens: 1200px+) */}
              <nav
                className="hidden xl:flex items-center pl-1 sm:pl-2 2xl:pl-3 gap-0.5 lg:gap-1"
                role="navigation"
                aria-label="Main Menu"
              >
                {navigationData.map((item) => {
                  const hasChildren = !!item.children;
                  const isMega = !!item.isMegaMenu;
                  const isDropdown = hasChildren || isMega;
                  const isOpen = activeDropdown === item.title;

                  if (!isDropdown) {
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="nav-link-item px-2 lg:px-2.5 2xl:px-3 py-2.5 whitespace-nowrap flex items-center cursor-pointer"
                      >
                        {item.title}
                      </Link>
                    );
                  }

                  return (
                    <div
                      key={item.title}
                      className="group/nav relative flex items-stretch"
                      onMouseEnter={() => handleMouseEnter(item.title)}
                    >
                      <button
                        className={`nav-link-item flex items-center gap-1 px-2 lg:px-2.5 2xl:px-3 py-2.5 focus:outline-none whitespace-nowrap cursor-pointer ${
                          isOpen ? "nav-link-active" : ""
                        }`}
                        aria-expanded={isOpen}
                        onClick={() => toggleDropdown(item.title)}
                      >
                        <span>{item.title}</span>
                        <ChevronDown
                          className={`w-3 h-3 transition-all duration-200 shrink-0 ${
                            isOpen
                              ? "rotate-180 text-[#FF5E14]"
                              : "text-[#001659] group-hover/nav:text-[#FF5E14]"
                          }`}
                        />
                      </button>

                      {/* 2. ABOUT US DROPDOWN (Narrow, clean, 3 items + 2 policy links - Requirement 2) */}
                      {hasChildren && !isMega && (
                        <div
                          className={`about-dropdown-container top-full pt-1.5 w-[280px] z-[1001] ${
                            isOpen
                              ? "is-open opacity-100 visible pointer-events-auto"
                              : "opacity-0 invisible pointer-events-none"
                          }`}
                        >
                          <div className="bg-white rounded-xl shadow-[0_12px_36px_-6px_rgba(0,22,89,0.18)] border border-slate-200/90 overflow-hidden p-2.5">
                            <div className="space-y-1">
                              {/* 1. Who We Are */}
                              <Link
                                href="/about-us/"
                                onClick={() => setActiveDropdown(null)}
                                className="flex items-center gap-3 px-2.5 py-2 rounded-lg hover:bg-slate-50 transition-colors group/item"
                              >
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#001659] flex items-center justify-center shrink-0">
                                  <Users className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-[14px] font-bold text-[#001659] group-hover/item:text-[#FF5E14] transition-colors leading-tight">
                                    Who We Are
                                  </div>
                                  <div className="text-[11.5px] text-slate-500 leading-tight mt-0.5">
                                    Manufacturing & operational consulting
                                  </div>
                                </div>
                              </Link>

                              {/* 2. Our Leaders */}
                              <Link
                                href="/our-team/"
                                onClick={() => setActiveDropdown(null)}
                                className="flex items-center gap-3 px-2.5 py-2 rounded-lg hover:bg-slate-50 transition-colors group/item"
                              >
                                <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#FF5E14] flex items-center justify-center shrink-0">
                                  <Award className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-[14px] font-bold text-[#001659] group-hover/item:text-[#FF5E14] transition-colors leading-tight">
                                    Our Leaders
                                  </div>
                                  <div className="text-[11.5px] text-slate-500 leading-tight mt-0.5">
                                    Executive leadership & transformation
                                  </div>
                                </div>
                              </Link>

                              {/* 3. Policies */}
                              <Link
                                href="/privacy-policy/"
                                onClick={() => setActiveDropdown(null)}
                                className="flex items-center gap-3 px-2.5 py-2 rounded-lg hover:bg-slate-50 transition-colors group/item"
                              >
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                                  <Shield className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-[14px] font-bold text-[#001659] group-hover/item:text-[#FF5E14] transition-colors leading-tight">
                                    Policies
                                  </div>
                                  <div className="text-[11.5px] text-slate-500 leading-tight mt-0.5">
                                    Governance & compliance standards
                                  </div>
                                </div>
                              </Link>
                            </div>

                            {/* Sub-links: Privacy Policy & Terms of Service */}
                            <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between px-2.5 text-[11.5px]">
                              <Link
                                href="/privacy-policy/"
                                onClick={() => setActiveDropdown(null)}
                                className="text-slate-500 hover:text-[#FF5E14] transition-colors font-medium"
                              >
                                Privacy Policy
                              </Link>
                              <span className="text-slate-300">•</span>
                              <Link
                                href="/terms-of-service/"
                                onClick={() => setActiveDropdown(null)}
                                className="text-slate-500 hover:text-[#FF5E14] transition-colors font-medium"
                              >
                                Terms of Service
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 3. CONSULTING MEGA MENU (Matching Image 1 & Requirement 3) */}
                      {isMega && item.title === "Consulting" && (
                        <div
                          className={`absolute left-[-235px] 2xl:left-[-255px] top-full pt-1.5 z-[1001] w-[1220px] 2xl:w-[1280px] transition-all duration-200 ${
                            isOpen
                              ? "opacity-100 translate-y-0 visible pointer-events-auto"
                              : "opacity-0 translate-y-2 invisible pointer-events-none"
                          }`}
                        >
                          <div className="bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,22,89,0.18)] border border-slate-200/90 overflow-hidden">
                            <div className="flex items-stretch">
                              {/* Left Hero Card - Dark Navy */}
                              <div className="w-[235px] shrink-0 bg-[#0B1A30] p-4 flex flex-col justify-between">
                                <div>
                                  <span className="mega-hero-tag">
                                    Flagship program
                                  </span>
                                  <div className="mega-hero-title">
                                    Manufacturing Operational Excellence
                                  </div>
                                  <p className="mega-hero-desc">
                                    End-to-end methodology to raise throughput and cut manufacturing cost.
                                  </p>

                                  <div className="rounded-lg overflow-hidden border border-white/10 shadow-sm aspect-video mb-3 relative">
                                    <img
                                      src="/assets/images/services/consulting-hero.jpg"
                                      alt="Manufacturing Operational Excellence"
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                </div>

                                <Link
                                  href="/manufacturing-operational-excellence-consulting/"
                                  onClick={() => setActiveDropdown(null)}
                                  className="mega-hero-cta group/cta"
                                >
                                  <span>Explore methodology</span>
                                  <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-0.5 transition-transform text-[#FF7A3D]" />
                                </Link>
                              </div>

                              {/* Right 4 Category Columns - Prominent, readable font sizes, zero truncation */}
                              <div className="flex-1 p-3.5 grid grid-cols-4 gap-3">
                                {item.categories.map((cat, catIdx) => {
                                  const colIcons = [
                                    <LayoutGrid key="c0" className="w-4 h-4 text-[#FF5E14]" />,
                                    <Compass key="c1" className="w-4 h-4 text-blue-600" />,
                                    <Cpu key="c2" className="w-4 h-4 text-purple-600" />,
                                    <Shield key="c3" className="w-4 h-4 text-emerald-600" />,
                                  ];
                                  return (
                                    <div
                                      key={cat.title}
                                      className="pr-2.5 border-r border-slate-100 last:border-r-0 last:pr-0"
                                    >
                                      <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-slate-100">
                                        <div className="shrink-0">
                                          {colIcons[catIdx] || <Factory className="w-4 h-4 text-[#FF5E14]" />}
                                        </div>
                                        <Link
                                          href={cat.href}
                                          onClick={() => setActiveDropdown(null)}
                                          className="mega-col-title"
                                        >
                                          {cat.title}
                                        </Link>
                                      </div>

                                      <div className="space-y-1">
                                        {cat.items.map((subItem) => (
                                          <Link
                                            key={subItem.title}
                                            href={subItem.href}
                                            onClick={() => setActiveDropdown(null)}
                                            className="block px-1.5 py-1 rounded-md hover:bg-slate-50 transition-colors group/sub"
                                          >
                                            <div className="mega-item-title">
                                              {subItem.title}
                                            </div>
                                            {subItem.description && (
                                              <div className="mega-item-desc">
                                                {subItem.description}
                                              </div>
                                            )}
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Bottom Consultation Bar */}
                            <div className="px-4 py-2.5 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between">
                              <span className="mega-bottom-text">
                                Looking for a custom shopfloor diagnostic?
                              </span>
                              <button
                                onClick={() => {
                                  setActiveDropdown(null);
                                  openContactModal("Consulting Inquiry");
                                }}
                                className="mega-bottom-cta group/cta"
                              >
                                <span>Talk to senior consultants</span>
                                <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-0.5 transition-transform" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 4. SKILL TRAINING MEGA MENU (Matching Image 2 & Requirement 4) */}
                      {isMega && item.title === "Skill Training" && (
                        <div
                          className={`absolute left-[-280px] 2xl:left-[-300px] top-full pt-1.5 z-[1001] w-[1220px] 2xl:w-[1280px] transition-all duration-200 ${
                            isOpen
                              ? "opacity-100 translate-y-0 visible pointer-events-auto"
                              : "opacity-0 translate-y-2 invisible pointer-events-none"
                          }`}
                        >
                          <div className="bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,22,89,0.18)] border border-slate-200/90 overflow-hidden">
                            <div className="flex items-stretch">
                              {/* Left Hero Card - Dark Navy */}
                              <div className="w-[235px] shrink-0 bg-[#0B1A30] p-4 flex flex-col justify-between">
                                <div>
                                  <span className="mega-hero-tag">
                                    Corporate training
                                  </span>
                                  <div className="mega-hero-title">
                                    Certified courses across 300+ manufacturers
                                  </div>
                                  <p className="mega-hero-desc">
                                    Hands-on industrial and executive programs for measurable capability building.
                                  </p>
                                </div>

                                <Link
                                  href="/corporate-training-companies/"
                                  onClick={() => setActiveDropdown(null)}
                                  className="mega-hero-cta group/cta mt-auto"
                                >
                                  <span>View full catalogue</span>
                                  <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-0.5 transition-transform text-[#FF7A3D]" />
                                </Link>
                              </div>

                              {/* Right 4 Category Columns - Scrollable up and down with count badges, zero truncation */}
                              <div className="flex-1 p-3.5 grid grid-cols-4 gap-3">
                                {item.categories.map((cat, catIdx) => {
                                  const skillIcons = [
                                    <Wrench key="s0" className="w-4 h-4 text-[#FF5E14]" />,
                                    <TrendingUp key="s1" className="w-4 h-4 text-blue-600" />,
                                    <Target key="s2" className="w-4 h-4 text-purple-600" />,
                                    <Users key="s3" className="w-4 h-4 text-emerald-600" />,
                                  ];
                                  return (
                                    <div
                                      key={cat.title}
                                      className="pr-2.5 border-r border-slate-100 last:border-r-0 last:pr-0 flex flex-col"
                                    >
                                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 gap-1.5">
                                        <div className="flex items-center gap-1.5 flex-1 min-w-0">
                                          <div className="shrink-0">
                                            {skillIcons[catIdx] || <GraduationCap className="w-4 h-4 text-[#FF5E14]" />}
                                          </div>
                                          <Link
                                            href={cat.href}
                                            onClick={() => setActiveDropdown(null)}
                                            className="mega-col-title"
                                            title={cat.title}
                                          >
                                            {cat.title.replace(" Courses", "").replace(" and Training Consultants", "")}
                                          </Link>
                                        </div>
                                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 shrink-0">
                                          {cat.items.length} courses
                                        </span>
                                      </div>

                                      {/* Scrollable Column Container - Allows scrolling up/down inside dropdown without making it too tall */}
                                      <div className="max-h-[320px] overflow-y-auto pr-1.5 space-y-0.5 custom-menu-scrollbar">
                                        {cat.items.map((subItem) => (
                                          <Link
                                            key={subItem.title}
                                            href={subItem.href}
                                            onClick={() => setActiveDropdown(null)}
                                            className="block px-2 py-1 rounded hover:bg-slate-50 transition-colors group/sub"
                                            title={subItem.title}
                                          >
                                            <div className="mega-course-title">
                                              {subItem.title}
                                            </div>
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Bottom Corporate Inquiry Bar */}
                            <div className="px-4 py-2.5 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between">
                              <span className="mega-bottom-text">
                                Inquire for customized on-site corporate batches
                              </span>
                              <button
                                onClick={() => {
                                  setActiveDropdown(null);
                                  openContactModal("Corporate Training Inquiry");
                                }}
                                className="mega-bottom-cta group/cta"
                              >
                                <span>Inquire now</span>
                                <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-0.5 transition-transform" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* RIGHT ACTIONS: QUICK SUPPORT CTA + TABLET/MOBILE HAMBURGER */}
              <div className="flex items-stretch ml-auto">
                {/* Quick Support CTA Button - More compact, refined sizing */}
                <button
                  onClick={() => openContactModal("Quick Support")}
                  className="quick-support-btn flex items-center justify-center px-3 sm:px-3.5 lg:px-4 bg-[#ffc001] hover:bg-[#e6ad00] text-[#001659] tracking-normal transition-all active:scale-[0.99] focus:outline-none whitespace-nowrap cursor-pointer"
                >
                  Quick Support
                </button>

                {/* Tablet & Mobile Hamburger Toggle */}
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="xl:hidden flex items-center px-2.5 text-[#001659] hover:bg-slate-200/70 transition-colors focus:outline-none cursor-pointer"
                  aria-label="Open mobile navigation"
                >
                  <MenuIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* OVERHAULED MOBILE & TABLET DRAWER WITH LIVE SEARCH */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigationData={navigationData}
        onOpenContactModal={openContactModal}
      />

      {/* CONTACT FORM MODAL */}
      <ContactFormModal
        open={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        buttonText={modalButtonText}
      />
    </>
  );
}
