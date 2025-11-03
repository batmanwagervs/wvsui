"use client";

import React, { useState } from "react";
import { AlertTriangle, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IntelCard } from "./IntelCard";
import { InsightLockTeaser } from "./InsightLockTeaser";
import { PrefillWagerModal } from "./PrefillWagerModal";
import { ChatResponse } from "@/types/ai-api";

interface ChatMessageAIProps {
  content: string;
  aiData: ChatResponse | undefined;
  userLevel: number;
  timestamp: Date;
}

export function ChatMessageAI({
  content,
  aiData,
  userLevel,
  timestamp,
}: ChatMessageAIProps) {
  const [isWagerModalOpen, setIsWagerModalOpen] = useState(false);
  
  if (!aiData) return null;
  
  const canCreateWager = aiData.wagerCreateCTA?.canCreate || false;

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%]">
        {/* AI Avatar */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm text-white/60">WagerAI</span>
          <span className="text-xs text-white/40" suppressHydrationWarning>
            {timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        {/* Message Bubble */}
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16182c] border border-cyan-400/30 rounded-2xl rounded-tl-none p-4 shadow-lg shadow-cyan-500/10">
          {/* Header Strip */}
          {aiData.insightMeta.badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {aiData.insightMeta.badges.map((badge, idx) => (
                <div
                  key={idx}
                  className="text-xs px-3 py-1 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-cyan-300 flex items-center gap-1"
                >
                  {badge.label === "High Confidence" || badge.label === "Confidence" ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : null}
                  {badge.label}: {badge.value}
                </div>
              ))}
            </div>
          )}

          {/* Body Text */}
          <div className="text-white/90 leading-relaxed mb-4 whitespace-pre-line">
            {content}
          </div>

          {/* Intel Cards */}
          {aiData.intelCards && aiData.intelCards.length > 0 && (
            <div className="space-y-2 mb-4">
              {aiData.intelCards.map((card, idx) =>
                card.locked ? (
                  <InsightLockTeaser
                    key={idx}
                    currentLevel={userLevel}
                    unlockLevel={card.unlockAtLevel || userLevel + 1}
                    feature={card.label}
                  />
                ) : (
                  <IntelCard
                    key={idx}
                    label={card.label}
                    value={card.value}
                    type={card.type as "crowd" | "line" | "timer" | "risk" | "confidence" | "default"}
                  />
                )
              )}
            </div>
          )}

          {/* CTA Section */}
          {canCreateWager && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <Button
                onClick={() => setIsWagerModalOpen(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white"
              >
                Turn this into a Wager
              </Button>
            </div>
          )}

          {!canCreateWager && aiData.wagerCreateCTA && userLevel < 2 && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-3 text-sm text-yellow-200">
                💡 {aiData.wagerCreateCTA.why}
              </div>
            </div>
          )}
        </div>

        {/* Wager Creation Modal */}
        {canCreateWager && aiData.wagerCreateCTA && (
          <PrefillWagerModal
            open={isWagerModalOpen}
            onOpenChange={setIsWagerModalOpen}
            prefillData={{
              title: aiData.wagerCreateCTA.suggestedTitle || "Suggested Wager",
              description: aiData.wagerCreateCTA.suggestedDescription || content.substring(0, 200),
              suggestedDuration: aiData.wagerCreateCTA.durationPreset || "30m",
            }}
          />
        )}
      </div>
    </div>
  );
}

