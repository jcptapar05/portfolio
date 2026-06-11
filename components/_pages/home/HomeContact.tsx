"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  GithubIcon,
  LinkedinIcon,
  ArrowUpRightIcon,
  SendIcon,
  CalendarIcon,
  CheckCircleIcon,
} from "lucide-react";

/* ─── Data ──────────────────────────────────────────────── */
const contactCards = [
  {
    icon: MailIcon,
    label: "Email",
    value: "jcptapar05@gmail.com",
    href: "mailto:jcptapar05@gmail.com",
    accent: "hsl(163 72% 42%)",        // highlight green
    tw: {
      ring:   "ring-highlight/30",
      icon:   "text-highlight",
      iconBg: "bg-highlight/10",
      badge:  "bg-highlight/10 text-highlight border-highlight/20",
    },
  },
  {
    icon: PhoneIcon,
    label: "Phone / WhatsApp",
    value: "+63 939 009 0500",
    href: "tel:+639390090500",
    accent: "#60a5fa",
    tw: {
      ring:   "ring-blue-400/30",
      icon:   "text-blue-400",
      iconBg: "bg-blue-400/10",
      badge:  "bg-blue-400/10 text-blue-400 border-blue-400/20",
    },
  },
  {
    icon: MapPinIcon,
    label: "Location",
    value: "Philippines · Remote Ready",
    href: undefined,
    accent: "#f59e0b",
    tw: {
      ring:   "ring-amber-400/30",
      icon:   "text-amber-400",
      iconBg: "bg-amber-400/10",
      badge:  "bg-amber-400/10 text-amber-400 border-amber-400/20",
    },
  },
];

const socials = [
  {
    icon: GithubIcon,
    label: "GitHub",
    sub: "jcptapar05",
    href: "https://github.com/jcptapar05",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    sub: "jcptapar05",
    href: "https://linkedin.com/in/jcptapar05",
  },
];

/* ─── Intersection-observer fade-slide util ─────────────── */
function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

