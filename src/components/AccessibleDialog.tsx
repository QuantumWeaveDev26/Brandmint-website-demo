import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
export function AccessibleDialog({ isOpen, onClose, title, children }: {
  isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    if (!isOpen || !ref.current) return;
    const el = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    el.showModal();
    document.body.style.overflow = 'hidden';
    window.__lenis?.stop();
    (el.querySelector('[data-initial-focus]') as HTMLElement | null)?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); closeRef.current(); }
      if (event.key !== 'Tab') return;
      const items = Array.from(el.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),textarea,select,[tabindex="0"]'));
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    el.addEventListener('keydown', onKey);
    return () => {
      el.removeEventListener('keydown', onKey); el.close();
      document.body.style.overflow = overflow; window.__lenis?.start();
      if (previous?.isConnected) previous.focus();
    };
  }, [isOpen]);
  if (!isOpen) return null;
  return <dialog ref={ref} data-lenis-prevent aria-modal="true" aria-label={title} onCancel={event => { event.preventDefault(); onClose(); }}
    onClick={event => { if (event.target === ref.current) onClose(); }}
    className="brandmint-dialog m-auto w-[calc(100%-2rem)] max-w-lg max-h-[90dvh] overflow-y-auto rounded-3xl border border-[#7265C2]/50 bg-[#0E0433] p-6 sm:p-8 text-white shadow-2xl">
    <div className="flex items-start justify-between gap-4 mb-4"><h2 className="font-display text-2xl font-bold">{title}</h2>
      <button type="button" onClick={onClose} aria-label="Close dialog" className="shrink-0 min-w-11 min-h-11 rounded-full border border-[#7265C2]/50 flex items-center justify-center hover:bg-[#312185]"><X className="w-4 h-4" /></button></div>
    {children}
  </dialog>;
}
