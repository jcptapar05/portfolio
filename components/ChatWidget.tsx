"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Bot, Eraser, MessageCircle, Send, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  models?: string[];
  defaultModel?: string;
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

export default function ChatWidget({
  apiUrl = "/api/chat",
  title = "Ask about Juls",
  subtitle = "Projects • Skills • Experience",
  initialMessage = "Hi! Ask me anything about my projects, skills, or experience.",
  persistKey,
  position = "bottom-right",
  maxHistoryToSend = 20,
  models = [
    "gemini-2.5-pro",
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
    "gemini-1.5-pro",
    "gemini-1.5-flash",
    "gemini-1.5-flash-8b",
  ],
  defaultModel = "gemini-2.5-flash",
}: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState(defaultModel);

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

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    const historyToSend = nextMessages.slice(-maxHistoryToSend);
    const fallbackModels = models.filter((m) => m !== selectedModel);

    try {
      const body: ApiRequestBody = {
        messages: historyToSend,
        model: selectedModel,
        fallbackModels,
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
          ? data.usedModel
            ? `${data.reply}\n\nUsed model: ${data.usedModel}`
            : data.reply
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
    <div
      className={positionClass}
      aria-live="polite"
    >
      {!open && (
        <Button
          onClick={() => setOpen(true)}
          size="icon"
          className="h-14 w-14 rounded-full shadow-2xl"
          aria-label="Open chat"
          title="Chat"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {open && (
        <Card
          className="flex h-[640px] max-h-[calc(100vh-32px)] w-[400px] max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-3xl border bg-background shadow-2xl"
          role="dialog"
          aria-label="Portfolio chat"
        >
          <div className="border-b bg-background px-4 py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="truncate text-base font-semibold">{title}</h3>
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

          <div
            ref={listRef}
            className="flex-1 overflow-y-auto bg-muted/20 px-4 py-4"
          >
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
                          ? "rounded-br-md bg-primary text-primary-foreground"
                          : "rounded-bl-md border bg-background text-foreground",
                      ].join(" ")}
                    >
                      {!isUser && (
                        <div className="mb-2 flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
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
                    <div className="mb-2 flex items-center gap-2 text-[11px] font-medium">
                      <Bot className="h-3.5 w-3.5" />
                      Juls AI
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t bg-background p-3">
            <div className="mb-3 grid grid-cols-1 gap-2">
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">Model</div>

              <Select
                value={selectedModel}
                onValueChange={setSelectedModel}
              >
                <SelectTrigger className="h-11 w-full rounded-xl border bg-background text-sm font-medium">
                  <SelectValue placeholder="Choose a Gemini model" />
                </SelectTrigger>
                <SelectContent
                  className="z-[10000] max-h-72 rounded-xl"
                  position="popper"
                  side="top"
                  align="start"
                >
                  {models.map((model) => (
                    <SelectItem
                      key={model}
                      value={model}
                      className="text-sm"
                    >
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end gap-2 rounded-2xl border bg-background p-2 shadow-sm">
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
                placeholder="Ask about projects, skills, experience..."
                className="border-0 bg-transparent shadow-none focus-visible:ring-0"
                aria-label="Message"
              />

              <Button
                onClick={sendMessage}
                disabled={!canSend}
                size="icon"
                className="h-10 w-10 rounded-xl"
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
