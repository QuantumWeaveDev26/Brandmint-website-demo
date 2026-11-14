import React from 'react';
import { ArrowUpRight, Sparkles, GraduationCap, Code2, Film, Cpu, Rocket } from 'lucide-react';
import { ScrollStageTransform } from '../components/ScrollStageTransform';
import { ProTiltCard } from '../components/ProTiltCard';
import { SmartVideo } from '../components/SmartVideo';

interface AcademyPageProps {
  onOpenBooking: () => void;
}

const PROGRAMS = [
  {
    code: '01',
    badge: 'Growth Track',
    title: 'AI-Powered Marketing',
    note: 'Launch high-converting campaigns, copy systems, and automated funnels.',
    href: 'https://brandmintai.io/instaskills',
    icon: Rocket,
  },
  {
    code: '02',
    badge: 'Engineering',
    title: 'AI Full-Stack Developer',
    note: 'Build production AI apps, connected agents, and modern web systems.',
    href: 'https://brandmintai.io/fullai',
    icon: Code2,
  },
  {
    code: '03',
    badge: 'Institutional',
    title: 'IGR Academy',
    note: 'Structured industry-ready training from learner to operator.',
    href: 'https://brandmintai.io/igr.academy',
    icon: GraduationCap,
  },
  {
    code: '04',
    badge: 'Applied AI',
    title: 'Appu AI',
    note: 'Accessible, practical AI mastery for creators, students, and builders.',
    href: 'https://brandmintai.io/appuai',
    icon: Cpu,
  },
  {
    code: '05',
    badge: 'Creative Studio',
    title: 'AI Filmmaking',
    note: 'Direct cinema-grade brand films and visual storytelling with AI.',
    href: 'https://brandmintai.io/aifilmmaking',
    icon: Film,
  },
];

export const AcademyPage: React.FC<AcademyPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="w-full pt-20 pb-8">
      {/* Hero Banner with Unique Code/Builder Video */}
      <section className="relative pt-12 pb-14 px-4 overflow-hidden bg-[#0A0224]">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#0A0224]">
          <SmartVideo
            src="/videos/04-fullstack-code.mp4"
            priority
            className="w-full h-full object-cover opacity-75 saturate-110 contrast-105"
          />
          <div className="absolute inset-0 bg-[#0A0224]/52" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0224]/65 via-transparent to-[#0A0224]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#CCC7F2]/35 bg-[#120642]/92 text-xs font-medium text-[#CCC7F2] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#CCC7F2]" />
            <span>BrandMint Academy &bull; Execution Over Theory</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.06]">
            Practical AI{' '}
            <span className="font-editorial text-4xl sm:text-[54px] text-aurora pr-1">
              Mastery Tracks.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-[#F5F3FF]/90 max-w-xl mx-auto mt-2.5 leading-relaxed">
            Hands-on programs turning students, creators, and teams into AI operators.
          </p>
        </div>
      </section>

      {/* Balanced 5-Program Grid */}
      <ScrollStageTransform>
        <section className="py-10 px-4 max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
            {PROGRAMS.map((prog) => {
              const Icon = prog.icon;
              return (
                <ProTiltCard
                  key={prog.code}
                  maxTilt={4}
                  className="h-full rounded-2xl p-5 glass-card flex flex-col justify-between gap-4 text-left"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs pb-3 mb-3 border-b border-[#7265C2]/25">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#312185]/80 border border-[#7265C2]/45 text-[#CCC7F2] font-semibold text-[11px]">
                        {prog.badge}
                      </span>
                      <Icon className="w-4 h-4 text-[#CCC7F2]" />
                    </div>
                    <h2 className="font-display text-lg font-bold text-white leading-snug">
                      {prog.title}
                    </h2>
                    <p className="text-xs text-[#CCC7F2]/80 mt-1.5 leading-relaxed">
                      {prog.note}
                    </p>
                  </div>

                  <a
                    href={prog.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-full btn-aurora text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all relative z-20"
                  >
                    <span>Open Program</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </ProTiltCard>
              );
            })}

            {/* Institutional / Custom Training Card */}
            <ProTiltCard
              maxTilt={4}
              className="h-full rounded-2xl p-5 glass-card-active flex flex-col justify-between gap-4 text-left"
            >
              <div>
                <div className="flex items-center justify-between text-xs pb-3 mb-3 border-b border-[#CCC7F2]/25">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#CCC7F2] text-[#0A0224] font-bold text-[11px]">
                    Campus &amp; Teams
                  </span>
                  <GraduationCap className="w-4 h-4 text-[#CCC7F2]" />
                </div>
                <h2 className="font-display text-lg font-bold text-white leading-snug">
                  BrandMint Growth Circle™
                </h2>
                <p className="text-xs text-[#CCC7F2]/90 mt-1.5 leading-relaxed">
                  Custom AI workshops and institutional training for colleges and corporate teams.
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full py-2.5 px-4 rounded-full bg-[#CCC7F2] text-[#0A0224] hover:bg-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer relative z-20"
              >
                <span>Enquire for Campus / Team</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </ProTiltCard>
          </div>
        </section>
      </ScrollStageTransform>
    </div>
  );
};
