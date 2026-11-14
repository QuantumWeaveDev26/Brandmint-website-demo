import React from 'react';
import { ArrowUpRight, BookOpen, MessageSquare, HelpCircle, Database, Zap } from 'lucide-react';
import { ScrollStageTransform } from '../components/ScrollStageTransform';
import { ProTiltCard } from '../components/ProTiltCard';
import { SmartVideo } from '../components/SmartVideo';

const ARTICLES = [
  {
    tag: 'Business Automation',
    title: 'Small Business Automation Ideas',
    summary: 'Practical automation workflows that save hours and eliminate repetitive daily operations.',
    href: 'https://brandmintai.io/small-business-automation-ideas/',
    icon: Zap,
  },
  {
    tag: 'WhatsApp Systems',
    title: 'WhatsApp Lead Follow-Up System',
    summary: 'Respond faster, qualify enquiries automatically, and keep follow-ups consistent.',
    href: 'https://brandmintai.io/whatsapp-lead-follow-up-system/',
    icon: MessageSquare,
  },
  {
    tag: 'Executive Guide',
    title: 'AI Business Automation FAQ',
    summary: 'Clear answers on AI pilots, human oversight, CRM sync, and measurable ROI.',
    href: 'https://brandmintai.io/ai-business-faq/',
    icon: HelpCircle,
  },
  {
    tag: 'CRM Architecture',
    title: 'Connect Website Leads to CRM',
    summary: 'Route website and ad enquiries straight into your CRM and team WhatsApp.',
    href: 'https://brandmintai.io/connect-website-leads-to-crm/',
    icon: Database,
  },
];

export const BlogPage: React.FC = () => {
  return (
    <div className="w-full pt-20 pb-8">
      {/* Hero Banner with Dedicated Multi-Screen AI Workflow & Pipeline Video */}
      <section className="relative pt-12 pb-14 px-4 overflow-hidden bg-[#0A0224]">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#0A0224]">
          <SmartVideo
            src="/videos/clean-ai-dev-screen.mp4"
            priority
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-[#0A0224]/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0224]/65 via-transparent to-[#0A0224]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#CCC7F2]/35 bg-[#120642]/92 text-xs font-medium text-[#CCC7F2] mb-4">
            <BookOpen className="w-3.5 h-3.5 text-[#CCC7F2]" />
            <span>BrandMint AI Insights &amp; Playbooks</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.06]">
            Automation &amp; AI{' '}
            <span className="font-editorial text-4xl sm:text-[54px] text-aurora pr-1">
              Field Guides.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-[#F5F3FF]/90 max-w-xl mx-auto mt-2.5 leading-relaxed">
            Actionable blueprints on WhatsApp automation, CRM pipelines, and AI workflows.
          </p>
        </div>
      </section>

      {/* Balanced 2x2 Blog Playbooks Grid */}
      <ScrollStageTransform>
        <section className="py-10 px-4 max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-stretch">
            {ARTICLES.map((art) => {
              const Icon = art.icon;
              return (
                <ProTiltCard
                  key={art.href}
                  maxTilt={4}
                  className="h-full rounded-2xl p-5 glass-card flex flex-col justify-between gap-4 text-left"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs pb-3 mb-3 border-b border-[#7265C2]/25">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#312185]/80 border border-[#7265C2]/45 text-[#CCC7F2] font-semibold text-[11px]">
                        {art.tag}
                      </span>
                      <Icon className="w-4 h-4 text-[#CCC7F2]" />
                    </div>
                    <h2 className="font-display text-lg font-bold text-white leading-snug">
                      {art.title}
                    </h2>
                    <p className="text-xs text-[#CCC7F2]/80 mt-1.5 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  <a
                    href={art.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-full btn-aurora text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all relative z-20"
                  >
                    <span>Read Guide</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </ProTiltCard>
              );
            })}
          </div>
        </section>
      </ScrollStageTransform>
    </div>
  );
};
