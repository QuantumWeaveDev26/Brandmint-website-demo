import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, Search, Globe, MapPin, MessageSquare, Cpu, CheckCircle2, FileText, Calendar } from 'lucide-react';
import { ScrollStageTransform } from '../components/ScrollStageTransform';
import { ProTiltCard } from '../components/ProTiltCard';
import { SmartVideo } from '../components/SmartVideo';
import { SOLUTIONS_DROPDOWN } from '../components/MonoNavbar';

interface SolutionsPageProps {
  onOpenBooking: () => void;
}

const SOLUTION_AREAS = [
  {
    id: 'personalisation',
    num: '01',
    badge: 'Personalise',
    title: 'AI-Powered Personalisation',
    headline: 'Make every customer feel understood.',
    specs: [
      'Tailored Customer Journeys',
      'Multilingual Context Assistants',
      'Relevant Next-Step Handoffs',
    ],
  },
  {
    id: 'ai-integration',
    num: '02',
    badge: 'Connect',
    title: 'Enterprise AI Integration',
    headline: 'Make your systems work together.',
    specs: [
      'Approved Knowledge Sync',
      'CRM & WhatsApp Integration',
      'Human-Reviewed Updates',
    ],
  },
  {
    id: 'workforce-multiplier',
    num: '03',
    badge: 'Multiply',
    title: 'AI Workforce Multiplier',
    headline: 'Give your team more capacity.',
    specs: [
      'Role-Based AI Assistants',
      'Shared Context & Handoffs',
      'Escalation & Review Rules',
    ],
  },
  {
    id: 'workflow-automation',
    num: '04',
    badge: 'Automate',
    title: 'AI Workflow & Automation',
    headline: 'Keep work moving, end to end.',
    specs: [
      'Enquiry Routing & Follow-Up',
      'Automated Reporting Flows',
      'Exception Handling',
    ],
  },
  {
    id: 'executive-assistants',
    num: '05',
    badge: 'Empower Leaders',
    title: 'Executive AI Assistants',
    headline: 'Give leaders more room to lead.',
    specs: [
      'Pre-Meeting Leadership Briefs',
      'Research & Action Tracking',
      'Correspondence Drafts',
    ],
  },
  {
    id: 'education-institutions',
    num: '06',
    badge: 'Empower Learners',
    title: 'AI-First Institutions',
    headline: 'Help every learner move forward.',
    specs: [
      'Adaptive Practice Paths',
      'Educator Insights',
      'Institutional Workflows',
    ],
  },
];

const VISIBILITY_PILLARS = [
  { code: 'SEO', title: 'Search Authority', desc: 'High-intent organic rankings.', icon: Search },
  { code: 'AEO', title: 'AI Citations', desc: 'Cited inside AI assistants.', icon: Sparkles },
  { code: 'GEO', title: 'Generative Reach', desc: 'Regional AI search visibility.', icon: Globe },
  { code: 'GBP', title: 'Local Presence', desc: 'Verified profile authority.', icon: MapPin },
  { code: 'CRM', title: 'Channel Sync', desc: 'WhatsApp & web pipelines.', icon: MessageSquare },
  { code: 'SOP', title: 'AI Governance', desc: 'Human review checkpoints.', icon: Cpu },
];

