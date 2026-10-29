"use client";

import React, { useState, useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import ModernLayout from "@/components/layout/ModernLayout";
import DownloadBrochureModal from "./components/DownloadBrochureModal";
import SilentMeetingPopup from "./components/SilentMeetingPopup";

// Modular High-Craft Components
import HeroSection from "./components/HeroSection";
import DojoDefinition from "./components/DojoDefinition";
import WhyChooseTetrahedron from "./components/WhyChooseTetrahedron";
import TenLevelsDojo from "./components/TenLevelsDojo";
import HardwareCatalog from "./components/HardwareCatalog";
import DojoSetupJourney from "./components/DojoSetupJourney";
import EmpoweringTeamsSection from "./components/EmpoweringTeamsSection";
import FAQSection from "./components/FAQSection";
import BottomCTA from "./components/BottomCTA";

export default function DojoTrainingCenterNewPage() {
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

  useEffect(() => {
    (async function initCal() {
      try {
        const cal = await getCalApi({ namespace: "dojo" });
        if (cal) {
          cal("ui", {
            theme: "light",
            styles: {
              branding: {
                brandColor: "#ff5722",
              },
            },
            hideEventTypeDetails: false,
            layout: "month_view",
          });

          // Preload modal in background for instant 0ms opening
          cal("preload", {
            calLink: "tetrahedron/dojo",
            type: "modal",
          });
        }
      } catch (err) {
        console.error("Cal.com initialization error:", err);
      }
    })();

    // Observe body for cal-modal-box to make backdrop translucent and prevent duplicate modals
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeName === "CAL-MODAL-BOX") {
            // Remove any accidental duplicate modal boxes to completely eliminate stuck loaders
            const allModals = document.querySelectorAll("cal-modal-box");
            if (allModals.length > 1) {
              for (let i = 0; i < allModals.length - 1; i++) {
                allModals[i].remove();
              }
            }

            // Inject custom translucent backdrop & polished styles into ShadowRoot
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
    // Fallback if embed is blocked or uninitialized
    window.open("https://cal.com/tetrahedron/dojo", "_blank", "noopener,noreferrer");
  };

  const handleOpenBrochureModal = () => {
    setIsBrochureModalOpen(true);
  };

  const handleCloseBrochureModal = () => {
    setIsBrochureModalOpen(false);
  };

  return (
    <ModernLayout>
      <div className="modern-page dojo-page-root bg-white text-slate-800 antialiased selection:bg-[#ff5722] selection:text-white">
        {/* 1. Viewport-Fitted Hero with Real Gurukul Dojo Visual & Integrated Actions */}
        <HeroSection
          onOpenVideoModal={handleOpenVideoModal}
          onOpenBrochureModal={handleOpenBrochureModal}
        />

        {/* 2. DOJO Training Center Definition & Classroom vs. Dojo Hands-On Comparison */}
        <DojoDefinition onOpenVideoModal={handleOpenVideoModal} />

        {/* 3. Why Choose Tetrahedron: 13 Turnkey Capabilities & DOJO 2.0 Dashboards Spotlight */}
        <WhyChooseTetrahedron onOpenVideoModal={handleOpenVideoModal} />

        {/* 4. 10 Levels of DOJO: Progressive Skilling & Competency Ladder */}
        <TenLevelsDojo />

        {/* 5. Industrial Training Simulations We Develop */}
        <HardwareCatalog onOpenVideoModal={handleOpenVideoModal} />

        {/* 6. Setting Up Your DOJO: 8-Step Simple Journey with Floorplan Showcase */}
        <DojoSetupJourney onOpenVideoModal={handleOpenVideoModal} />

        {/* 7. Client Showcase: Empowering Teams Across Industries */}
        <EmpoweringTeamsSection />

        {/* 8. Harmonized Essential FAQs (Curated Top 6 Questions) */}
        <FAQSection />

        {/* 9. Ready to Build High-Impact DOJO Training Center CTA */}
        <BottomCTA
          onOpenVideoModal={handleOpenVideoModal}
          onOpenBrochureModal={handleOpenBrochureModal}
        />

        {/* Silent Floating Pop Up from Below (Centered) */}
        <SilentMeetingPopup onOpenVideoModal={handleOpenVideoModal} />

        {/* Download Technical Brochure Modal */}
        <DownloadBrochureModal
          open={isBrochureModalOpen}
          onClose={handleCloseBrochureModal}
          onOpenVideoModal={handleOpenVideoModal}
        />
      </div>
    </ModernLayout>
  );
}
