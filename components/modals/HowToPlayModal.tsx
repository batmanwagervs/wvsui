"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Target, 
  Coins, 
  Lock, 
  Trophy, 
  Star, 
  Award, 
  Gem, 
  Play,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle,
  Clock,
  Users,
  Zap
} from "lucide-react";

interface HowToPlayModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const steps = [
  {
    id: 1,
    title: "Create or Pick a Prediction Pool",
    icon: Target,
    emoji: "🎯",
    description: "Join existing pools or create your own wager",
    example: {
      type: "PvP Pool",
      title: "Lakers vs Warriors",
      question: "Will LeBron score 25+ points?",
      side1: "YES",
      side2: "NO",
      side1Amount: 1.2,
      side2Amount: 0.8,
      timeLeft: "2h 15m",
      participants: 247
    },
    details: [
      "PvP: Bet against other players on real outcomes",
      "PvE: Challenge AI predictions for bonus points",
      "Browse live pools or create your own"
    ],
    color: "from-cyan-500 to-blue-500",
    bgColor: "from-cyan-500/10 to-blue-500/10"
  },
  {
    id: 2,
    title: "Stake Your Chips",
    icon: Coins,
    emoji: "🪙",
    description: "Place your VS Chips on the side you believe will win",
    example: {
      yourStake: 50,
      side: "YES",
      potentialWin: 83,
      multiplier: "1.67x"
    },
    details: [
      "Minimum 1 chip, higher stakes = bigger rewards",
      "Your chips join that side's pool",
      "See real-time payouts as others join"
    ],
    color: "from-yellow-500 to-orange-500",
    bgColor: "from-yellow-500/10 to-orange-500/10"
  },
  {
    id: 3,
    title: "Pool Locks",
    icon: Lock,
    emoji: "🔒",
    description: "Countdown ends, no more bets allowed",
    example: {
      status: "LOCKED",
      totalPool: 2.1,
      side1Pool: 1.2,
      side2Pool: 0.9,
      waitingFor: "Game result"
    },
    details: [
      "Real-world outcome determines winner",
      "All bets are final",
      "Winners split losing side's pot"
    ],
    color: "from-red-500 to-pink-500",
    bgColor: "from-red-500/10 to-pink-500/10"
  },
  {
    id: 4,
    title: "Win & Earn",
    icon: Trophy,
    emoji: "🏆",
    description: "Get paid out and earn points for the prize pool",
    example: {
      won: true,
      yourStake: 50,
      winnings: 33,
      totalReturn: 83,
      pointsEarned: 150
    },
    details: [
      "Winners split losing pot proportionally",
      "Earn points for biweekly prize pool",
      "Win against AI predictions for bonus points"
    ],
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-500/10 to-emerald-500/10"
  }
];

const demoWager = {
  title: "Will Bitcoin close above $70,000 today?",
  side1: "YES",
  side2: "NO",
  side1Amount: 60,
  side2Amount: 40,
  totalPool: 100,
  timeLeft: "2h 15m"
};

