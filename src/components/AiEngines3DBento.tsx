import React from 'react';
import { TiltCard } from './TiltCard';
import { Bot, MessageSquare, Layers, TrendingUp, Cpu, ArrowUpRight } from 'lucide-react';

export const AiEngines3DBento: React.FC = () => {
  return (
    <section id="services" className="relative py-28 px-4 max-w-7xl mx-auto z-10">
      {/* Background glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#00f5d4]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00f5d4]/10 border border-[#00f5d4]/30 text-xs font-mono text-[#00f5d4] mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>3D GYROSCOPIC ARCHITECTURE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-['Space_Grotesk'] text-white tracking-tight uppercase mb-3">
          Core AI Automation <span className="bg-gradient-to-r from-[#00f5d4] via-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">Engines</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
          Hover over the cards to experience 3D perspective tilt transformations and dynamic specular lighting.
        </p>
      </div>

      {/* 3D Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 perspective-1000">
        {/* Card 1: Autonomous AI Workforce (7 cols) */}
        <div className="md:col-span-7">
          <TiltCard glowColor="rgba(0, 245, 212, 0.25)" className="p-8 border border-white/10 hover:border-[#00f5d4]/50">
            <div className="flex items-center justify-between mb-4">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f5d4]/15 border border-[#00f5d4]/30 text-[#00f5d4] text-xs font-mono font-bold">
                <Bot className="w-3.5 h-3.5" />
                AUTONOMOUS AGENT FLEET
              </span>
              <span className="text-xs font-mono text-slate-400">24/7 EXECUTION</span>
            </div>

            <h3 className="text-2xl font-black text-white font-['Space_Grotesk'] mb-2">
              Autonomous AI Workforce
            </h3>
            <p className="text-slate-300 text-sm mb-6 max-w-lg leading-relaxed">
              Custom-trained autonomous agents that execute multi-step SOPs, manage customer databases, and handle full-stack code tasks without human fatigue.
            </p>

            {/* Visual Agent Terminal Box */}
            <div className="bg-[#030712] rounded-xl p-4 font-mono text-xs text-slate-300 border border-white/10 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500/70" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
                  <span className="w-2 h-2 rounded-full bg-green-500/70" />
                  <span className="ml-2 text-slate-400">agent_runtime_v4.py</span>
                </div>
                <span className="text-[#00f5d4]">TASK #8841 EXECUTED</span>
              </div>
              <p className="text-slate-400">$ brandmint-agent --dispatch-triage</p>
              <p className="text-[#00f5d4]">✔ 42 inbound leads parsed & scored in 1.4s</p>
              <p className="text-[#a5b4fc]">✔ Direct calendar confirmation sent via WhatsApp</p>
              <p className="text-slate-500">→ Telemetry synced to Hubspot & Slack channels</p>
            </div>

            <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10 text-xs">
              <span className="text-slate-400 font-mono">Reliability: 99.9% Uptime</span>
              <a
                href="https://wa.me/919972965677?text=Tell%20me%20about%20the%20AI%20Workforce"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#00f5d4] font-bold hover:underline"
              >
                Deploy Fleet <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </TiltCard>
        </div>

        {/* Card 2: WhatsApp Automation Engine (5 cols) */}
        <div className="md:col-span-5">
          <TiltCard glowColor="rgba(99, 102, 241, 0.25)" className="p-8 border border-white/10 hover:border-[#6366f1]/50 bg-gradient-to-b from-[#0e1633]/60 to-[#030712]">
            <div className="flex items-center justify-between mb-4">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#6366f1]/20 border border-[#6366f1]/40 text-[#a5b4fc] text-xs font-mono font-bold">
                <MessageSquare className="w-3.5 h-3.5" />
                CONVERSATIONAL CRM
              </span>
              <span className="text-xs font-mono text-[#00f5d4]">2.8s LATENCY</span>
            </div>

            <h3 className="text-2xl font-black text-white font-['Space_Grotesk'] mb-2">
              WhatsApp Business Engine
            </h3>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              Instant conversational qualification, abandoned cart recovery, and 24/7 client booking directly on WhatsApp with Meta Cloud API.
            </p>

            {/* Spec Matrix */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-4">
              <div className="bg-[#030712] p-2.5 rounded-lg border border-white/5">
                <span className="block text-slate-500 text-[10px]">RESPONSE TIME</span>
                <span className="text-[#00f5d4] font-bold">&lt; 3.0 Seconds</span>
              </div>
              <div className="bg-[#030712] p-2.5 rounded-lg border border-white/5">
                <span className="block text-slate-500 text-[10px]">INTEGRATION</span>
                <span className="text-white font-bold">Hubspot / Zoho</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/10 text-xs">
              <span className="text-slate-400 font-mono">Protocol: Meta Cloud v20</span>
              <a
                href="https://wa.me/919972965677?text=Interested%20in%20WhatsApp%20Automation"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#a5b4fc] font-bold hover:underline"
              >
                Explore Engine <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </TiltCard>
        </div>

        {/* Card 3: Quantum Weave™ Venture (5 cols) */}
        <div className="md:col-span-5">
          <TiltCard glowColor="rgba(168, 85, 247, 0.25)" className="p-8 border border-white/10 hover:border-[#a855f7]/50">
            <div className="flex items-center justify-between mb-4">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#a855f7]/20 border border-[#a855f7]/40 text-[#d8b4fe] text-xs font-mono font-bold">
                <Layers className="w-3.5 h-3.5" />
                INCUBATED VENTURE
              </span>
              <span className="text-xs font-mono text-[#00f5d4]">14 MILLS CONNECTED</span>
            </div>

            <h3 className="text-2xl font-black text-white font-['Space_Grotesk'] mb-2">
              Quantum Weave™ Infrastructure
            </h3>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              AI-powered community commerce & merchandise manufacturing pipeline connecting creators, institutions, and vetted textile facilities.
            </p>

            <div className="bg-[#030712] p-3.5 rounded-xl border border-white/10 font-mono text-xs text-slate-300 space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Vector AI Audit</span>
                <span className="text-[#00f5d4]">300 DPI Auto-Proof</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Algorithmic Quote Engine</span>
                <span className="text-[#a5b4fc]">Real-Time Tier Pricing</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10 text-xs">
              <span className="text-slate-400 font-mono">14,000+ Units Shipped</span>
              <a
                href="https://quantumweaveai.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#d8b4fe] font-bold hover:underline"
              >
                Quantum Weave <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </TiltCard>
        </div>

        {/* Card 4: Cashflow Copy™ & Meta Growth (7 cols) */}
        <div className="md:col-span-7">
          <TiltCard glowColor="rgba(16, 185, 129, 0.25)" className="p-8 border border-white/10 hover:border-[#10b981]/50 bg-gradient-to-br from-[#061e1a]/40 to-[#030712]">
            <div className="flex items-center justify-between mb-4">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#10b981]/20 border border-[#10b981]/40 text-[#6ee7b7] text-xs font-mono font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                ACQUISITION & COPY
              </span>
              <span className="text-xs font-mono text-[#00f5d4]">4.8x CONVERSION</span>
            </div>

            <h3 className="text-2xl font-black text-white font-['Space_Grotesk'] mb-2">
              Cashflow Copy™ & Growth Loops
            </h3>
            <p className="text-slate-300 text-sm mb-6 max-w-lg leading-relaxed">
              High-converting direct response messaging frameworks and Meta acquisition loops designed for maximum return on ad spend without form fatigue.
            </p>

            <div className="bg-[#030712] p-4 rounded-xl border border-white/10">
              <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
                <span>Ad Click &rarr; WhatsApp Conversion Efficiency</span>
                <span className="text-[#00f5d4] font-bold">4.8x Industry Baseline</span>
              </div>
              <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#00f5d4] to-[#6366f1] w-[86%]" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10 text-xs">
              <span className="text-slate-400 font-mono">Zero Form Fatigue</span>
              <a
                href="https://cashflowcopy.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#6ee7b7] font-bold hover:underline"
              >
                Cashflow Copy <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};
