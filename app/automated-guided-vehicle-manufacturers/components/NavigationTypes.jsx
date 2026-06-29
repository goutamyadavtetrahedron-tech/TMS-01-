"use client";

import React from "react";
import styles from "./NavigationTypes.module.css";
import { 
  Magnet, 
  QrCode, 
  LayoutGrid, 
  Target, 
  Shield, 
  Link2, 
  ScanLine, 
  MapPin, 
  Map, 
  Palette, 
  Eye, 
  Grid2X2, 
  Settings, 
  TrendingUp, 
  ShieldCheck, 
  Maximize, 
  CircleDollarSign 
} from "lucide-react";

export default function NavigationTypes() {
  const navigations = [
    {
      titleRed: "MAGNETIC TAPE",
      titleWhite: "NAVIGATION",
      icon: <Magnet className={styles.titleIcon} />,
      desc: "Follows magnetic tape embedded on the floor for accurate and reliable path alignment.",
      features: [
        { icon: <Target />, text: "HIGH PRECISION\nPATH FOLLOWING" },
        { icon: <Shield />, text: "STABLE &\nRELIABLE" },
        { icon: <Link2 />, text: "COST-EFFECTIVE\nSOLUTION" }
      ],
      image: "/assets/images/amr-agv-rgv/magnetic-tape-nv.png"
    },
    {
      titleRed: "QR CODE",
      titleWhite: "NAVIGATION",
      icon: <QrCode className={styles.titleIcon} />,
      desc: "Navigates using QR codes placed in the environment for location detection and path guidance.",
      features: [
        { icon: <ScanLine />, text: "FLEXIBLE &\nSCALABLE" },
        { icon: <MapPin />, text: "EASY LOCATION\nIDENTIFICATION" },
        { icon: <Map />, text: "NO COMPLEX\nINFRASTRUCTURE" }
      ],
      image: "/assets/images/amr-agv-rgv/qr-code-nv.png"
    },
    {
      titleRed: "COLOUR CODE",
      titleWhite: "NAVIGATION",
      icon: <LayoutGrid className={styles.titleIcon} />,
      desc: "Uses colour codes on the floor for visual navigation and route guidance.",
      features: [
        { icon: <Palette />, text: "SIMPLE & INTUITIVE\nSYSTEM" },
        { icon: <Eye />, text: "EASY TO DEPLOY\n& MAINTAIN" },
        { icon: <Grid2X2 />, text: "HIGH VISIBILITY\n& SAFETY" }
      ],
      image: "/assets/images/amr-agv-rgv/color-nv.png"
    }
  ];

  const footerFeatures = [
    { icon: <Settings />, text: "ENHANCED\nACCURACY" },
    { icon: <TrendingUp />, text: "IMPROVED\nEFFICIENCY" },
    { icon: <ShieldCheck />, text: "SAFE & RELIABLE\nOPERATIONS" },
    { icon: <Maximize />, text: "ADAPTABLE TO\nANY ENVIRONMENT" },
    { icon: <CircleDollarSign />, text: "LOWER OPERATING\nCOSTS" }
  ];

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>
            <span className={styles.textWhite}>SMART NAVIGATION. </span>
            <span className={styles.textRed}>SEAMLESS MOVEMENT.</span>
          </h2>
          <div className={styles.subtitleWrapper}>
            <div className={styles.line}></div>
            <p>
              Three Advanced Navigation Technologies. One Goal – <span className={styles.textRed}>Effortless</span> Automation.
            </p>
            <div className={styles.line}></div>
          </div>
        </div>

        <div className={styles.navGrid}>
          {navigations.map((nav, index) => (
            <div key={index} className={`${styles.navCard} wow animate__animated animate__fadeInUp`} data-wow-delay={`${0.1 * index}s`}>
              <div className={styles.cardHeader}>
                <div className={styles.titleIconWrapper}>
                  {nav.icon}
                </div>
                <h3 className={styles.navTitle}>
                  <span className={styles.textRed}>{nav.titleRed}</span>
                  <span className={styles.textWhite}>{nav.titleWhite}</span>
                </h3>
              </div>
              <p className={styles.navDesc}>{nav.desc}</p>
              
              <div className={styles.featuresGrid}>
                {nav.features.map((feature, fIndex) => (
                  <div key={fIndex} className={styles.featureItem}>
                    <div className={styles.featureIcon}>{feature.icon}</div>
                    <p className={styles.featureText}>{feature.text}</p>
                  </div>
                ))}
              </div>

              <div className={styles.imageWrapper}>
                 <img src={nav.image} 
                      onError={(e) => { e.target.src = `https://placehold.co/400x300?text=${nav.titleWhite}`; }}
                      alt={`${nav.titleRed} ${nav.titleWhite}`} className={styles.navImage} />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.footerBar}>
          {footerFeatures.map((feat, index) => (
            <div key={index} className={styles.footerItem}>
              <div className={styles.footerIcon}>{feat.icon}</div>
              <p className={styles.footerText}>{feat.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
