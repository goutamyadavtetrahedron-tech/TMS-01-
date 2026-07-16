"use client";

import React from "react";
import styles from "./TetrahedronAMRs.module.css";
import {
  Crosshair, ShieldCheck, Activity, Zap, Settings,
  Clock, PieChart, Shield, Factory, Warehouse,
  Truck, HardHat, TrendingUp, Weight, Leaf, Car, Train,
  Sparkle, Sparkles
} from "lucide-react";

export default function TetrahedronAMRs() {
  const topFeatures = [
    { icon: <Crosshair size={32} />, title: "Autonomous Navigation", desc: "SLAM-based technology ensures real-time mapping, obstacle detection, and smart path planning." },
    { icon: <ShieldCheck size={32} />, title: "Flexible & Adaptive", desc: "Operates without predefined routes and adapts seamlessly to changing environments." },
    { icon: <Activity size={32} />, title: "Safe & Reliable", desc: "Advanced sensors and safety systems ensure secure operations around people and equipment." },
    { icon: <Clock size={32} />, title: "Continuous Operation", desc: "Engineered for 24/7 performance with minimal intervention and maximum uptime." },
  ];

  const advantages = [
    { icon: <Weight size={32} />, title: "HIGH LOAD CAPACITY", desc: "Handles heavy loads up to 30 ton with maximum stability." },
    { icon: <Shield size={32} />, title: "ENHANCED SAFETY", desc: "Reduces workplace risks with intelligent navigation and real-time obstacle avoidance." },
    { icon: <TrendingUp size={32} />, title: "IMPROVED PRODUCTIVITY", desc: "Automates material transport, reduces manual effort, and increases overall operational efficiency." },
    { icon: <Zap size={32} />, title: "COST EFFICIENCY", desc: "Lowers operational costs by reducing labor dependency and optimizing resource utilization." },
    { icon: <Settings size={32} />, title: "SEAMLESS INTEGRATION", desc: "Easily integrates with existing systems, conveyors, and automation solutions." },
    { icon: <Clock size={32} />, title: "24/7 RELIABILITY", desc: "Designed for continuous operation with minimal downtime and consistent performance." },
    { icon: <Leaf size={32} />, title: "ENERGY EFFICIENT", desc: "Optimized power management ensures lower energy consumption and sustainable operations." },
    { icon: <PieChart size={32} />, title: "DATA-DRIVEN INSIGHTS", desc: "Real-time monitoring and analytics enable smarter decisions and operational improvements." },
  ];

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.topSection}>
        <div className={styles.topContent}>
          <h2 className={`${styles.mainTitle} wow animate__animated animate__fadeInLeft`}>
            <span>TMS Heavy-Duty</span><br />
            <span className={`${styles.brandTitle} ${styles.highlightText}`}>AMRs</span>
          </h2>

          <p className={`${styles.subText} wow animate__animated animate__fadeInLeft`} data-wow-delay="0.2s">
            Intelligent. Autonomous. Reliable.<br />
            Smarter way to move.<br />
            Stronger operations.
          </p>

          <div className={styles.topFeaturesGrid}>
            {topFeatures.map((feat, index) => (
              <div key={index} className={`${styles.topFeatureCard} wow animate__animated animate__fadeInUp`} data-wow-delay={`${0.1 * index}s`}>
                <div className={styles.topFeatIcon}>{feat.icon}</div>
                <div className={styles.topFeatText}>
                  <h4>{feat.title}</h4>
                  <p>{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={`${styles.loadCapacityBox} wow animate__animated animate__fadeInUp`} data-wow-delay="0.3s">
            <div className={styles.loadBadge}>
              <Weight size={32} />
              <div className={styles.loadText}>
                <span className={styles.loadLabel}>LOAD CAPACITY</span>
                <span className={styles.loadValue}>UPTO 30 TON</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.topImageContainer} wow animate__animated animate__fadeInRight`}>
          <div className={`${styles.priceTagRed} wow animate__animated animate__zoomIn`} data-wow-delay="0.6s">
            <div className={styles.priceTagRedTop}>
              <span className={styles.priceTagText}>Starting from</span>
              <div className={styles.decorLeft}>
                <Sparkle size={18} fill="currentColor" />
              </div>
              <div className={styles.decorRight}>
                <Sparkles size={20} fill="currentColor" />
              </div>
            </div>
            <div className={styles.priceTagRedBottom}>
              <span className={styles.priceTagText}>₹20 Lakh</span>
            </div>
            <div className={styles.priceTagRedUnderline1}></div>
            <div className={styles.priceTagRedUnderline2}></div>
          </div>

          <img src="/assets/images/amr-agv-rgv/amr.png"
            onError={(e) => { e.target.src = "https://placehold.co/600x400?text=AMR+Robots"; }}
            alt="Tetrahedron AMRs" className={styles.amrImage} />
        </div>
      </div>

      <div className={styles.advantagesSection}>
        <div className={styles.advantagesHeader}>
          <div className={styles.headerLine}></div>
          <div className={styles.headerTitle}>KEY ADVANTAGES</div>
          <div className={styles.headerLine}></div>
        </div>

        <div className={styles.advantagesGrid}>
          {advantages.map((adv, index) => (
            <div key={index} className={`${styles.advCard} wow animate__animated animate__fadeInUp`} data-wow-delay={`${0.1 * (index % 4)}s`}>
              <div className={styles.advIcon}>{adv.icon}</div>
              <div className={styles.advContent}>
                <h4>{adv.title}</h4>
                <p>{adv.desc}</p>
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
    </section>
  );
}
