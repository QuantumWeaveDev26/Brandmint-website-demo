import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Network, CheckCircle2, TrendingUp, Users, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';
import { useMotionSettings } from './MotionSettings';
import { ProTiltCard } from './ProTiltCard';

interface WorkflowScenario {
  id: string;
  name: string;
  category: string;
  headline: string;
  icon: React.ElementType;
  latency: string;
  nodes: {
    tag: string;
    title: string;
    metric: string;
  }[];
}

const SCENARIOS: WorkflowScenario[] = [
  {
    id: 'grow-business',
    name: 'Grow My Business',
    category: 'Business Growth',
    headline: 'Turn interest into a relevant next step.',
    icon: TrendingUp,
    latency: 'AI Personalisation + CRM',
    nodes: [
      { tag: '01 • Context', title: 'Enquiry & Context', metric: 'Web, Meta & WhatsApp' },
      { tag: '02 • Personalise', title: 'Relevant AI Response', metric: 'Context-Aware Guidance' },
      { tag: '03 • Handoff', title: 'Human Sales Handoff', metric: 'Briefed Closer Ready' },
      { tag: '04 • Compound', title: 'Follow-Up & Learning', metric: 'Qualified Pipeline' },
    ],
  },
  {
    id: 'multiply-capacity',
    name: 'Multiply Team Capacity',
    category: 'Workforce Multiplier',
    headline: 'Give repetitive work a better workflow.',
    icon: Users,
    latency: 'Role-Based AI + Oversight',
    nodes: [
      { tag: '01 • Trigger', title: 'Recurring Task', metric: 'Sales, Support & Ops' },
      { tag: '02 • Execute', title: 'AI-Supported Execution', metric: 'Specialised AI Role' },
      { tag: '03 • Govern', title: 'Human Review & Exceptions', metric: 'Approval Checkpoint' },
      { tag: '04 • Deliver', title: 'Completed Work & Feedback', metric: 'Bandwidth Released' },
    ],
  },
  {
    id: 'executive-support',
    name: 'Free Up Leadership Time',
    category: 'Executive AI Support',
    headline: 'Walk into the meeting already prepared.',
    icon: Briefcase,
    latency: 'Executive AI Assistant',
    nodes: [
      { tag: '01 • Knowledge', title: 'Approved Context', metric: 'Enterprise Data Sources' },
      { tag: '02 • Synthesise', title: 'Concise Executive Brief', metric: 'Decisions & Risks Mapped' },
      { tag: '03 • Lead', title: 'Leader Decides', metric: 'People Retain Judgement' },
      { tag: '04 • Close Loop', title: 'Actions Tracked', metric: 'Faster Action Closure' },
    ],
  },
  {
    id: 'improve-learning',
    name: 'Improve Learning',
    category: 'Education & Institutions',
    headline: 'Support the next step for every learner.',
    icon: GraduationCap,
    latency: 'AI-First Institutions',
    nodes: [
      { tag: '01 • Diagnose', title: 'Learning Gap Identified', metric: 'Individual Learner Context' },
      { tag: '02 • Adapt', title: 'Targeted Practice Path', metric: 'Hyper-Personalised' },
      { tag: '03 • Empower', title: 'Feedback & Educator Insight', metric: 'Teacher Visibility' },
      { tag: '04 • Advance', title: 'Progress Review', metric: 'Academic Excellence' },
    ],
  },
];

