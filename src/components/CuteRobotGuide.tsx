import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

export const CuteRobotGuide: React.FC = () => {
  const [expression, setExpression] = useState<'happy' | 'excited' | 'wink' | 'star'>('happy');
  const [speech, setSpeech] = useState("👋 Hey! I'm Minty, your BrandMint tour guide! Scroll down to see transformations!");
  const [isMinimized, setIsMinimized] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Update speech based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const h = window.innerHeight;

      if (y < h * 0.7) {
        setSpeech("👋 Hey! I'm Minty! Scroll down to see the 3D scroll transformations!");
        setExpression('happy');
      } else if (y < h * 2.0) {
        setSpeech("⚡ Watch how these cards stack & scale over each other as you scroll!");
        setExpression('star');
      } else if (y < h * 3.4) {
        setSpeech("↔️ Try dragging this slider! Watch manual chaos turn into AI speed!");
        setExpression('excited');
      } else if (y < h * 4.6) {
        setSpeech("💬 Tap the quick-reply buttons on the phone to test our live bot!");
        setExpression('wink');
      } else if (y < h * 5.8) {
        setSpeech("💰 Drag this slider to see how many hours of work we can automate for you!");
        setExpression('star');
      } else {
        setSpeech("🚀 Ready to deploy autonomous systems? Click to talk with Kaaranji!");
        setExpression('excited');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRobotClick = () => {
    setClickCount((prev) => prev + 1);
    const expressions: Array<'happy' | 'excited' | 'wink' | 'star'> = ['happy', 'excited', 'wink', 'star'];
    const nextExp = expressions[(clickCount + 1) % expressions.length];
    setExpression(nextExp);

    // Audio chirp using Web Audio API
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch {
      // audio fallback
    }

    setSpeech("Beep boop! 🤖 I love autonomous automation! Keep exploring!");
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-end gap-3 pointer-events-none select-none">
      {/* Speech Bubble */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            key={speech}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto max-w-[240px] sm:max-w-[280px] bg-[#0c0c0c] border border-white/20 p-3.5 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.9)] text-xs font-['Space_Grotesk'] text-white relative mb-2"
          >
            {/* Bubble Tail */}
            <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-[#0c0c0c] border-b border-r border-white/20 transform rotate-45" />

            <div className="flex items-start justify-between gap-1 mb-1">
              <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-white" />
                MINTY // AI TOUR GUIDE
              </span>
              <button
                onClick={() => setIsMinimized(true)}
                className="text-white/40 hover:text-white p-0.5"
                title="Minimize guide"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            <p className="leading-snug text-white/90 font-medium">
              {speech}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Animated Cute Robot */}
      <motion.div
        onClick={handleRobotClick}
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.92 }}
        className="pointer-events-auto cursor-pointer relative group"
        title="Click me for a surprise!"
      >
        {/* Hover ring */}
        <div className="absolute -inset-2 rounded-full border border-white/20 animate-ping opacity-30 pointer-events-none" />

        {/* Robot SVG Chassis */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 relative bg-black rounded-3xl border-2 border-white/30 shadow-[0_10px_35px_rgba(255,255,255,0.15)] flex items-center justify-center p-2 backdrop-blur-xl group-hover:border-white transition-colors">
          {/* Antenna */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#ffffff] animate-pulse" />
            <span className="w-0.5 h-2.5 bg-white/60" />
          </div>

          {/* Robot Face Screen */}
          <div className="w-full h-full bg-[#111111] rounded-2xl border border-white/20 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Visor Reflection Line */}
            <div className="absolute top-1 left-1 right-1 h-1.5 bg-white/10 rounded-full" />

            {/* Eyes based on expression */}
            <div className="flex items-center gap-2 text-white font-mono font-bold text-sm select-none">
              {expression === 'happy' && (
                <>
                  <span className="animate-bounce">^</span>
                  <span className="animate-bounce" style={{ animationDelay: '100ms' }}>^</span>
                </>
              )}
              {expression === 'excited' && (
                <>
                  <span className="text-base font-black">●</span>
                  <span className="text-base font-black">●</span>
                </>
              )}
              {expression === 'wink' && (
                <>
                  <span className="text-base font-black">★</span>
                  <span className="font-bold text-xs">-</span>
                </>
              )}
              {expression === 'star' && (
                <>
                  <span className="text-sm">★</span>
                  <span className="text-sm">★</span>
                </>
              )}
            </div>

            {/* Cute digital mouth line */}
            <div className="w-3 h-0.5 bg-white/80 rounded-full mt-1" />
          </div>

          {/* Side ear sensors */}
          <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-4 bg-white/40 rounded-l" />
          <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-4 bg-white/40 rounded-r" />
        </div>
      </motion.div>
    </div>
  );
};
