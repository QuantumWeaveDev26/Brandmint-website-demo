import React, { useRef, useCallback, useEffect } from 'react';
import { ArrowLeftRight, Check, X } from 'lucide-react';
import { SmartVideo } from './SmartVideo';

export const MonoSplitTransformation: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const afterRef = useRef<HTMLDivElement | null>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const moveRafRef = useRef<number | null>(null);

  const isDragging = useRef(false);
  const introPlayed = useRef(false);
  const currentPctRef = useRef(50);
  const targetPctRef = useRef(50);

  const applyPosition = useCallback((pct: number) => {
    currentPctRef.current = pct;
    const p = pct.toFixed(2);
    if (afterRef.current) afterRef.current.style.clipPath = `inset(0 0 0 ${p}%)`;
    if (dividerRef.current) dividerRef.current.style.left = `${p}%`;
    if (handleRef.current) handleRef.current.style.left = `${p}%`;
  }, []);

  // Single lightweight 1.35s entrance sweep (zero continuous background GPU clipPath thrashing)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let raf = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || introPlayed.current) return;
        if (document.documentElement.dataset.motion === 'paused') return;
        introPlayed.current = true;
        const start = performance.now();
        const duration = 1350;

        const sweep = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          // Smooth eased sine wave 50% -> 22% -> 76% -> settles cleanly at 50%
          const eased = 1 - Math.pow(1 - t, 3);
          const pct = t < 1 ? 50 - 26 * Math.sin(eased * Math.PI * 2) * (1 - t * 0.25) : 50;
          targetPctRef.current = pct;
          applyPosition(pct);
          if (t < 1 && !isDragging.current) {
            raf = requestAnimationFrame(sweep);
          }
        };
        raf = requestAnimationFrame(sweep);
        io.disconnect();
      },
      { threshold: 0.2 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      if (moveRafRef.current) cancelAnimationFrame(moveRafRef.current);
    };
  }, [applyPosition]);

  const animateTowardTarget = useCallback(() => {
    moveRafRef.current = null;
    const diff = targetPctRef.current - currentPctRef.current;
    if (Math.abs(diff) < 0.08) {
      applyPosition(targetPctRef.current);
      return;
    }
    applyPosition(currentPctRef.current + diff * 0.24);
    moveRafRef.current = requestAnimationFrame(animateTowardTarget);
  }, [applyPosition]);

  const scheduleMove = (clientX: number) => {
    const rect = rectRef.current ?? containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    rectRef.current = rect;
    const x = clientX - rect.left;
    targetPctRef.current = Math.max(8, Math.min(92, (x / rect.width) * 100));
    if (moveRafRef.current === null) {
      moveRafRef.current = requestAnimationFrame(animateTowardTarget);
    }
  };

  const handlePointerEnter = () => {
    if (containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    rectRef.current = e.currentTarget.getBoundingClientRect();
    isDragging.current = true;
    scheduleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging.current || e.pointerType === 'mouse') {
      scheduleMove(e.clientX);
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    rectRef.current = null;
  };

  return (
    <section
      id="transformation"
      ref={sectionRef}
      className="relative py-10 sm:py-14 px-4 max-w-5xl mx-auto w-full z-10 select-none"
    >
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#7265C2]/45 bg-[#160952]/80 text-xs font-medium text-[#CCC7F2] mb-2.5">
          <ArrowLeftRight className="w-3.5 h-3.5 text-[#CCC7F2]" />
          <span>Before vs. After BrandMint AI</span>
        </div>
        <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
          Manual Stress to{' '}
          <span className="font-editorial text-3xl sm:text-[46px] text-aurora pr-1">
            Calm Execution.
          </span>
        </h2>
      </div>

      {/* True 16:9 Proportional Stage — Zero Cropping & Zero Idle GPU Repaint */}
      <div
        ref={containerRef}
        onPointerEnter={handlePointerEnter}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative w-full max-w-[780px] lg:max-w-[840px] mx-auto aspect-video rounded-2xl overflow-hidden glass-frame cursor-ew-resize bg-[#0E0433] touch-pan-y"
      >
        {/* BASE LAYER: BEFORE */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#0A0224] pointer-events-none flex flex-col justify-between p-3 sm:p-4">
          <SmartVideo
            src="/videos/rel-manual-stress.mp4"
            priority
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0224]/45 via-transparent to-transparent" />

          <div className="flex justify-start relative z-10">
            <span className="text-[11px] font-medium text-white/85 bg-[#0A0224]/50 border border-white/15 px-2.5 py-1 rounded-full inline-flex items-center gap-1 whitespace-nowrap">
              <X className="w-3 h-3 text-[#CCC7F2]" />
              Before: Manual
            </span>
          </div>

          <div className="flex justify-start relative z-10">
            <span className="text-[11px] text-white/75 px-2.5 py-0.5 rounded-full bg-[#0A0224]/45 border border-white/10 font-medium whitespace-nowrap">
              Bottlenecks
            </span>
          </div>
        </div>

        {/* TOP SWEEPING LAYER: AFTER */}
        <div
          ref={afterRef}
          style={{ clipPath: 'inset(0 0 0 50%)' }}
          className="absolute inset-0 z-10 isolate overflow-hidden bg-[#0E0433] pointer-events-none flex flex-col justify-between p-3 sm:p-4"
        >
          <SmartVideo
            src="/videos/rel-automation-ops.mp4"
            priority
            className="absolute inset-0 w-full h-full object-cover opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#160952]/40 via-transparent to-transparent" />

          <div className="flex justify-end relative z-10">
            <span className="text-[11px] font-medium text-white/90 bg-[#0A0224]/50 border border-white/15 px-2.5 py-1 rounded-full inline-flex items-center gap-1 whitespace-nowrap">
              <Check className="w-3 h-3 text-[#34D399] stroke-[2.5]" />
              After: BrandMint AI
            </span>
          </div>

          <div className="flex justify-end relative z-10">
            <span className="text-[11px] text-white/80 bg-[#0A0224]/45 border border-white/10 px-2.5 py-0.5 rounded-full font-medium whitespace-nowrap">
              Automated Flow
            </span>
          </div>
        </div>

        {/* Glowing Optical Divider */}
        <div
          ref={dividerRef}
          style={{ left: '50%' }}
          className="absolute inset-y-0 -translate-x-1/2 w-[2.5px] bg-gradient-to-b from-[#312185] via-[#FFFFFF] to-[#7265C2] shadow-[0_0_24px_rgba(204,199,242,0.85)] z-20 pointer-events-none"
        />

        {/* Compact Optical Handle */}
        <div
          ref={handleRef}
          style={{ left: '50%' }}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#160952]/95 border-2 border-[#CCC7F2] flex items-center justify-center text-white shadow-[0_0_24px_rgba(204,199,242,0.75)] transition-transform duration-200 hover:scale-110 z-30 pointer-events-none"
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </section>
  );
};
