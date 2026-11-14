import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Calendar, MessageCircle } from 'lucide-react';
import { AccessibleDialog } from './AccessibleDialog';
import { dispatchLeadWebhook } from '../utils/telemetry';

const OUTCOMES = ['Improve customer follow-up', 'Reduce repetitive work', 'Support leaders & learners', 'Help me choose'];
const fieldClass = 'w-full bg-[#120642] rounded-xl px-3.5 py-3 text-base text-white placeholder:text-[#CCC7F2]/70 border border-[#7265C2]/50';

export const MonoBookingModal: React.FC<{ isOpen: boolean; onClose: () => void; focusArea?: string }> = ({ isOpen, onClose, focusArea }) => {
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [phone, setPhone] = useState('');
  const [outcome, setOutcome] = useState('Help me choose');
  const [draftUrl, setDraftUrl] = useState('');
  useEffect(() => { if (isOpen) setDraftUrl(''); }, [isOpen]);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatchLeadWebhook({
      source: 'booking_modal',
      name: name.trim(),
      organisation: business.trim() || undefined,
      phone: phone.replace(/[^+0-9]/g, ''),
      focusArea: focusArea || outcome,
      notes: outcome,
      route: window.location.pathname,
    });
    const message = `Hi BrandMint AI,\nI would like to discuss a pilot.\nName: ${name.trim()}\nOrganisation: ${business.trim() || 'Not specified'}\nPhone: ${phone.replace(/[^+0-9]/g, '')}\nGoal: ${outcome}\nSolution: ${focusArea || 'Please recommend a starting point'}`;
    const url = `https://wa.me/919972965677?text=${encodeURIComponent(message)}`;
    setDraftUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  return <AccessibleDialog isOpen={isOpen} onClose={onClose} title="Scope a pilot">
    <p className="text-sm leading-relaxed text-[#CCC7F2] mb-5">Tell us what you want to improve. We’ll scope one workflow and agree how to measure it.</p>
    {focusArea && <p className="text-sm text-white mb-4">Solution focus: <strong>{focusArea}</strong></p>}
    <form onSubmit={handleSubmit} className="space-y-4" onChange={() => setDraftUrl('')}>
      <fieldset><legend className="text-sm font-semibold text-[#CCC7F2] mb-2">What would you like to improve?</legend>
        <div className="grid grid-cols-2 gap-2">{OUTCOMES.map(value => <button key={value} type="button" aria-pressed={outcome === value} onClick={() => { setOutcome(value); setDraftUrl(''); }}
          className={`min-h-11 rounded-xl px-3 py-2 text-sm text-left border ${outcome === value ? 'bg-[#312185] border-[#CCC7F2] text-white' : 'border-[#7265C2]/40 text-[#CCC7F2]'}`}>{value}</button>)}</div>
      </fieldset>
      <div><label htmlFor="pilot-name" className="block text-sm mb-1.5">Your name *</label><input id="pilot-name" data-initial-focus name="name" autoComplete="name" required maxLength={100} value={name} onChange={event => { event.target.setCustomValidity(event.target.value.trim() ? '' : 'Enter your name.'); setName(event.target.value); }} className={fieldClass} /></div>
      <div><label htmlFor="pilot-business" className="block text-sm mb-1.5">Organisation (optional)</label><input id="pilot-business" name="organization" autoComplete="organization" maxLength={150} value={business} onChange={event => setBusiness(event.target.value)} className={fieldClass} /></div>
      <div><label htmlFor="pilot-phone" className="block text-sm mb-1.5">Phone / WhatsApp number *</label><input id="pilot-phone" type="tel" name="tel" autoComplete="tel" inputMode="tel" required minLength={7} maxLength={24} title="Enter 7–24 characters using digits, spaces, +, brackets or hyphens." value={phone} onChange={event => {
        const value = event.target.value;
        const digits = value.replace(/\D/g, '');
        const allowed = /^[+0-9() .-]+$/.test(value) && /^[+]?[^+]*$/.test(value);
        event.target.setCustomValidity(allowed && digits.length >= 7 && digits.length <= 15 ? '' : 'Enter a phone number with 7–15 digits, including your country code.');
        setPhone(value);
      }} className={fieldClass} />
        <p className="text-xs leading-relaxed text-[#CCC7F2] mt-1.5">Include your country code, for example +91 99999 99999.</p></div>
      <p className="text-xs leading-relaxed text-[#CCC7F2]">This prepares a draft with your details. Review and send it in WhatsApp to share your enquiry with BrandMint AI. No call is booked by this form.</p>
      <button type="submit" className="w-full min-h-12 rounded-full btn-aurora text-white text-sm font-semibold flex items-center justify-center gap-2"><MessageCircle className="w-4 h-4" />Continue in WhatsApp</button>
      {draftUrl && <div role="status" className="rounded-xl bg-[#160952] border border-[#7265C2]/50 p-4 text-sm leading-relaxed"><p>Your draft is ready. Review and send it in WhatsApp. If a new tab did not open, use the link below.</p><a href={draftUrl} target="_blank" rel="noopener noreferrer" className="underline inline-flex items-center gap-1 mt-2 min-h-11">Open WhatsApp draft<ArrowUpRight className="w-4 h-4" /></a></div>}
    </form>
    <a href="https://calendly.com/team-brandmint/30min" target="_blank" rel="noopener noreferrer" className="mt-4 min-h-11 inline-flex items-center gap-2 text-sm text-[#CCC7F2] underline"><Calendar className="w-4 h-4" />Choose a 30-minute call time instead</a>
  </AccessibleDialog>;
};
