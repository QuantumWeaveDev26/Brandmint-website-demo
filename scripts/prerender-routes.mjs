import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const baseHtmlPath = path.join(distDir, 'index.html');

const ROUTES = [
  {
    path: '/',
    title: 'BrandMint AI Pvt. Ltd. | Enterprise AI Solutions, WhatsApp Automation & Workflows • Bengaluru',
    description:
      'BrandMint AI Pvt. Ltd. engineers AI-powered personalisation, enterprise AI integration, WhatsApp & CRM automation, AI workforce multipliers, and executive AI assistants in Bengaluru.',
    keywords:
      'BrandMint AI, AI Automation Bangalore, Enterprise AI Solutions Bengaluru, WhatsApp Automation, CRM Integration, AI Workforce Multiplier, Vishak B, Kaaranji Shreedhar',
    canonical: 'https://brandmintai.io/',
    crumbName: 'Home',
  },
  {
    path: '/about',
    title: 'About BrandMint AI Pvt. Ltd. | Vishak B & Kaaranji Shreedhar • Bengaluru',
    description:
      'Led by Vishak B (Founder & CEO, 10+ years experience) and Kaaranji Shreedhar (Co-Founder, 25+ years experience), BrandMint AI Pvt. Ltd. builds enterprise AI systems and venture IP in Bengaluru.',
    keywords:
      'About BrandMint AI, Vishak B CEO, Kaaranji Shreedhar Co-Founder, Enterprise AI Company Bengaluru, Quantum Weave',
    canonical: 'https://brandmintai.io/about',
    crumbName: 'About BrandMint AI',
  },
  {
    path: '/solutions',
    title: 'Enterprise AI Solutions | WhatsApp Automation, Cashflow Copy, Meta Growth & AI Workforce — BrandMint AI',
    description:
      'Explore BrandMint AI’s 6 connected enterprise AI areas plus Cashflow Copy, WhatsApp Automation, AI-Powered Films, Meta Growth System, and AI Workforce solutions.',
    keywords:
      'Enterprise AI Solutions, Cashflow Copy, WhatsApp Business Automation, AI-Powered Films, Meta Growth System, AI Workforce Bangalore',
    canonical: 'https://brandmintai.io/solutions',
    crumbName: 'Enterprise AI Solutions',
  },
  {
    path: '/business-growth',
    title: 'Business Growth & Quantum Growth Scan™ | Discover, Design, Pilot, Multiply — BrandMint AI',
    description:
      'Move from operational friction to measurable growth with BrandMint AI’s 4-stage Discover → Design → Pilot → Multiply delivery model and Quantum Growth Scan™.',
    keywords:
      'Business Growth Systems, Quantum Growth Scan, AI Pilot Delivery, AEO GEO SEO Visibility, BrandMint AI',
    canonical: 'https://brandmintai.io/business-growth',
    crumbName: 'Business Growth',
  },
  {
    path: '/ventures',
    title: 'Ventures, Quantum Weave™ & AI Campus | Proprietary Platforms & IP — BrandMint AI',
    description:
      'Explore Quantum Weave™ AI commerce, Smart Manufacturing Intelligence, JobMatrix employability, and the AI Campus publication incubated by BrandMint AI Pvt. Ltd.',
    keywords:
      'Quantum Weave AI, BrandMint Ventures, JobMatrix, AI Campus HybridAI, Smart Manufacturing AI',
    canonical: 'https://brandmintai.io/ventures',
    crumbName: 'Ventures & IP',
  },
  {
    path: '/academy',
    title: 'BrandMint Academy | AI-Powered Marketing, AI Full-Stack Developer, IGR Academy, Appu AI & AI Filmmaking',
    description:
      'Hands-on AI training programs by BrandMint Academy: AI-Powered Marketing, AI Full-Stack Developer, IGR Academy, Appu AI, and AI Filmmaking.',
    keywords:
      'BrandMint Academy, AI-Powered Marketing Course, AI Full-Stack Developer, IGR Academy, Appu AI, AI Filmmaking Bangalore',
    canonical: 'https://brandmintai.io/academy',
    crumbName: 'Academy',
  },
  {
    path: '/blog',
    title: 'AI Automation & Business Growth Blog | WhatsApp Lead Follow-Up & CRM Guides — BrandMint AI',
    description:
      'Read practical playbooks from BrandMint AI: Small Business Automation Ideas, WhatsApp Lead Follow-Up Systems, AI Business Automation FAQ, and CRM Lead Sync.',
    keywords:
      'Small Business Automation Ideas, WhatsApp Lead Follow-Up System, AI Business Automation FAQ, Connect Website Leads to CRM',
    canonical: 'https://brandmintai.io/blog',
    crumbName: 'Blog',
  },
  {
    path: '/contact',
    title: 'Contact BrandMint AI Pvt. Ltd. • Bengaluru | Book a 30-Min Consultation',
    description:
      'Connect with BrandMint AI Pvt. Ltd. in Bengaluru (+91 99729 65677 | connect@brandmintai.io) or book a 30-minute consultation to scope your AI pilot.',
    keywords:
      'Contact BrandMint AI, BrandMint AI Bengaluru Address, Book AI Consultation Bangalore',
    canonical: 'https://brandmintai.io/contact',
    crumbName: 'Contact Us',
  },
];

