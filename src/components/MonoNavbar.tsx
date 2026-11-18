import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useIsPresent } from 'framer-motion';
import { ArrowUpRight, MessageCircle, Menu, X, ChevronDown } from 'lucide-react';
import brandmintLogo from '../assets/brandmint-logo.webp';

function PresenceSafeNav(props: React.ComponentProps<typeof motion.nav>) {
  const present = useIsPresent();
  return <motion.nav {...props} inert={!present} aria-hidden={!present}
    style={{ ...props.style, pointerEvents: present ? 'auto' : 'none' }} />;
}

export type RoutePath =
  | '/'
  | '/about'
  | '/solutions'
  | '/business-growth'
  | '/ventures'
  | '/academy'
  | '/blog'
  | '/contact';

interface DropdownChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  path: RoutePath;
  alignRight?: boolean;
  children?: DropdownChild[];
}

interface MonoNavbarProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath) => void;
  onOpenBooking: () => void;
}

export const SOLUTIONS_DROPDOWN: DropdownChild[] = [
  { label: 'Cashflow Copy', href: 'https://cashflowcopy.in/' },
  { label: 'WhatsApp Automation', href: 'https://brandmintai.io/freemium' },
  { label: 'AI-Powered Films', href: 'https://brandmintai.io/filmsuccess' },
  { label: 'Meta Growth System', href: 'https://brandmintai.io/meta-growth/' },
  { label: 'AI Workforce', href: 'https://brandmintai.io/ai-workforce/' },
];

export const ACADEMY_DROPDOWN: DropdownChild[] = [
  { label: 'AI-Powered Marketing', href: 'https://brandmintai.io/instaskills' },
  { label: 'AI Full-Stack Developer', href: 'https://brandmintai.io/fullai' },
  { label: 'IGR Academy', href: 'https://brandmintai.io/igr.academy' },
  { label: 'Appu AI', href: 'https://brandmintai.io/appuai' },
  { label: 'AI Filmmaking', href: 'https://brandmintai.io/aifilmmaking' },
];

export const BLOG_DROPDOWN: DropdownChild[] = [
  { label: 'Small Business Automation Ideas', href: 'https://brandmintai.io/small-business-automation-ideas/' },
  { label: 'WhatsApp Lead Follow-Up System', href: 'https://brandmintai.io/whatsapp-lead-follow-up-system/' },
  { label: 'AI Business Automation FAQ', href: 'https://brandmintai.io/ai-business-faq/' },
  { label: 'Connect Website Leads to CRM', href: 'https://brandmintai.io/connect-website-leads-to-crm/' },
];

const NAV_LINKS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Solutions', path: '/solutions', children: SOLUTIONS_DROPDOWN },
  { label: 'Business Growth', path: '/business-growth' },
  { label: 'Ventures', path: '/ventures' },
  { label: 'Academy', path: '/academy', children: ACADEMY_DROPDOWN },
  { label: 'Blog', path: '/blog', alignRight: true, children: BLOG_DROPDOWN },
  { label: 'Contact', path: '/contact' },
];

