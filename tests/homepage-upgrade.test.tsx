import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { FigmaWeaveTransformation } from '../src/components/FigmaWeaveTransformation';
import { FloatingSupportWidgets } from '../src/components/FloatingSupportWidgets';
import { HeroWorkflow } from '../src/components/HeroWorkflow';
import { WorkflowExample } from '../src/components/WorkflowExample';
import { MonoNavbar } from '../src/components/MonoNavbar';

describe('homepage visitor journeys', () => {
  it('supports keyboard exploration without playback controls', () => {
    render(<HeroWorkflow />);
    fireEvent.keyDown(screen.getByRole('tab', { name: 'WhatsApp & CRM' }), { key: 'ArrowRight' });
    expect(screen.getByRole('tab', { name: 'AI agents' }).getAttribute('aria-selected')).toBe('true');
    expect(screen.queryByRole('button', { name: 'Replay transformation' })).toBeNull();
  });
  it('moves focus into mobile navigation and returns it to the menu button on Escape', () => {
    render(<MonoNavbar currentPath="/" onNavigate={vi.fn()} onOpenBooking={vi.fn()} />);
    const toggle = screen.getByRole('button', { name: 'Toggle Menu' });
    toggle.focus();
    fireEvent.click(toggle);
    expect(document.activeElement?.closest('nav')?.getAttribute('aria-label')).toBe('Mobile navigation');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(toggle);
  });

  it('provides sequential service controls for visitors browsing on a phone', () => {
    render(<FigmaWeaveTransformation />);
    fireEvent.click(screen.getByRole('button', { name: /next solution/i }));
    expect(screen.getAllByRole('tab')[1].getAttribute('aria-selected')).toBe('true');
    fireEvent.click(screen.getByRole('button', { name: /previous solution/i }));
    expect(screen.getAllByRole('tab')[0].getAttribute('aria-selected')).toBe('true');
  });
  it('lets visitors explore voice assistants and learning alongside automation', () => {
    render(<HeroWorkflow />);
    fireEvent.click(screen.getByRole('tab', { name: 'Voice assistants' }));
    expect(screen.getByRole('tab', { name: 'Voice assistants' }).getAttribute('aria-selected')).toBe('true');
    expect(screen.getByText(/a caller asks for help/i)).toBeTruthy();
    fireEvent.click(screen.getByRole('tab', { name: 'Learn AI' }));
    expect(screen.getByRole('link', { name: /explore learning opportunities/i }).getAttribute('href')).toBe('/academy');
  });

  it('animates visible workflow steps and holds a step selected by the visitor', () => {
    vi.useFakeTimers();
    vi.spyOn(globalThis, 'IntersectionObserver').mockImplementation(function(callback: IntersectionObserverCallback) {
      return { observe() { callback([{ isIntersecting: true }] as IntersectionObserverEntry[], {} as IntersectionObserver); }, disconnect() {} } as unknown as IntersectionObserver;
    } as unknown as typeof IntersectionObserver);
    render(<WorkflowExample onOpenBooking={vi.fn()} />);
    act(() => { vi.advanceTimersByTime(2100); });
    expect(screen.getByRole('button', { name: /02 context matched/i }).getAttribute('aria-pressed')).toBe('true');
    const step = screen.getByRole('button', { name: /03 pipeline synced/i });
    fireEvent.click(step);
    act(() => { vi.advanceTimersByTime(6000); });
    expect(step.getAttribute('aria-pressed')).toBe('true');
  });
  it('lets visitors compare services by keyboard without capturing page scroll', () => {
    const book = vi.fn();
    render(<FigmaWeaveTransformation onOpenBooking={book} />);
    const tabs = screen.getAllByRole('tab');
    tabs[0].focus();
    fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });
    expect(document.activeElement).toBe(tabs[1]);
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
    expect(screen.getByRole('tabpanel').textContent).toContain('Enterprise AI Integration');
    const wheel = new WheelEvent('wheel', { deltaY: 200, cancelable: true, bubbles: true });
    screen.getByRole('tabpanel').dispatchEvent(wheel);
    expect(wheel.defaultPrevented).toBe(false);
    fireEvent.click(screen.getByRole('button', { name: /discuss this solution/i }));
    expect(book).toHaveBeenCalledWith('Enterprise AI Integration');
  });

  it('has one support launcher and closes its menu with Escape, restoring focus', () => {
    vi.useFakeTimers();
    render(<FloatingSupportWidgets currentPath="/" onNavigate={vi.fn()} onOpenBooking={vi.fn()} />);
    act(() => { vi.advanceTimersByTime(10000); });
    expect(screen.queryByRole('button', { name: /get help from ishani/i })).toBeNull();
    const launcher = screen.getByRole('button', { name: /talk to us/i });
    launcher.focus();
    fireEvent.click(launcher);
    expect(screen.queryByText('Background videos & demos')).toBeNull();
    expect(screen.queryByRole('button', { name: /pause videos and demos/i })).toBeNull();
    expect(screen.getByRole('link', { name: /chat on whatsapp/i }).getAttribute('href')).toContain('wa.me/919972965677');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(launcher.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(launcher);
  });

  it('advances the selected service with scroll progress and reverses on upward scroll', () => {
    const frame = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => { callback(0); return 1; });
    render(<FigmaWeaveTransformation />);
    const track = document.querySelector('.solution-scroll-track') as HTMLElement;
    expect(track).toBeTruthy();
    let top = 82;
    vi.spyOn(track, 'getBoundingClientRect').mockImplementation(() => ({ top, height: 3000, bottom: top + 3000 } as DOMRect));
    const stage = document.querySelector('.solution-scroll-stage') as HTMLElement;
    Object.defineProperty(stage, 'offsetHeight', { configurable: true, value: 600 });
    top = 82 - 960;
    fireEvent.scroll(window);
    expect(screen.getAllByRole('tab')[2].getAttribute('aria-selected')).toBe('true');
    top = 82 - 480;
    fireEvent.scroll(window);
    expect(screen.getAllByRole('tab')[1].getAttribute('aria-selected')).toBe('true');
    frame.mockRestore();
  });

  it('animates the example workflow only while visible and stops when the page is hidden', () => {
    vi.useFakeTimers();
    let notify: IntersectionObserverCallback;
    vi.spyOn(globalThis, 'IntersectionObserver').mockImplementation(function(callback: IntersectionObserverCallback) {
      notify = callback;
      return { observe() {}, disconnect() {} } as unknown as IntersectionObserver;
    } as unknown as typeof IntersectionObserver);
    const visibility = vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
    const { container } = render(<HeroWorkflow />);
    const workflow = container.querySelector('.hero-workflow')!;
    act(() => { vi.advanceTimersByTime(4800); });
    expect(workflow.getAttribute('data-phase')).toBe('0');
    act(() => { notify([{ isIntersecting: true }] as IntersectionObserverEntry[], {} as IntersectionObserver); });
    act(() => { vi.advanceTimersByTime(2400); });
    expect(workflow.getAttribute('data-phase')).toBe('1');
    visibility.mockReturnValue(true);
    fireEvent(document, new Event('visibilitychange'));
    act(() => { vi.advanceTimersByTime(4800); });
    expect(workflow.getAttribute('data-phase')).toBe('1');
  });
});
