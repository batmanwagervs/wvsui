"use client";

import React from "react";
import { PieChart } from "lucide-react";
import { CurrencyBreakdown } from "@/types/admin-sales";

interface CurrencyBreakdownChartProps {
  data: CurrencyBreakdown[];
}

const CURRENCY_COLORS: Record<string, string> = {
  SOL: "from-purple-500 to-purple-600",
  ETH: "from-blue-500 to-blue-600",
  USDC: "from-green-500 to-green-600",
  MATIC: "from-indigo-500 to-indigo-600",
  USDT: "from-emerald-500 to-emerald-600",
};

const CURRENCY_BG: Record<string, string> = {
  SOL: "bg-purple-500/20 border-purple-400/30 text-purple-300",
  ETH: "bg-blue-500/20 border-blue-400/30 text-blue-300",
  USDC: "bg-green-500/20 border-green-400/30 text-green-300",
  MATIC: "bg-indigo-500/20 border-indigo-400/30 text-indigo-300",
  USDT: "bg-emerald-500/20 border-emerald-400/30 text-emerald-300",
};

export function CurrencyBreakdownChart({ data }: CurrencyBreakdownChartProps) {
  const maxPercentage = Math.max(...data.map((d) => d.percentage));

  return (
    <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16182c] rounded-2xl border border-white/10 p-6">
      <div className="flex items-center gap-3 mb-6">
        <PieChart className="w-5 h-5 text-cyan-400" />
        <h3 className="text-lg font-semibold text-white">Currency Breakdown</h3>
      </div>

      <div className="space-y-4">
        {data.map((currency, idx) => (
          <div key={currency.currency}>
            {/* Currency Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded-full border text-xs font-semibold ${CURRENCY_BG[currency.currency]}`}>
                  {currency.currency}
                </div>
                <span className="text-sm text-white/80">{currency.transactionCount} txns</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-white">
                  ${currency.volumeUSD.toLocaleString()}
                </div>
                <div className="text-xs text-white/60">
                  {currency.percentage.toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${CURRENCY_COLORS[currency.currency]} transition-all duration-500`}
                style={{ width: `${(currency.percentage / maxPercentage) * 100}%` }}
              />
            </div>

            {/* Stats */}
            <div className="flex justify-between text-xs text-white/50 mt-1">
              <span>Avg: ${currency.averageUSD.toFixed(2)}</span>
              <span>{currency.transactionCount} transactions</span>
            </div>
          </div>
        ))}
      </div>

      {/* Total Summary */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="flex justify-between items-center">
          <span className="text-sm text-white/60">Total Volume</span>
          <span className="text-lg font-bold text-white">
            ${data.reduce((sum, curr) => sum + curr.volumeUSD, 0).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-white/60">Total Transactions</span>
          <span className="text-lg font-bold text-white">
            {data.reduce((sum, curr) => sum + curr.transactionCount, 0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

