"use client";

import React from "react";
import styles from "./ServingIndustries.module.css";

export default function ServingIndustries() {
  const industries = [
    { title: "Automotive", image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=600&q=80" },
    { title: "UPVC, CPVC Pipes", image: "https://images.unsplash.com/photo-1622743941421-a4ef988c5a5b?auto=format&fit=crop&w=600&q=80" },
    { title: "Heavy Engineering", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80" },
    { title: "Chemical", image: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=600&q=80" },
    { title: "Steel Wire", image: "https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=600&q=80" },
    { title: "Electronics", image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80" },
    { title: "Gear", image: "https://images.unsplash.com/photo-1516321497487-e2b191953a6c?auto=format&fit=crop&w=600&q=80" },
    { title: "Aluminium Refinery", image: "https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?auto=format&fit=crop&w=600&q=80" },
    { title: "Paper", image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=600&q=80" },
    { title: "Electric Vehicle", image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=600&q=80" },
    { title: "TMT Bars", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80" },
    { title: "Consumer Durables", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80" },
    { title: "Casting & Forging", image: "https://images.unsplash.com/photo-1563784462386-044fd95e9852?auto=format&fit=crop&w=600&q=80" },
    { title: "Surgical Disposables", image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=600&q=80" },
    { title: "Agricultural Equipment", image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80" },
    { title: "Elevators", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" },
    { title: "UPVC Door & Window", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80" },
    { title: "Heavy Fabrication", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80" },
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
