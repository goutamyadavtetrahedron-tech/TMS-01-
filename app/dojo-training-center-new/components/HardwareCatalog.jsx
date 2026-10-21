"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ShieldAlert,
  Wrench,
  Gauge,
  ShieldCheck,
  Eye,
  RotateCcw,
  Activity,
  Target,
  CheckCircle2,
  ZoomIn,
} from "lucide-react";
import ImageLightboxModal from "./ImageLightboxModal";

export default function HardwareCatalog({ onOpenVideoModal, onOpenImage }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const handleImageClick = (idx) => {
    setLightboxIndex(idx);
    if (onOpenImage) {
      onOpenImage({
        images: simulations.map((s) => ({
          src: s.image,
          alt: s.title,
          title: s.title,
        })),
        currentIndex: idx,
      });
    }
  };
  const simulations = [
    {
      id: "01",
      icon: ShieldAlert,
      category: "Safety & Hazard Prevention",
      title: "Hand Safety Simulation",
      tag: "Pinch-Point Recognition & Safe Reflexes",
      image: "/assets/images/dojo-physical-simulation/hand-safety.webp",
      desc: "A practical training activity that helps employees recognize hand hazards, understand pinch points, and develop safe working practices around machinery and moving components.",
    },
    {
      id: "02",
      icon: Wrench,
      category: "TPM & Equipment Reliability",
      title: "TPM Pillar Simulation",
      tag: "Autonomous Maintenance & 5S Discipline",
      image: "/assets/images/dojo-physical-simulation/TPM-Pillar.webp",
      desc: "An interactive learning experience that introduces employees to Total Productive Maintenance (TPM), its key pillars, and their role in equipment maintenance, reliability, and workplace productivity.",
    },
    {
      id: "03",
      icon: Gauge,
      category: "Process Data & Metrics",
      title: "Process Parameter Awareness",
      tag: "SI Units & Software Display Values",
      image: "/assets/images/dojo-physical-simulation/process-parameter-awareness.jpg",
      desc: "An interactive learning activity designed to help employees understand standard process parameters, measurement units, and reference values used in manufacturing processes and software displays.",
    },
    {
      id: "04",
      icon: ShieldCheck,
      category: "PPE Selection & Compliance",
      title: "PPE Matrix Simulation",
      tag: "Hazard-Specific PPE Selection & Usage",
      image: "/assets/images/dojo-physical-simulation/PPE-Matrix.webp",
      desc: "A practical training module that educates employees on selecting and using the correct Personal Protective Equipment (PPE) based on specific plant activities and workplace hazards.",
    },
    {
      id: "05",
      icon: Eye,
      category: "Sensory Quality Calibration",
      title: "Five Senses – Metal Aggregation",
      tag: "Tactile, Acoustic & Visual Metal Identification",
      image: "/assets/images/dojo-physical-simulation/5-senses-metal-seggration.webp",
      desc: "An engaging sensory training activity where employees identify and categorize different types of metals using visual inspection, sound, and touch.",
    },
    {
      id: "06",
      icon: RotateCcw,
      category: "Fastening & Joint Integrity",
      title: "Torquing & Detorquing Simulation",
      tag: "Torque Specs, Fastener Integrity & Tool Handling",
      image: "/assets/images/dojo-physical-simulation/torquing-detorquing.webp",
      desc: "A hands-on training module focused on standard tightening and loosening techniques, proper tool handling, and following specified torque requirements to ensure joint integrity.",
    },
    {
      id: "07",
      icon: Activity,
      category: "Ergonomics & Fatigue Prevention",
      title: "Standing Posture Simulation",
      tag: "Body Alignment & Fatigue-Reducing Positions",
      image: "/assets/images/dojo-physical-simulation/standing-posture.webp",
      desc: "A posture-awareness training activity that demonstrates correct standing posture, body alignment, and ergonomic working positions to reduce fatigue and prevent physical strain.",
    },
    {
      id: "08",
      icon: Target,
      category: "Motor Skills & Agility",
      title: "Hand Stability Simulation",
      tag: "Fine Motor Control & Buzzer-Wire Precision",
      image: "/assets/images/dojo-physical-simulation/hand-stabilization-buzz-wire.webp",
      desc: "A buzzer-wire inspired agility exercise designed to test and improve hand stability, fine motor control, and hand-eye coordination for precision assembly tasks.",
    },
  ];

  return (
    <section id="simulations-catalog" className="py-20 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Clean Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase text-[#ff5722] tracking-wider">
            Interactive Industrial Modules
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#001730] mt-1 tracking-tight">
            Industrial Training Simulations{" "}
            <span className="text-[#ff5722]">We Develop</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            Practical, interactive training solutions designed to improve employee safety awareness, technical knowledge, process understanding, and shopfloor skills through engaging learning experiences.
          </p>
        </div>

        {/* Clean 4-Column Grid with Full Content & Click-To-Open Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {simulations.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-[#ff5722] hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Click-To-Open Image Container */}
                  <div
                    onClick={() => handleImageClick(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleImageClick(idx);
                      }
                    }}
                    title="Click to view full image"
                    className="relative h-44 sm:h-48 w-full rounded-xl overflow-hidden mb-3.5 bg-slate-100 border border-slate-200/60 shadow-inner cursor-zoom-in group/img"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-center group-hover/img:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-70 group-hover/img:opacity-50 transition-opacity" />
                    
                    {/* View / Zoom Pill on Top Left */}
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium flex items-center gap-1 group-hover/img:bg-[#ff5722] transition-colors">
                      <ZoomIn className="w-3 h-3 text-[#ff5722] group-hover/img:text-white" />
                      <span>View</span>
                    </span>

                    {/* Category Icon Badge on Top Right */}
                    <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-md bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#ff5722] shadow-xs">
                      <Icon className="w-3.5 h-3.5" />
                    </span>

                    {/* Full Tag Display without Truncation */}
                    <span className="absolute bottom-2 left-2.5 right-2.5 text-[10px] font-semibold text-white/95 line-clamp-2 leading-tight">
                      {item.tag}
                    </span>
                  </div>

                  {/* Category & Title */}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff5722] block mb-1">
                    {item.category}
                  </span>

                  <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#ff5722] transition-colors mb-1.5">
                    {item.title}
                  </h3>

                  {/* Complete, Uncut Description */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap">
                    Physical Simulation Rig
                  </span>

                  <button
                    type="button"
                    onClick={() => onOpenVideoModal(`Specs Request: ${item.title}`)}
                    className="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-[#ff5722] hover:text-[#f4511e] hover:underline cursor-pointer"
                  >
                    <span>Request Specs</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Sub-banner */}
        <div className="mt-10 p-5 rounded-2xl bg-orange-50/70 border border-orange-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#ff5722] text-white flex items-center justify-center shrink-0 shadow-sm">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-slate-900 font-bold block sm:inline">
                Need custom physical or sensory simulation activities engineered for your plant?
              </strong>{" "}
              <span>
                We fabricate bespoke benches calibrated to your specific components, safety protocols, and takt times.
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onOpenVideoModal("Custom Simulation Jigs Inquiry")}
            className="whitespace-nowrap px-5 py-2 rounded-full bg-[#001730] hover:bg-slate-900 text-white font-semibold shadow-sm transition-colors cursor-pointer"
          >
            Consult on Custom Jigs
          </button>
        </div>
      </div>

      {lightboxIndex !== null && (
        <ImageLightboxModal
          images={simulations.map((s) => ({
            src: s.image,
            alt: s.title,
            title: s.title,
          }))}
          currentIndex={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}
