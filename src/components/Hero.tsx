import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Play, ArrowDown, Bot, Cpu, Network } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center pt-24 pb-12 px-4 overflow-hidden z-10">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-[#67efd0]/10 via-[#4328c7]/15 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Top Location & Systems Badge Stamp */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-[#67efd0]/30 text-xs font-mono text-[#a2ffe7] mb-8 shadow-[0_0_25px_rgba(103,239,208,0.15)]"
      >
        <span className="w-2 h-2 rounded-full bg-[#67efd0] animate-ping" />
        <span className="tracking-widest uppercase text-[11px] font-semibold">
          BrandMint AI Pvt. Ltd. • Bengaluru, IN
        </span>
        <span className="text-white/20">|</span>
        <span className="text-white/60 font-sans text-[11px]">Systems-First Architecture</span>
      </motion.div>

      {/* Giant Visual Headline */}
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-['Space_Grotesk'] tracking-tight leading-[0.98] uppercase text-white mb-6"
        >
          <span className="block text-white/90">Autonomous</span>
          <span className="block gradient-text-mint mint-glow-text">
            AI Systems.
          </span>
          <span className="block text-white/95">Zero Friction.</span>
        </motion.h1>

        {/* Minimal Sub-Headline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed mb-10"
        >
          We replace manual business bottlenecks with <span className="text-[#a2ffe7] font-medium">autonomous AI agents</span>, <span className="text-[#a2ffe7] font-medium">WhatsApp growth systems</span>, and high-velocity venture infrastructure.
        </motion.p>

        {/* Interactive Action Hub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <a
            href="#simulator"
            className="group flex items-center gap-3 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#67efd0] via-[#34d399] to-[#67efd0] text-[#07121a] font-bold text-sm shadow-[0_0_35px_rgba(103,239,208,0.4)] hover:shadow-[0_0_50px_rgba(103,239,208,0.6)] hover:scale-105 active:scale-95 transition-all"
          >
            <Play className="w-4 h-4 fill-current group-hover:rotate-12 transition-transform" />
            <span>Launch Interactive Simulator</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-full glass-panel border border-[#67efd0]/30 hover:border-[#67efd0] text-white hover:text-[#a2ffe7] font-medium text-sm transition-all hover:bg-[#67efd0]/10"
          >
            <Zap className="w-4 h-4 text-[#67efd0]" />
            <span>Book Discovery Scan</span>
          </button>
        </motion.div>

        {/* Floating Telemetry Stats Grid (Visual Proof) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto"
        >
          <div className="glass-panel p-4 rounded-2xl text-left border border-white/5 hover:border-[#67efd0]/30 transition-colors group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400">FLEET ACTIVE</span>
              <Bot className="w-4 h-4 text-[#67efd0] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk']">
              5<span className="text-[#67efd0]">+</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Venture products deployed</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl text-left border border-white/5 hover:border-[#67efd0]/30 transition-colors group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400">UPTIME</span>
              <Cpu className="w-4 h-4 text-[#67efd0] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk']">
              99.9<span className="text-[#67efd0]">%</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Autonomous process reliability</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl text-left border border-white/5 hover:border-[#67efd0]/30 transition-colors group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400">VELOCITY</span>
              <Zap className="w-4 h-4 text-[#67efd0] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk']">
              10<span className="text-[#67efd0]">x</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Brand scaling speedup</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl text-left border border-white/5 hover:border-[#67efd0]/30 transition-colors group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400">EXECUTION</span>
              <Network className="w-4 h-4 text-[#67efd0] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk']">
              100<span className="text-[#67efd0]">%</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Systems-first methodology</p>
          </div>
        </motion.div>
      </div>

      {/* Subtle Scroll Cue */}
      <a
        href="#simulator"
        className="mt-12 flex flex-col items-center gap-1.5 text-slate-400 hover:text-[#67efd0] transition-colors text-xs font-mono"
      >
        <span className="text-[10px] uppercase tracking-widest text-slate-400">Interactive Demo Below</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-[#67efd0]" />
      </a>
    </section>
  );
};
