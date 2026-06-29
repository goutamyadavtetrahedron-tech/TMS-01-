"use client";

import React from "react";
import styles from "./SolutionsForEveryMove.module.css";
import {
  GitMerge, Package, ShieldCheck,
  Wifi, Crosshair, RefreshCcw,
  TrainTrack, Target, Settings,
  Weight
} from "lucide-react";

export default function SolutionsForEveryMove() {
  const solutions = [
    {
      type: "AGV",
      name: "Automated Guided Vehicle",
      desc: "Follows fixed paths using sensors, lines, or markers. Ideal for repetitive material transport in structured environments.",
      image: "/assets/images/amr-agv-rgv/agv-small.png",
      features: [
        { icon: <GitMerge size={20} />, title: "GUIDED NAVIGATION", desc: "Follows fixed paths (tape, lines, magnetic)." },
        { icon: <Package size={20} />, title: "HIGH PAYLOAD CAPACITY", desc: "Built for heavy and bulk material transport." },
        { icon: <ShieldCheck size={20} />, title: "RELIABLE & PROVEN", desc: "Ideal for repetitive, structured workflows." },
      ],
      load: "UPTO 30 TON"
    },
    {
      type: "AMR",
      name: "Autonomous Mobile Robot",
      desc: "Navigates dynamically using advanced sensors and AI. Adapts to changes in environment and optimizes routes in real time.",
      image: "/assets/images/amr-agv-rgv/amr-small.png",
      features: [
        { icon: <Wifi size={20} />, title: "DYNAMIC NAVIGATION", desc: "Uses SLAM, LiDAR, and AI for flexible movement." },
        { icon: <Crosshair size={20} />, title: "INTELLIGENT & ADAPTIVE", desc: "Re-routes in real time to avoid obstacles." },
        { icon: <RefreshCcw size={20} />, title: "FLEXIBLE & SCALABLE", desc: "Perfect for changing layouts and mixed traffic." },
      ],
      load: "UPTO 30 TON"
    },
    {
      type: "RGV",
      name: "Rail Guided Vehicle",
      desc: "Moves along fixed rails for precise and efficient transport. Ideal for long-distance and high-load applications.",
      image: "/assets/images/amr-agv-rgv/rgv-small.png",
      features: [
        { icon: <TrainTrack size={20} />, title: "RAIL GUIDED MOVEMENT", desc: "Moves on fixed rails for precise positioning." },
        { icon: <Target size={20} />, title: "HIGH PRECISION & STABILITY", desc: "Ideal for heavy loads and long-distance travel." },
        { icon: <Settings size={20} />, title: "BUILT FOR TOUGH TASKS", desc: "Designed for demanding industrial environments." },
      ],
      load: "UPTO 30 TON"
    }
  ];

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={`${styles.mainTitle} wow animate__animated animate__fadeInDown`}>
            OUR SOLUTIONS FOR EVERY MOVE
          </h2>
          <div className={styles.divider}>
            <span className={styles.line}></span>
            <span className={styles.dot}></span>
            <span className={styles.line}></span>
          </div>
          <p className={`${styles.subtext} wow animate__animated animate__fadeInDown`} data-wow-delay="0.1s">
            Smart. Safe. Scalable. Choose the right automation for your operation.
          </p>
        </div>

        <div className={styles.cardsGrid}>
          {solutions.map((sol, index) => (
            <div key={index} className={`${styles.solutionCard} wow animate__animated animate__fadeInUp`} data-wow-delay={`${0.1 * index}s`}>
              <div className={styles.cardImageWrapper}>
                <img src={sol.image}
                  onError={(e) => { e.target.src = `https://placehold.co/400x250?text=${sol.type}`; }}
                  alt={sol.name} className={styles.cardImage} />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <div className={styles.typeBadge}>
                    <span className={styles.typeText}>{sol.type}</span>
                  </div>
                  <div className={styles.titleArea}>
                    <h3>{sol.type}</h3>
                    <span>{sol.name}</span>
                  </div>
                </div>
                <p className={styles.cardDesc}>{sol.desc}</p>

                <div className={styles.cardFeatures}>
                  {sol.features.map((feat, i) => (
                    <div key={i} className={styles.featItem}>
                      <div className={styles.featIcon}>{feat.icon}</div>
                      <div className={styles.featText}>
                        <h5>{feat.title}</h5>
                        <p>{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.loadBadge}>
                  <Weight size={20} /> LOAD CAPACITY: <span className={styles.loadValue}>{sol.load}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
