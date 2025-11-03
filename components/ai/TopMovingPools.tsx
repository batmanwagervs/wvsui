"use client";

import React from "react";
import { TrendingUp, Clock, AlertTriangle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Pool {
  id: string;
  name: string;
  aiLine: string;
  lockTimer: string;
  confidence?: number;
  crowdSplit?: { over: number; under: number };
  isUpset?: boolean;
  category: string;
}

interface TopMovingPoolsProps {
  userLevel: number;
}

// Mock data - in production, fetch from API
const mockPools: Pool[] = [
  {
    id: "1",
    name: "SOL 30m Pool",
    aiLine: "+3.0%",
    lockTimer: "06:31",
    confidence: 82,
    crowdSplit: { over: 72, under: 28 },
    isUpset: true,
    category: "Crypto",
  },
  {
    id: "2",
    name: "Lakers vs Celtics",
    aiLine: "Lakers +5.5",
    lockTimer: "14:22",
    confidence: 68,
    crowdSplit: { over: 58, under: 42 },
    isUpset: false,
    category: "NBA",
  },
  {
    id: "3",
    name: "ETH 1h Pool",
    aiLine: "+2.5%",
    lockTimer: "02:15",
    confidence: 75,
    crowdSplit: { over: 65, under: 35 },
    isUpset: false,
    category: "Crypto",
  },
];

export function TopMovingPools({ userLevel }: TopMovingPoolsProps) {
  const displayPools = mockPools.slice(0, 3);

  return (
    <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16182c] rounded-2xl border border-white/10 p-5">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-cyan-400" />
        Top Moving Pools
      </h3>

      <div className="space-y-3">
        {displayPools.map((pool) => (
          <div
            key={pool.id}
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-all group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  {pool.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-cyan-300">
                    {pool.category}
                  </span>
                  {pool.isUpset && (
                    <span className="text-xs px-2 py-0.5 bg-yellow-500/20 border border-yellow-400/30 rounded-full text-yellow-300 flex items-center gap-1 animate-pulse">
                      <AlertTriangle className="w-3 h-3" />
                      UPSET
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* AI Line */}
            <div className="mb-3">
              <div className="text-xs text-white/60 mb-1">AI Line</div>
              <div className="text-sm font-bold text-cyan-400">{pool.aiLine}</div>
            </div>

            {/* Lock Timer */}
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-white/60">
                Locks in <span className="font-semibold text-yellow-300">{pool.lockTimer}</span>
              </span>
            </div>

            {/* Level 2+ Content */}
            {userLevel >= 2 && pool.confidence && (
              <div className="space-y-2 mb-3 pt-3 border-t border-white/10">
                {/* Confidence */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/60">AI Confidence</span>
                  <span className="text-sm font-bold text-green-400">
                    {pool.confidence}%
                  </span>
                </div>

                {/* Crowd Split */}
                {pool.crowdSplit && (
                  <div>
                    <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                      <span>Crowd Split</span>
                      <Users className="w-3 h-3" />
                    </div>
                    <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-white/10">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500"
                        style={{ width: `${pool.crowdSplit.over}%` }}
                      />
                      <div
                        className="bg-gradient-to-r from-red-500 to-pink-500"
                        style={{ width: `${pool.crowdSplit.under}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-white/60 mt-1">
                      <span>{pool.crowdSplit.over}% Over</span>
                      <span>{pool.crowdSplit.under}% Under</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Level 1 Locked Message */}
            {userLevel < 2 && (
              <div className="mb-3 pt-3 border-t border-white/10">
                <div className="text-xs text-purple-300 bg-purple-500/10 border border-purple-400/30 rounded px-2 py-1.5">
                  🔒 Confidence % and crowd data unlock at Level 2
                </div>
              </div>
            )}

            {/* CTA */}
            <Link href={`/prediction/${pool.id}`}>
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-purple-600/80 to-cyan-500/80 hover:from-purple-600 hover:to-cyan-500 text-white"
              >
                View Pool
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

