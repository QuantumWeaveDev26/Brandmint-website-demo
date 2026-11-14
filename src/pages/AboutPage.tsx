import React, { useState } from 'react';
import { Boxes, Network, Cpu, TrendingUp, ArrowUpRight, Sparkles, Award } from 'lucide-react';
import { ScrollStageTransform } from '../components/ScrollStageTransform';
import { ProTiltCard } from '../components/ProTiltCard';
import { SmartVideo } from '../components/SmartVideo';
import type { RoutePath } from '../components/MonoNavbar';

interface AboutPageProps {
  onOpenBooking: () => void;
  onNavigate: (path: RoutePath) => void;
}

const DIVISIONS = [
  {
    num: '01',
    title: 'Enterprise AI Systems',
    tag: 'Personalise',
    desc: 'Personalised customer journeys, CRM & WhatsApp sync.',
    icon: Cpu,
  },
  {
    num: '02',
    title: 'Workforce Multipliers',
    tag: 'Multiply',
    desc: 'Role-based AI assistants & executive briefs.',
    icon: Network,
  },
  {
    num: '03',
    title: 'Ventures & Platforms',
    tag: 'Incubation',
    desc: 'Quantum Weave™, JobMatrix & AI Campus.',
    icon: Boxes,
  },
  {
    num: '04',
    title: 'Proprietary IP',
    tag: 'Frameworks',
    desc: 'Repeatable AI blueprints & governance assets.',
    icon: TrendingUp,
  },
];

