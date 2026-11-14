import React, { useEffect, useRef } from 'react';

interface CinemaAudioEngineProps {
  isPlaying: boolean;
}

export const CinemaAudioEngine: React.FC<CinemaAudioEngineProps> = ({ isPlaying }) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscsRef = useRef<OscillatorNode[]>([]);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    if (isPlaying) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const master = ctx.createGain();
        master.gain.setValueAtTime(0.001, ctx.currentTime);
        master.gain.exponentialRampToValueAtTime(0.09, ctx.currentTime + 1.5);
        master.connect(ctx.destination);
        masterGainRef.current = master;

        // Vintage Cinema Pad chord: D3, A3, F4, C5 (Mysterious & Inspiring Cinematic Harmony)
        const notes = [146.83, 220.00, 349.23, 523.25];
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, ctx.currentTime);
        filter.connect(master);

        const oscs: OscillatorNode[] = [];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.detune.setValueAtTime((idx - 1.5) * 5, ctx.currentTime);

          const oscGain = ctx.createGain();
          oscGain.gain.setValueAtTime(0.28 / notes.length, ctx.currentTime);
          osc.connect(oscGain);
          oscGain.connect(filter);
          osc.start();
          oscs.push(osc);
        });
        oscsRef.current = oscs;

        // Gentle vintage projector tape whir
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(900, ctx.currentTime);
        noiseFilter.Q.setValueAtTime(4, ctx.currentTime);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.012, ctx.currentTime);

        whiteNoise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(master);
        whiteNoise.start();
        noiseSourceRef.current = whiteNoise;
      } catch (e) {
        console.warn('Audio start failed', e);
      }
    } else {
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.8);
        setTimeout(() => {
          oscsRef.current.forEach((o) => o.stop());
          oscsRef.current = [];
          if (noiseSourceRef.current) {
            noiseSourceRef.current.stop();
            noiseSourceRef.current = null;
          }
          if (audioCtxRef.current) {
            audioCtxRef.current.close().catch(() => {});
            audioCtxRef.current = null;
          }
        }, 800);
      }
    }

    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [isPlaying]);

  return null;
};
