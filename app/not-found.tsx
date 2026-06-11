import React from "react";
import Link from "next/link";
import { FileQuestion, Home, ArrowLeft, Briefcase } from "lucide-react";

export const metadata = {
  title: "404 — Page Not Found",
  description: "The requested page could not be found.",
};

export default function NotFound() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center pt-14">
      <div className="container mx-auto px-6 max-w-lg text-center">
        
        {/* Glassmorphic Container Card */}
        <div className="p-8 sm:p-10 rounded-2xl border border-border/80 bg-card/45 backdrop-blur-md shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-destructive/60 to-highlight/80" />
          
          {/* Animated/Glowing Icon */}
          <div className="w-16 h-16 rounded-full bg-highlight/5 border border-highlight/20 flex items-center justify-center mx-auto mb-6 text-highlight animate-pulse">
            <FileQuestion className="w-8 h-8" />
          </div>

          {/* 404 Title */}
          <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight mb-2 text-foreground">
            40<span className="gradient-text">4</span>
          </h1>
          
          <h2 className="text-xl font-bold text-foreground mb-4">
            Page Not Found
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track.
          </p>

          <hr className="border-border/60 my-6" />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-highlight text-white font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-highlight/30 hover:scale-102 active:scale-98"
            >
              <Home className="w-4 h-4" />
              Go Back Home
            </Link>
            
            <Link
              href="/my_works"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-border bg-background/80 backdrop-blur-sm text-foreground font-medium text-sm transition-all duration-300 hover:border-highlight/50 hover:bg-accent active:scale-98"
            >
              <Briefcase className="w-4 h-4" />
              Explore Works
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
