import React, { createContext, useContext, useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { Pause, Play } from 'lucide-react';

const MotionContext = createContext({ paused: false, toggle: () => {} });

export function MotionSettings({ children }: { children: React.ReactNode }) {
  // Always play videos by default when a user opens the website; only pause when explicitly toggled.
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? 'paused' : 'playing';
    return () => {
      delete document.documentElement.dataset.motion;
    };
  }, [paused]);

  return (
    <MotionContext.Provider value={{ paused, toggle: () => setPaused((value) => !value) }}>
      <MotionConfig reducedMotion={paused ? 'always' : 'never'}>{children}</MotionConfig>
    </MotionContext.Provider>
  );
}

export const useMotionSettings = () => useContext(MotionContext);

export function MotionToggle() {
  const { paused, toggle } = useMotionSettings();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={paused ? 'Play videos and demos' : 'Pause videos and demos'}
      aria-pressed={paused}
      title={paused ? 'Play videos and demos' : 'Pause videos and demos'}
      className="motion-toggle min-w-11 min-h-11 inline-flex items-center justify-center gap-2 rounded-full border border-[#7265C2]/50 px-3 text-[#CCC7F2] hover:bg-[#312185] cursor-pointer"
    >
      {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
      <span className="hidden xl:inline text-xs">{paused ? 'Play' : 'Pause'}</span>
    </button>
  );
}
