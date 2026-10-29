"use client";

import React from "react";
import Image from "next/image";
import {
  Building2,
  ShieldCheck,
  Package,
  Eye,
  Workflow,
  Cog,
  Award,
  Wrench,
  Activity,
  Lightbulb,
  Users,
  TrendingUp,
  Check,
} from "lucide-react";

export default function TenLevelsDojo() {
  const levels = [
    {
      level: "01",
      title: "Know Your Company",
      icon: Building2,
      desc: "Understand our mission, vision, values, products, customers and your role in creating value.",
      image: "/images/dojo/ten-levels/rect_level_01.jpg",
    },
    {
      level: "02",
      title: "Safety",
      icon: ShieldCheck,
      desc: "Follow safety rules, identify hazards, prevent accidents and protect yourself and your team.",
      image: "/images/dojo/ten-levels/rect_level_02.jpg",
    },
    {
      level: "03",
      title: "Product",
      icon: Package,
      desc: "Know our products, materials, features, specifications and how they create value for customers.",
      image: "/images/dojo/ten-levels/rect_level_03.jpg",
    },
    {
      level: "04",
      title: "Five Senses",
      icon: Eye,
      desc: "Observe and detect abnormalities using sight, touch, hearing, smell and safe sensory checks.",
      image: "/images/dojo/ten-levels/rect_level_04.jpg",
    },
    {
      level: "05",
      title: "Process",
      icon: Workflow,
      desc: "Learn the standard work, process steps, key points and best practices to do it the right way every time.",
      image: "/images/dojo/ten-levels/rect_level_05.jpg",
    },
    {
      level: "06",
      title: "Production",
      icon: Cog,
      desc: "Apply the process on the shop floor, improve efficiency, reduce waste and ensure smooth operations.",
      image: "/images/dojo/ten-levels/rect_level_06.jpg",
    },
    {
      level: "07",
      title: "Quality",
      icon: Award,
      desc: "Perform inspections, follow standards and ensure zero defects with a quality mindset.",
      image: "/images/dojo/ten-levels/rect_level_07.jpg",
    },
    {
      level: "08",
      title: "Maintenance",
      icon: Wrench,
      desc: "Keep equipment in best condition, follow preventive maintenance and ensure reliability.",
      image: "/images/dojo/ten-levels/rect_level_08.jpg",
    },
    {
      level: "09",
      title: "Ergonomics",
      icon: Activity,
      desc: "Work smart and safe by applying ergonomic principles for better health, comfort and productivity.",
      image: "/images/dojo/ten-levels/rect_level_09.jpg",
    },
    {
      level: "10",
      title: "Innovation",
      icon: Lightbulb,
      desc: "Think better, do better. Suggest improvements, solve problems and create value for the future.",
      image: "/images/dojo/ten-levels/rect_level_10.jpg",
    },
  ];

  const outcomes = [
    { title: "Better People", icon: Users },
    { title: "Better Process", icon: Cog },
    { title: "Better Quality", icon: Check },
    { title: "Better Future", icon: TrendingUp },
  ];

  return (
    <section className="pt-8 sm:pt-10 pb-8 sm:pb-10 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#001730] tracking-tight leading-tight mb-2 sm:mb-2.5">
            10 Levels of DOJO
          </h2>

          {/* Tagline with Orange Bullets */}
          <p className="text-sm sm:text-base lg:text-[17px] font-semibold text-slate-700 tracking-wide">
            Learn <span className="text-[#ff5722] font-bold mx-1.5 sm:mx-2">•</span> Practice <span className="text-[#ff5722] font-bold mx-1.5 sm:mx-2">•</span> Excel <span className="text-[#ff5722] font-bold mx-1.5 sm:mx-2">•</span> Improve Every Day
          </p>
        </div>

        {/* 10 Levels Two-Column Ladder Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mb-6 sm:mb-7">
          {levels.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.level}
                className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-[#ff5722]/60 hover:shadow-md transition-all flex flex-col sm:flex-row items-stretch overflow-hidden"
              >
                {/* Left Side: Number + Icon + Title + Content */}
                <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2.5">
                    {/* Number Badge - Uniform Navy Blue for All 10 Levels */}
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold font-mono shrink-0 shadow-2xs bg-[#001730] text-white">
                      {item.level}
                    </span>

                    {/* Category Icon */}
                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-700 shrink-0">
                      <Icon className="w-4 h-4 text-slate-700" />
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-[#001730] tracking-tight group-hover:text-[#ff5722] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Content Description */}
                  <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed sm:pl-[44px]">
                    {item.desc}
                  </p>
                </div>

                {/* Right Side: Authentic Shopfloor Photo from 4.10-Levels-of-Dojo.jpeg */}
                <div className="relative w-full sm:w-44 md:w-48 lg:w-52 h-40 sm:h-auto shrink-0 bg-slate-100 overflow-hidden sm:[clip-path:polygon(14%_0,_100%_0,_100%_100%,_0_100%)]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 220px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact 4 Outcome Pillars Bar - Exactly from 4.10-Levels-of-Dojo.jpeg */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-blue-50/80 border border-blue-200/70 py-3.5 px-4 sm:px-6 shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 divide-y sm:divide-y-0 md:divide-x divide-blue-200/70">
            {outcomes.map((o, idx) => {
              const OutcomeIcon = o.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center justify-center gap-2.5 py-1.5 md:py-0 px-2"
                >
                  <div className="w-8 h-8 rounded-full bg-[#001730] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <OutcomeIcon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#001730] tracking-tight whitespace-nowrap">
                    {o.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
