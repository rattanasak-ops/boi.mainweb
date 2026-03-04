"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Loader2,
  ChevronDown,
  Settings2,
  Zap,
} from "lucide-react";
import { AI_MODELS, DEFAULT_MODEL } from "@/lib/ai/models";
import type { AIModel } from "@/lib/ai/models";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  model?: string;
}

export default function ChatWidget() {
  const t = useTranslations("chat");
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AIModel>(DEFAULT_MODEL);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const modelSelectorRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const hasGreeted = useRef(false);

  // Auto-greeting: inject Arai's welcome message when chat first opens
  useEffect(() => {
    if (isOpen && !hasGreeted.current && messages.length === 0) {
      hasGreeted.current = true;
      const greetingMsg: ChatMessage = {
        id: "greeting",
        role: "assistant",
        content: t("greeting"),
        timestamp: new Date(),
      };
      setMessages([greetingMsg]);
    }
  }, [isOpen, messages.length, t]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingContent]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Close model selector on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        modelSelectorRef.current &&
        !modelSelectorRef.current.contains(e.target as Node)
      ) {
        setShowModelSelector(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const sendMessage = useCallback(
    async (overrideInput?: string) => {
      const text = (overrideInput ?? input).trim();
      if (!text || isLoading) return;

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsLoading(true);
      setStreamingContent("");

      // Build message history for API
      const apiMessages = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // Abort previous request if any
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: apiMessages,
            model: selectedModel.id,
            locale,
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No stream available");

        const decoder = new TextDecoder();
        let accumulated = "";
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data: ")) continue;

            const data = trimmed.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                accumulated += parsed.content;
                setStreamingContent(accumulated);
              }
            } catch {
              // Skip malformed chunks
            }
          }
        }

        // Finalize: move streaming content to a proper message
        if (accumulated) {
          const botMsg: ChatMessage = {
            id: `bot-${Date.now()}`,
            role: "assistant",
            content: accumulated,
            timestamp: new Date(),
            model: selectedModel.name,
          };
          setMessages((prev) => [...prev, botMsg]);
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        console.error("[Arai] Chat error:", err);

        // Fallback error message
        const errorMsg: ChatMessage = {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: t("error_response"),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsLoading(false);
        setStreamingContent("");
        abortRef.current = null;
      }
    },
    [input, isLoading, messages, selectedModel, locale, t]
  );

  const quickActions = [
    { key: "quick_eligibility", label: t("quick_eligibility") },
    { key: "quick_incentives", label: t("quick_incentives") },
    { key: "quick_apply", label: t("quick_apply") },
  ];

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center h-14 w-14 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 rounded-full shadow-[0_8px_30px_rgba(197,165,114,0.4)] hover:from-gold-400 hover:to-gold-500 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Arai — BOI AI Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageSquare className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse indicator */}
        {!isOpen && messages.length === 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-gold-500" />
          </span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-[400px] max-h-[560px] flex flex-col bg-white border border-border shadow-[0_30px_80px_rgba(27,42,74,0.15)] overflow-hidden"
            style={{ clipPath: BRAND_SHAPE }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
          >
            {/* Header */}
            <div className="bg-navy-600 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500/20 border border-gold-400/30">
                    <Sparkles className="h-4.5 w-4.5 text-gold-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-bold text-sm">
                        {t("title")}
                      </h3>
                      <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-gold-500/20 text-gold-400 rounded">
                        Demo
                      </span>
                    </div>
                    <p className="text-white/50 text-xs">{t("subtitle")}</p>
                  </div>
                </div>
              </div>

              {/* Model Selector */}
              <div className="relative mt-2" ref={modelSelectorRef}>
                <button
                  onClick={() => setShowModelSelector(!showModelSelector)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] text-white/70 bg-white/10 hover:bg-white/15 rounded-lg transition-colors w-full"
                >
                  <Settings2 className="h-3 w-3" />
                  <span className="flex-1 text-left truncate">
                    {selectedModel.icon} {selectedModel.name}
                  </span>
                  <ChevronDown
                    className={`h-3 w-3 transition-transform ${showModelSelector ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {showModelSelector && (
                    <motion.div
                      className="absolute top-full left-0 right-0 mt-1 bg-navy-700 border border-white/10 rounded-lg shadow-xl overflow-hidden z-[60]"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="max-h-[200px] overflow-y-auto py-1">
                        {AI_MODELS.map((model) => (
                          <button
                            key={model.id}
                            onClick={() => {
                              setSelectedModel(model);
                              setShowModelSelector(false);
                            }}
                            className={`flex items-center gap-2 w-full px-3 py-2 text-left text-[11px] hover:bg-white/10 transition-colors ${
                              selectedModel.id === model.id
                                ? "bg-white/10 text-gold-400"
                                : "text-white/80"
                            }`}
                          >
                            <span className="text-sm">{model.icon}</span>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">
                                {model.name}
                              </div>
                              <div className="text-[9px] text-white/40">
                                {model.provider} — {model.description}
                              </div>
                            </div>
                            {model.isDefault && (
                              <Zap className="h-3 w-3 text-gold-400 shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[280px]"
            >
                {/* Messages list */}
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`flex gap-2 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                >
                  {msg.role === "assistant" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gold-500/10 border border-gold-400/20">
                      <Bot className="h-3.5 w-3.5 text-gold-500" />
                    </div>
                  )}
                  <div className="max-w-[80%]">
                    <div
                      className={`px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-wrap ${
                        msg.role === "user"
                          ? "bg-navy-600 text-white rounded-2xl rounded-br-md"
                          : "bg-navy-600/5 text-navy-600 border border-border rounded-2xl rounded-bl-md"
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.model && (
                      <p className="text-[9px] text-text-secondary/50 mt-1 ml-1">
                        {msg.model}
                      </p>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-navy-600/10">
                      <User className="h-3.5 w-3.5 text-navy-600" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Quick actions — show after greeting, before user sends first message */}
              {messages.length === 1 && messages[0].id === "greeting" && !isLoading && (
                <div className="space-y-2 mt-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.key}
                      onClick={() => sendMessage(action.label)}
                      className="w-full px-4 py-2.5 text-left text-xs font-medium text-navy-600 bg-navy-600/5 border border-navy-600/10 hover:border-gold-500/30 hover:bg-gold-500/5 transition-all rounded-lg"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Streaming response */}
              {streamingContent && (
                <motion.div
                  className="flex gap-2 justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gold-500/10 border border-gold-400/20">
                    <Bot className="h-3.5 w-3.5 text-gold-500" />
                  </div>
                  <div className="max-w-[80%]">
                    <div className="px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-wrap bg-navy-600/5 text-navy-600 border border-border rounded-2xl rounded-bl-md">
                      {streamingContent}
                      <span className="inline-block w-1.5 h-3.5 bg-gold-500 ml-0.5 animate-pulse rounded-sm" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Loading (before streaming starts) */}
              {isLoading && !streamingContent && (
                <motion.div
                  className="flex gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gold-500/10 border border-gold-400/20">
                    <Bot className="h-3.5 w-3.5 text-gold-500" />
                  </div>
                  <div className="px-4 py-3 bg-navy-600/5 border border-border rounded-2xl rounded-bl-md">
                    <Loader2 className="h-4 w-4 text-gold-500 animate-spin" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border p-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder={t("placeholder")}
                  className="flex-1 px-3 py-2.5 text-xs text-navy-600 placeholder:text-text-secondary/50 bg-navy-600/5 border border-border rounded-lg focus:outline-none focus:border-gold-500/50 transition-all"
                  disabled={isLoading}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  className="flex items-center justify-center h-9 w-9 bg-gold-500 text-navy-950 rounded-lg hover:bg-gold-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  aria-label={t("send")}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-[10px] text-text-secondary/60 text-center">
                {t("disclaimer")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
