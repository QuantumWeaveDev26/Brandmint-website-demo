import React, { useEffect } from 'react';
import type { RoutePath } from './MonoNavbar';

interface RouteSeoMeta {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  crumbName: string;
}

const ROUTE_SEO: Record<RoutePath, RouteSeoMeta> = {
  '/': {
    title: 'BrandMint AI Pvt. Ltd. | Enterprise AI Solutions, WhatsApp Automation & Workflows • Bengaluru',
    description:
      'BrandMint AI Pvt. Ltd. engineers AI-powered personalisation, enterprise AI integration, WhatsApp & CRM automation, AI workforce multipliers, and executive AI assistants in Bengaluru.',
    keywords:
      'BrandMint AI, AI Automation Bangalore, Enterprise AI Solutions Bengaluru, WhatsApp Automation, CRM Integration, AI Workforce Multiplier, Vishak B, Kaaranji Shreedhar',
    canonical: 'https://brandmintai.io/',
    crumbName: 'Home',
  },
  '/about': {
    title: 'About BrandMint AI Pvt. Ltd. | Vishak B & Kaaranji Shreedhar • Bengaluru',
    description:
      'Led by Vishak B (Founder & CEO, 10+ years experience) and Kaaranji Shreedhar (Co-Founder, 25+ years experience), BrandMint AI Pvt. Ltd. builds enterprise AI systems and venture IP in Bengaluru.',
    keywords:
      'About BrandMint AI, Vishak B CEO, Kaaranji Shreedhar Co-Founder, Enterprise AI Company Bengaluru, Quantum Weave',
    canonical: 'https://brandmintai.io/about',
    crumbName: 'About BrandMint AI',
  },
  '/solutions': {
    title: 'Enterprise AI Solutions | WhatsApp Automation, Cashflow Copy, Meta Growth & AI Workforce — BrandMint AI',
    description:
      'Explore BrandMint AI’s 6 connected enterprise AI areas plus Cashflow Copy, WhatsApp Automation, AI-Powered Films, Meta Growth System, and AI Workforce solutions.',
    keywords:
      'Enterprise AI Solutions, Cashflow Copy, WhatsApp Business Automation, AI-Powered Films, Meta Growth System, AI Workforce Bangalore',
    canonical: 'https://brandmintai.io/solutions',
    crumbName: 'Enterprise AI Solutions',
  },
  '/business-growth': {
    title: 'Business Growth & Quantum Growth Scan™ | Discover, Design, Pilot, Multiply — BrandMint AI',
    description:
      'Move from operational friction to measurable growth with BrandMint AI’s 4-stage Discover → Design → Pilot → Multiply delivery model and Quantum Growth Scan™.',
    keywords:
      'Business Growth Systems, Quantum Growth Scan, AI Pilot Delivery, AEO GEO SEO Visibility, BrandMint AI',
    canonical: 'https://brandmintai.io/business-growth',
    crumbName: 'Business Growth',
  },
  '/ventures': {
    title: 'Ventures, Quantum Weave™ & AI Campus | Proprietary Platforms & IP — BrandMint AI',
    description:
      'Explore Quantum Weave™ AI commerce, Smart Manufacturing Intelligence, JobMatrix employability, and the AI Campus publication incubated by BrandMint AI Pvt. Ltd.',
    keywords:
      'Quantum Weave AI, BrandMint Ventures, JobMatrix, AI Campus HybridAI, Smart Manufacturing AI',
    canonical: 'https://brandmintai.io/ventures',
    crumbName: 'Ventures & IP',
  },
  '/academy': {
    title: 'BrandMint Academy | AI-Powered Marketing, AI Full-Stack Developer, IGR Academy, Appu AI & AI Filmmaking',
    description:
      'Hands-on AI training programs by BrandMint Academy: AI-Powered Marketing, AI Full-Stack Developer, IGR Academy, Appu AI, and AI Filmmaking.',
    keywords:
      'BrandMint Academy, AI-Powered Marketing Course, AI Full-Stack Developer, IGR Academy, Appu AI, AI Filmmaking Bangalore',
    canonical: 'https://brandmintai.io/academy',
    crumbName: 'Academy',
  },
  '/blog': {
    title: 'AI Automation & Business Growth Blog | WhatsApp Lead Follow-Up & CRM Guides — BrandMint AI',
    description:
      'Read practical playbooks from BrandMint AI: Small Business Automation Ideas, WhatsApp Lead Follow-Up Systems, AI Business Automation FAQ, and CRM Lead Sync.',
    keywords:
      'Small Business Automation Ideas, WhatsApp Lead Follow-Up System, AI Business Automation FAQ, Connect Website Leads to CRM',
    canonical: 'https://brandmintai.io/blog',
    crumbName: 'Blog',
  },
  '/contact': {
    title: 'Contact BrandMint AI Pvt. Ltd. • Bengaluru | Book a 30-Min Consultation',
    description:
      'Connect with BrandMint AI Pvt. Ltd. in Bengaluru (+91 99729 65677 | connect@brandmintai.io) or book a 30-minute consultation to scope your AI pilot.',
    keywords:
      'Contact BrandMint AI, BrandMint AI Bengaluru Address, Book AI Consultation Bangalore',
    canonical: 'https://brandmintai.io/contact',
    crumbName: 'Contact Us',
  },
};

interface SeoHeadProps {
  currentPath: RoutePath;
}

export const SeoHead: React.FC<SeoHeadProps> = ({ currentPath }) => {
  useEffect(() => {
    const meta = ROUTE_SEO[currentPath] || ROUTE_SEO['/'];
    document.title = meta.title;

    const setMetaContent = (selector: string, val: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute('content', val);
    };

    setMetaContent('meta[name="description"]', meta.description);
    setMetaContent('meta[name="keywords"]', meta.keywords);
    setMetaContent('#og-title', meta.title);
    setMetaContent('#og-description', meta.description);
    setMetaContent('#og-url', meta.canonical);
    setMetaContent('#tw-title', meta.title);
    setMetaContent('#tw-description', meta.description);

    const canonicalEl = document.getElementById('canonical-link');
    if (canonicalEl) canonicalEl.setAttribute('href', meta.canonical);

    let scriptEl = document.getElementById('dynamic-route-schema') as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'dynamic-route-schema';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const graph: Record<string, unknown>[] = [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://brandmintai.io/',
          },
          ...(currentPath !== '/'
            ? [
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: meta.crumbName,
                  item: meta.canonical,
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
    ];

    scriptEl.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    });
  }, [currentPath]);

  return null;
};
