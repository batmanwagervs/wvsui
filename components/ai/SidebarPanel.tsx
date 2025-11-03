"use client";

import React from "react";
import { X } from "lucide-react";
import { TopMovingPools } from "./TopMovingPools";
import { LevelPerksCard } from "./LevelPerksCard";

interface SidebarPanelProps {
  userLevel: number;
  onClose?: () => void;
}

export function SidebarPanel({ userLevel, onClose }: SidebarPanelProps) {
  return (
    <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16182c] rounded-2xl border border-white/10 shadow-2xl lg:border-0 lg:rounded-none lg:bg-transparent">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white">Live Insights</h2>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-6 p-4 lg:p-0">
        <TopMovingPools userLevel={userLevel} />
        <LevelPerksCard userLevel={userLevel} />
      </div>
    </div>
  );
}

