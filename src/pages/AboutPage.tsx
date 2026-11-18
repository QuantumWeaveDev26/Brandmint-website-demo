import React from "react";
import {
  Boxes,
  Network,
  Cpu,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { SmartVideo } from "../components/SmartVideo";
import type { RoutePath } from "../components/MonoNavbar";

interface AboutPageProps {
  onOpenBooking: () => void;
  onNavigate: (path: RoutePath) => void;
}

const DIVISIONS = [
  {
    num: "01",
    title: "Enterprise AI Systems",
    tag: "Personalize",
    desc: "Personalized customer journeys, CRM & WhatsApp sync.",
    icon: Cpu,
  },
  {
    num: "02",
    title: "Workforce Multipliers",
    tag: "Multiply",
    desc: "Role-based AI assistants & executive briefs.",
    icon: Network,
  },
  {
    num: "03",
    title: "Ventures & Platforms",
    tag: "Incubation",
    desc: "Quantum Weave™, JobMatrix & AI Campus.",
    icon: Boxes,
  },
  {
    num: "04",
    title: "Proprietary IP",
    tag: "Frameworks",
    desc: "Repeatable AI blueprints & governance assets.",
    icon: TrendingUp,
  },
];

const AUDIENCES = [
  {
    name: "Enterprises & Mid-Market",
    focus: "AI integration & workforce multipliers",
  },
  {
    name: "Business Leaders & CXOs",
    focus: "Executive AI briefs & action closure",
  },
  { name: "AI-First Institutions", focus: "Adaptive learning & JobMatrix" },
  { name: "Growth & Revenue Teams", focus: "Personalized journeys & CRM sync" },
  { name: "Communities & Creators", focus: "Quantum Weave™ smart commerce" },
  { name: "Founders & Builders", focus: "AI Campus literacy & venture IP" },
];

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenBooking,
  onNavigate,
}) => {
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
            Personalized AI systems, connected workflows, and enduring venture IP from Bengaluru.
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
      <div className="inner-content about-content">
        <section
          className="inner-section leadership-section"
          aria-labelledby="leadership-title"
        >
          <div className="inner-section-heading">
            <h2 id="leadership-title">
              The people
              <br />
              <span className="font-editorial">behind the systems.</span>
            </h2>
          </div>
          <div className="leadership-profiles">
            <article>
              <p className="inner-meta">
                Founder &amp; CEO · 10+ Years Experience
              </p>
              <h3>Vishak B</h3>
              <p>
                Architects enterprise AI systems, connected CRM &amp; WhatsApp
                workflows, and scalable venture platforms.
              </p>
              <span className="profile-focus">
                Enterprise AI Strategy · Connected Systems
              </span>
            </article>
            <article>
              <p className="inner-meta">Co-Founder · 25+ Years Experience</p>
              <h3>Kaaranji Shreedhar</h3>
              <p>
                Shapes brand architecture, creative growth strategy, visual
                storytelling, and Quantum Weave™ ecosystems.
              </p>
              <span className="profile-focus">
                Brand Architecture · Venture IP
              </span>
            </article>
          </div>
        </section>
        <section
          className="inner-section open-split"
          aria-labelledby="divisions-title"
        >
          <div className="inner-section-heading">
            <h2 id="divisions-title">
              Four disciplines.
              <br />
              <span className="font-editorial">One connected team.</span>
            </h2>
            <button
              className="inner-text-action"
              onClick={() => onNavigate("/solutions")}
            >
              Explore AI solutions <ArrowUpRight size={18} aria-hidden="true" />
            </button>
          </div>
          <dl className="division-list">
            {DIVISIONS.map((div) => (
              <div key={div.num}>
                <dt>{div.title}</dt>
                <dd>{div.desc}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section
          className="inner-section about-purpose"
          aria-labelledby="purpose-title"
        >
          <div className="inner-film">
            <SmartVideo
              src="/videos/hero-neural-globe.mp4"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 id="purpose-title">
              Personalised AI.
              <br />
              <span className="font-editorial">Human judgement.</span>
            </h2>
            <p>
              Give teams, leaders, and learners more capacity through connected
              AI systems with human oversight.
            </p>
            <h3>An enduring AI ecosystem.</h3>
            <p>
              Connected AI operating systems, learning networks, and proprietary
              venture IP built to compound.
            </p>
            <p className="inner-meta">Human-reviewed AI · Outcomes over hype</p>
          </div>
        </section>
        <section
          className="inner-section partner-section"
          aria-labelledby="partners-title"
        >
          <h2 id="partners-title">
            Who we <span className="font-editorial">partner with.</span>
          </h2>
          <dl className="partner-list">
            {AUDIENCES.map((a) => (
              <div key={a.name}>
                <dt>{a.name}</dt>
                <dd>{a.focus}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
};