export const SolutionsPage: React.FC<SolutionsPageProps> = ({ onOpenBooking }) => {
  const [hoveredPkg, setHoveredPkg] = useState<string>('workforce-multiplier');

  return (
    <div className="w-full pt-20 pb-8">
      {/* 1. Hero Stage */}
      <section className="relative pt-12 pb-14 px-4 overflow-hidden bg-[#0A0224]">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#0A0224]">
          <SmartVideo
            src="/videos/01-whatsapp-network.mp4"
            priority
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-[#0A0224]/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0224]/65 via-transparent to-[#0A0224]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#CCC7F2]/35 bg-[#120642]/92 text-xs font-medium text-[#CCC7F2] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#CCC7F2]" />
            <span>Enterprise AI Solutions &bull; Bengaluru</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.06]">
            Six Connected Areas.{' '}
            <span className="block font-editorial text-4xl sm:text-[54px] text-aurora leading-[1.04] py-0.5">
              Scoped Around Your Goals.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-[#F5F3FF]/90 max-w-xl mx-auto mt-2.5 leading-relaxed">
            Focused pilots shaped around your systems, approved knowledge, and measurable outcomes.
          </p>

          {/* Direct Product Suite Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {SOLUTIONS_DROPDOWN.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#120642]/90 hover:bg-[#312185] border border-[#7265C2]/40 text-xs font-semibold text-[#CCC7F2] hover:text-white transition-colors"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Balanced 6 Enterprise AI Solution Areas Grid */}
      <ScrollStageTransform>
        <section className="py-10 sm:py-12 px-4 w-full">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] font-semibold text-[#CCC7F2] uppercase tracking-wider block mb-1.5">
                Core Capabilities
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Enterprise{' '}
                <span className="font-editorial text-3xl sm:text-[38px] text-aurora pr-1">Solution Suite.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
              {SOLUTION_AREAS.map((sol) => {
                const isFeatured = hoveredPkg === sol.id;
                const waHref = `https://wa.me/919972965677?text=${encodeURIComponent(
                  `Hi BrandMint AI Bengaluru! We would like to explore ${sol.title} for our organisation.`
                )}`;
                return (
                  <ProTiltCard
                    key={sol.id}
                    maxTilt={4}
                    onClick={() => setHoveredPkg(sol.id)}
                    onMouseEnter={() => setHoveredPkg(sol.id)}
                    className={`h-full rounded-2xl p-5 flex flex-col justify-between transition-all ${
                      isFeatured ? 'glass-card-active' : 'glass-card'
                    }`}
                  >
                    <div className="relative z-20 flex flex-col flex-1 text-left">
                      <div className="flex items-center justify-between text-xs pb-3 mb-3 border-b border-[#7265C2]/25">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            isFeatured
                              ? 'bg-[#CCC7F2] text-[#0A0224] font-bold'
                              : 'bg-[#312185]/80 text-[#CCC7F2] border border-[#7265C2]/45'
                          }`}
                        >
                          {sol.badge}
                        </span>
                        <span className="text-[#CCC7F2]/75 font-semibold tabular-nums text-[11px]">
                          {sol.num}
                        </span>
                      </div>

                      <h3 className="font-display text-base sm:text-lg font-bold tracking-tight text-white leading-snug">
                        {sol.title}
                      </h3>

                      <p className="font-editorial text-base sm:text-lg text-[#CCC7F2] mt-0.5 mb-3 leading-snug">
                        {sol.headline}
                      </p>

                      <ul className="space-y-1.5 mb-4 mt-auto pt-3 border-t border-[#7265C2]/20">
                        {sol.specs.map((sp) => (
                          <li key={sp} className="flex items-start gap-2 text-xs font-medium text-white/90">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#CCC7F2] mt-0.5" />
                            <span>{sp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2.5 rounded-full font-semibold text-xs flex items-center justify-center gap-1.5 transition-all relative z-30 ${
                        isFeatured
                          ? 'bg-[#CCC7F2] text-[#0A0224] hover:bg-white shadow-md font-bold'
                          : 'btn-aurora text-white'
                      }`}
                    >
                      <span>Explore Solution</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </ProTiltCard>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollStageTransform>

      {/* 3. Visibility Stack + Briefing Strip */}
      <ScrollStageTransform>
        <section className="py-10 px-4 max-w-6xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 mb-6 border-b border-[#7265C2]/25">
            <div className="text-left">
              <span className="text-[11px] font-semibold text-[#CCC7F2] uppercase tracking-wider block mb-1">
                Growth Infrastructure
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Visibility, CRM &amp;{' '}
                <span className="font-editorial text-3xl sm:text-[38px] text-aurora pr-1">Governance.</span>
              </h2>
            </div>
            <button
              type="button"
              onClick={onOpenBooking}
              className="px-4 py-2 rounded-full btn-aurora text-white font-semibold text-xs inline-flex items-center gap-1.5 self-start transition-all cursor-pointer"
            >
              <span>Scope Custom Pilot</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 items-stretch mb-8">
            {VISIBILITY_PILLARS.map((v) => {
              const Icon = v.icon;
              return (
                <ProTiltCard
                  key={v.code}
                  maxTilt={4}
                  onClick={onOpenBooking}
                  className="h-full p-4 rounded-xl glass-card text-left flex flex-col justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[11px] font-semibold pb-2 border-b border-[#7265C2]/25 text-[#CCC7F2]">
                    <span>{v.code}</span>
                    <Icon className="w-3.5 h-3.5 text-[#7265C2]" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-white leading-snug">
                      {v.title}
                    </h4>
                    <p className="text-[11px] text-[#CCC7F2]/80 mt-1 leading-snug">
                      {v.desc}
                    </p>
                  </div>
                </ProTiltCard>
              );
            })}
          </div>

          <div className="rounded-2xl p-5 sm:p-6 glass-frame flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
            <div className="space-y-0.5">
              <span className="text-[11px] font-semibold text-[#CCC7F2] uppercase tracking-wider block">
                Executive Resources
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                Solutions Brief &amp; 30-Minute Discovery Call
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <a
                href="https://brandmint-connect.brandmintai.chatgpt.site/BrandMint_AI_Company_and_Solutions_Brief.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#160952] hover:bg-[#312185] border border-[#7265C2]/45 text-[#CCC7F2] hover:text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-[#CCC7F2]" />
                <span>Company Brief (PDF)</span>
              </a>
              <a
                href="https://calendly.com/team-brandmint/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full btn-aurora text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-all"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book 30-Min Call</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>
      </ScrollStageTransform>
    </div>
  );
};
