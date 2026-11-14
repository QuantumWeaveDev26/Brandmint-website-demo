import React, { useState } from 'react';
import { X, MessageSquare, CheckCircle2 } from 'lucide-react';

interface CyberBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CyberBookingModal: React.FC<CyberBookingModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [phone, setPhone] = useState('');
  const [system, setSystem] = useState('WhatsApp Automation Engine');
  const [submitted, setSubmitted] = useState(false);

  const systems = [
    'WhatsApp Automation Engine',
    'Autonomous AI Agents Fleet',
    'Quantum Weave™ Partnership',
    'Cashflow Copy & Meta Funnels',
    'Custom CRM & API Integration',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const waMsg = encodeURIComponent(
      `Hi Kaaranji & BrandMint AI Team,\n\nI want to deploy AI Automation for my company.\nMy Name: ${name || 'Founder'}\nCompany: ${business || 'My Brand'}\nPhone: ${phone}\nInterested in: ${system}\n\nLet's schedule an architecture scan!`
    );

    setTimeout(() => {
      window.open(`https://wa.me/919972965677?text=${waMsg}`, '_blank');
      setSubmitted(false);
      onClose();
    }, 1100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg glass-cyber rounded-3xl p-6 sm:p-8 border border-[#00f5d4]/40 shadow-[0_0_70px_rgba(0,245,212,0.25)] font-['Plus_Jakarta_Sans']">
        {/* Glow orb */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-[#00f5d4]/10 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#00f5d4] animate-pulse" />
              <span className="text-xs font-mono text-[#00f5d4] uppercase tracking-wider font-semibold">
                BrandMint AI • Architecture Scan
              </span>
            </div>

            <h3 className="text-2xl font-black font-['Space_Grotesk'] text-white mb-2">
              Deploy Autonomous Scale
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Connect with Kaaranji & our systems engineering team in Bengaluru to map your workflows.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">
                  Target AI Stack:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {systems.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setSystem(s)}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                        system === s
                          ? 'bg-[#00f5d4] text-[#030712] font-bold shadow-[0_0_15px_rgba(0,245,212,0.4)]'
                          : 'bg-[#030712] text-slate-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kaaranji"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#030712] rounded-xl px-3.5 py-2.5 text-xs text-white border border-white/10 focus:border-[#00f5d4] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Company / Brand</label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Corp"
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                    className="w-full bg-[#030712] rounded-xl px-3.5 py-2.5 text-xs text-white border border-white/10 focus:border-[#00f5d4] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">WhatsApp Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 99729 65677"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#030712] rounded-xl px-3.5 py-2.5 text-xs text-white border border-white/10 focus:border-[#00f5d4] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 rounded-full bg-gradient-to-r from-[#00f5d4] via-[#6366f1] to-[#00f5d4] text-[#030712] font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,245,212,0.4)] transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Dispatch To WhatsApp (+91 99729 65677)</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-[#00f5d4] mx-auto mb-3 animate-bounce" />
            <h4 className="text-xl font-bold text-white mb-1">Opening WhatsApp...</h4>
            <p className="text-xs text-slate-400">
              Routing directly to Kaaranji & BrandMint Systems Team in Bangalore.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
