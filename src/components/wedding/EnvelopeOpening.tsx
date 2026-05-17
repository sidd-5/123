import { useState } from "react";
import seal from "@/assets/pearl-seal.png";
import envelopeBg from "@/assets/envelope-bg.jpg";

interface Props { onOpen: () => void; }

export function EnvelopeOpening({ onOpen }: Props) {
  const [breaking, setBreaking] = useState(false);

  const handleClick = () => {
    if (breaking) return;
    setBreaking(true);
    setTimeout(onOpen, 1400);
  };

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
        breaking ? "opacity-0" : "opacity-100"
      }`}
      style={{
        backgroundImage: `url(${envelopeBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* soft cream vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, oklch(0.92 0.04 85 / 0.25) 70%, oklch(0.85 0.05 80 / 0.5) 100%)",
        }}
      />

      {/* pearl seal — clickable */}
      <div className="translate-y-[65%] md:translate-y-[75%]">
        <button
          onClick={handleClick}
          className={`relative z-10 w-[55vw] max-w-[380px] aspect-square transition-transform duration-500 ${
            breaking ? "scale-150 opacity-0" : "hover:scale-105 animate-gentle-float"
          }`}
          style={{
            backgroundImage: `url(${seal})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            border: "none",
            background: `url(${seal}) center/contain no-repeat`,
            cursor: "pointer",
            filter: "drop-shadow(0 12px 30px rgba(120, 100, 70, 0.35))",
          }}
          aria-label="Open invitation"
        />
      </div>

      {/* prompt */}
      {!breaking && (
        <div className="absolute bottom-[12%] md:bottom-[14%] left-0 right-0 text-center px-4 z-10">
          <p
            className="font-display text-[10px] md:text-xs tracking-[0.5em] uppercase mb-2 animate-pulse"
            style={{ color: "oklch(0.45 0.18 25)" }}
          >
            ✦ Tap to Open ✦
          </p>
          <p
            className="mt-3 font-script text-2xl md:text-3xl"
            style={{ color: "oklch(0.4 0.08 40)" }}
          >
            our invitation awaits
          </p>
        </div>
      )}
    </div>
  );
}
