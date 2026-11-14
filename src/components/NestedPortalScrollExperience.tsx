import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Zap, Bot, Layers, Film, TrendingUp, GraduationCap, CheckCircle2 } from 'lucide-react';

interface ServiceDefinition {
  id: string;
  badge: string;
  title: string;
  serviceBullet: string;
  description: string;
  specs: { label: string; val: string }[];
  ctaText: string;
  ctaLink: string;
  icon: React.ElementType;
  accentColor: string;
  // Specific visual component for this service
  renderVisual: () => React.ReactNode;
  // Visual of the next service to display inside the portal
  nextServiceTitle: string;
  nextServiceTag: string;
  renderNextVisualPreview: () => React.ReactNode;
}

// 1. WhatsApp CRM Visual
const WhatsAppVisual: React.FC = () => (
  <div className="w-full h-full bg-[#080808] rounded-2xl p-4 sm:p-6 border border-white/15 flex flex-col justify-between font-mono relative overflow-hidden">
    <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#00f5d4] animate-pulse" />
        <span className="font-bold text-white uppercase tracking-wider">Meta Cloud API v20 Gateway</span>
      </div>
      <span className="text-[#00f5d4] font-bold">2.8s SLA</span>
    </div>

    {/* Live Chat Cards */}
    <div className="space-y-3 my-auto text-left font-['Space_Grotesk']">
      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/90 max-w-[85%]">
        <div className="text-[10px] font-mono text-white/50 mb-1">INBOUND LEAD • AD ATTRIBUTION</div>
        <p>"Need to qualify 2,000+ monthly leads and sync directly with HubSpot without manual data entry."</p>
      </div>

      <div className="p-3.5 rounded-xl bg-white text-black text-xs font-medium ml-auto max-w-[85%] shadow-lg">
        <div className="text-[10px] font-mono text-black/60 mb-1 flex items-center justify-between">
          <span>BRANDMINT AUTONOMOUS AI</span>
          <span className="text-[#00c49f] font-bold">✓✓ QUALIFIED</span>
        </div>
        <p>"Synced. Lead score calculated at 96/100. Deal created in HubSpot Pipeline and calendar slot reserved."</p>
      </div>
    </div>

    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[11px] text-white/60">
      <span>Conversion Lift: <strong className="text-white">4.8x Higher</strong></span>
      <span>CRM Webhooks: <strong className="text-white">HubSpot, Zoho, Shopify</strong></span>
    </div>
  </div>
);

// 2. AI Agents Visual
const AIAgentsVisual: React.FC = () => (
  <div className="w-full h-full bg-[#080808] rounded-2xl p-4 sm:p-6 border border-white/15 flex flex-col justify-between font-mono relative overflow-hidden">
    <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
        <span className="font-bold text-white uppercase tracking-wider">Multi-Agent Fleet Supervisor</span>
      </div>
      <span className="text-white font-bold">99.9% Uptime</span>
    </div>

    {/* Agent Nodes Grid */}
    <div className="grid grid-cols-2 gap-2.5 my-auto text-left">
      <div className="p-3 rounded-xl bg-[#111111] border border-white/10 space-y-1">
        <div className="flex justify-between items-center text-[10px] text-white/50">
          <span>AGENT 01 • TRIAGE</span>
          <span className="text-[#00f5d4]">ACTIVE</span>
        </div>
        <div className="text-xs font-bold text-white">Inbound Lead Resolver</div>
        <div className="text-[10px] text-white/60 font-mono">1.2s avg resolution</div>
      </div>

      <div className="p-3 rounded-xl bg-[#111111] border border-white/10 space-y-1">
        <div className="flex justify-between items-center text-[10px] text-white/50">
          <span>AGENT 02 • DATABASE</span>
          <span className="text-[#00f5d4]">ACTIVE</span>
        </div>
        <div className="text-xs font-bold text-white">Postgres & Vector Sync</div>
        <div className="text-[10px] text-white/60 font-mono">0ms latency drift</div>
      </div>

      <div className="p-3 rounded-xl bg-[#111111] border border-white/10 space-y-1">
        <div className="flex justify-between items-center text-[10px] text-white/50">
          <span>AGENT 03 • SOP EXEC</span>
          <span className="text-[#00f5d4]">ACTIVE</span>
        </div>
        <div className="text-xs font-bold text-white">Full-Stack Automation</div>
        <div className="text-[10px] text-white/60 font-mono">Autonomous API calls</div>
      </div>

      <div className="p-3 rounded-xl bg-[#111111] border border-white/10 space-y-1">
        <div className="flex justify-between items-center text-[10px] text-white/50">
          <span>AGENT 04 • SECURITY</span>
          <span className="text-[#00f5d4]">ACTIVE</span>
        </div>
        <div className="text-xs font-bold text-white">256-bit Guardrails</div>
        <div className="text-[10px] text-white/60 font-mono">Zero hallucination SLA</div>
      </div>
    </div>

    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[11px] text-white/60">
      <span>Fleet Throughput: <strong className="text-white">24/7 Zero Fatigue</strong></span>
      <span>Architecture: <strong className="text-white">Custom LLMs & LangGraph</strong></span>
    </div>
  </div>
);

