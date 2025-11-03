"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Edit3,
  TrendingUp,
  Flame,
  Clock,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIGeneratedPool } from "@/types/admin";
import { EditPoolModal } from "./EditPoolModal";
import { motion } from "framer-motion";

interface GeneratedPoolCardProps {
  pool: AIGeneratedPool;
  onUpdate: (pool: AIGeneratedPool) => void;
  onApprove: (poolId: string) => void;
  onReject: (poolId: string) => void;
}

export function GeneratedPoolCard({
  pool,
  onUpdate,
  onApprove,
  onReject,
}: GeneratedPoolCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const getBorderColor = () => {
    if (pool.status === "APPROVED") return "border-green-400/50";
    if (pool.status === "REJECTED") return "border-red-400/50";
    return "border-white/10";
  };

  const getStatusBadge = () => {
    if (pool.status === "APPROVED") {
      return (
        <div className="px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-full text-green-300 text-xs font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          APPROVED
        </div>
      );
    }
    if (pool.status === "REJECTED") {
      return (
        <div className="px-3 py-1 bg-red-500/20 border border-red-400/30 rounded-full text-red-300 text-xs font-semibold flex items-center gap-1">
          <XCircle className="w-3 h-3" />
          REJECTED
        </div>
      );
    }
    return (
      <div className="px-3 py-1 bg-yellow-500/20 border border-yellow-400/30 rounded-full text-yellow-300 text-xs font-semibold">
        DRAFT
      </div>
    );
  };

  const volumeColor =
    pool.volume_score >= 0.8
      ? "text-green-400"
      : pool.volume_score >= 0.6
      ? "text-yellow-400"
      : "text-white/60";

  return (
    <>
      <motion.div
        layout
        className={`bg-gradient-to-br from-[#1a1a2e] to-[#16182c] rounded-2xl border ${getBorderColor()} p-6 transition-all duration-300 hover:border-cyan-400/30`}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-2">{pool.title}</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              {pool.description}
            </p>
          </div>
          {getStatusBadge()}
        </div>

        {/* Badges Row */}
        <div className="flex flex-wrap gap-2 mb-4">
          {/* Category */}
          <div className="px-3 py-1 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-cyan-300 text-xs font-semibold">
            {pool.category}
          </div>

          {/* Duration */}
          <div className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-300 text-xs font-semibold flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {pool.duration}
          </div>

          {/* Spicy */}
          {pool.is_spicy && (
            <div className="px-3 py-1 bg-orange-500/20 border border-orange-400/30 rounded-full text-orange-300 text-xs font-semibold flex items-center gap-1 animate-pulse">
              <Flame className="w-3 h-3" />
              SPICY
            </div>
          )}

          {/* High Volume */}
          {pool.volume_score >= 0.8 && (
            <div className="px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-full text-green-300 text-xs font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              HIGH VOLUME
            </div>
          )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-white/60 mb-1">AI Line</div>
            <div className="text-sm font-semibold text-cyan-400 flex items-center gap-1">
              <Target className="w-4 h-4" />
              {pool.suggested_ai_line}
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-white/60 mb-1">Target Window</div>
            <div className="text-sm font-semibold text-white">
              {pool.target_window}
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-white/60 mb-1">Resolution Source</div>
            <div className="text-sm font-semibold text-white">
              {pool.resolution_source}
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-white/60 mb-1">Expected Volume</div>
            <div className={`text-sm font-bold ${volumeColor}`}>
              {Math.round(pool.volume_score * 100)}%
            </div>
          </div>
        </div>

        {/* Platform Fee */}
        <div className="bg-cyan-500/10 border border-cyan-400/20 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/60">Default Platform Fee</span>
            <span className="text-sm font-bold text-cyan-400">
              {pool.platform_fee_default_pct}%
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={() => setIsEditOpen(true)}
            variant="outline"
            className="flex-1 border-white/20 text-white hover:bg-white/10"
            disabled={pool.status !== "DRAFT"}
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit
          </Button>

          <Button
            onClick={() => onReject(pool.id)}
            variant="outline"
            className="flex-1 border-red-400/30 text-red-300 hover:bg-red-500/10"
            disabled={pool.status === "REJECTED"}
          >
            <XCircle className="w-4 h-4 mr-2" />
            Reject
          </Button>

          <Button
            onClick={() => onApprove(pool.id)}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
            disabled={pool.status === "APPROVED"}
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Approve
          </Button>
        </div>
      </motion.div>

      {/* Edit Modal */}
      <EditPoolModal
        pool={pool}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSave={onUpdate}
      />
    </>
  );
}

