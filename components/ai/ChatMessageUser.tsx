"use client";

import React from "react";

interface ChatMessageUserProps {
  content: string;
  timestamp: Date;
}

export function ChatMessageUser({ content, timestamp }: ChatMessageUserProps) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%]">
        {/* User Label */}
        <div className="flex items-center gap-2 mb-2 justify-end">
          <span className="text-xs text-white/40" suppressHydrationWarning>
            {timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span className="text-sm text-white/60">You</span>
        </div>

        {/* Message Bubble */}
        <div className="bg-white/10 rounded-2xl rounded-tr-none px-5 py-3 shadow-lg">
          <p className="text-white/90 leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
}

