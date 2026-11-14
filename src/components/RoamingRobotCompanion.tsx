import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const RoamingRobotCompanion: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: 100, y: 100 });
  const [speech, setSpeech] = useState("👋 Hi! I'm Minty! I'll roam with your cursor!");
  const [expression, setExpression] = useState<'happy' | 'star' | 'excited' | 'wink'>('happy');
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const lastTarget = useRef<string>('');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset so the robot floats slightly beside and above cursor
      setTargetPos({ x: e.clientX + 24, y: e.clientY - 38 });

      // Inspect what element is underneath cursor
      const elem = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (!elem) return;

      const isButton = elem.tagName === 'BUTTON' || elem.closest('button') || elem.tagName === 'A' || elem.closest('a');
      const isInput = elem.tagName === 'INPUT' || elem.getAttribute('type') === 'range';
      const isCard = elem.closest('.shrink-card') || elem.closest('.card-mono');
      const isPhone = elem.closest('.phone-frame') || elem.closest('#simulator');

      setIsHoveringClickable(!!isButton || !!isInput);

      let newSpeech = '';
      let newExp: 'happy' | 'star' | 'excited' | 'wink' = 'happy';

      if (isButton) {
        newSpeech = '⚡ Click to launch this system!';
        newExp = 'star';
      } else if (isInput) {
        newSpeech = '↔️ Drag to see your ROI multiply!';
        newExp = 'excited';
      } else if (isPhone) {
        newSpeech = '💬 Tap a message to test the bot!';
        newExp = 'wink';
      } else if (isCard) {
        newSpeech = '👀 Scroll down to watch this shrink!';
        newExp = 'star';
      } else {
        newSpeech = "🤖 Roaming with you through BrandMint AI!";
        newExp = 'happy';
      }

      if (newSpeech !== lastTarget.current) {
        lastTarget.current = newSpeech;
        setSpeech(newSpeech);
        setExpression(newExp);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Smooth Lerp animation loop
    let animId: number;
    let time = 0;
    const lerp = () => {
      time += 0.05;
      const bobbing = Math.sin(time) * 4; // subtle floating physics
      setPos((prev) => ({
        x: prev.x + (targetPos.x - prev.x) * 0.12,
        y: prev.y + (targetPos.y + bobbing - prev.y) * 0.12,
      }));
      animId = requestAnimationFrame(lerp);
    };

    animId = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [targetPos.x, targetPos.y]);

  const handleRobotClick = () => {
    setIsSpinning(true);
    setExpression('star');
    setSpeech("Woohoo! 🚀 Autonomous power activated!");

    // Audio chirp using Web Audio
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.18); // C6
      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } catch {
      // fallback
    }

    setTimeout(() => setIsSpinning(false), 600);
  };

  return (
    <div
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
      className="fixed top-0 left-0 z-50 pointer-events-none select-none hidden md:block"
    >
      <div className="relative">
        {/* Floating Speech Bubble */}
        <AnimatePresence>
          {speech && (
            <motion.div
              key={speech}
              initial={{ opacity: 0, y: 5, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.18 }}
              className="absolute -top-12 left-10 whitespace-nowrap bg-black/90 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-full text-[11px] font-['Space_Grotesk'] font-bold shadow-[0_8px_25px_rgba(0,0,0,0.8)] flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-white" />
              <span>{speech}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cute Robot Body (Clickable) */}
        <motion.div
          onClick={handleRobotClick}
          animate={{
            rotate: isSpinning ? 360 : 0,
            scale: isHoveringClickable ? 1.15 : 1,
          }}
          transition={{ duration: 0.35, ease: 'backOut' }}
          className="pointer-events-auto cursor-pointer relative w-12 h-12 bg-black rounded-2xl border-2 border-white shadow-[0_4px_20px_rgba(255,255,255,0.25)] flex items-center justify-center p-1.5 hover:scale-125 transition-transform"
          title="Click to chirp!"
        >
          {/* Antenna */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff] animate-ping" />
            <span className="w-0.5 h-1.5 bg-white" />
          </div>

          {/* Visor Screen */}
          <div className="w-full h-full bg-[#111111] rounded-xl border border-white/30 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Specular sheen */}
            <div className="absolute top-0.5 left-1 right-1 h-1 bg-white/20 rounded-full" />

            {/* Expressions */}
            <div className="flex items-center gap-1.5 text-white font-mono font-bold text-xs">
              {expression === 'happy' && (
                <>
                  <span className="animate-bounce">^</span>
                  <span className="animate-bounce" style={{ animationDelay: '100ms' }}>^</span>
                </>
              )}
              {expression === 'star' && (
                <>
                  <span className="text-sm">★</span>
                  <span className="text-sm">★</span>
                </>
              )}
              {expression === 'excited' && (
                <>
                  <span className="text-xs">●</span>
                  <span className="text-xs">●</span>
                </>
              )}
              {expression === 'wink' && (
                <>
                  <span className="text-xs">★</span>
                  <span className="text-[10px]">-</span>
                </>
              )}
            </div>

            {/* Cute smile */}
            <div className="w-2.5 h-0.5 bg-white/80 rounded-full mt-0.5" />
          </div>

          {/* Thruster Jet Flame underneath */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1">
            <span className="w-1 h-2 bg-white rounded-full animate-bounce shadow-[0_0_6px_#ffffff]" />
            <span className="w-1 h-2.5 bg-white/70 rounded-full animate-bounce shadow-[0_0_6px_#ffffff]" style={{ animationDelay: '150ms' }} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
