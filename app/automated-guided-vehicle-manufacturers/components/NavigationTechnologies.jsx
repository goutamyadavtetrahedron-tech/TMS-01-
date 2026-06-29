"use client";

import React from "react";
import styles from "./NavigationTechnologies.module.css";
import {
  Magnet,
  Palette,
  QrCode,
  Grid3X3,
  Radar,
  Camera,
  Zap,
  Wifi,
  Star
} from "lucide-react";

export default function NavigationTechnologies() {
  const categories = [
    {
      title: "PATH FOLLOWING",
      color: "#2563eb", // Blue
      cards: [
        {
          icon: <Magnet />,
          title: "Magnetic Tape",
          sub: "PATH FOLLOWING",
          bullets: [
            "Floor-embedded tape guides fixed path",
            "Cost-effective, easy to install & modify",
            "Proven track record in manufacturing lines"
          ],
          idealFor: "Repetitive fixed routes in factories & assembly lines"
        },
        {
          icon: <Palette />,
          title: "Color Tape",
          sub: "PATH FOLLOWING",
          bullets: [
            "Coloured tape provides visual lane guidance",
            "Multi-colour routing for multi-fleet lanes",
            "Zero electrical infrastructure required"
          ],
          idealFor: "Multi-lane warehouses & mixed-floor environments"
        }
      ]
    },
    {
      title: "CODE-BASED",
      color: "#0891b2", // Teal
      cards: [
        {
          icon: <QrCode />,
          title: "QR Code Grid",
          sub: "CODE-BASED",
          bullets: [
            "Floor QR grid for ±5 mm positioning",
            "Scalable grid — easy to expand layout",
            "Quick route reprogramming via software"
          ],
          idealFor: "Warehouse grid ops and order-picking zones"
        },
        {
          icon: <Grid3X3 />,
          title: "ArUco Marker",
          sub: "CODE-BASED",
          bullets: [
            "OpenCV-standard visual fiducial markers",
            "Real-time pose estimation via onboard camera",
            "No dedicated reader hardware needed"
          ],
          idealFor: "Smart factories needing camera-based localisation"
        }
      ]
    },
    {
      title: "SENSING",
      color: "#16a34a", // Green
      cards: [
        {
          icon: <Radar />,
          title: "LiDAR",
          sub: "SENSING / AI",
          bullets: [
            "360° laser scan for real-time SLAM mapping",
            "Dynamic obstacle detection & safe stop",
            "No floor markings — full layout flexibility"
          ],
          idealFor: "Complex, dynamic factory environments (AMR)"
        },
        {
          icon: <Camera />,
          title: "Depth Sensing Camera",
          sub: "CAMERA BASED",
          bullets: [
            "3D depth via stereo / Time-of-Flight camera",
            "Detects humans, pallets & floor variation",
            "Fused with LiDAR for layered safety coverage"
          ],
          idealFor: "High-safety zones with humans and AGVs co-existing"
        }
      ]
    },
    {
      title: "RAIL GUIDED",
      color: "#ea580c", // Orange
      cards: [
        {
          icon: <Zap />,
          title: "RGV — Wired",
          sub: "RAIL GUIDED",
          bullets: [
            "Fixed-rail precision transport (±1 mm)",
            "Hardwired control — zero RF interference",
            "Ideal for high-temperature & dusty environments"
          ],
          idealFor: "Steel plants, transformer plants, heavy forges"
        },
        {
          icon: <Wifi />,
          title: "RGV — Wireless",
          sub: "RAIL GUIDED",
          bullets: [
            "Wi-Fi / RF control on fixed rail track",
            "Remote fleet management via AGVS software",
            "IP65 weatherproof for outdoor rail yards"
          ],
          idealFor: "Port yards, outdoor factories, multi-zone steel plants"
        }
      ]
    }
  ];

  // const divisions = [
  //   { title: "Management Consulting", bgColor: "#dc2626" }, // Red
  //   { title: "Training & Skill Development", bgColor: "#16a34a" }, // Green
  //   { title: "Industry 4.0 & Automation", bgColor: "#f59e0b" } // Yellow/Orange
  // ];

  return (
    <section className={styles.sectionWrapper}>

      <div className={styles.header}>
        <h2>Navigation Technologies</h2>
        <p>8 navigation modes for flexible, scalable heavy-duty industrial deployments</p>
      </div>

      <div className={styles.categoriesGrid}>
        {categories.map((cat, cIndex) => (
          <div key={cIndex} className={styles.categorySection} style={{ '--cat-color': cat.color }}>
            <div className={styles.categoryHeader}>
              {cat.title}
            </div>
            <div className={styles.cardsContainer}>
              {cat.cards.map((card, idx) => (
                <div key={idx} className={`${styles.card} wow animate__animated animate__fadeInUp`} data-wow-delay={`${0.1 * (cIndex + idx)}s`}>
                  <div className={styles.cardTitleWrapper}>
                    <div className={styles.iconWrapper} style={{ color: cat.color, backgroundColor: `${cat.color}15` }}>
                      {card.icon}
                    </div>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                  </div>

                  <p className={styles.cardSub} style={{ color: cat.color }}>{card.sub}</p>

                  <ul className={styles.bulletList}>
                    {card.bullets.map((b, i) => (
                      <li key={i}>
                        <span className={styles.bulletDot} style={{ backgroundColor: cat.color }}></span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className={styles.idealFor} style={{ color: cat.color }}>
                    <Star className={styles.idealForIcon} />
                    <p><i>{card.idealFor}</i></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* <div className={styles.footerDivisions}>
          {divisions.map((div, dIndex) => (
            <div key={dIndex} className={styles.divisionItem} style={{ backgroundColor: div.bgColor }}>
              {div.title}
            </div>
          ))}
        </div> */}
    </section>
  );
}
