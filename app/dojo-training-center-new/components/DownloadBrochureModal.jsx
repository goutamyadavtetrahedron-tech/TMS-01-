"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Download,
  FileText,
  CheckCircle2,
  Building2,
  User,
  Mail,
  Phone,
  Briefcase,
  Calendar,
} from "lucide-react";

export default function DownloadBrochureModal({
  open,
  onClose,
  onOpenVideoModal,
}) {
  const backdropRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    email: "",
    mobile: "",
    company: "",
  });
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!open) {
      setIsSuccess(false);
      setErrors({});
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) onClose();
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.designation.trim())
      errs.designation = "Designation / Job role is required";
    if (!formData.email.trim()) {
      errs.email = "Business email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid work email address";
    }
    if (!formData.mobile.trim() || formData.mobile.replace(/\D/g, "").length < 10) {
      errs.mobile = "Valid 10-digit mobile number is required";
    }
    if (!formData.company.trim()) errs.company = "Company / Plant name is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const triggerDownload = () => {
    const brochureUrl =
      "/brochures/Tetrahedron-Dojo-Training-Center-Brochure.pdf";
    const link = document.createElement("a");
    link.href = brochureUrl;
    link.setAttribute(
      "download",
      "Tetrahedron-Dojo-Training-Center-Brochure.pdf"
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Instantly trigger PDF download with zero network delay
    triggerDownload();

    // Immediately transition to success view
    setIsSuccess(true);
  };

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="dojo-modal-root fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn"
      style={{ fontFamily: "var(--font-poppins, 'Poppins', sans-serif)" }}
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header Strip */}
        <div className="px-6 py-4.5 bg-[#001730] text-white flex items-center justify-between shrink-0 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ff5722] flex items-center justify-center text-white shrink-0 shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-white leading-tight">
                Download Dojo Training Center Brochure
              </div>
              <div className="text-xs sm:text-[13px] text-slate-300 mt-1 leading-tight flex items-center gap-2">
                <span className="inline-block px-2 py-0.5 rounded bg-white/15 text-[11px] text-orange-300 font-semibold">
                  PDF • 6 Pages
                </span>
                <span>Complete 6-Zone Blueprint &amp; Specs</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form Input Grid */}
              <div className="space-y-3.5">
                {/* Name */}
                <div>
                  <label className="block text-xs sm:text-[13px] font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full px-3.5 py-2.5 text-sm sm:text-[15px] rounded-xl border border-slate-300 focus:border-[#ff5722] focus:ring-1 focus:ring-[#ff5722] text-slate-800 placeholder:text-slate-400 outline-none transition-all"
                  />
                  {errors.name && (
                    <span className="text-xs text-red-500 block mt-1">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Grid for Email & Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs sm:text-[13px] font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>Official Work Email *</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="rajesh@company.com"
                      className="w-full px-3.5 py-2.5 text-sm sm:text-[15px] rounded-xl border border-slate-300 focus:border-[#ff5722] focus:ring-1 focus:ring-[#ff5722] text-slate-800 placeholder:text-slate-400 outline-none transition-all"
                    />
                    {errors.email && (
                      <span className="text-xs text-red-500 block mt-1">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-[13px] font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>Mobile / WhatsApp *</span>
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 text-sm sm:text-[15px] rounded-xl border border-slate-300 focus:border-[#ff5722] focus:ring-1 focus:ring-[#ff5722] text-slate-800 placeholder:text-slate-400 outline-none transition-all"
                    />
                    {errors.mobile && (
                      <span className="text-xs text-red-500 block mt-1">
                        {errors.mobile}
                      </span>
                    )}
                  </div>
                </div>

                {/* Grid for Company & Designation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs sm:text-[13px] font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>Company / Plant Name *</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="e.g. Tata Motors, Bosch, Maruti"
                      className="w-full px-3.5 py-2.5 text-sm sm:text-[15px] rounded-xl border border-slate-300 focus:border-[#ff5722] focus:ring-1 focus:ring-[#ff5722] text-slate-800 placeholder:text-slate-400 outline-none transition-all"
                    />
                    {errors.company && (
                      <span className="text-xs text-red-500 block mt-1">
                        {errors.company}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-[13px] font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      <span>Your Designation / Role *</span>
                    </label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      placeholder="e.g. Plant Head, VP Operations"
                      className="w-full px-3.5 py-2.5 text-sm sm:text-[15px] rounded-xl border border-slate-300 focus:border-[#ff5722] focus:ring-1 focus:ring-[#ff5722] text-slate-800 placeholder:text-slate-400 outline-none transition-all"
                    />
                    {errors.designation && (
                      <span className="text-xs text-red-500 block mt-1">
                        {errors.designation}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {errors.form && (
                <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg">
                  {errors.form}
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#ff5722] to-[#ff6f00] hover:from-[#f4511e] hover:to-[#ff5722] active:scale-[0.99] text-white text-sm sm:text-base font-semibold shadow-lg shadow-orange-950/20 hover:shadow-orange-900/40 hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Technical Brochure (PDF)</span>
                </button>
              </div>
            </form>
          ) : (
            /* SUCCESS VIEW */
            <div className="py-4 text-center space-y-4 animate-fadeIn">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">
                  Thank You, {formData.name || "Colleague"}!
                </h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto">
                  Your brochure is downloading automatically.
                </p>
              </div>

              {/* Fallback Download Link */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm">
                <span className="text-slate-600">
                  Did your download not start automatically?
                </span>
                <button
                  type="button"
                  onClick={triggerDownload}
                  className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-bold text-[#ff5722] hover:underline cursor-pointer block mx-auto"
                >
                  <Download className="w-4 h-4" />
                  <span>Click Here to Download Now</span>
                </button>
              </div>

              {/* Simple, Clean Next Step */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div className="text-xs sm:text-sm font-medium text-slate-600">
                  Need a custom layout for your plant?
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href="https://cal.com/tetrahedron/dojo"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onOpenVideoModal?.();
                    }}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#001730] hover:bg-[#00254d] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-orange-400" />
                    <span>Book a Virtual Meeting</span>
                  </a>

                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                  >
                    <span>Close</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
