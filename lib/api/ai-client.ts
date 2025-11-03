/**
 * AI Service API Client
 * 
 * This client talks to our AI service layer endpoints.
 * Currently using mock implementations - swap with real API calls when ready.
 */

import {
  ChatRequest,
  ChatResponse,
  InsightRequest,
  InsightResponse,
  GeneratePoolsRequest,
  GeneratePoolsResponse,
  GenerateUserWagerRequest,
  GenerateUserWagerResponse,
} from "@/types/ai-api";

const API_BASE_URL = process.env.NEXT_PUBLIC_AI_API_URL || "http://localhost:3001/ai";
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_AI !== "false"; // Default to mock

// ============================================================================
// POST /ai/chat - User-facing WagerAI chat
// ============================================================================

export async function chatWithAI(request: ChatRequest): Promise<ChatResponse> {
  if (USE_MOCK) {
    return mockChatWithAI(request);
  }

  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add auth headers as needed
    },
    credentials: "include",
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`AI chat failed: ${response.statusText}`);
  }

  return response.json();
}

// ============================================================================
// POST /ai/insight - Structured wager intel
// ============================================================================

export async function getWagerInsight(request: InsightRequest): Promise<InsightResponse> {
  if (USE_MOCK) {
    return mockGetWagerInsight(request);
  }

  const response = await fetch(`${API_BASE_URL}/insight`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`AI insight failed: ${response.statusText}`);
  }

  return response.json();
}

// ============================================================================
// POST /ai/generate-pools - Admin batch generator
// ============================================================================

