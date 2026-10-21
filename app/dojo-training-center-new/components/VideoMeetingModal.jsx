"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Video,
  ExternalLink,
  Loader2,
  Calendar,
  Sparkles,
} from "lucide-react";

export default function VideoMeetingModal({
  open,
  onClose,
  defaultTopic = "Full-Scale Dojo Setup (600–2,000 sq.ft)",
}) {
  const backdropRef = useRef(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Calendly link provided by user
  const CALENDLY_BASE_URL = "https://calendly.com/kartikey-tetrahedron/new-meeting";
  // Add styling parameters to match Tetrahedron brand
  const calendlyEmbedUrl = `${CALENDLY_BASE_URL}?hide_gdpr_banner=1&primary_color=ff5722&background_color=ffffff&text_color=0f172a`;

  useEffect(() => {
    if (!open) {
      setIframeLoaded(false);
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

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="dojo-modal-root fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn"
      style={{ fontFamily: "var(--font-poppins, 'Poppins', sans-serif)" }}
    >
      <div className="relative w-full max-w-4xl h-[90vh] sm:h-[820px] max-h-[92vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header Strip */}
        <div className="px-5 py-3.5 bg-[#001730] text-white flex items-center justify-between shrink-0 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#ff5722] flex items-center justify-center text-white shrink-0 shadow-sm">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-white leading-tight flex items-center gap-2">
                <span>Book a Virtual Meeting</span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-orange-300 font-semibold border border-white/15">
                  <Sparkles className="w-3 h-3 text-[#ff5722]" />
                  Live Calendly Scheduling
                </span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5 leading-tight">
                1-on-1 with Principal Dojo Architects • Meet / Teams link generated automatically
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={CALENDLY_BASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer"
              title="Open full page in a new window"
            >
              <span className="hidden sm:inline">Open in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
            </a>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Iframe Body with Loading State */}
        <div className="relative flex-1 w-full h-full bg-slate-50 overflow-hidden">
          {!iframeLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white z-10">
              <Loader2 className="w-8 h-8 animate-spin text-[#ff5722]" />
              <p className="text-xs sm:text-sm font-semibold text-slate-600">
                Loading Calendly live scheduler...
              </p>
            </div>
          )}

          <iframe
            src={calendlyEmbedUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Schedule a Meeting with Tetrahedron"
            className={`w-full h-full border-none transition-opacity duration-300 ${
              iframeLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIframeLoaded(true)}
          />
        </div>
      </div>
    </div>
  );
}
