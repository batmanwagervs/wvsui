"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessageAI } from "./ChatMessageAI";
import { ChatMessageUser } from "./ChatMessageUser";
import { chatWithAI } from "@/lib/api/ai-client";
import { ChatResponse } from "@/types/ai-api";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  aiData?: ChatResponse; // For AI-specific structured data
}

interface ChatWindowProps {
  userLevel: number;
}

export function ChatWindow({ userLevel }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "ai",
      content:
        "Yo. I'm WagerAI. I know what's moving, who's emotional, and where the edge is. Ask me anything about current pools, lines, or why the crowd is wrong (again).",
      timestamp: new Date(),
      aiData: {
        assistantMessage: {
          text: "Yo. I'm WagerAI. I know what's moving, who's emotional, and where the edge is. Ask me anything about current pools, lines, or why the crowd is wrong (again).",
          toneTags: ["confident", "welcoming"],
        },
        insightMeta: {
          exposureLevelShown: userLevel,
          maxExposureLevel: 4,
          badges: [],
        },
        intelCards: [],
        wagerCreateCTA: {
          canCreate: false,
          why: "Welcome message",
        },
        quickPrompts: [
          "Show me your highest-confidence edge right now",
          "Where is the crowd obviously wrong?",
          "Why is SOL pumping?",
        ],
      },
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Show me your highest-confidence edge right now",
    "Where is the crowd obviously wrong?",
    "Why is SOL pumping?",
    "Give me an underdog upset I can flex if it hits",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // Call AI API
      const aiResponse = await chatWithAI({
        userId: "user_mock", // TODO: Get from auth
        level: userLevel as 1 | 2 | 3 | 4,
        message: text,
        contextCategory: "general",
      });

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        type: "ai",
        content: aiResponse.assistantMessage.text,
        timestamp: new Date(),
        aiData: aiResponse,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI chat error:", error);
      // Show error message
      const errorMessage: Message = {
        id: `ai-error-${Date.now()}`,
        type: "ai",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSend(prompt);
  };

  return (
    <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16182c] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[calc(100vh-12rem)]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6" role="log" aria-live="polite">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {message.type === "ai" ? (
                <ChatMessageAI
                  content={message.content}
                  aiData={message.aiData}
                  userLevel={userLevel}
                  timestamp={message.timestamp}
                />
              ) : (
                <ChatMessageUser
                  content={message.content}
                  timestamp={message.timestamp}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-cyan-400"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="text-sm">WagerAI is thinking...</span>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="px-6 py-3 border-t border-white/10 bg-white/5">
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickPrompt(prompt)}
              className="text-xs px-3 py-1.5 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 hover:from-purple-500/30 hover:to-cyan-500/30 border border-purple-400/30 rounded-full text-white/80 hover:text-white transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-white/10 bg-white/5">
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask me why everyone's hammering OVER on SOL…"
            className="flex-1 bg-white/5 border-cyan-400/30 text-white placeholder:text-white/40 h-12"
            disabled={isTyping}
          />
          <Button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="h-12 px-6 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

