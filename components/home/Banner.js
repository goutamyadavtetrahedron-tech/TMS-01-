'use client';

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { 
  ChevronLeft, 
  ChevronRight, 
  PhoneCall, 
  ArrowRight,
  TrendingUp,
  Compass,
  Bot,
  GraduationCap,
  ShieldCheck
} from "lucide-react";

const SLIDE_DURATION = 6000;

const slides = [
  {
    id: 1,
    tabLabel: "OpEx & Lean",
    shortLabel: "OpEx",
    category: "Management Consulting",
    icon: TrendingUp,
    title: "Find the Right Manufacturing Consulting for Your Business Needs",
    description: "Drive bottom-line profitability, eliminate bottlenecks, and achieve 90%+ OEE with proven Total Productive Maintenance (TPM), Lean, and Kaizen implementations.",
    highlights: ["TPM & Lean Deployment", "30% Cost Reduction Target", "Zero Breakdown Culture"],
    ctaText: "Explore OpEx Solutions",
    ctaLink: "/manufacturing-operational-excellence-consulting/",
    image: "/assets/images/resources/main-slider-two-img-1-1.jpg",
    imageAlt: "Tetrahedron Manufacturing Operational Excellence Consulting",
  },
  {
    id: 2,
    tabLabel: "Plant Layout",
    shortLabel: "Layout",
    category: "Facility & Plant Engineering",
    icon: Compass,
    title: "Smart Plant Layout Design for Maximum Flow & Space Productivity",
    description: "End-to-end industrial architecture, 3D workflow simulation, and Lean shop floor engineering for Greenfield setups and Brownfield plant expansions.",
    highlights: ["Greenfield & Brownfield Plants", "3D Flow Simulation", "Zero Bottleneck Design"],
    ctaText: "Explore Layout Design",
    ctaLink: "/plant-layout-design/",
    image: "/assets/images/layoutimg.png",
    imageAlt: "Tetrahedron Plant Layout Design and Industrial Engineering",
  },
  {
    id: 3,
    tabLabel: "AMR / AGV",
    shortLabel: "Robotics",
    category: "Intralogistics Automation",
    icon: Bot,
    title: "Your Trusted Partner for Advanced Mobile Robotics Solutions",
    description: "India's premier engineered AGVs, AMRs, and Rail Guided Vehicles designed for rugged factory floors, handling payloads up to 50 Tons with intelligent fleet coordination.",
    highlights: ["Payloads Up to 50 Tons", "SLAM & QR Navigation", "Industry 4.0 Dispatch"],
    ctaText: "Discover Mobile Robotics",
    ctaLink: "/automated-guided-vehicle-manufacturers/",
    image: "/assets/images/resources/main-slider-two-img-1-2.jpg",
    imageAlt: "Tetrahedron AMR AGV Autonomous Mobile Robots",
  },
  {
    id: 4,
    tabLabel: "DOJO Centers",
    shortLabel: "DOJO",
    category: "Experiential Learning & DOJO",
    icon: ShieldCheck,
    title: "World-Class DOJO Centers: Hands-On Skill & Safety Transformation",
    description: "Turn fresh recruits into production-ready technicians with turnkey physical DOJO setup, DOJO 2.0 digital workstations, and immersive AR/VR simulation modules.",
    highlights: ["Turnkey DOJO Setup", "DOJO 2.0 & AR/VR Modules", "Zero Defect Mindset"],
    ctaText: "Explore DOJO Solutions",
    ctaLink: "/dojo-training-center/",
    image: "/herosection-image/Dojo hero Section.png",
    imageAlt: "Tetrahedron DOJO Training Center Setup",
  },
  {
    id: 5,
    tabLabel: "Skill Training",
    shortLabel: "Training",
    category: "Skill Training & Upskilling",
    icon: GraduationCap,
    title: "Upskill Your Workforce & Accelerate Growth with Corporate Training",
    description: "High-impact technical programs covering APQP, PPAP, FMEA, GD&T, DWM, and statistical process controls to bridge competency gaps and elevate operational quality.",
    highlights: ["35,000+ Professionals Trained", "APQP, PPAP & GD&T", "Custom On-Site Programs"],
    ctaText: "View Training Catalog",
    ctaLink: "/corporate-training-companies/",
    image: "/assets/images/resources/main-slider-two-img-1-3.jpg",
    imageAlt: "Tetrahedron Corporate Skill and Technical Training",
  },
];

