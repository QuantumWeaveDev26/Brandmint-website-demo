import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioController: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!isPlaying) {
      // Start ethereal ambient drone
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2); // Soft volume

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(420, ctx.currentTime);

        masterGain.connect(filter);
        filter.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Frequencies for a calm, futuristic cyber ambient chord: C3, G3, Eb4, Bb4
        const freqs = [130.81, 196.00, 311.13, 466.16];
        const oscs: OscillatorNode[] = [];

        freqs.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          osc.type = i % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Subtle detune for shimmer
          osc.detune.setValueAtTime((i - 1.5) * 4, ctx.currentTime);

          const oscGain = ctx.createGain();
          oscGain.gain.setValueAtTime(0.35 / freqs.length, ctx.currentTime);

          osc.connect(oscGain);
          oscGain.connect(masterGain);
          osc.start();
          oscs.push(osc);
        });

        oscNodesRef.current = oscs;
        setIsPlaying(true);
      } catch (err) {
        console.warn('Audio playback error', err);
      }
    } else {
      // Stop smoothly
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1);
        setTimeout(() => {
          oscNodesRef.current.forEach(osc => osc.stop());
          oscNodesRef.current = [];
          if (audioCtxRef.current) {
            audioCtxRef.current.close().catch(() => {});
            audioCtxRef.current = null;
          }
          setIsPlaying(false);
        }, 1000);
      } else {
        setIsPlaying(false);
      }
    }
  };

  return (
    <button
      onClick={toggleAudio}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full backdrop-blur-xl border transition-all duration-300 text-xs font-mono uppercase tracking-wider ${
        isPlaying
          ? 'bg-[#67efd0]/15 border-[#67efd0]/50 text-[#67efd0] shadow-[0_0_25px_rgba(103,239,208,0.35)]'
          : 'bg-[#0b1c22]/80 border-white/10 text-slate-400 hover:text-white hover:border-white/25'
      }`}
      title={isPlaying ? 'Mute ambient soundscape' : 'Play ambient soundscape (like Gaurav Madaan reference)'}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-4 h-4 text-[#67efd0] animate-pulse" />
          <span className="flex items-center gap-1">
            <span className="inline-block w-1 h-3 bg-[#67efd0] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="inline-block w-1 h-4 bg-[#67efd0] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="inline-block w-1 h-2 bg-[#67efd0] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            <span className="ml-1 text-[11px] font-semibold">Soundscape ON</span>
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 opacity-70" />
          <span className="text-[11px]">Ambient Sound</span>
        </>
      )}
    </button>
  );
};
