'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Business() {
  const services = [
    {
      badge: "OPERATIONAL EXCELLENCE",
      metric: "10%–20% Margin Gain",
      title: "Management Consulting",
      img: "/assets/images/services/business1.jpg",
      link: "/manufacturing-operational-excellence-consulting/",
      text: "Comprehensive manufacturing advisory improving profitability, operations, and shop-floor productivity across India.",
      bullets: [
        "Plant Layout & Facility Optimization",
        "Total Productive Maintenance (TPM) & Lean",
        "Safety Systems & 10%–20% Cost Reduction"
      ]
    },
    {
      badge: "CAPABILITY BUILDING",
      metric: "400+ Training Modules",
      title: "Skill Training & DOJO",
      img: "/assets/images/services/business2.jpg",
      link: "/corporate-training-companies/",
      text: "Practical, implementable capability building enabling leadership, managers, and shop-floor teams to excel.",
      bullets: [
        "400+ Targeted Skill Development Modules",
        "Experiential DOJO Center Setup & Training",
        "Technical, Behavioral & Leadership Programs"
      ]
    },
    {
      badge: "SMART AUTOMATION",
      metric: "Up to 50T AMRs / AGVs",
      title: "Automation & Industry 4.0",
      img: "/assets/images/services/business3.jpg",
      link: "/automated-guided-vehicle-manufacturers/",
      text: "End-to-end digital transformation integrating smart robotics, IoT sensors, and cutting-edge automation.",
      bullets: [
        "In-House Heavy-Duty AMRs & AGVs (Up to 50T)",
        "IoT Sensors, AI Analytics & AR/VR Systems",
        "Turnkey Smart Factory & Material Handling"
      ]
    }
  ];

  return (
    <section 
      id="business-verticals"
      className="relative w-full bg-slate-50/60 py-6 sm:py-8 lg:py-10 overflow-hidden"
      style={{ fontFamily: "var(--font-poppins, 'Poppins', sans-serif)" }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .business-cta-btn {
          background-color: #f8fafc !important;
          color: #0a1c4c !important;
          border: 1px solid #e2e8f0 !important;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .business-cta-btn span,
        .business-cta-btn svg {
          color: #0a1c4c !important;
          transition: all 0.25s ease !important;
        }
        .business-card:hover .business-cta-btn {
          background-color: #0a1c4c !important;
          color: #ffffff !important;
          border-color: #0a1c4c !important;
          box-shadow: 0 4px 14px rgba(10, 28, 76, 0.15) !important;
        }
        .business-card:hover .business-cta-btn span,
        .business-card:hover .business-cta-btn svg {
          color: #ffffff !important;
        }
        .business-card .business-cta-btn:hover {
          background-color: #2563eb !important;
          border-color: #2563eb !important;
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.25) !important;
        }
      `}} />

      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-5 sm:mb-7">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <span className="w-5 h-[2px] bg-[#ff5e14] rounded-full" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.16em] text-[#ff5e14] uppercase">
              OUR CORE CAPABILITIES
            </span>
            <span className="w-5 h-[2px] bg-[#ff5e14] rounded-full" />
          </div>
          <h2 
            className="text-xl sm:text-2xl lg:text-[26px] font-bold tracking-tight m-0"
            style={{ fontFamily: "var(--font-poppins, 'Poppins', sans-serif)", fontWeight: 700, color: "#0a1c4c" }}
          >
            Tetrahedron Business Vertical
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mt-1.5">
            End-to-end manufacturing transformation across consulting, skill training, and robotics.
          </p>
        </div>

        {/* 3 Verticals Grid with Prominent Hero Imagery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {services.map((service, index) => (
            <div 
              key={index}
              className="business-card bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(10,28,76,0.09)] hover:border-blue-400/80 hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden group h-full"
            >
              {/* Card Media Header - Expanded Image Height for Prominent Visual Impact */}
              <div className="relative h-[225px] sm:h-[245px] lg:h-[255px] w-full shrink-0 overflow-hidden bg-slate-100">
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent" />
                
                {/* Category Pill Tag */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-[10.5px] font-bold tracking-wider uppercase bg-white/95 text-[#0a1c4c] shadow-xs backdrop-blur-md border border-white/60">
                    {service.badge}
                  </span>
                </div>

                {/* Metric / Value Highlight */}
                <div className="absolute bottom-3 right-3.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10.5px] font-semibold text-white bg-black/45 backdrop-blur-xs border border-white/20">
                    <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                    {service.metric}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4.5 sm:p-5 lg:p-5.5 flex flex-col flex-1 justify-between">
                <div>
                  {/* Synchronized 1-Line Title (Guaranteed Single-Line Fit Across All Viewports) */}
                  <div className="h-7 sm:h-8 flex items-center mb-2 overflow-hidden">
                    <h3 
                      className="text-[14.5px] sm:text-[15.5px] lg:text-[15px] xl:text-[16.5px] font-bold leading-none m-0 whitespace-nowrap tracking-tight transition-colors"
                      style={{ color: '#0a1c4c' }}
                    >
                      <Link 
                        href={service.link}
                        className="transition-colors hover:text-blue-600 block whitespace-nowrap"
                        style={{ color: '#0a1c4c' }}
                      >
                        {service.title}
                      </Link>
                    </h3>
                  </div>

                  {/* Synchronized Description */}
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-[1.55] m-0 mb-3.5 min-h-[40px]">
                    {service.text}
                  </p>

                  {/* 3 Structured Key Capabilities */}
                  <div className="pt-3 border-t border-slate-100 mb-4">
                    <ul className="space-y-1.5 m-0 p-0 list-none">
                      {service.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2 text-[12px] sm:text-[12.5px] text-slate-600 leading-tight">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Single Prominent Full-Width CTA */}
                <div className="mt-auto pt-2">
                  <Link
                    href={service.link}
                    className="business-cta-btn w-full py-2.5 px-4 rounded-xl text-xs sm:text-[13px] font-bold flex items-center justify-center gap-2 cursor-pointer group/btn"
                    aria-label={`Explore ${service.title}`}
                  >
                    <span>Explore Solutions</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
