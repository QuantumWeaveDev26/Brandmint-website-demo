import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calculator } from 'lucide-react';
import { ProTiltCard } from './ProTiltCard';

interface MonoRoiCalculatorProps {
  onOpenBooking: () => void;
}

const PRESET_TIERS = [
  { label: 'Growth Team', val: 300 },
  { label: 'Mid-Market', val: 900 },
  { label: 'Institution', val: 2000 },
  { label: 'Enterprise', val: 4000 },
];

export const MonoRoiCalculator: React.FC<MonoRoiCalculatorProps> = ({ onOpenBooking }) => {
  const [inquiries, setInquiries] = useState(900);

  const recommendedArchitecture =
    inquiries < 700
      ? 'Focused AI Pilot'
      : inquiries < 1800
      ? 'Connected CRM + AI Roles'
      : 'Multi-Agent Enterprise Mesh';

  const activeAssistants =
    inquiries < 700 ? '2 AI Roles' : inquiries < 1800 ? '4 AI Roles' : '6+ AI Roles';

  const handoffMode =
    inquiries < 700 ? 'Instant Triage' : inquiries < 1800 ? 'Auto-Routing + Briefs' : '24/7 Omnichannel Command';

  return (
    <section id="velocity" className="relative py-10 sm:py-14 px-4 max-w-4xl mx-auto w-full z-10 select-none">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#7265C2]/45 bg-[#160952]/80 text-xs font-medium text-[#CCC7F2] mb-2.5">
          <Calculator className="w-3.5 h-3.5 text-[#CCC7F2]" />
          <span>Quantum Growth Scan™</span>
        </div>
        <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
          Size Your AI{' '}
          <span className="font-editorial text-3xl sm:text-[46px] text-aurora pr-1">System.</span>
        </h2>
      </div>

      <ProTiltCard maxTilt={3} className="rounded-2xl overflow-hidden glass-frame">
        <div className="p-5 sm:p-6 border-b border-[#7265C2]/25 relative z-20">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="text-xs sm:text-sm text-[#CCC7F2] font-semibold">
              Monthly Enquiries
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-display font-bold text-aurora tabular-nums">
                {inquiries.toLocaleString()}
              </span>
              <span className="text-xs text-[#CCC7F2]/75 font-medium">/ mo</span>
            </div>
          </div>

          <input
            aria-label="Monthly Enquiries"
            type="range"
            min="100"
            max="5000"
            step="100"
            value={inquiries}
            onChange={(e) => setInquiries(Number(e.target.value))}
            className="w-full h-2 bg-[#0A0224] rounded-full appearance-none cursor-pointer accent-[#7265C2] border border-[#7265C2]/30"
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3.5">
            {PRESET_TIERS.map((tier) => {
              const active = inquiries === tier.val;
              return (
                <button
                  type="button"
                  key={tier.label}
                  aria-pressed={active}
                  onClick={() => setInquiries(tier.val)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    active
                      ? 'btn-aurora text-white border-transparent'
                      : 'bg-[#120642]/85 text-[#CCC7F2] border-[#7265C2]/30 hover:border-[#CCC7F2]/60 hover:text-white'
                  }`}
                >
                  {tier.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#7265C2]/25">
          <div className="p-4 sm:p-5 text-left">
            <span className="text-[11px] text-[#CCC7F2]/75 block mb-0.5 font-medium">
              Recommended Blueprint
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={recommendedArchitecture}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="text-base sm:text-lg font-display font-bold text-white"
              >
                {recommendedArchitecture}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="p-4 sm:p-5 text-left glass-card-active">
            <span className="text-[11px] text-[#CCC7F2] block mb-0.5 font-medium">
              Workforce Allocation
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAssistants}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="text-base sm:text-lg font-display font-bold text-white"
              >
                {activeAssistants}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="p-4 sm:p-5 text-left">
            <span className="text-[11px] text-[#CCC7F2]/75 block mb-0.5 font-medium">
              Routing Mode
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={handoffMode}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="text-base sm:text-lg font-display font-bold text-white"
              >
                {handoffMode}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="px-5 sm:px-6 py-3.5 border-t border-[#7265C2]/25 bg-[#0E0433]/90 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-20">
          <span className="text-xs text-[#CCC7F2] font-medium text-center sm:text-left">
            Tailored 30-day enterprise AI roadmap
          </span>
          <button
            type="button"
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full btn-aurora text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Get Quantum Growth Scan™</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </ProTiltCard>
    </section>
  );
};
