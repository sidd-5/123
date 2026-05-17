import { useEffect, useRef, useState } from "react";

interface Props {
  width?: number;
  height?: number;
  onRevealed?: () => void;
  children: React.ReactNode;
}

export function ScratchReveal({ width = 600, height = 350, onRevealed, children }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const [size, setSize] = useState({ w: width, h: height });
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      if (!wrapRef.current) return;
      const w = Math.min(width, wrapRef.current.offsetWidth);
      setSize({ w, h: Math.round(w * (height / width)) });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // gold scratch surface
    const gradient = ctx.createLinearGradient(0, 0, size.w, size.h);
    gradient.addColorStop(0, "#8a6a1f");
    gradient.addColorStop(0.5, "#f5d76e");
    gradient.addColorStop(1, "#8a6a1f");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size.w, size.h);

    // pattern dots
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    for (let i = 0; i < 100; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * size.w, Math.random() * size.h, Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "rgba(50,20,10,0.85)";
    ctx.font = "bold 24px 'Cinzel Decorative', serif";
    ctx.textAlign = "center";
    ctx.fillText("✦ SCRATCH HERE ✦", size.w / 2, size.h / 2 - 10);
    ctx.font = "18px 'Cormorant Garamond', serif";
    ctx.fillText("to reveal the date", size.w / 2, size.h / 2 + 20);
  }, [size]);

  const getPos = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const scratch = (x: number, y: number) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 36, 0, Math.PI * 2); // increased brush size for larger canvas
    ctx.fill();
  };

  const checkRevealed = async () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || revealed) return;
    const data = ctx.getImageData(0, 0, size.w, size.h).data;
    let cleared = 0;
    for (let i = 3; i < data.length; i += 4 * 30) {
      if (data[i] === 0) cleared++;
    }
    const ratio = cleared / (data.length / (4 * 30));
    if (ratio > 0.5) {
      setRevealed(true);
      // fade-out clear
      const canvas = canvasRef.current!;
      canvas.style.transition = "opacity 0.6s";
      canvas.style.opacity = "0";
      
      // Trigger confetti
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#f5d76e", "#8a6a1f", "#ffffff", "#maroon"]
      });

      onRevealed?.();
    }
  };

  return (
    <div ref={wrapRef} className="relative w-full max-w-[600px] mx-auto" style={{ height: size.h }}>
      <div
        className="absolute inset-0 rounded-3xl gold-border overflow-hidden flex flex-col items-center justify-center text-center px-6"
        style={{ background: "linear-gradient(135deg, oklch(0.97 0.02 80), oklch(0.92 0.04 75))" }}
      >
        {children}
      </div>
      <canvas
        ref={canvasRef}
        width={size.w}
        height={size.h}
        className="absolute inset-0 rounded-3xl scratch-canvas shadow-xl"
        onPointerDown={(e) => { drawing.current = true; const p = getPos(e); scratch(p.x, p.y); }}
        onPointerMove={(e) => { if (!drawing.current) return; const p = getPos(e); scratch(p.x, p.y); }}
        onPointerUp={() => { drawing.current = false; checkRevealed(); }}
        onPointerLeave={() => { if (drawing.current) { drawing.current = false; checkRevealed(); } }}
      />
    </div>
  );
}
