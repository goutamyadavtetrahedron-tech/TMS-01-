"use client";

import React from "react";
import styles from "./TracklessFlatCars.module.css";
import { 
  Map, 
  Rotate3d, 
  ShieldAlert, 
  ShieldCheck, 
  Weight, 
  BatteryFull, 
  Settings, 
  Move, 
  Gamepad2,
  Sparkle,
  Sparkles
} from "lucide-react";

export default function TracklessFlatCars() {
  const features = [
    { icon: <Map size={24} />, title: "RAIL-FREE FREEDOM", desc: "Move anywhere without the need for rails or fixed paths." },
    { icon: <Rotate3d size={24} />, title: "360° MANEUVERABILITY", desc: "Omnidirectional movement for tight spaces and complex layouts." },
    { icon: <ShieldAlert size={24} />, title: "HEAVY-DUTY PERFORMANCE", desc: "Built tough to handle loads up to 30 tons with ease." },
    { icon: <ShieldCheck size={24} />, title: "SAFE & RELIABLE", desc: "Advanced safety features ensure secure and efficient operations." },
  ];

  const bottomStats = [
    { icon: <Weight size={24} />, value: "UPTO 30 TON", label: "Load Capacity" },
    { icon: <BatteryFull size={24} />, value: "LONG BATTERY LIFE", label: "Extended Operation" },
    { icon: <Settings size={24} />, value: "LOW MAINTENANCE", label: "High Reliability" },
    { icon: <Move size={24} />, value: "OMNIDIRECTIONAL", label: "Movement" },
    { icon: <Gamepad2 size={24} />, value: "EASY CONTROL", label: "Smart Handling" },
  ];

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        <div className={styles.contentLeft}>
          <h2 className={`${styles.mainTitle} wow animate__animated animate__fadeInLeft`}>
            TMS TRACKLESS<br/>
            <span className={styles.highlightText}>FLAT CARS</span>
          </h2>
          <div className={`${styles.subtitleLine} wow animate__animated animate__fadeInLeft`} data-wow-delay="0.1s">
            Move More. Limitless.
          </div>
          <p className={`${styles.description} wow animate__animated animate__fadeInLeft`} data-wow-delay="0.2s">
            TMS Trackless Flat Cars deliver rail-free, multi-directional<br/>
            transport for heavy and oversized loads—anywhere, anytime.
          </p>

          <div className={styles.featuresList}>
            {features.map((feat, index) => (
              <div key={index} className={`${styles.featureItem} wow animate__animated animate__fadeInUp`} data-wow-delay={`${0.1 * index + 0.3}s`}>
                <div className={styles.iconCircle}>{feat.icon}</div>
                <div className={styles.featureText}>
                  <h4>{feat.title}</h4>
                  <p>{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.imageContainer} wow animate__animated animate__fadeInRight`}>
           <img src="/assets/images/amr-agv-rgv/trackless-flat-car.png" 
                onError={(e) => { e.target.src = "https://placehold.co/800x400?text=Trackless+Flat+Car"; }}
                alt="Trackless Flat Car" className={styles.carImage} />

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
               <span className={styles.priceTagText}>₹15 Lakh</span>
             </div>
             <div className={styles.priceTagRedUnderline1}></div>
             <div className={styles.priceTagRedUnderline2}></div>
           </div>
           
           <div className={styles.loadBadge}>
              <Weight size={32} />
              <div className={styles.loadText}>
                <span className={styles.loadLabel}>LOAD CAPACITY</span>
                <span className={styles.loadValue}>UPTO 30 TON</span>
              </div>
           </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        {bottomStats.map((stat, index) => (
           <div key={index} className={styles.statItem}>
             <div className={styles.statIcon}>{stat.icon}</div>
             <div className={styles.statValue}>{stat.value}</div>
             <div className={styles.statLabel}>{stat.label}</div>
           </div>
        ))}
      </div>
    </section>
  );
}
