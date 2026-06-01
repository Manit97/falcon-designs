"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIWidgetProps {
  systemPrompt: string;
  greeting: string;
  accentColour?: string;
  businessName?: string;
  placeholder?: string;
}

export default function AIWidget({
  systemPrompt,
  greeting,
  accentColour = "#f97316",
  businessName = "AI Assistant",
  placeholder = "Type a message…",
}: AIWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: greeting },
  ]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setError(false);

    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, systemPrompt }),
      });

      if (!res.ok || !res.body) {
        throw new Error("Bad response");
      }

      // Stream the response in
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      // Add empty assistant message we'll stream into
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: accumulated };
          return updated;
        });
      }
    } catch {
      setError(true);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div
      className="flex flex-col bg-fd-card border border-fd-border overflow-hidden"
      style={{ height: 420 }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-4 border-b border-fd-border flex-shrink-0"
        style={{ borderTopColor: accentColour, borderTopWidth: 2 }}
      >
        <div
          className="w-2.5 h-2.5 rounded-full animate-pulse"
          style={{ background: accentColour }}
        />
        <span className="font-display font-semibold text-xs tracking-widest uppercase text-fd-white">
          {businessName}
        </span>
        <span className="ml-auto font-display text-[10px] tracking-widest uppercase text-fd-muted border border-fd-border px-2 py-0.5">
          AI Powered
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2.5 font-body text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "text-fd-black"
                    : "bg-fd-surface border border-fd-border text-fd-dim"
                }`}
                style={msg.role === "user" ? { backgroundColor: accentColour } : {}}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-fd-surface border border-fd-border px-4 py-3 flex gap-1.5 items-center">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-fd-muted"
                  style={{
                    animation: `bounce 1s ease-in-out ${i * 0.15}s infinite`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t border-fd-border flex">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder={placeholder}
          className="flex-1 bg-transparent px-5 py-4 font-body text-sm text-fd-white placeholder:text-fd-muted focus:outline-none"
        />
        <button
          onClick={send}
          disabled={!input.trim() || loading}
          className="px-5 py-4 font-display font-bold text-xs tracking-widest uppercase transition-all duration-200 disabled:opacity-30"
          style={{ color: accentColour }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
