/* eslint-disable @next/next/no-img-element */
"use client";

import EmailSVG from "@/components/icons/EmailSVG";
import GitSVG from "@/components/icons/GitSVG";
import LinkedInSVG from "@/components/icons/LinkedInSVG";
import React, { useEffect, useRef } from "react";

const socialLinks = [
  {
    href: "mailto:jcptapar05@gmail.com",
    label: "Email Julius Tapar",
    Icon: EmailSVG,
  },
  {
    href: "https://www.linkedin.com/in/julius-tapar-48470a145/",
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
    // Stagger-in the hero elements on mount
    const container = containerRef.current;
    if (!container) return;
    const els = container.querySelectorAll<HTMLElement>(".fade-up");
    els.forEach((el, i) => {
      el.style.transitionDelay = `${i * 120}ms`;
      // Trigger animation next frame so it's visible
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
      className="w-full min-h-screen flex justify-center items-center pt-14"
    >
      <div ref={containerRef} className="max-w-2xl text-center px-6 md:px-8">
        {/* Avatar */}
        <div className="fade-up mx-auto mb-8 w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-2 ring-border shadow-md">
          <img
            src="./juls.jpeg"
            className="h-full w-full object-cover"
            alt="Julius Tapar, Frontend and Full-Stack Developer"
            loading="eager"
          />
        </div>

        {/* Name */}
        <h1 className="fade-up text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Julius Tapar
        </h1>

        {/* Role line */}
        <p className="fade-up text-highlight text-sm sm:text-base font-medium uppercase tracking-widest mb-5">
          Frontend &amp; Full-Stack Developer
        </p>

        {/* Bio */}
        <p className="fade-up text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
          Specializing in React, Next.js, and MERN. Building scalable web
          applications, real-time systems with WebRTC &amp; Agora, and
          exploring Go backend services and Solidity smart contracts.
        </p>

        {/* Social icons */}
        <div className="fade-up flex gap-6 mt-8 justify-center">
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
      </div>
    </section>
  );
};

export default Slider;
