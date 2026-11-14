import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface SystemCard {
  num: string;
  category: string;
  title: string;
  headline: string;
  specs: { label: string; val: string }[];
  imageSrc: string;
  imageAlt: string;
  badge: string;
  ctaText: string;
  ctaLink: string;
}

const SYSTEM_CARDS: SystemCard[] = [
  {
    num: '01',
    category: 'AUTONOMOUS WORKFORCE',
    title: 'Self-Executing Agent Fleets',
    headline: 'Multi-step SOP execution with zero human delay.',
    specs: [
      { label: 'Uptime', val: '99.9% Continuous' },
      { label: 'Execution', val: '1.4 Seconds' },
      { label: 'Integrations', val: 'Hubspot, Slack, Custom DB' },
    ],
    imageSrc: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Autonomous Neural Code Agent',
    badge: 'CORE AGENT • 24/7 SLA',
    ctaText: 'Deploy Agent Fleet',
    ctaLink: 'https://wa.me/919972965677?text=Deploy%20AI%20Agent%20Fleet',
  },
  {
    num: '02',
    category: 'WHATSAPP CONVERSATIONAL CRM',
    title: 'The 2.8-Second Engine',
    headline: 'Conversations close deals. Forms close tabs.',
    specs: [
      { label: 'Response SLA', val: '2.8 Seconds' },
      { label: 'Protocol', val: 'Meta Cloud API v20' },
      { label: 'Conversion Lift', val: '4.8x Over Forms' },
    ],
    imageSrc: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'WhatsApp Conversational Server Engine',
    badge: 'META CLOUD • VERIFIED',
    ctaText: 'Deploy WhatsApp Engine',
    ctaLink: 'https://wa.me/919972965677?text=Deploy%20WhatsApp%20Engine',
  },
  {
    num: '03',
    category: 'PHYSICAL VENTURE INFRASTRUCTURE',
    title: 'Quantum Weave™ Pipeline',
    headline: 'AI-driven community commerce & factory orchestration.',
    specs: [
      { label: 'Units Routed', val: '14,000+ Scaled' },
      { label: 'Facilities', val: '14 Vetted Mills' },
      { label: 'Defect Rate', val: 'Zero Defect Guarantee' },
    ],
    imageSrc: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Quantum Weave Automated Manufacturing',
    badge: 'TIER-1 MILLS • TIRUPUR & BLR',
    ctaText: 'Explore Quantum Weave',
    ctaLink: 'https://quantumweaveai.io/',
  },
  {
    num: '04',
    category: 'ACQUISITION ARCHITECTURE',
    title: 'Cashflow Copy™ Systems',
    headline: 'High-converting messaging loops built for ROAS leverage.',
    specs: [
      { label: 'Ad-to-Lead Lift', val: '4.8x Higher' },
      { label: 'Form Fatigue', val: '0% Drop-off' },
      { label: 'Methodology', val: 'Direct Response' },
    ],
    imageSrc: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Cashflow Copy Growth System',
    badge: 'HIGH LEVERAGE • DIRECT RESPONSE',
    ctaText: 'Explore Cashflow Copy',
    ctaLink: 'https://cashflowcopy.in/',
  },
];

export const MonoStackedCards: React.FC = () => {
  return (
    <section id="stacked-cards" className="relative py-28 px-4 max-w-6xl mx-auto z-10">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 font-mono text-xs uppercase tracking-widest text-white/70 mb-3">
          <span>SCROLL-DRIVEN STACKED ARCHITECTURE</span>
        </div>
        <h2 className="font-['Space_Grotesk'] text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-4">
          Core Systems. <span className="text-white/30">Stacked in 3D.</span>
        </h2>
        <p className="font-mono text-xs uppercase tracking-widest text-white/50 max-w-md mx-auto">
          As you scroll down, each system card locks and stacks over the previous layer.
        </p>
      </div>

      {/* Stacked Cards Container */}
      <div className="space-y-16">
        {SYSTEM_CARDS.map((card, idx) => (
          <div
            key={card.num}
            style={{ top: `${90 + idx * 24}px` }}
            className="sticky card-mono rounded-3xl p-6 sm:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.95)] bg-[#080808] border border-white/20 group overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Minimal Text & Specs */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-4xl sm:text-5xl font-black text-white/30">
                    {card.num}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-widest px-3 py-1 rounded-full border border-white/20 bg-white/5 text-white">
                    {card.category}
                  </span>
                </div>

                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-4xl font-black uppercase text-white leading-tight">
                  {card.title}
                </h3>

                <p className="font-mono text-xs uppercase tracking-wider text-white/80">
                  • {card.headline}
                </p>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {card.specs.map((sp, sidx) => (
                    <div key={sidx} className="bg-[#111111] p-3 rounded-xl border border-white/10 font-mono">
                      <span className="block text-[10px] uppercase text-white/40">{sp.label}</span>
                      <span className="text-xs font-bold text-white mt-0.5 block">{sp.val}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <a
                    href={card.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all active:scale-95"
                  >
                    <span>{card.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Right Column: High-Res B&W Photography Frame */}
              <div className="lg:col-span-6">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/15 bg-black group-hover:border-white transition-colors duration-500">
                  <img
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 font-mono text-[10px] uppercase px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white">
                    {card.badge}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
