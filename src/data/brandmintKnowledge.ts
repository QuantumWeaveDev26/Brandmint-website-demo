import type { RoutePath } from '../components/MonoNavbar';

export interface KnowledgeReply {
  text: string;
  actionLabel?: string;
  actionRoute?: RoutePath;
  openBooking?: boolean;
  externalUrl?: string;
  suggestedFollowUps?: string[];
}

interface KnowledgeTopic {
  id: string;
  keywords: string[];
  phrases?: string[];
  weight?: number;
  answer: string;
  actionLabel?: string;
  actionRoute?: RoutePath;
  openBooking?: boolean;
  externalUrl?: string;
  followUps: string[];
}

const TOPICS: KnowledgeTopic[] = [
  {
    id: 'ishani-identity',
    keywords: ['ishani', 'concierge'],
    phrases: ['who are you', 'what is your name', 'your name', 'are you a bot', 'are you ai'],
    weight: 3.8,
    answer:
      "Hi, I'm Ishani — the official AI guide for BrandMint AI Pvt. Ltd. (Bengaluru). I can help you explore our 6 Enterprise AI Solutions, WhatsApp & CRM automation, Academy programs, Ventures, or schedule a 30-minute consultation.",
    actionLabel: 'Explore AI Solutions',
    actionRoute: '/solutions',
    followUps: ['All 6 AI Solutions', 'Academy Programs', 'Founders & Experience', 'Book 30-Min Call'],
  },
  {
    id: 'company-overview',
    keywords: ['brandmint', 'company', 'about', 'mission', 'vision', 'divisions'],
    phrases: ['what is brandmint', 'about brandmint', 'what does brandmint do', 'tell me about your company'],
    weight: 3.3,
    answer:
      'BrandMint AI Pvt. Ltd. (Bengaluru) builds personalised Enterprise AI solutions, connected CRM & WhatsApp workflows, AI workforce multipliers, Academy training tracks, and proprietary venture platforms like Quantum Weave™.',
    actionLabel: 'About BrandMint AI',
    actionRoute: '/about',
    followUps: ['Founders & Experience', 'All 6 AI Solutions', 'Academy Programs', 'Contact Bengaluru HQ'],
  },
  {
    id: 'cashflow-copy',
    keywords: ['cashflow', 'copywriting'],
    phrases: ['cashflow copy', 'sales copy', 'conversion copy'],
    weight: 3.7,
    answer:
      'Cashflow Copy is BrandMint AI’s high-converting copywriting and revenue messaging system designed to turn attention into qualified enquiries and sales.',
    actionLabel: 'Open Cashflow Copy',
    externalUrl: 'https://cashflowcopy.in/',
    followUps: ['Meta Growth System', 'WhatsApp Automation', 'All 6 AI Solutions'],
  },
  {
    id: 'whatsapp-automation-offer',
    keywords: ['whatsapp', 'freemium'],
    phrases: ['whatsapp automation', 'whatsapp bot', 'whatsapp lead', 'automate whatsapp'],
    weight: 3.6,
    answer:
      'WhatsApp Automation by BrandMint AI captures enquiries 24/7, qualifies leads with verified business answers, syncs CRM records, and hands briefed conversations to your team.',
    actionLabel: 'Open WhatsApp Automation',
    externalUrl: 'https://brandmintai.io/freemium',
    followUps: ['Connect Website Leads to CRM', 'AI Integration', 'Book 30-Min Call'],
  },
  {
    id: 'ai-powered-films',
    keywords: ['films', 'filmsuccess', 'cinema', 'commercials'],
    phrases: ['ai-powered films', 'ai powered films', 'ai films', 'brand films'],
    weight: 3.7,
    answer:
      'AI-Powered Films combines cinema-grade creative direction with generative AI production to deliver high-impact brand films and visual campaigns.',
    actionLabel: 'Open AI-Powered Films',
    externalUrl: 'https://brandmintai.io/filmsuccess',
    followUps: ['AI Filmmaking Academy', 'Meta Growth System', 'Book 30-Min Call'],
  },
  {
    id: 'meta-growth-system',
    keywords: ['meta', 'instagram', 'facebook'],
    phrases: ['meta growth', 'meta growth system', 'paid ads', 'meta ads'],
    weight: 3.7,
    answer:
      'Meta Growth System pairs targeted demand generation on Meta with instant WhatsApp & CRM automation so paid enquiries convert without lead leakage.',
    actionLabel: 'Open Meta Growth System',
    externalUrl: 'https://brandmintai.io/meta-growth/',
    followUps: ['WhatsApp Automation', 'Cashflow Copy', 'Book 30-Min Call'],
  },
  {
    id: 'academy-marketing',
    keywords: ['instaskills'],
    phrases: ['ai-powered marketing', 'ai powered marketing', 'marketing course', 'marketing program'],
    weight: 3.8,
    answer:
      'AI-Powered Marketing (BrandMint Academy) trains marketers, founders, and operators to deploy AI-driven campaigns, copy systems, and automated funnels.',
    actionLabel: 'Open AI-Powered Marketing',
    externalUrl: 'https://brandmintai.io/instaskills',
    followUps: ['All Academy Programs', 'AI Full-Stack Developer', 'AI Filmmaking'],
  },
  {
    id: 'academy-fullstack',
    keywords: ['fullai', 'fullstack', 'developer', 'coding'],
    phrases: ['ai full-stack developer', 'ai full stack developer', 'full stack ai', 'developer program'],
    weight: 3.8,
    answer:
      'AI Full-Stack Developer (BrandMint Academy) is a hands-on engineering track for building production AI applications, connected agents, and modern web platforms.',
    actionLabel: 'Open AI Full-Stack Developer',
    externalUrl: 'https://brandmintai.io/fullai',
    followUps: ['All Academy Programs', 'Appu AI', 'IGR Academy'],
  },
  {
    id: 'academy-igr',
    keywords: ['igr'],
    phrases: ['igr academy', 'igr.academy'],
    weight: 3.9,
    answer:
      'IGR Academy delivers structured, practical career and operator training bridging academic learning with real-world industry execution.',
    actionLabel: 'Open IGR Academy',
    externalUrl: 'https://brandmintai.io/igr.academy',
    followUps: ['All Academy Programs', 'Education & Institutions', 'Appu AI'],
  },
  {
    id: 'academy-appu',
    keywords: ['appu', 'appuai'],
    phrases: ['appu ai'],
    weight: 3.9,
    answer:
      'Appu AI is BrandMint Academy’s accessible applied-AI learning initiative helping students, creators, and teams master everyday AI tools.',
    actionLabel: 'Open Appu AI',
    externalUrl: 'https://brandmintai.io/appuai',
    followUps: ['All Academy Programs', 'IGR Academy', 'AI Filmmaking'],
  },
  {
    id: 'academy-filmmaking',
    keywords: ['filmmaking', 'aifilmmaking'],
    phrases: ['ai filmmaking', 'ai filmmaking academy', 'learn ai filmmaking'],
    weight: 3.9,
    answer:
      'AI Filmmaking (BrandMint Academy) teaches creators and storytellers how to script, direct, and produce cinema-grade AI visuals and brand films.',
    actionLabel: 'Open AI Filmmaking',
    externalUrl: 'https://brandmintai.io/aifilmmaking',
    followUps: ['AI-Powered Films', 'All Academy Programs', 'Book 30-Min Call'],
  },
  {
    id: 'academy-overview',
    keywords: ['academy', 'courses', 'course', 'training', 'programs', 'learn', 'workshop', 'workshops'],
    phrases: ['academy programs', 'all academy programs', 'brandmint academy', 'growth circle'],
    weight: 3.4,
    answer:
      'BrandMint Academy offers 5 practical tracks:\n1. AI-Powered Marketing\n2. AI Full-Stack Developer\n3. IGR Academy\n4. Appu AI\n5. AI Filmmaking\nPlus BrandMint Growth Circle™ for campuses and corporate teams.',
    actionLabel: 'Explore Academy',
    actionRoute: '/academy',
    followUps: ['AI-Powered Marketing', 'AI Full-Stack Developer', 'IGR Academy', 'Appu AI'],
  },
  {
    id: 'blog-guides',
    keywords: ['blog', 'blogs', 'articles', 'guides', 'playbooks', 'faq'],
    phrases: [
      'small business automation ideas',
      'whatsapp lead follow-up',
      'ai business automation faq',
      'connect website leads to crm',
    ],
    weight: 3.4,
    answer:
      'BrandMint AI Blog & Field Guides:\n• Small Business Automation Ideas\n• WhatsApp Lead Follow-Up System\n• AI Business Automation FAQ\n• Connect Website Leads to CRM.',
    actionLabel: 'Read Blog Guides',
    actionRoute: '/blog',
    followUps: ['WhatsApp Automation', 'AI Integration', 'Book 30-Min Call'],
  },
  {
    id: 'personalisation',
    keywords: ['personalisation', 'personalization', 'customisation', 'customization', 'multilingual', 'journeys'],
    phrases: ['ai-powered personalisation', 'ai personalisation', 'customer journeys'],
    weight: 3.2,
    answer:
      '01. AI-Powered Personalisation & Customisation:\nTailors customer journeys, recommendations, and multilingual support around each visitor’s context and next best step.',
    actionLabel: 'Explore AI Solutions',
    actionRoute: '/solutions',
    followUps: ['AI Integration', 'AI Workforce Multiplier', 'Book 30-Min Call'],
  },
  {
    id: 'ai-integration',
    keywords: ['integration', 'integrations', 'crm', 'sync', 'hubspot', 'zoho'],
    phrases: ['ai integration', 'enterprise ai integration', 'crm integration'],
    weight: 3.2,
    answer:
      '02. Enterprise AI Integration:\nConnects AI directly to your CRM, WhatsApp, and approved company knowledge so enquiries become accurate, human-reviewed actions.',
    actionLabel: 'Explore AI Integration',
    actionRoute: '/solutions',
    followUps: ['WhatsApp Automation', 'AI Workflow Automation', 'Book 30-Min Call'],
  },
  {
    id: 'workforce-multiplier',
    keywords: ['workforce', 'multiplier', 'assistants', 'agents', 'capacity', 'bandwidth'],
    phrases: ['ai workforce', 'workforce multiplier', 'ai workforce building', 'role-based ai'],
    weight: 3.4,
    answer:
      '03. AI Workforce Multiplier:\nRole-based AI assistants for sales, marketing, support, and operations — with clear task handoffs, escalation rules, and human oversight.',
    actionLabel: 'Explore AI Workforce',
    externalUrl: 'https://brandmintai.io/ai-workforce/',
    followUps: ['Executive AI Assistants', 'All 6 AI Solutions', 'Book 30-Min Call'],
  },
  {
    id: 'workflow-automation',
    keywords: ['workflow', 'workflows', 'automation', 'automations', 'routing', 'approvals', 'repetitive'],
    phrases: ['ai workflow', 'workflow automation', 'end to end'],
    weight: 3.2,
    answer:
      '04. AI Workflow & Automation Building:\nAutomates enquiry routing, follow-ups, reporting, and approvals end-to-end to cut cycle times and rework.',
    actionLabel: 'Explore AI Workflows',
    actionRoute: '/solutions',
    followUps: ['WhatsApp Automation', '4-Stage Delivery', 'Book 30-Min Call'],
  },
  {
    id: 'executive-ai',
    keywords: ['executive', 'executives', 'briefs', 'boardroom', 'leaders', 'cxo'],
    phrases: ['executive ai', 'executive ai assistants', 'chief of staff', 'meeting briefs'],
    weight: 3.4,
    answer:
      '05. Executive AI Assistants for Business Leaders:\nCustom AI chief-of-staff systems delivering pre-meeting briefs, research synthesis, action tracking, and executive drafts.',
    actionLabel: 'Explore Executive AI',
    actionRoute: '/solutions',
    followUps: ['Founders & Experience', 'All 6 AI Solutions', 'Book 30-Min Call'],
  },
  {
    id: 'education-institutions',
    keywords: ['education', 'institution', 'institutions', 'college', 'colleges', 'university', 'students', 'educators', 'campus'],
    phrases: ['ai-first institutions', 'education & institutions', 'institutional ai'],
    weight: 3.2,
    answer:
      '06. Education & AI-First Institutions:\nAdaptive student practice, faculty insights, institutional AI workflows, JobMatrix employability, and AI Campus (hybridai.in).',
    actionLabel: 'Explore Institutional AI',
    actionRoute: '/solutions',
    followUps: ['Academy Programs', 'AI Campus Newsletter', 'Book 30-Min Call'],
  },
  {
    id: 'solutions-all',
    keywords: ['services', 'solutions', 'offerings', 'capabilities', 'price', 'pricing', 'cost', 'quote', 'budget', 'fees', 'packages'],
    phrases: ['all 6 ai solutions', 'all solutions', 'what do you offer', 'how much does it cost'],
    weight: 3.0,
    answer:
      'BrandMint AI’s 6 Connected Enterprise AI Solutions:\n1. AI-Powered Personalisation\n2. Enterprise AI Integration\n3. AI Workforce Multiplier\n4. AI Workflow & Automation\n5. Executive AI Assistants\n6. AI-First Institutions\n\nEvery engagement starts with a focused pilot scoped around your systems and outcomes (no generic fixed packages).',
    actionLabel: 'View All Solutions',
    actionRoute: '/solutions',
    followUps: ['WhatsApp Automation', 'Academy Programs', 'Book 30-Min Call'],
  },
  {
    id: 'founders-leadership',
    keywords: ['founder', 'founders', 'ceo', 'cofounder', 'vishak', 'kaaranji', 'shreedhar', 'leadership'],
    phrases: ['vishak b', 'kaaranji shreedhar', 'founders & experience', 'who founded'],
    weight: 3.6,
    answer:
      'BrandMint AI Pvt. Ltd. Founding Leadership:\n• Vishak B — Founder & CEO (10+ Years Experience in enterprise AI systems, connected workflows & ventures)\n• Kaaranji Shreedhar — Co-Founder (25+ Years Experience in brand architecture, creative strategy & venture IP).',
    actionLabel: 'Meet Leadership',
    actionRoute: '/about',
    followUps: ['All 6 AI Solutions', 'Ventures & IP', 'Contact Bengaluru HQ'],
  },
  {
    id: 'delivery-approach',
    keywords: ['discover', 'pilot', 'pilots', 'multiply', 'methodology', 'scan', 'diagnostic', 'governance'],
    phrases: ['4-stage delivery', 'how do you work', 'quantum growth scan', 'delivery model'],
    weight: 3.0,
    answer:
      'BrandMint AI 4-Stage Delivery Model:\n01 Discover (Find friction) → 02 Design (Shape architecture) → 03 Pilot (Validate measurable ROI) → 04 Multiply (Scale across teams), starting with our Quantum Growth Scan™.',
    actionLabel: 'Explore Delivery Model',
    actionRoute: '/business-growth',
    followUps: ['All 6 AI Solutions', 'Book 30-Min Call'],
  },
  {
    id: 'aeo-geo-seo',
    keywords: ['seo', 'aeo', 'geo', 'gbp', 'ranking', 'visibility'],
    phrases: ['search visibility', 'ai search', 'answer engine'],
    weight: 3.0,
    answer:
      'BrandMint AI Visibility Stack:\n• SEO: High-intent organic rankings\n• AEO: Answer Engine citations inside ChatGPT, Gemini & Perplexity\n• GEO & GBP: Generative & local Bengaluru/enterprise search authority.',
    actionLabel: 'Explore Growth Systems',
    actionRoute: '/business-growth',
    followUps: ['Meta Growth System', 'All 6 AI Solutions', 'Book 30-Min Call'],
  },
  {
    id: 'ventures-weave',
    keywords: ['venture', 'ventures', 'weave', 'jobmatrix', 'manufacturing', 'ip', 'hybridai', 'newsletter'],
    phrases: ['quantum weave', 'ventures & ip', 'ai campus newsletter'],
    weight: 3.3,
    answer:
      'BrandMint AI Ventures & IP:\n• Quantum Weave™ (quantumweaveai.io): AI commerce & smart manufacturing loop\n• JobMatrix: Employability & placement pipelines\n• AI Campus (hybridai.in): Builder & institutional AI publication.',
    actionLabel: 'Explore Ventures',
    actionRoute: '/ventures',
    followUps: ['Academy Programs', 'Founders & Experience', 'Book 30-Min Call'],
  },
  {
    id: 'company-brief-pdf',
    keywords: ['pdf', 'brochure', 'deck', 'briefing'],
    phrases: ['company brief', 'solutions brief', 'download pdf'],
    weight: 3.5,
    answer:
      'Download or view our official BrandMint AI Company & Solutions Brief (PDF) directly below.',
    actionLabel: 'Open Company Brief (PDF)',
    externalUrl: 'https://brandmint-connect.brandmintai.chatgpt.site/BrandMint_AI_Company_and_Solutions_Brief.pdf',
    followUps: ['All 6 AI Solutions', 'Book 30-Min Call'],
  },
  {
    id: 'contact-location',
    keywords: ['contact', 'location', 'address', 'bengaluru', 'bangalore', 'phone', 'call', 'email', 'office', 'calendly', 'schedule', 'book', 'human', 'support'],
    phrases: ['where are you located', 'book 30-min call', 'contact bengaluru hq', 'talk to team'],
    weight: 3.2,
    answer:
      'BrandMint AI Pvt. Ltd. • Bengaluru HQ:\n• Address: No. 3, Lingappa Layout, 1st Cross, Sri Sri Sri Shivakumara Swamiji Road, Bengaluru 560090\n• WhatsApp / Phone: +91 99729 65677\n• Email: connect@brandmintai.io\n• 30-Min Discovery Call: calendly.com/team-brandmint/30min.',
    actionLabel: 'Book 30-Min Call',
    externalUrl: 'https://calendly.com/team-brandmint/30min',
    followUps: ['All 6 AI Solutions', 'Academy Programs', 'Company Brief (PDF)'],
  },
];

