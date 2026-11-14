import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { MonoNavbar, type RoutePath } from './components/MonoNavbar';
import { MonoScrollHero } from './components/MonoScrollHero';
import { WorkflowExample } from './components/WorkflowExample';
import { PrivacyNotice } from './components/PrivacyNotice';
import { useMotionSettings } from './components/MotionSettings';
import { FigmaWeaveTransformation } from './components/FigmaWeaveTransformation';
import { MonoSplitTransformation } from './components/MonoSplitTransformation';
import { MonoWhatsAppSimulator } from './components/MonoWhatsAppSimulator';
import { HomePrinciplesStack } from './components/HomePrinciplesStack';
import { MonoRoiCalculator } from './components/MonoRoiCalculator';
import { MonoFooter } from './components/MonoFooter';
import { MonoBookingModal } from './components/MonoBookingModal';
import { ScrollStageTransform } from './components/ScrollStageTransform';
import { SeoHead } from './components/SeoHead';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { FloatingSupportWidgets } from './components/FloatingSupportWidgets';
import { ProTiltCard } from './components/ProTiltCard';
import { trackBrandMintEvent } from './utils/telemetry';

// Eagerly imported lightweight pages (~18 kB gzipped total) for 0ms synchronous route transitions
import { AboutPage } from './pages/AboutPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { BusinessGrowthPage } from './pages/BusinessGrowthPage';
import { VenturesPage } from './pages/VenturesPage';
import { AcademyPage } from './pages/AcademyPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';

declare global {
  interface Window {
    __lenis?: Lenis | null;
  }
}

const VALID_ROUTES: RoutePath[] = [
  '/',
  '/about',
  '/solutions',
  '/business-growth',
  '/ventures',
  '/academy',
  '/blog',
  '/contact',
];

const NEXT_PAGE_MAP: Record<RoutePath, { eyebrow: string; label: string; accent: string; next: RoutePath }> = {
  '/': { eyebrow: 'Next Chapter', label: 'Meet BrandMint AI &', accent: 'Leadership', next: '/about' },
  '/about': { eyebrow: 'Next Chapter', label: 'Explore Enterprise AI', accent: 'Solutions', next: '/solutions' },
  '/solutions': { eyebrow: 'Next Chapter', label: 'Discover Business', accent: 'Growth Systems', next: '/business-growth' },
  '/business-growth': { eyebrow: 'Next Chapter', label: 'Inside Our', accent: 'Venture Holdings', next: '/ventures' },
  '/ventures': { eyebrow: 'Next Chapter', label: 'Explore BrandMint', accent: 'Academy', next: '/academy' },
  '/academy': { eyebrow: 'Next Chapter', label: 'Read Practical AI', accent: 'Playbooks', next: '/blog' },
  '/blog': { eyebrow: 'Next Chapter', label: 'Connect With Us in', accent: 'Bengaluru', next: '/contact' },
  '/contact': { eyebrow: 'Back to Start', label: 'Return to', accent: 'BrandMint Home', next: '/' },
};

