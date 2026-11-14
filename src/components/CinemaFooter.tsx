import React from 'react';
import { ArrowUp, MapPin, Phone, MessageCircle } from 'lucide-react';

export const CinemaFooter: React.FC = () => {
  return (
    <footer className="relative z-10 bg-[#040d0f] text-[#f4e7c5] pt-20 pb-12 px-4 border-t-4 border-[#2a1a12] font-['Teko'] select-none">
      <div className="max-w-6xl mx-auto">
        {/* End Credits Header */}
        <div className="text-center pb-12 border-b-2 border-[#f4e7c5]/20">
          <p className="font-['Kalam'] text-2xl sm:text-3xl text-[#f6b632] mb-1">
            End of the Film
          </p>
          <h3 className="font-['Rozha_One'] text-4xl sm:text-6xl uppercase tracking-wider text-[#f4e7c5]">
            OVERNIGHT SCALE
          </h3>
          <p className="font-['Anek_Latin'] text-sm sm:text-base text-[#f4e7c5]/70 max-w-lg mx-auto mt-2">
            Brandmint AI Private Limited • Transforming manual operations into autonomous software leverage.
          </p>
        </div>

        {/* Film Credits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 text-xl uppercase tracking-wider">
          <div className="md:col-span-5 space-y-3 font-['Anek_Latin']">
            <h4 className="font-['Teko'] text-3xl font-bold uppercase text-[#f6b632] tracking-widest">
              Bangalore Production Hub
            </h4>
            <div className="flex items-start gap-2 text-xs sm:text-sm text-[#f4e7c5]/80">
              <MapPin className="w-4 h-4 text-[#e2462b] shrink-0 mt-0.5" />
              <span>
                No. 3, Lingappa Layout, 1st Cross,<br />
                Sri Sri Sri Shivakumara Swamiji Road,<br />
                Bengaluru – 560090, Karnataka, India
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#f4e7c5]/80">
              <Phone className="w-4 h-4 text-[#f6b632] shrink-0" />
              <a href="https://wa.me/919972965677" className="hover:text-[#f6b632] transition-colors">
                +91 99729 65677 (WhatsApp Verified)
              </a>
            </div>
          </div>

          <div className="md:col-span-4 space-y-2">
            <h4 className="font-['Teko'] text-3xl font-bold uppercase text-[#f6b632] tracking-widest">
              Core Systems
            </h4>
            <ul className="text-xl space-y-1 text-[#f4e7c5]/80">
              <li><a href="#scene-1" className="hover:text-[#f6b632]">01. The Manual Trap</a></li>
              <li><a href="#scene-2" className="hover:text-[#f6b632]">02. 2.8s WhatsApp Engine</a></li>
              <li><a href="#scene-3" className="hover:text-[#f6b632]">03. Quantum Weave™ Loom</a></li>
              <li><a href="#scene-4" className="hover:text-[#f6b632]">04. Synthetic 4K Cinema</a></li>
              <li><a href="#scene-5" className="hover:text-[#f6b632]">05. 5-Day Operator Sprint</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="font-['Teko'] text-3xl font-bold uppercase text-[#f6b632] tracking-widest">
              Director
            </h4>
            <div className="text-2xl text-white font-bold">
              KAARANJI SHREEDHAR
            </div>
            <p className="font-['Anek_Latin'] text-xs text-[#f4e7c5]/70">
              Founder & Systems Architect, BrandMint AI
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/919972965677"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#e2462b] text-white font-['Teko'] text-xl uppercase tracking-wider font-bold shadow-[0_2px_0_#8f1c09]"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Talk on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#f4e7c5]/15 flex flex-col sm:flex-row items-center justify-between text-base sm:text-lg text-[#f4e7c5]/60 tracking-wider">
          <span>© {new Date().getFullYear()} Brandmint AI Private Limited. Central Board of AI Film Certification.</span>
          <a
            href="#top"
            className="flex items-center gap-1.5 text-[#f6b632] hover:underline mt-2 sm:mt-0 font-bold"
          >
            <span>Back to Poster</span>
            <ArrowUp className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};
