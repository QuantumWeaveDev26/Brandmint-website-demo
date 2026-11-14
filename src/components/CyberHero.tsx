import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Zap, ArrowRight, ArrowDown, Activity, ShieldCheck, Sparkles } from 'lucide-react';

interface CyberHeroProps {
  onOpenBooking: () => void;
}

export const CyberHero: React.FC<CyberHeroProps> = ({ onOpenBooking }) => {
  const [scrambledTitle, setScrambledTitle] = useState('AUTONOMOUS AI SYSTEMS');
  const targetWords = ['AUTONOMOUS AI SYSTEMS', 'WHATSAPP GROWTH ENGINES', 'VENTURE INFRASTRUCTURE'];
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let iteration = 0;
    const target = targetWords[wordIdx];

    const interval = setInterval(() => {
      setScrambledTitle(
        target
          .split('')
          .map((_, index) => {
            if (index < iteration) {
              return target[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= target.length) {
        clearInterval(interval);
        setTimeout(() => {
          setWordIdx((prev) => (prev + 1) % targetWords.length);
        }, 3200);
      }

      iteration += 1 / 2;
    }, 30);

    return () => clearInterval(interval);
  }, [wordIdx]);

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-28 pb-16 px-4 z-10 text-center overflow-hidden">
      {/* Background Cyber Grid & Aurora */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#00f5d4]/15 via-[#6366f1]/20 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Top Meta Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-cyber border border-[#00f5d4]/30 text-xs font-mono text-[#00f5d4] mb-8 shadow-[0_0_25px_rgba(0,245,212,0.15)]"
      >
        <span className="w-2 h-2 rounded-full bg-[#00f5d4] animate-ping" />
        <span className="font-semibold tracking-wider uppercase">BRANDMINT AI PVT. LTD. • BENGALURU</span>
        <span className="text-white/20">|</span>
        <span className="text-slate-300">SYSTEMS LIVE (99.9%)</span>
      </motion.div>

      {/* Main Headline with Cyber Decode Effect */}
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-['Space_Grotesk'] tracking-tight uppercase leading-[0.95] text-white mb-6">
          <span className="block text-slate-300 text-3xl sm:text-5xl md:text-6xl mb-2 font-extrabold">
            ENGINEERING
          </span>
          <span className="block bg-gradient-to-r from-[#00f5d4] via-[#6366f1] to-[#a855f7] bg-clip-text text-transparent text-glow-cyan font-mono">
            {scrambledTitle}
          </span>
          <span className="block text-white text-3xl sm:text-5xl md:text-6xl mt-2 font-extrabold">
            ZERO OPERATIONAL FRICTION.
          </span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10">
          We replace fragile manual spreadsheets and slow customer follow-ups with <span className="text-[#00f5d4] font-semibold">autonomous AI agent fleets</span>, <span className="text-[#a5b4fc] font-semibold">conversational WhatsApp engines</span>, and high-velocity venture pipelines.
        </p>

        {/* Action Hub */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href="#workflow-builder"
            className="flex items-center gap-2.5 px-7 py-4 rounded-full bg-gradient-to-r from-[#00f5d4] via-[#6366f1] to-[#00f5d4] bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-[#030712] font-black text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(0,245,212,0.4)] hover:scale-105 active:scale-95"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>Launch Workflow Playground</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2.5 px-6 py-4 rounded-full glass-cyber border border-white/15 hover:border-[#00f5d4] text-white hover:text-[#00f5d4] text-sm font-bold uppercase tracking-wider transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#00f5d4]" />
            <span>Book Architecture Scan</span>
          </button>
        </div>

        {/* Proof Telemetry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          <div className="glass-cyber p-4 rounded-2xl text-left border border-white/5 hover:border-[#00f5d4]/40 transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
              <span>VENTURES</span>
              <Activity className="w-3.5 h-3.5 text-[#00f5d4]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-white">
              5<span className="text-[#00f5d4]">+</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Active Products Scaled</p>
          </div>

          <div className="glass-cyber p-4 rounded-2xl text-left border border-white/5 hover:border-[#00f5d4]/40 transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
              <span>UPTIME</span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#00f5d4]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-white">
              99.9<span className="text-[#00f5d4]">%</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Process Automation SLA</p>
          </div>

          <div className="glass-cyber p-4 rounded-2xl text-left border border-white/5 hover:border-[#00f5d4]/40 transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
              <span>VELOCITY</span>
              <Zap className="w-3.5 h-3.5 text-[#00f5d4]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-white">
              10<span className="text-[#00f5d4]">x</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Faster Brand Scaling</p>
          </div>

          <div className="glass-cyber p-4 rounded-2xl text-left border border-white/5 hover:border-[#00f5d4]/40 transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
              <span>LATENCY</span>
              <Bot className="w-3.5 h-3.5 text-[#00f5d4]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-white">
              2.8<span className="text-[#00f5d4]">s</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">WhatsApp Inquiry Speed</p>
          </div>
        </div>
      </div>

      <a
        href="#workflow-builder"
        className="mt-14 flex flex-col items-center gap-1.5 text-slate-400 hover:text-[#00f5d4] transition-colors text-xs font-mono"
      >
        <span className="uppercase tracking-widest text-[10px]">Explore Transformations Below</span>
        <ArrowDown className="w-4 h-4 text-[#00f5d4] animate-bounce" />
      </a>
    </section>
  );
};
