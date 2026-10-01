"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Building2,
  Mail,
  Phone,
  IndianRupee,
  Clock,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Loader2,
  ShieldCheck,
} from "lucide-react";

export const DOJO_BUDGET_OPTIONS = [
  { value: "5 to 10 Lakh", label: "₹5 to 10 Lakh" },
  { value: "10 to 20 Lakh", label: "₹10 to 20 Lakh" },
  { value: "20 to 30 Lakh", label: "₹20 to 30 Lakh" },
  { value: "30 to 40 Lakh", label: "₹30 to 40 Lakh" },
  { value: "40 to 50 Lakh", label: "₹40 to 50 Lakh" },
  { value: "50+ Lakh", label: "₹50+ Lakh" },
];

export const DOJO_TIMELINE_OPTIONS = [
  { value: "1 to 2 months", label: "1 to 2 months" },
  { value: "2 to 3 months", label: "2 to 3 months" },
  { value: "3 to 6 months", label: "3 to 6 months" },
  { value: "6+ months", label: "6+ months" },
];

export default function DojoContactForm({
  onSuccess,
  onError,
  buttonText = "Schedule a free consultation",
  title = "Get In Touch",
  subtitle = "Specify your budget and project lead time to receive a tailored Dojo proposal.",
  badge = "DOJO INQUIRY",
  compact = false,
  style = {},
}) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    mobile: "",
    budget: "",
    timeline: "",
    requirements: "",
  });

  const [focusedField, setFocusedField] = useState(null);
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState({ open: false, message: "", success: false });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.company.trim()) newErrors.company = "Company name is required.";

    if (!formData.email.trim()) {
      newErrors.email = "Business email is required.";
    } else if (formData.email.toLowerCase().endsWith("@gmail.com")) {
      newErrors.email = "Please enter your official business email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email format.";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!/^[0-9+\-\s()]{7,16}$/.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid mobile number.";
    }

    if (!formData.budget) {
      newErrors.budget = "Please select a budget range.";
    }

    if (!formData.timeline) {
      newErrors.timeline = "Please select a project lead time.";
    }

    if (!formData.requirements.trim()) {
      newErrors.requirements = "Please briefly specify your Dojo training requirements.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        formType: "dojo",
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
        pagePath: typeof window !== "undefined" ? window.location.pathname : "",
        pageTitle: typeof window !== "undefined" ? document.title : "",
        referrer: typeof window !== "undefined" ? document.referrer : "",
        submissionTime: new Date().toISOString(),
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setModal({
          open: true,
          message: "Thank you! Your Dojo inquiry has been received. Our solutions team will contact you shortly.",
          success: true,
        });
        setFormData({
          name: "",
          company: "",
          email: "",
          mobile: "",
          budget: "",
          timeline: "",
          requirements: "",
        });
        if (onSuccess) onSuccess();
        setTimeout(() => {
          router.push("/thankyou");
        }, 1500);
      } else {
        const errorData = await res.json().catch(() => ({}));
        setModal({
          open: true,
          message: errorData.error || "Failed to submit inquiry. Please try again.",
          success: false,
        });
        if (onError) onError();
      }
    } catch (err) {
      setModal({
        open: true,
        message: "Network error occurred. Please check your connection and retry.",
        success: false,
      });
      if (onError) onError();
    } finally {
      setLoading(false);
      setTimeout(() => setModal((prev) => ({ ...prev, open: false })), 4500);
    }
  };

  const inputBaseStyle = {
    fontFamily: "var(--font-poppins, sans-serif)",
    fontSize: compact ? "13px" : "14px",
  };

  const iconColor = (fieldName) =>
    errors[fieldName]
      ? "text-red-500"
      : focusedField === fieldName
      ? "text-[#FF5E14]"
      : "text-slate-400";

  return (
    <div
      className={`w-full mx-auto relative ${compact ? "max-w-[430px]" : "max-w-[500px]"}`}
      style={style}
    >
      <form
        onSubmit={handleSubmitForm}
        noValidate
        className={`w-full bg-white rounded-2xl border border-slate-200/90 shadow-[0_12px_36px_rgba(0,22,89,0.07)] relative overflow-hidden text-left transition-all ${
          compact ? "p-5 sm:p-6" : "p-6 sm:p-8"
        }`}
      >
        {/* Top Decorative Gradient Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF5E14] via-[#ff8800] to-[#001659]" />

        {/* Header */}
        <div className={`text-center ${compact ? "mb-4" : "mb-5"}`}>
          {badge && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-orange-50 text-[#FF5E14] border border-orange-200/60 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14] animate-pulse" />
              {badge}
            </span>
          )}
          <h2
            className={`font-bold text-[#001659] tracking-tight m-0 ${
              compact ? "text-[18px] sm:text-[20px]" : "text-[21px] sm:text-[24px]"
            }`}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={`text-slate-500 mt-1 mb-0 leading-relaxed ${
                compact ? "text-[11.5px] sm:text-[12.5px]" : "text-[13px] sm:text-[14px]"
              }`}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Form Fields Stack */}
        <div className={`flex flex-col ${compact ? "gap-2.5" : "gap-3.5"}`}>
          {/* Full Name */}
          <div>
            <div className="relative">
              <span
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200 ${iconColor(
                  "name"
                )}`}
              >
                <User size={compact ? 15 : 17} strokeWidth={2} />
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                placeholder="Full Name *"
                style={inputBaseStyle}
                className={`w-full rounded-xl bg-slate-50 border transition-all duration-200 text-slate-900 placeholder:text-slate-400 outline-none ${
                  compact ? "pl-9 pr-3.5 py-2.5" : "pl-10 pr-4 py-2.5 sm:py-3"
                } ${
                  errors.name
                    ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-slate-200 focus:border-[#FF5E14] focus:bg-white focus:ring-3 focus:ring-orange-500/10 hover:border-slate-300"
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-[11px] text-red-500 font-medium mt-1 ml-1 flex items-center gap-1">
                <AlertCircle size={11} /> {errors.name}
              </p>
            )}
          </div>

          {/* Company Name */}
          <div>
            <div className="relative">
              <span
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200 ${iconColor(
                  "company"
                )}`}
              >
                <Building2 size={compact ? 15 : 17} strokeWidth={2} />
              </span>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("company")}
                onBlur={() => setFocusedField(null)}
                placeholder="Company Name *"
                style={inputBaseStyle}
                className={`w-full rounded-xl bg-slate-50 border transition-all duration-200 text-slate-900 placeholder:text-slate-400 outline-none ${
                  compact ? "pl-9 pr-3.5 py-2.5" : "pl-10 pr-4 py-2.5 sm:py-3"
                } ${
                  errors.company
                    ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-slate-200 focus:border-[#FF5E14] focus:bg-white focus:ring-3 focus:ring-orange-500/10 hover:border-slate-300"
                }`}
              />
            </div>
            {errors.company && (
              <p className="text-[11px] text-red-500 font-medium mt-1 ml-1 flex items-center gap-1">
                <AlertCircle size={11} /> {errors.company}
              </p>
            )}
          </div>

          {/* Business Email & Mobile - 2 Column on tablet+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {/* Business Email */}
            <div>
              <div className="relative">
                <span
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200 ${iconColor(
                    "email"
                  )}`}
                >
                  <Mail size={compact ? 15 : 17} strokeWidth={2} />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Business Email *"
                  style={inputBaseStyle}
                  className={`w-full rounded-xl bg-slate-50 border transition-all duration-200 text-slate-900 placeholder:text-slate-400 outline-none ${
                    compact ? "pl-9 pr-3.5 py-2.5" : "pl-10 pr-4 py-2.5 sm:py-3"
                  } ${
                    errors.email
                      ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-slate-200 focus:border-[#FF5E14] focus:bg-white focus:ring-3 focus:ring-orange-500/10 hover:border-slate-300"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-[11px] text-red-500 font-medium mt-1 ml-1 flex items-center gap-1">
                  <AlertCircle size={11} /> {errors.email}
                </p>
              )}
            </div>

            {/* Mobile No */}
            <div>
              <div className="relative">
                <span
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200 ${iconColor(
                    "mobile"
                  )}`}
                >
                  <Phone size={compact ? 15 : 17} strokeWidth={2} />
                </span>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("mobile")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Mobile No. *"
                  style={inputBaseStyle}
                  className={`w-full rounded-xl bg-slate-50 border transition-all duration-200 text-slate-900 placeholder:text-slate-400 outline-none ${
                    compact ? "pl-9 pr-3.5 py-2.5" : "pl-10 pr-4 py-2.5 sm:py-3"
                  } ${
                    errors.mobile
                      ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-slate-200 focus:border-[#FF5E14] focus:bg-white focus:ring-3 focus:ring-orange-500/10 hover:border-slate-300"
                  }`}
                />
              </div>
              {errors.mobile && (
                <p className="text-[11px] text-red-500 font-medium mt-1 ml-1 flex items-center gap-1">
                  <AlertCircle size={11} /> {errors.mobile}
                </p>
              )}
            </div>
          </div>

          {/* Budget Range & Project Timeline Selectors - 2 Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-0.5">
            {/* Budget Range Selection */}
            <div>
              <label
                className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1 ml-0.5"
                style={{ fontSize: "11px" }}
              >
                Budget Range <span className="text-[#FF5E14]">*</span>
              </label>
              <div className="relative">
                <span
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200 ${iconColor(
                    "budget"
                  )}`}
                >
                  <IndianRupee size={compact ? 14 : 16} strokeWidth={2.2} />
                </span>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("budget")}
                  onBlur={() => setFocusedField(null)}
                  style={inputBaseStyle}
                  className={`w-full rounded-xl bg-slate-50 border transition-all duration-200 text-slate-900 outline-none appearance-none cursor-pointer ${
                    compact ? "pl-9 pr-8 py-2.5" : "pl-10 pr-9 py-2.5 sm:py-3"
                  } ${!formData.budget ? "!text-slate-400" : "!text-slate-900 font-medium"} ${
                    errors.budget
                      ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-slate-200 focus:border-[#FF5E14] focus:bg-white focus:ring-3 focus:ring-orange-500/10 hover:border-slate-300"
                  }`}
                >
                  <option value="" disabled>
                    Select Budget Range
                  </option>
                  {DOJO_BUDGET_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} className="text-slate-900 py-1 font-normal">
                      {opt.label}
                    </option>
                  ))}
                </select>
                {/* Custom Chevron Arrow */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 8l4 4 4-4" />
                  </svg>
                </div>
              </div>
              {errors.budget && (
                <p className="text-[11px] text-red-500 font-medium mt-1 ml-1 flex items-center gap-1">
                  <AlertCircle size={11} /> {errors.budget}
                </p>
              )}
            </div>

            {/* Project Lead Time Selection */}
            <div>
              <label
                className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1 ml-0.5"
                style={{ fontSize: "11px" }}
              >
                Project Lead Time <span className="text-[#FF5E14]">*</span>
              </label>
              <div className="relative">
                <span
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200 ${iconColor(
                    "timeline"
                  )}`}
                >
                  <Clock size={compact ? 14 : 16} strokeWidth={2.2} />
                </span>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("timeline")}
                  onBlur={() => setFocusedField(null)}
                  style={inputBaseStyle}
                  className={`w-full rounded-xl bg-slate-50 border transition-all duration-200 text-slate-900 outline-none appearance-none cursor-pointer ${
                    compact ? "pl-9 pr-8 py-2.5" : "pl-10 pr-9 py-2.5 sm:py-3"
                  } ${!formData.timeline ? "!text-slate-400" : "!text-slate-900 font-medium"} ${
                    errors.timeline
                      ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-slate-200 focus:border-[#FF5E14] focus:bg-white focus:ring-3 focus:ring-orange-500/10 hover:border-slate-300"
                  }`}
                >
                  <option value="" disabled>
                    Select Project Lead Time
                  </option>
                  {DOJO_TIMELINE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} className="text-slate-900 py-1 font-normal">
                      {opt.label}
                    </option>
                  ))}
                </select>
                {/* Custom Chevron Arrow */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 8l4 4 4-4" />
                  </svg>
                </div>
              </div>
              {errors.timeline && (
                <p className="text-[11px] text-red-500 font-medium mt-1 ml-1 flex items-center gap-1">
                  <AlertCircle size={11} /> {errors.timeline}
                </p>
              )}
            </div>
          </div>

          {/* Requirements / Project Scope */}
          <div>
            <div className="relative">
              <span
                className={`absolute left-3.5 top-3 pointer-events-none transition-colors duration-200 ${iconColor(
                  "requirements"
                )}`}
              >
                <MessageSquare size={compact ? 15 : 17} strokeWidth={2} />
              </span>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("requirements")}
                onBlur={() => setFocusedField(null)}
                placeholder="Describe your training center requirements, plant location, or simulation modules... *"
                rows={compact ? 2 : 3}
                style={{
                  ...inputBaseStyle,
                  resize: "none",
                  minHeight: compact ? "62px" : "80px",
                }}
                className={`w-full rounded-xl bg-slate-50 border transition-all duration-200 text-slate-900 placeholder:text-slate-400 outline-none ${
                  compact ? "pl-9 pr-3.5 py-2.5" : "pl-10 pr-4 py-2.5 sm:py-3"
                } ${
                  errors.requirements
                    ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-slate-200 focus:border-[#FF5E14] focus:bg-white focus:ring-3 focus:ring-orange-500/10 hover:border-slate-300"
                }`}
              />
            </div>
            {errors.requirements && (
              <p className="text-[11px] text-red-500 font-medium mt-1 ml-1 flex items-center gap-1">
                <AlertCircle size={11} /> {errors.requirements}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className={compact ? "mt-4" : "mt-5"}>
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl font-bold text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-md ${
              loading
                ? "bg-slate-400 cursor-not-allowed opacity-80"
                : "bg-gradient-to-r from-[#FF5E14] via-[#ff6f00] to-[#e04d00] hover:shadow-orange-500/25 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            } ${compact ? "py-2.5 px-4 text-[13.5px]" : "py-3 px-6 text-[14.5px] sm:text-[15px]"}`}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin text-white" />
                <span>Submitting Your Dojo Specs...</span>
              </>
            ) : (
              <>
                <span>{buttonText}</span>
                <ArrowRight size={16} strokeWidth={2.5} />
              </>
            )}
          </button>
        </div>

        {/* Trust & Confidentiality Footer */}
        <div className="mt-3 flex items-center justify-center gap-1.5 text-center text-slate-400">
          <ShieldCheck size={13} className="text-emerald-500 flex-shrink-0" />
          <span
            className="text-[11px] leading-tight font-medium"
            style={{ fontSize: "11px" }}
          >
            NDA Protected • Response within 24 business hours
          </span>
        </div>

        {/* Submission Feedback Modal Overlay */}
        {modal.open && (
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-30 flex items-center justify-center p-4 transition-all duration-300 animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full text-center border border-slate-100">
              <div
                className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-3 ${
                  modal.success ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                }`}
              >
                {modal.success ? (
                  <CheckCircle2 size={26} strokeWidth={2.5} />
                ) : (
                  <AlertCircle size={26} strokeWidth={2.5} />
                )}
              </div>
              <h3 className="text-[16px] font-bold text-slate-900 mb-1">
                {modal.success ? "Submission Successful!" : "Submission Failed"}
              </h3>
              <p className="text-[13px] text-slate-600 leading-relaxed mb-4">
                {modal.message}
              </p>
              <button
                type="button"
                onClick={() => setModal((prev) => ({ ...prev, open: false }))}
                className="px-5 py-2 rounded-lg text-[13px] font-semibold bg-slate-800 hover:bg-slate-900 text-white transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
