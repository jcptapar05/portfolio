"use client";

import React, { useEffect, useRef } from "react";
import { Briefcase, GraduationCap, Award, MapPin, Calendar } from "lucide-react";

/* ─── Data types ────────────────────────────────────────────── */
interface ExperienceItem {
  type: "work" | "education" | "training";
  role: string;
  company: string;
  location?: string;
  period: string;
  bullets?: string[];
  tags?: string[];
}

/* ─── Data ─────────────────────────────────────────────────── */
const experiences: ExperienceItem[] = [
  {
    type: "work",
    role: "Junior System Developer",
    company: "Cooperative Development Authority",
    location: "Philippines",
    period: "Jan 2025 – Dec 2025",
    bullets: [
      "Architected and developed modern HRIS and Inventory Management Systems using Next.js, Vue.js, TypeScript, Golang (Fiber), and MySQL.",
      "Engineered secure database schemas and optimized complex SQL queries to ensure scalable system performance.",
      "Designed and implemented centralized third-party Single Sign-On (SSO) authentication using Authentik.",
      "Modernized and debugged legacy PHP (Laravel, CodeIgniter) applications, resolving critical bottlenecks and increasing performance.",
      "Integrated ZK-Teco biometric attendance scanners, syncing device data with backend schedules.",
      "Conducted software unit/integration testing and cPanel/Linux deployments to ensure 99.9% uptime."
    ],
    tags: ["Next.js", "Golang (Fiber)", "MySQL", "Authentik SSO", "Vue.js", "TypeScript", "Laravel", "Biometrics Sync"]
  },
  {
    type: "work",
    role: "Software Engineer",
    company: "Cognith",
    location: "Singapore (Remote)",
    period: "Aug 2024 – Oct 2024",
    bullets: [
      "Maintained and enhanced core enterprise dashboards using React.js and TypeScript.",
      "Fixed complex software bugs and optimized client-side state management, significantly improving app responsiveness.",
      "Wrote robust front-end unit test suites with Jest and Enzyme, maintaining high test coverage and system stability."
    ],
    tags: ["React.js", "TypeScript", "Jest Testing", "Enzyme", "Git Workflows", "Enterprise UI"]
  },
  {
    type: "work",
    role: "Web Developer",
    company: "1 Click Design",
    location: "Las Vegas, NV (Remote)",
    period: "June 2023 – April 2024",
    bullets: [
      "Developed custom web applications using Next.js and Prisma, resulting in a 30% reduction in average page-load latency.",
      "Configured PostgreSQL database tables, indexing columns to reduce lookup times by 25%.",
      "Built real-time system modules using WebSockets, supporting concurrent user updates."
    ],
    tags: ["Next.js", "Prisma ORM", "PostgreSQL", "WebSockets", "API Design", "Performance Tuning"]
  },
  {
    type: "work",
    role: "Assistant Software & Web Developer",
    company: "SSA Consulting Group Inc.",
    location: "Philippines",
    period: "2022 – 2023",
    bullets: [
      "Constructed responsive corporate websites using WordPress, Vue.js, and Laravel integrations.",
      "Deployed strategic technical SEO audits, fixing layout shifts (CLS) and boosting site speed by 40%.",
      "Redesigned legacy frontends to modern, mobile-friendly landing pages, raising user conversion metrics."
    ],
    tags: ["Vue.js", "Laravel", "WordPress", "Technical SEO", "Speed Optimization", "Mobile-First Design"]
  },
  {
    type: "work",
    role: "Web Designer",
    company: "Online Thinkers Technology",
    location: "Philippines",
    period: "Dec 2019 – Sept 2021",
    bullets: [
      "Created highly customized PHP web layouts using WordPress, CodeIgniter, and Joomla CMS.",
      "Handled server migrations, cloning configurations, and full deployments via cPanel/WHM directories.",
      "Translated custom customer design prototypes into functional, responsive web templates."
    ],
    tags: ["PHP", "CodeIgniter", "WordPress Templates", "Joomla", "cPanel", "Server Migrations"]
  },
  {
    type: "work",
    role: "Web Design & Client Support",
    company: "Carrux Xpress App Co. Inc.",
    location: "Philippines",
    period: "Oct 2018 – Jan 2020",
    bullets: [
      "Designed modern CSS web grids and interactive prototypes for SaaS user interfaces.",
      "Conducted QA bug tracking, feature checklist validation, and product demonstrations for client stakeholders.",
      "Resolved server connections and user-facing application issues through remote and onsite technical support."
    ],
    tags: ["UI Prototyping", "QA Bug Tracking", "Client Support", "Responsive Grids"]
  },
  {
    type: "work",
    role: "Technical Staff",
    company: "Philsource Ventures Group Inc. (PVGI)",
    location: "Philippines",
    period: "Nov 2017 – Oct 2018",
    bullets: [
      "Provisioned desktop systems, server hardware, and network routers/switches for corporate environments.",
      "Deployed CCTV network networks (Dahua, Hikvision IP systems), resolving connectivity and hardware bugs."
    ],
    tags: ["Network Infrastructure", "Server Hardware", "CCTV Deployment", "IT Diagnostics"]
  },
  {
    type: "work",
    role: "Service Engineer",
    company: "Unison Computer Systems, Inc.",
    location: "Philippines",
    period: "Aug 2013 – Aug 2017",
    bullets: [
      "Maintained corporate desktop, printer, and device hardware, executing OS rebuilds and application setups.",
      "Resolved network connectivity, firewall settings, and printer sharing configuration issues on client premises."
    ],
    tags: ["Hardware Support", "Network Connectivity", "Client Diagnostics", "System Setup"]
  }
];

