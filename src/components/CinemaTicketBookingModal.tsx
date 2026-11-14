import React, { useState } from 'react';
import { X, Ticket, MessageCircle, CheckCircle2 } from 'lucide-react';

interface CinemaTicketBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CinemaTicketBookingModal: React.FC<CinemaTicketBookingModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [phone, setPhone] = useState('');
  const [systemInterest, setSystemInterest] = useState('WhatsApp Automation Engine');
  const [submitted, setSubmitted] = useState(false);

  const systems = [
    'WhatsApp Automation Engine',
    'Autonomous AI Agents Fleet',
    'Quantum Weave™ Pipeline',
    'Synthetic 4K AI Films',
    '5-Day Operator Intensive',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const waMsg = encodeURIComponent(
      `Hi Kaaranji & BrandMint AI Team,\n\nI just watched the BrandMint AI film!\nMy Name: ${name || 'Founder'}\nCompany: ${business || 'My Brand'}\nPhone: ${phone}\nInterested in: ${systemInterest}\n\nLet's schedule a 1-hour strategy session!`
    );

    setTimeout(() => {
      window.open(`https://wa.me/919972965677?text=${waMsg}`, '_blank');
      setSubmitted(false);
      onClose();
    }, 1100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#f4e7c5] text-[#2a1a12] p-6 sm:p-8 border-[3px] border-[#2a1a12] shadow-[0_25px_70px_rgba(0,0,0,0.9)] font-['Teko'] select-none">
        {/* Ticket Perforations on Sides */}
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#06181c] border-r-2 border-[#2a1a12]" />
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#06181c] border-l-2 border-[#2a1a12]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#2a1a12] hover:text-[#e2462b] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 border-b-2 border-[#2a1a12] pb-2 mb-4">
              <Ticket className="w-6 h-6 text-[#e2462b]" />
              <h3 className="text-3xl font-bold uppercase tracking-wider text-[#2a1a12]">
                VIP Ticket • 1-Hour Strategy Call
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xl uppercase tracking-wider text-[#2a1a12]/80">
                  Select Your Target System:
                </label>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {systems.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setSystemInterest(s)}
                      className={`px-3 py-1 rounded text-base uppercase tracking-wider transition-all ${
                        systemInterest === s
                          ? 'bg-[#e2462b] text-white font-bold shadow-[0_2px_0_#8f1c09]'
                          : 'bg-[#e8d4a2] text-[#2a1a12] hover:bg-[#dfc78d]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xl uppercase tracking-wider text-[#2a1a12]/80">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kaaranji"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#fdf8eb] border-2 border-[#2a1a12] rounded-lg px-3 py-1.5 font-['Anek_Latin'] text-sm text-[#2a1a12] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xl uppercase tracking-wider text-[#2a1a12]/80">Company / Brand</label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Corp"
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                    className="w-full bg-[#fdf8eb] border-2 border-[#2a1a12] rounded-lg px-3 py-1.5 font-['Anek_Latin'] text-sm text-[#2a1a12] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xl uppercase tracking-wider text-[#2a1a12]/80">WhatsApp Contact</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 99729 65677"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#fdf8eb] border-2 border-[#2a1a12] rounded-lg px-3 py-1.5 font-['Anek_Latin'] text-sm text-[#2a1a12] focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full btn-ticket flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Lock Ticket On WhatsApp (+91 99729 65677)</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-10">
            <CheckCircle2 className="w-16 h-16 text-[#e2462b] mx-auto mb-2 animate-bounce" />
            <h4 className="text-4xl font-bold uppercase tracking-wider text-[#2a1a12]">
              Opening WhatsApp...
            </h4>
            <p className="font-['Anek_Latin'] text-sm text-[#2a1a12]/80">
              Connecting directly with Kaaranji & BrandMint Systems team in Bangalore.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
