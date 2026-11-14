import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ShrinkPageProps {
  index: number;
  total: number;
  tag: string;
  title: string;
  subtitle: string;
  specs: { label: string; val: string }[];
  colorImage: string;
  imageAlt: string;
  statBadge: string;
  ctaText: string;
  ctaLink: string;
}

const ShrinkDeckCard: React.FC<ShrinkPageProps> = ({
  index,
  tag,
  title,
  subtitle,
  specs,
  colorImage,
  imageAlt,
  statBadge,
  ctaText,
  ctaLink,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Each card detects when it is scrolled past
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });

  // Shrink transformation as user scrolls past this card
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.9], [1, 1, 0.84]);
  const opacity = useTransform(scrollYProgress, [0, 0.45, 0.9], [1, 1, 0.25]);
  const translateY = useTransform(scrollYProgress, [0, 0.4, 0.9], [0, 0, -30]);

  return (
    <div
      ref={cardRef}
      className="relative min-h-[140vh] flex flex-col items-center"
    >
      <motion.div
        style={{
          scale,
          opacity,
          y: translateY,
          top: `${80 + index * 16}px`,
        }}
        className="sticky shrink-card w-full max-w-6xl rounded-[36px] bg-[#080808] border border-white/20 p-6 sm:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text / Specs (Trimmed & Punchy) */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-white text-black font-bold">
                0{index + 1} // {tag}
              </span>
              <span className="font-mono text-xs text-white/50">
                SCROLL TO SHRINK ▾
              </span>
            </div>

            <h3 className="font-['Space_Grotesk'] text-3xl sm:text-5xl font-black uppercase text-white leading-[0.95] tracking-tight">
              {title}
            </h3>

            <p className="font-mono text-xs sm:text-sm uppercase tracking-wider text-white/70">
              // {subtitle}
            </p>

            {/* Spec Matrix */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {specs.map((sp, sidx) => (
                <div key={sidx} className="bg-[#121212] p-3 rounded-xl border border-white/10 font-mono">
                  <span className="block text-[10px] uppercase text-white/40">{sp.label}</span>
                  <span className="text-xs font-bold text-white mt-0.5 block">{sp.val}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href={ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                <span>{ctaText}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: Vibrant Colorful High-End Imagery */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)] group">
              <img
                src={colorImage}
                alt={imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              {/* Colorful Stat Badge */}
              <div className="absolute top-4 right-4 font-mono text-[10px] font-bold uppercase px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/30 text-white shadow-lg">
                {statBadge}
              </div>

              {/* Bottom Badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs text-white/90 bg-black/70 backdrop-blur-md p-3 rounded-xl border border-white/15">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00f5d4] animate-ping" />
                  <span>AUTONOMOUS_PIPELINE.LIVE</span>
                </span>
                <span className="font-bold">100% OPERATIONAL</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ShrinkPageScrollDeck: React.FC = () => {
  const pages = [
    {
      tag: 'AI AGENT WORKFORCE',
      title: 'Autonomous Code & Triage Fleets',
      subtitle: 'Multi-step SOP execution with zero human fatigue.',
      specs: [
        { label: 'Latency', val: '1.4 Seconds' },
        { label: 'Reliability', val: '99.9% Continuous' },
        { label: 'Integrations', val: 'Hubspot, Slack, DB' },
      ],
      colorImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80',
      imageAlt: 'Vibrant AI Intelligence Core',
      statBadge: '99.9% CONTINUOUS UPTIME',
      ctaText: 'Deploy Agent Fleet',
      ctaLink: 'https://wa.me/919972965677?text=Deploy%20AI%20Agent%20Fleet',
    },
    {
      tag: 'WHATSAPP CONVERSATIONAL CRM',
      title: 'The 2.8-Second Growth Engine',
      subtitle: 'Conversations close deals. Forms close tabs.',
      specs: [
        { label: 'Response SLA', val: '2.8 Seconds' },
        { label: 'API Gateway', val: 'Meta Cloud v20' },
        { label: 'Conversion', val: '4.8x Over Forms' },
      ],
      colorImage: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=1400&q=80',
      imageAlt: 'Vibrant WhatsApp Business Interface',
      statBadge: 'META CLOUD CERTIFIED',
      ctaText: 'Deploy WhatsApp Engine',
      ctaLink: 'https://wa.me/919972965677?text=Deploy%20WhatsApp%20Engine',
    },
    {
      tag: 'COMMUNITY COMMERCE & LOOMS',
      title: 'Quantum Weave™ Physical Pipeline',
      subtitle: 'AI merchandise & factory manufacturing orchestration.',
      specs: [
        { label: 'Units Scaled', val: '14,000+ Custom' },
        { label: 'Vetted Mills', val: '14 Facilities' },
        { label: 'Turnaround', val: '4 - 7 Days' },
      ],
      colorImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1400&q=80',
      imageAlt: 'Vibrant Apparel Fashion & Loom Production',
      statBadge: '14,000+ UNITS ROUTED',
      ctaText: 'Explore Quantum Weave',
      ctaLink: 'https://quantumweaveai.io/',
    },
    {
      tag: 'CONVERSION & ACQUISITION',
      title: 'Cashflow Copy™ & Growth Loops',
      subtitle: 'High-converting messaging loops built for ROAS leverage.',
      specs: [
        { label: 'Ad-to-Lead Lift', val: '4.8x Benchmark' },
        { label: 'Form Fatigue', val: 'Zero Drop-off' },
        { label: 'Methodology', val: 'Direct Response' },
      ],
      colorImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80',
      imageAlt: 'Vibrant Growth Metrics Dashboard',
      statBadge: '4.8X AD CONVERSION',
      ctaText: 'Explore Cashflow Copy',
      ctaLink: 'https://cashflowcopy.in/',
    },
  ];

  return (
    <section id="stacked-deck" className="relative py-20 px-4 max-w-6xl mx-auto z-10">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/20 bg-white/5 font-mono text-xs uppercase tracking-widest text-white/70 mb-3">
          <span>SCROLL-DRIVEN SHRINK & REVEAL DECK</span>
        </div>
        <h2 className="font-['Space_Grotesk'] text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-4">
          Autonomous Systems. <span className="text-white/30">Shrink & Transform.</span>
        </h2>
        <p className="font-mono text-xs uppercase tracking-widest text-white/50 max-w-md mx-auto">
          // Scroll down to watch each page shrink into the background as the next system takes over.
        </p>
      </div>

      <div className="relative">
        {pages.map((page, idx) => (
          <ShrinkDeckCard
            key={page.tag}
            index={idx}
            total={pages.length}
            {...page}
          />
        ))}
      </div>
    </section>
  );
};
