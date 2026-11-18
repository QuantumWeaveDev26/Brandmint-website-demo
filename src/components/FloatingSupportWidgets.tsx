import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useIsPresent } from 'framer-motion';
import { Bot, Send, X, ArrowUpRight, MessageCircle, Calendar } from 'lucide-react';
import brandmintLogo from '../assets/brandmint-logo.webp';
import type { RoutePath } from './MonoNavbar';
import { getBrandMintAiReply } from '../data/brandmintKnowledge';
import { trackBrandMintEvent } from '../utils/telemetry';

function PresenceSafePanel(props: React.ComponentProps<typeof motion.div>) {
  const present = useIsPresent();
  return <motion.div {...props} inert={!present} aria-hidden={!present}
    style={{ ...props.style, pointerEvents: present ? 'auto' : 'none' }} />;
}

interface FloatingSupportWidgetsProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath) => void;
  onOpenBooking: () => void;
  cookieBannerVisible?: boolean;
}

interface AgentMessage {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  actionLabel?: string;
  actionRoute?: RoutePath;
  openBooking?: boolean;
  externalUrl?: string;
}

const DEFAULT_PROMPTS = [
  'All 6 AI Solutions',
  'WhatsApp Automation',
  'Academy Programs',
  'Founders & Experience',
  'Quantum Weave™',
  'Book 30-Min Call',
];

