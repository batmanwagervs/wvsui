"use client";

import React from "react";
import { Lock, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface InsightLockTeaserProps {
  currentLevel: number;
  unlockLevel: number;
  feature: string;
}

const levelFeatures: Record<number, string[]> = {
  2: [
    "Numeric AI confidence percentages",
    "Crowd split data (% on each side)",
    "Ability to create wagers from AI insights",
  ],
  3: [
    "Recommended time windows for best edge",
    "Volatility and risk labels",
    "Crowd sentiment analysis",
    "Private pool access",
  ],
  4: [
    "Insider historical pattern matching",
    "Trap/bait callouts in AI's spicy voice",
    "Featured creator boost",
    "Elite-only pool access",
  ],
};

export function InsightLockTeaser({
  currentLevel,
  unlockLevel,
  feature,
}: InsightLockTeaserProps) {
  const nextLevelFeatures = levelFeatures[unlockLevel] || [];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden rounded-lg border border-white/20 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm"
    >
      {/* Blur Effect */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/40" />

      {/* Content */}
      <div className="relative p-6 flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 border-2 border-white/20 flex items-center justify-center">
          <Lock className="w-8 h-8 text-white/60" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Locked: {feature}
          </h3>
          <p className="text-sm text-white/60 mb-4">
            Unlock at{" "}
            <span className="font-bold text-cyan-400">Level {unlockLevel}</span>{" "}
            to see this data.
          </p>

          {nextLevelFeatures.length > 0 && (
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-xs font-semibold text-purple-300 mb-2 uppercase tracking-wide">
                Level {unlockLevel} Unlocks:
              </p>
              <ul className="text-xs text-white/70 space-y-1.5 text-left">
                {nextLevelFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <TrendingUp className="w-3 h-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
          See how to level up →
        </button>
      </div>
    </motion.div>
  );
}