function resolvePath(raw: string): RoutePath {
  const cleaned = raw.replace(/\/+$/, '') || '/';
  return (VALID_ROUTES.includes(cleaned as RoutePath) ? cleaned : '/') as RoutePath;
}

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<RoutePath>(() =>
    resolvePath(window.location.pathname)
  );
  const [routePulse, setRoutePulse] = useState(0);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [focusArea, setFocusArea] = useState<string>();
  const { paused } = useMotionSettings();
  const openPilot = (focus?: string) => {
    trackBrandMintEvent('pilot_modal_open', { focus_area: focus || 'general', route: currentPath });
    setFocusArea(focus);
    setIsBookingOpen(true);
  };
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [cookieTrigger, setCookieTrigger] = useState(0);
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  // Ultra-snappy, zero-lag Lenis 1.3 smooth scroll engine
  useEffect(() => {
    if (paused) return;
    const engine = new Lenis({
      lerp: 0.16,
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.4,
      autoRaf: true,
    });
    lenisRef.current = engine;
    window.__lenis = engine;
    return () => {
      engine.destroy();
      lenisRef.current = null;
      window.__lenis = null;
    };
  }, [paused]);

  // Direct DOM rAF Scroll Progress Laser (Zero React re-renders during scroll)
  useEffect(() => {
    let raf = 0;
    const updateProgress = () => {
      raf = 0;
      const bar = progressBarRef.current;
      if (!bar) return;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const ratio = Math.max(0, Math.min(1, window.scrollY / max));
      bar.style.transform = `scaleX(${ratio.toFixed(4)})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [currentPath]);

  useEffect(() => {
    const onPop = () => {
      setCurrentPath(resolvePath(window.location.pathname));
      setRoutePulse((n) => n + 1);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (path: RoutePath) => {
    if (path === currentPath) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { duration: 0.55 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    window.history.pushState({}, '', path);
    trackBrandMintEvent('page_view', { route: path });
    setCurrentPath(path);
    setRoutePulse((n) => n + 1);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  };

  const nextPortal = NEXT_PAGE_MAP[currentPath];

  return (
    <div className="relative min-h-screen w-full aurora-canvas text-[#F5F3FF] selection:bg-[#7265C2] selection:text-white">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SeoHead currentPath={currentPath} />

      {/* Zero-React-Render Ink Nocturne Scroll Progress Laser */}
      <div
        ref={progressBarRef}
        style={{ transform: 'scaleX(0)' }}
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-gradient-to-r from-[#312185] via-[#7265C2] to-[#CCC7F2] will-change-transform pointer-events-none"
      />

      {/* Sleek Non-Blocking Top Optical Route Shimmer */}
      <AnimatePresence>
        {routePulse > 0 && (
          <motion.div
            key={`pulse-${routePulse}`}
            initial={{ scaleX: 0, opacity: 0.95 }}
            animate={{ scaleX: 1, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 h-[3px] z-[65] origin-left bg-gradient-to-r from-[#7265C2] via-[#FFFFFF] to-[#CCC7F2] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Floating Ink Nocturne Navbar */}
      <MonoNavbar
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenBooking={() => openPilot()}
      />

      {/* Instant 0ms Synchronous Route Render (No <main> transform so sticky & GPU video overlays run natively) */}
      <main
        id="main-content"
        tabIndex={-1}
        className="relative z-10 w-full flex flex-col items-stretch"
      >
        {currentPath === '/' && (
          <>
            <MonoScrollHero
              onOpenBooking={() => openPilot()}
              onNavigate={navigate}
            />
            <ScrollStageTransform>
              <MonoSplitTransformation />
            </ScrollStageTransform>
            <FigmaWeaveTransformation onOpenBooking={openPilot} />
            <ScrollStageTransform>
              <WorkflowExample onOpenBooking={() => openPilot('WhatsApp enquiry to CRM handoff')} />
            </ScrollStageTransform>
            <ScrollStageTransform>
              <MonoWhatsAppSimulator onOpenBooking={() => openPilot('WhatsApp Automation & CRM Sync')} />
            </ScrollStageTransform>
            <ScrollStageTransform>
              <HomePrinciplesStack />
            </ScrollStageTransform>
            <ScrollStageTransform>
              <MonoRoiCalculator onOpenBooking={() => openPilot()} />
            </ScrollStageTransform>
          </>
        )}

        {currentPath === '/about' && (
          <AboutPage
            onOpenBooking={() => openPilot()}
            onNavigate={navigate}
          />
        )}

        {currentPath === '/solutions' && (
          <SolutionsPage onOpenBooking={() => openPilot()} />
        )}

        {currentPath === '/business-growth' && (
          <BusinessGrowthPage onOpenBooking={() => openPilot()} />
        )}

        {currentPath === '/ventures' && (
          <VenturesPage onOpenBooking={() => openPilot()} />
        )}

        {currentPath === '/academy' && (
          <AcademyPage onOpenBooking={() => openPilot('BrandMint Academy & Training')} />
        )}

        {currentPath === '/blog' && <BlogPage />}

        {currentPath === '/contact' && <ContactPage />}

        {/* Compact Next-Chapter Portal */}
        <ScrollStageTransform>
          <section className="px-4 pt-4 pb-10 max-w-xl mx-auto w-full">
            <ProTiltCard
              maxTilt={3.5}
              onClick={() => navigate(nextPortal.next)}
              className="group relative w-full rounded-2xl px-5 sm:px-6 py-4 sm:py-5 glass-card-active flex items-center justify-between gap-4 text-left cursor-pointer"
            >
              <div className="relative z-20 min-w-0">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#CCC7F2] mb-1">
                  <Sparkles className="w-3 h-3 text-[#CCC7F2]" />
                  <span>{nextPortal.eyebrow}</span>
                </span>
                <div className="font-display text-lg sm:text-2xl font-bold text-white leading-snug">
                  {nextPortal.label}{' '}
                  <span className="font-editorial text-xl sm:text-[28px] text-aurora pr-1">
                    {nextPortal.accent}
                  </span>
                </div>
              </div>
              <span className="relative z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#CCC7F2] text-[#0A0224] flex items-center justify-center group-hover:translate-x-1 transition-transform duration-200 shrink-0 shadow-lg">
                <ArrowRight className="w-4 h-4" />
              </span>
            </ProTiltCard>
          </section>
        </ScrollStageTransform>
      </main>

      {/* Footer */}
      <PrivacyNotice isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <MonoFooter
        onOpenPrivacy={() => setPrivacyOpen(true)}
        onOpenCookieSettings={() => setCookieTrigger((n) => n + 1)}
        onNavigate={navigate}
      />

      {/* Cookie Consent Banner */}
      <CookieConsentBanner
        onOpenPrivacy={() => setPrivacyOpen(true)}
        forceOpenTrigger={cookieTrigger}
        onVisibilityChange={setCookieBannerVisible}
      />

      {/* Vertically Stacked WhatsApp (Top) + Ishani AI Help (Bottom) Support Dock */}
      <FloatingSupportWidgets
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenBooking={() => openPilot()}
        cookieBannerVisible={cookieBannerVisible}
      />

      {/* Consultation Modal */}
      <MonoBookingModal
        focusArea={focusArea}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default App;
