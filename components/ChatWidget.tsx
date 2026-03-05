"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

type ChatWidgetProps = {
  /** Your API endpoint. Defaults to "/api/chat" */
  apiUrl?: string;

  /** Widget header text */
  title?: string;
  subtitle?: string;

  /** First assistant message shown when opened */
  initialMessage?: string;

  /** Optional: persist chat in localStorage */
  persistKey?: string;

  /** Optional: position */
  position?: "bottom-right" | "bottom-left";

  /** Optional: limit message history sent to API */
  maxHistoryToSend?: number;
};

type ApiRequestBody = {
  messages: ChatMessage[];
};

type ApiResponseBody = {
  reply: string;
};

export default function ChatWidget({
  apiUrl = "/api/chat",
  title = "Ask about Juls",
  subtitle = "Projects • Skills • Experience",
  initialMessage = "Hi! Ask me anything about my projects, skills, or experience.",
  persistKey,
  position = "bottom-right",
  maxHistoryToSend = 20,
}: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

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

  // Persist messages if enabled
  useEffect(() => {
    if (!persistKey) return;
    try {
      window.localStorage.setItem(persistKey, JSON.stringify(messages));
    } catch {
      // ignore storage errors
    }
  }, [messages, persistKey]);

  // Auto-scroll
  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, loading, open]);

  // Focus input on open
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [open]);

  // ESC to close
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

    // Keep payload small
    const historyToSend = nextMessages.slice(-maxHistoryToSend);

    try {
      const body: ApiRequestBody = { messages: historyToSend };

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

      const reply = resp.ok && data?.reply ? data.reply : "Sorry—something went wrong. Please try again.";

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

  const dockStyle: React.CSSProperties =
    position === "bottom-left"
      ? { position: "fixed", left: 16, bottom: 16, zIndex: 9999 }
      : { position: "fixed", right: 16, bottom: 16, zIndex: 9999 };

  return (
    <div
      style={dockStyle}
      aria-live="polite"
    >
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            width: 56,
            height: 56,
            borderRadius: 999,
            border: "1px solid rgba(0,0,0,0.12)",
            background: "white",
            boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
            cursor: "pointer",
            fontSize: 22,
          }}
          aria-label="Open chat"
          title="Chat"
        >
          💬
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          style={{
            width: 360,
            maxWidth: "calc(100vw - 32px)",
            height: 520,
            maxHeight: "calc(100vh - 32px)",
            borderRadius: 16,
            border: "1px solid rgba(0,0,0,0.12)",
            background: "white",
            boxShadow: "0 16px 40px rgba(0,0,0,0.18)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
          role="dialog"
          aria-label="Portfolio chat"
        >
          {/* Header */}
          <div
            style={{
              padding: 12,
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
              <div style={{ fontSize: 12, color: "rgba(0,0,0,0.6)" }}>{subtitle}</div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={clearChat}
                style={{
                  borderRadius: 10,
                  border: "1px solid rgba(0,0,0,0.12)",
                  padding: "6px 10px",
                  background: "white",
                  cursor: "pointer",
                  fontSize: 12,
                }}
                title="Clear"
              >
                Clear
              </button>
              <button
                onClick={() => setOpen(false)}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: "white",
                  cursor: "pointer",
                  fontSize: 16,
                }}
                aria-label="Close chat"
                title="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 12,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              background: "rgba(0,0,0,0.02)",
            }}
          >
            {messages.map((m, i) => {
              const isUser = m.role === "user";
              return (
                <div
                  key={i}
                  style={{
                    alignSelf: isUser ? "flex-end" : "flex-start",
                    maxWidth: "85%",
                    padding: "10px 12px",
                    borderRadius: 14,
                    border: "1px solid rgba(0,0,0,0.08)",
                    background: isUser ? "rgba(0,0,0,0.06)" : "white",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    lineHeight: 1.35,
                  }}
                >
                  {m.content}
                </div>
              );
            })}

            {loading && (
              <div
                style={{
                  alignSelf: "flex-start",
                  maxWidth: "85%",
                  padding: "10px 12px",
                  borderRadius: 14,
                  border: "1px solid rgba(0,0,0,0.08)",
                  background: "white",
                  color: "rgba(0,0,0,0.6)",
                  fontSize: 13,
                }}
              >
                Typing…
              </div>
            )}
          </div>

          {/* Input */}
          <div
            style={{
              padding: 12,
              borderTop: "1px solid rgba(0,0,0,0.08)",
              display: "flex",
              gap: 8,
              background: "white",
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Ask about projects, skills, experience…"
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.16)",
                outline: "none",
                fontSize: 14,
              }}
              aria-label="Message"
            />
            <button
              onClick={sendMessage}
              disabled={!canSend}
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.16)",
                background: canSend ? "black" : "rgba(0,0,0,0.12)",
                color: canSend ? "white" : "rgba(0,0,0,0.55)",
                cursor: canSend ? "pointer" : "not-allowed",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
