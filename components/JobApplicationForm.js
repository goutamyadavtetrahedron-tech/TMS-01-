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
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState({ open: false, message: "", success: false });
  const [loading, setLoading] = useState(false);

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    color: "#000000",
    fontSize: "14px",
    outline: "none",
  };

  const submitButtonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#ff6600",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: loading ? "not-allowed" : "pointer",
    transition: "background 0.3s ease",
    opacity: loading ? 0.7 : 1,
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
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: buttonText }),
      });
      if (res.ok) {
        setModal({ open: true, message: "Application submitted successfully!", success: true });
        setFormData({ name: "", email: "", mobile: "", linkedin: "", coverLetter: "" });
        if (onSuccess) onSuccess();
        setTimeout(() => {
          router.push("/thankyou");
        }, 1500);
      } else {
        setModal({ open: true, message: "Failed to submit application.", success: false });
        if (onError) onError();
      }
    } catch (err) {
      setModal({ open: true, message: "Failed to submit application.", success: false });
      if (onError) onError();
    }
    setLoading(false);
    setTimeout(() => setModal({ ...modal, open: false }), 3000);
  };

  return (
    <div>
      <form onSubmit={handleSubmitForm} style={{ padding: '30px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', border: '1px solid #e0e0e0', background: '#fff', maxWidth: '100%', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '22px', color: '#333' }}>Apply for {buttonText}</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Full Name*"
          required
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email*"
          required
          style={{
            ...inputStyle,
            border: errors.email ? "1px solid red" : inputStyle.border,
          }}
        />
        <input
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleInputChange}
          placeholder="Mobile No.*"
          required
          style={inputStyle}
        />
        <input
          type="url"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleInputChange}
          placeholder="LinkedIn Profile URL"
          style={inputStyle}
        />
        <textarea
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleInputChange}
          placeholder="Why should we hire you?*"
          rows={4}
          required
          style={{ ...inputStyle, resize: "none" }}
        ></textarea>
        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <button type="submit" style={submitButtonStyle} disabled={loading}>
            {loading ? "Submitting..." : `Apply Now`}
          </button>
        </div>
        {modal.open && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}>
            <div
              style={{
                background: "#fff",
                padding: "32px 48px",
                borderRadius: "16px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                textAlign: "center",
                minWidth: "220px",
                maxWidth: "90vw",
                fontSize: "18px",
                color: modal.success ? "green" : "red",
                fontWeight: "bold",
                position: "relative",
                zIndex: 11,
              }}
            >
              {modal.message}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
