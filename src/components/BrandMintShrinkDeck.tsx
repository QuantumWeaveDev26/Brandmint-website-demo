import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface BrandMintService {
  num: string;
  category: string;
  title: string;
  headline: string;
  description: string;
  specs: { label: string; val: string }[];
  colorImage: string;
  imageAlt: string;
  badge: string;
  ctaText: string;
  ctaLink: string;
}

const SERVICES: BrandMintService[] = [
  {
    num: '01',
    category: 'AUTONOMOUS WORKFORCE',
    title: 'Self-Executing AI Agent Fleets',
    headline: 'Multi-step SOP execution with zero human delay.',
    description: 'Custom-trained autonomous code and triage agents that manage databases, resolve inquiries, and execute enterprise SOPs 24/7 without fatigue.',
    specs: [
      { label: 'Uptime', val: '99.9% Continuous' },
      { label: 'Execution', val: '1.4 Seconds' },
      { label: 'Integrations', val: 'Hubspot, Slack, Custom DB' },
    ],
    colorImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Autonomous AI Agent Neural Network',
    badge: 'CORE AGENT // 24/7 SLA',
    ctaText: 'Deploy Agent Fleet',
    ctaLink: 'https://wa.me/919972965677?text=Deploy%20AI%20Agent%20Fleet',
  },
  {
    num: '02',
    category: 'WHATSAPP CONVERSATIONAL CRM',
    title: 'The 2.8-Second Growth Engine',
    headline: 'Conversations close deals. Forms close tabs.',
    description: 'Official Meta Cloud API integration that instantly qualifies high-intent buyers, recovers abandoned carts, and books calendar slots directly on WhatsApp.',
    specs: [
      { label: 'Response SLA', val: '2.8 Seconds' },
      { label: 'Protocol', val: 'Meta Cloud API v20' },
      { label: 'Conversion Lift', val: '4.8x Over Forms' },
    ],
    colorImage: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'WhatsApp Conversational CRM Interface',
    badge: 'META CLOUD // VERIFIED',
    ctaText: 'Deploy WhatsApp Engine',
    ctaLink: 'https://wa.me/919972965677?text=Deploy%20WhatsApp%20Engine',
  },
  {
    num: '03',
    category: 'PHYSICAL VENTURE INFRASTRUCTURE',
    title: 'Quantum Weave™ Pipeline',
    headline: 'AI-driven community commerce & factory orchestration.',
    description: 'Connecting creators, campuses, and brands with 14 pre-vetted textile mills across Tirupur and Bangalore via algorithmic quote and production routing.',
    specs: [
      { label: 'Volume Routed', val: '14,000+ Custom Units' },
      { label: 'Facilities', val: '14 Vetted Mills' },
      { label: 'Turnaround', val: '4 - 7 Business Days' },
    ],
    colorImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Quantum Weave Automated Textile Manufacturing',
    badge: 'TIER-1 MILLS // TIRUPUR & BLR',
    ctaText: 'Explore Quantum Weave',
    ctaLink: 'https://quantumweaveai.io/',
  },
  {
    num: '04',
    category: 'SYNTHETIC MEDIA PRODUCTION',
    title: 'AI-Powered Films & Visual Reels',
    headline: 'Cinemascope visual storytelling for modern brands.',
    description: 'Hollywood-grade synthetic cinema, virtual production, and hyper-realistic visual media delivered in 7 days at a fraction of traditional agency costs.',
    specs: [
      { label: 'Aspect Ratio', val: '2.39:1 Cinemascope' },
      { label: 'Resolution', val: '4K 60 FPS Master' },
      { label: 'Turnaround', val: '7 Calendar Days' },
    ],
    colorImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'AI Synthetic Film Production Camera',
    badge: 'SYNTHETIC CINEMA // 4K 60FPS',
    ctaText: 'Explore Film Studio',
    ctaLink: 'https://wa.me/919972965677?text=Interested%20in%20AI%20Film%20Production',
  },
  {
    num: '05',
    category: 'ACQUISITION ARCHITECTURE',
    title: 'Cashflow Copy™ & Meta Systems',
    headline: 'High-converting messaging loops built for ROAS leverage.',
    description: 'Direct response copywriting frameworks and Meta ad funnels engineered to convert social traffic into qualified WhatsApp pipeline with zero drop-off.',
    specs: [
      { label: 'Ad-to-Lead Lift', val: '4.8x Higher' },
      { label: 'Drop-off Rate', val: 'Reduced by 68%' },
      { label: 'Methodology', val: 'Direct Response' },
    ],
    colorImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Cashflow Copy Growth Analytics Dashboard',
    badge: 'HIGH LEVERAGE // 4.8X CONVERSION',
    ctaText: 'Explore Cashflow Copy',
    ctaLink: 'https://cashflowcopy.in/',
  },
  {
    num: '06',
    category: 'FOUNDER & OPERATOR INTENSIVE',
    title: 'IGR Academy & Appu AI',
    headline: '5-Day applied transformation from theory to deployment.',
    description: 'An intensive hands-on sprint for founders and executive teams to build live production WhatsApp agents, prompt frameworks, and autonomous business workflows.',
    specs: [
      { label: 'Format', val: '5-Day Applied Sprint' },
      { label: 'Mentorship', val: 'Kaaranji Shreedhar & Team' },
      { label: 'Outcome', val: 'Live Production Stack' },
    ],
    colorImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Executive Tech Innovation Lab in Bangalore',
    badge: 'FLAGSHIP INTENSIVE // BENGALURU',
    ctaText: 'Apply For Academy',
    ctaLink: 'https://wa.me/919972965677?text=Apply%20For%20BrandMint%20Academy',
  },
];

