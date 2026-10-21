"use client";

import React, { useState } from "react";
import ModernLayout from "@/components/layout/ModernLayout";
import VideoMeetingModal from "./components/VideoMeetingModal";

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
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [modalTopic, setModalTopic] = useState("Full-Scale Dojo Setup (600–2,000 sq.ft)");

  const handleOpenVideoModal = (topic = "Full-Scale Dojo Setup (600–2,000 sq.ft)") => {
    setModalTopic(topic);
    setIsVideoModalOpen(true);
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  return (
    <ModernLayout>
      <div className="modern-page dojo-page-root bg-white text-slate-800 antialiased selection:bg-[#ff5722] selection:text-white">
        {/* 1. Viewport-Fitted Hero with Integrated Quick Stats */}
        <HeroSection onOpenVideoModal={handleOpenVideoModal} />

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
        <BottomCTA onOpenVideoModal={handleOpenVideoModal} />

        {/* Streamlined 2-Step Video Meeting Scheduler Modal */}
        <VideoMeetingModal
          open={isVideoModalOpen}
          onClose={handleCloseVideoModal}
          defaultTopic={modalTopic}
        />
      </div>
    </ModernLayout>
  );
}
