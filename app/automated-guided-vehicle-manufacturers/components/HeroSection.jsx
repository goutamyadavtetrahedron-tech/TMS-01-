"use client";

import React, { useEffect } from "react";
import styles from "./HeroSection.module.css";
import ContactForm from "@/components/ContactForm";
import {
  ShieldCheck,
  Cpu,
  Settings,
  Leaf,
  Car,
  Warehouse,
  ShoppingCart,
  Factory,
  Pill,
  Utensils,
  ArrowRight
} from "lucide-react";

export default function HeroSection() {
  const features = [
    { icon: <ShieldCheck size={16} />, title: "SAFE & RELIABLE" },
    { icon: <Cpu size={16} />, title: "SMART & INTELLIGENT" },
    { icon: <Settings size={16} />, title: "FLEXIBLE & SCALABLE" },
    { icon: <Leaf size={16} />, title: "SUSTAINABLE FUTURE" },
  ];


  return (
    <section className={styles.heroWrapper}>
      {/* Background Image Container */}
      <div className={styles.bgImageContainer}>
        <img src="/assets/images/amr-agv-rgv/hero-image.png" alt="Hero Background" className={styles.bgImage} />
        <div className={styles.overlay}></div>
      </div>

      {/* Main Content */}
      <div className={styles.container}>
        <div className={styles.heroFlex}>
          <div className={`${styles.contentArea} wow animate__animated animate__fadeInLeft`}>
            <div className={styles.subheadingWrapper}>
              <span className={styles.subLine}></span>
              <span className={styles.subHeading}>SMARTER MOVEMENT. STRONGER FUTURE.</span>
            </div>

            <h1 className={styles.mainHeading}>
              <span className={styles.highlightText}> AUTONOMOUS SOLUTIONS </span> <br />
              AGV <span className={styles.highlightText}>Automated Guided Vehicles</span> <br />
              AMR <span className={styles.highlightText}>Autonomous Mobile Robots</span> <br />
              RGV <span className={styles.highlightText}>Rail Guided Vehicles</span>  <br />
              Cleaning Robots <br />
              TMS Trackless <span className={styles.highlightText}>Flat Cars</span> <br />
            </h1>

            <p className={styles.description}>
              From repetitive tasks to factory floor to activities<br />
              in steel plants, transformer manufacturing, <br />
              heavy engineering, automotive manufacturing, ports & rail factories
            </p>

            {/* Features Grid */}
            <div className={`${styles.featuresGrid} wow animate__animated animate__fadeInUp`} data-wow-delay="0.2s">
              {features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <div className={styles.featureTitle}>{feature.title}</div>
                </div>
              ))}
            </div>

            <button className={`${styles.exploreBtn} wow animate__animated animate__fadeInUp`} data-wow-delay="0.4s">
              EXPLORE SOLUTIONS <ArrowRight size={16} />
            </button>
          </div>

          <div className={`${styles.formArea} wow animate__animated animate__fadeInRight`} data-wow-delay="0.3s">
            <ContactForm buttonText="Contact Us" />
          </div>
        </div>
      </div>
    </section>
  );
}
