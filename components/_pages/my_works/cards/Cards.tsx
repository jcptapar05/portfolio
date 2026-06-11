/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import { ExternalLinkIcon } from "lucide-react";

interface CardsProps {
  img: string;
  lang: string[];
  url: string;
  title: string;
  description: string;
  categoryLabel: string;
}

export function Cards({ img, lang, url, title, description, categoryLabel }: CardsProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View project: ${title}`}
      className="group flex flex-col h-full rounded-2xl overflow-hidden border border-border bg-card/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-highlight/10 hover:border-highlight/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight/50"
    >
      {/* Image Container — fixed height for reliable rendering */}
      <div className="relative h-48 bg-muted w-full border-b border-border overflow-hidden shrink-0">
        <img
          src={img}
          alt={`Screenshot of ${title}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        {/* Category Badge */}
        <span className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-background/90 text-foreground backdrop-blur-md shadow-sm border border-border/40">
          {categoryLabel}
        </span>

        {/* Hover Icon Overlay */}
        <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-background/95 backdrop-blur-sm rounded-full p-3 shadow-lg border border-border scale-90 group-hover:scale-100 transition-all duration-300 text-foreground group-hover:text-highlight">
            <ExternalLinkIcon className="w-5 h-5" />
          </span>
        </div>
      </div>

      {/* Details Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-base font-bold text-foreground tracking-tight group-hover:text-highlight transition-colors duration-200 flex items-center gap-1.5">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed flex-grow line-clamp-3">
          {description}
        </p>

        {/* Tech Tags */}
        <div className="mt-4 pt-4 border-t border-border/50 flex flex-wrap gap-1.5">
          {lang?.map((item, i) => (
            <span
              key={i}
              className="text-[10px] font-medium tracking-wide px-2 py-0.5 rounded bg-secondary text-secondary-foreground border border-border/30 hover:border-highlight/20 transition-colors duration-200"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
