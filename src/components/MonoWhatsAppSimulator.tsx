import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCheck, Sparkles, ArrowUpRight, ArrowRight } from 'lucide-react';
import brandmintLogo from '../assets/brandmint-logo.webp';
import { useMotionSettings } from './MotionSettings';
import { ProTiltCard } from './ProTiltCard';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  badge?: string;
}

interface Scenario {
  id: string;
  shortName: string;
  messages: [
    { text: string; time: string; log: string },
    { text: string; time: string; badge: string; log: string },
    { text: string; time: string; log: string },
    { text: string; time: string; badge: string; log: string },
  ];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'instant-lead-reply',
    shortName: 'Instant Lead Reply',
    messages: [
      {
        text: 'Hi, we need automated WhatsApp follow-ups connected to our CRM.',
        time: '10:02 AM',
        log: '01 • Inbound WhatsApp Captured',
      },
      {
        text: 'Welcome! Which CRM does your team run today, and roughly how many daily leads arrive?',
        time: '10:02 AM',
        badge: 'Auto-Reply • < 2s',
        log: '02 • Context-Aware Reply Sent',
      },
      {
        text: 'HubSpot — around 140 enquiries a day across Meta & web.',
        time: '10:03 AM',
        log: '03 • Lead Qualified & Synced',
      },
      {
        text: 'Logged to HubSpot. Your solutions architect has the brief and slot options are ready.',
        time: '10:03 AM',
        badge: 'CRM Updated',
        log: '04 • Human Closer Alerted',
      },
    ],
  },
  {
    id: 'appointment-flow',
    shortName: 'Smart Follow-Up',
    messages: [
      {
        text: 'Can you share the workflow blueprint we discussed yesterday?',
        time: '11:18 AM',
        log: '01 • Returning Contact Matched',
      },
      {
        text: 'Sent! Here is your tailored AI integration roadmap plus two review windows for Thursday.',
        time: '11:18 AM',
        badge: 'Smart Dispatch',
        log: '02 • Approved Deck Shared',
      },
      {
        text: 'Thursday 4 PM works for our operations head.',
        time: '11:19 AM',
        log: '03 • Calendar Window Confirmed',
      },
      {
        text: 'Confirmed for Thursday 4:00 PM IST — calendar invite and agenda dispatched.',
        time: '11:19 AM',
        badge: 'Invite Sent',
        log: '04 • Calendar & Pipeline Updated',
      },
    ],
  },
  {
    id: 'executive-pulse',
    shortName: 'Executive Pulse',
    messages: [
      {
        text: 'Share today’s WhatsApp pipeline summary and pending approvals.',
        time: '05:45 PM',
        log: '01 • Leadership Query Verified',
      },
      {
        text: 'Today: 94 enquiries answered automatically, 28 qualified demos, 2 enterprise quotes awaiting sign-off.',
        time: '05:45 PM',
        badge: 'Live Digest',
        log: '02 • Live Metrics Synthesised',
      },
      {
        text: 'Approve both enterprise quotes and notify the account lead.',
        time: '05:46 PM',
        log: '03 • Executive Approval Logged',
      },
      {
        text: 'Approved and routed — account lead notified with full audit trail.',
        time: '05:46 PM',
        badge: 'Action Closed',
        log: '04 • Audit Trail Recorded',
      },
    ],
  },
];

interface MonoWhatsAppSimulatorProps {
  onOpenBooking?: () => void;
}

