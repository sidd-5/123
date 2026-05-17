import { useMemo } from "react";

interface Props { count?: number; }

/**
 * Floating fairy-light lanterns that drift upward and fade.
 * Combined with a warm gold screen glow overlay.
 */
export function LanternShower({ count = 60 }: Props) {
  const items = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const left = Math.random() * 100;
      const delay = Math.random() * 3;
      const duration = 5 + Math.random() * 5;
      const size = 6 + Math.random() * 14;
      const drift = (Math.random() * 80 - 40).toFixed(0);
      const hue = 35 + Math.random() * 25; // warm gold/amber
      const isLantern = i % 5 === 0;
      return { i, left, delay, duration, size, drift, hue, isLantern };
    });
  }, [count]);

  return (
    <>
      {/* Warm gold screen glow */}
      <div
        className="pointer-events-none fixed inset-0 z-40"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.85 0.18 75 / 0.35) 0%, oklch(0.75 0.20 60 / 0.18) 40%, transparent 75%)",
          animation: "lantern-glow-pulse 4s ease-in-out infinite",
          mixBlendMode: "screen",
        }}
      />
      {/* Floating lanterns / fairy lights */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {items.map((it) => (
          <div
            key={it.i}
            style={{
              position: "absolute",
              left: `${it.left}%`,
              bottom: "-40px",
              width: it.size,
              height: it.size,
              animation: `lantern-rise ${it.duration}s ease-out ${it.delay}s forwards`,
              // @ts-expect-error css var
              "--drift": `${it.drift}px`,
            }}
          >
            {it.isLantern ? (
              <div
                style={{
                  width: "100%",
                  height: it.size * 1.4,
                  borderRadius: "50% 50% 45% 45%",
                  background: `radial-gradient(circle at 50% 40%, oklch(0.95 0.18 ${it.hue}) 0%, oklch(0.75 0.22 ${it.hue}) 60%, oklch(0.55 0.20 ${it.hue}) 100%)`,
                  boxShadow: `0 0 ${it.size * 2}px oklch(0.80 0.22 ${it.hue} / 0.9), 0 0 ${it.size * 4}px oklch(0.80 0.22 ${it.hue} / 0.5)`,
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, oklch(0.98 0.15 ${it.hue}) 0%, oklch(0.82 0.20 ${it.hue}) 50%, transparent 100%)`,
                  boxShadow: `0 0 ${it.size * 1.5}px oklch(0.85 0.22 ${it.hue} / 0.95), 0 0 ${it.size * 3}px oklch(0.80 0.22 ${it.hue} / 0.6)`,
                  animation: `lantern-twinkle ${1 + Math.random() * 2}s ease-in-out infinite`,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
