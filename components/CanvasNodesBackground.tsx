"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function CanvasNodesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    // Theme state
    let isDarkMode = false;
    let baseColor = "220, 15, 12"; // dark theme color
    let accentColor = "27, 163, 120"; // highlight color

    const updateColors = () => {
      isDarkMode = document.documentElement.classList.contains("dark");
      if (isDarkMode) {
        baseColor = "210, 17, 93"; // light grey-ish/white in dark mode
        accentColor = "36, 191, 140"; // vibrant highlight (green)
      } else {
        baseColor = "220, 15, 12"; // dark grey-ish in light mode
        accentColor = "27, 163, 120"; // standard highlight (green)
      }
    };

    updateColors();

    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const resizeCanvas = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // Calculate particle density based on screen area
      const area = width * height;
      const density = Math.min(Math.floor(area / 15000), 120); // cap at 120
      const count = Math.max(density, 30); // minimum of 30 particles

      // Initialize particles
      const newParticles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        newParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          // slow speed for subtlety
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1, // 1 to 3px
        });
      }
      particles = newParticles;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Render loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDarkMode 
          ? `rgba(${accentColor}, 0.25)` 
          : `rgba(${accentColor}, 0.2)`;
        ctx.fill();
      });

      // Draw lines between particles
      const connectionDist = 130;
      const mouseDist = 180;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Particle to mouse connections
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseDist) {
            // Draw interactive highlighted line to mouse
            const alpha = (1 - dist / mouseDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            // Highlight color
            ctx.strokeStyle = `rgba(${accentColor}, ${alpha})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();

            // Pull slightly towards mouse (micro attraction interaction)
            const force = (mouseDist - dist) / mouseDist * 0.03;
            p1.vx -= dx * force * 0.05;
            p1.vy -= dy * force * 0.05;
            // Cap velocities to keep it calm
            const maxV = 0.5;
            p1.vx = Math.max(Math.min(p1.vx, maxV), -maxV);
            p1.vy = Math.max(Math.min(p1.vy, maxV), -maxV);
          }
        }

        // Particle to particle connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.07;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // Use normal base color or highlight color for lines
            ctx.strokeStyle = isDarkMode 
              ? `rgba(${baseColor}, ${alpha * 0.6})` 
              : `rgba(${baseColor}, ${alpha * 0.8})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-50 pointer-events-none w-full h-full block bg-transparent"
      style={{ mixBlendMode: "normal" }}
    />
  );
}
