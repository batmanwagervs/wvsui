"use client";

import React, { useState } from "react";
import { Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";

interface PromptBuilderPanelProps {
  onGenerate: (config: any) => void;
  isGenerating: boolean;
}

const CATEGORIES = ["NBA", "NFL", "Crypto", "Events", "UFC", "Politics"];
const DURATIONS = ["10m", "30m", "1h", "6h", "12h"];

export function PromptBuilderPanel({
  onGenerate,
  isGenerating,
}: PromptBuilderPanelProps) {
  const [prompt, setPrompt] = useState("");
  const [category, setCategory] = useState("NBA");
  const [selectedDurations, setSelectedDurations] = useState<string[]>(["30m", "1h"]);
  const [spiceLevel, setSpiceLevel] = useState([5]);
  const [count, setCount] = useState(5);

  const handleDurationToggle = (duration: string) => {
    setSelectedDurations((prev) =>
      prev.includes(duration)
        ? prev.filter((d) => d !== duration)
        : [...prev, duration]
    );
  };

  const handleGenerate = () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt");
      return;
    }

    onGenerate({
      prompt,
      category,
      durations: selectedDurations.length > 0 ? selectedDurations : ["1h"],
      spiceLevel: spiceLevel[0],
      count,
    });
  };

  const getSpiceLevelLabel = (level: number) => {
    if (level <= 3) return "Safe / Statistical";
    if (level <= 6) return "Moderate Engagement";
    if (level <= 8) return "Spicy / Rivalry";
    return "Maximum Chaos 🔥";
  };

  const examplePrompts = [
    "Design 10 prediction pools about tonight's NBA slate that will get max volume",
    "Make 4 pools about Anthony Edwards, focus on scoring and turnovers, keep it spicy",
    "Give me 6 crypto volatility pools for the next 1 hour windows",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gradient-to-br from-[#1a1a2e] to-[#16182c] rounded-2xl border border-white/10 shadow-2xl"
    >
      {/* Header */}
      <div className="border-b border-white/10 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 flex items-center justify-center">
            <Zap className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Create Batch</h2>
            <p className="text-sm text-white/60">Generate pools with AI</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-6 space-y-6">
        {/* Prompt Textarea */}
        <div>
          <label className="text-sm font-medium text-white/80 mb-2 block">
            Describe the pools you want
          </label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Give me 8 high-engagement pools for tonight's Lakers vs Celtics game..."
            className="bg-white/5 border-cyan-400/30 text-white min-h-[120px] placeholder:text-white/40"
          />
          
          {/* Example Prompts */}
          <div className="mt-3 space-y-2">
            <p className="text-xs text-white/50">Quick examples:</p>
            {examplePrompts.map((example, idx) => (
              <button
                key={idx}
                onClick={() => setPrompt(example)}
                className="block text-xs text-cyan-400 hover:text-cyan-300 hover:underline text-left"
              >
                "{example}"
              </button>
            ))}
          </div>
        </div>

        {/* Category Select */}
        <div>
          <label className="text-sm font-medium text-white/80 mb-2 block">
            Category
          </label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-white/5 border-cyan-400/30 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a2e] border-white/10">
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat} className="text-white">
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Duration Multi-Select */}
        <div>
          <label className="text-sm font-medium text-white/80 mb-2 block">
            Target Durations
          </label>
          <div className="flex flex-wrap gap-2">
            {DURATIONS.map((duration) => (
              <button
                key={duration}
                onClick={() => handleDurationToggle(duration)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedDurations.includes(duration)
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white border border-cyan-400/50"
                    : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
                }`}
              >
                {duration}
              </button>
            ))}
          </div>
        </div>

        {/* Spice Level Slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-white/80">
              Spice Level
            </label>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-cyan-400">{spiceLevel[0]}</span>
              <span className="text-xs text-white/60">/10</span>
            </div>
          </div>
          <Slider
            value={spiceLevel}
            onValueChange={setSpiceLevel}
            min={1}
            max={10}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-white/50 mt-2">
            <span>1 - Safe</span>
            <span className="text-center text-cyan-400 font-medium">
              {getSpiceLevelLabel(spiceLevel[0])}
            </span>
            <span>10 - Viral</span>
          </div>
          <p className="text-xs text-white/60 mt-2">
            Higher spice = more emotional, controversial, or rivalry-focused framing
          </p>
        </div>

        {/* Count Input */}
        <div>
          <label className="text-sm font-medium text-white/80 mb-2 block">
            How many pools to generate?
          </label>
          <Input
            type="number"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            min={1}
            max={20}
            className="bg-white/5 border-cyan-400/30 text-white"
          />
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white disabled:opacity-50"
        >
          {isGenerating ? (
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span>Generating Pools...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span>Generate Pools</span>
            </div>
          )}
        </Button>

        {/* Helper Text */}
        <p className="text-xs text-white/50 text-center">
          The AI will return draft wagers. You still approve each one before it goes live.
        </p>
      </div>
    </motion.div>
  );
}

