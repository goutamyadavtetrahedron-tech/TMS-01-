"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  X,
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  Search,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { contactInfo } from "./navigationData";

export default function MobileDrawer({
  isOpen,
  onClose,
  navigationData,
  onOpenContactModal,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSection, setExpandedSection] = useState(null);
  const [expandedSubCategory, setExpandedSubCategory] = useState(null);

  // Close drawer on Escape & lock body scroll
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setExpandedSection(null);
      setExpandedSubCategory(null);
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  const toggleSection = (title) => {
    setExpandedSection(expandedSection === title ? null : title);
    setExpandedSubCategory(null);
  };

  const toggleSubCategory = (catTitle) => {
    setExpandedSubCategory(expandedSubCategory === catTitle ? null : catTitle);
  };

  // Flatten all searchable items for instant live search
  const searchableItems = useMemo(() => {
    const list = [];
    navigationData.forEach((nav) => {
      if (!nav.children && !nav.categories) {
        list.push({ title: nav.title, href: nav.href, category: "Navigation" });
      }
      if (nav.children) {
        nav.children.forEach((c) => {
          list.push({
            title: c.title,
            href: c.href,
            description: c.description,
            category: nav.title,
          });
          if (c.subChildren) {
            c.subChildren.forEach((sc) => {
              list.push({
                title: `${c.title}: ${sc.title}`,
                href: sc.href,
                category: nav.title,
              });
            });
          }
        });
      }
      if (nav.categories) {
        nav.categories.forEach((cat) => {
          cat.items.forEach((item) => {
            list.push({
              title: item.title,
              href: item.href,
              description: item.description,
              category: `${nav.title} • ${cat.title}`,
            });
          });
        });
      }
    });
    return list;
  }, [navigationData]);

  // Filtered search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return searchableItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q)
    );
  }, [searchQuery, searchableItems]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex justify-end font-sans">
      {/* Frosted Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Panel */}
      <aside
        className="relative z-10 w-full max-w-sm sm:max-w-md bg-white h-full shadow-2xl flex flex-col overflow-hidden text-slate-800"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-white">
          <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
            <img
              src="/assets/images/Tetrahedron Logo.png"
              alt="Tetrahedron Logo"
              className="h-9 w-auto object-contain"
            />
            <div className="h-6 w-px bg-slate-200" />
            <img
              src="/assets/images/logocertified.jpeg"
              alt="Incredible Workplaces Certified"
              className="h-8 w-auto object-contain rounded"
            />
          </Link>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Search Bar */}
        <div className="p-3 border-b border-slate-100 bg-slate-50/70">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 40+ services, courses, or standards..."
              className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF5E14] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1.5">
          {/* SEARCH RESULTS VIEW */}
          {searchQuery.trim() !== "" ? (
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                {searchResults.length} {searchResults.length === 1 ? "Result" : "Results"} Found
              </div>
              {searchResults.length > 0 ? (
                searchResults.map((res, i) => (
                  <Link
                    key={`${res.href}-${i}`}
                    href={res.href}
                    onClick={onClose}
                    className="block p-2.5 rounded-lg border border-slate-100 bg-white hover:bg-amber-50/50 hover:border-amber-200 transition-all group"
                  >
                    <div className="text-[10px] uppercase font-bold text-[#FF5E14] tracking-wide mb-0.5">
                      {res.category}
                    </div>
                    <div className="text-xs font-bold text-[#001659] group-hover:text-[#FF5E14] leading-snug">
                      {res.title}
                    </div>
                    {res.description && (
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {res.description}
                      </p>
                    )}
                  </Link>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No services or courses matching &quot;{searchQuery}&quot;.
                </div>
              )}
            </div>
          ) : (
            /* ACCORDION NAVIGATION TREE */
            navigationData.map((item) => {
              const hasSubmenu = item.children || item.isMegaMenu;
              const isSectionOpen = expandedSection === item.title;

              if (!hasSubmenu) {
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between px-3.5 py-3 rounded-lg text-[14.5px] font-bold text-[#001659] hover:text-[#FF5E14] hover:bg-slate-50 transition-colors"
                  >
                    <span>{item.title}</span>
                    <ArrowRight className="w-4 h-4 text-slate-300" />
                  </Link>
                );
              }

              return (
                <div key={item.title} className="rounded-lg border border-slate-200/80 overflow-hidden bg-white">
                  <button
                    onClick={() => toggleSection(item.title)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 text-[14.5px] font-bold transition-colors ${
                      isSectionOpen
                        ? "bg-[#001659] text-white"
                        : "text-[#001659] hover:bg-slate-50"
                    }`}
                  >
                    <span>{item.title}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isSectionOpen ? "rotate-180 text-[#ffc001]" : "text-slate-400"
                      }`}
                    />
                  </button>

                  {isSectionOpen && (
                    <div className="p-2 space-y-2 bg-slate-50 border-t border-slate-200">
                      {/* Standard Dropdown (About Us) */}
                      {item.children && (
                        <div className="space-y-1">
                          {item.children.map((child) => (
                            <div key={child.title} className="bg-white rounded-md border border-slate-200/70 p-1">
                              <Link
                                href={child.href}
                                onClick={onClose}
                                className="block p-2 text-xs font-bold text-[#001659] hover:text-[#FF5E14]"
                              >
                                {child.title}
                                {child.description && (
                                  <p className="text-[11px] font-normal text-slate-500 mt-0.5">
                                    {child.description}
                                  </p>
                                )}
                              </Link>
                              {child.subChildren && (
                                <div className="ml-3 pl-2 border-l border-slate-200 py-1 space-y-1">
                                  {child.subChildren.map((sub) => (
                                    <Link
                                      key={sub.title}
                                      href={sub.href}
                                      onClick={onClose}
                                      className="block px-2 py-1 text-xs text-slate-600 hover:text-[#FF5E14] font-medium"
                                    >
                                      {sub.title}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* MegaMenu (Consulting & Skill Training) */}
                      {item.isMegaMenu && item.categories && (
                        <div className="space-y-2">
                          {item.categories.map((cat) => {
                            const isCatOpen = expandedSubCategory === cat.title;
                            return (
                              <div
                                key={cat.title}
                                className="bg-white rounded-md border border-slate-200/80 overflow-hidden"
                              >
                                <button
                                  onClick={() => toggleSubCategory(cat.title)}
                                  className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold text-[#001659] hover:bg-slate-50"
                                >
                                  <span>{cat.title}</span>
                                  <ChevronRight
                                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                                      isCatOpen ? "rotate-90 text-[#FF5E14]" : ""
                                    }`}
                                  />
                                </button>

                                {isCatOpen && (
                                  <div className="px-3 pb-2 pt-1 border-t border-slate-100 space-y-1 bg-slate-50/50">
                                    {cat.items.map((subItem) => (
                                      <Link
                                        key={subItem.title}
                                        href={subItem.href}
                                        onClick={onClose}
                                        className="block py-1.5 px-2 rounded text-xs text-slate-700 hover:text-[#FF5E14] hover:bg-amber-50/60 font-medium"
                                      >
                                        <div className="font-semibold text-slate-800">
                                          {subItem.title}
                                        </div>
                                        {subItem.description && (
                                          <div className="text-[10.5px] text-slate-500 font-normal">
                                            {subItem.description}
                                          </div>
                                        )}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Pinned Bottom Quick Actions */}
        <div className="p-4 border-t border-slate-200 bg-white space-y-2.5">
          <button
            onClick={() => {
              onClose();
              if (onOpenContactModal) {
                onOpenContactModal("Quick Support");
              }
            }}
            className="w-full py-3 px-4 bg-[#ffc001] hover:bg-[#e6ad00] text-[#001659] font-bold rounded-lg shadow-sm text-sm flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <span>Quick Support</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <a
              href={`tel:${contactInfo.phone}`}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-slate-50 border border-slate-200 text-[#001659] font-bold hover:text-[#FF5E14]"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF5E14]" />
              <span>Call Us</span>
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-slate-50 border border-slate-200 text-[#001659] font-bold hover:text-[#FF5E14]"
            >
              <Mail className="w-3.5 h-3.5 text-[#FF5E14]" />
              <span>Email Us</span>
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
