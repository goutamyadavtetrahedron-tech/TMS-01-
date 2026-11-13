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

  const [loading, setLoading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Reset state after transition
      const timer = setTimeout(() => {
        setDownloadSuccess(false);
        setErrorMsg("");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/send-brochure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          pageSource: "DOJO 2.0 Page (/dojo-2-0)",
          brochureName: "Tetrahedron DOJO 2.0 Technical Specification Brochure",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to process request. Please try again.");
      }

      setDownloadSuccess(true);

      // Trigger actual download of brochure PDF
      const link = document.createElement("a");
      link.href = "/brochures/Tetrahedron-Dojo-Training-Center-Brochure.pdf";
      link.download = "Tetrahedron-DOJO-2.0-Brochure.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Brochure download error:", err);
      // Fallback: trigger download directly
      const link = document.createElement("a");
      link.href = "/brochures/Tetrahedron-Dojo-Training-Center-Brochure.pdf";
      link.download = "Tetrahedron-DOJO-2.0-Brochure.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="dojo-modal-root modern-page fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#001730]/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Subtle Top Accent Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#ff5722] via-[#ff7a45] to-[#001730]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {downloadSuccess ? (
          /* Success Screen */
          <div className="p-8 sm:p-10 text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#001730] tracking-tight mb-2">
              Brochure Downloaded!
            </h3>
            <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed">
              Your official <strong className="text-slate-900">DOJO 2.0 Technical Specification Brochure</strong> has been downloaded to your device.
            </p>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mb-6 text-left">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Need immediate engineering clarification?
              </p>
              <p className="text-sm text-slate-700 mb-4">
                Discuss your plant footprint, OEM compliance timelines, and simulation hardware directly with our DOJO 2.0 Solutions Lead.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenVideoModal) onOpenVideoModal();
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#ff5722] to-[#ff6f00] hover:shadow-lg transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Virtual Meeting</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Done &amp; Close
            </button>
          </div>
        ) : (
          /* Form Screen */
          <div className="p-6 sm:p-8 lg:p-9">
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#ff5722]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold text-[#ff5722] uppercase tracking-wider">
                  Official Technical Brochure
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#001730] tracking-tight">
                  Download DOJO 2.0 Specifications
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
              Get detailed blueprints of the 4 Core Pillars, digital skill matrix architecture, hardware simulators, and ROI calculations.
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5722]/30 focus:border-[#ff5722] transition-all"
                  />
                </div>
              </div>

              {/* Work Email & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Work Email <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5722]/30 focus:border-[#ff5722] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5722]/30 focus:border-[#ff5722] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Company & Designation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Company Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Maruti / Tata Tier-1 Supplier"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5722]/30 focus:border-[#ff5722] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Job Title / Designation
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="e.g. Plant Head, VP Operations"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5722]/30 focus:border-[#ff5722] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#ff5722] to-[#ff6f00] hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-60 cursor-pointer"
                >
                  {loading ? (
                    <span>Preparing Download...</span>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download Technical Brochure (PDF)</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-400 pt-1">
                Zero spam. Strict industrial confidentiality for all inquiries.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
