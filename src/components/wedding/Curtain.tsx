import { useState, useEffect, useRef } from "react";
import curtainTexture from "@/assets/curtain-texture.png";

interface Props {
  children: React.ReactNode;
  label?: string;
  minHeight?: string;
}

// Wedding-palette confetti colors
const COLORS = [
  "oklch(0.78 0.10 82)",   // gold
  "oklch(0.72 0.14 0)",    // rose / magenta
  "oklch(0.55 0.18 22)",   // deep maroon
  "oklch(0.96 0.03 82)",   // ivory
  "oklch(0.80 0.12 55)",   // warm amber
  "oklch(0.68 0.16 350)",  // dusty pink
];

const SHAPES = ["circle", "rect", "petal"] as const;

interface Particle {
  id: number;
  x: number;       // % from left
  size: number;    // px
  color: string;
  shape: typeof SHAPES[number];
  delay: number;   // s
  duration: number; // s
  swing: number;   // px horizontal drift
  rotation: number; // deg end rotation
}

function spawnParticles(count = 55): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 96 + 2,           // 2–98%
    size: Math.random() * 6 + 4,          // 4–10 px
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    delay: Math.random() * 1.2,           // 0–1.2s stagger
    duration: Math.random() * 1.8 + 2.0,  // 2.0–3.8s fall
    swing: (Math.random() - 0.5) * 80,   // ±40 px
    rotation: Math.random() * 720 - 360, // ±360 deg
  }));
}

function ConfettiBurst({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) return;
    setParticles(spawnParticles(55));
    // clean up after longest possible animation (1.2 delay + 3.8 fall + buffer)
    timerRef.current = setTimeout(() => setParticles([]), 6000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active]);

  if (!particles.length) return null;

  return (
    <div className="absolute inset-0 z-[50] pointer-events-none overflow-hidden">
      {particles.map((p) => {
        const isRect = p.shape === "rect";
        const isPetal = p.shape === "petal";
        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: "-12px",
              width: isRect ? p.size * 0.6 : p.size,
              height: isRect ? p.size * 1.6 : p.size,
              background: isPetal ? "none" : p.color,
              borderRadius: isPetal ? "0" : isRect ? "2px" : "50%",
              opacity: 0,
              animation: `curtain-confetti-fall ${p.duration}s ease-in ${p.delay}s forwards`,
              // store custom props via CSS vars for the keyframe
              ["--swing" as string]: `${p.swing}px`,
              ["--rot" as string]: `${p.rotation}deg`,
            }}
          >
            {isPetal && (
              // soft petal SVG
              <svg viewBox="0 0 10 14" width={p.size} height={p.size * 1.4} style={{ display: "block" }}>
                <ellipse cx="5" cy="7" rx="4.5" ry="6.5" fill={p.color} opacity="0.85" />
              </svg>
            )}
          </div>
        );
      })}

      {/* keyframe injected inline via a style tag */}
      <style>{`
        @keyframes curtain-confetti-fall {
          0%   { opacity: 0;   transform: translateY(0)      translateX(0)              rotate(0deg); }
          8%   { opacity: 0.9; }
          80%  { opacity: 0.7; }
          100% { opacity: 0;   transform: translateY(110vh)  translateX(var(--swing))   rotate(var(--rot)); }
        }
      `}</style>
    </div>
  );
}

