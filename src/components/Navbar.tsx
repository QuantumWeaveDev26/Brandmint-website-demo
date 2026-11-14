import React from 'react';
import { Sparkles, MessageCircle, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel rounded-full px-5 py-3 border border-white/10 backdrop-blur-xl">
        {/* Brand identity */}
        <a href="#top" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#67efd0] via-[#123d35] to-[#07121a] p-[1.5px] shadow-[0_0_20px_rgba(103,239,208,0.25)] group-hover:shadow-[0_0_30px_rgba(103,239,208,0.5)] transition-all">
            <div className="w-full h-full bg-[#07121a] rounded-[10px] flex items-center justify-center font-black tracking-tighter text-[#67efd0] text-sm">
              BM
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-white font-['Space_Grotesk'] text-base md:text-lg">
                BrandMint<span className="text-[#67efd0]">AI</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#67efd0]/10 border border-[#67efd0]/30 text-[10px] font-mono text-[#67efd0]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#67efd0] animate-ping" />
                SYSTEMS LIVE
              </span>
            </div>
          </div>
        </a>

        {/* Navigation anchors */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium tracking-wide text-slate-300">
          <a href="#simulator" className="hover:text-[#67efd0] transition-colors flex items-center gap-1.5">
            <span className="text-[#67efd0]/60 font-mono text-[10px]">01</span> WhatsApp Simulator
          </a>
          <a href="#quantum-weave" className="hover:text-[#67efd0] transition-colors flex items-center gap-1.5">
            <span className="text-[#67efd0]/60 font-mono text-[10px]">02</span> Quantum Weave™
          </a>
          <a href="#solutions" className="hover:text-[#67efd0] transition-colors flex items-center gap-1.5">
            <span className="text-[#67efd0]/60 font-mono text-[10px]">03</span> AI Workforce
          </a>
          <a href="#calculator" className="hover:text-[#67efd0] transition-colors flex items-center gap-1.5">
            <span className="text-[#67efd0]/60 font-mono text-[10px]">04</span> ROI Engine
          </a>
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/919972965677?text=Hi%20BrandMint%20AI%20team,%20I%20would%20like%20to%20explore%20AI%20automation%20for%20my%20business."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#123d35]/60 hover:bg-[#164b44] border border-[#67efd0]/30 text-white text-xs font-medium transition-all hover:shadow-[0_0_20px_rgba(103,239,208,0.2)]"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#67efd0]" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#67efd0] to-[#34d399] hover:from-[#a2ffe7] hover:to-[#67efd0] text-[#07121a] text-xs font-bold transition-all shadow-[0_0_20px_rgba(103,239,208,0.4)] hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Book Discovery</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
