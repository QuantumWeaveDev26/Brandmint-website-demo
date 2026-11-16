import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles, Network, Users, Cpu, Briefcase, GraduationCap, ChevronRight, Activity } from 'lucide-react';
import { useMotionSettings } from './MotionSettings';
import videoAssets from '../data/videoAssets.json';

type VideoAssetEntry = { desktop: string; mobile: string; poster: string };

interface ServiceDefinition {
  id: string;
  num: string;
  shortTitle: string;
  fullTitle: string;
  category: string;
  punchline: string;
  specs: { label: string; val: string }[];
  ctaText: string;
  ctaLink: string;
  icon: React.ElementType;
  videoUrl: string;
  hudTag: string;
  hudMetric: string;
}

const SERVICES: ServiceDefinition[] = [
  {
    id: 'ai-personalisation',
    num: '01',
    shortTitle: 'Personalisation',
    fullTitle: 'AI-Powered Personalisation',
    category: 'Customer Relevance',
    punchline: 'Every customer journey, tailored live.',
    specs: [
      { label: 'Focus', val: 'Relevance' },
      { label: 'Impact', val: 'Engagement' },
      { label: 'Outcome', val: 'Qualified Leads' },
    ],
    ctaText: 'Explore Personalisation',
    ctaLink: 'https://wa.me/919972965677?text=Hi%20BrandMint%20AI%2C%20we%20would%20like%20to%20explore%20AI-Powered%20Personalisation%20%26%20Customisation.',
    icon: Sparkles,
    videoUrl: '/videos/pure-sol01-personalisation.mp4',
    hudTag: 'Context-Aware Journeys',
    hudMetric: 'Live Personalisation',
  },
  {
    id: 'ai-integration',
    num: '02',
    shortTitle: 'AI Integration',
    fullTitle: 'Enterprise AI Integration',
    category: 'Connected Systems',
    punchline: 'AI inside the tools your teams already use.',
    specs: [
      { label: 'Speed', val: 'Instant Sync' },
      { label: 'Source', val: 'Verified Data' },
      { label: 'Fit', val: 'Native Stack' },
    ],
    ctaText: 'Explore AI Integration',
    ctaLink: 'https://wa.me/919972965677?text=Hi%20BrandMint%20AI%2C%20we%20would%20like%20to%20explore%20Enterprise%20AI%20Integration%20with%20our%20CRM%20%26%20systems.',
    icon: Network,
    videoUrl: '/videos/rel-crm-sync.mp4',
    hudTag: 'CRM • WhatsApp • Knowledge',
    hudMetric: 'Unified Systems',
  },
  {
    id: 'workforce-multiplier',
    num: '03',
    shortTitle: 'AI Workforce',
    fullTitle: 'AI Workforce Multiplier',
    category: 'Team Capacity',
    punchline: 'Role-based AI assistants that multiply output.',
    specs: [
      { label: 'Output', val: 'More Shipped' },
      { label: 'Standard', val: 'High Precision' },
      { label: 'Leverage', val: 'Hours Saved' },
    ],
    ctaText: 'Build Your AI Workforce',
    ctaLink: 'https://wa.me/919972965677?text=Hi%20BrandMint%20AI%2C%20we%20would%20like%20to%20explore%20AI%20Workforce%20Building%20%2F%20Workforce%20Multiplier.',
    icon: Users,
    videoUrl: '/videos/pure-sol03-workforce.mp4',
    hudTag: 'Role-Based AI Assistants',
    hudMetric: 'Multiplied Output',
  },
  {
    id: 'workflow-automation',
    num: '04',
    shortTitle: 'AI Workflows',
    fullTitle: 'AI Workflow & Automation',
    category: 'End-to-End Velocity',
    punchline: 'Repetitive work, automated end to end.',
    specs: [
      { label: 'Velocity', val: 'Faster Cycles' },
      { label: 'Routing', val: 'Auto Follow-Up' },
      { label: 'Quality', val: 'Zero Rework' },
    ],
    ctaText: 'Explore AI Workflows',
    ctaLink: 'https://wa.me/919972965677?text=Hi%20BrandMint%20AI%2C%20we%20would%20like%20to%20explore%20AI%20Workflow%20%26%20Automation%20Building.',
    icon: Cpu,
    videoUrl: '/videos/home-sol04-workflows.mp4',
    hudTag: 'Triggers • Routing • Approvals',
    hudMetric: 'Automated Execution',
  },
  {
    id: 'executive-assistants',
    num: '05',
    shortTitle: 'Executive AI',
    fullTitle: 'Executive AI Assistants',
    category: 'Leadership Leverage',
    punchline: 'A personal AI chief of staff for every leader.',
    specs: [
      { label: 'Briefs', val: 'Meeting Ready' },
      { label: 'Tracking', val: 'Action Closure' },
      { label: 'Clarity', val: 'Decision Speed' },
    ],
    ctaText: 'Explore Executive AI',
    ctaLink: 'https://wa.me/919972965677?text=Hi%20BrandMint%20AI%2C%20we%20would%20like%20to%20explore%20Executive%20AI%20Assistants%20for%20Business%20Leaders.',
    icon: Briefcase,
    videoUrl: '/videos/rel-project-roadmap.mp4',
    hudTag: 'Boardroom & Decision Briefs',
    hudMetric: 'Executive Clarity',
  },
  {
    id: 'education-institutions',
    num: '06',
    shortTitle: 'AI Institutions',
    fullTitle: 'AI-First Institutions',
    category: 'Academic & Campus AI',
    punchline: 'Adaptive learning. More time for educators.',
    specs: [
      { label: 'Learners', val: 'Adaptive Paths' },
      { label: 'Faculty', val: 'Educator Time' },
      { label: 'Campus', val: 'Smart Operations' },
    ],
    ctaText: 'Explore Institutional AI',
    ctaLink: 'https://wa.me/919972965677?text=Hi%20BrandMint%20AI%2C%20we%20would%20like%20to%20explore%20Education%20%26%20AI-First%20Institution%20Solutions.',
    icon: GraduationCap,
    videoUrl: '/videos/clean-audit-whiteboard.mp4',
    hudTag: 'Adaptive Campus Learning',
    hudMetric: 'Educator & Student Impact',
  },
];

