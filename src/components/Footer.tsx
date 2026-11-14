import React from 'react';
import { MessageCircle, ArrowUpRight, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative pt-20 pb-12 px-4 border-t border-white/10 bg-[#04090e] z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/5">
          {/* Brand & Address */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#67efd0] text-[#07121a] flex items-center justify-center font-black text-sm">
                BM
              </div>
              <span className="font-extrabold tracking-tight text-white font-['Space_Grotesk'] text-xl">
                BrandMint<span className="text-[#67efd0]">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Brandmint AI Private Limited. Systems-first artificial intelligence solutions, autonomous workflow architectures, and venture engineering in Bangalore, India.
            </p>
            <div className="flex items-start gap-2 text-xs text-slate-400 font-mono">
              <MapPin className="w-4 h-4 text-[#67efd0] shrink-0 mt-0.5" />
              <span>
                No. 3, Lingappa Layout, 1st Cross,<br />
                Sri Sri Sri Shivakumara Swamiji Road,<br />
                Bengaluru – 560090, Karnataka, India
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Phone className="w-4 h-4 text-[#67efd0] shrink-0" />
              <a href="https://wa.me/919972965677" className="hover:text-[#67efd0] transition-colors">
                +91 99729 65677 (WhatsApp Official)
              </a>
            </div>
          </div>

          {/* Quick Pillars */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              Core Systems
            </h5>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#simulator" className="hover:text-[#67efd0] transition-colors">WhatsApp Automation</a></li>
              <li><a href="#solutions" className="hover:text-[#67efd0] transition-colors">Autonomous AI Agents</a></li>
              <li><a href="#quantum-weave" className="hover:text-[#67efd0] transition-colors">Quantum Weave™</a></li>
              <li><a href="#solutions" className="hover:text-[#67efd0] transition-colors">AI-Powered Films</a></li>
              <li><a href="#calculator" className="hover:text-[#67efd0] transition-colors">ROI Calculator</a></li>
            </ul>
          </div>

          {/* Incubated Ventures */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              Ventures & Academy
            </h5>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="https://quantumweaveai.io/" target="_blank" rel="noopener noreferrer" className="hover:text-[#67efd0] flex items-center gap-1 transition-colors">
                  Quantum Weave™ <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://cashflowcopy.in/" target="_blank" rel="noopener noreferrer" className="hover:text-[#67efd0] flex items-center gap-1 transition-colors">
                  Cashflow Copy™ <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="http://brandmintai.io/fullai" target="_blank" rel="noopener noreferrer" className="hover:text-[#67efd0] flex items-center gap-1 transition-colors">
                  AI Full-Stack Developer <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="http://brandmintai.io/igr.academy" target="_blank" rel="noopener noreferrer" className="hover:text-[#67efd0] flex items-center gap-1 transition-colors">
                  IGR Academy & Appu AI <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Socials */}
          <div className="md:col-span-2 space-y-4">
            <h5 className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              Ecosystem
            </h5>
            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/company/brandmint-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#67efd0] hover:text-[#07121a] flex items-center justify-center text-slate-300 transition-colors"
                title="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/team.brandmint/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#67efd0] hover:text-[#07121a] flex items-center justify-center text-slate-300 transition-colors"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@BrandmintAi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#67efd0] hover:text-[#07121a] flex items-center justify-center text-slate-300 transition-colors"
                title="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/919972965677"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#67efd0] hover:text-[#07121a] flex items-center justify-center text-slate-300 transition-colors"
                title="WhatsApp Direct"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
            <div className="inline-block px-3 py-1 rounded-full bg-[#123d35]/50 border border-[#67efd0]/20 text-[10px] font-mono text-[#67efd0]">
              FOUNDER: KAARANJI SHREEDHAR
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
          <div>
            © {new Date().getFullYear()} Brandmint AI Private Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>99.9% Autonomous Uptime</span>
            <span>•</span>
            <span>Bengaluru, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
