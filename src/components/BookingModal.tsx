import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, CheckCircle2 } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [selectedGoal, setSelectedGoal] = useState('WhatsApp Automation');
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const goals = [
    'WhatsApp Automation & CRM',
    'Autonomous AI Agents Fleet',
    'Quantum Weave™ Partnership',
    'AI-Powered Films & Production',
    'BrandMint Academy Intensive',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const waText = encodeURIComponent(
      `Hi Kaaranji & BrandMint AI team,\n\nI am ${name || 'Founder'} from ${businessName || 'my company'}.\nInterested in: ${selectedGoal}.\nPhone: ${phone}\n\nLet's schedule a discovery scan!`
    );

    setTimeout(() => {
      window.open(`https://wa.me/919972965677?text=${waText}`, '_blank');
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-lg bg-[#0b1c22] border border-[#67efd0]/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(103,239,208,0.2)] overflow-hidden"
        >
          {/* Background aura */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-[#67efd0]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {!submitted ? (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#67efd0] animate-pulse" />
                <span className="text-xs font-mono text-[#67efd0] uppercase tracking-wider">
                  BrandMint AI Discovery Scan
                </span>
              </div>

              <h3 className="text-2xl font-black font-['Space_Grotesk'] text-white mb-2">
                Accelerate Your Workflow
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Tell us your current bottleneck. We will review your operating model and prepare an AI architecture blueprint.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Goal Selector */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">
                    Primary Area of Focus:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {goals.map((g) => (
                      <button
                        type="button"
                        key={g}
                        onClick={() => setSelectedGoal(g)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedGoal === g
                            ? 'bg-[#67efd0] text-[#07121a] font-bold shadow-[0_0_15px_rgba(103,239,208,0.4)]'
                            : 'bg-[#07121a] text-slate-400 hover:text-white border border-white/5'
                        }`}
                      >
                        {g}
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
                      className="w-full bg-[#07121a] rounded-xl px-3.5 py-2.5 text-xs text-white border border-white/10 focus:border-[#67efd0] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Company / Project</label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Corp"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full bg-[#07121a] rounded-xl px-3.5 py-2.5 text-xs text-white border border-white/10 focus:border-[#67efd0] focus:outline-none"
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
                    className="w-full bg-[#07121a] rounded-xl px-3.5 py-2.5 text-xs text-white border border-white/10 focus:border-[#67efd0] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 rounded-full bg-gradient-to-r from-[#67efd0] to-[#34d399] hover:from-[#a2ffe7] hover:to-[#67efd0] text-[#07121a] font-bold text-xs shadow-[0_0_25px_rgba(103,239,208,0.4)] transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Connect with BrandMint AI on WhatsApp</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle2 className="w-12 h-12 text-[#67efd0] mx-auto mb-3 animate-bounce" />
              <h4 className="text-xl font-bold text-white mb-1">Opening WhatsApp...</h4>
              <p className="text-xs text-slate-400">
                Routing directly to Kaaranji & BrandMint Systems Team in Bangalore.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