export function Curtain({ children, label = "Tap to Unveil", minHeight }: Props) {
  const [open, setOpen] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const handleOpen = () => {
    if (open) return;
    setOpen(true);
    // slight delay so confetti appears as curtains start parting
    setTimeout(() => {
      setConfetti(true);
      setTimeout(() => setConfetti(false), 100); // pulse it once; ConfettiBurst handles cleanup
    }, 400);
  };

  return (
    <div className="relative overflow-hidden rounded-xl" style={{
      border: "1px solid oklch(0.78 0.10 80 / 0.4)",
      boxShadow: "0 8px 40px -12px oklch(0.4 0.06 60 / 0.2), inset 0 0 0 1px oklch(0.90 0.06 85 / 0.3)",
      ...(minHeight ? { minHeight } : {}),
    }}>
      {/* content behind the curtain */}
      <div className="relative z-10">{children}</div>

      {/* ─── CONFETTI BURST ─── */}
      <ConfettiBurst active={confetti} />

      {/* ─── GOLD CURTAIN ROD ─── */}
      <div
        className="absolute top-0 inset-x-0 z-[45] h-5"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.78 0.09 80) 0%, oklch(0.70 0.11 76) 40%, oklch(0.64 0.10 72) 100%)",
          boxShadow: "0 2px 8px oklch(0.45 0.06 65 / 0.25)",
        }}
      />
      {/* scalloped valance */}
      <svg
        className="absolute top-5 inset-x-0 z-[45] pointer-events-none"
        style={{ width: "100%", height: "16px" }}
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="scallop" x="0" y="0" width="28" height="16" patternUnits="userSpaceOnUse">
            <path d="M0 0 Q14 16 28 0" fill="oklch(0.70 0.11 76)" />
          </pattern>
        </defs>
        <rect width="100%" height="16" fill="url(#scallop)" />
      </svg>
      {/* center finial */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full z-[46] -translate-y-1"
        style={{
          background: "radial-gradient(circle at 38% 35%, oklch(0.86 0.08 86), oklch(0.68 0.10 76))",
          boxShadow: "0 2px 6px oklch(0.4 0.06 60 / 0.3)",
          border: "1px solid oklch(0.75 0.10 80 / 0.5)",
        }}
      />

      {/* ─── LEFT CURTAIN ─── */}
      <div
        className="absolute top-0 bottom-0 left-0 w-[51%] z-[35]"
        style={{
          transform: open ? "translateX(-86%)" : "translateX(0)",
          transition: "transform 2.2s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `url(${curtainTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        {/* center-seam shadow */}
        <div className="absolute top-0 right-0 bottom-0 w-6" style={{
          background: "linear-gradient(270deg, oklch(0.7 0.04 74 / 0.2), transparent)",
        }} />
      </div>

      {/* ─── RIGHT CURTAIN ─── */}
      <div
        className="absolute top-0 bottom-0 right-0 w-[51%] z-[35]"
        style={{
          transform: open ? "translateX(86%)" : "translateX(0)",
          transition: "transform 2.2s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `url(${curtainTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        {/* center-seam shadow */}
        <div className="absolute top-0 left-0 bottom-0 w-6" style={{
          background: "linear-gradient(90deg, oklch(0.7 0.04 74 / 0.2), transparent)",
        }} />
      </div>

      {/* ─── CENTER MEDALLION KNOT ─── */}
      {!open && (
        <button
          onClick={handleOpen}
          className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 z-[48] flex flex-col items-center group"
          aria-label="Tap to unveil"
        >
          {/* Glow & Ring */}
          <div className="absolute" style={{ 
            top: "55%", 
            left: "50%", 
            transform: "translate(-50%, -50%)", 
            width: 140, 
            height: 140, 
            borderRadius: "50%", 
            background: "radial-gradient(circle, oklch(0.85 0.08 80 / 0.5) 0%, transparent 70%)", 
            filter: "blur(12px)" 
          }} />
          
          <div className="relative w-20 h-20 rounded-full flex items-center justify-center mt-2 transition-transform duration-500 group-hover:scale-110" 
               style={{ 
                 background: "conic-gradient(from 0deg, oklch(0.78 0.10 82), oklch(0.65 0.12 74), oklch(0.80 0.09 84), oklch(0.68 0.11 76), oklch(0.78 0.10 82))", 
                 padding: 3,
                 boxShadow: "0 10px 30px -5px oklch(0.32 0.14 22 / 0.4)"
               }}>
            <div className="w-full h-full rounded-full flex items-center justify-center" 
                 style={{ 
                   background: "radial-gradient(circle at 40% 35%, oklch(0.88 0.07 84), oklch(0.72 0.10 78))", 
                   border: "1.5px solid oklch(0.82 0.08 82 / 0.6)" 
                 }}>
               <div className="w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full flex items-center justify-center" 
                    style={{ border: "0.5px solid oklch(0.90 0.05 84 / 0.5)" }}>
                 <span className="flex items-baseline gap-0.5 select-none" style={{ color: "oklch(0.97 0.02 86)" }}>
                   <span className="font-script text-2xl leading-none">M</span>
                   <span className="font-serif text-xs leading-none italic" style={{ opacity: 0.8 }}>&</span>
                   <span className="font-script text-2xl leading-none">D</span>
                 </span>
               </div>
            </div>
          </div>

          {/* TAP TO UNVEIL LABEL */}
          <div className="mt-5 flex flex-col items-center">
            <span className="font-display text-[9px] md:text-[10px] tracking-[0.45em] uppercase px-6 py-2 transition-all duration-300 group-hover:tracking-[0.6em]" 
                  style={{ 
                    color: "oklch(0.50 0.05 55)", 
                    background: "oklch(0.98 0.015 85 / 0.92)", 
                    borderRadius: 2,
                    boxShadow: "0 4px 12px oklch(0.32 0.14 22 / 0.1)"
                  }}>
              {label}
            </span>
          </div>
        </button>
      )}

    </div>
  );
}
