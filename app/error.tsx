"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AlertOctagon, RotateCcw, Home, Terminal, ChevronDown, ChevronUp } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Log the error to an analytics or error tracking service
    console.error("Runtime Exception:", error);
  }, [error]);

  return (
    <section className="w-full min-h-screen flex items-center justify-center pt-14">
      <div className="container mx-auto px-6 max-w-xl text-center">
        
        {/* Glassmorphic Error Container */}
        <div className="p-8 sm:p-10 rounded-2xl border border-border/80 bg-card/45 backdrop-blur-md shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-destructive/60 to-red-500/80" />
          
          {/* Animated Warning Icon */}
          <div className="w-16 h-16 rounded-full bg-destructive/5 border border-destructive/20 flex items-center justify-center mx-auto mb-6 text-destructive animate-pulse">
            <AlertOctagon className="w-8 h-8" />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-foreground">
            System Error
          </h1>
          
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
            An unexpected runtime error occurred while rendering this section. Our background tasks have captured this event.
          </p>

          {/* Collapsible Diagnostics Panel */}
          <div className="mb-8 text-left">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-semibold transition-colors duration-200"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>{showDetails ? "Hide Diagnostics" : "Show Diagnostics"}</span>
              {showDetails ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            {showDetails && (
              <div className="mt-3 p-4 rounded-xl border border-border/60 bg-black/40 text-red-400 font-mono text-xs overflow-x-auto max-h-40 leading-relaxed shadow-inner">
                <p className="font-bold mb-1">Exception Message:</p>
                <p className="whitespace-pre-wrap">{error.message || "Unknown client error"}</p>
                {error.digest && (
                  <p className="mt-2 text-muted-foreground text-[10px]">
                    Digest ID: {error.digest}
                  </p>
                )}
              </div>
            )}
          </div>

          <hr className="border-border/60 my-6" />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-highlight text-white font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-highlight/30 hover:scale-102 active:scale-98"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
            
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-border bg-background/80 backdrop-blur-sm text-foreground font-medium text-sm transition-all duration-300 hover:border-highlight/50 hover:bg-accent active:scale-98"
            >
              <Home className="w-4 h-4" />
              Return Home
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
