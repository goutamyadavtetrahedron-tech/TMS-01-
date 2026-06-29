"use client";

import React from "react";
import styles from "./AGVsInAction.module.css";

export default function AGVsInAction() {
  const steps = [
    { title: "Delivery from Store", desc: "An AGV can take products from warehouses into manufacturing environments." },
    { title: "Building to building", desc: "Utilise an AGV - capable of outside operation - to transfer loads between buildings." },
    { title: "Parts delivered to line", desc: "Deliver the right parts to the production line whenever they are needed." },
    { title: "Storage to picking", desc: "Take parts and components from your storage locations to the picking area." },
    { title: "Picking area", desc: "AGVs allow operators to concentrate on value added tasks such as item picking." },
    { title: "Production Line", desc: "Utilise multiple AGVs to move a product through production stages." },
    { title: "End of line", desc: "Move products from the production line to the next area or location." },
    { title: "Waste management", desc: "Remove waste materials away from the production line for processing." },
  ];

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={`${styles.mainTitle} wow animate__animated animate__fadeInDown`}>
            AGVs In Action
          </h2>
        </div>

        <div className={styles.contentWrapper}>
          {/* Main Infographic Image */}
          <div className={`${styles.imageWrapper} wow animate__animated animate__fadeIn`}>
            <img src="/assets/images/amr-agv-rgv/agv-in-action.png"
              onError={(e) => { e.target.src = "https://placehold.co/1200x800?text=AGVs+In+Action+Map"; }}
              alt="AGVs In Action Diagram" className={styles.diagramImage} />
          </div>

          {/* Desktop Overlay Boxes (Optional fallback if not baked into image) 
              Since the text is likely in the image in the mockup, providing a list below for SEO & Mobile fallback. */}
          <div className={styles.stepsGrid}>
            {steps.map((step, index) => (
              <div key={index} className={`${styles.stepCard} wow animate__animated animate__fadeInUp`} data-wow-delay={`${0.1 * index}s`}>
                <div className={styles.stepTitleWrapper}>
                  <div className={styles.stepIndicator}></div>
                  <h4 className={styles.stepTitle}>{step.title}</h4>
                </div>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
