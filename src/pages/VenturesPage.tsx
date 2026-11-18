import React, { useState } from "react";
import { ArrowUpRight, Sparkles, ArrowRight } from "lucide-react";
import { SmartVideo } from "../components/SmartVideo";

interface VenturesPageProps {
  onOpenBooking: () => void;
}

const WEAVE_FLOW = [
  { step: "1", name: "Signal", desc: "Buyer demand" },
  { step: "2", name: "Visualize", desc: "AI co-design" },
  { step: "3", name: "Match", desc: "Smart factories" },
  { step: "4", name: "Fulfil", desc: "Direct delivery" },
];

const WEAVE_TRACKS = [
  {
    code: "Track 01",
    title: "Community Commerce",
    desc: "Connecting buyers, creators & verified suppliers.",
  },
  {
    code: "Track 02",
    title: "Smart Manufacturing",
    desc: "AI Visualizer → Spec Routing → Factory Fulfilment.",
  },
  {
    code: "Track 03",
    title: "Education × JobMatrix",
    desc: "Adaptive skills & industry placement pipelines.",
  },
];

const IP_PORTFOLIO = [
  "Community Commerce Engines",
  "Role-Based Agent Frameworks",
  "Omnichannel Pipeline Mesh",
  "Executive Intelligence Suites",
  "Campus Adaptive Learning IP",
  "Manufacturing Spec Routers",
  "AI Campus Builder Network",
];

export const VenturesPage: React.FC<VenturesPageProps> = ({
  onOpenBooking,
}) => {
  const [weaveStep, setWeaveStep] = useState(0);

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
      <div className="inner-content ventures-content">
        <section
          className="inner-section venture-visual-story"
          aria-labelledby="engines-title"
        >
          <div className="visual-section-heading">
            <h2 id="engines-title">
              Built to work.
              <br />
              <span className="font-editorial">Built to grow.</span>
            </h2>
            <p>Client systems today. Platforms for what comes next.</p>
          </div>
          <div className="venture-visual-pair">
            <a href="/solutions" className="venture-film-link">
              <SmartVideo
                src="/videos/rel-automation-ops.mp4"
                className="w-full h-full object-cover"
              />
              <div>
                <h3>Enterprise deployments</h3>
                <span>AI for real operational work</span>
                <ArrowUpRight size={24} aria-hidden="true" />
              </div>
            </a>
            <a
              href="https://quantumweaveai.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="venture-film-link"
            >
              <SmartVideo
                src="/videos/v11-tech-47051.mp4"
                className="w-full h-full object-cover"
              />
              <div>
                <h3>Platforms &amp; venture IP</h3>
                <span>Quantum Weave™ &amp; our ecosystem</span>
                <ArrowUpRight size={24} aria-hidden="true" />
              </div>
            </a>
          </div>
        </section>
        <section
          className="inner-section portfolio-section"
          aria-labelledby="portfolio-title"
        >
          <div className="inner-section-heading">
            <h2 id="portfolio-title">
              Our ecosystem
              <br />
              <span className="font-editorial">of intellectual property.</span>
            </h2>
            <p>Co-build strategic AI platforms with us.</p>
            <button className="inner-text-action" onClick={onOpenBooking}>
              Talk to the venture lab{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </button>
          </div>
          <ul className="portfolio-list">
            {IP_PORTFOLIO.map((item) => (
              <li key={item}>
                <button onClick={onOpenBooking} aria-label={`Discuss ${item}`}>
                  {item}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </section>
        <section
          className="inner-section campus-feature"
          aria-labelledby="campus-title"
        >
          <div className="inner-film">
            <SmartVideo
              src="/videos/hero-neural-globe.mp4"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 id="campus-title">
              AI Campus.
              <br />
              <span className="font-editorial">Ideas for builders.</span>
            </h2>
            <p>
              Insights for builders and institutions, across the BrandMint
              ecosystem.
            </p>
            <a
              className="inner-text-action"
              href="https://hybridai.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore AI Campus <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
