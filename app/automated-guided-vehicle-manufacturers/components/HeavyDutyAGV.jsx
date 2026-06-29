"use client";

import React, { useState, useEffect } from "react";
import styles from "./HeavyDutyAGV.module.css";
import {
  Weight,
  Crosshair,
  ShieldCheck,
  TrendingUp,
  UserX,
  Clock,
  CircleDollarSign,
  Puzzle,
  Leaf,
  CheckCircle2,
  Settings,
  Factory,
  Warehouse,
  Truck,
  HardHat,
  Car,
  Zap,
  Train
} from "lucide-react";
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

export default function HeavyDutyAGV() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const slideImages = [
    "/assets/images/amr-agv-rgv/heavy-duty-agv-1.png",
    "/assets/images/amr-agv-rgv/heavy-duty-agv-2.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % slideImages.length);
    }, 3500); // Slides every 3.5 seconds
    return () => clearInterval(interval);
  }, []);

  const advantages = [
    { icon: <Weight size={32} />, title: "HIGH LOAD CAPACITY", desc: "Handles extremely heavy loads up to 30 ton with ease and stability." },
    { icon: <Crosshair size={32} />, title: "PRECISION & SAFETY", desc: "Guided navigation ensures accurate positioning, smooth movement, and enhanced safety." },
    { icon: <ShieldCheck size={32} />, title: "RELIABLE & DURABLE", desc: "Built with robust components and heavy-duty structure for long-term reliability in tough industrial environments." },
    { icon: <TrendingUp size={32} />, title: "INCREASED PRODUCTIVITY", desc: "Automates repetitive material transport, ensuring consistent performance and higher throughput." },
    { icon: <UserX size={32} />, title: "REDUCED MANUAL LABOR", desc: "Minimizes human intervention, reduces fatigue, and lowers the risk of workplace injuries." },
    { icon: <Clock size={32} />, title: "24/7 OPERATION", desc: "Designed for continuous operation with minimal downtime, driving efficiency around the clock." },
    { icon: <CircleDollarSign size={32} />, title: "COST EFFICIENCY", desc: "Reduces operational costs through lower labor dependency, optimized energy usage, and minimal maintenance." },
    { icon: <Puzzle size={32} />, title: "SEAMLESS INTEGRATION", desc: "Easily integrates with existing systems, conveyors, and automated workflows for a smarter operation." },
    { icon: <Leaf size={32} />, title: "ENERGY EFFICIENT", desc: "Optimized drive and control systems ensure lower power consumption and sustainable operation." },
  ];

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.topSection}>
        <div className={styles.topContent}>
          <h2 className={`${styles.mainTitle} wow animate__animated animate__fadeInLeft`}>
            <span>TMS Heavy-Duty</span><br />
            <span className={`${styles.brandTitle} ${styles.highlightText}`}>AGV Technology</span>
          </h2>
          <p className={`${styles.subText} wow animate__animated animate__fadeInLeft`} data-wow-delay="0.2s">
            Engineered for Heavy Loads.<br />
            Built for Maximum Performance.
          </p>

          <div className={`${styles.loadCapacityBox} wow animate__animated animate__fadeInUp`} data-wow-delay="0.4s">
            <div className={styles.loadBadge}>
              <Weight size={40} className={styles.loadIcon} />
              <div className={styles.loadText}>
                <span className={styles.loadLabel}>LOAD CAPACITY</span>
                <span className={styles.loadValue}>upto 30 ton</span>
              </div>
            </div>
            <div className={styles.loadDesc}>
              Designed to handle extremely<br />
              heavy loads up to 30 ton with<br />
              ease and stability, ensuring safe<br />
              and reliable material movement.
            </div>
          </div>
        </div>
        <div className={`${styles.topImage} wow animate__animated animate__fadeInRight`}>
          {slideImages.map((src, index) => (
            <img
              key={src}
              src={src}
              onError={(e) => { e.target.src = "https://placehold.co/800x500?text=Heavy+Duty+AGV"; }}
              alt={`Heavy Duty AGV ${index + 1}`}
              className={`${styles.agvImage} ${index === currentImageIndex ? styles.activeImage : styles.inactiveImage}`}
            />
          ))}
        </div>
      </div>

      <div className={styles.advantagesSection}>
        <div className={`${styles.sectionDivider} wow animate__animated animate__fadeIn`}>
          <span className={styles.line}></span>
          <span className={styles.dividerTitle}>KEY ADVANTAGES</span>
          <span className={styles.line}></span>
        </div>

        <div className={styles.advantagesGrid}>
          {advantages.map((adv, index) => (
            <div key={index} className={`${styles.advantageCard} wow animate__animated animate__fadeInUp`} data-wow-delay={`${0.1 * (index % 3)}s`}>
              <div className={styles.advIconWrapper}>
                {adv.icon}
              </div>
              <div className={styles.advText}>
                <h4 className={styles.advTitle}>{adv.title}</h4>
                <p className={styles.advDesc}>{adv.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomLeft}>
          <div className={styles.bottomIdealFor}>
            IDEAL<br />FOR <span className={styles.arrows}>&gt;&gt;&gt;</span>
          </div>
          <div className={styles.bottomIndustries}>
            <div className={styles.indItem}>
              <Factory size={28} className={styles.indIcon} />
              <span className={styles.indText}>STEEL<br />PLANTS</span>
            </div>
            <div className={styles.indDivider}></div>
            <div className={styles.indItem}>
              <Zap size={28} className={styles.indIcon} />
              <span className={styles.indText}>TRANSFORMER<br />MANUFACTURING</span>
            </div>
            <div className={styles.indDivider}></div>
            <div className={styles.indItem}>
              <HardHat size={28} className={styles.indIcon} />
              <span className={styles.indText}>HEAVY<br />ENGINEERING</span>
            </div>
            <div className={styles.indDivider}></div>
            <div className={styles.indItem}>
              <Car size={28} className={styles.indIcon} />
              <span className={styles.indText}>AUTOMOTIVE<br />MANUFACTURING</span>
            </div>
            <div className={styles.indDivider}></div>
            <div className={styles.indItem}>
              <Train size={28} className={styles.indIcon} />
              <span className={styles.indText}>PORTS &<br />RAIL FACTORIES</span>
            </div>
          </div>
        </div>
        <div className={styles.bottomRightSlogan}>
          <div className={styles.sloganBg}></div>
          <div className={styles.sloganContent}>
            SMARTER MATERIAL HANDLING.<br />
            STRONGER OPERATIONS. <span className={styles.sloganArrows}>&lt;&lt;&lt;&lt;</span>
          </div>
        </div>
      </div>
    </section >
  );
}
