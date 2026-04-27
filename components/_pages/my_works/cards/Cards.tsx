/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import { ExternalLinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardsProps {
  img: string;
  lang: string[];
  url: string;
  title?: string;
}

export function Cards({ img, lang, url, title }: CardsProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={title ? `View project: ${title}` : `Open ${url}`}
      className="group block rounded-xl overflow-hidden border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 hover:border-highlight/30 dark:hover:shadow-black/20"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10] bg-muted">
        <img
          src={img}
          alt={title ? `${title} project screenshot` : "Project screenshot"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Subtle overlay with external link icon on hover */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/90 backdrop-blur-sm rounded-full p-2 shadow">
            <ExternalLinkIcon className="w-4 h-4 text-foreground" />
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="p-4 flex flex-wrap gap-1.5">
        {lang?.map((item, i) => (
          <span
            key={i}
            className="text-[10px] font-medium uppercase tracking-wide px-2 py-1 rounded-md bg-muted text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </a>
  );
}
