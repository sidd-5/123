import { useEffect, useRef, useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

/**
 * A vintage embroidered letter that unrolls horizontally from left to right
 * when scrolled into view, revealing the poem within.
 */
export function EmbroideredLetter({ children }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setOpen(true), 250);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-3xl px-4 select-none">
      {/* Outer parchment container */}
      <div
        className="relative mx-auto"
        style={{
          perspective: "1600px",
        }}
        onClick={() => setOpen((v) => !v)}
      >
        {/* The unrolling parchment */}
        <div
          className="relative mx-auto overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, oklch(0.96 0.025 85) 0%, oklch(0.92 0.04 80) 60%, oklch(0.86 0.05 75) 100%)",
            border: "1px solid oklch(0.65 0.08 60 / 0.35)",
            boxShadow:
              "0 20px 60px -20px oklch(0.30 0.10 40 / 0.45), inset 0 0 80px oklch(0.65 0.10 50 / 0.20)",
            borderRadius: "6px",
            clipPath: open
              ? "inset(0 0 0 0 round 6px)"
              : "inset(0 100% 0 0 round 6px)",
            transition: "clip-path 2.2s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* Subtle parchment grain */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, oklch(0.55 0.08 50 / 0.04) 0 2px, transparent 2px 6px), radial-gradient(circle at 20% 30%, oklch(0.55 0.10 40 / 0.10), transparent 50%), radial-gradient(circle at 80% 70%, oklch(0.55 0.10 40 / 0.10), transparent 50%)",
            }}
          />

          {/* Embroidered border frame */}
          <EmbroideredBorder />

          {/* Inner poem content with stagger fade */}
          <div
            className="relative px-8 py-12 md:px-16 md:py-16"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateX(0)" : "translateX(-20px)",
              transition: "opacity 1s ease 1.4s, transform 1s ease 1.4s",
            }}
          >
            {children}
          </div>
        </div>

        {/* Rolled scroll on the right side — moves right as letter unrolls */}
        <div
          className="absolute top-0 bottom-0 z-20 pointer-events-none"
          style={{
            left: open ? "100%" : "0%",
            transform: "translateX(-50%)",
            transition: "left 2.2s cubic-bezier(0.22, 1, 0.36, 1)",
            width: "30px",
          }}
        >
          <div
            className="relative h-full w-full overflow-hidden"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.46 0.07 72) 0%, oklch(0.72 0.12 84) 24%, oklch(0.93 0.08 90) 48%, oklch(0.76 0.12 84) 70%, oklch(0.42 0.06 70) 100%)",
              borderRadius: "999px",
              boxShadow:
                "0 14px 28px -12px oklch(0.30 0.08 60 / 0.55), inset 5px 0 8px oklch(1 0 0 / 0.28), inset -7px 0 10px oklch(0.30 0.06 70 / 0.38)",
            }}
          >
            <div
              className="absolute inset-y-0 left-1/2 w-px opacity-60"
              style={{
                background:
                  "linear-gradient(180deg, transparent, oklch(1 0 0 / 0.65), transparent)",
              }}
            />
          </div>

          <div
            className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: "46px",
              height: "12px",
              background:
                "linear-gradient(180deg, oklch(0.94 0.08 90), oklch(0.62 0.11 82))",
              boxShadow: "0 3px 8px oklch(0.30 0.08 60 / 0.32)",
            }}
          />
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: "46px",
              height: "12px",
              background:
                "linear-gradient(180deg, oklch(0.62 0.11 82), oklch(0.94 0.08 90))",
              boxShadow: "0 -3px 8px oklch(0.30 0.08 60 / 0.26)",
            }}
          />
        </div>

        {/* Closed-state hint */}
        {!open && (
          <div className="absolute inset-0 flex items-center justify-end pr-6 z-30 pointer-events-none">
            <span
              className="font-display text-[9px] md:text-[10px] tracking-[0.5em] uppercase animate-pulse"
              style={{ color: "oklch(0.45 0.18 25)" }}
            >
              Unroll →
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/** SVG embroidered floral border frame */
function EmbroideredBorder() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 w-full h-full"
      preserveAspectRatio="none"
      viewBox="0 0 600 800"
    >
      <defs>
        <pattern
          id="embroidery-vine"
          x="0"
          y="0"
          width="60"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          {/* stitched vine with leaves and flowers */}
          <path
            d="M0 15 Q15 0 30 15 T60 15"
            fill="none"
            stroke="oklch(0.45 0.18 25)"
            strokeWidth="1.2"
            strokeDasharray="2 2"
          />
          <circle cx="15" cy="6" r="2.5" fill="oklch(0.55 0.20 30)" />
          <circle cx="15" cy="6" r="0.8" fill="oklch(0.85 0.12 80)" />
          <circle cx="45" cy="24" r="2.5" fill="oklch(0.55 0.20 30)" />
          <circle cx="45" cy="24" r="0.8" fill="oklch(0.85 0.12 80)" />
          <ellipse
            cx="30"
            cy="15"
            rx="3"
            ry="1.5"
            fill="oklch(0.55 0.15 140)"
            transform="rotate(30 30 15)"
          />
        </pattern>
        <pattern
          id="embroidery-vine-v"
          x="0"
          y="0"
          width="30"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M15 0 Q0 15 15 30 T15 60"
            fill="none"
            stroke="oklch(0.45 0.18 25)"
            strokeWidth="1.2"
            strokeDasharray="2 2"
          />
          <circle cx="6" cy="15" r="2.5" fill="oklch(0.55 0.20 30)" />
          <circle cx="6" cy="15" r="0.8" fill="oklch(0.85 0.12 80)" />
          <circle cx="24" cy="45" r="2.5" fill="oklch(0.55 0.20 30)" />
          <circle cx="24" cy="45" r="0.8" fill="oklch(0.85 0.12 80)" />
          <ellipse
            cx="15"
            cy="30"
            rx="1.5"
            ry="3"
            fill="oklch(0.55 0.15 140)"
            transform="rotate(30 15 30)"
          />
        </pattern>
      </defs>

      {/* Top border */}
      <rect x="14" y="14" width="572" height="22" fill="url(#embroidery-vine)" />
      {/* Bottom border */}
      <rect x="14" y="764" width="572" height="22" fill="url(#embroidery-vine)" />
      {/* Left border */}
      <rect x="14" y="14" width="22" height="772" fill="url(#embroidery-vine-v)" />
      {/* Right border */}
      <rect x="564" y="14" width="22" height="772" fill="url(#embroidery-vine-v)" />

      {/* Inner gold rule */}
      <rect
        x="42"
        y="42"
        width="516"
        height="716"
        fill="none"
        stroke="oklch(0.72 0.12 78)"
        strokeWidth="0.6"
        strokeDasharray="3 3"
        opacity="0.7"
      />

      {/* Corner medallions */}
      {[
        { x: 26, y: 26 },
        { x: 574, y: 26 },
        { x: 26, y: 774 },
        { x: 574, y: 774 },
      ].map((c, i) => (
        <g key={i} transform={`translate(${c.x} ${c.y})`}>
          <circle r="10" fill="oklch(0.86 0.08 84)" stroke="oklch(0.45 0.18 25)" strokeWidth="1" />
          <circle r="5" fill="oklch(0.55 0.20 30)" />
          <circle r="2" fill="oklch(0.92 0.08 84)" />
        </g>
      ))}
    </svg>
  );
}

