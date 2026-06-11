import React from "react";
import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Github,
  Linkedin,
  Cpu,
  Workflow,
  Bot,
  Database,
  Terminal,
  Layers,
  ArrowRight,
  Check,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Julius Tapar — Full-Stack Developer & AI Automation Specialist. Specializing in Next.js, Golang, n8n, automated workflows, and system architecture.",
};

const contactInfo = [
  { icon: MapPin, label: "Philippines" },
  { icon: Phone,  label: "+63 939 009 0500", href: "tel:+639390090500" },
  { icon: Mail,   label: "jcptapar05@gmail.com", href: "mailto:jcptapar05@gmail.com" },
  { icon: Globe,  label: "juliustapar.com", href: "https://www.juliustapar.com", external: true },
  { icon: Github, label: "github.com/jcptapar05", href: "https://github.com/jcptapar05", external: true },
  { icon: Linkedin, label: "linkedin.com/in/jcptapar05", href: "https://linkedin.com/in/jcptapar05", external: true },
];

const pillars = [
  {
    icon: Layers,
    title: "Full-Stack Development",
    desc: "Architecting modular, highly responsive applications with Next.js, Vue.js, and TypeScript, backed by robust Golang (Fiber) and Node.js microservices.",
  },
  {
    icon: Workflow,
    title: "AI & Workflow Automation",
    desc: "Designing autonomous, event-driven pipelines using n8n, Zapier, and custom scripts. Connecting AI agents with databases to streamline operations.",
  },
  {
    icon: Database,
    title: "API & Data Orchestration",
    desc: "Building clean REST/GraphQL APIs, implementing secure OAuth/OIDC systems (Authentik, Clerk), and optimizing MySQL/PostgreSQL databases.",
  },
  {
    icon: Cpu,
    title: "DevOps & Cloud Systems",
    desc: "Deploying and managing web servers on AWS (EC2, S3), Vercel, and Docker. Setting up secure, automated CI/CD deployment pipelines.",
  },
];

const techGroups = [
  {
    label: "Frontend Systems",
    icon: Terminal,
    color: "text-emerald-400",
    border: "hover:border-emerald-500/30",
    bg: "bg-emerald-500/5",
    skills: ["React.js", "Next.js", "Vue.js", "TypeScript", "TailwindCSS", "Sass & BEM", "Bootstrap", "HTML5/CSS3"],
  },
  {
    label: "Backend & Databases",
    icon: Database,
    color: "text-blue-400",
    border: "hover:border-blue-500/30",
    bg: "bg-blue-500/5",
    skills: ["Golang (Fiber)", "Node.js (Express)", "PHP (Laravel)", "MySQL (RDS)", "PostgreSQL", "Supabase", "REST/GraphQL APIs"],
  },
  {
    label: "Automation & AI",
    icon: Bot,
    color: "text-amber-400",
    border: "hover:border-amber-500/30",
    bg: "bg-amber-500/5",
    skills: ["n8n (Self-hosted)", "Zapier Integrations", "AI Chatbot API", "GoHighLevel API", "LangChain/OpenAI", "Webhooks", "JSON Parsing"],
  },
  {
    label: "DevOps & Integration",
    icon: Cpu,
    color: "text-purple-400",
    border: "hover:border-purple-500/30",
    bg: "bg-purple-500/5",
    skills: ["AWS EC2 / S3", "Docker Containers", "CI/CD Pipelines", "Authentik SSO", "Clerk / JWT Auth", "cPanel & Hosting", "SEO / Speed Tuning"],
  },
];

