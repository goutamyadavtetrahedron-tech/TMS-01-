"use client";

import React from "react";
import styles from "./CleaningRobot.module.css";
import {
  MapPin,
  Wind,
  ShieldCheck,
  BatteryCharging,
  TrendingUp,
  Leaf
} from "lucide-react";

export default function CleaningRobot() {
  const featuresLeft = [
    { icon: <MapPin size={28} />, title: "Smart Navigation" },
    { icon: <BatteryCharging size={28} />, title: "Longer Runtime" },
  ];

  const featuresCenter = [
    { icon: <Wind size={28} />, title: "Powerful Cleaning" },
    { icon: <TrendingUp size={28} />, title: "High Efficiency" },
  ];

  const featuresRight = [
    { icon: <ShieldCheck size={28} />, title: "Safe & Reliable" },
    { icon: <Leaf size={28} />, title: "Eco-Friendly" },
  ];

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        <div className={styles.contentLeft}>
          <div className={styles.titleWrapper}>
            <span className={styles.subTitle}>TMS AUTONOMOUS</span>
            <h2 className={`${styles.mainTitle} wow animate__animated animate__fadeInLeft`}>
              CLEANING<br />
              <span className={styles.highlightText}>ROBOT</span>
            </h2>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCol}>
              {featuresLeft.map((feat, index) => (
                <div key={index} className={`${styles.featureItem} wow animate__animated animate__zoomIn`} data-wow-delay={`${0.1 * index}s`}>
                  <div className={styles.iconCircle}>{feat.icon}</div>
                  <span className={styles.featureTitle}>{feat.title}</span>
                </div>
              ))}
            </div>
            <div className={styles.featureCol}>
              {featuresCenter.map((feat, index) => (
                <div key={index} className={`${styles.featureItem} wow animate__animated animate__zoomIn`} data-wow-delay={`${0.1 * index + 0.2}s`}>
                  <div className={styles.iconCircle}>{feat.icon}</div>
                  <span className={styles.featureTitle}>{feat.title}</span>
                </div>
              ))}
            </div>
            <div className={styles.featureCol}>
              {featuresRight.map((feat, index) => (
                <div key={index} className={`${styles.featureItem} wow animate__animated animate__zoomIn`} data-wow-delay={`${0.1 * index + 0.4}s`}>
                  <div className={styles.iconCircle}>{feat.icon}</div>
                  <span className={styles.featureTitle}>{feat.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`${styles.imageContainer} wow animate__animated animate__fadeInRight`}>
          <img src="/assets/images/amr-agv-rgv/cleaning-robot.png"
            onError={(e) => { e.target.src = "https://placehold.co/600x600?text=Cleaning+Robot"; }}
            alt="Autonomous Cleaning Robot" className={styles.robotImage} />
        </div>
      </div>
    </section>
  );
}
