import React from 'react';
import { MapPin, Phone, MessageSquare, ArrowUpRight, ArrowUp } from 'lucide-react';

export const CyberFooter: React.FC = () => {
  return (
    <footer className="relative pt-20 pb-12 px-4 border-t border-white/10 bg-[#02050b] z-10 font-['Plus_Jakarta_Sans']">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/5">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00f5d4] to-[#6366f1] p-[1.5px]">
                <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center font-black text-[#00f5d4] text-xs">
                  BM
                </div>
              </div>
              <span className="font-extrabold tracking-tight text-white font-['Space_Grotesk'] text-xl">
                BrandMint<span className="text-[#00f5d4]">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Brandmint AI Private Limited. Systems-first artificial intelligence solutions, autonomous workflow architectures, and venture engineering in Bengaluru, India.
            </p>
            <div className="flex items-start gap-2 text-xs text-slate-400 font-mono">
              <MapPin className="w-4 h-4 text-[#00f5d4] shrink-0 mt-0.5" />
              <span>
                No. 3, Lingappa Layout, 1st Cross,<br />
                Sri Sri Sri Shivakumara Swamiji Road,<br />
                Bengaluru – 560090, Karnataka, India
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Phone className="w-4 h-4 text-[#00f5d4] shrink-0" />
              <a href="https://wa.me/919972965677" className="hover:text-[#00f5d4] transition-colors">
                +91 99729 65677 (WhatsApp Verified)
              </a>
            </div>
          </div>

          {/* Core Stacks */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              Core Stacks
            </h5>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#services" className="hover:text-[#00f5d4] transition-colors">Autonomous Agents</a></li>
              <li><a href="#workflow-builder" className="hover:text-[#00f5d4] transition-colors">WhatsApp Engine</a></li>
              <li><a href="#services" className="hover:text-[#00f5d4] transition-colors">Quantum Weave™</a></li>
              <li><a href="#services" className="hover:text-[#00f5d4] transition-colors">Cashflow Copy™</a></li>
              <li><a href="#calculator" className="hover:text-[#00f5d4] transition-colors">ROI Calculator</a></li>
            </ul>
          </div>

          {/* Ventures & Academy */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              Ventures & Academy
            </h5>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="https://quantumweaveai.io/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00f5d4] flex items-center gap-1 transition-colors">
                  Quantum Weave™ <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://cashflowcopy.in/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00f5d4] flex items-center gap-1 transition-colors">
                  Cashflow Copy™ <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="http://brandmintai.io/fullai" target="_blank" rel="noopener noreferrer" className="hover:text-[#00f5d4] flex items-center gap-1 transition-colors">
                  AI Full-Stack Developer <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="http://brandmintai.io/igr.academy" target="_blank" rel="noopener noreferrer" className="hover:text-[#00f5d4] flex items-center gap-1 transition-colors">
                  IGR Academy & Appu AI <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Founder & Connect */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              Founder & Director
            </h5>
            <div className="text-sm font-bold text-white">
              KAARANJI SHREEDHAR
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Systems Architect
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/919972965677"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00f5d4]/10 border border-[#00f5d4]/30 text-[#00f5d4] text-xs font-mono hover:bg-[#00f5d4] hover:text-[#030712] transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Direct WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
          <div>
            © {new Date().getFullYear()} Brandmint AI Private Limited. All rights reserved.
          </div>
          <a
            href="#top"
            className="flex items-center gap-1 text-[#00f5d4] hover:underline"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