// Explicit guardrail pattern for off-topic / unrelated general-knowledge queries
const OFF_TOPIC_REGEX =
  /\b(weather|temperature|rain|cricket|ipl|football|soccer|score|recipe|cook|biryani|pizza|joke|funny|poem|song|lyrics|horoscope|astrology|politics|election|minister|president|bitcoin|crypto|ethereum|forex|gambling|homework|solve|equation|capital of|tallest|deepest|netflix|bollywood|hollywood)\b/i;

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function getBrandMintAiReply(rawInput: string, currentPath: RoutePath): KnowledgeReply {
  const q = rawInput.toLowerCase().trim();

  if (/^(hi|hello|hey|namaste|yo|hii+|good\s*(morning|afternoon|evening)|help)$/i.test(q)) {
    return {
      text: "Hi, I'm Ishani — your BrandMint AI guide! Ask me about our 6 Enterprise AI Solutions, WhatsApp & CRM Automation, Academy programs, Founders, Quantum Weave™, or booking a 30-minute call.",
      actionLabel: 'Explore AI Solutions',
      actionRoute: '/solutions',
      suggestedFollowUps: ['All 6 AI Solutions', 'Academy Programs', 'WhatsApp Automation', 'Book 30-Min Call'],
    };
  }

  if (/^(thanks|thank you|thx|ty|ok thank you|great thanks|bye|goodbye)$/i.test(q)) {
    return {
      text: "You're welcome! Whenever you're ready to explore a focused AI pilot or Academy track, I'm right here — or you can book a 30-minute call with our Bengaluru team.",
      actionLabel: 'Book 30-Min Call',
      externalUrl: 'https://calendly.com/team-brandmint/30min',
      suggestedFollowUps: ['All 6 AI Solutions', 'Academy Programs', 'Contact Bengaluru HQ'],
    };
  }

  // Score BrandMint topics using strict word-boundary / phrase matching
  const scored = TOPICS.map((topic) => {
    let score = 0;
    const w = topic.weight ?? 2;
    if (topic.phrases) {
      for (const ph of topic.phrases) {
        if (q.includes(ph)) score += 4.5 * w;
      }
    }
    for (const kw of topic.keywords) {
      const re = new RegExp(`\\b${escapeRegex(kw)}\\b`, 'i');
      if (re.test(q)) {
        score += 2.4 * w;
      }
    }
    return { topic, score };
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  // Strict off-topic refusal when query is unrelated or has no BrandMint match
  if (scored.length === 0 || (OFF_TOPIC_REGEX.test(q) && !q.includes('brandmint'))) {
    return {
      text: "I'm Ishani, BrandMint AI's dedicated assistant — I strictly answer questions about BrandMint AI's Enterprise Solutions, WhatsApp & CRM Automation, Academy programs, Ventures, Leadership, or booking a consultation.\n\nPlease ask me about any of those areas and I'll guide you right away!",
      actionLabel: currentPath === '/solutions' ? 'Book 30-Min Call' : 'Explore AI Solutions',
      actionRoute: currentPath === '/solutions' ? undefined : '/solutions',
      externalUrl: currentPath === '/solutions' ? 'https://calendly.com/team-brandmint/30min' : undefined,
      suggestedFollowUps: ['All 6 AI Solutions', 'Academy Programs', 'WhatsApp Automation', 'Contact Bengaluru HQ'],
    };
  }

  const primary = scored[0].topic;
  return {
    text: primary.answer,
    actionLabel: primary.actionLabel,
    actionRoute: primary.actionRoute,
    openBooking: primary.openBooking,
    externalUrl: primary.externalUrl,
    suggestedFollowUps: primary.followUps,
  };
}