export const MonoNavbar: React.FC<MonoNavbarProps> = ({
  currentPath,
  onNavigate,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (headerRef.current?.querySelector('#mobile-navigation')) menuButtonRef.current?.focus();
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (mobileOpen) headerRef.current?.querySelector<HTMLAnchorElement>('#mobile-navigation a')?.focus({ preventScroll: true });
  }, [mobileOpen]);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleMouseEnter = (label: string) => {
    clearCloseTimer();
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 130);
  };

  const handleLinkClick = (e: React.MouseEvent, path: RoutePath) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    setOpenDropdown(null);
    setMobileOpen(false);
    onNavigate(path);
  };

  return (
    <header ref={headerRef} className="site-navigation fixed top-0 left-0 right-0 z-50 px-3 sm:px-5 py-2.5">
      <div className="max-w-7xl mx-auto rounded-full bg-[#0E0433]/95 border border-[#7265C2]/35 px-3 sm:px-4 xl:px-5 py-1.5 flex items-center justify-between gap-2 shadow-[0_14px_38px_rgba(5,1,20,0.82),inset_0_1px_0_rgba(204,199,242,0.2)]">
        {/* Official Brand Identity */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="flex items-center gap-2 group shrink-0"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white p-0.5 flex items-center justify-center overflow-hidden ring-2 ring-[#7265C2]/55 shadow-md group-hover:scale-105 transition-transform">
            <img
              src={brandmintLogo}
              alt="BrandMint AI Official Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="nav-brand-copy text-left">
            <span className="font-display text-sm xl:text-[15px] font-bold tracking-tight whitespace-nowrap block leading-tight text-white">
              Brand<span className="text-[#CCC7F2]">Mint</span>{' '}
              <span className="text-[#7265C2] font-semibold">AI</span>
            </span>
            <span className="hidden xl:block text-[10px] text-[#CCC7F2]/70 font-medium leading-none mt-0.5">
              Ideas Into Action
            </span>
          </div>
        </a>

        {/* Sleek Desktop & Laptop Navigation with Compact Popover Dropdowns */}
        <nav
          aria-label="Main navigation"
          className="hidden lg:flex items-center gap-0.5 text-[12px] xl:text-[13px] font-medium mx-auto bg-[#120642]/85 p-1 rounded-full border border-[#7265C2]/25"
        >
          {NAV_LINKS.map((item) => {
            const isActive = currentPath === item.path;
            const isDropdownOpen = openDropdown === item.label;

            if (!item.children) {
              return (
                <a
                  key={item.path}
                  href={item.path}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  className={`px-2.5 xl:px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
                    isActive
                      ? 'btn-aurora text-white font-semibold'
                      : 'text-[#CCC7F2]/88 hover:text-white hover:bg-[#312185]/45'
                  }`}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <div
                key={item.path}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className={`inline-flex items-center rounded-full transition-all ${
                    isActive
                      ? 'btn-aurora text-white font-semibold'
                      : isDropdownOpen
                      ? 'bg-[#312185]/60 text-white'
                      : 'text-[#CCC7F2]/88 hover:text-white hover:bg-[#312185]/45'
                  }`}
                >
                  <a
                    href={item.path}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => handleLinkClick(e, item.path)}
                    className="pl-2.5 xl:pl-3.5 pr-1 py-1.5 whitespace-nowrap"
                  >
                    {item.label}
                  </a>
                  <button
                    type="button"
                    aria-label={`Toggle ${item.label} menu`}
                    aria-expanded={isDropdownOpen}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdown((prev) => (prev === item.label ? null : item.label));
                    }}
                    className="pr-2 xl:pr-2.5 pl-0.5 py-1.5 flex items-center cursor-pointer"
                  >
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180 text-white' : 'text-[#CCC7F2]/80'
                      }`}
                    />
                  </button>
                </div>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                      className={`absolute top-full pt-2 z-50 ${
                        item.alignRight ? 'right-0' : 'left-0'
                      }`}
                    >
                      <div
                        role="menu"
                        className="w-60 rounded-2xl bg-[#0E0433]/98 border border-[#7265C2]/40 p-1.5 shadow-[0_22px_50px_rgba(4,1,18,0.92),inset_0_1px_0_rgba(204,199,242,0.22)]"
                      >
                        {item.children.map((child) => (
                          <a
                            key={child.href}
                            role="menuitem"
                            href={child.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setOpenDropdown(null)}
                            className="group/item flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-[13px] font-medium text-[#CCC7F2]/90 hover:text-white hover:bg-[#312185]/65 transition-colors"
                          >
                            <span className="leading-snug">{child.label}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-[#7265C2] group-hover/item:text-[#CCC7F2] group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all" />
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="nav-actions flex items-center gap-1.5 sm:gap-2 shrink-0">
          <a
            href="https://wa.me/919972965677?text=Hi%20BrandMint%20AI%20Bengaluru%2C%20I%20would%20like%20to%20connect."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#160952] hover:bg-[#312185] border border-[#7265C2]/40 text-[#CCC7F2] hover:text-white text-xs font-semibold transition-all whitespace-nowrap"
            title="Talk on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>WhatsApp</span>
          </a>

          <a
            href="https://calendly.com/team-brandmint/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full btn-aurora text-white font-semibold text-xs whitespace-nowrap cursor-pointer"
          >
            Book a Call
          </a>

          <button
            type="button"
            ref={menuButtonRef}
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 rounded-full border border-[#7265C2]/40 text-[#CCC7F2] hover:bg-[#312185]/50 transition-colors cursor-pointer"
            aria-label="Toggle Menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Compact, Non-Crowded Mobile & Tablet Popover Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <PresenceSafeNav
            id="mobile-navigation"
            data-lenis-prevent
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden mt-2 w-[min(92vw,340px)] ml-auto rounded-2xl bg-[#0E0433]/98 border border-[#7265C2]/40 p-2.5 shadow-[0_24px_56px_rgba(4,1,18,0.94)] max-h-[78vh] overflow-y-auto flex flex-col gap-1"
          >
            {NAV_LINKS.map((item) => {
              const isActive = currentPath === item.path;
              const isExpanded = mobileExpanded === item.label;

              if (!item.children) {
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => handleLinkClick(e, item.path)}
                    className={`px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-colors ${
                      isActive
                        ? 'btn-aurora text-white'
                        : 'text-[#CCC7F2] hover:bg-[#160952] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <div key={item.path} className="rounded-xl bg-[#120642]/60 border border-[#7265C2]/20 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <a
                      href={item.path}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={(e) => handleLinkClick(e, item.path)}
                      className={`flex-1 px-3.5 py-2 text-[13px] font-semibold transition-colors ${
                        isActive ? 'text-white' : 'text-[#CCC7F2] hover:text-white'
                      }`}
                    >
                      {item.label}
                    </a>
                    <button
                      type="button"
                      aria-label={`Expand ${item.label} links`}
                      aria-expanded={isExpanded}
                      onClick={() => setMobileExpanded((prev) => (prev === item.label ? null : item.label))}
                      className="px-3 py-2 text-[#CCC7F2] hover:text-white cursor-pointer"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="px-2 pb-2 pt-0.5 border-t border-[#7265C2]/20 flex flex-col gap-0.5">
                      {item.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#CCC7F2]/90 hover:text-white hover:bg-[#312185]/60 transition-colors"
                        >
                          <span>{child.label}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-[#7265C2]" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="grid grid-cols-2 gap-1.5 pt-1.5 mt-0.5 border-t border-[#7265C2]/25">
              <a
                href="https://calendly.com/team-brandmint/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl btn-aurora text-white text-xs font-semibold text-center"
              >
                Book a Call
              </a>
              <a
                href="https://wa.me/919972965677?text=Hi%20BrandMint%20AI%20Bengaluru%2C%20I%20would%20like%20to%20connect."
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl bg-[#25D366] text-[#0A0224] text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>
          </PresenceSafeNav>
        )}
      </AnimatePresence>
    </header>
  );
};
