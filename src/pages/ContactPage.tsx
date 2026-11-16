import React, { useState } from 'react';
import { ArrowUpRight, Mail, MapPin, MessageCircle, ArrowRight, Sparkles, Calendar, FileText } from 'lucide-react';
import { ScrollStageTransform } from '../components/ScrollStageTransform';
import { ProTiltCard } from '../components/ProTiltCard';
import { SmartVideo } from '../components/SmartVideo';
import { dispatchLeadWebhook } from '../utils/telemetry';

const PATHWAYS = ['Improve follow-up', 'Automate workflows', 'Executive & campus AI', 'Help me choose'];

const CHANNELS = [
  { name: 'LinkedIn', handle: 'BrandMint AI Pvt. Ltd.', url: 'https://www.linkedin.com/company/brandmintai-pvt-ltd/' },
  { name: 'AI Campus', handle: 'hybridai.in', url: 'https://hybridai.in/' },
  { name: 'Instagram', handle: '@team.brandmint', url: 'https://www.instagram.com/team.brandmint?exln=cjRvaWRkN3hhMzht' },
  { name: 'YouTube', handle: '@brandmintai', url: 'https://www.youtube.com/@brandmintai' },
];

export const ContactPage: React.FC = () => {
  const [selectedPathway, setSelectedPathway] = useState('Help me choose');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [draftUrl, setDraftUrl] = useState('');

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatchLeadWebhook({
      source: 'contact_page',
      name: name.trim(),
      organisation: company.trim() || undefined,
      email: email.trim(),
      focusArea: selectedPathway,
      notes: note.trim() || undefined,
      route: '/contact',
    });
    const msg = encodeURIComponent(
      `Hi BrandMint AI Executive Team (Bengaluru),\n\nName: ${name}\nOrganisation: ${company || 'N/A'}\nWork Email: ${email}\nSolution Focus: ${selectedPathway}\nContext: ${note || 'We would like to explore a tailored Enterprise AI pilot.'}`
    );
    const url = `https://wa.me/919972965677?text=${msg}`;
    setDraftUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full pt-20 pb-8">
      {/* 1. Hero Banner */}
      <section className="relative pt-12 pb-12 px-4 overflow-hidden bg-[#0A0224]">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#0A0224]">
          <SmartVideo
            src="/videos/rel-bengaluru-office.mp4"
            priority
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-[#0A0224]/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0224]/65 via-transparent to-[#0A0224]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#CCC7F2]/35 bg-[#120642]/92 text-xs font-medium text-[#CCC7F2] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#CCC7F2]" />
            <span>Corporate Headquarters &bull; Bengaluru</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.06]">
            Start With One{' '}
            <span className="block font-editorial text-4xl sm:text-[54px] text-aurora leading-[1.04] py-0.5">
              Focused Conversation.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-[#F5F3FF]/90 max-w-xl mx-auto mt-2.5 leading-relaxed">
            Connect with our leadership desk in Bengaluru to scope a high-impact AI pilot.
          </p>

          <div className="mt-6 flex justify-center">
            <a
              href="https://calendly.com/team-brandmint/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full btn-aurora text-white font-semibold text-xs sm:text-sm inline-flex items-center gap-1.5 transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book 30-Min Discovery Call</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Consultation Dispatch + Corporate Desk */}
      <ScrollStageTransform>
        <section className="max-w-5xl mx-auto w-full px-4 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-5 space-y-3 text-left">
              <ProTiltCard maxTilt={3.5} className="p-5 rounded-2xl glass-frame space-y-2.5">
                <span className="text-[11px] font-semibold text-[#CCC7F2] uppercase tracking-wider pb-2 border-b border-[#7265C2]/25 block">
                  Corporate Desk &bull; Bengaluru
                </span>

                <a
                  href="mailto:connect@brandmintai.io"
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#120642] border border-[#7265C2]/35 hover:border-[#CCC7F2] text-white transition-all relative z-20"
                >
                  <Mail className="w-4 h-4 shrink-0 text-[#CCC7F2]" />
                  <div className="min-w-0">
                    <span className="text-[10px] text-[#CCC7F2]/70 font-medium block">Email</span>
                    <span className="text-xs font-semibold truncate block">connect@brandmintai.io</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/919972965677"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl btn-aurora text-white transition-all relative z-20"
                >
                  <MessageCircle className="w-4 h-4 shrink-0 text-[#25D366] fill-current" />
                  <div>
                    <span className="text-[10px] text-[#CCC7F2] font-medium block">Official WhatsApp</span>
                    <span className="text-xs font-bold tabular-nums">+91 99729 65677</span>
                  </div>
                </a>

                <a
                  href="https://brandmint-connect.brandmintai.chatgpt.site/BrandMint_AI_Company_and_Solutions_Brief.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 p-3 rounded-xl bg-[#120642] border border-[#7265C2]/35 hover:border-[#CCC7F2] text-white transition-all relative z-20"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="w-4 h-4 shrink-0 text-[#CCC7F2]" />
                    <span className="text-xs font-semibold truncate">Solutions Brief (PDF)</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-[#CCC7F2]" />
                </a>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0E0433] border border-[#7265C2]/30">
                  <MapPin className="w-4 h-4 text-[#7265C2] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#CCC7F2] leading-relaxed">
                    No. 3, Lingappa Layout, 1st Cross, Sri Sri Sri Shivakumara Swamiji Road, Bengaluru – 560090
                  </span>
                </div>
              </ProTiltCard>

              <div className="grid grid-cols-2 gap-2.5">
                {CHANNELS.map((c) => (
                  <a
                    key={c.name}
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl glass-card flex items-center justify-between hover:border-[#CCC7F2] transition-all"
                  >
                    <div className="min-w-0">
                      <span className="font-display text-xs font-bold text-white block truncate">{c.name}</span>
                      <span className="text-[11px] text-[#CCC7F2]/70 truncate block">{c.handle}</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-[#CCC7F2]" />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 rounded-2xl p-5 sm:p-6 glass-frame text-left">
              <form onSubmit={handleDispatch} onChange={() => setDraftUrl('')} className="space-y-4">
                <div className="pb-3 border-b border-[#7265C2]/25">
                  <span className="text-xs font-semibold text-[#CCC7F2] block mb-2">
                    Priority Area
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {PATHWAYS.map((p) => (
                      <button
                        type="button"
                        key={p}
                        aria-pressed={selectedPathway === p}
                        onClick={() => {
                          setSelectedPathway(p);
                          setDraftUrl('');
                        }}
                        className={`px-3 py-1 rounded-full text-xs border transition-all cursor-pointer ${
                          selectedPathway === p
                            ? 'btn-aurora text-white border-transparent font-semibold'
                            : 'bg-[#120642]/85 text-[#CCC7F2] border-[#7265C2]/30 hover:border-[#CCC7F2]/60'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs text-[#CCC7F2] font-semibold mb-1">
                      Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      maxLength={150}
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-xl bg-[#0E0433] border border-[#7265C2]/35 focus:border-[#CCC7F2] px-3 py-2 text-sm text-white placeholder:text-[#CCC7F2]/40 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-company" className="block text-xs text-[#CCC7F2] font-semibold mb-1">
                      Organisation
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      autoComplete="organization"
                      maxLength={150}
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Company or institution"
                      className="w-full rounded-xl bg-[#0E0433] border border-[#7265C2]/35 focus:border-[#CCC7F2] px-3 py-2 text-sm text-white placeholder:text-[#CCC7F2]/40 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs text-[#CCC7F2] font-semibold mb-1">
                    Work Email *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    autoComplete="email"
                    maxLength={150}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@organisation.com"
                    className="w-full rounded-xl bg-[#0E0433] border border-[#7265C2]/35 focus:border-[#CCC7F2] px-3 py-2 text-sm text-white placeholder:text-[#CCC7F2]/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="contact-note" className="block text-xs text-[#CCC7F2] font-semibold mb-1">
                    Workflow or Outcome to Explore
                  </label>
                  <textarea
                    id="contact-note"
                    name="note"
                    autoComplete="off"
                    maxLength={2000}
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="e.g. WhatsApp & CRM automation, AI workforce assistants, or Academy training..."
                    className="w-full rounded-xl bg-[#0E0433] border border-[#7265C2]/35 focus:border-[#CCC7F2] px-3 py-2 text-sm text-white placeholder:text-[#CCC7F2]/40 focus:outline-none resize-none"
                  />
                </div>

                <p className="text-xs leading-relaxed text-[#CCC7F2]/80">
                  Prepares a WhatsApp draft for you to review and send.
                </p>
                {draftUrl && (
                  <div role="status" className="text-xs leading-relaxed text-[#CCC7F2] bg-[#160952] rounded-xl p-3">
                    <p>Draft ready — if WhatsApp did not open automatically:</p>
                    <a href={draftUrl} target="_blank" rel="noopener noreferrer" className="underline font-semibold inline-block mt-1">
                      Open WhatsApp draft
                    </a>
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full py-3 rounded-full btn-aurora text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Continue in WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </section>
      </ScrollStageTransform>
    </div>
  );
};
