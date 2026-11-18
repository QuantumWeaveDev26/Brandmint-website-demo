import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { SmartVideo } from './SmartVideo';
import { HeroWorkflow } from './HeroWorkflow';
import type { RoutePath } from './MonoNavbar';

interface MonoScrollHeroProps {
  onOpenBooking: () => void;
  onNavigate?: (path: RoutePath) => void;
}

const PILLARS: { title: string; description: string; route: RoutePath }[] = [
  { title: 'AI & automation', description: 'WhatsApp, CRM & team workflows', route: '/solutions' },
  { title: 'Business growth', description: 'Campaigns, films & copy', route: '/business-growth' },
  { title: 'Our ventures', description: 'Explore Quantum Weave™', route: '/ventures' },
  { title: 'BrandMint Academy', description: 'Applied AI learning for your team', route: '/academy' },
];

export const MonoScrollHero: React.FC<MonoScrollHeroProps> = ({ onNavigate }) => (
  <section id="top" className="home-hero">
    <div className="hero-backdrop" aria-hidden="true">
      <SmartVideo src="/videos/bengaluru-tech-park.mp4" priority className="h-full w-full object-cover" />
    </div>
    <div className="hero-layout">
      <div className="hero-copy">
        <h1>Less busywork.<br /><span className="font-editorial">More business.</span></h1>
        <p className="hero-description">AI agents, voice assistants, WhatsApp automation, and connected CRM workflows. Built around your business, so your people can focus on the work that matters.</p>
        <p className="hero-learning-note">Want to build your own skills? Explore practical AI learning through <a href="/academy">BrandMint Academy <ArrowUpRight size={13} aria-hidden="true" /></a>.</p>
        <div className="hero-actions">
          <a className="home-primary" href="https://calendly.com/team-brandmint/30min" target="_blank" rel="noopener noreferrer">
            Book a 30-min call <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a className="home-secondary" href="#solutions">Find your solution <ArrowDown size={16} aria-hidden="true" /></a>
        </div>
        <p className="hero-call-note">Bring one workflow you want to improve. Let’s find a useful starting point.</p>
        <div className="hero-signature"><span /> BrandMint AI Pvt. Ltd. <span className="signature-divider">/</span> Bengaluru, India</div>
      </div>
      <HeroWorkflow />
    </div>
    <nav className="hero-pillars" aria-label="What BrandMint does">
      {PILLARS.map(pillar => <a href={pillar.route} key={pillar.route} onClick={event => {
        if (onNavigate && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
          event.preventDefault(); onNavigate(pillar.route);
        }
      }}><div><strong>{pillar.title}</strong><span>{pillar.description}</span></div><ArrowUpRight size={18} aria-hidden="true" /></a>)}
    </nav>
  </section>
);