const AUDIENCES = [
  { name: 'Enterprises & Mid-Market', focus: 'AI integration & workforce multipliers' },
  { name: 'Business Leaders & CXOs', focus: 'Executive AI briefs & action closure' },
  { name: 'AI-First Institutions', focus: 'Adaptive learning & JobMatrix' },
  { name: 'Growth & Revenue Teams', focus: 'Personalised journeys & CRM sync' },
  { name: 'Communities & Creators', focus: 'Quantum Weave™ smart commerce' },
  { name: 'Founders & Builders', focus: 'AI Campus literacy & venture IP' },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking, onNavigate }) => {
  const [activeDiv, setActiveDiv] = useState(0);

  return (
    <div className="w-full pt-20 pb-8">
      {/* 1. Hero Banner */}
      <section className="relative pt-12 pb-14 px-4 overflow-hidden bg-[#0A0224]">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#0A0224]">
          <SmartVideo
            src="/videos/05-ai-cinema-earth.mp4"
            priority
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-[#0A0224]/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0224]/65 via-transparent to-[#0A0224]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#CCC7F2]/35 bg-[#120642]/92 text-xs font-medium text-[#CCC7F2] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#CCC7F2]" />
            <span>BrandMint AI Pvt. Ltd. &bull; Bengaluru</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.06]">
            Engineered Around People.{' '}
            <span className="block font-editorial text-4xl sm:text-[54px] text-aurora leading-[1.04] py-0.5">
              Built for Enterprise Scale.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-[#F5F3FF]/90 max-w-xl mx-auto mt-2.5 leading-relaxed">
            Personalised AI systems, connected workflows, and enduring venture IP from Bengaluru.
          </p>

          <div className="mt-8 rounded-2xl overflow-hidden glass-frame text-left p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0E0433]/94">
            <div>
              <span className="text-[11px] font-semibold text-[#CCC7F2] uppercase tracking-wider block mb-0.5">
                Philosophy
              </span>
              <p className="font-editorial text-xl sm:text-2xl text-white max-w-xl leading-snug">
                &ldquo;Your ambition shouldn&apos;t be limited by your team&apos;s bandwidth.&rdquo;
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenBooking}
              className="px-4 py-2.5 rounded-full btn-aurora text-white font-semibold text-xs transition-all inline-flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <span>Scope a Pilot</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Balanced Executive Leadership Cards */}
      <ScrollStageTransform>
        <section className="py-10 sm:py-12 px-4 max-w-5xl mx-auto w-full">
          <div className="text-center mb-7">
            <span className="text-[11px] font-semibold text-[#CCC7F2] uppercase tracking-wider block mb-1.5">
              Founding Leadership
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Proven Leadership &amp;{' '}
              <span className="font-editorial text-3xl sm:text-[38px] text-aurora pr-1">Domain Depth.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-stretch">
            {/* Vishak B */}
            <ProTiltCard maxTilt={4} className="h-full p-5 sm:p-6 rounded-2xl glass-card-active flex flex-col justify-between gap-4 text-left">
              <div className="flex items-start justify-between gap-3 relative z-20">
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="inline-block px-3 py-0.5 rounded-full bg-[#CCC7F2] text-[#0A0224] text-[11px] font-bold">
                      Founder &amp; CEO
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#160952] border border-[#CCC7F2]/40 text-[11px] font-semibold text-white">
                      <Award className="w-3 h-3 text-[#CCC7F2]" />
                      <span>10+ Years Experience</span>
                    </span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
                    Vishak B
                  </h3>
                  <p className="text-xs text-[#CCC7F2]/90 leading-relaxed">
                    Architects enterprise AI systems, connected CRM &amp; WhatsApp workflows, and scalable venture platforms.
                  </p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-[#160952] border border-[#CCC7F2]/40 text-white font-display font-bold text-sm flex items-center justify-center shrink-0">
                  VB
                </div>
              </div>
              <div className="pt-3 border-t border-[#CCC7F2]/20 text-[11px] font-semibold text-[#CCC7F2] relative z-20">
                Enterprise AI Strategy &bull; Connected Systems
              </div>
            </ProTiltCard>

            {/* Kaaranji Shreedhar */}
            <ProTiltCard maxTilt={4} className="h-full p-5 sm:p-6 rounded-2xl glass-frame flex flex-col justify-between gap-4 text-left">
              <div className="flex items-start justify-between gap-3 relative z-20">
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="inline-block px-3 py-0.5 rounded-full bg-[#312185] border border-[#7265C2]/55 text-[11px] font-semibold text-[#CCC7F2]">
                      Co-Founder
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#312185]/85 border border-[#CCC7F2]/40 text-[11px] font-semibold text-white">
                      <Award className="w-3 h-3 text-[#CCC7F2]" />
                      <span>25+ Years Experience</span>
                    </span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
                    Kaaranji Shreedhar
                  </h3>
                  <p className="text-xs text-[#CCC7F2]/85 leading-relaxed">
                    Shapes brand architecture, creative growth strategy, visual storytelling, and Quantum Weave™ ecosystems.
                  </p>
                </div>
                <div className="w-11 h-11 rounded-xl btn-aurora text-white font-display font-bold text-sm flex items-center justify-center shrink-0">
                  KS
                </div>
              </div>
              <div className="pt-3 border-t border-[#7265C2]/25 text-[11px] font-semibold text-[#CCC7F2] relative z-20">
                Brand Architecture &bull; Venture IP
              </div>
            </ProTiltCard>
          </div>
        </section>
      </ScrollStageTransform>

      {/* 3. Four Core Divisions */}
      <ScrollStageTransform>
        <section className="py-10 px-4 max-w-5xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 mb-6 border-b border-[#7265C2]/25">
            <div className="text-left">
              <span className="text-[11px] font-semibold text-[#CCC7F2] uppercase tracking-wider block mb-1">
                Corporate Structure
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Four Core{' '}
                <span className="font-editorial text-3xl sm:text-[38px] text-aurora pr-1">Divisions.</span>
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/solutions')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#160952] border border-[#7265C2]/45 hover:bg-[#312185] text-[#CCC7F2] hover:text-white text-xs font-semibold transition-all self-start cursor-pointer"
            >
              <span>Explore AI Solutions</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-stretch">
            {DIVISIONS.map((div, idx) => {
              const Icon = div.icon;
              const active = activeDiv === idx;
              return (
                <ProTiltCard
                  key={div.num}
                  maxTilt={4}
                  onClick={() => setActiveDiv(idx)}
                  onMouseEnter={() => setActiveDiv(idx)}
                  className={`h-full p-4 sm:p-5 rounded-2xl transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    active ? 'glass-card-active' : 'glass-card'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] pb-2.5 border-b border-[#7265C2]/25">
                    <span className="text-[#CCC7F2] font-semibold">{div.tag}</span>
                    <Icon className="w-4 h-4 text-[#CCC7F2]" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-display text-base font-bold text-white leading-snug">
                      {div.title}
                    </h3>
                    <p className="text-xs text-[#CCC7F2]/80 mt-1 leading-relaxed">
                      {div.desc}
                    </p>
                  </div>
                </ProTiltCard>
              );
            })}
          </div>
        </section>
      </ScrollStageTransform>

      {/* 4. Mission, Vision & Partner Segments */}
      <ScrollStageTransform>
        <section className="py-10 px-4 max-w-5xl mx-auto w-full space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-stretch">
            <ProTiltCard maxTilt={4} className="h-full rounded-2xl p-5 sm:p-6 glass-frame flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-[#7265C2]/25">
                  <span className="text-[11px] px-3 py-0.5 rounded-full bg-[#312185] border border-[#7265C2]/50 text-[#CCC7F2] font-semibold">
                    Our Mission
                  </span>
                  <span className="text-[11px] text-[#CCC7F2]/70 font-semibold">01 &bull; Everyday Value</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                  Personalised AI &amp;{' '}
                  <span className="font-editorial text-2xl sm:text-[30px] text-aurora">Human Leverage.</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#CCC7F2]/85 mt-2 leading-relaxed">
                  Give teams, leaders, and learners more capacity through connected AI systems with human oversight.
                </p>
              </div>
              <div className="pt-3.5 mt-4 border-t border-[#7265C2]/25 text-[11px] font-semibold text-[#CCC7F2] flex items-center justify-between">
                <span>Human-Reviewed AI</span>
                <span className="text-white/80">Outcomes Over Hype</span>
              </div>
            </ProTiltCard>

            <div className="h-full rounded-2xl overflow-hidden glass-frame flex flex-col justify-between text-left">
              <div className="relative w-full aspect-video bg-[#0E0433] overflow-hidden border-b border-[#7265C2]/30">
                <SmartVideo
                  src="/videos/hero-neural-globe.mp4"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0224]/65 via-transparent to-transparent" />
                <div className="relative z-10 p-3.5 flex items-center justify-between">
                  <span className="text-[11px] px-3 py-0.5 rounded-full bg-[#0E0433]/90 border border-[#7265C2]/45 text-[#CCC7F2] font-semibold">
                    Our Vision
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#0E0433]/85 border border-[#7265C2]/35 text-[#CCC7F2] font-semibold">
                    02 &bull; Enduring Scale
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                  An Enduring{' '}
                  <span className="font-editorial text-2xl sm:text-[30px] text-aurora">AI Ecosystem.</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#CCC7F2]/85 mt-1.5 leading-relaxed">
                  Connected AI operating systems, learning networks, and proprietary venture IP built to compound.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl glass-frame overflow-hidden">
            <div className="px-5 py-3 border-b border-[#7265C2]/25 flex flex-wrap items-center justify-between gap-2 bg-[#120642]/85">
              <span className="font-display text-base sm:text-lg font-bold text-white">
                Who We Partner With
              </span>
              <span className="text-[11px] font-semibold text-[#CCC7F2]">
                Businesses &bull; Leaders &bull; Institutions
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#7265C2]/20">
              {AUDIENCES.map((a, idx) => (
                <div key={a.name} className="p-4 text-left border-b border-[#7265C2]/20 last:border-b-0">
                  <span className="text-[10px] font-semibold text-[#7265C2] block">0{idx + 1}</span>
                  <h4 className="font-display text-sm font-bold text-white mt-0.5">{a.name}</h4>
                  <p className="text-xs text-[#CCC7F2]/75 mt-0.5">{a.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollStageTransform>
    </div>
  );
};
