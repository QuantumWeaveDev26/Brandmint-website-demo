import React from 'react';
import { MessageSquare, ArrowUpRight, Zap } from 'lucide-react';

interface CyberNavbarProps {
  onOpenBooking: () => void;
}

export const CyberNavbar: React.FC<CyberNavbarProps> = ({ onOpenBooking }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-cyber rounded-full px-5 py-3 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
        {/* Brand */}
        <a href="#top" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00f5d4] to-[#6366f1] p-[1.5px] shadow-[0_0_20px_rgba(0,245,212,0.4)] group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center font-black text-[#00f5d4] text-xs font-mono">
              BM
            </div>
          </div>
          <div>
            <span className="font-extrabold tracking-tight text-white font-['Space_Grotesk'] text-base sm:text-lg">
              BrandMint<span className="text-[#00f5d4]">AI</span>
            </span>
          </div>
        </a>

        {/* Anchors */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-mono tracking-wider text-slate-300">
          <a href="#workflow-builder" className="hover:text-[#00f5d4] transition-colors flex items-center gap-1.5">
            <span className="text-[#00f5d4]">01.</span> Workflow Graph
          </a>
          <a href="#transformation-slider" className="hover:text-[#00f5d4] transition-colors flex items-center gap-1.5">
            <span className="text-[#00f5d4]">02.</span> Before / After
          </a>
          <a href="#services" className="hover:text-[#00f5d4] transition-colors flex items-center gap-1.5">
            <span className="text-[#00f5d4]">03.</span> 3D AI Engines
          </a>
          <a href="#calculator" className="hover:text-[#00f5d4] transition-colors flex items-center gap-1.5">
            <span className="text-[#00f5d4]">04.</span> ROI Velocity
          </a>
        </nav>

        {/* Quick CTA */}
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/919972965677?text=Hi%20BrandMint%20AI%20team,%20I%20want%20to%20automate%20my%20business%20workflows"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-mono transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#00f5d4]" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#00f5d4] to-[#6366f1] text-[#030712] font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,245,212,0.4)] hover:scale-105 active:scale-95 transition-all"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Deploy Stack</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
