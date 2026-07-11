"use client";
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import JobApplicationModal from "@/components/JobApplicationModal";

export default function CareerPage() {
    const [selectedOption, setSelectedOption] = useState("job");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalButtonText, setModalButtonText] = useState("");

    const openModal = (buttonText) => {
        setModalButtonText(buttonText);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalButtonText("");
    };

    const images = [
        { img: "1.jpeg" }, { img: "2.jpg" }, { img: "3.jpeg" },
        { img: "4.webp" }, { img: "5.webp" }, { img: "6.webp" },
        { img: "7.jpeg" }, { img: "8.jpeg" }, { img: "9.jpeg" },
    ];

    const jobData = [
        { title: "Business Development Executive", description: "Drive growth by identifying new business opportunities, building client relationships, and closing deals." },
        { title: "Senior HR (Human Resources)", description: "Lead recruitment, employee relations, and organizational development to foster a positive workplace culture." },
        { title: "Manager", description: "Oversee daily operations, manage team performance, and ensure strategic goals are met efficiently." },
        { title: "Lean Layout Consultant", description: "Optimize facility layouts, improve process flow, and implement lean manufacturing principles." }
    ];
    const internshipData = [
        { title: "Digital Marketing Intern", description: "Assist with SEO, performance marketing campaigns, and social media management." },
        { title: "Graphic Designer Intern", description: "Create compelling visual concepts, assist with marketing materials, and support brand design initiatives." },
        { title: "ROS Engineer (Robotics)", description: "Build and optimize ROS-based control systems for robotic automation." }
    ];

    return (
      <Layout headerStyle={6} footerStyle={6}>
        {/* Banner Image */}
        <div className="career-banner">
          <img
            src="/assets/images/career/career img.webp"
            alt="Career Banner"
            style={{
              width: "100%",
              height: "300px",
              display: "block",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Heading */}
        <div
          className="section-title text-center"
          style={{}}
          ref={el => {
            if (el) {
              el.style.setProperty("display", "flex", "important");
              el.style.setProperty("justify-content", "center", "important");
              el.style.setProperty("align-items", "center", "important");
              el.style.setProperty("margin-top", "30px", "important");
              el.style.setProperty("margin-bottom", "30px", "important");
            }
          }}
        >
          <h4
            className="section-title__title"
            style={{ fontSize: "30px", margin: "0 auto" }}
          >
            Welcome to Careers at Tetrahedron
          </h4>
        </div>

        {/* Career Images Grid */}
        <div className="container">
          <div className="row">
            {images.map((item, index) => (
              <div
                key={index}
                className="col-xl-4 col-lg-4 col-md-6 col-sm-12 wow fadeInUp"
                data-wow-delay={`${100 * (index + 1)}ms`}
                style={{":hover": {borderRadius: "20px !important"}}}
                ref={el => {
                  if (el) {
                    el.style.setProperty("border-radius", "20px", "important");
                  }
                }}
              >
                <div className="services-four__single" style={{":hover": {borderRadius: "20px !important"}}}>
                  <div className="services-four__img" style={{":hover": {borderRadius: "20px !important"}}}>
                    <img
                      src={`/assets/images/career/${item.img}`}
                      alt={`Career ${index + 1}`}
                      style={{":hover": {borderRadius: "20px !important"}}}
                      ref={el => {
                        if (el) {
                          el.style.setProperty("border-radius", "20px", "important");
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions Section */}
        <div className="container text-center" style={{ fontFamily: "var(--font-poppins)", padding: "60px 20px" }}>
          <p style={{ color: "#ff6600", fontWeight: 600, fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>We&apos;re Hiring</p>
          <h3 style={{ fontSize: "32px", fontWeight: 700, color: "#1a1a2e", fontFamily: "var(--font-poppins)", marginBottom: "8px" }}>
            Open Positions
          </h3>
          <p style={{ color: "#666", fontSize: "15px", maxWidth: "500px", margin: "0 auto 36px" }}>
            Join our team and build something remarkable. Explore roles that match your passion.
          </p>

          {/* Toggle Pills */}
          <div style={{
            display: "inline-flex",
            background: "#f1f1f1",
            borderRadius: "50px",
            padding: "5px",
            gap: "4px",
            marginBottom: "48px",
          }}>
            <button
              onClick={() => setSelectedOption("job")}
              style={{
                padding: "10px 32px",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                backgroundColor: selectedOption === "job" ? "#ff6600" : "transparent",
                color: selectedOption === "job" ? "#fff" : "#555",
                border: "none",
                borderRadius: "50px",
                transition: "all 0.3s ease",
                fontFamily: "var(--font-poppins)",
                boxShadow: selectedOption === "job" ? "0 4px 12px rgba(255,102,0,0.35)" : "none",
              }}
            >
              💼 Jobs
            </button>
            <button
              onClick={() => setSelectedOption("internship")}
              style={{
                padding: "10px 32px",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                backgroundColor: selectedOption === "internship" ? "#ff6600" : "transparent",
                color: selectedOption === "internship" ? "#fff" : "#555",
                border: "none",
                borderRadius: "50px",
                transition: "all 0.3s ease",
                fontFamily: "var(--font-poppins)",
                boxShadow: selectedOption === "internship" ? "0 4px 12px rgba(255,102,0,0.35)" : "none",
              }}
            >
              🎓 Internships
            </button>
          </div>

          {/* Job & Internship Cards */}
          <div className="career-card-row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'stretch', gap: '24px', width: '100%' }}>
            {(selectedOption === "job" ? jobData : internshipData).map(
              (item, index) => (
                <div
                  key={index}
                  className="career-card-wrapper"
                  style={{ display: 'flex', flex: '1 1 280px', maxWidth: '340px' }}
                >
                  <div
                    className="career-card"
                    style={{
                      background: '#fff',
                      borderRadius: "16px",
                      border: "1px solid #eeeeee",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      boxSizing: 'border-box',
                      overflow: 'hidden',
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                      cursor: 'default',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.boxShadow = '0 12px 32px rgba(255,102,0,0.15)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
                    }}
                  >
                    {/* Top accent bar */}
                    <div style={{ width: '100%', height: '5px', background: 'linear-gradient(90deg, #ff6600, #ff9900)' }} />

                    <div style={{ padding: "24px", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1, width: '100%', boxSizing: 'border-box' }}>
                      {/* Badge */}
                      <span style={{
                        display: 'inline-block',
                        background: 'rgba(255,102,0,0.1)',
                        color: '#ff6600',
                        borderRadius: '20px',
                        padding: '3px 12px',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        marginBottom: '14px',
                      }}>
                        {selectedOption === "job" ? "Full Time" : "Internship"}
                      </span>

                      {/* Title */}
                      <h5 style={{
                        textAlign: 'left',
                        width: '100%',
                        fontFamily: "var(--font-poppins)",
                        fontSize: '17px',
                        fontWeight: 700,
                        color: '#1a1a2e',
                        margin: '0 0 10px 0',
                        lineHeight: 1.35,
                      }}>{item.title}</h5>

                      {/* Description */}
                      <p style={{
                        textAlign: 'left',
                        width: '100%',
                        fontFamily: "var(--font-poppins)",
                        fontSize: '13.5px',
                        color: '#666',
                        lineHeight: 1.6,
                        flexGrow: 1,
                        margin: '0 0 24px 0',
                      }}>{item.description}</p>

                      {/* Apply Button */}
                      <button
                        style={{
                          padding: "10px 24px",
                          background: "linear-gradient(135deg, #ff6600, #ff9900)",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: 700,
                          fontSize: '14px',
                          fontFamily: "var(--font-poppins)",
                          letterSpacing: '0.5px',
                          boxShadow: '0 4px 12px rgba(255,102,0,0.3)',
                          transition: 'opacity 0.2s ease, transform 0.2s ease',
                          width: '100%',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.opacity = '0.9';
                          e.currentTarget.style.transform = 'scale(1.02)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.opacity = '1';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                        onClick={() => openModal(item.title)}
                      >
                        Apply Now →
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          <style jsx>{`
            @media (max-width: 768px) {
              .career-card-row {
                flex-direction: column !important;
                gap: 16px !important;
              }
              .career-card-wrapper {
                max-width: 100% !important;
                flex: 1 1 100% !important;
              }
            }
          `}</style>
        </div>


        {/* TMS Work Culture Section */}
        <div
          className="container text-center"
          style={{ textAlign: "center" }}
        >
          <h4
            className="section-title__title"
            style={{ fontSize: "30px", marginBottom: "20px" }}
          >
            TMS Work Culture
          </h4>

          <div className="row align-items-center">
            <div className="col-md-6"
              ref={el => {
                if (el) {
                  el.style.setProperty("display", "flex", "important");
                  el.style.setProperty("flex-direction", "column", "important");
                  el.style.setProperty("align-items", "center", "important");
                  el.style.setProperty("justify-content", "center", "important");
                }
              }}
            >
              <img
                src="/assets/images/career/tms culture.png"
                alt="TMS Work Culture"
                style={{}}
                ref={el => {
                  if (el) {
                    el.style.setProperty("width", "70%", "important");
                    el.style.setProperty("border-radius", "10px", "important");
                    el.style.setProperty("box-shadow", "0 4px 8px rgba(0, 0, 0, 0.2)", "important");
                    el.style.setProperty("display", "block", "important");
                    el.style.setProperty("margin", "0 auto", "important");
                  }
                }}
              />
            </div>
            <div className="col-md-6"
              ref={el => {
                if (el) {
                  el.style.setProperty("display", "flex", "important");
                  el.style.setProperty("flex-direction", "column", "important");
                  el.style.setProperty("align-items", "center", "important");
                  el.style.setProperty("justify-content", "center", "important");
                }
              }}
            >
              <div
                ref={el => {
                  if (el) {
                    el.style.setProperty("text-align", "left", "important");
                    el.style.setProperty("width", "100%", "important");
                  }
                }}
              >
                <p>
                  Having a positive work culture is a must nowadays. It helps
                  employees focus and maximize productivity.
                </p>
                <p>
                  We ensure job satisfaction and encourage long-term career
                  growth.
                </p>
                <p>
                  We balance formal and informal routines to provide great
                  flexibility and support.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* TMS Values Section */}
        <div
          className="container"
          style={{ textAlign: "center", fontFamily: "var(--font-poppins)" }}
        >
          <h4
            className="section-title__title"
            style={{ fontSize: "30px", marginBottom: "20px", fontFamily: "var(--font-poppins)" }}
          >
            TMS Values
          </h4>

          <div className="row align-items-center">
            <div className="col-md-6"
              ref={el => {
                if (el) {
                  el.style.setProperty("display", "flex", "important");
                  el.style.setProperty("flex-direction", "column", "important");
                  el.style.setProperty("align-items", "center", "important");
                  el.style.setProperty("justify-content", "center", "important");
                }
              }}
            >
              <div
                ref={el => {
                  if (el) {
                    el.style.setProperty("text-align", "left", "important");
                    el.style.setProperty("width", "100%", "important");
                  }
                }}
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                <p>Our work speaks of our efforts.</p>
                <p>We believe in integrity – doing what is right.</p>
                <p>
                  We encourage teamwork and a shared business goal to build a
                  strong personality.
                </p>
              </div>
            </div>
            <div className="col-md-6"
              ref={el => {
                if (el) {
                  el.style.setProperty("display", "flex", "important");
                  el.style.setProperty("flex-direction", "column", "important");
                  el.style.setProperty("align-items", "center", "important");
                  el.style.setProperty("justify-content", "center", "important");
                }
              }}
            >
              <img
                src="/assets/images/career/tms values.png"
                alt="TMS Values"
                style={{}}
                ref={el => {
                  if (el) {
                    el.style.setProperty("width", "70%", "important");
                    el.style.setProperty("border-radius", "10px", "important");
                    el.style.setProperty("box-shadow", "0 4px 8px rgba(0, 0, 0, 0.2)", "important");
                    el.style.setProperty("display", "block", "important");
                    el.style.setProperty("margin", "0 auto", "important");
                  }
                }}
              />
            </div>
          </div>
        </div>
        {/* TMS Work Culture Section */}
        <div
          className="container"
          style={{ textAlign: "center", fontFamily: "var(--font-poppins)" }}
        >
          <h4
            className="section-title__title"
            style={{ fontSize: "30px", marginBottom: "20px", fontFamily: "var(--font-poppins)" }}
          >
            Boost Your Career
          </h4>

          <div className="row align-items-center">
            <div className="col-md-6"
              ref={el => {
                if (el) {
                  el.style.setProperty("display", "flex", "important");
                  el.style.setProperty("flex-direction", "column", "important");
                  el.style.setProperty("align-items", "center", "important");
                  el.style.setProperty("justify-content", "center", "important");
                }
              }}
            >
              <img
                src="/assets/images/career/tms culture.png"
                alt="TMS Work Culture"
                style={{}}
                ref={el => {
                  if (el) {
                    el.style.setProperty("width", "70%", "important");
                    el.style.setProperty("border-radius", "10px", "important");
                    el.style.setProperty("box-shadow", "0 4px 8px rgba(0, 0, 0, 0.2)", "important");
                    el.style.setProperty("display", "block", "important");
                    el.style.setProperty("margin", "0 auto", "important");
                  }
                }}
              />
            </div>
            <div className="col-md-6"
              ref={el => {
                if (el) {
                  el.style.setProperty("display", "flex", "important");
                  el.style.setProperty("flex-direction", "column", "important");
                  el.style.setProperty("align-items", "center", "important");
                  el.style.setProperty("justify-content", "center", "important");
                }
              }}
            >
              <div
                ref={el => {
                  if (el) {
                    el.style.setProperty("text-align", "left", "important");
                    el.style.setProperty("width", "100%", "important");
                  }
                }}
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                <p>
                  We provide opportunities to grow and learn and help you to enhance your skills. You can also take guidance from our mentors whenever you feel like.Gain exposure and boost your learning skills and experience for your better career.
                </p>
              </div>
            </div>
          </div>
        </div>

        <JobApplicationModal
          open={isModalOpen}
          onClose={closeModal}
          buttonText={modalButtonText}
        />
      </Layout>
    );
}
