"use client";

import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowLeft, ArrowRight, Quote, Star, CheckCircle2 } from "lucide-react";
import ContactForm from "../ContactForm";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 1,
  spaceBetween: 0,
  autoplay: {
    delay: 4500,
    disableOnInteraction: false,
  },
  loop: true,
  navigation: {
    nextEl: ".testimonial-btn-next",
    prevEl: ".testimonial-btn-prev",
  },
  pagination: {
    el: ".testimonial-swiper-pagination",
    clickable: true,
  },
};

export default function Testimonial() {
  const testimonials = [
    {
      name: "Mr. Raduno Agrawal",
      initials: "RA",
      role: "Director",
      company: "Gopal Aromatics Pvt. Ltd.",
      text: "On behalf of GAPL, we sincerely appreciate Tetrahedron Manufacturing Services for their excellent support and expertise throughout our project.",
      rating: 5,
    },
    {
      name: "Mr. Mohit Nayar",
      initials: "MN",
      role: "Owner & Managing Director",
      company: "Modern Pipe Industries",
      text: "M/S Tetrahedron Team was appointed as the Layout and Project Management Consultant. Their professionalism and technical insight helped us achieve strong project outcomes.",
      rating: 5,
    },
    {
      name: "Mr. Amit Goel",
      initials: "AG",
      role: "Managing Director",
      company: "Edgetech Air Systems Pvt. Ltd.",
      text: "On behalf of Edgetech Air Systems Pvt. Ltd., I, Amit Goel, appreciate Tetrahedron’s team dedication and structured consulting support that improved our plant efficiency.",
      rating: 5,
    },
  ];

  return (
    <section 
      id="testimonials-section"
      className="relative w-full bg-slate-50/70 py-12 sm:py-16 lg:py-20 overflow-hidden"
      style={{ fontFamily: "var(--font-poppins, 'Poppins', sans-serif)" }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .testimonial-swiper-pagination .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          background: #cbd5e1;
          opacity: 1;
          border-radius: 9999px !important;
          margin: 0 4px !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        .testimonial-swiper-pagination .swiper-pagination-bullet-active {
          width: 22px;
          background: #2563eb;
          border-radius: 9999px !important;
        }
        .testimonial-nav-btn {
          border-radius: 9999px !important;
        }
      `}} />

      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-2.5">
            <span className="w-6 h-[2.5px] bg-[#ff5e14] rounded-full" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.16em] text-[#ff5e14] uppercase">
              CLIENT TESTIMONIALS
            </span>
            <span className="w-6 h-[2.5px] bg-[#ff5e14] rounded-full" />
          </div>
          <h2 
            className="text-xl sm:text-2xl lg:text-[28px] font-bold text-[#0a1c4c] tracking-tight m-0"
            style={{ fontFamily: "var(--font-poppins, 'Poppins', sans-serif)", fontWeight: 700 }}
          >
            What Our Clients Say About Us
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mt-2">
            Proven results and genuine partnerships with manufacturing organizations across India.
          </p>
        </div>

        {/* 2-Column Layout: Testimonial Carousel + Quick Consultation Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
          
          {/* Left Column: Sleek Testimonial Slider */}
          <div className="lg:col-span-7 xl:col-span-7 w-full flex flex-col justify-between">
            <div className="relative">
              <Swiper
                {...swiperOptions}
                className="w-full rounded-2xl sm:rounded-3xl"
              >
                {testimonials.map((item, i) => (
                  <SwiperSlide key={i}>
                    <div 
                      className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(37,99,235,0.07)] hover:border-blue-300/80 transition-all duration-300 min-h-[320px] sm:min-h-[340px] flex flex-col justify-between overflow-hidden"
                    >
                      {/* Top Row: Company Badge & Star Rating */}
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                            <Quote className="w-4 h-4 fill-blue-600/20 text-blue-600" />
                          </div>
                          <span className="text-[12px] sm:text-[13px] font-semibold text-[#0a1c4c] bg-slate-50 border border-slate-100 px-3 py-1 rounded-lg truncate max-w-[200px] sm:max-w-[280px]">
                            {item.company}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 bg-amber-50/70 border border-amber-200/50 px-2.5 py-1 rounded-full shrink-0">
                          <div className="flex items-center gap-0.5 text-amber-400">
                            {[...Array(item.rating)].map((_, idx) => (
                              <Star key={idx} className="w-3 h-3 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <span className="text-[11.5px] font-bold text-slate-700 ml-0.5">5.0</span>
                        </div>
                      </div>

                      {/* Quote Text */}
                      <p className="text-slate-700 text-[15px] sm:text-[16.5px] leading-[1.75] font-normal tracking-normal mb-6 flex-grow">
                        &ldquo;{item.text}&rdquo;
                      </p>

                      {/* Client Info Footer */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto">
                        <div className="flex items-center gap-3 min-w-0">
                          <div 
                            style={{ borderRadius: "9999px" }}
                            className="w-10 h-10 bg-gradient-to-tr from-[#0a1c4c] via-blue-700 to-blue-600 text-white font-semibold text-[13px] flex items-center justify-center shadow-xs shrink-0 tracking-wider ring-4 ring-blue-50"
                          >
                            {item.initials}
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-[15px] sm:text-base font-bold text-[#0a1c4c] leading-tight m-0 tracking-tight truncate">
                              {item.name}
                            </h3>
                            <p className="text-xs text-slate-500 font-normal m-0 mt-0.5 leading-snug truncate">
                              {item.role} &bull; <span className="text-slate-400">{item.company}</span>
                            </p>
                          </div>
                        </div>

                        <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50/80 px-2.5 py-1 rounded-full border border-emerald-200/60 shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Verified Client
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Sleek Navigation Bar */}
              <div className="flex items-center justify-between mt-5 px-1">
                {/* Circular Nav Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    style={{ borderRadius: "9999px" }}
                    className="testimonial-btn-prev testimonial-nav-btn group flex items-center justify-center w-10 h-10 border border-slate-200 bg-white text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-md hover:shadow-blue-600/20 transition-all duration-200 active:scale-95 cursor-pointer shadow-xs"
                    aria-label="Previous Testimonial"
                  >
                    <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                  </button>

                  <button
                    type="button"
                    style={{ borderRadius: "9999px" }}
                    className="testimonial-btn-next testimonial-nav-btn group flex items-center justify-center w-10 h-10 border border-slate-200 bg-white text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-md hover:shadow-blue-600/20 transition-all duration-200 active:scale-95 cursor-pointer shadow-xs"
                    aria-label="Next Testimonial"
                  >
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>
                </div>

                {/* Swiper Animated Pill Bullets */}
                <div className="testimonial-swiper-pagination flex items-center justify-center"></div>

                <div className="text-xs font-medium text-slate-400 hidden sm:block whitespace-nowrap">
                  Swipe or use arrows
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Quick Inquiry Form */}
          <div className="lg:col-span-5 xl:col-span-5 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[480px]">
              <ContactForm />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
