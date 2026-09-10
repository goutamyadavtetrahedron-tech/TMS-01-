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

  const timeoutRef = useRef(null);

  // Scroll detection for sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (title) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(title);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const openContactModal = (buttonText = "Quick Support") => {
    setModalButtonText(buttonText);
    setIsContactModalOpen(true);
  };

  return (
    <>
      {/* SCOPED CSS RULES: Guarantees 100% uniform font size, weight, and colors */}
      <style jsx global>{`
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
          transition: color 0.2s ease !important;
        }
        @media (min-width: 1400px) {
          .tetra-navbar .nav-link-item {
            font-size: 14px !important;
          }
        }
        @media (min-width: 1600px) {
          .tetra-navbar .nav-link-item {
            font-size: 14.5px !important;
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
        @media (min-width: 1280px) {
          .tetra-navbar .top-link {
            font-size: 13.5px !important;
          }
        }
        .tetra-navbar .top-link:hover {
          color: #FF5E14 !important;
        }

        /* MEGA-MENU EXACT STYLES (Strictly overrides any Bootstrap or global.css collision) */
        .tetra-navbar .mega-card-title {
          font-size: 14.5px !important;
          font-weight: 700 !important;
          color: #001659 !important;
          line-height: 1.25 !important;
          margin: 0 !important;
        }
        .tetra-navbar .mega-card-desc {
          font-size: 11px !important;
          color: #475569 !important;
          line-height: 1.45 !important;
          margin: 0 !important;
        }
        .tetra-navbar .mega-card-cta {
          font-size: 12px !important;
          font-weight: 700 !important;
          color: #FF5E14 !important;
          text-decoration: none !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 4px !important;
        }
        .tetra-navbar .mega-col-header {
          height: 44px !important;
          min-height: 44px !important;
          max-height: 44px !important;
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
          border-bottom: 1px solid #f1f5f9 !important;
          padding-bottom: 6px !important;
          margin-bottom: 8px !important;
        }
        .tetra-navbar .mega-col-title {
          font-size: 11px !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.2px !important;
          color: #001659 !important;
          line-height: 1.25 !important;
          margin: 0 !important;
          text-decoration: none !important;
          display: -webkit-box !important;
          -webkit-line-clamp: 2 !important;
          -webkit-box-orient: vertical !important;
          overflow: hidden !important;
        }
        .tetra-navbar .mega-item-title {
          font-size: 11.5px !important;
          font-weight: 600 !important;
          color: #001659 !important;
          line-height: 1.25 !important;
        }
        .tetra-navbar .mega-item-desc {
          font-size: 9.5px !important;
          font-weight: 400 !important;
          color: #64748B !important;
          line-height: 1.2 !important;
        }
        .tetra-navbar .mega-course-title {
          font-size: 11px !important;
          font-weight: 500 !important;
          color: #001659 !important;
          line-height: 1.2 !important;
        }
        .tetra-navbar .mega-action-btn {
          font-size: 12px !important;
          font-weight: 700 !important;
          color: #FF5E14 !important;
          background: transparent !important;
          border: none !important;
          padding: 0 !important;
          margin: 0 !important;
          cursor: pointer !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 4px !important;
          line-height: 1 !important;
          transition: color 0.15s ease !important;
        }
        .tetra-navbar .mega-action-btn:hover {
          color: #c2410c !important;
        }
        .tetra-navbar .mega-footer-note {
          font-size: 11.5px !important;
          color: #475569 !important;
          font-weight: 500 !important;
          line-height: 1.2 !important;
        }
        .custom-menu-scrollbar::-webkit-scrollbar {
          width: 3.5px !important;
        }
        .custom-menu-scrollbar::-webkit-scrollbar-track {
          background: transparent !important;
        }
        .custom-menu-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1 !important;
          border-radius: 4px !important;
        }
        .custom-menu-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8 !important;
        }
      `}</style>

      <header
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
            {/* TOP UTILITY ROW (Compact, clean) */}
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

              {/* Social media icons with "Follow Us On:" - Perfectly aligned & spaced */}
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
                      onMouseLeave={handleMouseLeave}
                    >
                      <button
                        className={`nav-link-item flex items-center gap-1 px-2 lg:px-2.5 2xl:px-3 py-2.5 focus:outline-none whitespace-nowrap cursor-pointer ${
                          isOpen ? "nav-link-active" : ""
                        }`}
                        aria-expanded={isOpen}
                        onClick={() =>
                          setActiveDropdown(isOpen ? null : item.title)
                        }
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

                        {/* COMPACT DROPDOWN: ABOUT US (w-64, clean and focused) */}
                        {hasChildren && !isMega && (
                          <div
                            className={`absolute left-0 top-full pt-1.5 w-64 z-[1001] transition-all duration-200 ${
                              isOpen
                                ? "opacity-100 translate-y-0 visible pointer-events-auto"
                                : "opacity-0 translate-y-2 invisible pointer-events-none"
                            }`}
                            onMouseEnter={() => handleMouseEnter(item.title)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <div className="bg-white rounded-xl shadow-xl border border-slate-200/90 p-2 space-y-1">
                              {item.children.map((child) => (
                                <div key={child.title} className="group/item">
                                  <Link
                                    href={child.href}
                                    onClick={() => setActiveDropdown(null)}
                                    className="block p-2 rounded-lg hover:bg-slate-50 transition-colors"
                                  >
                                    <div className="text-[14px] font-semibold text-[#001659] group-hover/item:text-[#FF5E14]">
                                      {child.title}
                                    </div>
                                    {child.description && (
                                      <p className="text-[11.5px] text-slate-500 mt-0.5 leading-snug">
                                        {child.description}
                                      </p>
                                    )}
                                  </Link>

                                  {/* Policies sub-items */}
                                  {child.subChildren && (
                                    <div className="ml-3 pl-2.5 border-l-2 border-slate-100 py-1 space-y-1">
                                      {child.subChildren.map((sub) => (
                                        <Link
                                          key={sub.title}
                                          href={sub.href}
                                          onClick={() => setActiveDropdown(null)}
                                          className="block px-2 py-1 text-xs text-slate-600 hover:text-[#FF5E14] rounded font-medium"
                                        >
                                          {sub.title}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* COMPACT CONSULTING MEGA MENU: 4 Balanced Columns (Zero Duplicate Links, Equal Prominence) */}
                        {isMega && item.title === "Consulting" && (
                          <div
                            className={`absolute left-[-240px] top-full pt-1.5 z-[1001] w-[1180px] 2xl:w-[1240px] transition-all duration-200 ${
                              isOpen
                                ? "opacity-100 translate-y-0 visible pointer-events-auto"
                                : "opacity-0 translate-y-2 invisible pointer-events-none"
                            }`}
                            onMouseEnter={() => handleMouseEnter(item.title)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <div className="bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,22,89,0.16)] border border-slate-200/90 overflow-hidden">
                              <div className="flex items-stretch">
                                {/* Left Flagship Highlight Card */}
                                <div className="w-[200px] shrink-0 bg-gradient-to-br from-amber-50/70 via-orange-50/30 to-slate-50 p-4 flex flex-col justify-between border-r border-amber-100/70">
                                  <div>
                                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FF5E14]/10 text-[#FF5E14] text-[9.5px] font-bold tracking-wider uppercase mb-2.5">
                                      <Sparkles className="w-3 h-3 text-[#FF5E14]" />
                                      <span>FLAGSHIP PROGRAM</span>
                                    </div>
                                    <h4 className="mega-card-title">
                                      Manufacturing Operational Excellence
                                    </h4>
                                    <p className="mega-card-desc mt-1.5">
                                      Proven end-to-end methodology to maximize throughput, eliminate operational bottlenecks, and reduce manufacturing costs.
                                    </p>
                                  </div>

                                  <Link
                                    href="/manufacturing-operational-excellence-consulting/"
                                    onClick={() => setActiveDropdown(null)}
                                    className="mega-card-cta mt-3 hover:translate-x-0.5 transition-transform"
                                  >
                                    <span>Explore Methodology</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </Link>
                                </div>

                                {/* Right 4 Balanced Columns: All 19 Unique Capabilities */}
                                <div className="flex-1 p-3.5 sm:p-4 grid grid-cols-4 gap-3.5">
                                  {/* Column 1: Manufacturing Excellence Services */}
                                  <div>
                                    <div className="mega-col-header">
                                      <div className="w-6 h-6 rounded-md bg-orange-50 border border-orange-100/80 flex items-center justify-center shrink-0 text-[#FF5E14]">
                                        <Factory className="w-3.5 h-3.5" />
                                      </div>
                                      <Link
                                        href={item.categories[0].href}
                                        onClick={() => setActiveDropdown(null)}
                                        className="mega-col-title hover:text-[#FF5E14] transition-colors"
                                        title={item.categories[0].title}
                                      >
                                        {item.categories[0].title}
                                      </Link>
                                    </div>
                                    <div className="space-y-1">
                                      {item.categories[0].items.map((subItem) => (
                                        <Link
                                          key={subItem.title}
                                          href={subItem.href}
                                          onClick={() => setActiveDropdown(null)}
                                          className="block px-2 py-1 rounded-lg hover:bg-orange-50/60 transition-colors group/sub"
                                        >
                                          <div className="mega-item-title group-hover/sub:text-[#FF5E14] truncate">
                                            {subItem.title}
                                          </div>
                                          {subItem.description && (
                                            <div className="mega-item-desc truncate mt-0.5">
                                              {subItem.description}
                                            </div>
                                          )}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Column 2: Plant Engineering & DOJO Centers */}
                                  <div>
                                    <div className="mega-col-header">
                                      <div className="w-6 h-6 rounded-md bg-blue-50 border border-blue-100/80 flex items-center justify-center shrink-0 text-blue-600">
                                        <Compass className="w-3.5 h-3.5" />
                                      </div>
                                      <Link
                                        href={item.categories[1].href}
                                        onClick={() => setActiveDropdown(null)}
                                        className="mega-col-title hover:text-[#FF5E14] transition-colors"
                                        title={item.categories[1].title}
                                      >
                                        {item.categories[1].title}
                                      </Link>
                                    </div>
                                    <div className="space-y-1">
                                      {item.categories[1].items.map((subItem) => (
                                        <Link
                                          key={subItem.title}
                                          href={subItem.href}
                                          onClick={() => setActiveDropdown(null)}
                                          className="block px-2 py-1 rounded-lg hover:bg-blue-50/60 transition-colors group/sub"
                                        >
                                          <div className="mega-item-title group-hover/sub:text-[#FF5E14] truncate">
                                            {subItem.title}
                                          </div>
                                          {subItem.description && (
                                            <div className="mega-item-desc truncate mt-0.5">
                                              {subItem.description}
                                            </div>
                                          )}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Column 3: Digitization & Smart Factory */}
                                  <div>
                                    <div className="mega-col-header">
                                      <div className="w-6 h-6 rounded-md bg-purple-50 border border-purple-100/80 flex items-center justify-center shrink-0 text-purple-600">
                                        <Cpu className="w-3.5 h-3.5" />
                                      </div>
                                      <Link
                                        href={item.categories[2].href}
                                        onClick={() => setActiveDropdown(null)}
                                        className="mega-col-title hover:text-[#FF5E14] transition-colors"
                                        title={item.categories[2].title}
                                      >
                                        {item.categories[2].title}
                                      </Link>
                                    </div>
                                    <div className="space-y-1">
                                      {item.categories[2].items.map((subItem) => (
                                        <Link
                                          key={subItem.title}
                                          href={subItem.href}
                                          onClick={() => setActiveDropdown(null)}
                                          className="block px-2 py-1 rounded-lg hover:bg-purple-50/60 transition-colors group/sub"
                                        >
                                          <div className="mega-item-title group-hover/sub:text-[#FF5E14] truncate">
                                            {subItem.title}
                                          </div>
                                          {subItem.description && (
                                            <div className="mega-item-desc truncate mt-0.5">
                                              {subItem.description}
                                            </div>
                                          )}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Column 4: ISO Standards & Certifications */}
                                  <div>
                                    <div className="mega-col-header">
                                      <div className="w-6 h-6 rounded-md bg-emerald-50 border border-emerald-100/80 flex items-center justify-center shrink-0 text-emerald-600">
                                        <Award className="w-3.5 h-3.5" />
                                      </div>
                                      <Link
                                        href={item.categories[3].href}
                                        onClick={() => setActiveDropdown(null)}
                                        className="mega-col-title hover:text-[#FF5E14] transition-colors"
                                        title={item.categories[3].title}
                                      >
                                        {item.categories[3].title}
                                      </Link>
                                    </div>
                                    <div className="space-y-1">
                                      {item.categories[3].items.map((subItem) => (
                                        <Link
                                          key={subItem.title}
                                          href={subItem.href}
                                          onClick={() => setActiveDropdown(null)}
                                          className="block px-2 py-1 rounded-lg hover:bg-emerald-50/60 transition-colors group/sub"
                                        >
                                          <div className="mega-item-title group-hover/sub:text-[#FF5E14] truncate">
                                            {subItem.title}
                                          </div>
                                          {subItem.description && (
                                            <div className="mega-item-desc truncate mt-0.5">
                                              {subItem.description}
                                            </div>
                                          )}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Bottom Consultation Bar */}
                              <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                                <span className="mega-footer-note">
                                  Looking for custom shopfloor turnaround or lean diagnostic?
                                </span>
                                <button
                                  onClick={() => {
                                    setActiveDropdown(null);
                                    openContactModal("Consulting Inquiry");
                                  }}
                                  className="mega-action-btn"
                                >
                                  <span>Talk to Senior Consultants</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* COMPACT SKILL TRAINING MEGA MENU: All 4 Categories + Corporate Card */}
                        {isMega && item.title === "Skill Training" && (
                          <div
                            className={`absolute left-[-260px] top-full pt-1.5 z-[1001] w-[1180px] 2xl:w-[1240px] transition-all duration-200 ${
                              isOpen
                                ? "opacity-100 translate-y-0 visible pointer-events-auto"
                                : "opacity-0 translate-y-2 invisible pointer-events-none"
                            }`}
                            onMouseEnter={() => handleMouseEnter(item.title)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <div className="bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,22,89,0.16)] border border-slate-200/90 overflow-hidden">
                              <div className="flex items-stretch">
                                {/* Left Corporate Training Highlight Card */}
                                <div className="w-[200px] shrink-0 bg-gradient-to-br from-amber-50/70 via-orange-50/30 to-slate-50 p-4 flex flex-col justify-between border-r border-amber-100/70">
                                  <div>
                                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FF5E14]/10 text-[#FF5E14] text-[10px] font-bold tracking-wider uppercase mb-2.5">
                                      <GraduationCap className="w-3 h-3 text-[#FF5E14]" />
                                      <span>CORPORATE TRAINING</span>
                                    </div>
                                    <h4 className="mega-card-title">
                                      Corporate Training Course In India
                                    </h4>
                                    <p className="mega-card-desc mt-1.5">
                                      Certified, hands-on industrial and executive training programs delivering measurable capability building across 300+ manufacturers.
                                    </p>
                                  </div>

                                  <Link
                                    href="/corporate-training-companies/"
                                    onClick={() => setActiveDropdown(null)}
                                    className="mega-card-cta mt-4 hover:translate-x-0.5 transition-transform"
                                  >
                                    <span>View Training Catalogue</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </Link>
                                </div>

                                {/* Right 4 Columns: All 48 Verified Courses with Exact Headings & Count Badges */}
                                <div className="flex-1 p-3.5 sm:p-4 grid grid-cols-4 gap-3">
                                  {/* Column 1: Technical Training Courses */}
                                  <div>
                                    <div className="mega-col-header">
                                      <div className="w-6 h-6 rounded-md bg-orange-50 border border-orange-100/80 flex items-center justify-center shrink-0 text-[#FF5E14]">
                                        <Wrench className="w-3.5 h-3.5" />
                                      </div>
                                      <div className="flex-1 flex items-center justify-between gap-1 min-w-0">
                                        <Link
                                          href={item.categories[0].href}
                                          onClick={() => setActiveDropdown(null)}
                                          className="mega-col-title hover:text-[#FF5E14] transition-colors"
                                          title={item.categories[0].title}
                                        >
                                          {item.categories[0].title}
                                        </Link>
                                        <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded-full bg-orange-100/80 text-[#FF5E14] shrink-0">
                                          {item.categories[0].items.length}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="space-y-1 max-h-[310px] overflow-y-auto pr-1.5 custom-menu-scrollbar">
                                      {item.categories[0].items.map((subItem) => (
                                        <Link
                                          key={subItem.title}
                                          href={subItem.href}
                                          onClick={() => setActiveDropdown(null)}
                                          className="block px-2 py-1 rounded-lg hover:bg-orange-50/60 transition-colors group/sub"
                                          title={subItem.title}
                                        >
                                          <div className="mega-item-title group-hover/sub:text-[#FF5E14] truncate">
                                            {subItem.title}
                                          </div>
                                          {subItem.description && (
                                            <div className="mega-item-desc truncate mt-0.5">
                                              {subItem.description}
                                            </div>
                                          )}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Column 2: Process Improvement Training Courses */}
                                  <div>
                                    <div className="mega-col-header">
                                      <div className="w-6 h-6 rounded-md bg-blue-50 border border-blue-100/80 flex items-center justify-center shrink-0 text-blue-600">
                                        <TrendingUp className="w-3.5 h-3.5" />
                                      </div>
                                      <div className="flex-1 flex items-center justify-between gap-1 min-w-0">
                                        <Link
                                          href={item.categories[1].href}
                                          onClick={() => setActiveDropdown(null)}
                                          className="mega-col-title hover:text-[#FF5E14] transition-colors"
                                          title={item.categories[1].title}
                                        >
                                          {item.categories[1].title}
                                        </Link>
                                        <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100/80 text-blue-600 shrink-0">
                                          {item.categories[1].items.length}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="space-y-1 max-h-[310px] overflow-y-auto pr-1.5 custom-menu-scrollbar">
                                      {item.categories[1].items.map((subItem) => (
                                        <Link
                                          key={subItem.title}
                                          href={subItem.href}
                                          onClick={() => setActiveDropdown(null)}
                                          className="block px-2 py-1 rounded-lg hover:bg-blue-50/60 transition-colors group/sub"
                                          title={subItem.title}
                                        >
                                          <div className="mega-item-title group-hover/sub:text-[#FF5E14] truncate">
                                            {subItem.title}
                                          </div>
                                          {subItem.description && (
                                            <div className="mega-item-desc truncate mt-0.5">
                                              {subItem.description}
                                            </div>
                                          )}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Column 3: Strategic Management and Training Consultants */}
                                  <div>
                                    <div className="mega-col-header">
                                      <div className="w-6 h-6 rounded-md bg-purple-50 border border-purple-100/80 flex items-center justify-center shrink-0 text-purple-600">
                                        <Target className="w-3.5 h-3.5" />
                                      </div>
                                      <div className="flex-1 flex items-center justify-between gap-1 min-w-0">
                                        <Link
                                          href={item.categories[2].href}
                                          onClick={() => setActiveDropdown(null)}
                                          className="mega-col-title hover:text-[#FF5E14] transition-colors"
                                          title={item.categories[2].title}
                                        >
                                          {item.categories[2].title}
                                        </Link>
                                        <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded-full bg-purple-100/80 text-purple-600 shrink-0">
                                          {item.categories[2].items.length}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="space-y-1 max-h-[310px] overflow-y-auto pr-1.5 custom-menu-scrollbar">
                                      {item.categories[2].items.map((subItem) => (
                                        <Link
                                          key={subItem.title}
                                          href={subItem.href}
                                          onClick={() => setActiveDropdown(null)}
                                          className="block px-2 py-1 rounded-lg hover:bg-purple-50/60 transition-colors group/sub"
                                          title={subItem.title}
                                        >
                                          <div className="mega-item-title group-hover/sub:text-[#FF5E14] truncate">
                                            {subItem.title}
                                          </div>
                                          {subItem.description && (
                                            <div className="mega-item-desc truncate mt-0.5">
                                              {subItem.description}
                                            </div>
                                          )}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Column 4: Behavioural Training */}
                                  <div>
                                    <div className="mega-col-header">
                                      <div className="w-6 h-6 rounded-md bg-emerald-50 border border-emerald-100/80 flex items-center justify-center shrink-0 text-emerald-600">
                                        <Users className="w-3.5 h-3.5" />
                                      </div>
                                      <div className="flex-1 flex items-center justify-between gap-1 min-w-0">
                                        <Link
                                          href={item.categories[3].href}
                                          onClick={() => setActiveDropdown(null)}
                                          className="mega-col-title hover:text-[#FF5E14] transition-colors"
                                          title={item.categories[3].title}
                                        >
                                          {item.categories[3].title}
                                        </Link>
                                        <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100/80 text-emerald-600 shrink-0">
                                          {item.categories[3].items.length}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="space-y-1 max-h-[310px] overflow-y-auto pr-1.5 custom-menu-scrollbar">
                                      {item.categories[3].items.map((subItem) => (
                                        <Link
                                          key={subItem.title}
                                          href={subItem.href}
                                          onClick={() => setActiveDropdown(null)}
                                          className="block px-2 py-1 rounded-lg hover:bg-emerald-50/60 transition-colors group/sub"
                                          title={subItem.title}
                                        >
                                          <div className="mega-item-title group-hover/sub:text-[#FF5E14] truncate">
                                            {subItem.title}
                                          </div>
                                          {subItem.description && (
                                            <div className="mega-item-desc truncate mt-0.5">
                                              {subItem.description}
                                            </div>
                                          )}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Bottom Corporate Inquiry Bar */}
                              <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                                <span className="mega-footer-note flex items-center gap-1.5">
                                  <GraduationCap className="w-4 h-4 text-[#FF5E14]" />
                                  <span>Inquire for customized on-site corporate training batches & workshops</span>
                                </span>
                                <button
                                  onClick={() => {
                                    setActiveDropdown(null);
                                    openContactModal("Corporate Training Inquiry");
                                  }}
                                  className="mega-action-btn"
                                >
                                  <span>Inquire Now</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
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
                    className="flex items-center justify-center px-3 sm:px-3.5 lg:px-4 bg-[#ffc001] hover:bg-[#e6ad00] text-[#001659] font-semibold text-[12px] sm:text-[12.5px] lg:text-[13px] tracking-normal transition-all active:scale-[0.99] focus:outline-none whitespace-nowrap cursor-pointer"
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
