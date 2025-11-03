"use client";

import React from "react";
import { TrendingUp, Users, Clock, AlertCircle, Target } from "lucide-react";

interface IntelCardProps {
  label: string;
  value: string;
  type?: "crowd" | "line" | "timer" | "risk" | "confidence" | "default";
}

export function IntelCard({ label, value, type = "default" }: IntelCardProps) {
  const getIcon = () => {
    switch (type) {
      case "crowd":
        return <Users className="w-4 h-4" />;
      case "line":
        return <TrendingUp className="w-4 h-4" />;
      case "timer":
        return <Clock className="w-4 h-4" />;
      case "risk":
        return <AlertCircle className="w-4 h-4" />;
      case "confidence":
        return <Target className="w-4 h-4" />;
      default:
        return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getColorClass = () => {
    switch (type) {
      case "crowd":
        return "from-purple-500/20 to-pink-500/20 border-purple-400/30 text-purple-300";
      case "line":
        return "from-cyan-500/20 to-blue-500/20 border-cyan-400/30 text-cyan-300";
      case "timer":
        return "from-yellow-500/20 to-orange-500/20 border-yellow-400/30 text-yellow-300";
      case "risk":
        return "from-red-500/20 to-orange-500/20 border-red-400/30 text-red-300";
      case "confidence":
        return "from-green-500/20 to-emerald-500/20 border-green-400/30 text-green-300";
      default:
        return "from-cyan-500/20 to-purple-500/20 border-cyan-400/30 text-cyan-300";
    }
  };

  return (
    <div
      className={`bg-gradient-to-r ${getColorClass()} border rounded-lg px-4 py-3 flex items-center justify-between`}
    >
      <div className="flex items-center gap-3">
        {getIcon()}
        <span className="text-sm font-medium text-white/80">{label}</span>
      </div>
      <span className="text-sm font-bold text-white">{value}</span>
    </div>
  );
}

