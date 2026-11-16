import React, { useEffect, useRef, useState } from 'react';

interface ScrollStageTransformProps {
  children: React.ReactNode;
}

/**
 * Zero-Latency Viewport Entrance Stage
 * Uses a single lightweight IntersectionObserver and removes `transform` completely
 * once visible so child `<video>` elements run in zero-copy GPU hardware overlays.
 */
export const ScrollStageTransform: React.FC<ScrollStageTransformProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      setSettled(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '100px 0px', threshold: 0.04 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || settled) return;
    const t = window.setTimeout(() => setSettled(true), 640);
    return () => window.clearTimeout(t);
  }, [visible, settled]);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: settled ? 'none' : visible ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, 26px, 0) scale(0.985)',
        transition: 'opacity 0.62s cubic-bezier(0.16,1,0.3,1), transform 0.62s cubic-bezier(0.16,1,0.3,1)',
      }}
      className="w-full"
    >
      {children}
    </div>
  );
};