// 3. Quantum Weave Visual
const QuantumWeaveVisual: React.FC = () => (
  <div className="w-full h-full bg-[#080808] rounded-2xl p-4 sm:p-6 border border-white/15 flex flex-col justify-between font-mono relative overflow-hidden">
    <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#00f5d4] animate-pulse" />
        <span className="font-bold text-white uppercase tracking-wider">Quantum Weave™ Loom Grid</span>
      </div>
      <span className="text-[#00f5d4] font-bold">14 Partner Mills</span>
    </div>

    {/* Supply Chain Telemetry */}
    <div className="my-auto space-y-2.5 text-left">
      <div className="p-3 rounded-xl bg-[#111111] border border-white/10 flex items-center justify-between">
        <div>
          <div className="text-[10px] text-white/50 uppercase">Tirupur Cluster #01</div>
          <div className="text-xs font-bold text-white font-['Space_Grotesk']">320 GSM Bio-Washed Apparel</div>
        </div>
        <span className="px-2.5 py-1 rounded bg-white text-black font-bold text-[10px]">
          Capacity: 94%
        </span>
      </div>

      <div className="p-3 rounded-xl bg-[#111111] border border-white/10 flex items-center justify-between">
        <div>
          <div className="text-[10px] text-white/50 uppercase">Bengaluru Smart Loom #04</div>
          <div className="text-xs font-bold text-white font-['Space_Grotesk']">Embroidery & Precision Weaving</div>
        </div>
        <span className="px-2.5 py-1 rounded bg-[#00f5d4] text-black font-bold text-[10px]">
          6-Day Turnaround
        </span>
      </div>

      <div className="p-2.5 rounded-lg bg-black border border-white/10 text-[10px] text-white/70 flex justify-between">
        <span>Units Algorithmically Routed: <strong className="text-white">14,000+</strong></span>
        <span>Dynamic Pricing SLA: <strong className="text-white">&lt; 1.4s</strong></span>
      </div>
    </div>

    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[11px] text-white/60">
      <span>Venture Program: <strong className="text-white">Direct-to-Factory</strong></span>
      <span>Automated ERP: <strong className="text-white">Instant PO Generation</strong></span>
    </div>
  </div>
);

// 4. AI Film Making Visual
const AIFilmVisual: React.FC = () => (
  <div className="w-full h-full bg-[#080808] rounded-2xl p-4 sm:p-6 border border-white/15 flex flex-col justify-between font-mono relative overflow-hidden">
    <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="font-bold text-white uppercase tracking-wider">Cinematic Virtual Production</span>
      </div>
      <span className="text-white font-bold">2.39:1 Anamorphic</span>
    </div>

    {/* Film Timeline & Waveform */}
    <div className="my-auto space-y-3 text-left">
      <div className="aspect-[2.39/1] rounded-xl overflow-hidden border border-white/20 bg-black relative flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-zinc-900 to-black opacity-90" />
        <div className="relative z-10 text-center font-['Space_Grotesk']">
          <Film className="w-7 h-7 text-white mx-auto mb-1.5 opacity-80" />
          <span className="font-bold text-xs uppercase tracking-widest text-white block">
            Synthetic Cinema Master 4K
          </span>
          <span className="text-[10px] font-mono text-white/50">
            60 FPS • Neural Diffusion Lighting
          </span>
        </div>
      </div>

      {/* Render Progress Strip */}
      <div className="p-2.5 rounded-lg bg-[#111111] border border-white/10 flex justify-between items-center text-[10px]">
        <span className="text-white/60">Production Timeline: <strong className="text-white">7 Calendar Days</strong></span>
        <span className="text-[#00f5d4] font-bold">Hollywood Grade</span>
      </div>
    </div>

    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[11px] text-white/60">
      <span>Visual Commercials: <strong className="text-white">Maximum Attention ROI</strong></span>
      <span>Delivery: <strong className="text-white">4K ProRes Master</strong></span>
    </div>
  </div>
);

