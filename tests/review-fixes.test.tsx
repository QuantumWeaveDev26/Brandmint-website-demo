import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MonoBookingModal } from '../src/components/MonoBookingModal';
import { MonoRoiCalculator } from '../src/components/MonoRoiCalculator';
import { ProTiltCard } from '../src/components/ProTiltCard';
import { SolutionsPage } from '../src/pages/SolutionsPage';
import { FloatingSupportWidgets } from '../src/components/FloatingSupportWidgets';
import { ContactPage } from '../src/pages/ContactPage';
import { MotionSettings, MotionToggle } from '../src/components/MotionSettings';
import { SmartVideo } from '../src/components/SmartVideo';
import { WorkflowTransformationPlayground } from '../src/components/WorkflowTransformationPlayground';
import { MonoWhatsAppSimulator } from '../src/components/MonoWhatsAppSimulator';

describe('review regressions', () => {
  it('labels enquiry fields and keeps an honest, recoverable WhatsApp handoff', () => {
    vi.spyOn(window, 'open').mockReturnValue(null);
    render(<MonoBookingModal isOpen onClose={vi.fn()} />);
    expect(screen.getByRole('dialog', { name: /scope a pilot/i })).toBeTruthy();
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Test Visitor' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '+91 (99999)-99999' } });
    fireEvent.click(screen.getByRole('button', { name: /continue in whatsapp/i }));
    expect(screen.getByRole('status').textContent).toMatch(/send.*whatsapp/i);
    expect(screen.queryByText('Connected!')).toBeNull();
    const draftLink = screen.getByRole('link', { name: /open whatsapp draft/i }).getAttribute('href')!;
    expect(draftLink).toContain('Test%20Visitor');
    expect(decodeURIComponent(draftLink)).toContain('Phone: +919999999999');
    expect((screen.getByLabelText(/your name/i) as HTMLInputElement).value).toBe('Test Visitor');
  });
  it('allows keyboard activation on an actionable card', () => {
    const click = vi.fn();
    render(<ProTiltCard onClick={click}>Explore workflow</ProTiltCard>);
    const card = screen.getByRole('button', { name: /explore workflow/i });
    expect(card.tabIndex).toBe(0);
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(click).toHaveBeenCalledTimes(1);
  });
  it('does not change enquiry volume while a visitor is reading', () => {
    vi.useFakeTimers();
    render(<MonoRoiCalculator onOpenBooking={vi.fn()} />);
    const slider = screen.getByRole('slider', { name: /monthly customer enquiries/i }) as HTMLInputElement;
    fireEvent.change(slider, { target: { value: '1400' } });
    act(() => { vi.advanceTimersByTime(15000); });
    expect(slider.value).toBe('1400');
    expect(screen.queryByText('Enquiries Routed Automatically')).toBeNull();
    expect(screen.getByText(/illustrative.*not.*guarantee/i)).toBeTruthy();
  });
  it('preserves contact details after preparing a draft', () => {
    vi.spyOn(window, 'open').mockReturnValue(null);
    render(<ContactPage />);
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Test Visitor' } });
    fireEvent.change(screen.getByLabelText(/work email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /continue in whatsapp/i }));
    expect(screen.getByRole('status').textContent).toMatch(/send.*whatsapp/i);
    expect((screen.getByLabelText(/work email/i) as HTMLInputElement).value).toBe('test@example.com');
  });
  it('places modal focus, contains tabbing, and restores focus after Escape', () => {
    function Example() {
      const [open, setOpen] = React.useState(false);
      return <><button onClick={() => setOpen(true)}>Pilot launcher</button><MonoBookingModal isOpen={open} onClose={() => setOpen(false)} /></>;
    }
    render(<Example />);
    const trigger = screen.getByRole('button', { name: 'Pilot launcher' });
    trigger.focus(); fireEvent.click(trigger);
    expect(document.activeElement).toBe(screen.getByLabelText(/your name/i));
    const last = screen.getByRole('link', { name: /choose a 30-minute/i });
    last.focus(); fireEvent.keyDown(last, { key: 'Tab' });
    expect(document.activeElement).toBe(screen.getByRole('button', { name: /close dialog/i }));
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(trigger);
    expect(document.body.style.overflow).not.toBe('hidden');
  });
  it('does not fetch video on reduced motion until the visitor explicitly plays it', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation(query => ({ matches: query.includes('prefers-reduced-motion'), media: query, addEventListener() {}, removeEventListener() {} }) as MediaQueryList);
    const { container } = render(<MotionSettings><MotionToggle /><SmartVideo priority src="/videos/bengaluru-tech-park.mp4" /></MotionSettings>);
    expect(container.querySelectorAll('source').length).toBe(0);
    fireEvent.click(screen.getByRole('button', { name: /play videos/i }));
    expect(container.querySelectorAll('source').length).toBe(2);
    fireEvent.click(screen.getByRole('button', { name: /pause videos/i }));
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  });
  it('retains the visitor’s chosen workflow and clearly labels the scripted demo', () => {
    vi.useFakeTimers();
    render(<><WorkflowTransformationPlayground /><MonoWhatsAppSimulator /></>);
    const choice = screen.getByRole('button', { name: 'Free Up Leadership Time' });
    fireEvent.click(choice);
    act(() => { vi.advanceTimersByTime(20000); });
    expect(choice.getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByText(/illustrative demo using scripted messages/i)).toBeTruthy();
    expect(screen.queryByText(/session.*is scheduled/i)).toBeNull();
  });
  it('rejects a phone field that contains only spaces', () => {
    render(<MonoBookingModal isOpen onClose={vi.fn()} />);
    const phone = screen.getByLabelText(/phone/i) as HTMLInputElement;
    fireEvent.change(phone, { target: { value: '        ' } });
    expect(phone.checkValidity()).toBe(false);
  });

  it('keeps secondary-page stage selections stable while reading', () => {
    vi.useFakeTimers();
    const saved = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = class {
      constructor(private callback: (entries: unknown[]) => void) {}
      observe() { this.callback([{ isIntersecting: true, intersectionRatio: 1 }]); }
      disconnect() {} unobserve() {} takeRecords() { return []; }
    } as unknown as typeof IntersectionObserver;
    try {
      render(<SolutionsPage onOpenBooking={vi.fn()} />);
      const stage = screen.getByRole('button', { name: /03.*pilot/i });
      fireEvent.click(stage);
      act(() => { vi.advanceTimersByTime(5000); });
      expect(stage.className).toContain('btn-aurora');
      expect(stage.getAttribute('aria-pressed')).toBe('true');
    } finally { globalThis.IntersectionObserver = saved; }
  });
  it('opens scheduling directly from the WhatsApp support preview', () => {
    render(<FloatingSupportWidgets currentPath="/" onNavigate={vi.fn()} onOpenBooking={vi.fn()} cookieBannerVisible={false} />);
    fireEvent.click(screen.getByRole('button', { name: /whatsapp support widget/i }));
    expect(screen.getByRole('link', { name: /schedule consultation/i }).getAttribute('href')).toBe('https://calendly.com/team-brandmint/30min');
  });

});
