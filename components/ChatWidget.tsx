"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Bot, Eraser, MessageCircle, Send, X, Calendar, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

type ChatWidgetProps = {
  apiUrl?: string;
  title?: string;
  subtitle?: string;
  initialMessage?: string;
  persistKey?: string;
  position?: "bottom-right" | "bottom-left";
  maxHistoryToSend?: number;
};

type ApiRequestBody = {
  messages: ChatMessage[];
  model?: string;
  fallbackModels?: string[];
};

type ApiResponseBody = {
  reply: string;
  usedModel?: string;
};

// Quick action chips shown in the chat
const QUICK_ACTIONS = [
  { label: "📋 About Julius", message: "Tell me about Julius Tapar" },
  { label: "💼 Experience", message: "What is Julius's work experience?" },
  { label: "🛠️ Skills", message: "What are Julius's technical skills?" },
  { label: "🚀 Projects", message: "Show me Julius's featured projects" },
  { label: "📅 Schedule Call", message: "I want to schedule a call with Julius" },
  { label: "📧 Contact", message: "How can I contact Julius?" },
];

// Parse /schedule command: /schedule <datetime> | <type> | <name> | <email>
function parseScheduleCommand(text: string): {
  datetime: string;
  type: string;
  name: string;
  email: string;
} | null {
  const lower = text.trim().toLowerCase();
  if (!lower.startsWith("/schedule")) return null;

  const rest = text.replace(/^\/schedule\s*/i, "");
  const parts = rest.split("|").map((s) => s.trim());

  if (parts.length < 4) return null;

  return {
    datetime: parts[0],
    type: parts[1] || "call",
    name: parts[2],
    email: parts[3],
  };
}

