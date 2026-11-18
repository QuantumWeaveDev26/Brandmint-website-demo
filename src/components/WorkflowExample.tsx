import { useEffect, useRef, useState } from 'react';
import { ArrowRight, MessageCircle, Sparkles, Database, UserCheck } from 'lucide-react';
import { SmartVideo } from './SmartVideo';
import { useMotionSettings } from './MotionSettings';

const FLOW_NODES = [
  { code: '01', label: 'Signal Captured', sub: 'Web & Inbound', icon: MessageCircle },
  { code: '02', label: 'Context Matched', sub: 'Approved Data', icon: Sparkles },
  { code: '03', label: 'Pipeline Synced', sub: 'Zero Manual Entry', icon: Database },
  { code: '04', label: 'Team Briefed', sub: 'Ready to Close', icon: UserCheck },
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

  return (
    <section
      id="workflow-example"
      ref={sectionRef}
      className="max-w-5xl mx-auto w-full px-4 py-10 sm:py-14"
    >
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left: True 16:9 Direct-Composited Live Video Portal */}
        <div className="lg:col-span-7">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden glass-frame bg-[#0E0433]">
            <SmartVideo
              src="/videos/home-whatsapp-crm.mp4"
              className="w-full h-full object-cover saturate-115 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0224]/45 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3.5 z-20 px-2.5 py-0.5 rounded-full bg-[#0A0224]/65 border border-white/15 text-[11px] text-white/85 font-medium pointer-events-none">
              Capture → Context → Pipeline
            </div>
          </div>
        </div>

        {/* Right: Concise Headline + 2x2 Signal Nodes */}
        <div className="lg:col-span-5 text-left space-y-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-white">
              Enquiry In.{' '}
              <span className="font-editorial text-3xl sm:text-[38px] text-aurora pr-1">
                Team Ready.
              </span>
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#CCC7F2]/80 leading-relaxed">
              Every customer message becomes a synced CRM record and human-ready handoff.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 relative">
            {FLOW_NODES.map((node, idx) => {
              const Icon = node.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  type="button"
                  key={node.code}
                  aria-pressed={isActive}
                  data-active={isActive}
                  data-running={running}
                  onClick={() => { setActiveStep(idx); setManual(true); }}
                  className={`workflow-node relative p-3 rounded-xl border transition-all duration-500 cursor-pointer overflow-hidden text-left ${
                    isActive
                      ? 'bg-[#312185]/88 border-[#CCC7F2]/65 -translate-y-0.5 shadow-[0_10px_24px_rgba(114,101,194,0.36)]'
                      : 'bg-[#120642]/65 border-[#7265C2]/30 hover:border-[#7265C2]/60'
                  }`}
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#CCC7F2] to-transparent transition-opacity duration-200 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-[#CCC7F2]/75 tabular-nums">{node.code}</span>
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#7265C2]'}`} />
                  </div>
                  <div className="font-display text-xs sm:text-sm font-bold text-white leading-snug">{node.label}</div>
                  <div className="text-[11px] text-[#CCC7F2]/75 mt-0.5">{node.sub}</div>
                  {isActive && <span key={activeStep} className="workflow-node-progress" aria-hidden="true" />}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onOpenBooking}
            className="px-4 py-2 rounded-full btn-aurora inline-flex items-center gap-1.5 text-xs font-semibold text-white cursor-pointer"
          >
            <span>Scope This Workflow</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
