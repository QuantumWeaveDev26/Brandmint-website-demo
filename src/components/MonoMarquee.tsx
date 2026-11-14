import React from 'react';
import { Sparkles } from 'lucide-react';

export const MonoMarquee: React.FC = () => {
  const items = [
    'AI-Powered Personalisation & Customisation',
    'Enterprise AI Integration (CRM • WhatsApp • Knowledge)',
    'AI Workforce Building • Workforce Multiplier',
    'AI Workflow & Automation Building',
    'Executive AI Assistants for Business Leaders',
    'Education & AI-First Institutions',
    'Quantum Weave™ Venture Ecosystem',
    'Human-in-the-Loop AI Governance',
  ];

  return (
    <div className="relative py-4 bg-[#0E0433]/92 border-y border-[#7265C2]/30 overflow-hidden select-none z-10">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-10 text-sm sm:text-base font-medium text-[#CCC7F2]">
        {[...items, ...items].map((item, idx) => (
          <span key={idx} className="flex items-center gap-8">
            <span className="tracking-tight text-white/95">{item}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#7265C2] shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
};