export default function ChatWidget({
  apiUrl = "/api/chat",
  title = "Ask about Juls",
  subtitle = "Projects • Skills • Scheduling",
  initialMessage = "Hi! 👋 I'm Juls AI. Ask me about Julius's experience, skills, or projects — or use a quick action below!\n\nTip: Type /schedule to book a call or interview.",
  persistKey,
  position = "bottom-right",
  maxHistoryToSend = 20,
}: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [showQuickActions, setShowQuickActions] = useState(true);

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (!persistKey || typeof window === "undefined") {
      return [{ role: "assistant", content: initialMessage }];
    }

    try {
      const raw = window.localStorage.getItem(persistKey);
      if (!raw) return [{ role: "assistant", content: initialMessage }];

      const parsed = JSON.parse(raw) as ChatMessage[];
      if (!Array.isArray(parsed) || parsed.length === 0) {
        return [{ role: "assistant", content: initialMessage }];
      }

      return parsed;
    } catch {
      return [{ role: "assistant", content: initialMessage }];
    }
  });

  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  useEffect(() => {
    if (!persistKey) return;
    try {
      window.localStorage.setItem(persistKey, JSON.stringify(messages));
    } catch {
      // ignore storage errors
    }
  }, [messages, persistKey]);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, loading, open]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Handle /schedule command
  async function handleScheduleCommand(text: string): Promise<string> {
    const parsed = parseScheduleCommand(text);

    if (!parsed) {
      return `❗ Schedule format: /schedule <date/time> | <type> | <your name> | <your email>\n\nExample:\n/schedule December 20 2025 3PM | call | John Smith | john@email.com\n\nTypes: call, interview, meeting`;
    }

    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });

      const data = await res.json();

      if (data.success) {
        return `✅ ${data.message}\n\n📅 Scheduled: ${parsed.type}\n📆 Date/Time: ${parsed.datetime}\n👤 Name: ${parsed.name}\n📧 Email: ${parsed.email}`;
      } else {
        return `❌ Could not schedule: ${data.error}. Please try again or email jcptapar05@gmail.com.`;
      }
    } catch {
      return `❌ Network error scheduling. Please email Julius directly at jcptapar05@gmail.com.`;
    }
  }

  async function sendMessage(overrideText?: string) {
    const text = (overrideText ?? input).trim();
    if (!text || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setShowQuickActions(false);

    // Check if it's a /schedule command
    if (text.toLowerCase().startsWith("/schedule")) {
      const reply = await handleScheduleCommand(text);
      setMessages([...nextMessages, { role: "assistant", content: reply }]);
      setLoading(false);
      return;
    }

    const historyToSend = nextMessages.slice(-maxHistoryToSend);
    const models = [
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-1.5-flash",
    ];

    try {
      const body: ApiRequestBody = {
        messages: historyToSend,
        model: "gemini-2.5-flash",
        fallbackModels: models.slice(1),
      };

      const resp = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      let data: ApiResponseBody | null = null;

      try {
        data = (await resp.json()) as ApiResponseBody;
      } catch {
        data = null;
      }

      const reply =
        resp.ok && data?.reply
          ? data.reply
          : "Sorry—something went wrong. Please try again.";

      setMessages([...nextMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...nextMessages, { role: "assistant", content: "Network error—please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    const reset = [{ role: "assistant" as const, content: initialMessage }];
    setMessages(reset);
    setShowQuickActions(true);

    if (persistKey) {
      try {
        window.localStorage.removeItem(persistKey);
      } catch {
        // ignore
      }
    }
  }

  const positionClass =
    position === "bottom-left" ? "fixed bottom-4 left-4 z-[9999]" : "fixed bottom-4 right-4 z-[9999]";

  return (
    <div className={positionClass} aria-live="polite">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat with Juls AI"
          title="Chat with Juls AI"
          className="h-14 w-14 rounded-full bg-highlight text-white flex items-center justify-center shadow-2xl shadow-highlight/30 hover:shadow-highlight/50 hover:scale-110 transition-all duration-300"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {open && (
        <Card className="flex h-[640px] max-h-[calc(100vh-32px)] w-[400px] max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-3xl border bg-background shadow-2xl">
          {/* Header */}
          <div className="relative border-b bg-background px-4 py-4 shrink-0">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-highlight via-blue-400 to-purple-400" />
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-highlight/10 text-highlight">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold">{title}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-xs text-muted-foreground">{subtitle}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={clearChat}
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-xl"
                  title="Clear chat"
                >
                  <Eraser className="h-4 w-4" />
                </Button>

                <Button
                  onClick={() => setOpen(false)}
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-xl"
                  aria-label="Close chat"
                  title="Close"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div ref={listRef} className="flex-1 overflow-y-auto bg-muted/20 px-4 py-4">
            <div className="flex flex-col gap-4">
              {messages.map((m, i) => {
                const isUser = m.role === "user";

                return (
                  <div
                    key={i}
                    className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={[
                        "max-w-[88%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm",
                        isUser
                          ? "rounded-br-md bg-highlight text-white"
                          : "rounded-bl-md border bg-background text-foreground",
                      ].join(" ")}
                    >
                      {!isUser && (
                        <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold text-highlight">
                          <Bot className="h-3.5 w-3.5" />
                          Juls AI
                        </div>
                      )}
                      {m.content}
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border bg-background px-4 py-3 text-sm text-muted-foreground shadow-sm">
                    <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold text-highlight">
                      <Bot className="h-3.5 w-3.5" />
                      Juls AI
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-highlight/60 [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-highlight/60 [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-highlight/60" />
                    </div>
                  </div>
                </div>
              )}

              {/* Quick action chips — only show before first user message */}
              {showQuickActions && !loading && (
                <div className="mt-2">
                  <div className="flex items-center gap-1.5 mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    <Zap className="h-3 w-3" />
                    Quick Actions
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_ACTIONS.map((action) => (
                      <button
                        key={action.label}
                        onClick={() => sendMessage(action.message)}
                        className="text-xs px-3 py-1.5 rounded-full border border-border bg-background hover:border-highlight/40 hover:text-highlight hover:bg-highlight/5 transition-all duration-200 font-medium"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input area */}
          <div className="border-t bg-background p-3 shrink-0">
            {/* Schedule hint */}
            {input.startsWith("/") && (
              <div className="mb-2 p-2.5 rounded-xl bg-highlight/8 border border-highlight/20 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5 mb-1 font-semibold text-highlight">
                  <Calendar className="h-3 w-3" />
                  Schedule command
                </div>
                Format: /schedule {`<date/time> | <type> | <name> | <email>`}
              </div>
            )}
            <div className="flex items-end gap-2 rounded-2xl border bg-background p-2 shadow-sm focus-within:border-highlight/40 transition-colors duration-200">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask anything, or /schedule a call..."
                className="border-0 bg-transparent shadow-none focus-visible:ring-0 text-sm"
                aria-label="Message"
              />

              <Button
                onClick={() => sendMessage()}
                disabled={!canSend}
                size="icon"
                className="h-10 w-10 rounded-xl bg-highlight hover:bg-highlight/90 shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}