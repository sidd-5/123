import marigold from "@/assets/marigold.png";
import petal from "@/assets/petal.png";

interface Props { count?: number; }

export function FlowerShower({ count = 25 }: Props) {
  const items = Array.from({ length: count });
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {items.map((_, i) => {
        const isMarigold = i % 2 === 0;
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = 3 + Math.random() * 3;
        const size = 20 + Math.random() * 30;
        return (
          <img
            key={i}
            src={isMarigold ? marigold : petal}
            alt=""
            style={{
              position: "absolute",
              left: `${left}%`,
              top: 0,
              width: size,
              height: size,
              animation: `flower-fall ${duration}s linear ${delay}s forwards`,
            }}
          />
        );
      })}
    </div>
  );
}