const Page = () => {
  return (
    <section aria-labelledby="about-heading" className="w-full min-h-screen pt-14">
      <div className="container mx-auto px-6 max-w-6xl py-20">
        
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <p className="text-highlight text-xs font-semibold uppercase tracking-widest mb-3">
            Profile
          </p>
          <h1 id="about-heading" className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            About <span className="gradient-text">Julius Tapar</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
            A deep-dive into my professional pillars, software engineering background, and AI integration expertise.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Profile Card */}
          <div className="md:col-span-4 md:sticky md:top-20 space-y-6">
            <div className="p-6 rounded-2xl border border-border/80 bg-card/45 backdrop-blur-md shadow-lg shadow-black/5 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-highlight/60 to-highlight/90" />
              
              {/* Profile Image */}
              <div className="relative w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden border-2 border-highlight/20 group-hover:border-highlight/50 transition-all duration-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/juls.jpeg"
                  alt="Julius Cezar P. Tapar"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="text-center mb-6">
                <h2 className="text-lg font-bold text-foreground">Julius Cezar P. Tapar</h2>
                <p className="text-highlight text-xs font-semibold uppercase tracking-wider mt-1">
                  Full-Stack & AI Automation
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium border border-highlight/30 bg-highlight/5 text-highlight">
                  <span className="w-1.5 h-1.5 rounded-full bg-highlight animate-pulse" />
                  Available for contracts
                </div>
              </div>

              <hr className="border-border/60 my-4" />

              {/* Contact list */}
              <div className="space-y-3">
                {contactInfo.map(({ icon: Icon, label, href, external }) => (
                  <div key={label} className="flex items-center gap-3 text-xs">
                    <div className="p-1.5 rounded-md bg-muted/50 border border-border/40 text-muted-foreground">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="text-muted-foreground hover:text-highlight transition-colors duration-200 truncate font-medium"
                      >
                        {label}
                      </a>
                    ) : (
                      <span className="text-muted-foreground truncate font-medium">{label}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Core Pillars, Tech Stack, AI flow */}
          <div className="md:col-span-8 space-y-10">
            
            {/* Narrative / Bio */}
            <div className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/45 backdrop-blur-md shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
                <Terminal className="w-5 h-5 text-highlight" />
                Professional Summary
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
                <p>
                  I am a <span className="text-foreground font-semibold">Full-Stack Engineer & AI Workflow Automation Specialist</span> based
                  in the Philippines. With a technical background spanning hardware infrastructure, server networking, and enterprise web applications, I construct resilient software systems that bridge code with automated productivity.
                </p>
                <p>
                  My recent projects focus heavily on designing customized systems using{" "}
                  <span className="text-foreground font-semibold">Next.js, Golang, and SQL databases</span>, paired with robust integrations like custom-hosted <span className="text-foreground font-semibold">n8n nodes</span> and third-party APIs. I thrive at automating complex operations, building web scrapers, and integrating Large Language Models (LLMs) to make workflows seamless and autonomous.
                </p>
                <p>
                  Over the past decade, I have transitioned from IT service engineering to system architecture, enabling me to build code while fully understanding the underlying systems, networks, and cloud infrastructure they run on.
                </p>
              </div>
            </div>

            {/* Core Pillars of Specialization */}
            <div>
              <h2 className="text-lg sm:text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
                <Workflow className="w-5 h-5 text-highlight" />
                Key Pillars of Expertise
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {pillars.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div
                      key={p.title}
                      className="p-5 rounded-xl border border-border/80 bg-card/45 backdrop-blur-md hover:border-highlight/30 hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-highlight/5 border border-highlight/20 flex items-center justify-center mb-3 text-highlight group-hover:scale-105 transition-transform duration-200">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-1.5 text-sm sm:text-base">
                        {p.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Workflow Animation Visual Block */}
            <div className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/45 backdrop-blur-md shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-highlight/5 rounded-full blur-2xl pointer-events-none" />
              
              <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
                <Bot className="w-5 h-5 text-highlight" />
                AI Automation Pipeline Architecture
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mb-6 leading-relaxed">
                Here is a conceptual look at the serverless, event-driven pipelines I orchestrate to automate data collection, analysis, and notification operations:
              </p>

              {/* Graphical Flow Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs relative">
                
                {/* Node 1 */}
                <div className="p-3.5 rounded-xl border border-border/80 bg-background/50 relative group hover:border-highlight/30 transition-colors duration-200">
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <p className="font-bold text-foreground">1. Trigger</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Webhook / REST API / Schedule</p>
                </div>

                {/* Arrow */}
                <div className="hidden sm:flex items-center justify-center text-highlight animate-pulse">
                  <ArrowRight className="w-5 h-5" />
                </div>

                {/* Node 2 */}
                <div className="p-3.5 rounded-xl border border-border/80 bg-background/50 hover:border-highlight/30 transition-colors duration-200">
                  <p className="font-bold text-foreground">2. Orchestration</p>
                  <p className="text-[10px] text-muted-foreground mt-1">n8n / Custom Go Router</p>
                </div>

                {/* Arrow */}
                <div className="hidden sm:flex items-center justify-center text-highlight animate-pulse">
                  <ArrowRight className="w-5 h-5" />
                </div>

                {/* Node 3 */}
                <div className="p-3.5 rounded-xl border border-border/80 bg-background/50 hover:border-highlight/30 transition-colors duration-200">
                  <p className="font-bold text-foreground">3. Processing & AI</p>
                  <p className="text-[10px] text-muted-foreground mt-1">OpenAI API / Agent Tooling</p>
                </div>

                {/* Arrow */}
                <div className="hidden sm:flex items-center justify-center text-highlight animate-pulse">
                  <ArrowRight className="w-5 h-5" />
                </div>

                {/* Node 4 */}
                <div className="p-3.5 rounded-xl border border-border/80 bg-background/50 hover:border-highlight/30 transition-colors duration-200">
                  <p className="font-bold text-foreground">4. Destination</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Database / Email / Slack</p>
                </div>
              </div>
            </div>

            {/* Technical Skills grouped */}
            <div>
              <h2 className="text-lg sm:text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
                <Cpu className="w-5 h-5 text-highlight" />
                Detailed Tech Stack
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {techGroups.map((g) => {
                  const Icon = g.icon;
                  return (
                    <div
                      key={g.label}
                      className={`p-5 rounded-xl border border-border/80 bg-card/45 backdrop-blur-md transition-all duration-300 ${g.border}`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className={`w-4 h-4 ${g.color}`} />
                        <h3 className="font-semibold text-foreground text-sm sm:text-base">
                          {g.label}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {g.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs px-2.5 py-1 rounded-full border border-border/40 bg-background/30 text-muted-foreground transition-all duration-200 hover:text-foreground hover:border-highlight/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
