import React from "react";
import { motion } from "framer-motion";

type TabKey =
  | "FEATURED"
  | "CHIPS"
  | "CREATOR"
  | "INSIGHTS"
  | "ELITE"
  | "PARTNERS";

const tabs: { key: TabKey; label: string; locked?: boolean }[] = [
  { key: "FEATURED", label: "Featured" },
  { key: "CHIPS", label: "Chips" },
  { key: "CREATOR", label: "Creator" },
  { key: "INSIGHTS", label: "Insights" },
  { key: "ELITE", label: "Elite" },
  { key: "PARTNERS", label: "Partners" }
];

const StoreTabs: React.FC<{
  activeTab: TabKey;
  onChange: (t: TabKey) => void;
}> = ({ activeTab, onChange }) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div className="flex gap-2 md:gap-3">
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className={`relative flex-shrink-0 px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-medium border transition
              ${
                isActive
                  ? "bg-white/10 border-white/20 shadow-[0_0_20px_rgba(168,85,247,0.4)] text-white"
                  : "bg-white/5 border-white/10 text-white/50 hover:text-white/80 hover:bg-white/10"
              }`}
            >
              {tab.label}
              {isActive && (
                <motion.span
                  layoutId="storeTabGlow"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-fuchsia-500/20 to-cyan-400/20 blur-xl pointer-events-none"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StoreTabs;
