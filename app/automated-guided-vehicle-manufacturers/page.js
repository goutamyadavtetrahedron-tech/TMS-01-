"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import styles from "./style.module.css";
import ContactFormModal from "@/components/ContactFormModal";

// Import all new components
import HeroSection from "./components/HeroSection";
import HeavyDutyAGV from "./components/HeavyDutyAGV";
import TetrahedronAMRs from "./components/TetrahedronAMRs";
import HeavyDutyRGV from "./components/HeavyDutyRGV";
import CleaningRobot from "./components/CleaningRobot";
import TracklessFlatCars from "./components/TracklessFlatCars";
import AGVsInAction from "./components/AGVsInAction";
import SolutionsForEveryMove from "./components/SolutionsForEveryMove";
import NavigationTypes from "./components/NavigationTypes";
import NavigationTechnologies from "./components/NavigationTechnologies";
import ChargerTypes from "./components/ChargerTypes";
import ServingIndustries from "./components/ServingIndustries";
import MajorClients from "./components/MajorClients";
import Certificates from "./components/Certificates";
import FAQsAndRelated from "./components/FAQsAndRelated";

import "animate.css"; // Required for wowjs animations

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalButtonText, setModalButtonText] = useState("");

  useEffect(() => {
    // Initialize wowjs only on the client side
    if (typeof window !== "undefined") {
      const WOW = require("wowjs");
      new WOW.WOW({
        live: false,
        mobile: true
      }).init();
    }
  }, []);

  const openModal = (buttonText) => {
    setModalButtonText(buttonText);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalButtonText("");
  };

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <HeroSection onExplore={() => openModal("Contact Us")} />
        <HeavyDutyAGV />
        <TetrahedronAMRs />
        <HeavyDutyRGV />
        <TracklessFlatCars />
        <CleaningRobot />
        <AGVsInAction />
        <SolutionsForEveryMove />
        <NavigationTypes />
        <NavigationTechnologies />
        <ChargerTypes />
        <ServingIndustries />
        <MajorClients />
        <Certificates />
        <FAQsAndRelated />
      </div>

      <ContactFormModal
        open={isModalOpen}
        onClose={closeModal}
        buttonText={modalButtonText || 'Contact Us'}
      />
    </Layout>
  );
}