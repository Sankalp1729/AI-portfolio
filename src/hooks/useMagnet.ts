import { useRef, useState, useEffect } from "react";
import { useSpring } from "framer-motion";

export function useMagnet(strength = 0.3, padding = 80) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const rawX = useSpring(0, { stiffness: 200, damping: 20 });
  const rawY = useSpring(0, { stiffness: 200, damping: 20 });

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const dist = Math.sqrt(distX * distX + distY * distY);
      const threshold = Math.max(rect.width, rect.height) / 2 + padding;

      if (dist < threshold) {
        setActive(true);
        rawX.set(distX * strength);
        rawY.set(distY * strength);
      } else {
        setActive(false);
        rawX.set(0);
        rawY.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [strength, padding, rawX, rawY]);

  return { ref, x: rawX, y: rawY, active };
}