export function HowToPlayModal({ open, onOpenChange }: HowToPlayModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [demoStep, setDemoStep] = useState<'select' | 'locked' | 'result'>('select');
  const [selectedSide, setSelectedSide] = useState<'yes' | 'no' | null>(null);
  const [demoWon, setDemoWon] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDemoWager = (side: 'yes' | 'no') => {
    setSelectedSide(side);
    setDemoStep('locked');
    
    // Simulate processing
    setTimeout(() => {
      setDemoStep('result');
      setDemoWon(side === 'yes'); // Simulate YES winning
    }, 2000);
  };

  const resetDemo = () => {
    setDemoStep('select');
    setSelectedSide(null);
    setDemoWon(false);
  };

  const currentStepData = steps[currentStep];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] border-cyan-400/20 text-white max-w-6xl max-h-[95vh] overflow-y-auto p-0 [&>button]:z-50 [&>button]:bg-cyan-500/20 [&>button]:hover:bg-cyan-500/30 [&>button]:text-cyan-300 [&>button]:hover:text-cyan-100 [&>button]:rounded-full [&>button]:w-10 [&>button]:h-10 [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:border [&>button]:border-cyan-400/30"
      >
        <div className="relative pb-4">
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>
          
          {/* Header */}
          <DialogHeader className="relative z-10 p-8 pb-6">
            <div>
              <DialogTitle className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                How to Play WagerVS
              </DialogTitle>
              <p className="text-cyan-300/80 text-lg">Compete against AI and players in skill-based prediction pools</p>
            </div>
            
            {/* Progress bar */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-cyan-300/80 font-medium">Step {currentStep + 1} of {steps.length}</span>
                <span className="text-cyan-300/80 font-medium">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="w-full bg-cyan-500/10 rounded-full h-3 border border-cyan-400/20">
                <motion.div
                  className="h-3 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full shadow-lg shadow-cyan-500/25"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="relative z-10 px-8 pb-8">
            {/* Floating Navigation Arrows */}
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 transition-all hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
            )}
            {currentStep < steps.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/25 transition-all hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            )}
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="min-h-[400px]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Left side - Step info */}
                  <div className="space-y-6">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="flex items-center gap-4"
                    >
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${currentStepData.color} flex items-center justify-center shadow-lg`}>
                        <currentStepData.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                          {currentStepData.title}
                        </h3>
                        <p className="text-cyan-300/80 text-lg">{currentStepData.description}</p>
                      </div>
                    </motion.div>

                    <div className="space-y-3">
                      {currentStepData.details.map((detail, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 mt-2 flex-shrink-0"></div>
                          <span className="text-white/80">{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Right side - Visual example */}
                  <div className="relative">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                      className={`p-6 rounded-3xl bg-gradient-to-br ${currentStepData.bgColor} border border-cyan-400/20 backdrop-blur-sm`}
                    >
                      {currentStep === 0 && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-cyan-300 font-medium">{currentStepData.example.type}</span>
                            <div className="flex items-center gap-1 text-yellow-400">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">{currentStepData.example.timeLeft}</span>
                            </div>
                          </div>
                          <h4 className="text-xl font-bold text-white">{currentStepData.example.title}</h4>
                          <p className="text-white/80">{currentStepData.example.question}</p>
                          <div className="flex gap-3">
                            <div className="flex-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-xl p-3">
                              <div className="text-green-400 font-medium">{currentStepData.example.side1}</div>
                              <div className="text-white/60 text-sm">{currentStepData.example.side1Amount}K $VS</div>
                            </div>
                            <div className="flex-1 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30 rounded-xl p-3">
                              <div className="text-red-400 font-medium">{currentStepData.example.side2}</div>
                              <div className="text-white/60 text-sm">{currentStepData.example.side2Amount}K $VS</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm text-white/60">
                            <span>{currentStepData.example.participants} players</span>
                            <span>2.0K $VS total</span>
                          </div>
                        </div>
                      )}

                      {currentStep === 1 && (
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-cyan-300 font-medium mb-2">Your Stake</div>
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <Image
                                src="/icon/coin.svg"
                                alt="VS Chips"
                                width={48}
                                height={48}
                                className="drop-shadow-lg"
                              />
                              <div className="text-3xl font-bold text-white">{currentStepData.example.yourStake}</div>
                            </div>
                            <div className="text-white/60">on {currentStepData.example.side}</div>
                          </div>
                          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl p-4 border border-cyan-400/20">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-white/80">Potential Win</span>
                              <div className="flex items-center gap-1">
                                <Image
                                  src="/icon/coin.svg"
                                  alt="VS Chips"
                                  width={20}
                                  height={20}
                                />
                                <span className="text-green-400 font-bold">{currentStepData.example.potentialWin}</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-white/80">Multiplier</span>
                              <span className="text-yellow-400 font-bold">{currentStepData.example.multiplier}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentStep === 2 && (
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-red-400 font-bold text-lg mb-2">{currentStepData.example.status}</div>
                            <div className="text-white/60">Waiting for {currentStepData.example.waitingFor}</div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-white/80">Total Pool</span>
                              <span className="text-white font-bold">{currentStepData.example.totalPool}K $VS</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-green-400">YES Pool</span>
                              <span className="text-green-400 font-bold">{currentStepData.example.side1Pool}K $VS</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-red-400">NO Pool</span>
                              <span className="text-red-400 font-bold">{currentStepData.example.side2Pool}K $VS</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentStep === 3 && (
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-green-400 font-bold text-lg mb-2">🎉 You Won!</div>
                            <div className="text-white/60">Great prediction!</div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-white/80">Your Stake</span>
                              <span className="text-white font-bold">{currentStepData.example.yourStake} $VS</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-green-400">Winnings</span>
                              <span className="text-green-400 font-bold">+{currentStepData.example.winnings} $VS</span>
                            </div>
                            <div className="border-t border-white/10 pt-3">
                              <div className="flex justify-between">
                                <span className="text-white font-bold">Total Return</span>
                                <span className="text-white font-bold">{currentStepData.example.totalReturn} $VS</span>
                              </div>
                            </div>
                            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-3 border border-yellow-400/20">
                              <div className="flex justify-between">
                                <span className="text-yellow-400">Points Earned</span>
                                <span className="text-yellow-400 font-bold">+{currentStepData.example.pointsEarned}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* Demo Wager at the end */}
                {currentStep === steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 p-8 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-400/20 rounded-3xl backdrop-blur-sm"
                  >
                    <h4 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      Try a Live Demo
                    </h4>
                    
                    {demoStep === 'select' && (
                      <div className="space-y-6">
                        <div className="text-center">
                          <h5 className="text-xl font-bold mb-2 text-white">{demoWager.title}</h5>
                          <div className="flex items-center justify-center gap-6 text-cyan-300/80 mb-6">
                            <div className="flex items-center gap-2">
                              <Clock className="w-5 h-5" />
                              {demoWager.timeLeft}
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-5 h-5" />
                              1,247 players
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-4 max-w-md mx-auto">
                          <Button
                            onClick={() => handleDemoWager('yes')}
                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 rounded-2xl text-lg shadow-lg shadow-green-500/25"
                          >
                            YES ({demoWager.side1Amount}K $VS)
                          </Button>
                          <Button
                            onClick={() => handleDemoWager('no')}
                            className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-4 rounded-2xl text-lg shadow-lg shadow-red-500/25"
                          >
                            NO ({demoWager.side2Amount}K $VS)
                          </Button>
                        </div>
                      </div>
                    )}

                    {demoStep === 'locked' && (
                      <div className="text-center py-8">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-20 h-20 mx-auto mb-6"
                        >
                          <Zap className="w-20 h-20 text-yellow-400" />
                        </motion.div>
                        <p className="text-xl text-white/90 mb-2">Processing your wager...</p>
                        <p className="text-cyan-300/80">Waiting for Bitcoin price result...</p>
                      </div>
                    )}

                    {demoStep === 'result' && (
                      <div className="text-center py-8">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="w-20 h-20 mx-auto mb-6"
                        >
                          {demoWon ? (
                            <Trophy className="w-20 h-20 text-yellow-400" />
                          ) : (
                            <X className="w-20 h-20 text-red-400" />
                          )}
                        </motion.div>
                        
                        <h5 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                          {demoWon ? "🎉 Congratulations! You Won!" : "Better luck next time!"}
                        </h5>
                        
                        <p className="text-white/80 mb-6 text-lg">
                          {demoWon 
                            ? `You earned ${Math.round((selectedSide === 'yes' ? demoWager.side1Amount : demoWager.side2Amount) * 0.67)} bonus chips!`
                            : "The other side won this time."
                          }
                        </p>
                        
                        <Button
                          onClick={resetDemo}
                          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold px-8 py-3 rounded-2xl text-lg shadow-lg shadow-cyan-500/25"
                        >
                          Try Again
                        </Button>
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-12">
              <Button
                onClick={handlePrev}
                disabled={currentStep === 0}
                variant="outline"
                className="border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 disabled:opacity-50 font-medium px-6 py-3 rounded-xl"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </Button>

              {/* Progress dots */}
              <div className="flex gap-3">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentStep
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 scale-125 shadow-lg shadow-cyan-500/25'
                        : index < currentStep
                        ? 'bg-cyan-400/60'
                        : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>

              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={() => onOpenChange(false)}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-cyan-500/25"
                >
                  Start Playing! 🚀
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-cyan-500/25"
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
