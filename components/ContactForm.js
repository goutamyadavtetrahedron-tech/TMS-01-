"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactForm({ onSuccess, onError, buttonText = "Submit", style = {} }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    mobile: "",
    requirements: "",
  });

  const [focusedField, setFocusedField] = useState(null);
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState({ open: false, message: "", success: false });
  const [loading, setLoading] = useState(false);

  const getFieldStyle = (fieldName) => {
    const isFocused = focusedField === fieldName;
    const hasError = !!errors[fieldName];

    return {
      width: "100%",
      padding: "12px 16px 12px 42px",
      borderRadius: "12px",
      backgroundColor: isFocused ? "#ffffff" : "#f9fafb",
      color: "#1e293b",
      fontSize: "14px",
      fontFamily: "var(--font-poppins, sans-serif)",
      border: hasError ? "1.5px solid #ef4444" : isFocused ? "1.5px solid #ff6600" : "1.5px solid #e2e8f0",
      boxShadow: isFocused ? "0 0 0 4px rgba(255, 102, 0, 0.12)" : "0 1px 2px rgba(0,0,0,0.03)",
      outline: "none",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      boxSizing: "border-box",
    };
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: null }));
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setErrors({});

    if (formData.email.endsWith("@gmail.com")) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid business email address." }));
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
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
        setModal({ open: true, message: "Thank you! Your inquiry has been submitted successfully.", success: true });
        setFormData({ name: "", company: "", email: "", mobile: "", requirements: "" });
        if (onSuccess) onSuccess();
        setTimeout(() => {
          router.push("/thankyou");
        }, 1500);
      } else {
        setModal({ open: true, message: "Failed to submit inquiry. Please try again.", success: false });
        if (onError) onError();
      }
    } catch (err) {
      setModal({ open: true, message: "An error occurred. Please check your connection.", success: false });
      if (onError) onError();
    }
    setLoading(false);
    setTimeout(() => setModal((prev) => ({ ...prev, open: false })), 4000);
  };

  // Split style into normal and !important
  const normalStyle = {};
  const importantStyles = [];
  for (const key in style) {
    const value = style[key];
    if (typeof value === "string" && value.includes("!important")) {
      importantStyles.push([key, value.replace("!important", "").trim()]);
    } else {
      normalStyle[key] = value;
    }
  }

  const topDivRef = (el) => {
    if (el) {
      importantStyles.forEach(([key, value]) => {
        const cssKey = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        el.style.setProperty(cssKey, value, "important");
      });
    }
  };

  return (
    <div style={{ width: "100%", ...normalStyle }} ref={topDivRef}>
      <form
        onSubmit={handleSubmitForm}
        style={{
          padding: "32px 28px",
          borderRadius: "20px",
          boxShadow: "0 12px 36px rgba(0,0,0,0.08)",
          border: "1px solid #eef2f6",
          background: "#ffffff",
          maxWidth: "100%",
          boxSizing: "border-box",
          position: "relative",
          overflow: "hidden",
          fontFamily: "var(--font-poppins, sans-serif)",
        }}
      >
        {/* Top Accent Gradient Line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "5px",
            background: "linear-gradient(90deg, #ff6600 0%, #ff9900 100%)",
          }}
        />

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#0f172a",
              margin: "0 0 6px 0",
              letterSpacing: "-0.3px",
            }}
          >
            Get in Touch
          </h2>
          <p style={{ fontSize: "13.5px", color: "#64748b", margin: 0, lineHeight: "1.4" }}>
            Fill out your details & our expert team will respond shortly.
          </p>
        </div>

        {/* Form Inputs with SVG Icons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* Full Name */}
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: "14px",
                top: "12px",
                color: focusedField === "name" ? "#ff6600" : "#94a3b8",
                display: "flex",
                alignItems: "center",
                pointerEvents: "none",
                transition: "color 0.2s ease",
              }}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              placeholder="Full Name *"
              required
              style={getFieldStyle("name")}
            />
          </div>

          {/* Company Name */}
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: "14px",
                top: "12px",
                color: focusedField === "company" ? "#ff6600" : "#94a3b8",
                display: "flex",
                alignItems: "center",
                pointerEvents: "none",
                transition: "color 0.2s ease",
              }}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0v-5a2 2 0 012-2h2a2 2 0 012 2v5m-4 0h4" />
              </svg>
            </span>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              onFocus={() => setFocusedField("company")}
              onBlur={() => setFocusedField(null)}
              placeholder="Company Name *"
              required
              style={getFieldStyle("company")}
            />
          </div>

          {/* Business Email */}
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: "14px",
                top: "12px",
                color: errors.email ? "#ef4444" : focusedField === "email" ? "#ff6600" : "#94a3b8",
                display: "flex",
                alignItems: "center",
                pointerEvents: "none",
                transition: "color 0.2s ease",
              }}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              placeholder="Business Email *"
              required
              style={getFieldStyle("email")}
            />
            {errors.email && (
              <p style={{ color: "#ef4444", fontSize: "12px", margin: "4px 0 0 4px", fontWeight: 500 }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Mobile No */}
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: "14px",
                top: "12px",
                color: focusedField === "mobile" ? "#ff6600" : "#94a3b8",
                display: "flex",
                alignItems: "center",
                pointerEvents: "none",
                transition: "color 0.2s ease",
              }}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </span>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              onFocus={() => setFocusedField("mobile")}
              onBlur={() => setFocusedField(null)}
              placeholder="Mobile No. *"
              required
              style={getFieldStyle("mobile")}
            />
          </div>

          {/* Requirements */}
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: "14px",
                top: "12px",
                color: focusedField === "requirements" ? "#ff6600" : "#94a3b8",
                display: "flex",
                alignItems: "center",
                pointerEvents: "none",
                transition: "color 0.2s ease",
              }}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </span>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              onFocus={() => setFocusedField("requirements")}
              onBlur={() => setFocusedField(null)}
              placeholder="Your Requirements *"
              rows={3}
              required
              style={{
                ...getFieldStyle("requirements"),
                resize: "none",
                minHeight: "85px",
              }}
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div style={{ marginTop: "22px" }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px 24px",
              background: "linear-gradient(135deg, #ff6600 0%, #ff8800 100%)",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              fontWeight: 700,
              fontSize: "15px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.25s ease",
              boxShadow: "0 4px 14px rgba(255, 102, 0, 0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              opacity: loading ? 0.8 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(-1.5px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 102, 0, 0.45)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(255, 102, 0, 0.35)";
              }
            }}
          >
            {loading ? (
              <>
                <svg
                  style={{ animation: "spin 1s linear infinite", width: "18px", height: "18px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>{buttonText}</span>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* Modal Notification Overlay */}
        {modal.open && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(15, 23, 42, 0.75)",
              backdropFilter: "blur(6px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 20,
              padding: "20px",
              boxSizing: "border-box",
              animation: "fadeIn 0.2s ease",
            }}
          >
            <div
              style={{
                background: "#ffffff",
                padding: "28px 24px",
                borderRadius: "16px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                textAlign: "center",
                maxWidth: "340px",
                width: "100%",
                boxSizing: "border-box",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: modal.success ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)",
                  color: modal.success ? "#22c55e" : "#ef4444",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                }}
              >
                {modal.success ? (
                  <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <p
                style={{
                  fontSize: "14.5px",
                  fontWeight: 600,
                  color: "#0f172a",
                  margin: "0 0 16px 0",
                  lineHeight: 1.4,
                }}
              >
                {modal.message}
              </p>
              <button
                onClick={() => setModal((prev) => ({ ...prev, open: false }))}
                style={{
                  padding: "8px 20px",
                  borderRadius: "8px",
                  background: modal.success ? "#22c55e" : "#64748b",
                  color: "#fff",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "13px",
                  cursor: "pointer",
                }}
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
