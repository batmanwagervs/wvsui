"use client";

import React from "react";
import { ListChecks, Download, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIGeneratedPool } from "@/types/admin";
import { GeneratedPoolCard } from "./GeneratedPoolCard";
import { motion, AnimatePresence } from "framer-motion";

interface GeneratedPoolsPanelProps {
  pools: AIGeneratedPool[];
  onUpdatePool: (pool: AIGeneratedPool) => void;
  onApprove: (poolId: string) => void;
  onReject: (poolId: string) => void;
  onBulkApprove: () => void;
  onBulkReject: () => void;
  onExport: () => void;
}

export function GeneratedPoolsPanel({
  pools,
  onUpdatePool,
  onApprove,
  onReject,
  onBulkApprove,
  onBulkReject,
  onExport,
}: GeneratedPoolsPanelProps) {
  const approvedCount = pools.filter((p) => p.status === "APPROVED").length;
  const rejectedCount = pools.filter((p) => p.status === "REJECTED").length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16182c] rounded-2xl border border-white/10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-400/30 flex items-center justify-center">
              <ListChecks className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Generated Pools</h2>
              <p className="text-sm text-white/60">
                {pools.length === 0
                  ? "No pools generated yet"
                  : `${pools.length} pools • ${approvedCount} approved • ${rejectedCount} rejected`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {pools.length === 0 && (
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16182c] rounded-2xl border border-white/10 p-12 text-center">
          <ListChecks className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white/60 mb-2">
            No pools generated yet
          </h3>
          <p className="text-sm text-white/40">
            Ask the AI to build tonight's slate using the panel on the left.
          </p>
        </div>
      )}

      {/* Pool Cards */}
      <AnimatePresence mode="popLayout">
        {pools.map((pool, idx) => (
          <motion.div
            key={pool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: idx * 0.05 }}
          >
            <GeneratedPoolCard
              pool={pool}
              onUpdate={onUpdatePool}
              onApprove={onApprove}
              onReject={onReject}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Bulk Actions Footer */}
      {pools.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky bottom-4 bg-gradient-to-r from-[#1a1a2e] to-[#16182c] rounded-2xl border border-white/10 p-4 shadow-2xl"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-white/80">
              <span className="font-semibold">{pools.length} pools</span> ready for review
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={onExport}
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Download className="w-4 h-4 mr-2" />
                Export JSON
              </Button>

              <Button
                onClick={onBulkReject}
                variant="outline"
                size="sm"
                className="border-red-400/30 text-red-300 hover:bg-red-500/10"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject All
              </Button>

              <Button
                onClick={onBulkApprove}
                size="sm"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Approve All
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