function escapeAttr(val) {
  return val
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const template = fs.readFileSync(baseHtmlPath, 'utf-8');

for (const route of ROUTES) {
  let html = template;

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(route.title)}</title>`);
  html = html.replace(
    /<meta\b[^>]*name="description"[^>]*\/>/,
    `<meta name="description" content="${escapeAttr(route.description)}" />`
  );
  html = html.replace(
    /<meta\b[^>]*name="keywords"[^>]*\/>/,
    `<meta name="keywords" content="${escapeAttr(route.keywords)}" />`
  );
  html = html.replace(
    /<link\b[^>]*rel="canonical"[^>]*\/>/,
    `<link rel="canonical" href="${route.canonical}" id="canonical-link" />`
  );
  html = html.replace(
    /<meta\b[^>]*property="og:url"[^>]*\/>/,
    `<meta property="og:url" content="${route.canonical}" id="og-url" />`
  );
  html = html.replace(
    /<meta\b[^>]*id="og-title"[^>]*\/>/,
    `<meta property="og:title" content="${escapeAttr(route.title)}" id="og-title" />`
  );
  html = html.replace(
    /<meta\b[^>]*id="og-description"[^>]*\/>/,
    `<meta property="og:description" content="${escapeAttr(route.description)}" id="og-description" />`
  );
  html = html.replace(
    /<meta\b[^>]*id="tw-title"[^>]*\/>/,
    `<meta name="twitter:title" content="${escapeAttr(route.title)}" id="tw-title" />`
  );
  html = html.replace(
    /<meta\b[^>]*id="tw-description"[^>]*\/>/,
    `<meta name="twitter:description" content="${escapeAttr(route.description)}" id="tw-description" />`
  );

  const routeGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://brandmintai.io/',
          },
          ...(route.path !== '/'
            ? [
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: route.crumbName,
                  item: route.canonical,
                },
              ]
            : []),
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What does BrandMint AI Pvt. Ltd. build?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'BrandMint AI Pvt. Ltd. in Bengaluru builds AI-Powered Personalisation, Enterprise AI Integration (CRM & WhatsApp), AI Workforce Multipliers, AI Workflow Automation, Executive AI Assistants, Academy training programs, and Quantum Weave™ ventures.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does BrandMint AI start an enterprise engagement?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Every engagement follows a 4-stage model — Discover, Design, Pilot, and Multiply — starting with a focused 30-minute discovery call and tailored pilot.',
            },
          },
        ],
      },
    ],
  };

  const schemaTag = `<script id="dynamic-route-schema" type="application/ld+json">${JSON.stringify(routeGraph)}</script>`;
  html = html.replace('</head>', `    ${schemaTag}\n  </head>`);

  if (route.path === '/') {
    fs.writeFileSync(baseHtmlPath, html, 'utf-8');
  } else {
    const outDir = path.join(distDir, route.path.slice(1));
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8');
  }
}

console.log(`[prerender] Pre-rendered static SEO + OG + JSON-LD HTML for ${ROUTES.length} routes.`);
