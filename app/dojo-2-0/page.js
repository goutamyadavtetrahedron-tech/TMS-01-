"use client";

import React, { useState, useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import ModernLayout from "@/components/layout/ModernLayout";

// Modals
import DownloadBrochureModal from "./components/DownloadBrochureModal";
import SilentMeetingPopup from "./components/SilentMeetingPopup";
import ImageLightboxModal from "./components/ImageLightboxModal";

// Modular Section Components
import HeroSection from "./components/HeroSection";
import ExecutiveOverview from "./components/ExecutiveOverview";
import FourPillarsDojo2 from "./components/FourPillarsDojo2";
import WhyChooseTetrahedron from "./components/WhyChooseTetrahedron";
import ImplementationRoadmap from "./components/ImplementationRoadmap";
import EmpoweringTeamsSection from "./components/EmpoweringTeamsSection";
import FAQSection from "./components/FAQSection";
import BottomCTA from "./components/BottomCTA";

export default function Dojo2Page() {
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Initialize Cal.com Embed with custom ShadowRoot backdrop styles
  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({ namespace: "dojo" });
        if (cal) {
          cal("ui", {
            theme: "light",
            cssVarsPerTheme: {
              light: { "cal-brand": "#ff5722" },
              dark: { "cal-brand": "#ff5722" },
            },
            hideEventTypeDetails: false,
            layout: "month_view",
          });
        }
      } catch (e) {
        console.error("Cal.com init error:", e);
      }
    })();

    // MutationObserver to style Cal.com shadow root
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeName === "CAL-MODAL-BOX") {
            const allModals = document.querySelectorAll("cal-modal-box");
            if (allModals.length > 1) {
              for (let i = 0; i < allModals.length - 1; i++) {
                allModals[i].remove();
              }
            }

            const applyShadowStyles = () => {
              const shadow = node.shadowRoot;
              if (shadow && !shadow.querySelector("#tetra-cal-custom-style")) {
                const style = document.createElement("style");
                style.id = "tetra-cal-custom-style";
                style.textContent = `
                  .my-backdrop {
                    background: rgba(0, 23, 48, 0.6) !important;
                    backdrop-filter: blur(8px) !important;
                    -webkit-backdrop-filter: blur(8px) !important;
                    transition: background 0.3s ease, backdrop-filter 0.3s ease !important;
                  }
                  .modal-box {
                    max-height: 94vh !important;
                  }
                  .header {
                    top: 14px !important;
                    right: 16px !important;
                  }
                  .close {
                    font-size: 34px !important;
                    font-weight: 300 !important;
                    color: #ffffff !important;
                    opacity: 0.85 !important;
                    transition: opacity 0.2s ease, transform 0.2s ease !important;
                  }
                  .close:hover {
                    opacity: 1 !important;
                    transform: scale(1.1) !important;
                  }
                `;
                shadow.appendChild(style);
              }
            };

            applyShadowStyles();
            requestAnimationFrame(applyShadowStyles);
          }
        });
      });
    });

    observer.observe(document.body, { childList: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleOpenVideoModal = async () => {
    try {
      const cal = await getCalApi({ namespace: "dojo" });
      if (cal) {
        cal("modal", {
          calLink: "tetrahedron/dojo",
          config: {
            layout: "month_view",
            theme: "light",
          },
        });
        return;
      }
    } catch (e) {
      console.error("Cal.com modal trigger error:", e);
    }
    // Fallback if blocked
    window.open("https://cal.com/tetrahedron/dojo", "_blank", "noopener,noreferrer");
  };

  const handleOpenBrochureModal = () => {
    setIsBrochureModalOpen(true);
  };

  const handleCloseBrochureModal = () => {
    setIsBrochureModalOpen(false);
  };

  const handleOpenLightbox = (imgSrc) => {
    setLightboxImage(imgSrc);
  };

  const handleCloseLightbox = () => {
    setLightboxImage(null);
  };

  const [activePillarTab, setActivePillarTab] = useState(0);

  const handlePillarSelect = (index) => {
    setActivePillarTab(index);
    const el = document.getElementById("dojo-pillars");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ModernLayout>
      <div className="modern-page dojo-page-root dojo-2-page-root bg-white text-slate-800 antialiased selection:bg-[#ff5722] selection:text-white">
        {/* 1. Viewport-Fitted Hero with Background Graphic & Dual Actions */}
        <HeroSection
          onOpenVideoModal={handleOpenVideoModal}
          onOpenBrochureModal={handleOpenBrochureModal}
          onSelectPillar={handlePillarSelect}
        />

        {/* 2. Executive Overview & Methodology: The Shift to Phygital Ecosystem */}
        <ExecutiveOverview />

        {/* 3. The 4 Core Pillars of DOJO 2.0: Interactive 4-Tab Interface */}
        <FourPillarsDojo2
          onOpenVideoModal={handleOpenVideoModal}
          activeTab={activePillarTab}
          onTabChange={setActivePillarTab}
        />

        {/* 4. Why Partner with Tetrahedron: 13 Turnkey Capabilities & Advantage Capstone */}
        <WhyChooseTetrahedron onOpenVideoModal={handleOpenVideoModal} />

        {/* 5. Our Approach to Implementing DOJO 2.0: 6-Step Visual Stepper + Full Blueprint Lightbox */}
        <ImplementationRoadmap
          onOpenImage={handleOpenLightbox}
          onOpenVideoModal={handleOpenVideoModal}
        />

        {/* 6. Industry Leaders: Empowering Teams Across Industries */}
        <EmpoweringTeamsSection />

        {/* 7. Curated Top 8 FAQs with Minimalist Line-Divider Accordions */}
        <FAQSection />

        {/* 8. Ready to Future-Proof Your Workforce CTA */}
        <BottomCTA
          onOpenVideoModal={handleOpenVideoModal}
          onOpenBrochureModal={handleOpenBrochureModal}
        />

        {/* Floating Silent Meeting Pop-up from Below */}
        <SilentMeetingPopup onOpenVideoModal={handleOpenVideoModal} />

        {/* Technical Specification Brochure Download Modal */}
        <DownloadBrochureModal
          open={isBrochureModalOpen}
          onClose={handleCloseBrochureModal}
          onOpenVideoModal={handleOpenVideoModal}
        />

        {/* Image Zoom Lightbox Modal */}
        <ImageLightboxModal
          isOpen={!!lightboxImage}
          onClose={handleCloseLightbox}
          imageSrc={lightboxImage || ""}
          imageAlt="DOJO 2.0 Technical Architecture Diagram"
        />
      </div>
    </ModernLayout>
  );
}
