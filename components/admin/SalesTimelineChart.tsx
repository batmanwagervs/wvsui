"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { TimelineData } from "@/types/admin-sales";

interface SalesTimelineChartProps {
  data: TimelineData[];
}

export function SalesTimelineChart({ data }: SalesTimelineChartProps) {
  const maxVolume = Math.max(...data.map((d) => d.volumeUSD));
  const totalVolume = data.reduce((sum, d) => sum + d.volumeUSD, 0);
  const averageVolume = totalVolume / data.length;

  return (
    <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16182c] rounded-2xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-semibold text-white">Sales Timeline (24h)</h3>
        </div>
        <div className="text-right">
          <div className="text-xs text-white/60">Avg/Hour</div>
          <div className="text-sm font-semibold text-green-400">
            ${averageVolume.toFixed(0)}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-48 flex items-end gap-1">
        {data.map((point, idx) => {
          const heightPercent = (point.volumeUSD / maxVolume) * 100;
          const time = new Date(point.timestamp).getHours();
          
          return (
            <div
              key={idx}
              className="flex-1 group relative"
            >
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <div className="bg-black/90 border border-cyan-400/30 rounded-lg p-3 text-xs whitespace-nowrap shadow-xl">
                  <div className="text-white/60 mb-1">{time}:00</div>
                  <div className="text-white font-semibold">
                    ${point.volumeUSD.toFixed(0)}
                  </div>
                  <div className="text-cyan-400">
                    {point.transactionCount} txns
                  </div>
                </div>
              </div>

              {/* Bar */}
              <div
                className="w-full bg-gradient-to-t from-cyan-500 to-purple-500 rounded-t hover:from-cyan-400 hover:to-purple-400 transition-all cursor-pointer"
                style={{ height: `${heightPercent}%` }}
              />
            </div>
          );
        })}
      </div>

      {/* Time Labels */}
      <div className="flex justify-between mt-3 text-xs text-white/50">
        <span>{new Date(data[0].timestamp).getHours()}:00</span>
        <span>{new Date(data[Math.floor(data.length / 2)].timestamp).getHours()}:00</span>
        <span>{new Date(data[data.length - 1].timestamp).getHours()}:00</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
        <div>
          <div className="text-xs text-white/60 mb-1">Peak Hour</div>
          <div className="text-sm font-semibold text-white">
            ${Math.max(...data.map((d) => d.volumeUSD)).toFixed(0)}
          </div>
        </div>
        <div>
          <div className="text-xs text-white/60 mb-1">Low Hour</div>
          <div className="text-sm font-semibold text-white">
            ${Math.min(...data.map((d) => d.volumeUSD)).toFixed(0)}
          </div>
        </div>
        <div>
          <div className="text-xs text-white/60 mb-1">Total Txns</div>
          <div className="text-sm font-semibold text-white">
            {data.reduce((sum, d) => sum + d.transactionCount, 0)}
          </div>
        </div>
      </div>
    </div>
  );
}

