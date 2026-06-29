"use client";

import React from "react";
import styles from "./ServingIndustries.module.css";

export default function ServingIndustries() {
  const industries = [
    { title: "Heavy Fabrication", image: "/assets/images/amr-agv-rgv/manufacturing-images/Heavy Fabrication.jpg" },
    { title: "Heavy Engineering", image: "/assets/images/amr-agv-rgv/manufacturing-images/Heavy Engineering.jpg" },
    { title: "Automotive", image: "/assets/images/amr-agv-rgv/manufacturing-images/Automative.jpg" },
    { title: "TMT Bars", image: "/assets/images/amr-agv-rgv/manufacturing-images/TMT Bars.jpg" },
    { title: "Steel Wire", image: "/assets/images/amr-agv-rgv/manufacturing-images/Steel Wire.jpg" },
    { title: "Aluminium Refinery", image: "/assets/images/amr-agv-rgv/manufacturing-images/Aluminium Refinery.jpeg" },
    { title: "Electric Vehicle", image: "/assets/images/amr-agv-rgv/manufacturing-images/Electric Vehicle.jpg" },
    { title: "Agricultural Equipment", image: "/assets/images/amr-agv-rgv/manufacturing-images/Agricultural Equipment.jpg" },
    { title: "UPVC, CPVC Pipes", image: "/assets/images/amr-agv-rgv/manufacturing-images/UPVC, CPVC Pipes.jpg" },
    { title: "Chemical", image: "/assets/images/amr-agv-rgv/manufacturing-images/Chemical.jpg" },
    { title: "Electronics", image: "/assets/images/amr-agv-rgv/manufacturing-images/Electronics.jpg" },
    { title: "Gear", image: "/assets/images/amr-agv-rgv/manufacturing-images/Gear.jpg" },
    { title: "Paper", image: "/assets/images/amr-agv-rgv/manufacturing-images/Paper.jpg" },
    { title: "Consumer Durables", image: "/assets/images/amr-agv-rgv/manufacturing-images/Consumer Durables.jpg" },
    { title: "Casting & Forging", image: "/assets/images/amr-agv-rgv/manufacturing-images/Casting & Forging.jpg" },
    { title: "Surgical Disposables", image: "/assets/images/amr-agv-rgv/manufacturing-images/Surgical Disposables.jpg" },
    { title: "Elevators", image: "/assets/images/amr-agv-rgv/manufacturing-images/Elevators.jpg" },
    { title: "UPVC Door & Window", image: "/assets/images/amr-agv-rgv/manufacturing-images/UPVC Door & Window.jpg" },
  ];

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={`${styles.mainTitle} wow animate__animated animate__fadeInDown`}>
            Serving These Manufacturing Industries
          </h2>
        </div>

        <div className={styles.grid}>
          {industries.map((ind, index) => (
            <div key={index} className={`${styles.industryCard} wow animate__animated animate__zoomIn`} data-wow-delay={`${0.05 * (index % 6)}s`}>
              <div className={styles.imageWrapper}>
                <img src={ind.image}
                  onError={(e) => { e.target.src = `https://placehold.co/250x200?text=${ind.title.split(' ').join('+')}`; }}
                  alt={ind.title} className={styles.industryImage} />
              </div>
              <div className={styles.titleWrapper}>
                <span className={styles.industryTitle}>{ind.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
