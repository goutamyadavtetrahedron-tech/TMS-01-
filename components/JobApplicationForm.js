"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JobApplicationForm({ onSuccess, onError, buttonText = "Apply Now", style = {} }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    linkedin: "",
    coverLetter: "",
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
    setLoading(true);
    try {
      const payload = {
        ...formData,
        role: buttonText,
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
        pagePath: typeof window !== "undefined" ? window.location.pathname : "",
        pageTitle: typeof window !== "undefined" ? document.title : "",
        referrer: typeof window !== "undefined" ? document.referrer : "",
        submissionTime: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " (IST)",
      };

      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setModal({ open: true, message: "Application submitted successfully!", success: true });
        setFormData({ name: "", email: "", mobile: "", linkedin: "", coverLetter: "" });
        if (onSuccess) onSuccess();
        setTimeout(() => {
          router.push("/thankyou");
        }, 1500);
      } else {
        setModal({ open: true, message: "Failed to submit application. Please try again.", success: false });
        if (onError) onError();
      }
    } catch (err) {
      setModal({ open: true, message: "An error occurred. Please check your connection.", success: false });
      if (onError) onError();
    }
    setLoading(false);
    setTimeout(() => setModal((prev) => ({ ...prev, open: false })), 4000);
  };

  return (
    <div style={{ width: "100%", ...style }}>
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
        {/* Top Accent Line */}
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

        {/* Header & Role Badge */}
        <div style={{ textAlign: "center", marginBottom: "22px" }}>
          <span
            style={{
              display: "inline-block",
              background: "rgba(255, 102, 0, 0.1)",
              color: "#ff6600",
              borderRadius: "20px",
              padding: "4px 14px",
              fontSize: "11.5px",
              fontWeight: 700,
              letterSpacing: "0.8px",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            {buttonText}
          </span>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#0f172a",
              margin: 0,
              letterSpacing: "-0.3px",
            }}
          >
            Job Application
          </h2>
        </div>

        {/* Form Inputs with Icons */}
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

          {/* Email */}
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: "14px",
                top: "12px",
                color: focusedField === "email" ? "#ff6600" : "#94a3b8",
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
              placeholder="Email Address *"
              required
              style={getFieldStyle("email")}
            />
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

          {/* LinkedIn Profile */}
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: "14px",
                top: "12px",
                color: focusedField === "linkedin" ? "#ff6600" : "#94a3b8",
                display: "flex",
                alignItems: "center",
                pointerEvents: "none",
                transition: "color 0.2s ease",
              }}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </span>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleInputChange}
              onFocus={() => setFocusedField("linkedin")}
              onBlur={() => setFocusedField(null)}
              placeholder="LinkedIn Profile URL"
              style={getFieldStyle("linkedin")}
            />
          </div>

          {/* Cover Letter */}
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: "14px",
                top: "12px",
                color: focusedField === "coverLetter" ? "#ff6600" : "#94a3b8",
                display: "flex",
                alignItems: "center",
                pointerEvents: "none",
                transition: "color 0.2s ease",
              }}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </span>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              onFocus={() => setFocusedField("coverLetter")}
              onBlur={() => setFocusedField(null)}
              placeholder="Why should we hire you? *"
              rows={3}
              required
              style={{
                ...getFieldStyle("coverLetter"),
                resize: "none",
                minHeight: "90px",
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
                <span>Submitting Application...</span>
              </>
            ) : (
              <>
                <span>Submit Application</span>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* Modal Overlay */}
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
