import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Database, MessageCircle, UserCheck } from 'lucide-react';
import { useMotionSettings } from './MotionSettings';

const FRAMES = [
  { label: 'A customer starts a conversation', message: '“Can you help us automate our follow-ups?”', status: 'Enquiry received', icon: MessageCircle },
  { label: 'An assistant prepares a contextual reply', message: '“Which CRM does your team use, and where do your enquiries arrive?”', status: 'Reply prepared', icon: MessageCircle },
  { label: 'The conversation becomes a useful record', message: 'WhatsApp enquiry → Follow-up automation → CRM record', status: 'CRM record updated', icon: Database },
  { label: 'A person gets the context to take over', message: 'Enquiry captured. Conversation attached. Ready for your team to review.', status: 'Human handoff ready', icon: UserCheck },
];
const STEPS = [
  { title: 'Reply with context', text: 'Answer using your approved business information.', icon: MessageCircle },
  { title: 'Keep the CRM in sync', text: 'Bring the enquiry and conversation together.', icon: Database },
  { title: 'Hand over to your team', text: 'Give the right person the context to take over.', icon: UserCheck },
];

export function HeroWorkflow() {
  const { paused } = useMotionSettings();
  const ref = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState(0);
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
    if (paused || !near || !pageVisible) return;
    const timer = window.setInterval(() => setStep(previous => (previous + 1) % FRAMES.length), 2400);
    return () => window.clearInterval(timer);
  }, [paused, near, pageVisible]);

  const phase = paused ? 3 : step;
  const frame = FRAMES[phase];
  const Icon = frame.icon;
  return <div ref={ref} className="hero-workflow" data-phase={phase} aria-label="Illustrative WhatsApp enquiry to CRM workflow">
    <div className="workflow-topline"><span className="workflow-dot" /> A connected customer journey <span className="workflow-example-label">Example</span></div>
    <div className="workflow-message" key={phase}>
      <Icon size={21} aria-hidden="true" />
      <div><span className="workflow-small-label">{frame.label}</span><p>{frame.message}</p></div>
    </div>
    <div className="workflow-phase-status" aria-hidden="true"><span>{frame.status}</span><span>{phase + 1} / 4</span></div>
    <ol className="hero-flow-list">
      {STEPS.map((item, index) => {
        const StepIcon = item.icon;
        const state = phase === 3 || index < phase - 1 ? 'complete' : index === phase - 1 ? 'active' : 'waiting';
        return <li key={item.title} data-state={state}>
          <span className="hero-flow-icon"><StepIcon size={19} aria-hidden="true" /></span>
          <div><strong>{item.title}</strong><p>{item.text}</p></div>
          <Check className="workflow-step-check" size={16} aria-hidden="true" />
        </li>;
      })}
    </ol>
    <a className="workflow-preview-link" href="#simulator">Explore the conversation demo <ArrowUpRight size={17} aria-hidden="true" /></a>
  </div>;
}
