import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { FigmaWeaveTransformation } from '../src/components/FigmaWeaveTransformation';
import { FloatingSupportWidgets } from '../src/components/FloatingSupportWidgets';
import { HeroWorkflow } from '../src/components/HeroWorkflow';

describe('homepage visitor journeys', () => {
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
