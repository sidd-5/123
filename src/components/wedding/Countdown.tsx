import { useEffect, useState } from "react";

const TARGET = new Date("2026-06-20T15:45:00+05:30").getTime();

function diff() {
  const now = Date.now();
  const d = Math.max(0, TARGET - now);
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d / 3600000) % 24),
    minutes: Math.floor((d / 60000) % 60),
    seconds: Math.floor((d / 1000) % 60),
  };
}

export function Countdown() {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    setT(diff());
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.minutes },
    { label: "Seconds", value: t.seconds },
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4">
      {/* Outer Ivory Container */}
      <div 
        className="p-6 md:p-12 rounded-[2rem] gold-border" 
        style={{ 
          background: `linear-gradient(180deg, oklch(0.97 0.02 80), oklch(0.93 0.04 75))` 
        }}
      >
        {/* Inner Maroon Blocks */}
        <div className="flex items-center justify-center gap-3 md:gap-8 relative z-10">
          {items.map((it) => (
            <div 
              key={it.label} 
              className="flex flex-col items-center justify-center w-[75px] h-[90px] sm:w-[90px] sm:h-[110px] md:w-40 md:h-40 rounded-2xl md:rounded-3xl transition-transform hover:-translate-y-1"
              style={{
                background: "var(--maroon)",
                boxShadow: "0 10px 25px -5px oklch(0.32 0.14 22 / 0.6)",
              }}
            >
              <div
                className="font-display text-3xl sm:text-4xl md:text-6xl text-gold-shimmer tabular-nums"
              >
                {String(it.value).padStart(2, "0")}
              </div>
              <div
                className="mt-2 md:mt-4 font-display text-[7px] sm:text-[9px] md:text-xs tracking-[0.2em] md:tracking-[0.4em] uppercase"
                style={{ color: "var(--gold)" }}
              >
                {it.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
