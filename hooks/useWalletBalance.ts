"use client";

import { useState, useEffect, useCallback } from "react";
import { useMultiChainWallet } from "./useMultiChainWallet";

type ChainType = "solana" | "ethereum" | "polygon" | "arbitrum" | "base";

interface ChainBalances {
  balances: Record<string, number>;
  prices: {
    native: number;
    [key: string]: number;
  };
}

interface MultiChainBalances {
  [chain: string]: ChainBalances;
}

export const useWalletBalance = () => {
  const [balances, setBalances] = useState<MultiChainBalances>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { wallet } = useMultiChainWallet();

  const fetchBalances = useCallback(async (chain: ChainType, address: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      
      // Fetch balances
      const balanceResponse = await fetch(
        `${apiUrl}/api/wallet/balance?address=${address}&chain=${chain}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!balanceResponse.ok) {
        throw new Error(`Failed to fetch ${chain} balances`);
      }

      const balanceData = await balanceResponse.json();

      // Fetch prices
      const priceResponse = await fetch(`${apiUrl}/api/wallet/prices`, {
        method: "GET",
        credentials: "include",
      });

      if (!priceResponse.ok) {
        throw new Error("Failed to fetch prices");
      }

      const priceData = await priceResponse.json();

      return {
        balances: balanceData.balances,
        prices: {
          native: priceData.prices[chain]?.[getNativeCurrency(chain).toLowerCase()] || 0,
          ...priceData.prices[chain],
        },
      };
    } catch (err) {
      console.error(`Error fetching ${chain} balance:`, err);
      throw err;
    }
  }, []);

  const refreshBalances = useCallback(async () => {
    if (!wallet.connected || !wallet.address || !wallet.chain) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const chainBalances = await fetchBalances(wallet.chain, wallet.address);
      setBalances((prev) => ({
        ...prev,
        [wallet.chain!]: chainBalances,
      }));
    } catch (err) {
      console.error("Error refreshing balances:", err);
      setError(err instanceof Error ? err.message : "Failed to refresh balances");
    } finally {
      setLoading(false);
    }
  }, [wallet.connected, wallet.address, wallet.chain, fetchBalances]);

  // Auto-refresh when wallet connects or changes
  useEffect(() => {
    if (wallet.connected && wallet.address && wallet.chain) {
      refreshBalances();
    }
  }, [wallet.connected, wallet.address, wallet.chain]);

  const getNativeCurrency = (chain: ChainType): string => {
    const nativeMap: Record<ChainType, string> = {
      solana: "SOL",
      ethereum: "ETH",
      polygon: "MATIC",
      arbitrum: "ETH",
      base: "ETH",
    };
    return nativeMap[chain];
  };

  return {
    balances,
    loading,
    error,
    refreshBalances,
  };
};
