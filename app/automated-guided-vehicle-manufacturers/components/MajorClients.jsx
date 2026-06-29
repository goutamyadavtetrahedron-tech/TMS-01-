"use client";

import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./MajorClients.module.css";

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true,
    observer: true,
    observeParents: true,
};

export default function MajorClients() {
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        <h2 className={`${styles.mainTitle} wow animate__animated animate__fadeInDown`}>
          Major clients in segment
        </h2>
      </div>
      <div className={styles.imageContainer}>
          <Swiper {...swiperOptions} className="thm-swiper__slider swiper-container w-full">
              <SwiperSlide>
                  <div className="flex justify-center items-center w-full">
                      <img src="/assets/images/amr-agv-rgv/iit-indore.png" 
                          onError={(e) => { e.target.src = "https://placehold.co/1920x800?text=IIT+Indore"; }}
                          alt="IIT Indore" className={styles.clientsImage} />
                  </div>
              </SwiperSlide>
              <SwiperSlide>
                  <div className="flex justify-center items-center w-full">
                      <img src="/assets/images/amr-agv-rgv/tata-hitachi.png" 
                          onError={(e) => { e.target.src = "https://placehold.co/1920x800?text=Tata+Hitachi"; }}
                          alt="Tata Hitachi" className={styles.clientsImage} />
                  </div>
              </SwiperSlide>
              <SwiperSlide>
                  <div className="flex justify-center items-center w-full">
                      <img src="/assets/images/amr-agv-rgv/ace.png" 
                          onError={(e) => { e.target.src = "https://placehold.co/1920x800?text=ACE"; }}
                          alt="ACE" className={styles.clientsImage} />
                  </div>
              </SwiperSlide>
          </Swiper>
      </div>
    </section>
  );
}
