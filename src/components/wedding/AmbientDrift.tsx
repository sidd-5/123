import { useMemo } from "react";
import paisley from "@/assets/paisley.png";
import marigold from "@/assets/marigold.png";
import petal from "@/assets/petal.png";

/**
 * Soft ambient drifting decorations to bring the page alive.
 * Pure CSS animation, low opacity, pointer-events none, behind content.
 */
export function AmbientDrift({ density = 14 }: { density?: number }) {
  const items = useMemo(() => {
    const imgs = [paisley, marigold, petal];
    return Array.from({ length: density }).map((_, i) => {
      const img = imgs[i % imgs.length];
      const left = Math.random() * 100;
      const size = 32 + Math.random() * 70;
      const dur = 22 + Math.random() * 28;
      const delay = -Math.random() * dur;
      const drift = (Math.random() * 60 - 30).toFixed(0);
      const rot = (Math.random() * 360).toFixed(0);
      const opacity = 0.08 + Math.random() * 0.18;
      return { img, left, size, dur, delay, drift, rot, opacity, i };
    });
  }, [density]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {items.map((it) => (
        <img
          key={it.i}
          src={it.img}
          alt=""
          className="absolute"
          style={{
            left: `${it.left}%`,
            top: "-10%",
            width: it.size,
            height: it.size,
            opacity: it.opacity,
            transform: `rotate(${it.rot}deg)`,
            animation: `ambientDrift ${it.dur}s linear ${it.delay}s infinite`,
            // @ts-expect-error css var
            "--drift": `${it.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
