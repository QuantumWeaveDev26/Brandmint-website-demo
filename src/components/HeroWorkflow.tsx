import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useMotionSettings } from './MotionSettings';
import { HERO_EXAMPLES } from '../data/heroExamples';
import { HeroTransformation } from './HeroTransformation';

export function HeroWorkflow() {
  const { paused } = useMotionSettings();
  const ref = useRef<HTMLDivElement | null>(null);
  const [{ step, exampleIndex }, setPlayback] = useState({ step: 0, exampleIndex: 0 });
  const [interacting, setInteracting] = useState(false);
  const exampleTabs = useRef<(HTMLButtonElement | null)[]>([]);
  const example = HERO_EXAMPLES[exampleIndex];
  const [near, setNear] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(node);
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility); };
  }, []);
  useEffect(() => {
    if (paused || !near || !pageVisible || interacting) return;
    const timer = window.setInterval(() => setPlayback(previous => previous.step === 3
      ? { step: 0, exampleIndex: (previous.exampleIndex + 1) % HERO_EXAMPLES.length }
      : { ...previous, step: previous.step + 1 }), 2400);
    return () => window.clearInterval(timer);
  }, [paused, near, pageVisible, exampleIndex, interacting]);

  const phase = paused ? 3 : step;
  const frame = example.frames[phase];
  const Icon = frame.icon;
  const selectExample = (index: number) => setPlayback({ exampleIndex: index, step: 0 });
  return <div ref={ref} className="hero-workflow hero-workflow-transform" data-phase={phase} data-example={example.id} aria-label="Explore AI solutions and learning opportunities"
    onFocusCapture={() => setInteracting(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteracting(false); }}>
    <div className="workflow-topline"><span className="workflow-dot" /> Build with AI. Grow your skills. <span className="workflow-example-label">Examples</span></div>
    <div className="hero-example-tabs" role="tablist" aria-label="Explore our capabilities">
      {HERO_EXAMPLES.map((item, index) => <button type="button" role="tab" key={item.id}
        ref={node => { exampleTabs.current[index] = node; }} id={`example-${item.id}`}
        aria-selected={index === exampleIndex} aria-controls="hero-example-panel" tabIndex={index === exampleIndex ? 0 : -1}
        onClick={() => selectExample(index)} onKeyDown={event => {
          const next = event.key === 'ArrowRight' ? (index + 1) % 4 : event.key === 'ArrowLeft' ? (index + 3) % 4 : event.key === 'Home' ? 0 : event.key === 'End' ? 3 : null;
          if (next === null) return;
          event.preventDefault(); selectExample(next); exampleTabs.current[next]?.focus();
        }}>{item.label}</button>)}
    </div>
    <div id="hero-example-panel" role="tabpanel" aria-labelledby={`example-${example.id}`}>
    <HeroTransformation phase={phase} example={example} animating={near && pageVisible && !paused && !interacting} />
    <div className="workflow-message" key={`${example.id}-${phase}`}>
      <Icon size={21} aria-hidden="true" />
      <div><span className="workflow-small-label">{frame.label}</span><p>{frame.message}</p></div>
    </div>
    <div className="workflow-phase-status" aria-hidden="true"><span>{frame.status}</span><span>{phase + 1} / 4</span></div>
    <ol className="sr-only">{example.steps.map(item => <li key={item.title}>{item.title}. {item.text}</li>)}</ol>
    <a className="workflow-preview-link" href={example.href}>{example.action} <ArrowUpRight size={17} aria-hidden="true" /></a>
    </div>
  </div>;
}
