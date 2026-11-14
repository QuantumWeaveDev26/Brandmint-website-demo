import React, { useState } from 'react';
import { ArrowUpRight, Layers, Sparkles, ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';
import { ScrollStageTransform } from '../components/ScrollStageTransform';
import { ProTiltCard } from '../components/ProTiltCard';
import { SmartVideo } from '../components/SmartVideo';

interface VenturesPageProps {
  onOpenBooking: () => void;
}

const WEAVE_FLOW = [
  { step: '1', name: 'Signal', desc: 'Buyer demand' },
  { step: '2', name: 'Visualize', desc: 'AI co-design' },
  { step: '3', name: 'Match', desc: 'Smart factories' },
  { step: '4', name: 'Fulfil', desc: 'Direct delivery' },
];

const WEAVE_TRACKS = [
  { code: 'Track 01', title: 'Community Commerce', desc: 'Connecting buyers, creators & verified suppliers.' },
  { code: 'Track 02', title: 'Smart Manufacturing', desc: 'AI Visualizer → Spec Routing → Factory Fulfilment.' },
  { code: 'Track 03', title: 'Education × JobMatrix', desc: 'Adaptive skills & industry placement pipelines.' },
];

const IP_PORTFOLIO = [
  'Community Commerce Engines',
  'Role-Based Agent Frameworks',
  'Omnichannel Pipeline Mesh',
  'Executive Intelligence Suites',
  'Campus Adaptive Learning IP',
  'Manufacturing Spec Routers',
  'AI Campus Builder Network',
];

export const VenturesPage: React.FC<VenturesPageProps> = ({ onOpenBooking }) => {
  const [weaveStep, setWeaveStep] = useState(0);
  const [activeDivision, setActiveDivision] = useState<'now' | 'scale'>('scale');

  return (
    <div className="w-full pt-20 pb-8">
      {/* 1. Hero */}
      <section className="relative pt-12 pb-14 px-4 overflow-hidden bg-[#0A0224]">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#0A0224]">
          <SmartVideo
            src="/videos/v11-tech-47051.mp4"
            priority
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-[#0A0224]/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0224]/65 via-transparent to-[#0A0224]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#CCC7F2]/35 bg-[#120642]/92 text-xs font-medium text-[#CCC7F2] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#CCC7F2]" />
            <span>Incubated Platforms &bull; BrandMint AI Pvt. Ltd.</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.06]">
            BrandMint AI{' '}
            <span className="block font-editorial text-4xl sm:text-[54px] text-aurora leading-[1.04] py-0.5">
              Venture Holdings.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-[#F5F3FF]/90 max-w-xl mx-auto mt-2.5 leading-relaxed">
            Proprietary AI platforms, ecosystems, and intellectual property built to scale.
          </p>

          <div className="mt-8 rounded-2xl overflow-hidden glass-frame text-left bg-[#0E0433]/94">
            <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              <div className="lg:col-span-5 space-y-2.5">
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                  Quantum{' '}
                  <span className="font-editorial text-3xl sm:text-[38px] text-aurora pr-1">Weave™</span>
                </h2>
                <p className="text-xs text-[#CCC7F2]/85 leading-relaxed">
                  Connecting buyers, creators, institutions, and smart manufacturers in one AI loop.
                </p>
                <div className="pt-1 flex flex-wrap items-center gap-2">
                  <a
                    href="https://quantumweaveai.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full btn-aurora text-white font-semibold text-xs transition-all inline-flex items-center gap-1.5"
                  >
                    <span>Explore Quantum Weave</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="px-3.5 py-2 rounded-full bg-[#160952] border border-[#7265C2]/45 hover:bg-[#312185] text-[#CCC7F2] hover:text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    Partner Pilot
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-2.5 items-stretch">
                {WEAVE_FLOW.map((wf, idx) => {
                  const active = weaveStep === idx;
                  return (
                    <button
                      type="button"
                      key={wf.step}
                      aria-pressed={active}
                      onClick={() => setWeaveStep(idx)}
                      className={`h-full p-3.5 rounded-xl transition-all text-left flex flex-col justify-between gap-2 cursor-pointer ${
                        active ? 'glass-card-active' : 'glass-card'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-semibold pb-1.5 border-b border-[#7265C2]/25 w-full">
                        <span className="text-[#CCC7F2]">0{wf.step}</span>
                        <ArrowRight className="w-3 h-3 text-[#CCC7F2]" />
                      </div>
                      <div>
                        <div className="font-display text-sm font-bold text-white">{wf.name}</div>
                        <div className="text-[11px] text-[#CCC7F2]/80 mt-0.5">{wf.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#7265C2]/25 border-t border-[#7265C2]/30 bg-[#0A0224]/55">
              {WEAVE_TRACKS.map((tr) => (
                <div key={tr.code} className="p-4 sm:p-5 text-left">
                  <span className="text-[11px] font-semibold text-[#CCC7F2] block">{tr.code}</span>
                  <h4 className="font-display text-base font-bold text-white mt-0.5">{tr.title}</h4>
                  <p className="text-xs text-[#CCC7F2]/75 mt-0.5">{tr.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Dual-Engine Model */}
      <ScrollStageTransform>
        <section className="py-10 px-4 max-w-5xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 mb-6 border-b border-[#7265C2]/25">
            <div className="text-left">
              <span className="text-[11px] font-semibold text-[#CCC7F2] uppercase tracking-wider block mb-1">
                Dual-Engine Flywheel
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Client Systems.{' '}
                <span className="font-editorial text-3xl sm:text-[38px] text-aurora pr-1">Compounding Ventures.</span>
              </h2>
            </div>

            <div className="inline-flex bg-[#120642] p-1 rounded-full border border-[#7265C2]/35 self-start">
              <button
                type="button"
                onClick={() => setActiveDivision('now')}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeDivision === 'now' ? 'btn-aurora text-white' : 'text-[#CCC7F2] hover:text-white'
                }`}
              >
                Engine 1 &bull; Deployments
              </button>
              <button
                type="button"
                onClick={() => setActiveDivision('scale')}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeDivision === 'scale' ? 'btn-aurora text-white' : 'text-[#CCC7F2] hover:text-white'
                }`}
              >
                Engine 2 &bull; Platforms
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-stretch">
            <ProTiltCard
              maxTilt={4}
              onClick={() => setActiveDivision('now')}
              className={`h-full p-5 sm:p-6 rounded-2xl transition-all cursor-pointer text-left flex flex-col justify-between gap-4 ${
                activeDivision === 'now' ? 'glass-card-active' : 'glass-card'
              }`}
            >
              <div>
                <span className="text-[11px] text-[#CCC7F2] font-semibold block">Engine 01</span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                  Applied Enterprise Deployments
                </h3>
                <p className="text-xs text-[#CCC7F2]/85 mt-1 leading-relaxed">
                  Real-world operational deployments that solve live business friction and sharpen our architecture.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#7265C2]/25 text-xs font-medium text-white">
                {['Live Revenue Flows', 'Domain Context', 'Rapid Validation', 'Governance Proof'].map((it) => (
                  <div key={it} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#CCC7F2]" />
                    <span>{it}</span>
                  </div>
                ))}
              </div>
            </ProTiltCard>

            <ProTiltCard
              maxTilt={4}
              onClick={() => setActiveDivision('scale')}
              className={`h-full p-5 sm:p-6 rounded-2xl transition-all cursor-pointer text-left flex flex-col justify-between gap-4 ${
                activeDivision === 'scale' ? 'glass-card-active' : 'glass-card'
              }`}
            >
              <div>
                <span className="text-[11px] text-[#CCC7F2] font-semibold block">Engine 02</span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                  Platforms &amp; Venture IP
                </h3>
                <p className="text-xs text-[#CCC7F2]/85 mt-1 leading-relaxed">
                  Multi-sided platforms, institutional learning networks, and compounding IP.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#7265C2]/25 text-xs font-medium text-white">
                {['Quantum Weave™', 'JobMatrix', 'AI Campus', 'Proprietary IP'].map((it) => (
                  <div key={it} className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#CCC7F2]" />
                    <span>{it}</span>
                  </div>
                ))}
              </div>
            </ProTiltCard>
          </div>
        </section>
      </ScrollStageTransform>

      {/* 3. IP Portfolio + AI Campus */}
      <ScrollStageTransform>
        <section className="py-10 px-4 max-w-5xl mx-auto w-full">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 text-[11px] text-[#CCC7F2] font-semibold mb-1">
              <Layers className="w-3.5 h-3.5 text-[#7265C2]" />
              <span>Beyond Services</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Ecosystem{' '}
              <span className="font-editorial text-3xl sm:text-[38px] text-aurora pr-1">IP Portfolio.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch mb-8">
            {IP_PORTFOLIO.map((item, idx) => (
              <ProTiltCard
                key={item}
                maxTilt={3.5}
                onClick={onOpenBooking}
                className="h-full p-4 rounded-xl glass-card text-left flex items-center justify-between gap-2 cursor-pointer"
              >
                <div>
                  <span className="text-[10px] text-[#7265C2] font-semibold block">0{idx + 1}</span>
                  <h4 className="font-display text-sm font-bold text-white mt-0.5 leading-snug">{item}</h4>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-[#CCC7F2]" />
              </ProTiltCard>
            ))}

            <button
              type="button"
              onClick={onOpenBooking}
              className="h-full p-4 rounded-xl bg-[#312185]/45 hover:bg-[#312185]/70 border border-[#CCC7F2]/45 border-dashed text-left flex flex-col justify-center transition-colors cursor-pointer"
            >
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#CCC7F2]">
                <span>Venture Lab</span>
                <ArrowUpRight className="w-3 h-3" />
              </span>
              <span className="font-display text-xs font-semibold text-white mt-0.5 leading-snug">
                Co-build strategic AI platforms with us.
              </span>
            </button>
          </div>

          <div className="rounded-2xl p-5 sm:p-6 glass-frame flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
            <div className="space-y-0.5">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#CCC7F2]">
                <BookOpen className="w-3.5 h-3.5 text-[#CCC7F2]" />
                <span>Ecosystem Publication</span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                AI Campus — Insights for Builders &amp; Institutions
              </h3>
            </div>
            <a
              href="https://hybridai.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full btn-aurora text-white text-xs font-semibold inline-flex items-center gap-1.5 shrink-0 self-start sm:self-auto transition-all"
            >
              <span>Explore AI Campus</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>
      </ScrollStageTransform>
    </div>
  );
};
