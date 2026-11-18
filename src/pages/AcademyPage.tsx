import React from "react";
import {
  ArrowUpRight,
  Sparkles,
  GraduationCap,
  Code2,
  Film,
  Cpu,
  Rocket,
} from "lucide-react";
import { SmartVideo } from "../components/SmartVideo";

interface AcademyPageProps {
  onOpenBooking: () => void;
}

const PROGRAMS = [
  {
    code: "01",
    badge: "Growth Track",
    title: "AI-Powered Marketing",
    note: "Launch high-converting campaigns, copy systems, and automated funnels.",
    href: "https://brandmintai.io/instaskills",
    icon: Rocket,
  },
  {
    code: "02",
    badge: "Engineering",
    title: "AI Full-Stack Developer",
    note: "Build production AI apps, connected agents, and modern web systems.",
    href: "https://brandmintai.io/fullai",
    icon: Code2,
  },
  {
    code: "03",
    badge: "Institutional",
    title: "IGR Academy",
    note: "Structured industry-ready training from learner to operator.",
    href: "https://brandmintai.io/igr.academy",
    icon: GraduationCap,
  },
  {
    code: "04",
    badge: "Applied AI",
    title: "Appu AI",
    note: "Accessible, practical AI mastery for creators, students, and builders.",
    href: "https://brandmintai.io/appuai",
    icon: Cpu,
  },
  {
    code: "05",
    badge: "Creative Studio",
    title: "AI Filmmaking",
    note: "Direct cinema-grade brand films and visual storytelling with AI.",
    href: "https://brandmintai.io/aifilmmaking",
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
      <div className="inner-content academy-content">
        <section
          className="inner-section programme-directory"
          aria-labelledby="programmes-title"
        >
          <div className="inner-section-heading">
            <h2 id="programmes-title">
              Choose your
              <br />
              <span className="font-editorial">learning focus.</span>
            </h2>
          </div>
          <table className="programme-table" role="table">
            <caption className="sr-only">
              Compare BrandMint Academy programs by track and learning focus.
            </caption>
            <thead role="rowgroup">
              <tr role="row">
                <th scope="col" role="columnheader">
                  Program &amp; track
                </th>
                <th scope="col" role="columnheader">
                  Learning focus
                </th>
                <th scope="col" role="columnheader">
                  <span className="sr-only">Program website</span>
                </th>
              </tr>
            </thead>
            <tbody role="rowgroup">
              {PROGRAMS.map((prog) => (
                <tr key={prog.code} role="row">
                  <th scope="row" role="rowheader">
                    <h3>{prog.title}</h3>
                    <span>{prog.badge}</span>
                  </th>
                  <td role="cell">
                    <p>{prog.note}</p>
                  </td>
                  <td role="cell">
                    <a
                      className="inner-text-action"
                      href={prog.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Explore ${prog.title}`}
                    >
                      Explore program{" "}
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section
          className="inner-section academy-team"
          aria-labelledby="team-learning-title"
        >
          <div>
            <h2 id="team-learning-title">
              Learning for
              <br />
              <span className="font-editorial">your whole team.</span>
            </h2>
            <p>BrandMint Growth Circle™</p>
          </div>
          <div>
            <p>
              Custom AI workshops and institutional training for colleges and
              corporate teams.
            </p>
            <button className="home-primary" onClick={onOpenBooking}>
              Enquire for campus / team{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
