import React from 'react';
import { Bot, Clapperboard, TrendingUp, GraduationCap, Play, ArrowUpRight } from 'lucide-react';

export const SolutionsBento: React.FC = () => {
  return (
    <section id="solutions" className="relative py-28 px-4 max-w-7xl mx-auto z-10">
      {/* Background radial highlight */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#67efd0]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#67efd0]/30 text-xs font-mono text-[#67efd0] mb-3">
          <Bot className="w-3.5 h-3.5" />
          <span>AUTONOMOUS WORKFORCE & PRODUCTION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-['Space_Grotesk'] tracking-tight text-white uppercase mb-3">
          Specialized <span className="gradient-text-mint">AI Engines</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
          From self-operating code agents to cinematic AI-generated film reels, engineered for high-leverage business scaling.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Card 1: Autonomous AI Workforce (Wide Card - 7 cols) */}
        <div className="md:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-[#67efd0]/40 transition-all flex flex-col justify-between group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#67efd0]/5 rounded-full blur-3xl" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#123d35] border border-[#67efd0]/30 text-[#67efd0] text-xs font-mono">
                <Bot className="w-3.5 h-3.5" />
                AI AGENT FLEET
              </span>
              <span className="text-xs font-mono text-slate-500">24/7 AUTONOMOUS</span>
            </div>

            <h3 className="text-2xl font-extrabold text-white font-['Space_Grotesk'] mb-2">
              Autonomous AI Workforce
            </h3>
            <p className="text-slate-400 text-sm mb-6 max-w-lg">
              Custom-trained AI agents that execute complex multi-step SOPs, manage customer databases, and handle full-stack code tasks without human fatigue.
            </p>

            {/* Visual Terminal Execution Box */}
            <div className="bg-[#050a0d] rounded-xl p-4 font-mono text-xs text-slate-300 border border-white/5 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-white/5 text-[10px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500/70" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
                  <span className="w-2 h-2 rounded-full bg-green-500/70" />
                  <span className="ml-2 text-slate-400">brandmint-agent-runtime.sh</span>
                </div>
                <span className="text-[#67efd0]">TASK #4092 COMPLETED</span>
              </div>
              <p className="text-slate-400">$ brandmint-agent dispatch --scope="Lead Triaging & Data Sync"</p>
              <p className="text-[#67efd0]">✔ 128 new WhatsApp conversations analyzed in 3.4s</p>
              <p className="text-[#a2ffe7]">✔ 14 qualified opportunities mapped & calendar slots confirmed</p>
              <p className="text-slate-500">→ Telemetry logged to Hubspot & Enterprise Slack</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 mt-4 border-t border-white/5 text-xs">
            <span className="text-slate-400 font-mono">SOP Conversion: 100%</span>
            <a
              href="https://wa.me/919972965677?text=Tell%20me%20more%20about%20the%20AI%20Workforce"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#67efd0] font-bold hover:underline"
            >
              Deploy Fleet <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Card 2: AI-Powered Films & Media (5 cols) */}
        <div className="md:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-[#67efd0]/40 transition-all flex flex-col justify-between group relative overflow-hidden bg-gradient-to-b from-[#0b1c22]/70 to-[#07121a]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#4328c7]/20 border border-[#4328c7]/50 text-[#a78bfa] text-xs font-mono">
                <Clapperboard className="w-3.5 h-3.5" />
                SYNTHETIC MEDIA
              </span>
              <span className="flex items-center gap-1 text-[11px] font-mono text-red-400">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                REC 4K
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-white font-['Space_Grotesk'] mb-2">
              AI-Powered Films
            </h3>
            <p className="text-slate-400 text-sm mb-5">
              Cinematic visual storytelling, virtual production, and hyper-realistic synthetic media that turn brand concepts into high-impact visual films.
            </p>

            {/* Simulated Cinematic Viewport */}
            <div className="relative rounded-xl overflow-hidden aspect-video bg-[#04080b] border border-white/10 flex items-center justify-center group-hover:border-[#67efd0]/40 transition-all">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#67efd0]/10 via-[#4328c7]/20 to-transparent" />
              {/* Aspect Ratio Guide Lines */}
              <div className="absolute top-2 left-2 text-[9px] font-mono text-white/40">2.39:1 CINEMASCOPE</div>
              <div className="absolute bottom-2 right-2 text-[9px] font-mono text-[#67efd0]">AI RENDER 60 FPS</div>

              <div className="w-12 h-12 rounded-full bg-[#67efd0] text-[#07121a] flex items-center justify-center shadow-[0_0_25px_#67efd0] cursor-pointer group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 mt-4 border-t border-white/5 text-xs">
            <span className="text-slate-400 font-mono">Output: Cinema-Grade</span>
            <a
              href="https://wa.me/919972965677?text=I%20am%20interested%20in%20AI%20film%20production"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#67efd0] font-bold hover:underline"
            >
              Explore Studio <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Card 3: Cashflow Copy & Meta Growth System (5 cols) */}
        <div className="md:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-[#67efd0]/40 transition-all flex flex-col justify-between group relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#123d35] border border-[#67efd0]/30 text-[#67efd0] text-xs font-mono">
                <TrendingUp className="w-3.5 h-3.5" />
                ACQUISITION ENGINE
              </span>
              <span className="text-xs font-mono text-slate-500">META & FUNNELS</span>
            </div>

            <h3 className="text-2xl font-extrabold text-white font-['Space_Grotesk'] mb-2">
              Cashflow Copy™ & Growth
            </h3>
            <p className="text-slate-400 text-sm mb-5">
              High-converting direct response messaging frameworks and Meta acquisition loops designed for maximum return on ad spend.
            </p>

            {/* Visual Conversion Rate Metric */}
            <div className="bg-[#050a0d] p-4 rounded-xl border border-white/5">
              <div className="flex items-center justify-between mb-2 text-xs font-mono">
                <span className="text-slate-400">Ad Click to WhatsApp Conversion</span>
                <span className="text-[#67efd0] font-bold">4.8x Industry Avg</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#123d35] via-[#34d399] to-[#67efd0] w-[88%]" />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2">
                <span>Direct Lead Capture</span>
                <span className="text-white">Zero Form Fatigue</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 mt-4 border-t border-white/5 text-xs">
            <span className="text-slate-400 font-mono">ROAS Focus: High Leverage</span>
            <a
              href="https://cashflowcopy.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#67efd0] font-bold hover:underline"
            >
              Cashflow Copy <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Card 4: BrandMint Academy (7 cols) */}
        <div className="md:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-[#67efd0]/40 transition-all flex flex-col justify-between group relative overflow-hidden bg-gradient-to-br from-[#07121a] via-[#123d35]/30 to-[#07121a]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#67efd0]/10 border border-[#67efd0]/30 text-[#67efd0] text-xs font-mono">
                <GraduationCap className="w-3.5 h-3.5" />
                FOUNDER & OPERATOR INTENSIVES
              </span>
              <span className="text-xs font-mono text-[#a2ffe7]">IGR ACADEMY & APPU AI</span>
            </div>

            <h3 className="text-2xl font-extrabold text-white font-['Space_Grotesk'] mb-2">
              5-Day Operator Transformation
            </h3>
            <p className="text-slate-400 text-sm mb-5 max-w-xl">
              An applied sprint moving founders and teams from AI curiosity to real-world deployment: business foundations, prompt engineering, WhatsApp setups, and autonomous systems.
            </p>

            {/* Stage Progression Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-mono">
              {[
                { day: 'Day 01', label: 'Systems Clarity' },
                { day: 'Day 02', label: 'Direct Response' },
                { day: 'Day 03', label: 'WhatsApp Automation' },
                { day: 'Day 04', label: 'Agent Workflows' },
                { day: 'Day 05', label: 'Full Deployment' },
              ].map((step, sidx) => (
                <div
                  key={sidx}
                  className="bg-[#050a0d] p-2.5 rounded-xl border border-white/5 hover:border-[#67efd0]/30 transition-colors"
                >
                  <span className="block text-[10px] text-[#67efd0] font-bold">{step.day}</span>
                  <span className="text-[11px] text-slate-300 font-sans mt-0.5 block">{step.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 mt-4 border-t border-white/5 text-xs">
            <span className="text-slate-400 font-mono">Taught by Kaaranji & Practitioners</span>
            <a
              href="https://wa.me/919972965677?text=I%20want%20to%20enroll%20in%20BrandMint%20Academy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#67efd0] font-bold hover:underline"
            >
              Apply for Next Cohort <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
