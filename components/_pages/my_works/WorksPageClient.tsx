/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useMemo, useCallback } from "react";
import { ExternalLinkIcon, XCircleIcon, LayersIcon } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────── */
type Category = "all" | "fullstack" | "cms" | "blockchain" | "shopify";

interface Project {
  img: string;
  lang: string[];
  url: string;
  title: string;
  description: string;
  category: Exclude<Category, "all">;
  categoryLabel: string;
}

/* ─── Data ───────────────────────────────────────────────────────── */
const PROJECTS: Project[] = [
  {
    img: "/bsnft.PNG",
    lang: ["Next.js", "TypeScript", "Tailwind", "Ethers.js", "Hardhat"],
    url: "https://activities-69jz.vercel.app/marketplace",
    title: "Bookstore NFT",
    description: "Decentralized NFT bookstore marketplace with web3 wallet connection, smart contracts, and NFT trading.",
    category: "blockchain",
    categoryLabel: "Blockchain / Web3",
  },
  {
    img: "/hris.png",
    lang: ["Vue.js", "MySQL", "Golang"],
    url: "https://hris.cda.gov.ph/login",
    title: "CDA HRIS",
    description: "Government-grade Human Resource Information System with secure employee files, attendance tracking, and admin dashboard.",
    category: "fullstack",
    categoryLabel: "Full-Stack System",
  },
  {
    img: "/shopify-liquid-1.png",
    lang: ["Shopify", "Liquid"],
    url: "https://quickstart-220e7d16.myshopify.com/",
    title: "Shopify Liquid Theme 1",
    description: "High-performance custom theme built on Shopify OS 2.0 with native theme customizer configurations.",
    category: "shopify",
    categoryLabel: "Shopify Theme",
  },
  {
    img: "/shopify-liquid-2.png",
    lang: ["Shopify", "Liquid"],
    url: "https://brandy-1604017349.myshopify.com/",
    title: "Shopify Liquid Theme 2",
    description: "Fully responsive bespoke Shopify Liquid theme built for custom ecommerce layouts, drawers, and collection search.",
    category: "shopify",
    categoryLabel: "Shopify Theme",
  },
  {
    img: "/shopify1.png",
    lang: ["Next.js", "Shopify GraphQL"],
    url: "https://headlessshopifynext.vercel.app/",
    title: "Headless Shopify Storefront",
    description: "Decoupled frontend with Next.js integrated with Shopify GraphQL Storefront API for instant page transitions.",
    category: "shopify",
    categoryLabel: "Shopify / E-Com",
  },
  {
    img: "/shopify2.png",
    lang: ["Next.js", "Shopify"],
    url: "https://ccooffee-eight.vercel.app/",
    title: "Coffee Shop Storefront",
    description: "Stunning coffee brand headless store built with React/Next.js featuring animations and complex cart flows.",
    category: "shopify",
    categoryLabel: "Shopify / E-Com",
  },
  {
    img: "/pokemon.PNG",
    lang: ["Next.js", "PokéAPI"],
    url: "https://pokemonapp-dusky.vercel.app/",
    title: "Pokémon Stats App",
    description: "Interactive application powered by PokéAPI with live search, stat details, generation filter, and local caching.",
    category: "fullstack",
    categoryLabel: "Full-Stack / Web App",
  },
  {
    img: "/1cd.JPG",
    lang: ["Next.js", "MySQL", "Express.js"],
    url: "https://www.1clickdesign.com/",
    title: "1ClickDesign Agency",
    description: "Corporate agency portfolio website with modern React frameworks featuring sharp typography and landing pages.",
    category: "fullstack",
    categoryLabel: "Full-Stack / Web App",
  },
  {
    img: "/1cdplatform.JPG",
    lang: ["Next.js", "MySQL", "Express.js"],
    url: "https://platform.1clickdesign.com/",
    title: "1ClickDesign Platform",
    description: "Internal client management portal for scheduling services, design tickets, task tracking, and invoicing.",
    category: "fullstack",
    categoryLabel: "Full-Stack Portal",
  },
  {
    img: "/mta.JPG",
    lang: ["Next.js", "MySQL", "Express.js"],
    url: "https://mytoparts.com/",
    title: "MyToParts Directory",
    description: "Automotive replacement parts finder with complex SQL searches, catalog sorting, and auto-complete filters.",
    category: "fullstack",
    categoryLabel: "Full-Stack Directory",
  },
  {
    img: "/homepage-banner.jpg",
    lang: ["WordPress", "Bootstrap"],
    url: "https://ssatalentsolutions.com/",
    title: "SSA Talent Solutions",
    description: "Recruitment website with custom WordPress fields for job postings, application submissions, and applicant database.",
    category: "cms",
    categoryLabel: "WordPress CMS",
  },
  {
    img: "/ssa.JPG",
    lang: ["WordPress", "Bootstrap", "jQuery"],
    url: "https://ssagroup.com/",
    title: "SSA Group Corporate",
    description: "Multi-brand business corporate website built with WordPress, custom page templates and optimized SEO.",
    category: "cms",
    categoryLabel: "WordPress CMS",
  },
  {
    img: "/signInside.jpg",
    lang: ["Vue.js", "MySQL", "Laravel"],
    url: "https://lms.ssavantlearning.com/login",
    title: "SSAvant Learning LMS",
    description: "Comprehensive online learning platform with video course tracking, tests, teacher feedback, and student reports.",
    category: "fullstack",
    categoryLabel: "Full-Stack LMS",
  },
  {
    img: "/1681205188-banner.jpg",
    lang: ["Vue.js", "MySQL", "Laravel"],
    url: "https://umrahdiy.com/",
    title: "UmrahDIY Travel Planner",
    description: "Itinerary-based booking system for DIY pilgrimages with dynamic package calculations and schedule layout.",
    category: "fullstack",
    categoryLabel: "Full-Stack Travel",
  },
  {
    img: "/wpa.JPG",
    lang: ["WordPress", "Joomla"],
    url: "https://www.canadianlawyermag.com/events",
    title: "CL Mag Events Board",
    description: "Digital events publication platform for professional legal conferences, registration forms, and event details.",
    category: "cms",
    categoryLabel: "Joomla & WP CMS",
  },
  {
    img: "/wpa_2.JPG",
    lang: ["WordPress", "Joomla"],
    url: "https://wealthprofessionalawards.ca/",
    title: "Wealth Professional Awards",
    description: "Bespoke annual awards nomination system designed for high-traffic entry windows and candidate vetting.",
    category: "cms",
    categoryLabel: "WordPress CMS",
  },
];

