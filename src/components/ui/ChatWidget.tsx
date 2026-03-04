"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Loader2,
} from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatWidget() {
  const t = useTranslations("chat");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Demo mode — simulate AI response
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: t("demo_response"),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsLoading(false);
    }, 1500);
  };

  const quickActions = [
    { key: "quick_eligibility", label: t("quick_eligibility") },
    { key: "quick_incentives", label: t("quick_incentives") },
    { key: "quick_apply", label: t("quick_apply") },
  ];

  return (
    <>
      {/* Chat toggle button — fixed bottom-right */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center h-14 w-14 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 rounded-full shadow-[0_8px_30px_rgba(197,165,114,0.4)] hover:from-gold-400 hover:to-gold-500 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={t("title")}
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

        {/* Pulse indicator when closed */}
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
            className="fixed bottom-24 right-6 z-50 w-[380px] max-h-[520px] flex flex-col bg-white border border-border shadow-[0_30px_80px_rgba(27,42,74,0.15)] overflow-hidden"
            style={{ clipPath: BRAND_SHAPE }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
          >
            {/* Header */}
            <div className="bg-navy-600 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500/20 border border-gold-400/30">
                  <Sparkles className="h-4.5 w-4.5 text-gold-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">
                    {t("title")}
                  </h3>
                  <p className="text-white/50 text-xs">{t("subtitle")}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[280px]"
            >
              {messages.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center h-full text-center py-8">
                  <div className="h-12 w-12 rounded-2xl bg-gold-500/10 border border-gold-400/20 flex items-center justify-center mb-4">
                    <Bot className="h-6 w-6 text-gold-500" />
                  </div>
                  <p className="text-sm font-semibold text-navy-600 mb-2">
                    {t("welcome")}
                  </p>
                  <p className="text-xs text-text-secondary mb-4">
                    {t("welcome_desc")}
                  </p>

                  {/* Quick actions */}
                  <div className="space-y-2 w-full">
                    {quickActions.map((action) => (
                      <button
                        key={action.key}
                        onClick={() => {
                          setInput(action.label);
                          sendMessage();
                        }}
                        className="w-full px-4 py-2.5 text-left text-xs font-medium text-navy-600 bg-navy-600/5 border border-navy-600/10 hover:border-gold-500/30 hover:bg-gold-500/5 transition-all rounded-lg"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Messages list */
                messages.map((msg) => (
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
                    <div
                      className={`max-w-[75%] px-3.5 py-2.5 text-xs leading-relaxed ${
                        msg.role === "user"
                          ? "bg-navy-600 text-white rounded-2xl rounded-br-md"
                          : "bg-navy-600/5 text-navy-600 border border-border rounded-2xl rounded-bl-md"
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.role === "user" && (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-navy-600/10">
                        <User className="h-3.5 w-3.5 text-navy-600" />
                      </div>
                    )}
                  </motion.div>
                ))
              )}

              {/* Loading */}
              {isLoading && (
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
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder={t("placeholder")}
                  className="flex-1 px-3 py-2.5 text-xs text-navy-600 placeholder:text-text-secondary/50 bg-navy-600/5 border border-border rounded-lg focus:outline-none focus:border-gold-500/50 transition-all"
                />
                <button
                  onClick={sendMessage}
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
