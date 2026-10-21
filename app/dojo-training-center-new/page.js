"use client";

import React, { useState } from "react";
import ModernLayout from "@/components/layout/ModernLayout";
import DownloadBrochureModal from "./components/DownloadBrochureModal";
import SilentMeetingPopup from "./components/SilentMeetingPopup";

// Modular High-Craft Components
import HeroSection from "./components/HeroSection";
import DojoFoundationStrengths from "./components/DojoFoundationStrengths";
import SixZonesBlueprint from "./components/SixZonesBlueprint";
import DojoCurriculumMatrix from "./components/DojoCurriculumMatrix";
import HardwareCatalog from "./components/HardwareCatalog";
import TurnkeyRoadmap from "./components/TurnkeyRoadmap";
import EmpoweringTeamsSection from "./components/EmpoweringTeamsSection";
import FAQSection from "./components/FAQSection";
import BottomCTA from "./components/BottomCTA";

export default function DojoTrainingCenterNewPage() {
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

  const handleOpenVideoModal = () => {
    window.open(
      "https://calendly.com/kartikey-tetrahedron/new-meeting",
      "_blank",
      "noopener,noreferrer"
    );
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
        {/* 1. Viewport-Fitted Hero with Integrated Quick Stats & Download Brochure Action */}
        <HeroSection
          onOpenVideoModal={handleOpenVideoModal}
          onOpenBrochureModal={handleOpenBrochureModal}
        />

        {/* 2. Japanese Origin, Concept & 6 Core Strengths */}
        <DojoFoundationStrengths onOpenVideoModal={handleOpenVideoModal} />

        {/* 3. The Proven 6-Zone Blueprint & Consulting Modules */}
        <SixZonesBlueprint onOpenVideoModal={handleOpenVideoModal} />

        {/* 4. Types of Skills Developed: L1–L4 Capability Matrix */}
        <DojoCurriculumMatrix />

        {/* 5. Industrial Training Simulations We Develop */}
        <HardwareCatalog onOpenVideoModal={handleOpenVideoModal} />

        {/* 6. 8-Week Setup & Implementation Roadmap */}
        <TurnkeyRoadmap onOpenVideoModal={handleOpenVideoModal} />

        {/* 7. Restored Client Showcase: Empowering Teams Across Industries */}
        <EmpoweringTeamsSection />

        {/* 8. Harmonized Master FAQs (Single Clean Accordion) */}
        <FAQSection />

        {/* 9. Final Conversion Video Consultation Banner */}
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