/* ─── Component ─────────────────────────────────────────── */
export default function HomeContact() {
  const header   = useFadeUp();
  const cards    = useFadeUp();
  const sidebar  = useFadeUp();

  const fadeBase = "transition-all duration-700 ease-out";
  const show     = "opacity-100 translate-y-0";
  const hide     = "opacity-0 translate-y-8";

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative w-full py-28 overflow-hidden"
    >
      {/* ── Background blobs ─────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-highlight/6 blur-[110px]" />
        <div className="absolute right-1/4 bottom-0 h-[360px] w-[360px] translate-x-1/2  rounded-full bg-blue-500/6 blur-[100px]" />
        <div className="absolute left-1/2  top-1/2  h-[200px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/4 blur-[80px]" />
      </div>

      <div className="container mx-auto max-w-5xl px-6">

        {/* ── Header ───────────────────────────────── */}
        <div
          ref={header.ref}
          className={`mb-16 text-center ${fadeBase} ${header.visible ? show : hide}`}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full border border-highlight/25 bg-highlight/8 text-highlight text-[11px] font-semibold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-highlight animate-pulse" />
            Available for Opportunities
          </div>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
          >
            Get In Touch
          </h2>
          <div className="mx-auto mt-4 mb-5 h-1 w-12 rounded-full bg-gradient-to-r from-highlight to-blue-400" />
          <p className="mx-auto max-w-lg text-sm sm:text-base text-muted-foreground leading-relaxed">
            Open to freelance projects, full-time roles, and exciting
            collaborations. Typical response within&nbsp;24&nbsp;hours.
          </p>
        </div>

        {/* ── Two-column grid ──────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Left — contact cards */}
          <div
            ref={cards.ref}
            className={`space-y-3 ${fadeBase} ${cards.visible ? show : hide}`}
            style={{ transitionDelay: "100ms" }}
          >
            {contactCards.map(({ icon: Icon, label, value, href, tw }) => {
              const inner = (
                <div className={`
                  group flex items-center gap-4 p-5 rounded-2xl border border-border
                  bg-card/60 backdrop-blur-sm
                  transition-all duration-300
                  hover:-translate-y-1 hover:shadow-xl hover:ring-1 ${tw.ring}
                  ${href ? "cursor-pointer" : "cursor-default"}
                `}>
                  {/* Icon circle */}
                  <div className={`
                    relative w-12 h-12 shrink-0 rounded-xl flex items-center justify-center
                    ${tw.iconBg} border border-border/30
                    transition-transform duration-300 group-hover:scale-110
                  `}>
                    <Icon className={`w-5 h-5 ${tw.icon}`} />
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
                      {label}
                    </p>
                    <p className={`text-sm font-semibold truncate ${href ? tw.icon : "text-foreground"}`}>
                      {value}
                    </p>
                  </div>

                  {href && (
                    <ArrowUpRightIcon className={`
                      w-4 h-4 shrink-0 ${tw.icon} opacity-0 -translate-x-1
                      group-hover:opacity-100 group-hover:translate-x-0
                      transition-all duration-200
                    `}/>
                  )}
                </div>
              );

              return href ? (
                <a key={label} href={href} className="block">
                  {inner}
                </a>
              ) : (
                <div key={label}>{inner}</div>
              );
            })}

            {/* Availability banner */}
            <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
              <CheckCircleIcon className="w-4 h-4 text-emerald-400 shrink-0" />
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-emerald-400">Open to work</span>
                {" "}— available for new projects right now.
              </p>
            </div>
          </div>

          {/* Right — CTA + socials */}
          <div
            ref={sidebar.ref}
            className={`space-y-5 ${fadeBase} ${sidebar.visible ? show : hide}`}
            style={{ transitionDelay: "200ms" }}
          >

            {/* ── Premium CTA card ─────────────────── */}
            <div className="relative overflow-hidden rounded-2xl border border-highlight/30 bg-card/60 backdrop-blur-sm">
              {/* Gradient top stripe */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-highlight via-blue-400 to-purple-400" />

              {/* Shimmer animation overlay */}
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-br from-highlight/5 via-transparent to-purple-500/5"
              />

              <div className="p-7">
                {/* Card header */}
                <div className="flex items-start gap-3.5 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-highlight/12 flex items-center justify-center shrink-0 ring-1 ring-highlight/20">
                    <CalendarIcon className="w-5 h-5 text-highlight" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground leading-tight">
                      Ready to collaborate?
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Schedule a call or send an email
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Available for freelance, contract, and full-time roles.
                  Whether it&apos;s a quick chat or a deep-dive meeting — let&apos;s talk.
                </p>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Primary: Send Email */}
                  <a
                    href="mailto:jcptapar05@gmail.com?subject=Let%27s%20Collaborate&body=Hi%20Julius%2C%0A%0A"
                    className="
                      group relative flex-1 inline-flex items-center justify-center gap-2
                      px-5 py-3 rounded-xl
                      bg-highlight text-white text-sm font-semibold
                      shadow-lg shadow-highlight/20
                      transition-all duration-300
                      hover:shadow-xl hover:shadow-highlight/35 hover:-translate-y-0.5 hover:brightness-110
                      active:scale-[0.98] active:shadow-md
                    "
                  >
                    <SendIcon className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-12" />
                    Send an Email
                  </a>

                  {/* Secondary: Schedule via chat */}
                  <button
                    onClick={() => {
                      const btn = document.querySelector<HTMLButtonElement>('[aria-label="Open chat with Juls AI"]');
                      btn?.click();
                    }}
                    className="
                      flex-1 inline-flex items-center justify-center gap-2
                      px-5 py-3 rounded-xl
                      border border-border bg-background/60 text-foreground text-sm font-semibold
                      transition-all duration-300
                      hover:border-highlight/40 hover:text-highlight hover:bg-highlight/5 hover:-translate-y-0.5
                      active:scale-[0.98]
                    "
                  >
                    <CalendarIcon className="w-4 h-4" />
                    Schedule a Call
                  </button>
                </div>
              </div>
            </div>

            {/* ── Social links card ────────────────── */}
            <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
                Find me online
              </p>
              <div className="space-y-2">
                {socials.map(({ icon: Icon, label, sub, href }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group flex items-center gap-3.5 p-3 rounded-xl
                      border border-transparent
                      transition-all duration-200
                      hover:border-border hover:bg-accent/40 hover:-translate-y-0.5
                    "
                  >
                    <div className="
                      w-9 h-9 rounded-lg bg-accent/70 flex items-center justify-center shrink-0
                      transition-all duration-200
                      group-hover:bg-highlight/10 group-hover:ring-1 group-hover:ring-highlight/20
                    ">
                      <Icon className="w-4 h-4 text-muted-foreground group-hover:text-highlight transition-colors duration-200" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground truncate">@{sub}</p>
                    </div>
                    <ArrowUpRightIcon className="
                      w-3.5 h-3.5 text-muted-foreground/30
                      group-hover:text-highlight group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                      transition-all duration-200
                    " />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
