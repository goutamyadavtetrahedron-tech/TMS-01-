"use client";

import React from "react";
import styles from "./HeavyDutyRGV.module.css";
import { 
  Weight, 
  Crosshair, 
  ShieldCheck, 
  TrendingUp, 
  CircleDollarSign, 
  Puzzle, 
  Clock, 
  Leaf,
  CheckCircle2,
  Factory,
  Warehouse,
  Truck,
  HardHat,
  Car,
  Zap,
  Train
} from "lucide-react";

export default function HeavyDutyRGV() {
  const advantages = [
    { icon: <Weight size={32} />, title: "HIGH LOAD CAPACITY", desc: "Handles extremely heavy loads up to 30 ton with ease and stability." },
    { icon: <Crosshair size={32} />, title: "PRECISE & RELIABLE", desc: "Rail-guided navigation ensures accurate positioning, smooth movement, and consistent performance." },
    { icon: <ShieldCheck size={32} />, title: "ENHANCED SAFETY", desc: "Built with advanced safety systems, emergency stops, and obstacle detection for secure operations." },
    { icon: <TrendingUp size={32} />, title: "HIGHER PRODUCTIVITY", desc: "Automates material transport, reduces cycle time, and ensures seamless workflow for maximum output." },
    { icon: <CircleDollarSign size={32} />, title: "COST EFFICIENT", desc: "Reduces manual handling, lowers operational costs, and optimizes resource utilization." },
    { icon: <Puzzle size={32} />, title: "SEAMLESS INTEGRATION", desc: "Easily integrates with existing systems, conveyors, and production lines for a smart material flow." },
    { icon: <Clock size={32} />, title: "BUILT FOR CONTINUOUS OPERATION", desc: "Engineered for 24/7 performance with minimal downtime and low maintenance." },
    { icon: <Leaf size={32} />, title: "ENERGY EFFICIENT", desc: "Optimized drive systems ensure lower energy consumption and a reduced carbon footprint." },
  ];

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.topSection}>
        <div className={styles.topContent}>
          <h2 className={`${styles.mainTitle} wow animate__animated animate__fadeInLeft`}>
            <span>TMS Heavy-Duty</span><br/>
            <span className={`${styles.brandTitle} ${styles.highlightText}`}>RGV Technology</span>
          </h2>
          
          <p className={`${styles.subText} wow animate__animated animate__fadeInLeft`} data-wow-delay="0.2s">
            SMARTER WAY TO MOVE.<br/>
            STRONGER OPERATIONS.
          </p>

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
           <img src="/assets/images/amr-agv-rgv/heavy-duty-rgv.png" 
                onError={(e) => { e.target.src = "https://placehold.co/800x500?text=Heavy+Duty+RGV"; }}
                alt="Heavy Duty RGV" className={styles.rgvImage} />
           
           <div className={styles.featuresListRight}>
              <div className={styles.featItem}><CheckCircle2 className={styles.iconCheck}/> BUILT FOR EXTREME LOADS</div>
              <div className={styles.featItem}><CheckCircle2 className={styles.iconCheck}/> DESIGNED FOR SAFETY</div>
              <div className={styles.featItem}><CheckCircle2 className={styles.iconCheck}/> BUILT FOR INDUSTRY 4.0</div>
           </div>
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
               <div className={styles.advIconWrapper}>
                  {adv.icon}
               </div>
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
             IDEAL<br/>FOR <span className={styles.arrows}>&gt;&gt;&gt;</span>
          </div>
          <div className={styles.bottomIndustries}>
             <div className={styles.indItem}>
               <Factory size={28} className={styles.indIcon} />
               <span className={styles.indText}>STEEL<br/>PLANTS</span>
             </div>
             <div className={styles.indDivider}></div>
             <div className={styles.indItem}>
               <Zap size={28} className={styles.indIcon} />
               <span className={styles.indText}>TRANSFORMER<br/>MANUFACTURING</span>
             </div>
             <div className={styles.indDivider}></div>
             <div className={styles.indItem}>
               <HardHat size={28} className={styles.indIcon} />
               <span className={styles.indText}>HEAVY<br/>ENGINEERING</span>
             </div>
             <div className={styles.indDivider}></div>
             <div className={styles.indItem}>
               <Car size={28} className={styles.indIcon} />
               <span className={styles.indText}>AUTOMOTIVE<br/>MANUFACTURING</span>
             </div>
             <div className={styles.indDivider}></div>
             <div className={styles.indItem}>
               <Train size={28} className={styles.indIcon} />
               <span className={styles.indText}>PORTS &<br/>RAIL FACTORIES</span>
             </div>
          </div>
        </div>
        <div className={styles.bottomRightSlogan}>
          <div className={styles.sloganBg}></div>
          <div className={styles.sloganContent}>
             SMARTER MATERIAL HANDLING.<br/>
             STRONGER OPERATIONS. <span className={styles.sloganArrows}>&lt;&lt;&lt;&lt;</span>
          </div>
        </div>
      </div>
    </section>
  );
}