/* ─── Filter tabs ────────────────────────────────────────────────── */
const FILTERS: { id: Category; label: string; emoji: string }[] = [
  { id: "all",        label: "All Projects", emoji: "✦" },
  { id: "fullstack",  label: "Full-Stack",   emoji: "⚡" },
  { id: "shopify",    label: "Shopify",      emoji: "🛍" },
  { id: "cms",        label: "CMS",          emoji: "📄" },
  { id: "blockchain", label: "Blockchain",   emoji: "🔗" },
];

/* ─── Project card ───────────────────────────────────────────────── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View project: ${project.title}`}
      className="group flex flex-col rounded-2xl overflow-hidden border border-border bg-card
                 transition-all duration-300
                 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10 hover:border-highlight/30
                 dark:hover:shadow-black/40
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight/50"
      style={{
        animationDelay: `${index * 60}ms`,
        animation: "worksCardIn 0.45s ease-out both",
      }}
    >
      {/* ── Image ─────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden bg-muted" style={{ height: "200px" }}>
        {!imgError ? (
          <img
            src={project.img}
            alt={`Screenshot of ${project.title}`}
            className="absolute inset-0 w-full h-full object-cover object-top
                       transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          /* Fallback when image fails */
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted gap-2">
            <LayersIcon className="w-8 h-8 text-muted-foreground/30" />
            <span className="text-xs text-muted-foreground/50">{project.title}</span>
          </div>
        )}

        {/* Category badge */}
        <span className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[10px] font-bold
                         tracking-wider uppercase rounded-full
                         bg-background/90 text-foreground/80 backdrop-blur-md
                         shadow border border-border/40">
          {project.categoryLabel}
        </span>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-highlight/10 opacity-0 group-hover:opacity-100
                        transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-background/95 backdrop-blur-sm rounded-full p-3 shadow-lg
                           border border-border scale-90 group-hover:scale-100
                           transition-all duration-300 text-highlight">
            <ExternalLinkIcon className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-sm font-bold text-foreground tracking-tight
                       group-hover:text-highlight transition-colors duration-200 mb-2">
          {project.title}
        </h3>

        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1 mb-4">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/50">
          {project.lang.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium px-2 py-0.5 rounded
                         bg-secondary text-secondary-foreground border border-border/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

/* ─── Main page ──────────────────────────────────────────────────── */
export default function WorksPageClient() {
  const [active, setActive] = useState<Category>("all");

  const filtered = useMemo(
    () => active === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === active),
    [active]
  );

  const handleFilter = useCallback((id: Category) => setActive(id), []);
  const handleClear  = useCallback(() => setActive("all"), []);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: PROJECTS.length };
    for (const p of PROJECTS) map[p.category] = (map[p.category] ?? 0) + 1;
    return map;
  }, []);

  return (
    <>
      {/* Keyframe injected once */}
      <style>{`
        @keyframes worksCardIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="w-full pt-14 min-h-screen">
        <section
          aria-labelledby="works-heading"
          className="container mx-auto px-6 py-16 max-w-6xl"
        >

          {/* ── Page header ─────────────────────────── */}
          <header className="mb-14 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full
                            border border-highlight/25 bg-highlight/8 text-highlight
                            text-[11px] font-semibold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-highlight" />
              Portfolio
            </div>
            <h1
              id="works-heading"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            >
              Featured Works
            </h1>
            <div className="mx-auto mt-4 mb-5 h-1 w-12 rounded-full
                            bg-gradient-to-r from-highlight to-blue-400" />
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              A collection of projects spanning modern frontend frameworks,
              custom Shopify stores, and robust full-stack platforms.
            </p>
          </header>

          {/* ── Filter bar ──────────────────────────── */}
          <div className="flex flex-col items-center gap-4 mb-10">
            {/* Pill tabs */}
            <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl
                            border border-border bg-card/80 backdrop-blur-sm shadow-sm">
              {FILTERS.map((f) => {
                const isActive = active === f.id;
                return (
                  <button
                    key={f.id}
                    id={`filter-${f.id}`}
                    onClick={() => handleFilter(f.id)}
                    className={`
                      relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold
                      tracking-wide transition-all duration-250
                      ${isActive
                        ? "bg-highlight text-white shadow-md shadow-highlight/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                      }
                    `}
                  >
                    <span>{f.emoji}</span>
                    {f.label}
                    <span className={`
                      ml-0.5 text-[10px] px-1.5 py-0.5 rounded-full font-bold
                      ${isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}
                    `}>
                      {counts[f.id] ?? 0}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Clear filter — only when not "all" */}
            {active !== "all" && (
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground
                           hover:text-highlight transition-colors duration-200"
              >
                <XCircleIcon className="w-3.5 h-3.5" />
                Clear filter
              </button>
            )}
          </div>

          {/* ── Result count ────────────────────────── */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs text-muted-foreground font-medium">
              Showing{" "}
              <span className="font-bold text-foreground">{filtered.length}</span>
              {" "}{filtered.length === 1 ? "project" : "projects"}
              {active !== "all" && (
                <> in <span className="text-highlight font-bold">
                  {FILTERS.find(f => f.id === active)?.label}
                </span></>
              )}
            </p>
          </div>

          {/* ── Grid ─────────────────────────────────── */}
          {filtered.length > 0 ? (
            <div
              key={active}   /* remount grid on filter change so animations replay */
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, idx) => (
                <ProjectCard key={project.title} project={project} index={idx} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <LayersIcon className="w-12 h-12 text-muted-foreground/20 mb-4" />
              <p className="text-muted-foreground text-sm">No projects found for this filter.</p>
              <button
                onClick={handleClear}
                className="mt-4 text-xs text-highlight hover:underline font-medium"
              >
                View all projects
              </button>
            </div>
          )}

        </section>
      </div>
    </>
  );
}