export default function Banner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handleGoToSlide = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
    }
  };

  return (
    <>
      <style jsx global>{`
        @keyframes heroFadeIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes tabProgress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        .tetra-hero-clean .swiper-slide-active .slide-content-anim {
          animation: heroFadeIn 0.5s ease-out both;
        }

        .tetra-tab-progress-line {
          animation: tabProgress ${SLIDE_DURATION}ms linear infinite;
        }

        .tetra-hero-clean.is-hovered .tetra-tab-progress-line {
          animation-play-state: paused;
        }
      `}</style>

      <section 
        className={`tetra-hero-clean relative w-full overflow-hidden bg-[#031538] text-white select-none ${isHovered ? 'is-hovered' : ''}`}
        aria-label="Tetrahedron Hero Showcase"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Dynamic Responsive Container Height */}
        <div className="relative w-full h-[520px] sm:h-[540px] md:h-[560px] lg:h-[580px] xl:h-[600px]">
          
          {/* Swiper Slider */}
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={700}
            autoplay={{
              delay: SLIDE_DURATION,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            watchSlidesProgress={true}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            className="w-full h-full"
          >
            {slides.map((slide, idx) => (
              <SwiperSlide key={slide.id} className="relative w-full h-full bg-[#031538]">
                
                {/* Rich Brand Navy Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#02112e] via-[#041c47] to-[#08295f] z-0" />

                {/* Engineering Blueprint Architectural Line Art from tetrahedron branding */}
                <div 
                  className="absolute inset-0 bg-[url('/assets/images/shapes/main-slider-two-shape-6.png')] bg-no-repeat bg-left-bottom opacity-15 pointer-events-none mix-blend-screen z-0"
                  style={{ backgroundSize: 'auto 85%' }}
                />

                {/* Mobile / Tablet Full-Bleed Background (<lg) */}
                <div className="absolute inset-0 lg:hidden z-0 overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.imageAlt}
                    className="w-full h-full object-cover object-center filter brightness-[0.25]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#02112e] via-[#041c47]/90 to-transparent" />
                </div>

                {/* Desktop Full-Bleed Right Image Showcase (>=lg) */}
                <div className="hidden lg:block absolute top-0 right-0 h-full w-[56%] xl:w-[54%] z-10 overflow-hidden pointer-events-none">
                  
                  {/* Angled Clipped Photo Spanning 100% Height */}
                  <div 
                    className="w-full h-full relative"
                    style={{
                      clipPath: "polygon(14% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    }}
                  >
                    <img
                      src={slide.image}
                      alt={slide.imageAlt}
                      className="w-full h-full object-cover object-center transform transition-transform duration-1000"
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                    {/* Subtle Dark Vignette for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02112e]/40 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Dynamic Orange Diagonal Brand Stripe along the angled cut */}
                  <svg 
                    className="absolute top-0 left-0 h-full w-full pointer-events-none z-20"
                    viewBox="0 0 100 100" 
                    preserveAspectRatio="none"
                  >
                    {/* Clean Bold Orange Diagonal Stripe */}
                    <polygon points="14,0 16.8,0 2.8,100 0,100" fill="#ff5e14" />
                  </svg>
                </div>

                {/* Main Content Area */}
                <div className="relative z-20 w-full h-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 flex items-center">
                  <div className="w-full lg:w-[48%] xl:w-[46%] pb-12 pt-4 lg:py-0 text-left slide-content-anim">
                    
                    {/* Clean Category Subtitle with Accent Dash (No bulky box) */}
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <span className="w-6 h-[2.5px] bg-[#ff5e14] rounded-full" />
                      <span className="text-xs sm:text-sm font-bold tracking-[0.16em] text-[#ff7a38] uppercase">
                        {slide.category}
                      </span>
                    </div>

                    {/* Bold, Confident Main Headline */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] font-extrabold text-white leading-[1.16] tracking-tight uppercase">
                      {slide.title}
                    </h1>

                    {/* Concise, Clean Description */}
                    <p className="mt-3.5 text-xs sm:text-sm md:text-base text-slate-200/90 leading-relaxed font-normal max-w-lg">
                      {slide.description}
                    </p>

                    {/* Key Capability Bullet Points (Clean, no nested boxes) */}
                    <div className="mt-3 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs sm:text-sm font-medium text-slate-300">
                      {slide.highlights.map((h, hIdx) => (
                        <span key={hIdx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff5e14]" />
                          <span>{h}</span>
                        </span>
                      ))}
                    </div>

                    {/* Dual Action CTAs: Solid Orange Read More + Clean Contact */}
                    <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-5 sm:gap-7">
                      <Link
                        href={slide.ctaLink}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 rounded-lg font-bold text-sm sm:text-base text-white bg-[#ff5e14] hover:bg-[#ff732e] shadow-lg shadow-orange-600/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <span>{slide.ctaText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      {/* Direct Phone Dial (Clean, open layout without heavy box) */}
                      <a
                        href="tel:8984189814"
                        className="inline-flex items-center gap-3 text-white hover:text-[#ff7a38] transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#001f55] border border-white/20 flex items-center justify-center text-[#ff7a38] group-hover:border-[#ff5e14] transition-colors">
                          <PhoneCall className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <span className="block text-[10px] uppercase font-bold text-slate-300 tracking-wider">
                            Need Help
                          </span>
                          <span className="block text-xs sm:text-sm font-bold text-white group-hover:text-[#ff7a38] transition-colors">
                            (+91) 8984189814
                          </span>
                        </div>
                      </a>
                    </div>

                  </div>
                </div>

              </SwiperSlide>
            ))}
          </Swiper>

          {/* Minimalist Floating Navigation Arrows */}
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="hidden sm:flex absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full items-center justify-center bg-white/10 hover:bg-[#ff5e14] text-white border border-white/20 backdrop-blur-sm transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="hidden sm:flex absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full items-center justify-center bg-white/10 hover:bg-[#ff5e14] text-white border border-white/20 backdrop-blur-sm transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slimline, Lean Bottom Category Tab Switcher (No bulky box) */}
          <div className="absolute bottom-0 left-0 right-0 z-30 bg-[#020e26]/85 backdrop-blur-md border-t border-white/10">
            <div className="max-w-[1360px] mx-auto px-4 sm:px-8 flex items-center justify-between">
              {slides.map((s, sIdx) => {
                const isActive = activeIndex === sIdx;
                const IconComp = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleGoToSlide(sIdx)}
                    className={`relative flex-1 py-2 sm:py-2.5 px-1.5 sm:px-3 text-center sm:text-left transition-colors duration-200 cursor-pointer ${
                      isActive 
                        ? 'text-white font-bold' 
                        : 'text-slate-400 hover:text-slate-200 font-medium'
                    }`}
                  >
                    <div className="flex items-center justify-center sm:justify-start gap-1.5">
                      <span className={`text-[11px] sm:text-xs font-mono font-bold ${isActive ? 'text-[#ff5e14]' : 'text-slate-500'}`}>
                        0{sIdx + 1}
                      </span>
                      <IconComp className={`w-3.5 h-3.5 hidden md:block ${isActive ? 'text-[#ff5e14]' : 'text-slate-500'}`} />
                      <span className="text-[11px] sm:text-xs md:text-sm truncate">
                        <span className="hidden sm:inline">{s.tabLabel}</span>
                        <span className="inline sm:hidden">{s.shortLabel}</span>
                      </span>
                    </div>

                    {/* Slim 2px Active Progress Bar */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff5e14]/30 overflow-hidden">
                        <div 
                          key={activeIndex} 
                          className="tetra-tab-progress-line h-full bg-[#ff5e14]"
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}