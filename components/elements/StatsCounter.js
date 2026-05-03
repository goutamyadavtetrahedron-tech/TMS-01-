"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 350, suffix: "+", label: "Training Conducted Modules" },
  { value: 15000, suffix: "+", label: "Participants" },
  { label: <>End-to-End Training <br/>Solution</> }, // no counter
];

export default function StatsCounter() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const duration = 2000;
    const startTime = performance.now();

    function animate(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCounts(
        stats.map((item) => {
        
          if (!item.value) return null;

          const currentValue = item.value * progress;
          return Math.floor(currentValue).toLocaleString("en-IN");
        })
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [started]);

  return (
    <section className="pb-20 md:px-6 px-6 lg:px-0">
      <div
        ref={sectionRef}
        className="max-w-6xl mx-auto bg-[#001659] px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center rounded-2xl"
      >
        {stats.map((item, index) => (
          <div key={index}>
          
            {item.value ? (
              <h3 className="text-white text-xl md:text-xl font-semibold">
                {counts[index]}
                {item.suffix}
              </h3>
            ) : (
              <h3 className="text-white text-2xl md:text-3xl font-semibold">
         
               
              </h3>
            )}

            <p className="mt-2 text-white  font-bold">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}