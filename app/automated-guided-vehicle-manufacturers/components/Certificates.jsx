"use client";

import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Certificates.module.css";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 3,
  spaceBetween: 30,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  loop: true,
  observer: true,
  observeParents: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  }
};

export default function Certificates() {
  const certificates = [
    { id: 1, src: "/assets/images/amr-agv-rgv/certificate-1.png", alt: "Certificate 1" },
    { id: 2, src: "/assets/images/amr-agv-rgv/certificate-2.png", alt: "Certificate 2" },
    { id: 3, src: "/assets/images/amr-agv-rgv/certificate-3.png", alt: "Certificate 3" },
  ];

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        <h2 className={`${styles.mainTitle} wow animate__animated animate__fadeInDown`}>
          Certifications & Compliance
        </h2>

        <div className={styles.imageContainer}>
          <Swiper {...swiperOptions} className="thm-swiper__slider swiper-container w-full">
            {certificates.map((cert) => (
              <SwiperSlide key={cert.id}>
                <div className="flex justify-center items-center h-full p-4">
                  <img src={cert.src}
                    onError={(e) => { e.target.src = `https://placehold.co/600x400?text=Certificate+${cert.id}`; }}
                    alt={cert.alt} className={styles.certificateImage} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
