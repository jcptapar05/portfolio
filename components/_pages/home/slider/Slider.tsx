/* eslint-disable @next/next/no-img-element */
"use client";

import EmailSVG from "@/components/icons/EmailSVG";
import GitSVG from "@/components/icons/GitSVG";
import LinkedInSVG from "@/components/icons/LinkedInSVG";
import React, { useEffect, useRef } from "react";
import Link from "next/link";

const socialLinks = [
  {
    href: "mailto:jcptapar05@gmail.com",
    label: "Email Julius Tapar",
    Icon: EmailSVG,
  },
  {
    href: "https://www.linkedin.com/in/jcptapar05/",
    label: "Julius Tapar on LinkedIn",
    Icon: LinkedInSVG,
    external: true,
  },
  {
    href: "https://github.com/jcptapar05",
    label: "Julius Tapar on GitHub",
    Icon: GitSVG,
    external: true,
  },
];

const Slider = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const els = container.querySelectorAll<HTMLElement>(".fade-up");
    els.forEach((el, i) => {
      el.style.transitionDelay = `${i * 130}ms`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.classList.add("visible");
        });
      });
    });
  }, []);

  return (
    <section
      aria-label="Introduction"
      className="relative w-full min-h-screen flex justify-center items-center pt-14 overflow-hidden"
    >
      {/* Background glow orbs */}
      <div
        aria-hidden={true}
        className="hero-glow absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(163 72% 37% / 0.12) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden={true}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none hero-glow"
        style={{
          background:
            "radial-gradient(circle, hsl(210 80% 60% / 0.07) 0%, transparent 70%)",
          animationDelay: "2s",
        }}
      />

      {/* Dot grid overlay */}
      <div
        aria-hidden={true}
        className="absolute inset-0 dot-grid opacity-40 pointer-events-none"
      />

      <div ref={containerRef} className="relative z-10 max-w-3xl text-center px-6 md:px-8">
        {/* Status badge */}
        <div className="fade-up flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border border-highlight/30 bg-highlight/5 text-highlight">
            <span className="w-1.5 h-1.5 rounded-full bg-highlight animate-pulse" />
            Open to opportunities
          </span>
        </div>

        {/* Avatar */}
        <div className="fade-up mx-auto mb-8 relative w-28 h-28 sm:w-32 sm:h-32">
          {/* Animated ring */}
          <div
            aria-hidden={true}
            className="absolute inset-0 rounded-full border-2 border-highlight/30 scale-110 animate-ping"
            style={{ animationDuration: "3s" }}
          />
          <div className="float-anim relative w-full h-full rounded-full overflow-hidden ring-2 ring-highlight/40 shadow-xl shadow-highlight/10">
            <img
              src="/juls.jpeg"
              className="h-full w-full object-cover"
              alt="Julius Tapar, Frontend and Full-Stack Developer"
              loading="eager"
            />
          </div>
        </div>

        {/* Name */}
        <h1 className="fade-up text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 leading-tight">
          Julius{" "}
          <span className="gradient-text">Tapar</span>
        </h1>

        {/* Role line */}
        <p className="fade-up text-highlight text-sm sm:text-base font-semibold uppercase tracking-widest mb-6">
          Full-Stack Developer & AI Automation Specialist
        </p>

        {/* Bio */}
        <p className="fade-up text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
          Building high-performance full-stack web applications and orchestrating smart{" "}
          <span className="text-foreground font-medium">AI workflow automations</span>. I specialize in{" "}
          <span className="text-foreground font-medium">Next.js</span>,{" "}
          <span className="text-foreground font-medium">Golang</span>, and automated backend integration using{" "}
          <span className="text-foreground font-medium">n8n</span>, Zapier, and robust APIs.
        </p>

        {/* CTA Buttons */}
        <div className="fade-up flex flex-wrap gap-3 justify-center mb-10">
          <Link
            href="/my_works"
            className="px-6 py-2.5 rounded-full bg-highlight text-white font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-highlight/30 hover:scale-105 active:scale-95"
          >
            View My Work
          </Link>
          <Link
            href="/#contact"
            className="px-6 py-2.5 rounded-full border border-border bg-background/80 backdrop-blur-sm font-medium text-sm transition-all duration-300 hover:border-highlight/50 hover:bg-accent active:scale-95"
          >
            Get In Touch
          </Link>
        </div>

        {/* Social icons */}
        <div className="fade-up flex gap-6 mt-2 justify-center">
          {socialLinks.map(({ href, label, Icon, external }) => (
            <a
              key={href}
              href={href}
              aria-label={label}
              className="icon-link"
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <Icon />
            </a>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="fade-up mt-16 flex flex-col items-center gap-2 opacity-50">
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-highlight/50 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Slider;
