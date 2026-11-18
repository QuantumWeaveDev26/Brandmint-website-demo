import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, RotateCcw } from 'lucide-react';
import { useMotionSettings } from './MotionSettings';
import { HERO_EXAMPLES } from '../data/heroExamples';
import { HeroTransformation } from './HeroTransformation';

export function HeroWorkflow() {
  const { paused } = useMotionSettings();
  const ref = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState(0);
  const [exampleIndex, setExampleIndex] = useState(0);
  const [manualPhase, setManualPhase] = useState<number | null>(null);
  const [replayCount, setReplayCount] = useState(0);
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
    if ((paused && !replayCount) || !near || !pageVisible || manualPhase !== null) return;
    const timer = window.setInterval(() => setStep(previous => (previous + 1) % 4), 2400);
    return () => window.clearInterval(timer);
  }, [paused, near, pageVisible, exampleIndex, manualPhase, replayCount]);

  const phase = manualPhase ?? (paused && !replayCount ? 3 : step);
  const frame = example.frames[phase];
  const Icon = frame.icon;
  const selectExample = (index: number) => { setExampleIndex(index); setStep(0); setManualPhase(null); setReplayCount(0); };
  return <div ref={ref} className="hero-workflow hero-workflow-transform" data-phase={phase} data-example={example.id} aria-label="Explore AI solutions and learning opportunities">
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
    <HeroTransformation phase={phase} example={example} animating={near && pageVisible && !paused && manualPhase === null} />
    <div className="transform-playback" aria-label="Transformation controls">
      <button type="button" aria-label="Show manual workflow" aria-pressed={phase === 0} onClick={() => setManualPhase(0)}>Before</button>
      <button type="button" aria-label="Show connected workflow" aria-pressed={phase === 3} onClick={() => setManualPhase(3)}>After</button>
      <button type="button" aria-label="Replay transformation" onClick={() => { setStep(0); setManualPhase(null); setReplayCount(count => count + 1); }}><RotateCcw size={15} aria-hidden="true" />Replay</button>
    </div>
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
