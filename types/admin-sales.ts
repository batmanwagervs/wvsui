export interface TokenSalesStats {
  totalRevenueUSD: number;
  totalTransactions: number;
  totalVSChipsSold: number;
  averageTransactionUSD: number;
  growthPercent: number;
  currencyBreakdown: CurrencyBreakdown[];
  timeline: TimelineData[];
}

export interface CurrencyBreakdown {
  currency: string; // "SOL" | "ETH" | "USDC" | "MATIC" | "USDT"
  volumeUSD: number;
  percentage: number;
  transactionCount: number;
  averageUSD: number;
}

export interface TimelineData {
  timestamp: string; // ISO string
  volumeUSD: number;
  transactionCount: number;
}

export interface SaleTransaction {
  id: string;
  userId: string;
  timestamp: string; // ISO string
  currency: string;
  amountCrypto: number;
  priceUSD: number;
  usdValue: number;
  vsChips: number;
  txHash: string;
  status: "pending" | "completed" | "failed";
}

