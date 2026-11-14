import React from 'react';
import { Volume2, VolumeX, Play, Pause, Film, Ticket } from 'lucide-react';

interface CinemaBarProps {
  currentScene: number;
  totalScenes: number;
  isPlayingFilm: boolean;
  onTogglePlayFilm: () => void;
  isSoundOn: boolean;
  onToggleSound: () => void;
  onOpenSceneMenu: () => void;
  onOpenBooking: () => void;
}

export const CinemaBar: React.FC<CinemaBarProps> = ({
  currentScene,
  totalScenes,
  isPlayingFilm,
  onTogglePlayFilm,
  isSoundOn,
  onToggleSound,
  onOpenSceneMenu,
  onOpenBooking,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3.5 pointer-events-none">
      {/* Brand Title */}
      <div className="pointer-events-auto flex items-center gap-3">
        <a
          href="#top"
          className="font-['Teko'] text-2xl sm:text-3xl font-bold tracking-wider uppercase text-[#f4e7c5] hover:text-[#f6b632] transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] flex items-center gap-2"
        >
          <span className="w-3 h-3 rounded-full bg-[#e2462b] animate-ping" />
          <span>BrandMint AI</span>
        </a>
      </div>

      {/* Middle: Lessons / Scenes Progress & Play Trigger */}
      <div className="pointer-events-auto hidden md:flex items-center gap-3 bg-[#06181c]/90 px-4 py-1.5 rounded-full border border-[#f4e7c5]/20 shadow-[0_8px_25px_rgba(0,0,0,0.7)] backdrop-blur-md">
        <span className="font-['Teko'] text-lg uppercase tracking-widest text-[#f4e7c5]">
          Scene <b className="text-[#f6b632] text-xl">{currentScene}</b>/{totalScenes}
        </span>

        <button
          onClick={onTogglePlayFilm}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f6b632] text-[#2a1a12] font-['Teko'] text-base uppercase font-bold tracking-wider hover:bg-[#ffc94a] transition-all shadow-[0_2px_0_#a3600c] active:translate-y-0.5 active:shadow-none"
          title={isPlayingFilm ? 'Pause Film Scroll' : 'Autoplay Film Reel'}
        >
          {isPlayingFilm ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span>{isPlayingFilm ? 'Pause' : 'Play Film'}</span>
        </button>
      </div>

      {/* Right Controls */}
      <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all font-['Teko'] text-lg tracking-wider uppercase ${
            isSoundOn
              ? 'bg-[#f6b632]/20 border-[#f6b632] text-[#f6b632] shadow-[0_0_20px_rgba(246,182,50,0.4)]'
              : 'bg-[#06181c]/80 border-[#f4e7c5]/20 text-[#f4e7c5]/70 hover:text-white'
          }`}
          title={isSoundOn ? 'Mute Cinema Sound' : 'Play Title Sound'}
        >
          {isSoundOn ? <Volume2 className="w-4 h-4 text-[#f6b632]" /> : <VolumeX className="w-4 h-4" />}
          <span className="hidden sm:inline">♪ {isSoundOn ? 'Sound On' : 'Sound'}</span>
        </button>

        {/* Scene Selection Menu */}
        <button
          onClick={onOpenSceneMenu}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#06181c]/80 border border-[#f4e7c5]/25 hover:border-[#f6b632] text-[#f4e7c5] hover:text-[#f6b632] font-['Teko'] text-lg uppercase tracking-wider transition-all"
        >
          <Film className="w-4 h-4" />
          <span>Scenes</span>
        </button>

        {/* Book Ticket CTA */}
        <button
          onClick={onOpenBooking}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#e2462b] hover:bg-[#c7341b] text-white font-['Teko'] text-lg sm:text-xl font-bold uppercase tracking-wider shadow-[0_3px_0_#8f1c09] active:translate-y-0.5 active:shadow-none transition-all"
        >
          <Ticket className="w-4 h-4" />
          <span>Book Call</span>
        </button>
      </div>
    </header>
  );
};
