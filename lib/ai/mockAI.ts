/**
 * Mock AI response generator
 * In production, this will call your ChatGPT API
 */

import { FullInsight } from "./levelGating";

const mockScenarios: Record<string, (level: number) => any> = {
  sol: (level: number) => ({
    content: level === 1
      ? "Short version? 72% of the crowd is on OVER just because they like green candles. My model thinks that's desperation, not signal. You want spice, take UNDER in the 30m pool. (You're Level 1, so I can't show you the full heatmap yet. Get your weight up 😌)"
      : level === 2
      ? "Alright, here's the real read: 72% OVER / 28% UNDER. Crowd is FOMOing hard after the last pump. My confidence? 82% that this cools off in the next 30 minutes. You can fade them if you've got a spine. Want to make this your own wager and collect fees? You're Level 2 now — go for it."
      : level === 3
      ? "The crowd is 72% OVER, confidence in their bags, but here's what they're missing: volatility is spiking (High Vol window), and the best edge is in the 30m pool before things get messy. My model says 82% chance we see profit-taking. This setup works specifically in short windows when retail is emotional. Pro move: fade the FOMO."
      : "82% confidence OVER fades in 30m. Here's the insider angle: this exact setup — crowd >70% OVER after a +15% day with rising vol — has hit 7 of the last 9 times. They're walking into a classic trap. The smart money already took profit. You're seeing this because you're Elite. Fade them and flex when it prints.",
    confidence: level >= 2 ? "High Confidence (82%)" : "High Confidence",
    confidenceNumeric: 82,
    timeHorizon: level >= 3 ? "Best for 30m pool" : null,
    upsetAlert: true,
    insights: [
      {
        label: "AI Line",
        value: "SOL +3.0% in 30m",
        type: "line",
      },
      ...(level >= 2
        ? [
            {
              label: "Crowd Split",
              value: "72% Over / 28% Under",
              type: "crowd",
            },
          ]
        : []),
      {
        label: "Lock Timer",
        value: "06:31",
        type: "timer",
      },
    ],
    crowdSplit: level >= 2 ? { over: 72, under: 28 } : undefined,
    volatility: level >= 3 ? "High Volatility" : undefined,
    historicalPattern: level >= 4 ? "7/9 similar setups hit" : undefined,
    trapCallout: level >= 4 ? "Classic FOMO trap — smart money already exited" : undefined,
    canCreateWager: level >= 2,
    wagerTitle: "SOL Will Dip -2% in Next 30 Minutes",
    wagerDescription:
      "Crowd is 72% OVER after pump. AI predicts profit-taking will cool the rally. Fade the FOMO.",
  }),

  lakers: (level: number) => ({
    content: level === 1
      ? "Lakers are getting hyped because LeBron posted on IG. But the line moved 2 points since this morning and now 58% of bets are on them. My read? Celtics have the edge. (Level 2 unlocks the full crowd breakdown and my confidence %.)"
      : level === 2
      ? "58% of the public is on Lakers +5.5 after LeBron's IG story. Confidence: 68%. The sharp money is on Celtics. You want this angle for yourself? Turn it into a wager and set your fee up to 5%."
      : level === 3
      ? "Lakers +5.5, public is 58% on them. But here's the tell: the line moved from +3.5 to +5.5 in 4 hours. That's sharp money loading Celtics. My model says 68% Celtics cover. Best edge in the live 1Q bet after tipoff when casuals panic. Medium volatility."
      : "68% Celtics cover. Insider view: when LeBron posts pre-game and the line moves AGAINST the Lakers by 2+ points, public gets baited and sharps clean up. This pattern has hit 6 of 8 times this season. The trap is set. Celtics -5.5 is free money if you're bold enough.",
    confidence: level >= 2 ? "Medium Confidence (68%)" : "Medium Confidence",
    confidenceNumeric: 68,
    timeHorizon: level >= 3 ? "Best live after 1Q" : null,
    upsetAlert: false,
    insights: [
      {
        label: "AI Line",
        value: "Celtics -5.5",
        type: "line",
      },
      ...(level >= 2
        ? [
            {
              label: "Crowd Split",
              value: "58% Lakers / 42% Celtics",
              type: "crowd",
            },
          ]
        : []),
      {
        label: "Lock Timer",
        value: "14:22",
        type: "timer",
      },
    ],
    crowdSplit: level >= 2 ? { over: 58, under: 42 } : undefined,
    volatility: level >= 3 ? "Medium Volatility" : undefined,
    historicalPattern: level >= 4 ? "6/8 times when line moves against hype" : undefined,
    canCreateWager: level >= 2,
    wagerTitle: "Celtics Cover -5.5 vs Lakers",
    wagerDescription:
      "Public loves LeBron's IG post, but sharps are loading Celtics. Line movement tells the real story.",
  }),

  default: (level: number) => ({
    content: level === 1
      ? "I can help you with that, but I need more context. Are you asking about a specific wager, crypto, or sports matchup? Try asking: 'Why is SOL pumping?' or 'Give me your best edge right now.'"
      : "I'm your edge-finder. Ask me about specific pools (SOL, ETH, Lakers, etc.), crowd behavior, or where the AI sees opportunity. The more specific you are, the spicier my read gets.",
    confidence: null,
    timeHorizon: null,
    upsetAlert: false,
    insights: [],
    canCreateWager: false,
  }),
};

export function generateAIResponse(userQuery: string, userLevel: number): any {
  const query = userQuery.toLowerCase();

  // Match query to scenario
  if (query.includes("sol") || query.includes("solana")) {
    return mockScenarios.sol(userLevel);
  }

  if (query.includes("laker") || query.includes("nba") || query.includes("basketball")) {
    return mockScenarios.lakers(userLevel);
  }

  if (query.includes("edge") || query.includes("confidence") || query.includes("best")) {
    // Return SOL as the best edge example
    return {
      ...mockScenarios.sol(userLevel),
      content: "Right now? SOL 30m pool. " + mockScenarios.sol(userLevel).content,
    };
  }

  if (query.includes("wrong") || query.includes("crowd")) {
    return {
      ...mockScenarios.sol(userLevel),
      content:
        "The crowd is obviously wrong on SOL right now. " + mockScenarios.sol(userLevel).content,
    };
  }

  if (query.includes("upset") || query.includes("underdog")) {
    return {
      ...mockScenarios.lakers(userLevel),
      upsetAlert: true,
      content:
        "Here's your underdog flex opportunity: " + mockScenarios.lakers(userLevel).content,
    };
  }

  // Platform rules questions
  if (query.includes("how") && (query.includes("work") || query.includes("payout"))) {
    return {
      content:
        "Payouts work like this: winners split the losing side's pot proportionally to their stake, minus platform fees. If you bet 100 chips on OVER and OVER wins with 1000 total staked, you get your 100 back + your share of the UNDER pot. Simple. Savage. (Level 2+ can create these pools and collect fees btw.)",
      confidence: null,
      timeHorizon: null,
      upsetAlert: false,
      insights: [],
      canCreateWager: false,
    };
  }

  if (query.includes("lock") || query.includes("when")) {
    return {
      content:
        "Pools lock when the timer hits zero. After that, no one else can join, and we wait for the real-world outcome (price, score, event result). Once resolved, winners get paid. Timing matters — some edges only work in short windows. (Level 3+ sees exactly which windows to target.)",
      confidence: null,
      timeHorizon: null,
      upsetAlert: false,
      insights: [],
      canCreateWager: false,
    };
  }

  // Default fallback
  return mockScenarios.default(userLevel);
}