// 5. Performance Marketing Visual
const PerformanceVisual: React.FC = () => (
  <div className="w-full h-full bg-[#080808] rounded-2xl p-4 sm:p-6 border border-white/15 flex flex-col justify-between font-mono relative overflow-hidden">
    <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#00f5d4] animate-pulse" />
        <span className="font-bold text-white uppercase tracking-wider">Cashflow Copy™ Growth Telemetry</span>
      </div>
      <span className="text-[#00f5d4] font-bold">4.8x Conversion Lift</span>
    </div>

    {/* Metrics Funnel */}
    <div className="my-auto space-y-2.5 text-left">
      <div className="p-3 rounded-xl bg-[#111111] border border-white/10 space-y-1">
        <div className="flex justify-between text-[10px] text-white/50 uppercase">
          <span>Ad-to-WhatsApp Funnel</span>
          <span className="text-[#00f5d4]">0% Form Fatigue</span>
        </div>
        <div className="w-full bg-black h-2 rounded-full overflow-hidden border border-white/10">
          <div className="bg-white h-full rounded-full" style={{ width: '92%' }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="p-2.5 rounded-xl bg-black border border-white/10">
          <span className="text-[10px] text-white/40 uppercase block">Legacy Web Form</span>
          <span className="text-sm font-bold text-white/60 line-through">72% Drop-off</span>
        </div>
        <div className="p-2.5 rounded-xl bg-white text-black font-bold">
          <span className="text-[10px] text-black/60 uppercase block">BrandMint Funnel</span>
          <span className="text-sm">4.8x Verified Lift</span>
        </div>
      </div>
    </div>

    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[11px] text-white/60">
      <span>Methodology: <strong className="text-white">Direct-Response Systems</strong></span>
      <span>ROAS Optimization: <strong className="text-white">Meta Cloud Engine</strong></span>
    </div>
  </div>
);

// 6. Learning Opportunities (IGR Academy) Visual
const AcademyVisual: React.FC = () => (
  <div className="w-full h-full bg-[#080808] rounded-2xl p-4 sm:p-6 border border-white/15 flex flex-col justify-between font-mono relative overflow-hidden">
    <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="font-bold text-white uppercase tracking-wider">IGR Academy & Appu AI Sprint</span>
      </div>
      <span className="text-white font-bold">5-Day Intensive</span>
    </div>

    {/* Curriculum & Certification */}
    <div className="my-auto space-y-2.5 text-left">
      <div className="p-3 rounded-xl bg-[#111111] border border-white/10 space-y-1">
        <div className="text-[10px] text-white/50 uppercase">EXECUTIVE APPLIED CURRICULUM</div>
        <div className="text-xs font-bold text-white font-['Space_Grotesk']">
          Day 1-2: Architecture & Custom LLM Orchestration
        </div>
        <div className="text-xs font-bold text-[#00f5d4] font-['Space_Grotesk']">
          Day 3-5: Live Production WhatsApp Agent Deployment
        </div>
      </div>

      <div className="p-2.5 rounded-lg bg-black border border-white/10 flex items-center justify-between text-[11px]">
        <span className="text-white/70">Led by Founder <strong className="text-white">Kaaranji Shreedhar</strong></span>
        <span className="px-2 py-0.5 rounded bg-white text-black font-bold text-[10px]">Bengaluru HQ</span>
      </div>
    </div>

    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[11px] text-white/60">
      <span>Sprint Outcome: <strong className="text-white">Live Production AI Stack</strong></span>
      <span>Certification: <strong className="text-white">Autonomous AI Operator</strong></span>
    </div>
  </div>
);

const SERVICES: ServiceDefinition[] = [
  {
    id: 'whatsapp-crm',
    badge: 'CORE SERVICE 01 • LEAD GENERATION',
    title: 'WhatsApp-led Lead Gen & CRM',
    serviceBullet: 'Automate client onboarding, lead qualification, and instant follow-ups.',
    description: 'We replace high-friction 7-field web forms with 2.8-second conversational WhatsApp pipelines connected directly to Meta Cloud API and your CRM.',
    specs: [
      { label: 'Response SLA', val: '2.8 Seconds' },
      { label: 'Conversion Lift', val: '4.8x Higher' },
      { label: 'CRM Sync', val: 'HubSpot, Zoho, Shopify' },
    ],
    ctaText: 'Deploy WhatsApp CRM',
    ctaLink: 'https://wa.me/919972965677?text=Deploy%20WhatsApp%20Lead%20Gen%20and%20CRM',
    icon: Zap,
    accentColor: '#00f5d4',
    renderVisual: () => <WhatsAppVisual />,
    nextServiceTitle: 'AI Agent Operations & Full Stack AI',
    nextServiceTag: 'SERVICE 02 • MULTI-AGENT FLEET',
    renderNextVisualPreview: () => <AIAgentsVisual />,
  },
  {
    id: 'ai-agents',
    badge: 'CORE SERVICE 02 • AUTONOMOUS AGENTS',
    title: 'AI Agent Operations & Full Stack AI',
    serviceBullet: 'Deploy custom autonomous agents for customer support, intake, and scheduling.',
    description: 'Custom-trained autonomous code and triage agents that manage databases, resolve inquiries, and execute enterprise SOPs 24/7 without delays or human fatigue.',
    specs: [
      { label: 'Fleet Reliability', val: '99.9% Continuous' },
      { label: 'Execution', val: '1.4 Seconds' },
      { label: 'Architecture', val: 'Full Stack AI & Custom LLMs' },
    ],
    ctaText: 'Deploy Agent Fleet',
    ctaLink: 'https://wa.me/919972965677?text=Deploy%20AI%20Agent%20Operations',
    icon: Bot,
    accentColor: '#ffffff',
    renderVisual: () => <AIAgentsVisual />,
    nextServiceTitle: 'Business Process Automation & Quantum Weave™',
    nextServiceTag: 'SERVICE 03 • SUPPLY CHAIN OPS',
    renderNextVisualPreview: () => <QuantumWeaveVisual />,
  },
  {
    id: 'process-automation',
    badge: 'CORE SERVICE 03 • INFRASTRUCTURE & SUPPLY CHAIN',
    title: 'Business Process Automation & Quantum Weave™',
    serviceBullet: 'Eliminate manual data transfers and repetitive operations. Community commerce & smart loom orchestration.',
    description: 'Quantum Weave connects buyers, creators, and institutions directly with 14 pre-vetted textile mills across Tirupur and Bengaluru through automated quote engines.',
    specs: [
      { label: 'Volume Routed', val: '14,000+ Custom Units' },
      { label: 'Partner Mills', val: '14 Facilities' },
      { label: 'Turnaround', val: '4 - 7 Business Days' },
    ],
    ctaText: 'Explore Quantum Weave',
    ctaLink: 'https://quantumweaveai.io/',
    icon: Layers,
    accentColor: '#00f5d4',
    renderVisual: () => <QuantumWeaveVisual />,
    nextServiceTitle: 'AI Film Making & Synthetic Production',
    nextServiceTag: 'SERVICE 04 • VIRTUAL PRODUCTION',
    renderNextVisualPreview: () => <AIFilmVisual />,
  },
  {
    id: 'ai-films',
    badge: 'CORE SERVICE 04 • CINEMATIC SYNTHETIC REELS',
    title: 'AI Film Making & Synthetic Production',
    serviceBullet: 'Cinematic visual storytelling, virtual production, and hyper-realistic commercial reels.',
    description: 'Hollywood-grade synthetic cinema, virtual production, and 4K visual reels delivered in 7 days for brands seeking maximum attention leverage in the feed.',
    specs: [
      { label: 'Aspect Ratio', val: '2.39:1 Cinemascope' },
      { label: 'Master Grade', val: '4K 60FPS Video' },
      { label: 'Turnaround', val: '7 Calendar Days' },
    ],
    ctaText: 'Explore Film Studio',
    ctaLink: 'https://wa.me/919972965677?text=Explore%20AI%20Film%20Making',
    icon: Film,
    accentColor: '#ffffff',
    renderVisual: () => <AIFilmVisual />,
    nextServiceTitle: 'Performance Architecture & Digital Marketing',
    nextServiceTag: 'SERVICE 05 • CASHFLOW COPY™',
    renderNextVisualPreview: () => <PerformanceVisual />,
  },
  {
    id: 'performance-marketing',
    badge: 'CORE SERVICE 05 • DIGITAL MARKETING & FUNNELS',
    title: 'Performance Architecture & Digital Marketing',
    serviceBullet: 'End-to-end digital sales funnels built for sustainable ROI. Cashflow Copy™ acquisition loops.',
    description: 'High-converting direct response messaging frameworks and Meta acquisition loops designed for maximum return on ad spend without form fatigue.',
    specs: [
      { label: 'Ad-to-Lead Lift', val: '4.8x Higher' },
      { label: 'Form Fatigue', val: '0% Drop-off' },
      { label: 'Methodology', val: 'Direct Response' },
    ],
    ctaText: 'Explore Cashflow Copy',
    ctaLink: 'https://cashflowcopy.in/',
    icon: TrendingUp,
    accentColor: '#00f5d4',
    renderVisual: () => <PerformanceVisual />,
    nextServiceTitle: 'Learning Opportunities: IGR Academy & Appu AI',
    nextServiceTag: 'SERVICE 06 • OPERATOR INTENSIVE',
    renderNextVisualPreview: () => <AcademyVisual />,
  },
  {
    id: 'academy',
    badge: 'CORE SERVICE 06 • LEARNING OPPORTUNITIES',
    title: 'Learning Opportunities: IGR Academy & Appu AI',
    serviceBullet: '5-Day applied transformation from theory to deployment. Prompt engineering & live workflows.',
    description: 'An intensive hands-on sprint for founders and executive teams to build live production WhatsApp agents, prompt frameworks, and autonomous business workflows.',
    specs: [
      { label: 'Sprint Length', val: '5-Day Applied Intensive' },
      { label: 'Mentorship', val: 'Kaaranji Shreedhar & Team' },
      { label: 'Outcome', val: 'Live Production Stack' },
    ],
    ctaText: 'Apply For Academy',
    ctaLink: 'https://wa.me/919972965677?text=Apply%20for%20IGR%20Academy%20and%20Appu%20AI',
    icon: GraduationCap,
    accentColor: '#ffffff',
    renderVisual: () => <AcademyVisual />,
    nextServiceTitle: 'WhatsApp-led Lead Gen & CRM',
    nextServiceTag: 'CYCLE COMPLETE • RETURN TO 01',
    renderNextVisualPreview: () => <WhatsAppVisual />,
  },
];

interface SinglePortalChapterProps {
  service: ServiceDefinition;
  index: number;
}

const SinglePortalChapter: React.FC<SinglePortalChapterProps> = ({ service, index }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Scroll track: 250vh gives smooth, scrubbable transformation physics
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // 1. OUTER PAGE SHRINKS:
  // From 0 to 0.35, page is full screen.
  // From 0.35 to 0.85, the outer page smoothly shrinks into center (scale 1.0 -> 0.62),
  // rounds its corners (0 -> 44px), dims (opacity 1.0 -> 0.2), and recedes into 3D space!
  const outerScale = useTransform(scrollYProgress, [0, 0.35, 0.85], [1, 1, 0.62]);
  const outerOpacity = useTransform(scrollYProgress, [0, 0.45, 0.85], [1, 1, 0.2]);
  const outerBorderRadius = useTransform(scrollYProgress, [0, 0.35, 0.85], [0, 0, 44]);
  const outerTranslateY = useTransform(scrollYProgress, [0, 0.35, 0.85], [0, 0, -40]);

  // 2. INNER PORTAL VIEWPORT EXPANDS OUT FROM INSIDE:
  // Starts inside the card at scale 1.0.
  // From 0.35 to 0.85, it EXPANDS dramatically (scale 1.0 -> 2.6) and breaks out of the shrinking parent!
  const portalScale = useTransform(scrollYProgress, [0, 0.35, 0.85], [1, 1.05, 2.5]);
  const portalBorder = useTransform(
    scrollYProgress,
    [0, 0.4, 0.85],
    ['1px solid rgba(255,255,255,0.2)', '2px solid rgba(0,245,212,0.8)', '0px solid transparent']
  );

  return (
    <div ref={sectionRef} className="relative min-h-[250vh]">
      {/* Sticky Full-Screen Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        {/* OUTER SCREEN: The Current Service View (Shrinks on scroll) */}
        <motion.div
          style={{
            scale: outerScale,
            opacity: outerOpacity,
            y: outerTranslateY,
            borderRadius: outerBorderRadius,
          }}
          className="relative w-full h-full flex flex-col justify-between p-6 sm:p-12 md:p-14 overflow-hidden border border-white/20 shadow-[0_40px_140px_rgba(0,0,0,0.98)] bg-[#050505]"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05)_0%,transparent_60%)] pointer-events-none" />

          {/* Top Metadata Header - NO // */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase font-bold tracking-widest px-3.5 py-1 rounded-full bg-white text-black shadow-md">
                {service.badge}
              </span>
              <span className="font-mono text-xs text-white/60 hidden sm:inline">
                SCROLL DOWN TO ZOOM THROUGH ▾
              </span>
            </div>
            <span className="font-mono text-sm text-white font-bold tracking-wider">
              0{index + 1} / 06
            </span>
          </div>

          {/* Middle Stage: Current Service Details + Centered Nested Portal that Zooms */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
            {/* Left Column: Rich Service Narrative & Specs */}
            <div className="lg:col-span-6 space-y-4 text-left">
              <h2 className="font-['Space_Grotesk'] text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[0.95]">
                {service.title}
              </h2>
              <p className="font-mono text-xs sm:text-sm uppercase tracking-wider text-[#00f5d4] font-medium">
                • {service.serviceBullet}
              </p>
              <p className="font-['Space_Grotesk'] text-sm sm:text-base text-white/70 max-w-xl font-light leading-relaxed">
                {service.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-2.5 pt-2 max-w-lg">
                {service.specs.map((sp, sidx) => (
                  <div key={sidx} className="bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/15 font-mono">
                    <span className="block text-[10px] uppercase text-white/50">{sp.label}</span>
                    <span className="text-xs font-bold text-white mt-0.5 block">{sp.val}</span>
                  </div>
                ))}
              </div>

              {/* Action Link */}
              <div className="pt-3">
                <a
                  href={service.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all active:scale-95 shadow-[0_0_25px_rgba(255,255,255,0.3)]"
                >
                  <span>{service.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Column: THE NESTED EXPANDING PORTAL GATE */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="w-full max-w-lg aspect-[16/11] relative flex items-center justify-center">
                {/* Visual Label Above Portal */}
                <div className="absolute -top-7 left-0 right-0 flex items-center justify-between font-mono text-[10px] uppercase text-white/60 tracking-widest px-2">
                  <span>ACTIVE INTERFACE</span>
                  <span className="text-[#00f5d4]">EXPANDS ON SCROLL ▾</span>
                </div>

                {/* THE EXPANDING INNER PORTAL GATE */}
                <motion.div
                  style={{
                    scale: portalScale,
                    border: portalBorder,
                  }}
                  className="w-full h-full rounded-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)] relative bg-[#090909] origin-center"
                >
                  {/* Current Service Live Visual Presentation */}
                  <div className="w-full h-full p-2">
                    {service.renderVisual()}
                  </div>

                  {/* High-Tech Overlay Badge Revealing Next Destination */}
                  <div className="absolute bottom-3 left-3 right-3 font-mono text-[11px] font-bold text-white uppercase bg-black/90 backdrop-blur-xl px-3.5 py-2 rounded-xl border border-white/20 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-white">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00f5d4]" />
                      <span>ZOOMING INTO: {service.nextServiceTitle}</span>
                    </span>
                    <span className="text-[#00f5d4] text-[10px]">SCROLL ▾</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Strip - NO // */}
          <div className="relative z-10 flex items-center justify-between font-mono text-xs text-white/60 border-t border-white/15 pt-4">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00f5d4] animate-ping" />
              <span>BRANDMINT AUTONOMOUS TRANSFORMATION ENGINE • 60 FPS</span>
            </span>
            <span className="hidden sm:inline text-white/70">
              Scroll down to watch this service shrink and the portal expand ▾
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const NestedPortalScrollExperience: React.FC = () => {
  return (
    <section id="portal-experience" className="relative z-10 bg-black">
      {/* Intro Header - NO // */}
      <div className="text-center pt-28 pb-14 px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 font-mono text-xs uppercase tracking-widest text-white/80 mb-4 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#00f5d4] animate-pulse" />
          <span>FULL PORTAL ZOOM TRANSFORMATION</span>
          <span className="text-white/40">•</span>
          <span>ALL BRANDMINT SERVICES</span>
        </div>
        <h2 className="font-['Space_Grotesk'] text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-4">
          Services. <span className="text-white/30">Zoom-Through Transformation.</span>
        </h2>
        <p className="font-['Space_Grotesk'] text-sm sm:text-base text-white/60 max-w-xl mx-auto">
          As you scroll down, each service page shrinks back into 3D space, and the portal expands out from the center to take over full screen with the next service.
        </p>
      </div>

      {/* The 6 Nested Portal Chapters */}
      <div className="relative">
        {SERVICES.map((service, idx) => (
          <SinglePortalChapter
            key={service.id}
            service={service}
            index={idx}
          />
        ))}
      </div>
    </section>
  );
};
