"use client";
import React, { useEffect, useRef } from "react";

/**
 * Lightweight scroll-observer that adds/removes the `.visible`
 * class on elements matching `[data-animate]`.
 * No extra libraries — just IntersectionObserver.
 */
const Template = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const elements = container.querySelectorAll<HTMLElement>(
      ".fade-up, .fade-in"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("visible");
            // Unobserve after triggering so it fires only once
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      // Page entry animation via CSS + framer-motion-free approach
      style={{
        animation: "pageEnter 0.45s ease-out both",
      }}
    >
      <style>{`
        @keyframes pageEnter {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      {children}
    </div>
  );
};

export default Template;
