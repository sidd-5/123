import { useEffect, useRef, useState, type ReactNode } from "react";

type Variant = "up" | "fade" | "scale" | "left" | "right";

export function ScrollReveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
  once = true,
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) io.unobserve(e.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const initial: Record<Variant, string> = {
    up: "opacity-0 translate-y-10",
    fade: "opacity-0",
    scale: "opacity-0 scale-95",
    left: "opacity-0 -translate-x-10",
    right: "opacity-0 translate-x-10",
  };
  const shown = "opacity-100 translate-y-0 translate-x-0 scale-100";

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out will-change-transform ${visible ? shown : initial[variant]} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
