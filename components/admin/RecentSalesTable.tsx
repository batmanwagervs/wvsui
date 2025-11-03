"use client";

import React, { useState } from "react";
import { List, ChevronDown, ChevronUp, ExternalLink, CheckCircle, Clock, XCircle } from "lucide-react";
import { SaleTransaction } from "@/types/admin-sales";
import { Button } from "@/components/ui/button";

interface RecentSalesTableProps {
  sales: SaleTransaction[];
}

export function RecentSalesTable({ sales }: RecentSalesTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [displayCount, setDisplayCount] = useState(10);

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const getStatusBadge = (status: string) => {
    if (status === "completed") {
      return (
        <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 border border-green-400/30 rounded-full text-green-300 text-xs">
          <CheckCircle className="w-3 h-3" />
          Completed
        </div>
      );
    }
    if (status === "pending") {
      return (
        <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 border border-yellow-400/30 rounded-full text-yellow-300 text-xs">
          <Clock className="w-3 h-3" />
          Pending
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1 px-2 py-1 bg-red-500/20 border border-red-400/30 rounded-full text-red-300 text-xs">
        <XCircle className="w-3 h-3" />
        Failed
      </div>
    );
  };

  const getCurrencyColor = (currency: string) => {
    const colors: Record<string, string> = {
      SOL: "text-purple-400",
      ETH: "text-blue-400",
      USDC: "text-green-400",
      MATIC: "text-indigo-400",
      USDT: "text-emerald-400",
    };
    return colors[currency] || "text-white";
  };

  const displayedSales = sales.slice(0, displayCount);

  return (
    <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16182c] rounded-2xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <List className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
        </div>
        <div className="text-sm text-white/60">{sales.length} total</div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-left">
              <th className="pb-3 text-xs font-semibold text-white/60 uppercase tracking-wider">
                Time
              </th>
              <th className="pb-3 text-xs font-semibold text-white/60 uppercase tracking-wider">
                User
              </th>
              <th className="pb-3 text-xs font-semibold text-white/60 uppercase tracking-wider">
                Currency
              </th>
              <th className="pb-3 text-xs font-semibold text-white/60 uppercase tracking-wider text-right">
                Amount
              </th>
              <th className="pb-3 text-xs font-semibold text-white/60 uppercase tracking-wider text-right">
                USD Value
              </th>
              <th className="pb-3 text-xs font-semibold text-white/60 uppercase tracking-wider text-right">
                VS Chips
              </th>
              <th className="pb-3 text-xs font-semibold text-white/60 uppercase tracking-wider">
                Status
              </th>
              <th className="pb-3 text-xs font-semibold text-white/60 uppercase tracking-wider">
                
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedSales.map((sale) => (
              <React.Fragment key={sale.id}>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 text-sm text-white/80">
                    {new Date(sale.timestamp).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-4">
                    <div className="text-sm text-white/80 font-mono">
                      {sale.userId.slice(0, 12)}...
                    </div>
                  </td>
                  <td className="py-4">
                    <div className={`text-sm font-semibold ${getCurrencyColor(sale.currency)}`}>
                      {sale.currency}
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <div className="text-sm text-white/80">
                      {sale.amountCrypto.toFixed(4)}
                    </div>
                    <div className="text-xs text-white/50">
                      @${sale.priceUSD.toFixed(2)}
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <div className="text-sm font-semibold text-white">
                      ${sale.usdValue.toFixed(2)}
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <div className="text-sm text-cyan-400 font-semibold">
                      {(sale.vsChips / 1000).toFixed(1)}K
                    </div>
                  </td>
                  <td className="py-4">
                    {getStatusBadge(sale.status)}
                  </td>
                  <td className="py-4">
                    <button
                      onClick={() => toggleRow(sale.id)}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      {expandedRows.has(sale.id) ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                </tr>

                {/* Expanded Row */}
                {expandedRows.has(sale.id) && (
                  <tr className="bg-white/5">
                    <td colSpan={8} className="py-4 px-6">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-white/60 mb-1">Transaction ID</div>
                          <div className="text-white/90 font-mono text-xs">{sale.id}</div>
                        </div>
                        <div>
                          <div className="text-white/60 mb-1">Transaction Hash</div>
                          <div className="flex items-center gap-2">
                            <div className="text-white/90 font-mono text-xs">{sale.txHash}</div>
                            <a
                              href="#"
                              className="text-cyan-400 hover:text-cyan-300"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                        <div>
                          <div className="text-white/60 mb-1">Full User ID</div>
                          <div className="text-white/90 font-mono text-xs">{sale.userId}</div>
                        </div>
                        <div>
                          <div className="text-white/60 mb-1">Conversion Rate</div>
                          <div className="text-white/90 text-xs">
                            1 USD = 20,000 VS Chips
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Load More */}
      {displayCount < sales.length && (
        <div className="mt-6 text-center">
          <Button
            onClick={() => setDisplayCount((prev) => Math.min(prev + 10, sales.length))}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            Load More ({sales.length - displayCount} remaining)
          </Button>
        </div>
      )}
    </div>
  );
}

