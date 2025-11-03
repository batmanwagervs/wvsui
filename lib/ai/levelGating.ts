/**
 * Level-gated insight visibility logic
 * Controls what AI data users can see based on their level
 */

export interface FullInsight {
  confidence: string | null;
  confidenceNumeric?: number;
  timeHorizon: string | null;
  upsetAlert: boolean;
  insights: Array<{
    label: string;
    value: string;
    type: string;
  }>;
  crowdSplit?: { over: number; under: number };
  volatility?: string;
  historicalPattern?: string;
  trapCallout?: string;
  canCreateWager?: boolean;
  wagerTitle?: string;
  wagerDescription?: string;
}

export interface VisibleInsight {
  confidence: string | null;
  timeHorizon: string | null;
  upsetAlert: boolean;
  insights: Array<{
    label: string;
    value: string;
    type: string;
  }>;
  lockedInsights: Array<{
    unlockLevel: number;
    feature: string;
  }>;
}

export function getVisibleInsight(
  level: number,
  fullInsight: FullInsight
): VisibleInsight {
  const visible: VisibleInsight = {
    confidence: null,
    timeHorizon: null,
    upsetAlert: false,
    insights: [],
    lockedInsights: [],
  };

  // Level 1: Contender
  // - Sees short summary only
  // - NO numeric confidence
  // - NO crowd split
  // - NO time windows
  if (level === 1) {
    visible.confidence = fullInsight.confidence ? "High Confidence" : null;
    visible.upsetAlert = fullInsight.upsetAlert;

    // Show basic insights only (no crowd data)
    visible.insights = fullInsight.insights.filter(
      (i) => i.type !== "crowd" && i.type !== "confidence"
    );

    // Add locked teasers
    visible.lockedInsights.push({
      unlockLevel: 2,
      feature: "AI Confidence % and Crowd Split Data",
    });

    return visible;
  }

  // Level 2: Creator
  // - Gets numeric confidence
  // - Gets crowd split %
  // - Can create wagers from AI insights
  if (level === 2) {
    visible.confidence = fullInsight.confidence;
    visible.upsetAlert = fullInsight.upsetAlert;

    // Show all insights including crowd data
    visible.insights = fullInsight.insights;

    // Add locked teaser for level 3 features
    visible.lockedInsights.push({
      unlockLevel: 3,
      feature: "Time Windows & Volatility Analysis",
    });

    return visible;
  }

  // Level 3: Strategist
  // - Everything from Level 2 +
  // - Time horizon recommendations
  // - Volatility labels
  // - Crowd sentiment analysis
  if (level === 3) {
    visible.confidence = fullInsight.confidence;
    visible.timeHorizon = fullInsight.timeHorizon;
    visible.upsetAlert = fullInsight.upsetAlert;
    visible.insights = fullInsight.insights;

    // Add volatility insight if available
    if (fullInsight.volatility) {
      visible.insights.push({
        label: "Volatility",
        value: fullInsight.volatility,
        type: "risk",
      });
    }

    // Add locked teaser for level 4 features
    visible.lockedInsights.push({
      unlockLevel: 4,
      feature: "Insider View & Historical Patterns",
    });

    return visible;
  }

  // Level 4: Elite
  // - Everything from Level 3 +
  // - Historical pattern matching
  // - Trap/bait callouts
  // - Full insider intelligence
  if (level >= 4) {
    visible.confidence = fullInsight.confidence;
    visible.timeHorizon = fullInsight.timeHorizon;
    visible.upsetAlert = fullInsight.upsetAlert;
    visible.insights = fullInsight.insights;

    // Add volatility
    if (fullInsight.volatility) {
      visible.insights.push({
        label: "Volatility",
        value: fullInsight.volatility,
        type: "risk",
      });
    }

    // Add historical pattern
    if (fullInsight.historicalPattern) {
      visible.insights.push({
        label: "Historical Edge",
        value: fullInsight.historicalPattern,
        type: "confidence",
      });
    }

    // No locked insights at max level
    visible.lockedInsights = [];

    return visible;
  }

  return visible;
}

/**
 * Check if user can create wagers from AI insights
 */
export function canCreateWagerFromAI(level: number): boolean {
  return level >= 2;
}

/**
 * Get level-appropriate AI response tone
 */
export function getAITone(level: number): string {
  const tones = {
    1: "friendly but teasing about locked features",
    2: "confident and empowering, mentioning creator opportunities",
    3: "strategic and analytical, diving deeper into edge",
    4: "insider and spicy, calling out traps and patterns",
  };

  return tones[level as keyof typeof tones] || tones[1];
}