export async function generatePools(request: GeneratePoolsRequest): Promise<GeneratePoolsResponse> {
  if (USE_MOCK) {
    return mockGeneratePools(request);
  }

  const response = await fetch(`${API_BASE_URL}/generate-pools`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add admin auth token
    },
    credentials: "include",
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Pool generation failed: ${response.statusText}`);
  }

  return response.json();
}

// ============================================================================
// POST /ai/generate-user-wager - Player "Create with AI" ($50 flow)
// ============================================================================

export async function generateUserWager(
  request: GenerateUserWagerRequest
): Promise<GenerateUserWagerResponse> {
  if (USE_MOCK) {
    return mockGenerateUserWager(request);
  }

  const response = await fetch(`${API_BASE_URL}/generate-user-wager`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`User wager generation failed: ${response.statusText}`);
  }

  return response.json();
}

// ============================================================================
// MOCK IMPLEMENTATIONS
// ============================================================================

function mockChatWithAI(request: ChatRequest): Promise<ChatResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const message = request.message.toLowerCase();
      const level = request.level;

      // Determine response based on query
      let response: ChatResponse;

      if (message.includes("sol") || message.includes("solana")) {
        response = mockSOLResponse(level);
      } else if (message.includes("laker") || message.includes("lebron") || message.includes("nba")) {
        response = mockNBAResponse(level);
      } else if (message.includes("edge") || message.includes("confidence")) {
        response = mockBestEdgeResponse(level);
      } else if (message.includes("wrong") || message.includes("crowd")) {
        response = mockCrowdWrongResponse(level);
      } else if (message.includes("upset")) {
        response = mockUpsetResponse(level);
      } else if (message.includes("how") || message.includes("work")) {
        response = mockHowItWorksResponse(level);
      } else {
        response = mockDefaultResponse(level);
      }

      resolve(response);
    }, 1500); // Simulate network delay
  });
}

function mockGetWagerInsight(request: InsightRequest): Promise<InsightResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const level = request.level;
      
      resolve({
        poolId: request.poolId,
        label: "SOL 30m Pool",
        aiLine: "SOL +3.0%",
        lockTimer: "06:31",
        recommendedWindow: level >= 3 ? "Best in 30m window" : undefined,
        volatility: level >= 3 ? "High" : undefined,
        crowdSplitPct: {
          over: 72,
          under: 28,
          locked: level < 2,
        },
        aiConfidencePct: {
          value: 82,
          locked: level < 2,
        },
        upsetAlert: true,
        canCreateFromThis: level >= 2,
      });
    }, 500);
  });
}

function mockGeneratePools(request: GeneratePoolsRequest): Promise<GeneratePoolsResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const pools = generateMockPools(
        request.count,
        request.category,
        request.durations,
        request.spiceLevel
      );

      resolve({
        generatedAt: new Date().toISOString(),
        pools,
      });
    }, 2000);
  });
}

function mockGenerateUserWager(request: GenerateUserWagerRequest): Promise<GenerateUserWagerResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (request.level < 2) {
        resolve({
          canCreate: false,
          requiresLevel: 2,
          userLevel: request.level,
          upgradeMessage:
            "You need Level 2 to publish wagers and collect platform fees. Level up by playing pools, earning points, and staying active this prize cycle.",
        });
      } else {
        resolve({
          canCreate: true,
          requiresLevel: 2,
          userLevel: request.level,
          costChipsUSD: 50,
          draftWager: {
            title: "Will SOL outperform ETH in the next hour?",
            description:
              "Bet OVER if SOL gains more % than ETH in the next 60 minutes. Bet UNDER if ETH wins that race.",
            category: "Crypto",
            duration: request.duration || "1h",
            defaultPlatformFeePct: 1,
            maxPlatformFeePct: 5,
            resolutionSource: "Median of top crypto price feeds at resolve time",
            payoutNote:
              "Winners split the losing side's pot after fees. You keep 50% of the fee your pool generates.",
          },
        });
      }
    }, 1500);
  });
}

// ============================================================================
// Mock Response Helpers
// ============================================================================

function mockSOLResponse(level: number): ChatResponse {
  const levelText = {
    1: "Short version? 72% of the crowd is on OVER just because they like green candles. My model thinks that's desperation, not signal. You want spice, take UNDER in the 30m pool. (You're Level 1, so I can't show you the full heatmap yet. Get your weight up 😌)",
    2: "Alright, here's the real read: 72% OVER / 28% UNDER. Crowd is FOMOing hard after the last pump. My confidence? 82% that this cools off in the next 30 minutes. You can fade them if you've got a spine. Want to make this your own wager and collect fees? You're Level 2 now — go for it.",
    3: "The crowd is 72% OVER, confidence in their bags, but here's what they're missing: volatility is spiking (High Vol window), and the best edge is in the 30m pool before things get messy. My model says 82% chance we see profit-taking. This setup works specifically in short windows when retail is emotional. Pro move: fade the FOMO.",
    4: "82% confidence OVER fades in 30m. Here's the insider angle: this exact setup — crowd >70% OVER after a +15% day with rising vol — has hit 7 of the last 9 times. They're walking into a classic trap. The smart money already took profit. You're seeing this because you're Elite. Fade them and flex when it prints.",
  };

  const badges: Array<{ label: string; value: string }> = [
    { label: "Insight Level", value: `${level}/4` },
  ];

  if (level >= 2) {
    badges.push({ label: "High Confidence", value: "82%" });
  } else {
    badges.push({ label: "Confidence", value: "High" });
  }

  if (level >= 3) {
    badges.push({ label: "Best for", value: "30m pool" });
  }

  const intelCards = [
    {
      type: "ai_line",
      label: "AI Line",
      value: "SOL +3.0% in 30m",
      locked: false,
    },
    {
      type: "crowd_split",
      label: "Crowd Split",
      value: "72% Over / 28% Under",
      locked: level < 2,
      unlockAtLevel: 2,
    },
    {
      type: "lock_timer",
      label: "Locks in",
      value: "06:31",
      locked: false,
    },
  ];

  if (level >= 4) {
    intelCards.push({
      type: "historical_edge",
      label: "Insider Pattern",
      value: "7 of last 9 similar setups hit",
      locked: false,
    });
  } else if (level >= 3) {
    intelCards.push({
      type: "historical_edge",
      label: "Insider Pattern",
      value: "Unlock at Level 4",
      locked: true,
      unlockAtLevel: 4,
    });
  }

  return {
    assistantMessage: {
      text: levelText[level as keyof typeof levelText] || levelText[1],
      toneTags: ["sarcastic", "confident", level >= 2 ? "teasing" : "helpful"],
    },
    insightMeta: {
      exposureLevelShown: level,
      maxExposureLevel: 4,
      badges,
    },
    intelCards,
    wagerCreateCTA: {
      canCreate: level >= 2,
      why: level >= 2 ? "You're Level 2+." : "Unlock at Level 2 to host wagers and earn fees.",
      suggestedTitle: "Will SOL beat +3.0% in the next 30m?",
      suggestedDescription:
        "Bet OVER if SOL pumps >3% in the next 30m. UNDER if it doesn't hold that momentum.",
      defaultPlatformFeePct: 1,
      durationPreset: "30m",
      costChipsUSD: 30,
    },
    quickPrompts: [
      "Where is the public obviously wrong right now?",
      "Give me an underdog upset I can flex if it hits",
      "Which pool closes the soonest with real edge?",
    ],
  };
}

function mockNBAResponse(level: number): ChatResponse {
  const levelText = {
    1: "Lakers are getting hyped because LeBron posted on IG. But the line moved 2 points since this morning. My read? Celtics have the edge. (Level 2 unlocks the full crowd breakdown and my confidence %.)",
    2: "58% of the public is on Lakers +5.5 after LeBron's IG story. Confidence: 68%. The sharp money is on Celtics. You want this angle for yourself? Turn it into a wager and set your fee up to 5%.",
    3: "Lakers +5.5, public is 58% on them. But here's the tell: the line moved from +3.5 to +5.5 in 4 hours. That's sharp money loading Celtics. My model says 68% Celtics cover. Best edge in the live 1Q bet after tipoff when casuals panic. Medium volatility.",
    4: "68% Celtics cover. Insider view: when LeBron posts pre-game and the line moves AGAINST the Lakers by 2+ points, public gets baited and sharps clean up. This pattern has hit 6 of 8 times this season. The trap is set. Celtics -5.5 is free money if you're bold enough.",
  };

  const badges: Array<{ label: string; value: string }> = [
    { label: "Insight Level", value: `${level}/4` },
  ];

  if (level >= 2) {
    badges.push({ label: "Confidence", value: "68%" });
  } else {
    badges.push({ label: "Confidence", value: "Medium" });
  }

  return {
    assistantMessage: {
      text: levelText[level as keyof typeof levelText] || levelText[1],
      toneTags: ["analytical", "confident"],
    },
    insightMeta: {
      exposureLevelShown: level,
      maxExposureLevel: 4,
      badges,
    },
    intelCards: [
      {
        type: "ai_line",
        label: "AI Line",
        value: "Celtics -5.5",
        locked: false,
      },
      {
        type: "crowd_split",
        label: "Crowd Split",
        value: "58% Lakers / 42% Celtics",
        locked: level < 2,
        unlockAtLevel: 2,
      },
      {
        type: "lock_timer",
        label: "Locks in",
        value: "2h 14m",
        locked: false,
      },
    ],
    wagerCreateCTA: {
      canCreate: level >= 2,
      why: level >= 2 ? "You're Level 2+." : "Unlock at Level 2",
      suggestedTitle: "Will Celtics cover -5.5 vs Lakers?",
      suggestedDescription: "Public loves LeBron's IG post, but sharps are loading Celtics.",
      defaultPlatformFeePct: 1,
      durationPreset: "1h",
      costChipsUSD: 30,
    },
    quickPrompts: [
      "Show me your best edge right now",
      "Where is the crowd wrong?",
      "Give me a spicy upset angle",
    ],
  };
}

function mockBestEdgeResponse(level: number): ChatResponse {
  const sol = mockSOLResponse(level);
  sol.assistantMessage.text = "Right now? SOL 30m pool. " + sol.assistantMessage.text;
  return sol;
}

function mockCrowdWrongResponse(level: number): ChatResponse {
  const sol = mockSOLResponse(level);
  sol.assistantMessage.text =
    "The crowd is obviously wrong on SOL right now. " + sol.assistantMessage.text;
  return sol;
}

function mockUpsetResponse(level: number): ChatResponse {
  const nba = mockNBAResponse(level);
  nba.assistantMessage.text = "Here's your underdog flex opportunity: " + nba.assistantMessage.text;
  return nba;
}

function mockHowItWorksResponse(level: number): ChatResponse {
  return {
    assistantMessage: {
      text: "Payouts work like this: winners split the losing side's pot proportionally to their stake, minus platform fees. If you bet 100 chips on OVER and OVER wins with 1000 total staked, you get your 100 back + your share of the UNDER pot. Simple. Savage. (Level 2+ can create these pools and collect fees btw.)",
      toneTags: ["explanatory", "helpful"],
    },
    insightMeta: {
      exposureLevelShown: level,
      maxExposureLevel: 4,
      badges: [],
    },
    intelCards: [],
    wagerCreateCTA: {
      canCreate: false,
      why: "This is platform info, not a wager opportunity.",
    },
    quickPrompts: [
      "Show me your best edge right now",
      "Why is SOL pumping?",
      "Where is the crowd wrong?",
    ],
  };
}

function mockDefaultResponse(level: number): ChatResponse {
  return {
    assistantMessage: {
      text: level === 1
        ? "I can help you with that, but I need more context. Are you asking about a specific wager, crypto, or sports matchup? Try asking: 'Why is SOL pumping?' or 'Show me your best edge right now.'"
        : "I'm your edge-finder. Ask me about specific pools (SOL, ETH, Lakers, etc.), crowd behavior, or where the AI sees opportunity. The more specific you are, the spicier my read gets.",
      toneTags: ["helpful"],
    },
    insightMeta: {
      exposureLevelShown: level,
      maxExposureLevel: 4,
      badges: [],
    },
    intelCards: [],
    wagerCreateCTA: {
      canCreate: false,
      why: "Ask about a specific wager or event to get actionable insights.",
    },
    quickPrompts: [
      "Show me your highest-confidence edge right now",
      "Where is the crowd obviously wrong?",
      "Why is SOL pumping?",
    ],
  };
}

function generateMockPools(
  count: number,
  category: string,
  durations: string[],
  spiceLevel: number
): any[] {
  const templates: Record<string, any[]> = {
    NBA: [
      {
        title: "Will LeBron score 30+ points tonight?",
        description: "Bet OVER if LeBron scores 30 or more in regulation. UNDER if he doesn't hit 30.",
        suggestedAiLine: "LeBron 30+ points",
        targetWindow: "Tonight's game only",
      },
      {
        title: "Will Tatum outscore LeBron?",
        description: "Pick the alpha. OVER = Tatum outscores LeBron. UNDER = LeBron outscores Tatum.",
        suggestedAiLine: "Tatum > LeBron points",
        targetWindow: "Same game window",
      },
    ],
    Crypto: [
      {
        title: "SOL to pump 5%+ in the next hour?",
        description: "Solana's been volatile. Will it pump 5% or more in 60 minutes?",
        suggestedAiLine: "SOL +5% in 1h",
        targetWindow: "Next 60 minutes",
      },
      {
        title: "Will ETH hit $3,600 before midnight?",
        description: "Ethereum's climbing. Will it break $3,600 before the day ends?",
        suggestedAiLine: "ETH $3,600 by midnight",
        targetWindow: "Before midnight UTC",
      },
    ],
  };

  const categoryTemplates = templates[category] || templates.NBA;
  const pools: any[] = [];

  for (let i = 0; i < count; i++) {
    const template = categoryTemplates[i % categoryTemplates.length];
    const duration = durations[i % durations.length];
    
    pools.push({
      id: `draft_pool_${Date.now()}_${i}`,
      title: template.title,
      description: template.description,
      category,
      duration,
      targetWindow: template.targetWindow,
      resolutionSource: category === "Crypto" ? "CoinGecko API" : `Official ${category} data`,
      suggestedAiLine: template.suggestedAiLine,
      platformFeeDefaultPct: 1,
      isSpicy: spiceLevel >= 7 || Math.random() > 0.5,
      volumeScore: 0.5 + Math.random() * 0.5,
      status: "DRAFT" as const,
    });
  }

  return pools;
}

