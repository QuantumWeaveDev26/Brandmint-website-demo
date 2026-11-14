import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { SmartVideo } from './SmartVideo';
import { useMotionSettings } from './MotionSettings';
import type { RoutePath } from './MonoNavbar';

interface MonoScrollHeroProps {
  onOpenBooking: () => void;
  onNavigate?: (path: RoutePath) => void;
}

interface CompanyPillar {
  num: string;
  eyebrow: string;
  title: string;
  subTag: string;
  dotColor: string;
  route?: RoutePath;
  scrollId?: string;
  kind: 'automation' | 'revenue' | 'venture' | 'academy';
}

const COMPANY_PILLARS: CompanyPillar[] = [
  {
    num: '01',
    eyebrow: 'Automation',
    title: 'WhatsApp & CRM AI',
    subTag: '6 Connected Suites',
    dotColor: '#34D399',
    scrollId: 'solutions',
    kind: 'automation',
  },
  {
    num: '02',
    eyebrow: 'Revenue Lab',
    title: 'Meta, Films & Copy',
    subTag: 'AI Demand Engine',
    dotColor: '#CCC7F2',
    route: '/business-growth',
    kind: 'revenue',
  },
  {
    num: '03',
    eyebrow: 'Venture IP',
    title: 'Quantum Weave™',
    subTag: '4 Incubated Platforms',
    dotColor: '#A78BFA',
    route: '/ventures',
    kind: 'revenue' as const,
  },
  {
    num: '04',
    eyebrow: 'Academy',
    title: '5 AI Mastery Tracks',
    subTag: 'Applied Upskilling',
    dotColor: '#F5F3FF',
    route: '/academy',
    kind: 'academy',
  },
];

// Fix pillar 03 kind to 'venture' for its bespoke orbital SVG
COMPANY_PILLARS[2].kind = 'venture';

const PillarMicroVisual: React.FC<{ kind: CompanyPillar['kind']; active: boolean }> = ({ kind, active }) => {
  if (kind === 'automation') {
    // Live WhatsApp <-> CRM Signal Bridge
    return (
      <svg viewBox="0 0 36 24" className="w-8 h-5 shrink-0" aria-hidden="true">
        <circle cx="6" cy="12" r="3" fill={active ? '#34D399' : '#7265C2'} />
        <path
          d="M10 12 C14 5, 22 19, 26 12"
          fill="none"
          stroke={active ? '#CCC7F2' : '#7265C2'}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="3 2.5"
        />
        <circle cx="30" cy="12" r="3" fill={active ? '#CCC7F2' : '#7265C2'} />
      </svg>
    );
  }

  if (kind === 'revenue') {
    // Rising 4-Bar Growth Equalizer
    const bars = [9, 14, 11, 18];
    return (
      <svg viewBox="0 0 32 22" className="w-7 h-5 shrink-0" aria-hidden="true">
        {bars.map((h, idx) => (
          <rect
            key={idx}
            x={3 + idx * 7}
            y={20 - (active ? h : Math.max(6, h - 4))}
            width="4.2"
            height={active ? h : Math.max(6, h - 4)}
            rx="2"
            fill={active ? (idx === 3 ? '#FFFFFF' : '#CCC7F2') : '#7265C2'}
            style={{ transition: 'all 0.3s ease' }}
          />
        ))}
      </svg>
    );
  }

  if (kind === 'venture') {
    // Quantum Weave Orbital Atom
    return (
      <svg viewBox="0 0 28 28" className="w-6 h-6 shrink-0" aria-hidden="true">
        <ellipse
          cx="14"
          cy="14"
          rx="11"
          ry="5"
          transform="rotate(-28 14 14)"
          fill="none"
          stroke={active ? '#CCC7F2' : '#7265C2'}
          strokeWidth="1.4"
        />
        <ellipse
          cx="14"
          cy="14"
          rx="11"
          ry="5"
          transform="rotate(32 14 14)"
          fill="none"
          stroke={active ? '#A78BFA' : '#5241AB'}
          strokeWidth="1.4"
        />
        <circle cx="14" cy="14" r="2.6" fill={active ? '#FFFFFF' : '#CCC7F2'} />
      </svg>
    );
  }

  // Academy: 5-Track Constellation Nodes
  const pts: [number, number][] = [
    [5, 16],
    [11, 8],
    [17, 14],
    [23, 6],
    [29, 12],
  ];
  return (
    <svg viewBox="0 0 34 22" className="w-8 h-5 shrink-0" aria-hidden="true">
      <polyline
        points={pts.map(([x, y]) => `${x},${y}`).join(' ')}
        fill="none"
        stroke={active ? '#CCC7F2' : '#7265C2'}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {pts.map(([x, y], idx) => (
        <circle
          key={idx}
          cx={x}
          cy={y}
          r={idx === 3 && active ? 2.6 : 2}
          fill={active ? '#FFFFFF' : '#CCC7F2'}
        />
      ))}
    </svg>
  );
};