interface FigmaWeaveTransformationProps {
  onOpenBooking?: (focusArea?: string) => void;
}

export const FigmaWeaveTransformation: React.FC<FigmaWeaveTransformationProps> = ({ onOpenBooking }) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const railBarRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeIdxRef = useRef(0);
  const manualLockRef = useRef(false);
  const wheelCooldownRef = useRef(false);
  const lockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wheelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { paused } = useMotionSettings();

  const [activeIdx, setActiveIdx] = useState(0);
  const [sectionNear, setSectionNear] = useState(false);
  const [isMobileStream, setIsMobileStream] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768
  );

  useEffect(() => {
    activeIdxRef.current = activeIdx;
  }, [activeIdx]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = (e: MediaQueryListEvent) => setIsMobileStream(e.matches);
    setIsMobileStream(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setSectionNear(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry) setSectionNear(entry.isIntersecting);
      },
      { rootMargin: '500px 0px', threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const syncFromScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const scrollable = Math.max(1, rect.height - window.innerHeight);
    const progress = Math.max(0, Math.min(1, -rect.top / scrollable));

    if (railBarRef.current) {
      const displayProgress = manualLockRef.current
        ? activeIdxRef.current / Math.max(1, SERVICES.length - 1)
        : progress;
      railBarRef.current.style.transform = `scaleX(${displayProgress.toFixed(4)})`;
    }

    if (!manualLockRef.current) {
      // Maps [0..1] cleanly across 0..5 with zero dead scroll zone after Card 6
      const nextIdx = Math.min(
        SERVICES.length - 1,
        Math.max(0, Math.round(progress * (SERVICES.length - 1)))
      );
      if (nextIdx !== activeIdxRef.current) {
        activeIdxRef.current = nextIdx;
        setActiveIdx(nextIdx);
      }
    }
  }, []);

  const stepToIndex = useCallback((index: number, durationSec = 0.42) => {
    const clamped = Math.max(0, Math.min(SERVICES.length - 1, index));
    manualLockRef.current = true;
    if (lockTimerRef.current) clearTimeout(lockTimerRef.current);

    activeIdxRef.current = clamped;
    setActiveIdx(clamped);

    if (railBarRef.current) {
      const p = clamped / Math.max(1, SERVICES.length - 1);
      railBarRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
    }

    const el = containerRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const topDoc = window.scrollY + rect.top;
      const scrollable = Math.max(0, rect.height - window.innerHeight);
      const targetY = topDoc + (clamped / Math.max(1, SERVICES.length - 1)) * scrollable;

      if (window.__lenis) {
        window.__lenis.scrollTo(targetY, { duration: durationSec });
      } else {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    }

    lockTimerRef.current = setTimeout(() => {
      manualLockRef.current = false;
    }, Math.round(durationSec * 1000) + 60);
  }, []);

  // 1-Scroll = 1-Card Stepper when pinned on Desktop/Laptop; releases immediately after Card 6 (down) or Card 1 (up)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (window.innerWidth < 768 || paused) return;
      if (Math.abs(e.deltaY) < 8) return;

      const rect = el.getBoundingClientRect();
      const isPinned = rect.top <= 8 && rect.bottom >= window.innerHeight - 8;
      if (!isPinned) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      const cur = activeIdxRef.current;

      // At boundary (Card 6 scrolling down, or Card 1 scrolling up): release immediately on 1st scroll!
      if ((dir > 0 && cur >= SERVICES.length - 1) || (dir < 0 && cur <= 0)) {
        manualLockRef.current = false;
        return;
      }

      e.preventDefault();
      if (wheelCooldownRef.current) return;

      wheelCooldownRef.current = true;
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = setTimeout(() => {
        wheelCooldownRef.current = false;
      }, 260);

      stepToIndex(cur + dir, 0.26);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    };
  }, [paused, stepToIndex]);

  useEffect(() => {
    let raf = 0;
    const onScrollOrResize = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        syncFromScroll();
      });
    };

    syncFromScroll();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [syncFromScroll]);

  useEffect(() => {
    const activeVid = videoRefs.current[activeIdx];
    const ensurePlay = () => {
      if (!activeVid || !sectionNear || paused || document.hidden) return;
      activeVid.defaultMuted = true;
      activeVid.muted = true;
      if (activeVid.paused) {
        const p = activeVid.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      }
    };

    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      vid.defaultMuted = true;
      vid.muted = true;
      if (sectionNear && !paused && idx === activeIdx && !document.hidden) {
        ensurePlay();
      } else if (!vid.paused) {
        vid.pause();
      }
    });

    if (activeVid) {
      activeVid.addEventListener('loadeddata', ensurePlay);
      activeVid.addEventListener('canplay', ensurePlay);
      return () => {
        activeVid.removeEventListener('loadeddata', ensurePlay);
        activeVid.removeEventListener('canplay', ensurePlay);
      };
    }
  }, [activeIdx, sectionNear, paused]);

  const currentService = SERVICES[activeIdx];
  const nextService = SERVICES[(activeIdx + 1) % SERVICES.length];

  return (
    <section
      id="solutions"
      ref={containerRef}
      className="relative w-full h-[175vh] aurora-canvas"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 pt-14 sm:pt-16 pb-3 z-20">
        <div className="w-full max-w-5xl mx-auto flex flex-col space-y-3 sm:space-y-4">
          {/* Top Header & Stage Chips */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#7265C2]/25 pb-2.5">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#CCC7F2] shadow-[0_0_8px_#CCC7F2]" />
              <span className="text-xs sm:text-sm font-semibold text-white">Connected AI Solutions</span>
              <span className="text-[#7265C2]/50">|</span>
              <span className="text-xs font-medium text-[#CCC7F2]/85 tabular-nums">
                {activeIdx + 1} / {SERVICES.length}
              </span>
            </div>

            <div className="flex items-center gap-1 overflow-x-auto max-w-full py-0.5 scrollbar-none">
              {SERVICES.map((s, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    type="button"
                    key={s.id}
                    aria-pressed={isActive}
                    onClick={() => stepToIndex(idx, 0.45)}
                    className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium border transition-colors duration-150 shrink-0 cursor-pointer ${
                      isActive
                        ? 'btn-aurora text-white border-transparent font-semibold'
                        : 'bg-[#160952]/80 text-[#CCC7F2] border-[#7265C2]/35 hover:border-[#CCC7F2]/65 hover:text-white'
                    }`}
                  >
                    {s.shortTitle}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Balanced 2-Column Stage */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center">
            {/* Left Column: Concise Copy Morph */}
            <div className="md:col-span-5 text-left min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentService.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-2.5 sm:space-y-3"
                >
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#312185]/80 border border-[#7265C2]/45 text-[11px] text-[#CCC7F2] font-semibold">
                    <span>{currentService.category}</span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl lg:text-[32px] font-bold tracking-tight text-white leading-[1.12]">
                    {currentService.fullTitle}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#CCC7F2]/85 leading-relaxed">
                    {currentService.punchline}
                  </p>

                  {/* 3 Sleek Compact Outcome Tiles */}
                  <div className="grid grid-cols-3 gap-2 pt-0.5">
                    {currentService.specs.map((sp, sidx) => (
                      <div key={sidx} className="glass-card p-2 sm:p-2.5 rounded-xl">
                        <span className="block text-[10px] text-[#CCC7F2]/70 font-medium">{sp.label}</span>
                        <span className="text-[11px] sm:text-xs font-bold text-white mt-0.5 block leading-tight">{sp.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA & Next Trigger */}
                  <div className="pt-1 flex flex-wrap items-center gap-2">
                    <a
                      href={currentService.ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full btn-aurora text-white font-semibold text-xs transition-all"
                    >
                      <span>{currentService.ctaText}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    {onOpenBooking && (
                      <button
                        type="button"
                        onClick={() => onOpenBooking(currentService.fullTitle)}
                        className="px-3.5 py-2 rounded-full bg-[#160952]/85 border border-[#7265C2]/40 hover:bg-[#312185] text-[#CCC7F2] hover:text-white text-xs font-medium transition-colors cursor-pointer"
                      >
                        Scope Pilot
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => stepToIndex((activeIdx + 1) % SERVICES.length, 0.4)}
                      className="px-2.5 py-2 rounded-full bg-[#120642]/80 border border-[#7265C2]/35 hover:bg-[#312185] text-[#CCC7F2] hover:text-white text-xs font-medium transition-colors flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Pure 16:9 Direct-Composited Cinema Video Stage (Zero Trimming at Every Breakpoint) */}
            <div className="md:col-span-7 flex items-center justify-center min-w-0">
              <div className="w-full max-w-[440px] md:max-w-[480px] lg:max-w-[540px] xl:max-w-[580px] aspect-video mx-auto rounded-2xl glass-frame flex flex-col justify-between relative overflow-hidden bg-[#0E0433]">
                {SERVICES.map((srv, idx) => {
                  const isCurrent = idx === activeIdx;
                  const isNext = idx === (activeIdx + 1) % SERVICES.length;
                  const opt = (videoAssets as Record<string, VideoAssetEntry>)[srv.videoUrl];
                  const resolvedSrc = opt
                    ? isMobileStream
                      ? opt.mobile
                      : opt.desktop
                    : srv.videoUrl;
                  const shouldAttachSrc = sectionNear && (isCurrent || isNext);

                  return (
                    <video
                      key={srv.id}
                      ref={(el) => {
                        videoRefs.current[idx] = el;
                      }}
                      src={shouldAttachSrc ? resolvedSrc : undefined}
                      poster={opt?.poster}
                      autoPlay={isCurrent && sectionNear && !paused}
                      loop
                      muted
                      playsInline
                      disablePictureInPicture
                      disableRemotePlayback
                      preload={isCurrent ? 'auto' : 'metadata'}
                      aria-hidden="true"
                      className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isCurrent ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-[1.03] z-0'
                      }`}
                    />
                  );
                })}

                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0A0224]/50 via-transparent to-[#0A0224]/20 pointer-events-none" />

                <div className="relative z-20 p-2.5 sm:p-3.5 flex items-center justify-between gap-2 text-xs pointer-events-none">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0A0224]/50 border border-white/15 text-white/85 text-[11px] font-medium truncate">
                    {currentService.hudTag}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#0A0224]/50 border border-white/15 text-[#CCC7F2]/90 font-semibold text-[11px] tabular-nums shrink-0">
                    {currentService.num}
                  </span>
                </div>

                <div className="relative z-20 p-2.5 sm:p-3.5 flex items-end justify-between gap-2">
                  <div className="px-2.5 py-1 rounded-lg bg-[#0A0224]/50 border border-white/15 text-left pointer-events-none min-w-0">
                    <span className="font-display text-xs font-medium text-white/90 block truncate">
                      {currentService.hudMetric}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => stepToIndex((activeIdx + 1) % SERVICES.length, 0.4)}
                    className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0A0224]/60 text-white/90 border border-white/15 hover:border-[#CCC7F2]/60 hover:bg-[#160952]/90 transition-colors shrink-0 cursor-pointer"
                    title="Next solution"
                  >
                    <span className="text-[11px] font-medium text-[#CCC7F2] whitespace-nowrap">
                      Next: {nextService.shortTitle}
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-[#CCC7F2]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Live Scroll Transformation Progress Rail */}
          <div className="space-y-1 pt-0.5">
            <div className="w-full h-[3px] rounded-full bg-[#160952] overflow-hidden">
              <div
                ref={railBarRef}
                style={{ transform: 'scaleX(0)' }}
                className="h-full w-full origin-left bg-gradient-to-r from-[#312185] via-[#7265C2] to-[#CCC7F2] will-change-transform"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#CCC7F2]/75">
              <div className="flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-[#CCC7F2]" />
                <span>1 scroll per solution • 6 connected areas</span>
              </div>

              <div className="flex items-center gap-1.5">
                {SERVICES.map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => stepToIndex(i, 0.4)}
                    aria-pressed={activeIdx === i}
                    className={`min-h-5 border-y-[8px] border-transparent bg-clip-content rounded-full transition-all duration-200 cursor-pointer ${
                      activeIdx === i
                        ? 'w-7 bg-gradient-to-r from-[#312185] via-[#7265C2] to-[#CCC7F2]'
                        : 'w-2 bg-[#312185]/60 hover:bg-[#7265C2]'
                    }`}
                    title={`Solution ${i + 1}`}
                    aria-label={`Select Solution ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
