import React from "react";
import {
  ArrowUpRight,
  BookOpen,
  MessageSquare,
  HelpCircle,
  Database,
  Zap,
} from "lucide-react";
import { SmartVideo } from "../components/SmartVideo";

const ARTICLES = [
  {
    tag: "Business Automation",
    title: "Small Business Automation Ideas",
    summary:
      "Practical automation workflows that save hours and eliminate repetitive daily operations.",
    href: "https://brandmintai.io/small-business-automation-ideas/",
    icon: Zap,
  },
  {
    tag: "WhatsApp Systems",
    title: "WhatsApp Lead Follow-Up System",
    summary:
      "Respond faster, qualify enquiries automatically, and keep follow-ups consistent.",
    href: "https://brandmintai.io/whatsapp-lead-follow-up-system/",
    icon: MessageSquare,
  },
  {
    tag: "Executive Guide",
    title: "AI Business Automation FAQ",
    summary:
      "Clear answers on AI pilots, human oversight, CRM sync, and measurable ROI.",
    href: "https://brandmintai.io/ai-business-faq/",
    icon: HelpCircle,
  },
  {
    tag: "CRM Architecture",
    title: "Connect Website Leads to CRM",
    summary:
      "Route website and ad enquiries straight into your CRM and team WhatsApp.",
    href: "https://brandmintai.io/connect-website-leads-to-crm/",
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
      <div className="inner-content blog-content">
        <section
          className="inner-section featured-guide"
          aria-labelledby="featured-guide-title"
        >
          <div className="inner-film">
            <SmartVideo
              src="/videos/clean-ai-dev-screen.mp4"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 id="featured-guide-title">
              <a
                href={ARTICLES[0].href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ARTICLES[0].title}
              </a>
            </h2>
            <p>{ARTICLES[0].summary}</p>
            <a
              className="inner-text-action"
              href={ARTICLES[0].href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read ${ARTICLES[0].title}`}
            >
              Read the guide <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </section>
        <section
          className="inner-section guide-library"
          aria-labelledby="guides-title"
        >
          <h2 id="guides-title">
            More from
            <br />
            <span className="font-editorial">the field.</span>
          </h2>
          <div>
            {ARTICLES.slice(1).map((art) => (
              <article className="guide-row" key={art.href}>
                <p className="inner-meta">{art.tag}</p>
                <div>
                  <h3>
                    <a
                      href={art.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {art.title}
                      <ArrowUpRight size={20} aria-hidden="true" />
                    </a>
                  </h3>
                  <p>{art.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