export const MonoScrollHero: React.FC<MonoScrollHeroProps> = ({ onNavigate }) => {
  const { paused } = useMotionSettings();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry) setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView || hoveredIdx !== null) return;
    const timer = window.setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % COMPANY_PILLARS.length);
    }, 2700);
    return () => window.clearInterval(timer);
  }, [paused, inView, hoveredIdx]);

  const highlighted = hoveredIdx ?? activeIdx;

  const handlePillarSelect = (pillar: CompanyPillar) => {
    if (pillar.scrollId) {
      const target = document.getElementById(pillar.scrollId);
      if (target) {
        if (window.__lenis) {
          window.__lenis.scrollTo(target, { offset: -64, duration: 0.7 });
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }
    }
    if (pillar.route && onNavigate) {
      onNavigate(pillar.route);
    }
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative w-full min-h-[88vh] lg:min-h-[94vh] flex flex-col items-center justify-center pt-20 sm:pt-24 pb-10 sm:pb-12 px-4 z-10 overflow-hidden bg-[#0A0224]"
    >
      {/* Full-Bleed Bengaluru Tech Park Aerial Video Stage (Direct Hardware Overlay — Zero Scroll Jitter) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#0A0224]">
        <SmartVideo
          src="/videos/bengaluru-tech-park.mp4"
          priority
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-[#0A0224]/52" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 62% 48% at 50% 44%, rgba(10, 2, 36, 0.52) 0%, rgba(22, 9, 82, 0.28) 65%, rgba(10, 2, 36, 0.62) 100%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0224]/68 via-transparent to-[#0A0224]" />
      </div>

      {/* Foreground Hero Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#CCC7F2]/35 bg-[#120642]/92 text-xs font-medium text-[#F5F3FF] mb-4 shadow-[0_8px_24px_rgba(5,1,20,0.72)]">
          <Sparkles className="w-3.5 h-3.5 text-[#CCC7F2] shrink-0" />
          <span className="font-semibold text-white">BrandMint AI Pvt. Ltd.</span>
          <span className="text-[#7265C2]">•</span>
          <span className="text-[#CCC7F2]">Bengaluru</span>
        </div>

        <div className="max-w-3xl mx-auto space-y-2.5">
          <h1 className="font-display text-3xl sm:text-5xl lg:text-[62px] font-bold tracking-tight text-white leading-[1.05] drop-shadow-[0_6px_28px_rgba(5,1,20,0.92)]">
            Better Systems for{' '}
            <span className="block font-editorial text-4xl sm:text-6xl lg:text-[68px] text-aurora leading-[1.03] py-0.5">
              Lasting Business Growth.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-[#F5F3FF]/92 max-w-xl mx-auto font-normal leading-relaxed px-2 drop-shadow-[0_3px_16px_rgba(5,1,20,0.95)]">
            Enterprise AI built around your workflows, knowledge, and people.
          </p>
        </div>

        <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2.5">
          <a
            href="https://calendly.com/team-brandmint/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 sm:py-3 rounded-full btn-aurora text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Book a 30-Min Call</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate('/solutions')}
              className="px-5 py-2.5 sm:py-3 rounded-full bg-[#120642]/92 hover:bg-[#312185] border border-[#CCC7F2]/40 text-white font-semibold text-xs sm:text-sm transition-all shadow-[0_8px_22px_rgba(5,1,20,0.68)] cursor-pointer"
            >
              Explore Solutions
            </button>
          )}
        </div>

        {/* Spatial BrandMint Ecosystem Dock — 4 Real Company Pillars with Liquid Spotlight & Custom Micro-Visuals (No Arrows) */}
        <div
          className="relative w-full max-w-4xl mt-7 sm:mt-9 rounded-[26px] p-1.5 sm:p-2 bg-[#0A0224]/82 border border-[#7265C2]/35 shadow-[0_22px_50px_rgba(5,1,20,0.88),inset_0_1px_0_rgba(204,199,242,0.18)]"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2">
            {COMPANY_PILLARS.map((st, i) => {
              const isLit = highlighted === i;

              return (
                <button
                  type="button"
                  key={st.num}
                  onMouseEnter={() => {
                    setHoveredIdx(i);
                    setActiveIdx(i);
                  }}
                  onFocus={() => {
                    setHoveredIdx(i);
                    setActiveIdx(i);
                  }}
                  onClick={() => handlePillarSelect(st)}
                  className="group relative rounded-2xl px-3.5 py-3 sm:px-4 sm:py-3.5 text-left overflow-hidden cursor-pointer focus:outline-none transition-colors"
                >
                  {/* Gliding Liquid Aurora Spotlight Pill */}
                  {isLit && (
                    <motion.div
                      layoutId="brandmint-ecosystem-spotlight"
                      transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#312185] via-[#160952] to-[#120642] border border-[#CCC7F2]/55 shadow-[0_10px_28px_rgba(114,101,194,0.38)]"
                    >
                      <div className="absolute inset-x-4 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#CCC7F2] to-transparent" />
                    </motion.div>
                  )}

                  {/* Subtle Editorial Numeral Watermark */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none select-none font-editorial italic text-3xl sm:text-4xl leading-none absolute bottom-1.5 right-3 transition-opacity duration-250 ${
                      isLit ? 'text-[#CCC7F2]/22' : 'text-[#7265C2]/14 group-hover:text-[#CCC7F2]/18'
                    }`}
                  >
                    {st.num}
                  </span>

                  {/* Top Row: Eyebrow + Custom Live SVG Micro-Graphic */}
                  <div className="relative z-10 flex items-center justify-between gap-1.5 mb-2">
                    <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#CCC7F2]/90">
                      <span
                        style={{ backgroundColor: isLit ? st.dotColor : '#7265C2' }}
                        className={`w-1.5 h-1.5 rounded-full transition-transform duration-200 ${
                          isLit ? 'scale-125 shadow-[0_0_8px_#CCC7F2]' : 'opacity-70'
                        }`}
                      />
                      <span>{st.eyebrow}</span>
                    </span>

                    <PillarMicroVisual kind={st.kind} active={isLit} />
                  </div>

                  {/* Core Company Pillar Name */}
                  <div
                    className={`relative z-10 font-display text-xs sm:text-[14px] font-bold leading-snug transition-colors ${
                      isLit ? 'text-white' : 'text-[#F5F3FF]/90 group-hover:text-white'
                    }`}
                  >
                    {st.title}
                  </div>

                  {/* Crisp Scope Micro-Badge (Zero Arrows) */}
                  <div
                    className={`relative z-10 mt-1 text-[10px] sm:text-[11px] font-medium transition-colors ${
                      isLit ? 'text-[#CCC7F2]' : 'text-[#CCC7F2]/60 group-hover:text-[#CCC7F2]/85'
                    }`}
                  >
                    {st.subTag}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
