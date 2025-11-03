/**
 * Shared API Types for WagerVS AI Service Layer
 * These match the REST API contract exactly
 */

// ============================================================================
// Shared Types
// ============================================================================

export interface UserContext {
  userId: string;
  level: 1 | 2 | 3 | 4;
}

export interface IntelCard {
  type: string; // "ai_line" | "crowd_split" | "lock_timer" | "historical_edge" | ...
  label: string;
  value: string;
  locked: boolean;
  unlockAtLevel?: number;
}

// ============================================================================
// POST /ai/chat - User-facing WagerAI chat
// ============================================================================

export interface ChatRequest {
  userId: string;
  level: 1 | 2 | 3 | 4;
  message: string;
  contextCategory?: string; // "nba" | "crypto" | "events" | etc.
  activePoolIds?: string[];
}

export interface ChatResponse {
  assistantMessage: {
    text: string;
    toneTags: string[]; // ["sarcastic", "confident", "teasing"]
  };
  insightMeta: {
    exposureLevelShown: number; // what level of intel they saw
    maxExposureLevel: number; // always 4
    badges: Array<{ label: string; value: string }>;
  };
  intelCards: IntelCard[];
  wagerCreateCTA: {
    canCreate: boolean;
    why: string;
    suggestedTitle?: string;
    suggestedDescription?: string;
    defaultPlatformFeePct?: number; // start 1
    durationPreset?: string; // "30m"
    costChipsUSD?: number; // 30 for manual
  };
  quickPrompts: string[];
}

// ============================================================================
// POST /ai/insight - Structured wager intel
// ============================================================================

export interface InsightRequest {
  userId: string;
  level: 1 | 2 | 3 | 4;
  poolId: string;
}

export interface InsightResponse {
  poolId: string;
  label: string; // "SOL 30m Pool"
  aiLine: string; // "SOL +3.0%"
  lockTimer: string; // "06:31"
  recommendedWindow?: string; // "Best in 30m window" (Level 3+)
  volatility?: string; // "High" (Level 3+)
  crowdSplitPct: {
    over: number;
    under: number;
    locked: boolean; // true if level < 2
  };
  aiConfidencePct: {
    value: number;
    locked: boolean; // true if level < 2
  };
  upsetAlert: boolean;
  canCreateFromThis: boolean;
}

// ============================================================================
// POST /ai/generate-pools - Admin batch generator
// ============================================================================

export interface GeneratePoolsRequest {
  adminId: string;
  prompt: string;
  category: string; // "NBA" | "Crypto" | etc.
  durations: string[]; // ["30m", "1h"]
  spiceLevel: number; // 1-10
  count: number;
}

export interface GeneratePoolsResponse {
  generatedAt: string; // ISO timestamp
  pools: AIGeneratedPool[];
}

export interface AIGeneratedPool {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: "10m" | "30m" | "1h" | "6h" | "12h";
  targetWindow: string;
  resolutionSource: string;
  suggestedAiLine: string;
  platformFeeDefaultPct: number; // 1
  isSpicy: boolean;
  volumeScore: number; // 0.0 - 1.0
  status: "DRAFT" | "APPROVED" | "REJECTED";
}

// ============================================================================
// POST /ai/generate-user-wager - Player "Create with AI" ($50 flow)
// ============================================================================

export interface GenerateUserWagerRequest {
  userId: string;
  level: 1 | 2 | 3 | 4;
  prompt: string;
  duration?: string; // "1h"
}

export interface GenerateUserWagerResponse {
  canCreate: boolean;
  requiresLevel: number;
  userLevel: number;
  costChipsUSD?: number; // 50
  draftWager?: {
    title: string;
    description: string;
    category: string;
    duration: string;
    defaultPlatformFeePct: number; // 1
    maxPlatformFeePct: number; // 5
    resolutionSource: string;
    payoutNote: string;
  };
  upgradeMessage?: string; // If blocked
}