const education: ExperienceItem[] = [
  {
    type: "education",
    role: "Diploma in Computer Science",
    company: "Immaculate Conception International",
    period: "2010 – 2012",
    tags: ["Computer Science", "Database Fundamentals", "Systems Design"]
  }
];

const trainings: ExperienceItem[] = [
  {
    type: "training",
    role: "Javascript Essentials II",
    company: "DICT | Cisco Networking Academy",
    period: "April 2026",
    tags: ["ES6+", "Asynchronous JS", "Networking Protocols"]
  },
  {
    type: "training",
    role: "Blockchain dApps Bootcamp",
    company: "Self-directed Professional Training",
    period: "Feb 2026 – Mar 2026",
    tags: ["Solidity", "Smart Contracts", "Hardhat", "Ethers.js"]
  },
  {
    type: "training",
    role: "Advanced Frontend Web Development",
    company: "Bayan Academy",
    period: "Apr 2022",
    tags: ["React Core", "State Architecture", "Modern Workflows"]
  },
  {
    type: "training",
    role: "Creative Web Design Level II",
    company: "TESDA",
    period: "Nov 2019",
    tags: ["UI Layouts", "CSS Grid", "Asset Optimization"]
  }
];

/* ─── Icon configuration ─────────────────────────────────────── */
const typeConfig = {
  work: {
    Icon: Briefcase,
    color: "text-highlight",
    bg: "bg-highlight/5 border-highlight/20",
    dot: "bg-highlight",
  },
  education: {
    Icon: GraduationCap,
    color: "text-blue-400",
    bg: "bg-blue-400/5 border-blue-400/20",
    dot: "bg-blue-400",
  },
  training: {
    Icon: Award,
    color: "text-amber-400",
    bg: "bg-amber-400/5 border-amber-400/20",
    dot: "bg-amber-400",
  },
};

/* ─── Timeline item ─────────────────────────────────────────── */
function TimelineItem({
  item,
  isLast,
}: {
  item: ExperienceItem;
  isLast: boolean;
}) {
  const cfg = typeConfig[item.type];
  const Icon = cfg.Icon;

  return (
    <div className="relative flex gap-5 group">
      {/* Connector */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 ${cfg.bg}`}
        >
          <Icon className={`w-4.5 h-4.5 ${cfg.color}`} />
        </div>
        {!isLast && (
          <div className="w-px flex-1 mt-2 bg-gradient-to-b from-border to-transparent min-h-[3rem]" />
        )}
      </div>

      {/* Content */}
      <div className="pb-10 flex-1 min-w-0">
        <div className="bg-card/45 backdrop-blur-md border border-border/80 rounded-xl p-5 sm:p-6 transition-all duration-300 hover:border-highlight/35 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 relative">
          
          {/* Timeline header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
            <div>
              <h3 className="font-bold text-foreground text-sm sm:text-base leading-snug">
                {item.role}
              </h3>
              <p className={`text-xs sm:text-sm font-semibold mt-0.5 flex items-center gap-1 ${cfg.color}`}>
                {item.company}
                {item.location && (
                  <span className="text-muted-foreground font-normal flex items-center gap-1">
                    <span>•</span>
                    <MapPin className="w-3 h-3 inline" />
                    {item.location}
                  </span>
                )}
              </p>
            </div>
            
            <span className="shrink-0 text-[10px] sm:text-xs font-semibold text-muted-foreground bg-muted/50 border border-border/40 px-2.5 py-1 rounded-full self-start flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {item.period}
            </span>
          </div>

          {/* Bullet points */}
          {item.bullets && item.bullets.length > 0 && (
            <ul className="space-y-2 mb-4">
              {item.bullets.map((b, i) => (
                <li key={i} className="flex gap-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Tech tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-md border border-border/40 bg-background/30 text-muted-foreground font-medium transition-colors hover:text-foreground hover:border-highlight/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Section header ─────────────────────────────────────────── */
function SectionHeader({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <div className="mb-8">
      <p className="text-highlight text-xs font-semibold uppercase tracking-widest mb-2">
        {label}
      </p>
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">{title}</h2>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────── */
const ExperienceTimeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll<HTMLElement>(".fade-up").forEach((node, i) => {
              node.style.transitionDelay = `${i * 80}ms`;
              node.classList.add("visible");
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      aria-labelledby="experience-heading"
      className="w-full py-20"
    >
      <div className="container mx-auto px-6 max-w-3xl">
        {/* Page heading */}
        <div className="mb-16 fade-up text-center sm:text-left">
          <p className="text-highlight text-xs font-semibold uppercase tracking-widest mb-3">
            Career
          </p>
          <h1
            id="experience-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            Experience & Credentials
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl">
            My career path: starting as an IT support engineer, climbing into system deployments, and shifting into advanced full-stack development & workflow automation.
          </p>
        </div>

        {/* Work experience */}
        <div className="fade-up mb-16">
          <SectionHeader label="Professional" title="Work History" />
          <div className="relative pl-1">
            {experiences.map((item, i) => (
              <TimelineItem
                key={i}
                item={item}
                isLast={i === experiences.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Education & Academic */}
        <div className="fade-up mb-16">
          <SectionHeader label="Academic" title="Education" />
          <div className="relative pl-1">
            {education.map((item, i) => (
              <TimelineItem key={i} item={item} isLast={true} />
            ))}
          </div>
        </div>

        {/* Trainings & Certifications */}
        <div className="fade-up">
          <SectionHeader label="Certifications" title="Trainings & Bootcamps" />
          <div className="relative pl-1">
            {trainings.map((item, i) => (
              <TimelineItem
                key={i}
                item={item}
                isLast={i === trainings.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
