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

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '120px 0px', threshold: 0.02 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translate3d(0, 14px, 0)',
        transition: 'opacity 0.28s cubic-bezier(0.22,1,0.36,1), transform 0.28s cubic-bezier(0.22,1,0.36,1)',
      }}
      className="w-full"
    >
      {children}
    </div>
  );
};