export const MonoWhatsAppSimulator: React.FC<MonoWhatsAppSimulatorProps> = ({ onOpenBooking }) => {
  const { paused } = useMotionSettings();
  const [step, setStep] = useState(1);
  const [activeIdx, setActiveIdx] = useState(0);
  const [chosenByVisitor, setChosenByVisitor] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry) setInView(entry.isIntersecting);
      },
      { rootMargin: '220px 0px', threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused) return;
    if (step >= 4) {
      if (chosenByVisitor) return;
      const nextTimer = setTimeout(() => {
        setActiveIdx((i) => (i + 1) % SCENARIOS.length);
        setStep(1);
      }, 3200);
      return () => clearTimeout(nextTimer);
    }
    const timer = setTimeout(() => setStep((s) => s + 1), 1550);
    return () => clearTimeout(timer);
  }, [activeIdx, step, inView, paused, chosenByVisitor]);

  const activeScenario = SCENARIOS[activeIdx];
  const visibleSteps = paused ? 4 : step;
  const messages: ChatMessage[] = activeScenario.messages
    .slice(0, visibleSteps)
    .map((m, idx) => ({
      id: `${activeScenario.id}-${idx}`,
      sender: idx % 2 === 0 ? 'user' : 'bot',
      text: m.text,
      time: m.time,
      badge: 'badge' in m ? m.badge : undefined,
    }));

  const isTyping = !paused && visibleSteps < 4;

  return (
    <section
      id="simulator"
      ref={sectionRef}
      className="relative py-12 sm:py-16 px-4 max-w-5xl mx-auto w-full z-10 select-none"
    >
      {/* Compact Header + Scenario Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7">
        <div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Automated Messages{' '}
            <span className="font-editorial text-3xl sm:text-[42px] text-aurora pr-1">
              in Real Time.
            </span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#CCC7F2]">Illustrative demo using scripted messages. Explore how an enquiry could move from first reply to team handoff.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {SCENARIOS.map((sc, i) => {
            const isActive = activeIdx === i;
            return (
              <button
                type="button"
                key={sc.id}
                aria-pressed={isActive}
                onClick={() => {
                  setActiveIdx(i);
                  setStep(1);
                  setChosenByVisitor(true);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                  isActive
                    ? 'btn-aurora text-white border-transparent font-semibold'
                    : 'bg-[#120642]/80 text-[#CCC7F2] border-[#7265C2]/35 hover:border-[#CCC7F2]/65 hover:text-white'
                }`}
              >
                {sc.shortName}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Real-Time Automation Trigger Telemetry */}
        <div className="lg:col-span-5 flex flex-col">
          <ProTiltCard maxTilt={3} className="p-5 rounded-3xl glass-frame flex flex-col justify-between flex-1 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs text-[#CCC7F2] pb-3 border-b border-[#7265C2]/25">
                <span className="font-semibold text-white">Automation Trigger Log</span>
                <span className="inline-flex items-center gap-1.5 text-[#25D366] text-[11px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span>Auto-Synced</span>
                </span>
              </div>

              <div className="space-y-2">
                {activeScenario.messages.map((item, idx) => {
                  const reached = idx < visibleSteps;
                  const current = idx === visibleSteps - 1;
                  return (
                    <div
                      key={`${activeScenario.id}-log-${idx}`}
                      className={`text-xs px-3.5 py-2.5 rounded-2xl border flex items-center justify-between gap-2 transition-all duration-200 ${
                        current
                          ? 'bg-[#312185]/90 border-[#CCC7F2]/65 text-white font-semibold shadow-[0_8px_20px_rgba(114,101,194,0.28)]'
                          : reached
                          ? 'bg-[#160952]/75 border-[#7265C2]/35 text-[#CCC7F2]'
                          : 'bg-[#0E0433]/55 border-[#7265C2]/15 text-[#CCC7F2]/40'
                      }`}
                    >
                      <span className="truncate">{item.log}</span>
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          current
                            ? 'bg-[#25D366]'
                            : reached
                            ? 'bg-[#CCC7F2]'
                            : 'bg-[#7265C2]/30'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-[#7265C2]/25 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] text-[#CCC7F2]/80">
                24/7 Instant Replies • Human Override
              </span>
              {onOpenBooking && (
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-white hover:text-[#CCC7F2] transition-colors cursor-pointer"
                >
                  <span>Deploy Yours</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </ProTiltCard>
        </div>

        {/* Right: Smartphone Mockup with Live Automated WhatsApp Messages */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <ProTiltCard
            maxTilt={4}
            className="w-full max-w-[350px] rounded-[42px] p-2 bg-gradient-to-b from-[#312185]/95 via-[#160952] to-[#0A0224] border border-[#CCC7F2]/30 shadow-[0_28px_70px_rgba(4,1,20,0.9),0_0_40px_rgba(114,101,194,0.22)]"
          >
            <div className="w-full rounded-[34px] overflow-hidden bg-[#09021E] border border-[#7265C2]/30 flex flex-col">
              {/* Phone Status Bar + Dynamic Island */}
              <div className="bg-[#120642] px-5 pt-2.5 pb-1.5 flex items-center justify-between text-[10px] font-semibold text-white/90">
                <span className="tabular-nums">9:41</span>
                <div className="w-20 h-4 rounded-full bg-[#040110] border border-white/10 flex items-center justify-end px-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#312185] ring-1 ring-[#7265C2]/50" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-end gap-[1.5px] h-2.5" aria-hidden="true">
                    <span className="w-[2px] h-1 bg-white/85 rounded-full" />
                    <span className="w-[2px] h-1.5 bg-white/85 rounded-full" />
                    <span className="w-[2px] h-2 bg-white/85 rounded-full" />
                    <span className="w-[2px] h-2.5 bg-white/85 rounded-full" />
                  </span>
                  <span className="w-4 h-2 rounded-[3px] border border-white/70 p-[1px] flex items-center" aria-hidden="true">
                    <span className="w-full h-full bg-[#25D366] rounded-[1px]" />
                  </span>
                </div>
              </div>

              {/* WhatsApp Header */}
              <div className="bg-gradient-to-r from-[#160952] via-[#312185] to-[#160952] border-b border-[#7265C2]/35 px-3.5 py-2.5 flex items-center justify-between text-white">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-white p-0.5 overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
                    <img src={brandmintLogo} alt="BrandMint AI" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left min-w-0">
                    <div className="flex items-center gap-1.5 font-display font-bold text-xs text-white truncate">
                      <span className="truncate">BrandMint WhatsApp AI</span>
                      <span className="w-2 h-2 rounded-full bg-[#25D366] shrink-0" />
                    </div>
                    <span className="text-[10px] text-[#CCC7F2] flex items-center gap-1 truncate">
                      <CheckCheck className="w-3 h-3 text-[#25D366] shrink-0" />
                      <span className="truncate">Verified Business • Online</span>
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#0E0433]/85 border border-[#25D366]/40 text-[#25D366] text-[9px] font-semibold shrink-0">
                  Automated
                </span>
              </div>

              {/* Phone Screen Message Stage (Fixed Height — Never Enlarges) */}
              <div data-lenis-prevent className="h-[355px] overflow-y-auto aurora-dots-bg px-3 py-3 flex flex-col justify-between gap-2.5 text-xs [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="space-y-2.5">
                <AnimatePresence mode="popLayout">
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-snug text-left shadow-md ${
                          m.sender === 'user'
                            ? 'bg-[#312185] text-white border border-[#CCC7F2]/35 rounded-br-sm'
                            : 'bg-[#120642]/95 text-[#F5F3FF] border border-[#7265C2]/45 rounded-bl-sm'
                        }`}
                      >
                        {m.badge && (
                          <div className="inline-flex items-center gap-1 text-[10px] bg-[#25D366]/15 border border-[#25D366]/40 text-[#86EFAC] px-2 py-0.5 rounded-full font-semibold mb-1">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>{m.badge}</span>
                          </div>
                        )}
                        <p className="text-xs leading-relaxed">{m.text}</p>
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <span className="text-[10px] text-[#CCC7F2]/70 tabular-nums">{m.time}</span>
                          <CheckCheck className="w-3 h-3 text-[#25D366] inline" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="h-6 flex items-center">
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-[#160952]/90 rounded-full border border-[#7265C2]/40"
                    >
                      <span className="text-[10px] text-[#CCC7F2] font-medium">
                        {visibleSteps % 2 === 1 ? 'AI replying automatically' : 'Incoming WhatsApp message'}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-[#25D366] animate-pulse" />
                        <span className="w-1 h-1 rounded-full bg-[#7265C2] animate-pulse [animation-delay:140ms]" />
                        <span className="w-1 h-1 rounded-full bg-[#CCC7F2] animate-pulse [animation-delay:280ms]" />
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

              {/* Action Bar */}
              <div className="bg-[#0E0433] px-3 py-2 flex items-center justify-between gap-2 border-t border-[#7265C2]/30 text-[11px] relative z-30">
                <a
                  href="https://wa.me/919972965677?text=Hi%20BrandMint%20AI%2C%20I%20would%20like%20to%20test%20WhatsApp%20Automation%20for%20our%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-[#051b0d] font-bold transition-all"
                >
                  <span>Try Live</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
                {onOpenBooking && (
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="px-3 py-1.5 rounded-full bg-[#160952] hover:bg-[#312185] border border-[#7265C2]/40 text-[#CCC7F2] hover:text-white font-semibold transition-all cursor-pointer"
                  >
                    Scope Automation
                  </button>
                )}
              </div>

              {/* Phone Home Indicator */}
              <div className="bg-[#09021E] pt-1 pb-2 flex justify-center">
                <span className="w-24 h-1 rounded-full bg-white/30" aria-hidden="true" />
              </div>
            </div>
          </ProTiltCard>
        </div>
      </div>
    </section>
  );
};
