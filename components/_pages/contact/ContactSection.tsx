"use client";

import React, { useState } from "react";
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  GithubIcon,
  LinkedinIcon,
  GlobeIcon,
  SendIcon,
  CheckCircleIcon,
  LoaderIcon,
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/* ─── Schema ────────────────────────────────────────────────── */
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(2, "Subject must be at least 2 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});
type FormData = z.infer<typeof schema>;

/* ─── Contact info cards ────────────────────────────────────── */
const contactItems = [
  {
    icon: MailIcon,
    label: "Email",
    value: "jcptapar05@gmail.com",
    href: "mailto:jcptapar05@gmail.com",
    color: "text-highlight",
    hoverColor: "hover:text-highlight",
    bg: "bg-highlight/10 border-highlight/20",
  },
  {
    icon: PhoneIcon,
    label: "Phone",
    value: "+63 939 009 0500",
    href: "tel:+639390090500",
    color: "text-blue-400",
    hoverColor: "hover:text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/20",
  },
  {
    icon: MapPinIcon,
    label: "Location",
    value: "Philippines",
    color: "text-amber-400",
    hoverColor: "hover:text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/20",
  },
  {
    icon: GlobeIcon,
    label: "Portfolio",
    value: "juliustapar.com",
    href: "https://www.juliustapar.com",
    external: true,
    color: "text-purple-400",
    hoverColor: "hover:text-purple-400",
    bg: "bg-purple-400/10 border-purple-400/20",
  },
];

const socialLinks = [
  {
    icon: GithubIcon,
    label: "GitHub",
    href: "https://github.com/jcptapar05",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    href: "https://linkedin.com/in/jcptapar05",
  },
];

/* ─── Input helper ─────────────────────────────────────────── */
function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <label
        htmlFor={id}
        className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500 font-semibold animate-in fade-in slide-in-from-top-1 duration-200">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-border bg-card/30 text-foreground text-sm placeholder:text-muted-foreground/50 hover:border-border/80 hover:bg-card/55 focus:outline-none focus:ring-2 focus:ring-highlight/30 focus:border-highlight/80 focus:shadow-md focus:shadow-highlight/5 transition-all duration-300 ease-out";

/* ─── Main component ─────────────────────────────────────────── */
const ContactSection = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      // Fallback: open mailto if API isn't set up
      const mailto = `mailto:jcptapar05@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)}`;
      window.location.href = mailto;
      setStatus("sent");
      reset();
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative w-full py-20 overflow-hidden min-h-screen"
    >
      {/* Background Decorative glow orbs */}
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] -z-10 bg-highlight/5 rounded-full blur-[140px] pointer-events-none opacity-60"
        aria-hidden={true}
      />
      <div
        className="absolute bottom-1/4 left-0 w-[450px] h-[450px] -z-10 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none opacity-40"
        aria-hidden={true}
      />

      <div className="container mx-auto px-6 max-w-5xl relative">
        {/* Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto animate-in fade-in slide-in-from-top-4 duration-500">
          <p className="text-highlight text-xs font-semibold uppercase tracking-widest mb-3">
            Get In Touch
          </p>
          <h1
            id="contact-heading"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
          >
            Let&apos;s Build Something New
          </h1>
          <div className="w-12 h-1 bg-highlight/80 mx-auto mt-4 rounded"></div>
          <p className="text-muted-foreground text-sm sm:text-base mt-4 leading-relaxed">
            Have an application design, a technical query, or a job opportunity? Drop a message
            below, and let&apos;s establish a connection.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* ── Left: Info cards ────────────────────── */}
          <div className="lg:col-span-2 space-y-4">
            {contactItems.map(({ icon: Icon, label, value, href, external, color, hoverColor, bg }, idx) => (
              <div
                key={label}
                className={`flex items-center gap-4.5 p-4 rounded-2xl border ${bg} bg-card/45 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-highlight/5 animate-in fade-in slide-in-from-left-4`}
                style={{ animationDuration: "500ms", animationDelay: `${idx * 80}ms` }}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bg} border border-border/20 shadow-inner`}>
                  <Icon className={`w-4.5 h-4.5 ${color}`} />
                </div>
                <div className="min-w-0 flex-grow">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`text-sm font-semibold text-foreground ${hoverColor} transition-colors duration-200 truncate block`}
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-foreground truncate">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social links */}
            <div
              className="pt-4 px-1 animate-in fade-in duration-500 delay-300"
              style={{ animationDelay: "320ms" }}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Social Networks
              </p>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full border border-border bg-card/25 flex items-center justify-center text-muted-foreground hover:text-highlight hover:border-highlight/50 hover:bg-card/65 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-highlight/10"
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Form ─────────────────────────── */}
          <div
            className="lg:col-span-3 animate-in fade-in slide-in-from-right-4 duration-500"
            style={{ animationDelay: "150ms" }}
          >
            <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl border border-border bg-card/60 backdrop-blur-sm shadow-xl shadow-black/[0.02] dark:shadow-black/[0.1]">
              {/* Colorful top highlight bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-highlight/80 via-blue-500/80 to-purple-500/80 pointer-events-none" />

              {status === "sent" ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4 text-center animate-in fade-in zoom-in-95 duration-400">
                  <div className="w-16 h-16 rounded-full bg-highlight/10 flex items-center justify-center">
                    <CheckCircleIcon className="w-8 h-8 text-highlight animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">Message Received!</h3>
                  <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                    Thank you for reaching out. Julius will get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 px-5 py-2 rounded-full border border-border text-xs font-semibold hover:bg-accent transition-colors duration-200"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Your Name" id="name" error={errors.name?.message}>
                      <input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        className={inputClass}
                        {...register("name")}
                      />
                    </Field>
                    <Field label="Email Address" id="email" error={errors.email?.message}>
                      <input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className={inputClass}
                        {...register("email")}
                      />
                    </Field>
                  </div>

                  <Field label="Subject" id="subject" error={errors.subject?.message}>
                    <input
                      id="subject"
                      type="text"
                      placeholder="Project Partnership"
                      className={inputClass}
                      {...register("subject")}
                    />
                  </Field>

                  <Field label="Message" id="message" error={errors.message?.message}>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Hi Julius, let's collaborate on an application..."
                      className={`${inputClass} resize-none`}
                      {...register("message")}
                    />
                  </Field>

                  {status === "error" && (
                    <p className="text-sm text-red-500 font-medium animate-in fade-in duration-200">
                      Something went wrong. Please try again or email directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    id="contact-submit-btn"
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-highlight text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-highlight/30 hover:scale-[1.01] active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <>
                        <LoaderIcon className="w-4 h-4 animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <SendIcon className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
