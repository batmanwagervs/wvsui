export interface AIGeneratedPool {
  id: string;
  title: string;
  description: string;
  category: "NBA" | "NFL" | "Crypto" | "Events" | string;
  duration: "10m" | "30m" | "1h" | "6h" | "12h";
  target_window: string; // e.g. "Tonight's Lakers vs Celtics game"
  resolution_source: string; // e.g. "Official NBA box score final"
  suggested_ai_line: string; // short statement of the bet line
  platform_fee_default_pct: number; // start 1
  is_spicy: boolean; // high-engagement framing?
  volume_score: number; // 0-1 estimate of engagement potential
  status: "DRAFT" | "APPROVED" | "REJECTED";
}

export interface GeneratePoolsConfig {
  prompt: string;
  category: string;
  durations: string[];
  spiceLevel: number;
  count: number;
}

