import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Sparkles,
  Search,
  Globe,
  MapPin,
  MessageSquare,
  Cpu,
  CheckCircle2,
  FileText,
  Calendar,
} from "lucide-react";
import { SmartVideo } from "../components/SmartVideo";
import { SOLUTIONS_DROPDOWN } from "../components/MonoNavbar";

interface SolutionsPageProps {
  onOpenBooking: () => void;
}

const SOLUTION_AREAS = [
  {
    id: "personalisation",
    num: "01",
    badge: "Personalise",
    title: "AI-Powered Personalisation",
    headline: "Make every customer feel understood.",
    specs: [
      "Tailored Customer Journeys",
      "Multilingual Context Assistants",
      "Relevant Next-Step Handoffs",
    ],
  },
  {
    id: "ai-integration",
    num: "02",
    badge: "Connect",
    title: "Enterprise AI Integration",
    headline: "Make your systems work together.",
    specs: [
      "Approved Knowledge Sync",
      "CRM & WhatsApp Integration",
      "Human-Reviewed Updates",
    ],
  },
  {
    id: "workforce-multiplier",
    num: "03",
    badge: "Multiply",
    title: "AI Workforce Multiplier",
    headline: "Give your team more capacity.",
    specs: [
      "Role-Based AI Assistants",
      "Shared Context & Handoffs",
      "Escalation & Review Rules",
    ],
  },
  {
    id: "workflow-automation",
    num: "04",
    badge: "Automate",
    title: "AI Workflow & Automation",
    headline: "Keep work moving, end to end.",
    specs: [
      "Enquiry Routing & Follow-Up",
      "Automated Reporting Flows",
      "Exception Handling",
    ],
  },
  {
    id: "executive-assistants",
    num: "05",
    badge: "Empower Leaders",
    title: "Executive AI Assistants",
    headline: "Give leaders more room to lead.",
    specs: [
      "Pre-Meeting Leadership Briefs",
      "Research & Action Tracking",
      "Correspondence Drafts",
    ],
  },
  {
    id: "education-institutions",
    num: "06",
    badge: "Empower Learners",
    title: "AI-First Institutions",
    headline: "Help every learner move forward.",
    specs: [
      "Adaptive Practice Paths",
      "Educator Insights",
      "Institutional Workflows",
    ],
  },
];

const VISIBILITY_PILLARS = [
  {
    code: "SEO",
    title: "Search Authority",
    desc: "High-intent organic rankings.",
    icon: Search,
  },
  {
    code: "AEO",
    title: "AI Citations",
    desc: "Cited inside AI assistants.",
    icon: Sparkles,
  },
  {
    code: "GEO",
    title: "Generative Reach",
    desc: "Regional AI search visibility.",
    icon: Globe,
  },
  {
    code: "GBP",
    title: "Local Presence",
    desc: "Verified profile authority.",
    icon: MapPin,
  },
  {
    code: "CRM",
    title: "Channel Sync",
    desc: "WhatsApp & web pipelines.",
    icon: MessageSquare,
  },
  {
    code: "SOP",
    title: "AI Governance",
    desc: "Human review checkpoints.",
    icon: Cpu,
  },
];

const SERVICE_MEDIA = [
  "/videos/pure-sol01-personalisation.mp4",
  "/videos/rel-crm-sync.mp4",
  "/videos/pure-sol03-workforce.mp4",
  "/videos/home-sol04-workflows.mp4",
  "/videos/rel-project-roadmap.mp4",
  "/videos/04-fullstack-code.mp4",
];

