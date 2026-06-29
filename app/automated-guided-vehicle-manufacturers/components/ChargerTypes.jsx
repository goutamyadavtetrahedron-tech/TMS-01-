"use client";

import React from "react";
import styles from "./ChargerTypes.module.css";
import { Plug, Zap, Wifi } from "lucide-react";

export default function ChargerTypes() {
  const chargers = [
    {
      title: "MANUAL CHARGERS",
      icon: <Plug size={24} />,
      image: "/assets/images/amr-agv-rgv/charger-manual.png",
      desc: "Leverages an easy, user-friendly connection process that eliminates the need for complex, expensive automated docking infrastructure."
    },
    {
      title: "CONTACT CHARGERS",
      icon: <Zap size={24} />,
      image: "/assets/images/amr-agv-rgv/charger-contact.png",
      desc: "Uses physical connectors to transfer power from the station to the robot. Reliable and efficient, ideal for designated charging points."
    },
    {
      title: "WIRELESS CHARGERS",
      icon: <Wifi size={24} />,
      image: "/assets/images/amr-agv-rgv/charger-wireless.png",
      desc: "Leverages wireless technology to charge without physical connectors. Flexible and convenient for continuous, uninterrupted operation."
    }
  ];

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={`${styles.mainTitle} wow animate__animated animate__fadeInDown`}>
            TYPES OF CHARGERS FOR MOBILE ROBOTS
          </h2>
          <div className={styles.divider}>
            <span className={styles.line}></span>
            <span className={styles.dot}></span>
            <span className={styles.line}></span>
          </div>
        </div>

        <div className={styles.cardsGrid}>
          {chargers.map((charger, index) => (
            <div key={index} className={`${styles.chargerCard} wow animate__animated animate__fadeInUp`} data-wow-delay={`${0.1 * index}s`}>
              <div className={styles.cardHeader}>
                <div className={styles.iconCircle}>{charger.icon}</div>
                <h3 className={styles.cardTitle}>{charger.title}</h3>
              </div>
              <div className={styles.imageWrapper}>
                <img src={charger.image}
                  onError={(e) => { e.target.src = `https://placehold.co/300x200?text=${charger.title.split(' ').join('+')}`; }}
                  alt={charger.title} className={styles.chargerImage} />
              </div>
              <p className={styles.cardDesc}>{charger.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
