import React from 'react';
import { ArrowUp, MessageCircle, Cookie, Mail, MapPin } from 'lucide-react';
import brandmintLogo from '../assets/brandmint-logo.webp';
import type { RoutePath } from './MonoNavbar';

interface MonoFooterProps {
  onOpenPrivacy?: () => void;
  onOpenCookieSettings?: () => void;
  onNavigate?: (path: RoutePath) => void;
}

export const MonoFooter: React.FC<MonoFooterProps> = ({ onOpenPrivacy, onOpenCookieSettings }) => {
  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 0.9 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const linkCls = 'inline-flex items-center gap-2 text-[#CCC7F2]/85 hover:text-white transition-colors';

  return (
    <footer
      id="ecosystem"
      className="relative bg-[#0A0224] text-[#CCC7F2] border-t border-[#7265C2]/25 z-10 text-sm select-none"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Compact 2-Column Footer: Company Info + Contact Info Only */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 py-6">
          {/* Company Info */}
          <div className="space-y-2 text-left max-w-md">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white p-0.5 overflow-hidden ring-2 ring-[#7265C2]/50 shrink-0">
                <img src={brandmintLogo} alt="BrandMint AI logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-display text-base font-bold tracking-tight text-white block leading-tight">
                  BrandMint <span className="text-[#7265C2]">AI</span>
                </span>
                <span className="text-[11px] text-[#CCC7F2]/70 font-medium block leading-tight">
                  BrandMint AI Pvt. Ltd.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-2 text-[#CCC7F2]/75 text-xs leading-relaxed pt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#7265C2] shrink-0 mt-0.5" />
              <span>
                No. 3, Lingappa Layout, 1st Cross, Sri Sri Sri Shivakumara Swamiji Road,{' '}
                <span className="text-white font-medium">Bengaluru 560090, India</span>
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 text-left sm:min-w-[210px]">
            <h5 className="text-[11px] font-semibold text-white uppercase tracking-[0.14em]">Contact</h5>
            <div className="flex flex-col space-y-1.5 text-xs sm:text-[13px]">
              <a href="mailto:connect@brandmintai.io" className={linkCls}>
                <Mail className="w-3.5 h-3.5 text-[#7265C2] shrink-0" />
                <span>connect@brandmintai.io</span>
              </a>
              <a href="https://wa.me/919972965677" target="_blank" rel="noopener noreferrer" className={linkCls}>
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <span>+91 99729 65677</span>
              </a>
            </div>
          </div>
        </div>

        {/* Tight Single-Row Bottom Bar (Zero Excess Gap) */}
        <div className="border-t border-[#7265C2]/20 py-3 pr-14 sm:pr-16 lg:pr-0 flex flex-wrap items-center justify-between gap-2 text-xs text-[#CCC7F2]/65">
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1">
            <span>© {new Date().getFullYear()} BrandMint AI Pvt. Ltd.</span>
            <button type="button" onClick={onOpenPrivacy} className="underline hover:text-white cursor-pointer">
              Privacy
            </button>
            {onOpenCookieSettings && (
              <button
                type="button"
                onClick={onOpenCookieSettings}
                className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
              >
                <Cookie className="w-3 h-3" />
                <span>Cookies</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
