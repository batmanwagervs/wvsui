"use client";

import React, { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { AIGeneratedPool } from "@/types/admin";

interface EditPoolModalProps {
  pool: AIGeneratedPool;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedPool: AIGeneratedPool) => void;
}

const DURATIONS = ["10m", "30m", "1h", "6h", "12h"];

export function EditPoolModal({
  pool,
  open,
  onOpenChange,
  onSave,
}: EditPoolModalProps) {
  const [title, setTitle] = useState(pool.title);
  const [description, setDescription] = useState(pool.description);
  const [duration, setDuration] = useState(pool.duration);
  const [platformFee, setPlatformFee] = useState([pool.platform_fee_default_pct]);
  const [resolutionSource, setResolutionSource] = useState(pool.resolution_source);

  useEffect(() => {
    setTitle(pool.title);
    setDescription(pool.description);
    setDuration(pool.duration);
    setPlatformFee([pool.platform_fee_default_pct]);
    setResolutionSource(pool.resolution_source);
  }, [pool]);

  const handleSave = () => {
    const updatedPool: AIGeneratedPool = {
      ...pool,
      title,
      description,
      duration: duration as any,
      platform_fee_default_pct: platformFee[0],
      resolution_source: resolutionSource,
      status: "APPROVED", // Auto-approve when saving edits
    };
    onSave(updatedPool);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-[#1a1a2e] to-[#16182c] border-cyan-400/30 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Edit Pool
          </DialogTitle>
          <p className="text-white/60 text-sm">
            Refine this wager before approving
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Title */}
          <div>
            <label className="text-sm font-medium text-white/80 mb-2 block">
              Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white/5 border-cyan-400/30 text-white h-12"
              placeholder="e.g., Will LeBron score 30+ points tonight?"
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
              Duration Preset
            </label>
            <Select value={duration} onValueChange={(value) => setDuration(value as "10m" | "30m" | "1h" | "6h" | "12h")}>
              <SelectTrigger className="bg-white/5 border-cyan-400/30 text-white h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a2e] border-white/10">
                {DURATIONS.map((d) => (
                  <SelectItem key={d} value={d} className="text-white">
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Platform Fee */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-white/80">
                Platform Fee (House Pools Default: 1%)
              </label>
              <span className="text-2xl font-bold text-cyan-400">
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
                <strong>Fee breakdown:</strong>
                <br />• 7.5% → Global prize pool
                <br />• {platformFee[0]}% → Platform (split 50% creator / 25% pool / 25% platform for creator wagers)
                <br />• 2.5% → Company rake
              </p>
            </div>
          </div>

          {/* Resolution Source */}
          <div>
            <label className="text-sm font-medium text-white/80 mb-2 block">
              Resolution Source / Data Source
            </label>
            <Input
              value={resolutionSource}
              onChange={(e) => setResolutionSource(e.target.value)}
              className="bg-white/5 border-cyan-400/30 text-white h-12"
              placeholder="e.g., Official NBA box score final"
            />
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-200">
              <p className="font-semibold mb-1">Important:</p>
              <p>
                Approved wagers will be added to the platform. This does not auto-publish
                to users yet unless you choose to mark them live.
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
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Save & Approve
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

