import { Check, Clock3, FileText, MessageCircle } from 'lucide-react';
import brandmintLogo from '../assets/brandmint-logo.webp';
import type { HeroExample } from '../data/heroExamples';
import type { CSSProperties } from 'react';

const MANUAL_WORK: Record<string, string[]> = {
  whatsapp: ['Missed enquiries', 'Copy-paste updates', 'Follow-ups to chase'],
  agents: ['Scattered research', 'Repeated drafting', 'Tasks to coordinate'],
  voice: ['Unanswered questions', 'Repeated explanations', 'Lost call context'],
  learning: ['Too many tools', 'Where do I start?', 'Theory without practice'],
};
const INPUT_ICONS = [MessageCircle, FileText, Clock3];
const SCATTER = [[-104, -48, -11], [98, -8, 9], [-42, 76, -5]];

/** A visible before-to-after example, with a written equivalent in the panel below. */
export function HeroTransformation({ phase, example, animating }: { phase: number; example: HeroExample; animating: boolean }) {
  return <div className="hero-transform-stage" data-phase={phase} data-animating={animating} aria-hidden="true">
    <div className="transform-scene-label" data-connected={phase >= 2}>
      <span />{phase === 0 ? 'Before · manual work' : phase === 1 ? 'Bringing it together' : phase === 2 ? 'One connected workflow' : 'After · ready to move'}
    </div>
    <div className="transform-manual-cards">
      {MANUAL_WORK[example.id].map((label, index) => {
        const Icon = INPUT_ICONS[index];
        return <div key={label} className="transform-manual-card" style={{ '--manual-x': `${SCATTER[index][0]}px`, '--manual-y': `${SCATTER[index][1]}px`, '--manual-rotation': `${SCATTER[index][2]}deg`, '--card-order': index } as CSSProperties}>
          <Icon size={19} /><span>{label}</span><i />
        </div>;
      })}
    </div>
    <svg className="transform-connections" viewBox="0 0 480 300" preserveAspectRatio="none">
      <path className="transform-wire" d="M240 155V185H80V206 M240 185V206 M240 185H400V206" />
      <path className="transform-signal" d="M240 155V185H80V206 M240 185V206 M240 185H400V206" />
    </svg>
    <div className="transform-core"><div className="transform-core-ring" /><img src={brandmintLogo} alt="" /><strong>BrandMint AI</strong></div>
    <div className="transform-core-caption">{phase === 1 ? 'Understanding the context' : phase >= 2 ? 'Tools, knowledge & people' : 'From scattered to connected'}</div>
    <div className="transform-result-nodes">
      {example.steps.map((item, index) => {
        const Icon = item.icon;
        return <div className="transform-result-node" key={item.title} style={{ '--node-order': index } as CSSProperties}>
          <Icon size={19} /><span>{item.title}</span><Check className="transform-node-check" size={14} />
        </div>;
      })}
    </div>
  </div>;
}
