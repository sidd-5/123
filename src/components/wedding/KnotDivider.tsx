import { useEffect, useRef, useState } from "react";

/**
 * Empty spacer that replaces the old KnotDivider.
 * Maintains the vertical spacing while removing all visual elements.
 */
export function KnotDivider({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={`knot-divider ${className}`}
      aria-hidden="true"
      style={{ height: '160px' }}
    >
      {/* Visual elements removed fully, keeping the spacing as requested */}
    </div>
  );
}
