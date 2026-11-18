import { useEffect, useRef, useState } from 'react';
import { ArrowRight, MessageCircle, Sparkles, Database, UserCheck } from 'lucide-react';
import { SmartVideo } from './SmartVideo';
import { useMotionSettings } from './MotionSettings';

const FLOW_NODES = [
  { code: '01', label: 'Signal Captured', sub: 'Web & Inbound', detail: 'A customer starts a conversation. The enquiry enters the workflow with its original message attached.', icon: MessageCircle },
  { code: '02', label: 'Context Matched', sub: 'Approved Data', detail: 'Your approved business information gives the reply its context, so the conversation can move forward.', icon: Sparkles },
  { code: '03', label: 'Pipeline Synced', sub: 'Zero Manual Entry', detail: 'The enquiry and conversation stay together in your CRM, without another copy-paste update.', icon: Database },
  { code: '04', label: 'Team Briefed', sub: 'Ready to Close', detail: 'The right teammate gets the conversation and the context they need to take over.', icon: UserCheck },
];

export function WorkflowExample({ onOpenBooking }: { onOpenBooking: () => void }) {
  const [activeStep, setActiveStep] = useState(0);
  const [near, setNear] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const [manual, setManual] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const { paused } = useMotionSettings();
  const running = near && pageVisible && !paused && !manual;
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(node);
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility); };
  }, []);
  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setActiveStep(previous => (previous + 1) % FLOW_NODES.length), 2000);
    return () => clearInterval(timer);
  }, [running]);

  const current = FLOW_NODES[activeStep];
  return <section id="workflow-example" ref={sectionRef} className="section-shell workflow-story" aria-labelledby="workflow-heading">
    <header className="workflow-story-heading">
      <h2 id="workflow-heading">Enquiry in.<br /><span className="font-editorial">Team ready.</span></h2>
      <p>Every customer message becomes a synced CRM record and human-ready handoff.</p>
    </header>
    <div className="workflow-story-layout">
      <div className="workflow-story-film">
        <SmartVideo src="/videos/home-whatsapp-crm.mp4" className="w-full h-full object-cover" />
        <div className="workflow-film-caption"><MessageCircle size={18} aria-hidden="true" /><span>Capture → Context → Pipeline</span></div>
      </div>
      <div className="workflow-story-sequence">
        <ol className="workflow-rail">
          {FLOW_NODES.map((node, idx) => { const Icon = node.icon; return <li key={node.code} data-complete={idx < activeStep}>
            <button type="button" className="workflow-node" aria-label={`${node.code} ${node.label}, ${node.sub}`} aria-pressed={activeStep === idx} data-active={activeStep === idx} data-running={running}
              onClick={() => { setActiveStep(idx); setManual(true); }}>
              <span className="workflow-rail-marker"><Icon size={20} aria-hidden="true" /></span>
              <span className="workflow-rail-copy"><strong>{node.label}</strong><span>{node.sub}</span></span>
              {activeStep === idx && <span key={activeStep} className="workflow-node-progress" aria-hidden="true" />}
            </button>
          </li>; })}
        </ol>
        <p className="workflow-story-detail" key={activeStep}>{current.detail}</p>
        <button type="button" className="workflow-story-link" onClick={onOpenBooking}>Scope this workflow <ArrowRight size={18} aria-hidden="true" /></button>
      </div>
    </div>
  </section>;
}
