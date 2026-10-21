"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Calendar,
  Clock,
  Video,
  Building2,
  User,
  Briefcase,
  Mail,
  Phone,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

export default function VideoMeetingModal({ open, onClose, defaultTopic = "" }) {
  const backdropRef = useRef(null);

  // Form Steps: 1 = Date & Slot, 2 = Details & Designation, 3 = Success
  const [step, setStep] = useState(1);

  // Form Data
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("11:30 AM - 12:00 PM");
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    email: "",
    mobile: "",
    company: "",
    plantLocation: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Available Slots
  const slots = [
    "10:00 AM - 10:30 AM",
    "11:30 AM - 12:00 PM",
    "02:30 PM - 03:00 PM",
    "04:00 PM - 04:30 PM",
    "05:30 PM - 06:00 PM",
  ];

  // Generate next 6 business days (Mon - Sat)
  const getUpcomingDays = () => {
    const days = [];
    let date = new Date();
    while (days.length < 6) {
      date.setDate(date.getDate() + 1);
      const dayOfWeek = date.getDay();
      if (dayOfWeek !== 0) {
        // Exclude Sundays
        const formatted = date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        });
        const iso = date.toISOString().split("T")[0];
        days.push({ label: formatted, value: iso });
      }
    }
    return days;
  };

  const [availableDays, setAvailableDays] = useState([]);

  useEffect(() => {
    const days = getUpcomingDays();
    setAvailableDays(days);
    if (days.length > 0 && !selectedDate) {
      setSelectedDate(days[0].value);
    }
  }, []);

  useEffect(() => {
    if (!open) {
      setStep(1);
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

  const validateStep2 = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.designation.trim()) errs.designation = "Designation / Job role is required";
    if (!formData.email.trim()) {
      errs.email = "Business email is required";
    } else if (formData.email.endsWith("@gmail.com")) {
      errs.email = "Please use your official company/work email";
    }
    if (!formData.mobile.trim() || formData.mobile.length < 10) {
      errs.mobile = "Valid 10-digit mobile number is required";
    }
    if (!formData.company.trim()) errs.company = "Company name is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        company: formData.company,
        designation: formData.designation,
        requirements: `[VIRTUAL MEETING REQUEST] Date: ${selectedDate} | Slot: ${selectedSlot} | Designation: ${formData.designation} | Plant Location: ${formData.plantLocation || "N/A"}${defaultTopic ? ` | Context: ${defaultTopic}` : ""}`,
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
        pagePath: "/dojo-training-center-new",
        pageTitle: "Dojo Virtual Meeting Request",
        submissionTime: new Date().toISOString(),
      };

      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setStep(3); // Success screen
    } catch (err) {
      setErrors({ form: "Network error. Please try again." });
    }
    setLoading(false);
  };

  // Google Calendar Link generator
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Tetrahedron Dojo Training Center Virtual Meeting`);
    const details = encodeURIComponent(
      `Virtual Meeting with Tetrahedron Principal Dojo Architects.\n\nAttendee: ${formData.name} (${formData.designation})\nCompany: ${formData.company}\nPlatform: Google Meet / MS Teams link will be shared via email.`
    );
    const location = encodeURIComponent("Google Meet / MS Teams (Link will be emailed)");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="dojo-modal-root dojo-page-root fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn"
      style={{ fontFamily: "var(--font-poppins, 'Poppins', sans-serif)" }}
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Compact, Modern Header */}
        <div className="px-5 py-3.5 bg-[#001730] text-white flex items-center justify-between shrink-0 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#ff5722] flex items-center justify-center text-white shrink-0 shadow-sm">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[13px] sm:text-sm font-bold text-white leading-tight">
                Book a Virtual Meeting
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-300 mt-0.5 leading-tight">
                1-on-1 with Principal Dojo Architects • Meet / Teams
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Crisp 2-Step Progress Indicator */}
        {step < 3 && (
          <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] font-medium shrink-0">
            <div
              className={`flex items-center gap-1.5 ${
                step === 1 ? "text-[#ff5722] font-bold" : "text-emerald-600 font-semibold"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                  step === 1 ? "bg-[#ff5722] text-white" : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {step > 1 ? "✓" : "1"}
              </span>
              <span>1. Date & Slot</span>
            </div>
            <span className="text-slate-300">────────</span>
            <div
              className={`flex items-center gap-1.5 ${
                step === 2 ? "text-[#ff5722] font-bold" : "text-slate-400"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                  step === 2 ? "bg-[#ff5722] text-white" : "bg-slate-200 text-slate-600"
                }`}
              >
                2
              </span>
              <span>2. Your Details & Designation</span>
            </div>
          </div>
        )}

        {/* Body Content */}
        <div className="p-4 sm:p-5">
          {/* STEP 1: DATE & TIME PICKER */}
          {step === 1 && (
            <div className="space-y-3.5">
              <div>
                <div className="text-[13px] sm:text-sm font-bold text-slate-900 leading-snug">
                  Select Your Preferred Date & Slot
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Choose a convenient 30-minute window for your virtual consultation with our lead Dojo architects.
                </div>
              </div>

              {/* Day Selector */}
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  1. Pick a Day:
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {availableDays.map((d, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedDate(d.value)}
                      className={`p-2 rounded-xl text-center border text-[11px] font-bold transition-all cursor-pointer ${
                        selectedDate === d.value
                          ? "bg-[#001730] text-white border-[#001730] shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span className="block text-[9px] opacity-75 font-normal">
                        {d.label.split(" ")[0]}
                      </span>
                      <span>{d.label.split(" ").slice(1).join(" ")}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slot Selector */}
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  2. Pick a Time Window (IST):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {slots.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedSlot(s)}
                      className={`p-2 rounded-xl text-left border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        selectedSlot === s
                          ? "border-[#ff5722] bg-orange-50 text-[#ff5722] font-bold ring-1 ring-[#ff5722]"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 opacity-70" />
                        <span>{s}</span>
                      </span>
                      {selectedSlot === s && <CheckCircle2 className="w-3.5 h-3.5 text-[#ff5722]" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#ff5722] to-[#ff6f00] hover:from-[#f4511e] hover:to-[#ff5722] text-white text-xs font-semibold shadow-md shadow-orange-950/20 hover:shadow-orange-900/40 hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <span>Select Date & Time</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DETAILS & DESIGNATION */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <div className="text-[13px] sm:text-sm font-bold text-slate-900 leading-snug">
                  Where should we send the calendar invitation?
                </div>
                <div className="mt-1 p-2 rounded-xl bg-orange-50/80 border border-orange-200/60 text-xs text-slate-700 flex items-center justify-between">
                  <span>
                    📅 <strong>{selectedDate}</strong> at <strong>{selectedSlot}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[#ff5722] font-bold text-xs hover:underline cursor-pointer"
                  >
                    Change
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:border-[#ff5722] focus:ring-1 focus:ring-[#ff5722] outline-none"
                  />
                  {errors.name && <span className="text-[10px] text-red-500 block mt-0.5">{errors.name}</span>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                    Your Designation / Role *
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    placeholder="e.g. Plant Head, VP Operations, Quality Lead"
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:border-[#ff5722] focus:ring-1 focus:ring-[#ff5722] outline-none"
                  />
                  {errors.designation && (
                    <span className="text-[10px] text-red-500 block mt-0.5">{errors.designation}</span>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                    Official Work Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="rajesh@company.com"
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:border-[#ff5722] focus:ring-1 focus:ring-[#ff5722] outline-none"
                  />
                  {errors.email && <span className="text-[10px] text-red-500 block mt-0.5">{errors.email}</span>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                    Mobile / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:border-[#ff5722] focus:ring-1 focus:ring-[#ff5722] outline-none"
                  />
                  {errors.mobile && <span className="text-[10px] text-red-500 block mt-0.5">{errors.mobile}</span>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="e.g. Tata Motors, Bosch, Maruti"
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:border-[#ff5722] focus:ring-1 focus:ring-[#ff5722] outline-none"
                  />
                  {errors.company && <span className="text-[10px] text-red-500 block mt-0.5">{errors.company}</span>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                    Plant Location / City (Optional)
                  </label>
                  <input
                    type="text"
                    name="plantLocation"
                    value={formData.plantLocation}
                    onChange={handleInputChange}
                    placeholder="e.g. Pune, Manesar, Chennai, Sanand"
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:border-[#ff5722] focus:ring-1 focus:ring-[#ff5722] outline-none"
                  />
                </div>
              </div>

              {errors.form && (
                <div className="text-xs text-red-600 bg-red-50 p-2 rounded-lg">{errors.form}</div>
              )}

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Slots</span>
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#ff5722] to-[#ff6f00] hover:from-[#f4511e] hover:to-[#ff5722] text-white text-xs font-semibold shadow-md shadow-orange-950/20 hover:shadow-orange-900/40 hover:-translate-y-0.5 transition-all cursor-pointer disabled:opacity-60"
                >
                  {loading ? (
                    <span>Scheduling Call...</span>
                  ) : (
                    <>
                      <span>Confirm & Book Virtual Meeting</span>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: SUCCESS & CALENDAR SYNC */}
          {step === 3 && (
            <div className="text-center py-4 space-y-3">
              <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-sm">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div>
                <div className="text-base font-bold text-slate-900">
                  Virtual Meeting Scheduled!
                </div>
                <div className="text-xs text-slate-600 mt-1 max-w-sm mx-auto leading-relaxed">
                  We have reserved your slot for <strong>{selectedDate}</strong> at{" "}
                  <strong>{selectedSlot}</strong>. A Google Meet / Teams invitation has been sent to{" "}
                  <strong>{formData.email}</strong>.
                </div>
              </div>

              {/* Instant Add to Calendar CTA */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm mx-auto text-left space-y-2">
                <span className="text-[10px] font-bold uppercase text-slate-700 tracking-wider block">
                  Add to Your Schedule:
                </span>
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold border border-slate-300 shadow-sm transition-all"
                >
                  <Calendar className="w-4 h-4 text-[#ff5722]" />
                  <span>Add to Google Calendar</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-7 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
