import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowRight, Sparkles, Network, Users, Cpu, Briefcase, GraduationCap } from 'lucide-react';
import { SmartVideo } from './SmartVideo';
import { motion } from 'framer-motion';
import { useMotionSettings } from './MotionSettings';

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
    punchline: 'Use customer context to shape relevant replies, recommendations, and next steps.',
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
    punchline: 'Connect WhatsApp enquiries, CRM records, and approved knowledge in one workflow.',
    specs: [
      { label: 'Connect', val: 'Customer Records' },
      { label: 'Ground', val: 'Approved Knowledge' },
      { label: 'Fit', val: 'Your Existing Tools' },
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
    punchline: 'Give your team role-based assistants for research, drafting, and everyday operations.',
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
    punchline: 'Route enquiries, follow up, and prepare reports with clear review and handover points.',
    specs: [
      { label: 'Velocity', val: 'Faster Cycles' },
      { label: 'Routing', val: 'Auto Follow-Up' },
      { label: 'Control', val: 'Human Review' },
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
    punchline: 'Bring meeting preparation, research, and action tracking into a practical assistant for leaders.',
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
    punchline: 'Support educators and learners with adaptive practice, learning assistants, and connected campus operations.',
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
  const [activeIdx, setActiveIdx] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [pinned, setPinned] = useState(true);
  const { paused } = useMotionSettings();
  const manualTargetRef = useRef<number | null>(null);
  const manualTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const syncScrollRef = useRef<() => void>(() => {});
  const service = SERVICES[activeIdx];

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => setPinned(window.innerWidth >= 768 && (stage.offsetHeight === 0 || stage.offsetHeight + 82 <= window.innerHeight));
    measure();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    observer?.observe(stage);
    window.addEventListener('resize', measure);
    return () => { observer?.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  useEffect(() => {
    let frame = 0;
    const sync = () => {
      if (manualTargetRef.current !== null) return;
      const track = trackRef.current;
      const stage = stageRef.current;
      if (!track || !stage) return;
      const bounds = track.getBoundingClientRect();
      const travel = bounds.height - stage.offsetHeight;
      if (travel <= 1 || bounds.bottom < 82) return;
      const progress = Math.max(0, Math.min(1, (82 - bounds.top) / travel));
      setActiveIdx(Math.min(SERVICES.length - 1, Math.floor(progress * SERVICES.length)));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };
    syncScrollRef.current = sync;
    const onUserScroll = (event: Event) => {
      if (event instanceof KeyboardEvent && (event.defaultPrevented || !['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key))) return;
      if (manualTimerRef.current) clearTimeout(manualTimerRef.current);
      manualTargetRef.current = null;
      sync();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    window.addEventListener('wheel', onUserScroll, { passive: true });
    window.addEventListener('touchstart', onUserScroll, { passive: true });
    window.addEventListener('keydown', onUserScroll);
    sync();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('wheel', onUserScroll);
      window.removeEventListener('touchstart', onUserScroll);
      window.removeEventListener('keydown', onUserScroll);
      syncScrollRef.current = () => {};
      if (manualTimerRef.current) clearTimeout(manualTimerRef.current);
    };
  }, []);

  const selectService = (index: number) => {
    setActiveIdx(index);
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;
    const bounds = track.getBoundingClientRect();
    const travel = bounds.height - stage.offsetHeight;
    if (travel <= 1) return;
    const target = window.scrollY + bounds.top - 82 + (index + 0.5) / SERVICES.length * travel;
    if (paused && !window.__lenis) {
      window.scrollTo({ top: target, behavior: 'instant' });
      syncScrollRef.current();
      return;
    }
    manualTargetRef.current = index;
    if (manualTimerRef.current) clearTimeout(manualTimerRef.current);
    const release = () => { manualTargetRef.current = null; syncScrollRef.current(); };
    manualTimerRef.current = setTimeout(release, 1200);
    if (window.__lenis) window.__lenis.scrollTo(target, { duration: 0.9, onComplete: release });
    else window.scrollTo({ top: target, behavior: paused ? 'instant' : 'smooth' });
  };

  const selectWithKeyboard = (event: React.KeyboardEvent, index: number) => {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % SERVICES.length;
    else if (event.key === 'ArrowLeft') next = (index + SERVICES.length - 1) % SERVICES.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = SERVICES.length - 1;
    else return;
    event.preventDefault();
    selectService(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="solutions" className="home-solutions section-shell" aria-labelledby="solutions-title">
      <div className="section-intro">
        <h2 id="solutions-title">AI that fits<br /><span className="font-editorial">the way you work.</span></h2>
        <p>Connect your tools, support your team, and take repetitive work off their hands. Choose a starting point.</p>
      </div>
      <div ref={trackRef} className="solution-scroll-track" data-pinned={pinned}>
      <div ref={stageRef} className="solution-scroll-stage">
      <div className="solution-tabs" role="tablist" aria-label="Explore AI solutions">
        {SERVICES.map((item, index) => {
          const Icon = item.icon;
          return <button key={item.id} type="button" role="tab"
            id={`tab-${item.id}`} aria-selected={index === activeIdx}
            aria-controls="solution-panel" tabIndex={index === activeIdx ? 0 : -1}
            ref={element => { tabs.current[index] = element; }}
            onClick={() => selectService(index)} onKeyDown={event => selectWithKeyboard(event, index)}>
            {index === activeIdx && <motion.span className="solution-tab-indicator" layoutId="solution-tab-indicator"
              transition={{ duration: paused ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }} aria-hidden="true" />}
            <Icon size={18} aria-hidden="true" /><span className="solution-tab-label">{item.shortTitle}</span>
          </button>;
        })}
      </div>
      <div role="tabpanel" id="solution-panel" data-service-index={activeIdx} aria-labelledby={`tab-${service.id}`}
        tabIndex={0} className="solution-panel">
        <div key={service.id} className="solution-copy solution-reveal">
          <h3>{service.fullTitle}</h3>
          <p>{service.punchline}</p>
          <dl className="solution-outcomes">
            {service.specs.map(spec => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.val}</dd></div>)}
          </dl>
          <button type="button" className="home-primary" onClick={() => onOpenBooking?.(service.fullTitle)}>
            Discuss this solution <ArrowUpRight size={17} aria-hidden="true" />
          </button>
          <a className="home-text-link" href={service.ctaLink} target="_blank" rel="noopener noreferrer">
            Ask us on WhatsApp <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
        <div className="solution-media">
          {SERVICES.map((item, index) => <div key={item.id} className="solution-media-layer" data-active={index === activeIdx} aria-hidden="true">
            <SmartVideo src={item.videoUrl} paused={paused || index !== activeIdx} className="h-full w-full object-cover" />
            <span className="solution-caption">{item.hudTag}</span>
          </div>)}
        </div>
      </div>
      <nav className="solution-mobile-pager" aria-label="Browse solutions">
        <button type="button" disabled={activeIdx === 0} aria-label={`Previous solution: ${SERVICES[Math.max(0, activeIdx - 1)].shortTitle}`}
          onClick={() => selectService(activeIdx - 1)}><ArrowLeft size={18} aria-hidden="true" /> Previous</button>
        <span>{activeIdx + 1} of {SERVICES.length}</span>
        <button type="button" disabled={activeIdx === SERVICES.length - 1} aria-label={`Next solution: ${SERVICES[Math.min(SERVICES.length - 1, activeIdx + 1)].shortTitle}`}
          onClick={() => selectService(activeIdx + 1)}>Next <ArrowRight size={18} aria-hidden="true" /></button>
      </nav>
      </div>
      </div>
    </section>
  );
};
