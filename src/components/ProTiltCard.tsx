import React, { useRef, useCallback, useEffect, useState } from 'react';

interface ProTiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  maxTilt?: number;
}

/**
 * Ultra-Low-Latency GPU 3D Tilt Card
 * Caches bounding rect on pointer entry (zero layout reflow during mousemove)
 * and clears transform to `none` on leave so idle cards consume zero GPU layers.
 */
export const ProTiltCard: React.FC<ProTiltCardProps> = ({
  children,
  className = '',
  onClick,
  onMouseEnter,
  maxTilt = 4,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);
  const finePointerRef = useRef<boolean>(false);
  const [hasControls, setHasControls] = useState(false);

  useEffect(() => {
    if (!onClick) return;
    setHasControls(!!cardRef.current?.querySelector('a,button,input,select,textarea'));
  }, [onClick]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      finePointerRef.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    }
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleEnter = useCallback(() => {
    if (finePointerRef.current && cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
      cardRef.current.style.transition = 'border-color 0.2s ease, box-shadow 0.22s ease';
    }
    onMouseEnter?.();
  }, [onMouseEnter]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!finePointerRef.current || document.documentElement.dataset.motion === 'paused') return;
      const el = cardRef.current;
      const rect = rectRef.current;
      if (!el || !rect || rect.width === 0 || rect.height === 0) return;

      const clientX = e.clientX;
      const clientY = e.clientY;

      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        const px = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const py = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
        const rx = (0.5 - py) * 2 * maxTilt;
        const ry = (px - 0.5) * 2 * maxTilt;
        el.style.transform = `perspective(1100px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
        rafRef.current = null;
      });
    },
    [maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    rectRef.current = null;
    if (cardRef.current) {
      cardRef.current.style.transition =
        'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.2s ease, box-shadow 0.22s ease';
      cardRef.current.style.transform = '';
    }
  }, []);

  return (
    <div
      ref={cardRef}
      role={onClick && !hasControls ? 'button' : undefined}
      tabIndex={onClick && !hasControls ? 0 : undefined}
      onKeyDown={(event) => {
        if (!onClick || hasControls || event.target !== event.currentTarget) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick();
        }
      }}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${onClick ? 'active:scale-[0.99]' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
