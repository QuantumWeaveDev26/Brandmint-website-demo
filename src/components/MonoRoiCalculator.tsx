import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, MessageCircle, Database, UserCheck } from 'lucide-react';

interface MonoRoiCalculatorProps { onOpenBooking: () => void }
const PRESETS = [
  { label: 'Growth Team', value: 300 },
  { label: 'Mid-Market', value: 900 },
  { label: 'Institution', value: 2000 },
  { label: 'Enterprise', value: 4000 },
];
const BLUEPRINTS = [
  { name: 'A focused AI pilot.', description: 'Start with one enquiry channel and one clear handoff. Give your team a small, useful workflow to evaluate.', scope: 'One workflow. A clear review point.', steps: ['Capture the enquiry', 'Prepare a contextual reply', 'Hand over for review'] },
  { name: 'A connected customer journey.', description: 'Bring your CRM, customer conversations, and team handoffs into one connected workflow.', scope: 'Connected CRM + AI roles', steps: ['Capture across your channels', 'Keep the CRM in context', 'Brief the right teammate'] },
  { name: 'A coordinated AI system.', description: 'Explore connected workflows across teams, with shared context, routing rules, and human review.', scope: 'Multiple teams. Shared context.', steps: ['Unify incoming enquiries', 'Route by context and team', 'Review exceptions together'] },
];
const ICONS = [MessageCircle, Database, UserCheck];

export const MonoRoiCalculator: React.FC<MonoRoiCalculatorProps> = ({ onOpenBooking }) => {
  const [inquiries, setInquiries] = useState(900);
  const level = inquiries < 700 ? 0 : inquiries < 1800 ? 1 : 2;
  const blueprint = BLUEPRINTS[level];
  const fill = (inquiries - 100) / 4900 * 100;
  return <section id="velocity" className="section-shell growth-scan" aria-labelledby="scan-title">
    <div className="scan-workbench">
      <div className="scan-input-side">
      <div className="section-intro">
      <h2 id="scan-title">Find your AI<br /><span className="font-editorial">starting point.</span></h2>
      <p>A little context goes a long way. Explore a starting point for your team, then shape the details together.</p>
    </div>
      <div className="scan-controls">
        <div className="scan-volume-heading"><label htmlFor="enquiry-volume">Monthly customer enquiries</label></div>
        <div className="scan-volume"><output htmlFor="enquiry-volume">{inquiries.toLocaleString()}</output><span>enquiries / month</span></div>
        <input id="enquiry-volume" aria-label="Monthly customer enquiries" type="range" min="100" max="5000" step="100"
          value={inquiries} onChange={event => setInquiries(Number(event.target.value))}
          style={{ '--scan-fill': `${fill}%` } as React.CSSProperties} />
        <div className="scan-range-labels" aria-hidden="true"><span>100</span><span>5,000</span></div>
        <div className="scan-presets" aria-label="Enquiry volume presets">{PRESETS.map(preset => <button type="button" key={preset.label}
          aria-pressed={inquiries === preset.value} onClick={() => setInquiries(preset.value)}>{preset.label}</button>)}</div>
        <p className="scan-controls-note">Choose an approximate volume. We’ll discuss your tools, team, and review needs before defining the scope.</p>
      </div>
      </div>
      <div className="scan-blueprint" aria-labelledby="blueprint-title" data-blueprint={level}>
        <span className="scan-result-label">Quantum Growth Scan™ <ArrowUpRight size={18} aria-hidden="true" /></span>
        <div className="scan-result-copy" key={level}><h3 id="blueprint-title">{blueprint.name}</h3><p>{blueprint.description}</p></div>
        <ol className="scan-route">{blueprint.steps.map((step, index) => { const Icon = ICONS[index]; return <li key={index}><Icon size={17} aria-hidden="true" /><span>{step}</span>{index < 2 && <ArrowRight size={14} aria-hidden="true" />}</li>; })}</ol>
        <div className="scan-result-footer"><span>{blueprint.scope}</span><button type="button" onClick={onOpenBooking}>Discuss this blueprint <ArrowUpRight size={17} aria-hidden="true" /></button></div>
      </div>
    </div>
  </section>;
};