export const SolutionsPage: React.FC<SolutionsPageProps> = ({
  onOpenBooking,
}) => {
  const readServiceHash = () => {
    try {
      return SOLUTION_AREAS.findIndex(
        (service) =>
          service.id === decodeURIComponent(window.location.hash.slice(1)),
      );
    } catch {
      return -1;
    }
  };
  const [activeService, setActiveService] = useState(() =>
    Math.max(0, readServiceHash()),
  );
  useEffect(() => {
    const syncHash = () => {
      const index = readServiceHash();
      if (index < 0) return;
      setActiveService(index);
      requestAnimationFrame(() =>
        document
          .getElementById("services-title")
          ?.scrollIntoView({ block: "start" }),
      );
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);
  const selectedService = SOLUTION_AREAS[activeService];
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
      <div className="inner-content solutions-content">
        <section
          className="inner-section visual-services"
          aria-labelledby="services-title"
        >
          <div className="visual-section-heading">
            <h2 id="services-title">
              Less friction.
              <br />
              <span className="font-editorial">More possibility.</span>
            </h2>
            <p>Find the right AI for your next move.</p>
          </div>
          {SOLUTION_AREAS.map((sol) => (
            <span
              className="service-route-anchor"
              key={sol.id}
              id={sol.id}
              aria-hidden="true"
            />
          ))}
          <div
            className="service-switcher"
            role="tablist"
            aria-label="Explore AI solutions"
          >
            {SOLUTION_AREAS.map((sol, index) => (
              <button
                type="button"
                key={sol.id}
                id={`service-tab-${sol.id}`}
                role="tab"
                aria-selected={activeService === index}
                aria-controls="service-explorer-panel"
                tabIndex={activeService === index ? 0 : -1}
                onClick={() => setActiveService(index)}
                onKeyDown={(event) => {
                  const next =
                    event.key === "ArrowRight"
                      ? (index + 1) % 6
                      : event.key === "ArrowLeft"
                        ? (index + 5) % 6
                        : event.key === "Home"
                          ? 0
                          : event.key === "End"
                            ? 5
                            : null;
                  if (next === null) return;
                  event.preventDefault();
                  setActiveService(next);
                  document
                    .getElementById(`service-tab-${SOLUTION_AREAS[next].id}`)
                    ?.focus();
                }}
              >
                {sol.badge}
              </button>
            ))}
          </div>
          <div
            id="service-explorer-panel"
            className="service-explorer"
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={`service-tab-${selectedService.id}`}
          >
            <div className="service-explorer-media">
              {SERVICE_MEDIA.map((src, index) => (
                <div
                  className="service-visual-layer"
                  key={src}
                  data-active={activeService === index}
                  aria-hidden="true"
                >
                  <SmartVideo
                    src={src}
                    paused={activeService !== index}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="service-explorer-copy" key={selectedService.id}>
              <h3>{selectedService.title}</h3>
              <p className="font-editorial">{selectedService.headline}</p>
              <ul>
                {selectedService.specs.map((spec) => (
                  <li key={spec}>
                    <CheckCircle2 size={16} aria-hidden="true" />
                    {spec}
                  </li>
                ))}
              </ul>
              <a
                className="home-primary"
                href={`https://wa.me/919972965677?text=${encodeURIComponent(`Hi BrandMint AI Bengaluru! We would like to explore ${selectedService.title} for our organisation.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Discuss ${selectedService.title} on WhatsApp`}
              >
                Let's build this <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
        <section
          className="inner-section infrastructure-section"
          aria-labelledby="infrastructure-title"
        >
          <div className="inner-section-heading">
            <h2 id="infrastructure-title">
              Visibility, CRM
              <br />
              <span className="font-editorial">&amp; governance.</span>
            </h2>
            <button className="inner-text-action" onClick={onOpenBooking}>
              Scope a custom pilot <ArrowUpRight size={18} aria-hidden="true" />
            </button>
          </div>
          <dl className="infrastructure-list">
            {VISIBILITY_PILLARS.map((v) => (
              <div key={v.code}>
                <dt>
                  <span>{v.code}</span>
                  {v.title}
                </dt>
                <dd>{v.desc}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section
          className="inner-section resource-line"
          aria-label="Solutions resources"
        >
          <h2>
            Take the
            <br />
            <span className="font-editorial">next step.</span>
          </h2>
          <div>
            <a
              className="inner-text-action"
              href="https://brandmint-connect.brandmintai.chatgpt.site/BrandMint_AI_Company_and_Solutions_Brief.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText size={18} aria-hidden="true" /> Company brief (PDF){" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a
              className="home-primary"
              href="https://calendly.com/team-brandmint/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a 30-min call <Calendar size={18} aria-hidden="true" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
