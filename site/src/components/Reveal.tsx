"use client";

import { useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";

/**
 * Anime l'apparition de son contenu lorsqu'il entre dans le viewport
 * (fondu + léger glissement vers le haut). Respecte prefers-reduced-motion
 * via le CSS global. `delay` permet d'échelonner plusieurs éléments.
 */
export default function Reveal({
  children,
  as,
  className,
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const Tag = as ?? "div";
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={visible ? `is-visible ${className ?? ""}` : className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
