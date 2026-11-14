import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => { cleanup(); vi.useRealTimers(); vi.restoreAllMocks(); });
Object.defineProperty(window, 'matchMedia', { writable: true, value: vi.fn((query: string) => ({ matches: false, media: query, addEventListener() {}, removeEventListener() {} })) });
globalThis.IntersectionObserver = class {
  observe() {} unobserve() {} disconnect() {} takeRecords() { return []; }
  root = null; rootMargin = ''; thresholds = [];
} as unknown as typeof IntersectionObserver;
HTMLElement.prototype.scrollTo = vi.fn();
HTMLMediaElement.prototype.play = vi.fn(() => Promise.resolve());
HTMLMediaElement.prototype.pause = vi.fn();
HTMLDialogElement.prototype.showModal = function () { this.open = true; };
HTMLDialogElement.prototype.close = function () { this.open = false; };

HTMLMediaElement.prototype.load = vi.fn();
