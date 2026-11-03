"use client";

import React from "react";
import { Play, Sparkles, CheckCircle2 } from "lucide-react";

export default function VideoSpotlight() {
  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Context & Explanations */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#ff5722] text-xs font-bold uppercase tracking-wider">
              <Play className="w-3.5 h-3.5 fill-current" />
              Real Shopfloor Simulation Drill
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002244] tracking-tight leading-tight">
              Watch Experiential Tactile Skilling in Action
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Observe how sensory conditioning transforms an operator's dexterity. Notice how the operator's hands synchronize unconsciously—retrieving fasteners and positioning sub-components simultaneously without looking away from the primary fixture.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-[#ff5722] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700">
                  <strong className="text-slate-900 block font-semibold">Subconscious Motor Synchronization:</strong>
                  Eliminates visual hunting for parts, saving 4 to 8 seconds on every repetitive cycle.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-[#ff5722] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700">
                  <strong className="text-slate-900 block font-semibold">Sensorized Micro-Timers:</strong>
                  Real-time buzzer alarms alert the operator the exact millisecond cycle takt time is exceeded.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Responsive YouTube Player */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 bg-slate-950">
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/Wn4lpt6Rg1I?rel=0"
                  title="Experiential Dojo Training Center in Action"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
