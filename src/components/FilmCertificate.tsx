import React, { useState } from 'react';
import { Play, Volume2 } from 'lucide-react';

interface FilmCertificateProps {
  onEnter: (withSound: boolean) => void;
}

export const FilmCertificate: React.FC<FilmCertificateProps> = ({ onEnter }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  const handleEnterCinema = (withSound: boolean) => {
    setIsDismissed(true);
    setTimeout(() => {
      onEnter(withSound);
    }, 400);
  };

  if (isDismissed) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#050e10] backdrop-blur-md transition-opacity duration-500">
      <div className="relative w-full max-w-[580px] bg-[#f4e7c5] text-[#2a1a12] p-6 sm:p-10 border-[3px] border-double border-[#2a1a12] outline outline-1 outline-[#2a1a12] outline-offset-[-10px] shadow-[0_25px_70px_rgba(0,0,0,0.9)] cert-weave font-['Teko'] select-none">
        {/* Certificate Seal Stamp */}
        <div className="absolute right-6 sm:right-10 top-6 sm:top-8 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-[3px] border-[#e2462b] text-[#e2462b] flex flex-col items-center justify-center -rotate-12 pointer-events-none">
          <span className="text-xl sm:text-2xl font-bold font-['Rozha_One'] leading-none">U/A</span>
          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest leading-none mt-0.5">10X SCALE</span>
        </div>

        {/* Certificate Header */}
        <div className="text-center border-b-2 border-[#2a1a12] pb-3 mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-[0.18em] uppercase text-[#2a1a12] leading-tight">
            Central Board of AI Film Certification
          </h2>
          <p className="text-xs sm:text-sm font-mono tracking-widest text-[#2a1a12]/80 uppercase mt-0.5">
            Bengaluru Regional Office • Autonomous Media Division
          </p>
        </div>

        {/* Certificate Metadata Grid */}
        <div className="space-y-2 text-base sm:text-xl uppercase tracking-wider py-2 font-['Teko']">
          <div className="grid grid-cols-12 gap-2 border-b border-[#2a1a12]/20 pb-1.5">
            <span className="col-span-5 text-[#2a1a12]/70 font-normal">TITLE:</span>
            <span className="col-span-7 font-bold text-[#e2462b]">BRANDMINT AI: THE 10X VELOCITY</span>
          </div>
          <div className="grid grid-cols-12 gap-2 border-b border-[#2a1a12]/20 pb-1.5">
            <span className="col-span-5 text-[#2a1a12]/70 font-normal">FOUNDER & DIRECTOR:</span>
            <span className="col-span-7 font-bold">KAARANJI SHREEDHAR</span>
          </div>
          <div className="grid grid-cols-12 gap-2 border-b border-[#2a1a12]/20 pb-1.5">
            <span className="col-span-5 text-[#2a1a12]/70 font-normal">STUDIO LAB:</span>
            <span className="col-span-7 font-bold">BRANDMINT AI PRIVATE LIMITED</span>
          </div>
          <div className="grid grid-cols-12 gap-2 border-b border-[#2a1a12]/20 pb-1.5">
            <span className="col-span-5 text-[#2a1a12]/70 font-normal">CATEGORY:</span>
            <span className="col-span-7 font-bold text-[#0b4a4f]">AUTONOMOUS WORKFORCE & COMMERCE</span>
          </div>
          <div className="grid grid-cols-12 gap-2 border-b border-[#2a1a12]/20 pb-1.5">
            <span className="col-span-5 text-[#2a1a12]/70 font-normal">LENGTH:</span>
            <span className="col-span-7 font-bold">5 CINEMATIC SCENES • FREE ENTRY</span>
          </div>
        </div>

        {/* Certificate Subtext */}
        <p className="text-[11px] sm:text-xs font-['Anek_Latin'] text-[#2a1a12]/80 text-center pt-2 leading-relaxed">
          Certified for founders, operators, and enterprises seeking to eliminate manual friction through custom AI agents, WhatsApp business automation, and venture infrastructure.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 pt-3 border-t-2 border-[#2a1a12]">
          <button
            onClick={() => handleEnterCinema(true)}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#e2462b] hover:bg-[#c7341b] text-white font-['Teko'] text-xl uppercase tracking-wider font-semibold shadow-[0_4px_0_#8f1c09] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
          >
            <Volume2 className="w-5 h-5" />
            <span>Enter Cinema (With Sound)</span>
          </button>

          <button
            onClick={() => handleEnterCinema(false)}
            className="w-full sm:w-auto px-5 py-3 rounded-lg bg-[#2a1a12] hover:bg-[#1a0f0a] text-[#f4e7c5] font-['Teko'] text-xl uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Enter Silently</span>
          </button>
        </div>

        <div className="text-center mt-3 text-[10px] font-mono tracking-widest text-[#2a1a12]/60">
          PRESS ANY BUTTON TO START PROJECTION
        </div>
      </div>
    </div>
  );
};
