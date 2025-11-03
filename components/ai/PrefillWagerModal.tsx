"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Info, Sparkles } from "lucide-react";
import Image from "next/image";

interface PrefillWagerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefillData: {
    title: string;
    description: string;
    suggestedDuration: string;
  };
}

export function PrefillWagerModal({
  open,
  onOpenChange,
  prefillData,
}: PrefillWagerModalProps) {
  const [title, setTitle] = useState(prefillData.title);
  const [description, setDescription] = useState(prefillData.description);
  const [platformFee, setPlatformFee] = useState([1]);
  const [duration, setDuration] = useState(prefillData.suggestedDuration);

  const handleContinue = () => {
    // TODO: Implement actual wager creation flow
    console.log("Creating wager:", {
      title,
      description,
      platformFee: platformFee[0],
      duration,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-[#1a1a2e] to-[#16182c] border-cyan-400/30 text-white max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Create Wager from AI Insight
            </DialogTitle>
          </div>
          <p className="text-white/60 text-sm">
            Turn this AI insight into a wager you can host and earn fees from.
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Title */}
          <div>
            <label className="text-sm font-medium text-white/80 mb-2 block">
              Wager Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white/5 border-cyan-400/30 text-white h-12"
              placeholder="e.g., SOL Will Hit $200 in 1 Hour"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-white/80 mb-2 block">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-white/5 border-cyan-400/30 text-white min-h-[100px]"
              placeholder="Explain what this wager is about..."
            />
          </div>

          {/* Duration */}
          <div>
            <label className="text-sm font-medium text-white/80 mb-2 block">
              Suggested Duration
            </label>
            <Input
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="bg-white/5 border-cyan-400/30 text-white h-12"
              placeholder="e.g., 30m pool, 1h pool, 24h pool"
            />
          </div>

          {/* Platform Fee Slider */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-white/80">
                Platform Fee
              </label>
              <span className="text-xl font-bold text-cyan-400">
                {platformFee[0]}%
              </span>
            </div>
            <Slider
              value={platformFee}
              onValueChange={setPlatformFee}
              min={1}
              max={5}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-white/50 mt-2">
              <span>1% (Min)</span>
              <span>5% (Max)</span>
            </div>
            <div className="bg-cyan-500/10 border border-cyan-400/30 rounded-lg p-3 mt-3">
              <p className="text-xs text-cyan-200">
                <strong>You earn:</strong> 50% of platform fee = {(platformFee[0] * 0.5).toFixed(1)}% of total pool
                <br />
                <strong>Prize pool gets:</strong> 25% of fee
                <br />
                <strong>Platform gets:</strong> 25% of fee
              </p>
            </div>
          </div>

          {/* Cost Disclosure */}
          <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-200">
              <p className="font-semibold mb-1">Publishing Cost:</p>
              <p>
                Creating this wager costs{" "}
                <span className="font-bold">$30 worth of VS Chips</span> (or
                uses a free Wager Credit if you have one from the Store).
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleContinue}
              className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white"
            >
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

