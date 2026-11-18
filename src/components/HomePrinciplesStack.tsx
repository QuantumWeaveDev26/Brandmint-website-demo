import React, { useState } from 'react';

interface PrincipleCard {
  num: string;
  bg: string;
  title: string;
  tag: string;
  lightSurface?: boolean;
}

const PRINCIPLES_STACK: PrincipleCard[] = [
  {
    num: '01',
    bg: '#0A0224',
    title: 'Personalisation at the Core',
    tag: 'Context First',
  },
  {
    num: '02',
    bg: '#0E0433',
    title: 'Connected to Real Work',
    tag: 'Native Stack',
  },
  {
    num: '03',
    bg: '#120642',
    title: 'People Retain Judgement',
    tag: 'Human Oversight',
  },
  {
    num: '04',
    bg: '#160952',
    title: 'Practical Before Complex',
    tag: 'Focused Pilots',
  },
  {
    num: '05',
    bg: '#312185',
    title: 'One Win, Then Multiply',
    tag: 'Proven Scale',
  },
  {
    num: '06',
    bg: '#7265C2',
    title: 'Enduring Ecosystem IP',
    tag: 'Venture Depth',
  },
  {
    num: '07',
    bg: '#CCC7F2',
    title: 'Continuous Compounding',
    tag: 'Discover • Pilot • Scale',
    lightSurface: true,
  },
];

export const HomePrinciplesStack: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section
      id="principles"
      aria-labelledby="principles-heading"
      className="relative py-12 sm:py-16 px-4 max-w-4xl mx-auto w-full z-10 select-none"
    >
      {/* Centered Editorial Header */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-[#CCC7F2]/80 font-semibold mb-2">
          <span>Operating Charter</span>
          <span className="text-[#7265C2]">&bull;</span>
          <span>7 Principles</span>
        </div>

        <h2
          id="principles-heading"
          className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white"
        >
          Guiding{' '}
          <span className="font-editorial text-3xl sm:text-[46px] text-aurora pr-1">
            Principles.
          </span>
        </h2>

        <p className="mt-1.5 text-xs sm:text-sm text-[#CCC7F2]/80 max-w-md mx-auto">
          Personalised AI, human judgement, and systems built to compound.
        </p>
      </div>

      {/* 7-Shade Overlapping Ink Nocturne Pill Stack */}
      <div
        className="max-w-[560px] mx-auto flex flex-col"
        onMouseLeave={() => setActiveIdx(null)}
      >
        {PRINCIPLES_STACK.map((item, idx) => {
          const isLast = idx === PRINCIPLES_STACK.length - 1;
          const isActive = activeIdx === idx;
          const isLight = Boolean(item.lightSurface);

          return (
            <button
              type="button"
              key={item.num}
              onMouseEnter={() => setActiveIdx(idx)}
              onFocus={() => setActiveIdx(idx)}
              onClick={() => setActiveIdx(isActive ? null : idx)}
              style={{
                backgroundColor: item.bg,
                zIndex: idx + 1,
              }}
              className={`group relative w-full text-left rounded-[32px] sm:rounded-[42px] px-6 sm:px-8 transition-transform duration-250 ease-out cursor-pointer focus:outline-none ${
                idx === 0 ? '' : '-mt-6 sm:-mt-7'
              } ${
                isLast
                  ? 'pt-5 pb-7 sm:pt-6 sm:pb-9 border border-white/45 shadow-[0_22px_50px_-14px_rgba(5,1,20,0.88)]'
                  : 'pt-4 pb-10 sm:pt-5 sm:pb-11 border border-[#CCC7F2]/18 shadow-[0_-8px_24px_rgba(5,1,20,0.55)]'
              } ${isActive && !isLast ? '-translate-y-2' : isActive && isLast ? '-translate-y-1' : ''}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`text-[11px] sm:text-xs font-mono font-bold tabular-nums shrink-0 px-2 py-0.5 rounded-full ${
                      isLight
                        ? 'bg-[#0A0224]/10 text-[#0A0224]'
                        : 'bg-white/10 text-[#CCC7F2]'
                    }`}
                  >
                    {item.num}
                  </span>
                  <span
                    className={`font-display text-sm sm:text-base font-bold tracking-tight truncate ${
                      isLight ? 'text-[#0A0224]' : 'text-white'
                    }`}
                  >
                    {item.title}
                  </span>
                </div>

                <span
                  className={`hidden xs:inline-block sm:inline-block text-[11px] font-semibold shrink-0 ${
                    isLight ? 'text-[#160952]/85' : 'text-[#CCC7F2]/85'
                  }`}
                >
                  {item.tag}
                </span>
              </div>

              {isLast && (
                <div className="mt-2.5 pl-10 sm:pl-11 flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-[#160952]/85">
                    Every pilot ships with clear ROI &amp; human control.
                  </span>
                  <span className="sm:hidden text-[11px] font-semibold text-[#0A0224]">
                    {item.tag}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Subtle Editorial Charter Crest */}
      <div className="mt-6 flex flex-col items-center justify-center gap-1.5 pointer-events-none">
        <span className="font-editorial text-2xl sm:text-3xl text-[#CCC7F2]/85 tracking-tight">
          BrandMint Charter
        </span>
      </div>
    </section>
  );
};