export const WorkflowTransformationPlayground: React.FC = () => {
  const { paused } = useMotionSettings();
  const [playing, setPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement | null>(null);
  const inViewRef = useRef(false);
  const [tick, setTick] = useState(0);

  const scenarioIdx = Math.floor(tick / 5) % SCENARIOS.length;
  const activeStep = tick % 5;
  const current = SCENARIOS[scenarioIdx];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]) inViewRef.current = entries[0].isIntersecting;
      },
      { rootMargin: '160px 0px' }
    );
    obs.observe(el);

    if (!playing || paused) return () => obs.disconnect();
    const interval = setInterval(() => {
      if (inViewRef.current && !document.hidden) {
        setTick((t) => t + 1);
      }
    }, 3000);
    return () => {
      obs.disconnect();
      clearInterval(interval);
    };
  }, [playing, paused]);

  return (
    <section id="finder" ref={sectionRef} className="relative py-16 sm:py-20 px-4 max-w-6xl mx-auto w-full z-10 select-none">
      <div className="text-center mb-9">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#7265C2]/45 bg-[#160952]/80 text-xs font-medium text-[#CCC7F2] mb-3">
          <Network className="w-3.5 h-3.5 text-[#CCC7F2]" />
          <span>Opportunity Snapshot</span>
        </div>
        <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
          Where Could AI Make Your{' '}
          <span className="font-editorial text-3xl sm:text-[42px] text-aurora pr-1">Biggest Difference?</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#CCC7F2]/80 max-w-2xl mx-auto mt-2.5">
          Pick a goal. See how we deliver it.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
          {SCENARIOS.map((sc, idx) => {
            const Icon = sc.icon;
            const isSelected = idx === scenarioIdx;
            return (
              <button
                type="button"
                key={sc.id}
                aria-pressed={isSelected}
                onClick={() => { setPlaying(true); setTick(idx * 5); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-[13px] font-medium border transition-all cursor-pointer ${
                  isSelected
                    ? 'btn-aurora text-white border-transparent font-semibold'
                    : 'bg-[#160952]/80 text-[#CCC7F2] border-[#7265C2]/35 hover:border-[#CCC7F2]/65 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sc.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Ink Nocturne 3D Enterprise Opportunity Frame */}
      <div className="rounded-[30px] p-5 sm:p-8 glass-frame relative overflow-hidden">
        <div className="w-full h-2 bg-[#0A0224] rounded-full overflow-hidden mb-6 border border-[#7265C2]/25">
          <motion.div
            className="h-full bg-gradient-to-r from-[#312185] via-[#7265C2] to-[#CCC7F2]"
            animate={{ width: `${((activeStep + 1) / 5) * 100}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[#7265C2]/25 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-2.5 text-left">
            <span className="w-2.5 h-2.5 rounded-full bg-[#CCC7F2] animate-ping shrink-0" />
            <span className="font-semibold text-[#CCC7F2] uppercase tracking-wider text-xs">{current.category}:</span>
            <span className="font-semibold text-white">{current.headline}</span>
          </div>
          <span className="px-3.5 py-1 rounded-full bg-[#312185] border border-[#7265C2]/50 text-[#CCC7F2] font-semibold text-xs">
            {current.latency}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative items-stretch">
          {current.nodes.map((node, idx) => {
            const isLit = activeStep >= idx;
            const isCurrentPulse = activeStep === idx;
            return (
              <ProTiltCard
                key={node.tag}
                onClick={() => { setPlaying(false); setTick(scenarioIdx * 5 + idx); }}
                className={`h-full min-h-[172px] relative p-5 rounded-2xl flex flex-col justify-between transition-all cursor-pointer ${
                  isCurrentPulse
                    ? 'glass-card-active'
                    : isLit
                    ? 'bg-[#312185]/45 text-white border border-[#7265C2]/45'
                    : 'bg-[#120642]/70 text-[#CCC7F2]/65 border border-[#7265C2]/20'
                }`}
              >
                <div className="flex items-center justify-between pb-2.5 border-b border-[#7265C2]/20">
                  <span className="text-xs font-semibold text-[#CCC7F2]">
                    {node.tag}
                  </span>
                  {idx < 3 ? (
                    <ArrowRight className={`w-4 h-4 ${isCurrentPulse ? 'text-white' : 'text-[#7265C2]'}`} />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-[#CCC7F2]" />
                  )}
                </div>

                <h4 className="text-base sm:text-lg font-display font-bold tracking-tight text-left text-white my-3 min-h-[2.5rem] flex items-center">
                  {node.title}
                </h4>

                <div
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold text-left ${
                    isCurrentPulse
                      ? 'bg-[#CCC7F2]/20 text-white border-[#CCC7F2]/40'
                      : 'bg-[#0E0433]/80 border-[#7265C2]/30 text-[#CCC7F2]'
                  }`}
                >
                  {node.metric}
                </div>
              </ProTiltCard>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-[#7265C2]/25 flex flex-wrap items-center justify-between gap-2 text-xs text-[#CCC7F2]/75">
          <span className="flex items-center gap-1.5 font-medium text-[#CCC7F2]">
            <CheckCircle2 className="w-4 h-4 text-[#7265C2]" />
            01 Discover &rarr; 02 Design &rarr; 03 Pilot &rarr; 04 Multiply
          </span>
          <span className="font-semibold text-white">Human Judgement Retained</span>
        </div>
      </div>
    </section>
  );
};
