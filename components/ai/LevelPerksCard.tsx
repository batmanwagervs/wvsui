"use client";

import React from "react";
import { Award, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LevelPerksCardProps {
  userLevel: number;
}

const levelData = {
  1: {
    name: "Contender",
    currentPerks: [
      "Access to all public PvP and PvE wagers",
      "Basic AI reasoning (short summary only)",
      "Eligible for biweekly prize pool",
      "Can generate referral links",
    ],
    nextLevel: 2,
    nextPerks: [
      "Create wagers (costs $30 VS Chips per wager)",
      "Set platform fee 1%–5%, earn 50% of it",
      "See numeric AI confidence %",
      "View crowd split data",
    ],
  },
  2: {
    name: "Creator",
    currentPerks: [
      "Create wagers ($30 VS Chips each)",
      "Earn 50% of platform fees you set (1–5%)",
      "See AI confidence percentages",
      "View crowd split data",
    ],
    nextLevel: 3,
    nextPerks: [
      "Host private / invite-only wagers",
      "Access Pro Insights (trend breakdowns)",
      "See recommended time windows",
      "Volatility and risk labels",
    ],
  },
  3: {
    name: "Strategist",
    currentPerks: [
      "Private / invite-only pools",
      "Pro Insights: trends & analytics",
      "AI time window recommendations",
      "Volatility labels on wagers",
    ],
    nextLevel: 4,
    nextPerks: [
      "Insider view: historical pattern matching",
      "AI trap/bait callouts (spicy)",
      "Featured creator boost in feed",
      "Elite-only wager categories",
    ],
  },
  4: {
    name: "Elite",
    currentPerks: [
      "Full AI intelligence (insider view)",
      "Historical pattern matching",
      "Trap/bait detection",
      "Featured creator boost",
      "Elite-only pools",
    ],
    nextLevel: null,
    nextPerks: [],
  },
};

export function LevelPerksCard({ userLevel }: LevelPerksCardProps) {
  const data = levelData[userLevel as keyof typeof levelData];

  if (!data) return null;

  return (
    <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16182c] rounded-2xl border border-white/10 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">Your Level Perks</h3>
      </div>

      {/* Current Level */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-white/60 text-sm">You are</span>
            <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Level {userLevel}: {data.name}
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
            {userLevel}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <p className="text-xs font-semibold text-purple-300 mb-2 uppercase tracking-wide">
            Right now you get:
          </p>
          <ul className="space-y-2">
            {data.currentPerks.map((perk, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-white/80">
                <Zap className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Next Level */}
      {data.nextLevel && (
        <div className="mb-5">
          <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-400/30 rounded-lg p-4">
            <p className="text-xs font-semibold text-cyan-300 mb-2 uppercase tracking-wide flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Level {data.nextLevel} Unlocks:
            </p>
            <ul className="space-y-2">
              {data.nextPerks.map((perk, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-white/80">
                  <span className="text-cyan-400">→</span>
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* CTA */}
      {data.nextLevel ? (
        <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white">
          See how to level up
        </Button>
      ) : (
        <div className="text-center py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-lg">
          <p className="text-sm font-semibold text-yellow-300">
            🏆 You've reached the highest level!
          </p>
        </div>
      )}
    </div>
  );
}

