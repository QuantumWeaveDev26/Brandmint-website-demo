import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
import { ScrollStageTransform } from '../components/ScrollStageTransform';
import { ProTiltCard } from '../components/ProTiltCard';
import { SmartVideo } from '../components/SmartVideo';

interface BusinessGrowthPageProps {
  onOpenBooking: () => void;
}

const DELIVERY_STAGES = [
  { num: '01', phase: 'Discover', title: 'Find the Friction', note: 'Pinpoint bottlenecks & lost enquiries.' },
  { num: '02', phase: 'Design', title: 'Shape the Solution', note: 'Architect AI roles & human checkpoints.' },
  { num: '03', phase: 'Pilot', title: 'Make It Useful', note: 'Validate speed, quality & adoption.' },
  { num: '04', phase: 'Multiply', title: 'Grow What Works', note: 'Scale proven flows across teams.' },
];

const SCAN_UNCOVERS = [
  {
    id: 'opportunities',
    question: 'Where enquiries & context get lost',
    fixTitle: 'AI Personalisation & CRM Sync',
    outcome: 'Every web, Meta & WhatsApp enquiry gets instant context and a briefed handoff.',
    nextStep: 'Personalisation & CRM Pilot',
  },
  {
    id: 'immediate',
    question: 'Which repetitive tasks drain capacity',
    fixTitle: 'AI Workforce Multiplier',
    outcome: 'Role-based AI assistants handle recurring work while teams retain oversight.',
    nextStep: 'Workforce & Workflow Pilot',
  },
  {
    id: 'leadership',
    question: 'How leaders walk into meetings prepared',
    fixTitle: 'Executive AI Chief-of-Staff',
    outcome: 'Automated pre-meeting briefs, decision logs, and action tracking.',
    nextStep: 'Executive AI Assistant Pilot',
  },
  {
    id: 'next-step',
    question: 'Your clearest 30-day AI roadmap',
    fixTitle: 'Quantum Growth Blueprint™',
    outcome: 'Prioritised pilot scope with clear governance and ROI metrics.',
    nextStep: '30-Minute Discovery Call',
  },
];

export const BusinessGrowthPage: React.FC<BusinessGrowthPageProps> = ({ onOpenBooking }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedLeak, setSelectedLeak] = useState(0);

  const currentLeak = SCAN_UNCOVERS[selectedLeak];

  return (
    <div className="w-full pt-20 pb-8">
      {/* 1. Hero Stage */}
      <section className="relative pt-12 pb-14 px-4 overflow-hidden bg-[#0A0224]">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#0A0224]">
          <SmartVideo
            src="/videos/rel-growth-hud.mp4"
            priority
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-[#0A0224]/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0224]/65 via-transparent to-[#0A0224]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#CCC7F2]/35 bg-[#120642]/92 text-xs font-medium text-[#CCC7F2] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#CCC7F2]" />
            <span>Enterprise Delivery &bull; Business Growth</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.06]">
            One Useful Win.{' '}
            <span className="block font-editorial text-4xl sm:text-[54px] text-aurora leading-[1.04] py-0.5">
              Then Build on It.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-[#F5F3FF]/90 max-w-xl mx-auto mt-2.5 leading-relaxed">
            Focused AI pilots with human oversight and measurable business outcomes.
          </p>

          <div className="mt-8 rounded-2xl overflow-hidden glass-frame text-left p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0E0433]/92">
            <p className="font-editorial text-xl sm:text-2xl max-w-xl leading-snug text-white">
              &ldquo;AI increases speed, relevance, and capacity — while your people retain judgement.&rdquo;
            </p>
            <button
              type="button"
              onClick={onOpenBooking}
              className="px-4 py-2.5 rounded-full btn-aurora text-white font-semibold text-xs transition-all inline-flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <span>Get Growth Scan™</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Four-Stage Delivery */}
      <ScrollStageTransform>
        <section className="py-10 sm:py-12 px-4 max-w-5xl mx-auto w-full">
          <div className="text-center mb-7">
            <span className="text-[11px] font-semibold text-[#CCC7F2] uppercase tracking-wider block mb-1">
              Execution Blueprint
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Four-Stage{' '}
              <span className="font-editorial text-3xl sm:text-[38px] text-aurora pr-1">Delivery Model.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-stretch">
            {DELIVERY_STAGES.map((item, idx) => {
              const active = idx === activeStep;
              return (
                <ProTiltCard
                  key={item.num}
                  maxTilt={4}
                  onClick={() => setActiveStep(idx)}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`h-full p-4 sm:p-5 rounded-2xl transition-all text-left flex flex-col justify-start gap-3 cursor-pointer ${
                    active ? 'glass-card-active' : 'glass-card'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] pb-2.5 border-b border-[#7265C2]/25">
                    <span className="font-bold text-[#CCC7F2]">{item.num} / {item.phase.toUpperCase()}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-white leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#CCC7F2]/80 mt-1 leading-relaxed">
                      {item.note}
                    </p>
                  </div>
                </ProTiltCard>
              );
            })}
          </div>
        </section>
      </ScrollStageTransform>

      {/* 3. Interactive Diagnostic */}
      <ScrollStageTransform>
        <section className="py-10 px-4 max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            <div className="lg:col-span-5 text-left space-y-2.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#312185] border border-[#7265C2]/50 text-[11px] text-[#CCC7F2] font-semibold">
                <Sparkles className="w-3 h-3" />
                <span>Diagnostic</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                Operational{' '}
                <span className="font-editorial text-3xl sm:text-[38px] text-aurora pr-1">Audit.</span>
              </h2>

              <div className="space-y-2 pt-1.5">
                {SCAN_UNCOVERS.map((leak, i) => (
                  <button
                    type="button"
                    key={leak.id}
                    onClick={() => setSelectedLeak(i)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      selectedLeak === i
                        ? 'btn-aurora text-white border-transparent'
                        : 'bg-[#120642]/85 text-[#CCC7F2] border-[#7265C2]/30 hover:border-[#CCC7F2]/60 hover:text-white'
                    }`}
                  >
                    <span>{leak.question}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <motion.div
                key={currentLeak.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProTiltCard maxTilt={3.5} className="rounded-2xl p-5 sm:p-6 glass-frame text-left space-y-4">
                  <div className="flex items-center justify-between text-xs border-b border-[#7265C2]/25 pb-3">
                    <span className="text-[#CCC7F2] font-semibold">Diagnostic Output</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#312185] border border-[#7265C2]/50 text-[#CCC7F2] font-semibold text-[11px]">
                      Tailored Pilot
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-[#CCC7F2]/70 font-medium block">
                      Recommended Architecture
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-bold mt-0.5 text-white">
                      {currentLeak.fixTitle}
                    </h3>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#312185]/55 border border-[#7265C2]/50 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#CCC7F2] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm font-medium text-white leading-relaxed">{currentLeak.outcome}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#7265C2]/25 relative z-30">
                    <div>
                      <span className="text-[11px] text-[#CCC7F2]/70 font-medium block">Next Step</span>
                      <span className="font-display text-xs sm:text-sm font-bold text-[#CCC7F2]">
                        {currentLeak.nextStep}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={onOpenBooking}
                      className="px-4 py-2 rounded-full btn-aurora text-white font-semibold text-xs transition-all inline-flex items-center gap-1.5 self-start cursor-pointer"
                    >
                      <span>Start Growth Scan™</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </ProTiltCard>
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollStageTransform>
    </div>
  );
};