interface SingleCardProps {
  service: BrandMintService;
  index: number;
}

const ServiceShrinkCard: React.FC<SingleCardProps> = ({ service, index }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Generous 160vh scroll height so the user visibly sees the card shrink as they scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Aggressive, unmistakable shrink transformation!
  // Scale down from 1.0 -> 0.70 as user scrolls past it
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.85], [1, 1, 0.70]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.85], [1, 1, 0.30]);
  const translateY = useTransform(scrollYProgress, [0, 0.25, 0.85], [0, 0, -50]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.25, 0.85], [24, 24, 48]);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[160vh] flex flex-col items-center"
    >
      <motion.div
        style={{
          scale,
          opacity,
          y: translateY,
          borderRadius,
          top: `${80 + index * 12}px`,
        }}
        className="sticky w-full max-w-6xl bg-[#090909] border-2 border-white/25 p-6 sm:p-12 shadow-[0_35px_120px_rgba(0,0,0,0.98)] overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text / Specs */}
          <div className="lg:col-span-6 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <span className="font-mono text-3xl sm:text-4xl font-black text-white/30">
                {service.num}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-widest px-3 py-1 rounded-full bg-white text-black font-bold">
                {service.category}
              </span>
              <span className="font-mono text-[10px] text-white/50 hidden sm:inline">
                SCROLL TO SHRINK ▾
              </span>
            </div>

            <h3 className="font-['Space_Grotesk'] text-2xl sm:text-4xl font-black uppercase text-white leading-[0.95] tracking-tight">
              {service.title}
            </h3>

            <p className="font-mono text-xs uppercase tracking-wider text-white/80">
              // {service.headline}
            </p>

            <p className="font-['Space_Grotesk'] text-sm text-white/60 leading-relaxed font-light">
              {service.description}
            </p>

            {/* Spec Matrix */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {service.specs.map((sp, sidx) => (
                <div key={sidx} className="bg-[#141414] p-3 rounded-xl border border-white/10 font-mono">
                  <span className="block text-[10px] uppercase text-white/40">{sp.label}</span>
                  <span className="text-xs font-bold text-white mt-0.5 block">{sp.val}</span>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <a
                href={service.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.25)]"
              >
                <span>{service.ctaText}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: Vibrant Colorful Photography with High-Def Color */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border-2 border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)] group">
              <img
                src={service.colorImage}
                alt={service.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Colorful Stat Badge */}
              <div className="absolute top-4 right-4 font-mono text-[10px] font-bold uppercase px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/30 text-white shadow-xl">
                {service.badge}
              </div>

              {/* Bottom Verification Strip */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-xs text-white/90 bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15">
                <span className="flex items-center gap-1.5 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-[#00f5d4] animate-ping" />
                  <span>AUTONOMOUS_PIPELINE.LIVE</span>
                </span>
                <span className="text-[10px] font-bold">100% OPERATIONAL</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const BrandMintShrinkDeck: React.FC = () => {
  return (
    <section id="services-deck" className="relative py-20 px-4 max-w-6xl mx-auto z-10">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/20 bg-white/5 font-mono text-xs uppercase tracking-widest text-white/70 mb-3">
          <span>ALL 6 CORE BRANDMINT AI SERVICES // SCROLL-DRIVEN DECK</span>
        </div>
        <h2 className="font-['Space_Grotesk'] text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-4">
          Services. <span className="text-white/30">Shrink & Reveal.</span>
        </h2>
        <p className="font-mono text-xs uppercase tracking-widest text-white/50 max-w-md mx-auto">
          // Scroll down to watch each page shrink into the background as the next service takes over.
        </p>
      </div>

      <div className="relative">
        {SERVICES.map((service, idx) => (
          <ServiceShrinkCard
            key={service.num}
            service={service}
            index={idx}
          />
        ))}
      </div>
    </section>
  );
};