export const FloatingSupportWidgets: React.FC<FloatingSupportWidgetsProps> = ({
  currentPath,
  onNavigate,
  onOpenBooking,
  cookieBannerVisible = false,
}) => {
  const [aiOpen, setAiOpen] = useState(false);
  const [waPreviewOpen, setWaPreviewOpen] = useState(false);
  const [input, setInput] = useState('');
  const [quickPrompts, setQuickPrompts] = useState<string[]>(DEFAULT_PROMPTS);
  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Hi, I'm Ishani — your BrandMint AI guide! Ask me about our AI Solutions, WhatsApp & CRM Automation, Academy programs, Founders, or booking a pilot call.",
      actionLabel: 'Explore AI Solutions',
      actionRoute: '/solutions',
    },
  ]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const launcherRef = useRef<HTMLButtonElement | null>(null);
  const contactMenuRef = useRef<HTMLDivElement | null>(null);
  const dockRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const viewport = window.visualViewport;
    const update = () => {
      if (!dockRef.current) return;
      const height = viewport?.height ?? window.innerHeight;
      dockRef.current.style.setProperty('--support-viewport-height', `${height}px`);
      const occlusion = Math.max(0, window.innerHeight - height - (viewport?.offsetTop ?? 0));
      dockRef.current.style.setProperty('--support-keyboard-offset', `${occlusion}px`);
      dockRef.current.dataset.compact = String(height < 480);
    };
    update();
    viewport?.addEventListener('resize', update);
    viewport?.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    return () => { viewport?.removeEventListener('resize', update); viewport?.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [cookieBannerVisible]);
  useEffect(() => {
    if (waPreviewOpen) contactMenuRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
  }, [waPreviewOpen]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && (aiOpen || waPreviewOpen)) {
        setAiOpen(false); setWaPreviewOpen(false);
        launcherRef.current?.focus();
      }
    };
    const onOutside = (event: PointerEvent) => {
      if (!dockRef.current?.contains(event.target as Node)) {
        setAiOpen(false); setWaPreviewOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onOutside);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onOutside);
    };
  }, [aiOpen, waPreviewOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, aiOpen]);

  const sendQuestion = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    trackBrandMintEvent('ishani_query', { route: currentPath, query_length: trimmed.length });
    const userMsg: AgentMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };
    const replyData = getBrandMintAiReply(trimmed, currentPath);
    const botMsgId = `b-${Date.now() + 1}`;
    const botMsg: AgentMessage = {
      id: botMsgId,
      role: 'assistant',
      text: replyData.text,
      actionLabel: replyData.actionLabel,
      actionRoute: replyData.actionRoute,
      openBooking: replyData.openBooking,
      externalUrl: replyData.externalUrl,
    };
    if (replyData.suggestedFollowUps && replyData.suggestedFollowUps.length > 0) {
      setQuickPrompts(replyData.suggestedFollowUps);
    }
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');

    // Optional Live RAG / Gemini Endpoint Override when VITE_ISHANI_API_URL is configured
    const liveRagUrl = import.meta.env.VITE_ISHANI_API_URL as string | undefined;
    if (liveRagUrl) {
      void fetch(liveRagUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmed, route: currentPath }),
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data: { text?: string } | null) => {
          if (data?.text) {
            setMessages((prev) =>
              prev.map((m) => (m.id === botMsgId ? { ...m, text: data.text as string } : m))
            );
          }
        })
        .catch(() => {});
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuestion(input);
  };

  const waUrl = `https://wa.me/919972965677?text=${encodeURIComponent(
    `Hi BrandMint AI Bengaluru! I am visiting ${currentPath} and would like to explore Enterprise AI solutions & pilot scoping.`
  )}`;

  if (cookieBannerVisible) return null;

  return (
    <div ref={dockRef} className="support-dock fixed right-4 sm:right-6 bottom-4 sm:bottom-6 z-50 flex flex-col items-end gap-3">
      {/* 1. Ishani AI Assistant Drawer */}
      <AnimatePresence mode="wait">
        {aiOpen && (
          <PresenceSafePanel key="ishani"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            role="region" aria-label="Ishani assistant" className="w-[calc(100vw-2rem)] max-w-[365px] rounded-2xl bg-[#0E0433]/98 border border-[#7265C2]/50 shadow-[0_26px_70px_rgba(5,1,20,0.94)] overflow-hidden flex flex-col mb-1"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#312185] to-[#7265C2] px-3.5 py-3 text-white flex items-center justify-between gap-2 border-b border-[#CCC7F2]/25">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-white p-0.5 overflow-hidden shrink-0 shadow-sm">
                  <img src={brandmintLogo} alt="Ishani - BrandMint AI" className="w-full h-full object-cover" />
                </div>
                <div className="text-left min-w-0">
                  <div className="font-display text-sm font-bold flex items-center gap-1.5 truncate">
                    <span>Ishani</span>
                    <span className="support-guide-badge text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#0E0433]/55 text-[#CCC7F2]">
                      AI Guide
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#34D399] shrink-0" />
                  </div>
                  <span className="text-[10px] text-[#CCC7F2] block truncate">
                    BrandMint service guide
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="support-whatsapp-switch inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-[#0A0224] text-[11px] font-bold shadow-sm transition-transform hover:scale-105"
                  aria-label="Switch to WhatsApp"
                  title="Switch to Official WhatsApp"
                >
                  <MessageCircle className="w-3 h-3 fill-current" />
                  <span>WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => { setAiOpen(false); launcherRef.current?.focus(); }}
                  className="p-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
                  aria-label="Close Ishani AI Assistant"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              role="log"
              data-lenis-prevent
              aria-label="Conversation with Ishani"
              aria-live="polite"
              className="h-[min(32dvh,250px)] p-3 overflow-y-auto bg-[#0A0224] space-y-2.5 text-left"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                      m.role === 'user'
                        ? 'btn-aurora text-white rounded-br-none font-medium'
                        : 'bg-[#160952] text-[#F5F3FF] border border-[#7265C2]/35 rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.text}</p>
                    {(m.actionRoute || m.openBooking || m.externalUrl) && (
                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        {m.externalUrl ? (
                          <a
                            href={m.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#312185] hover:bg-[#7265C2] border border-[#CCC7F2]/35 text-[#CCC7F2] hover:text-white text-[11px] font-semibold transition-colors"
                          >
                            <span>{m.actionLabel}</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              if (m.openBooking) {
                                setAiOpen(false);
                                onOpenBooking();
                              } else if (m.actionRoute) {
                                onNavigate(m.actionRoute);
                                setAiOpen(false);
                              }
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#312185] hover:bg-[#7265C2] border border-[#CCC7F2]/35 text-[#CCC7F2] hover:text-white text-[11px] font-semibold transition-colors cursor-pointer"
                          >
                            <span>{m.actionLabel}</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Dynamic Smart Quick Chips */}
            <div data-lenis-prevent className="support-quick-prompts px-3 py-2 bg-[#0E0433] border-t border-[#7265C2]/25 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {quickPrompts.map((qp) => (
                <button
                  key={qp}
                  type="button"
                  onClick={() => sendQuestion(qp)}
                  className="px-2.5 py-1 rounded-full bg-[#160952] hover:bg-[#312185] border border-[#7265C2]/30 text-[#CCC7F2] hover:text-white text-[11px] font-medium whitespace-nowrap transition-colors shrink-0 cursor-pointer"
                >
                  {qp}
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-2.5 bg-[#0E0433] border-t border-[#7265C2]/25 flex items-center gap-2">
              <input
                autoFocus
                type="text"
                aria-label="Ask Ishani"
                maxLength={1000}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Ishani about BrandMint AI..."
                className="flex-1 bg-[#160952] border border-[#7265C2]/35 focus:border-[#CCC7F2] rounded-full px-3.5 py-2 text-xs text-white placeholder:text-[#CCC7F2]/50 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-8 h-8 rounded-full btn-aurora text-white flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-default"
                aria-label="Send Message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </PresenceSafePanel>
        )}

      {/* One contact menu keeps secondary channels out of the page's reading path. */}
        {waPreviewOpen && !aiOpen && (
          <PresenceSafePanel key="contact"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            ref={contactMenuRef}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            role="region" aria-label="Contact BrandMint" data-lenis-prevent className="w-[min(320px,calc(100vw-2rem))] rounded-2xl bg-[#120642]/98 border border-[#7265C2]/45 shadow-[0_22px_55px_rgba(5,1,20,0.88)] overflow-hidden mb-1 text-left"
          >
            <div className="bg-gradient-to-r from-[#312185] to-[#7265C2] px-3.5 py-2.5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-current" />
                <span className="font-display text-xs font-bold">How can we help?</span>
              </div>
              <button
                type="button"
                onClick={() => { setWaPreviewOpen(false); launcherRef.current?.focus(); }}
                className="p-1 rounded-full hover:bg-white/20 text-white cursor-pointer"
                aria-label="Close contact options"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="p-3.5 space-y-2.5">
              <p className="text-xs text-[#CCC7F2] leading-relaxed">
                BrandMint AI Pvt. Ltd., Bengaluru (<span className="font-semibold text-white">+91 99729 65677</span>).
              </p>
              <div className="flex flex-col gap-2">
                <button type="button" className="home-secondary justify-center w-full" onClick={() => { setWaPreviewOpen(false); setAiOpen(true); }}>
                  <Bot size={17} aria-hidden="true" /> Ask Ishani about our services
                </button>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-[#0A0224] text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-colors"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://calendly.com/team-brandmint/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 rounded-full bg-[#160952] hover:bg-[#312185] border border-[#7265C2]/35 text-[#CCC7F2] hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Schedule Consultation</span>
                </a>
              </div>
            </div>
          </PresenceSafePanel>
        )}
      </AnimatePresence>

      <button ref={launcherRef} type="button" className="support-unified-launcher"
        aria-label="Talk to us" aria-expanded={waPreviewOpen || aiOpen}
        onClick={() => {
          if (aiOpen || waPreviewOpen) { setAiOpen(false); setWaPreviewOpen(false); }
          else setWaPreviewOpen(true);
        }}>
        {aiOpen || waPreviewOpen ? <X size={20} aria-hidden="true" /> : <MessageCircle size={20} aria-hidden="true" />}
        <span>Talk to us</span>
      </button>
    </div>
  );
};
