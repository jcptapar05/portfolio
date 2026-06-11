"use client";

import React, { useEffect, useRef } from "react";

/* ─── Skill data ────────────────────────────────────────────── */
interface Skill {
  name: string;
  color?: string;
  icon?: string; // devicons / simple-icons CDN slug
}

const frontendSkills: Skill[] = [
  { name: "React.js",    color: "#61DAFB", icon: "react" },
  { name: "Next.js",     color: "#ffffff", icon: "nextdotjs" },
  { name: "Vue.js",      color: "#4FC08D", icon: "vuedotjs" },
  { name: "TypeScript",  color: "#3178C6", icon: "typescript" },
  { name: "TailwindCSS", color: "#06B6D4", icon: "tailwindcss" },
  { name: "HTML5",       color: "#E34F26", icon: "html5" },
  { name: "CSS3",        color: "#1572B6", icon: "css3" },
  { name: "Sass",        color: "#CC6699", icon: "sass" },
  { name: "Bootstrap",   color: "#7952B3", icon: "bootstrap" },
  { name: "Framer",      color: "#0055FF", icon: "framer" },
];

const backendSkills: Skill[] = [
  { name: "Node.js",    color: "#339933", icon: "nodedotjs" },
  { name: "Express.js", color: "#ffffff", icon: "express" },
  { name: "Golang",     color: "#00ADD8", icon: "go" },
  { name: "PHP",        color: "#777BB4", icon: "php" },
  { name: "Laravel",    color: "#FF2D20", icon: "laravel" },
  { name: "MySQL",      color: "#4479A1", icon: "mysql" },
  { name: "PostgreSQL", color: "#4169E1", icon: "postgresql" },
  { name: "Supabase",   color: "#3FCF8E", icon: "supabase" },
  { name: "Prisma",     color: "#2D3748", icon: "prisma" },
  { name: "MongoDB",    color: "#47A248", icon: "mongodb" },
];

const toolSkills: Skill[] = [
  { name: "AWS",       color: "#FF9900", icon: "amazonaws" },
  { name: "Docker",    color: "#2496ED", icon: "docker" },
  { name: "Git",       color: "#F05032", icon: "git" },
  { name: "Vercel",    color: "#ffffff", icon: "vercel" },
  { name: "Figma",     color: "#F24E1E", icon: "figma" },
  { name: "Jest",      color: "#C21325", icon: "jest" },
  { name: "Socket.io", color: "#010101", icon: "socketdotio" },
  { name: "WordPress", color: "#21759B", icon: "wordpress" },
  { name: "Shopify",   color: "#96BF48", icon: "shopify" },
  { name: "N8N",       color: "#EA4B71", icon: "n8n" },
];

const alsoExperiencedSkills: Skill[] = [
  { name: "Socket.io",    color: "#010101", icon: "socketdotio" },
  { name: "WebRTC (Agora)", color: "#1ba1e2", icon: "webrtc" },
  { name: "SEO",          color: "#2C8EBE", icon: "google" },
  { name: "CI/CD",        color: "#2088FF", icon: "githubactions" },
  { name: "cPanel",       color: "#FF6C2C", icon: "cpanel" },
  { name: "Solidity",     color: "#363636", icon: "solidity" },
  { name: "Clerk Auth",   color: "#6C47FF", icon: "clerk" },
  { name: "Authentik",    color: "#FD4B1D", icon: "authentik" },
  { name: "GoHighLevel",  color: "#3F8CFF", icon: "gohighlevel" },
  { name: "Zapier",       color: "#FF4A00", icon: "zapier" },
  { name: "Joomla",       color: "#F44336", icon: "joomla" },
  { name: "Photoshop",    color: "#31A8FF", icon: "adobephotoshop" },
  { name: "Canva",        color: "#00C4CC", icon: "canva" },
  { name: "AI & Chatbot Integration", color: "#FF5722", icon: "openai" },
  { name: "ZK-Teco Biometrics" },
  { name: "CCTV / IP Camera Systems" },
];

/* ─── Skill chip component ─────────────────────────────────── */
function SkillChip({ skill }: { skill: Skill }) {
  const hasIcon = !!skill.icon && !!skill.color;
  return (
    <div
      className="skill-badge-hover flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-border bg-card/80 backdrop-blur-sm mx-2 cursor-default select-none transition-all duration-300 shrink-0"
      title={skill.name}
    >
      {/* Icon via simple-icons */}
      {hasIcon && (
        <img
          src={`https://cdn.simpleicons.org/${skill.icon}/${skill.color!.replace("#", "")}`}
          alt={skill.name}
          className="w-4 h-4 object-contain"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      )}
      <span className="text-sm font-medium text-foreground whitespace-nowrap">
        {skill.name}
      </span>
    </div>
  );
}

/* ─── Infinite marquee row ─────────────────────────────────── */
function MarqueeRow({
  skills,
  direction = "left",
  speed = 30,
}: {
  skills: Skill[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const doubled = [...skills, ...skills]; // duplicate for seamless loop

  return (
    <div className="relative overflow-hidden py-2 group">
      {/* Edge fade masks */}
      <div
        aria-hidden={true}
        className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
        style={{
          background: "linear-gradient(to right, hsl(var(--background)), transparent)",
        }}
      />
      <div
        aria-hidden={true}
        className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
        style={{
          background: "linear-gradient(to left, hsl(var(--background)), transparent)",
        }}
      />

      <div
        className={`marquee-track ${direction === "left" ? "marquee-left" : "marquee-right"}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((skill, i) => (
          <SkillChip key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}

/* ─── Category label ───────────────────────────────────────── */
const categoryLabels = [
  { label: "Frontend",    color: "text-blue-400",  dot: "bg-blue-400" },
  { label: "Backend & DB", color: "text-emerald-400", dot: "bg-emerald-400" },
  { label: "Cloud & Tools", color: "text-amber-400", dot: "bg-amber-400" },
];

/* ─── Main section ─────────────────────────────────────────── */
const SkillsCarousel = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll<HTMLElement>(".fade-up").forEach((node, i) => {
              node.style.transitionDelay = `${i * 120}ms`;
              node.classList.add("visible");
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const rows = [
    { skills: frontendSkills,        direction: "left"  as const, speed: 28 },
    { skills: backendSkills,         direction: "right" as const, speed: 32 },
    { skills: toolSkills,            direction: "left"  as const, speed: 24 },
    { skills: alsoExperiencedSkills, direction: "right" as const, speed: 36 },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      aria-labelledby="skills-heading"
      className="w-full py-24 overflow-hidden"
    >
      <div className="container mx-auto px-6 mb-12 text-center">
        <p className="fade-up text-highlight text-xs font-semibold uppercase tracking-widest mb-3">
          Tech Stack
        </p>
        <h2
          id="skills-heading"
          className="fade-up text-2xl sm:text-3xl font-bold tracking-tight mb-4"
        >
          Skills & Technologies
        </h2>
        <p className="fade-up text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed mb-8">
          A constantly growing toolkit — from frontend polish to backend power
          and cloud deployment.
        </p>

        {/* Category legend */}
        <div className="fade-up flex flex-wrap justify-center gap-4 mb-2">
          {categoryLabels.map(({ label, color, dot }) => (
            <span key={label} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className={`w-2 h-2 rounded-full ${dot}`} />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Scrolling rows */}
      <div className="space-y-3">
        {rows.map((row, i) => (
          <MarqueeRow
            key={i}
            skills={row.skills}
            direction={row.direction}
            speed={row.speed}
          />
        ))}
      </div>
    </section>
  );
};

export default SkillsCarousel;
