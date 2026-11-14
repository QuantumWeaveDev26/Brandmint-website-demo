import React, { useEffect, useState } from 'react';
import { CONSENT_STORAGE_KEY } from '../utils/telemetry';

export const CookieConsentBanner: React.FC<{
  forceOpenTrigger?: number;
  onVisibilityChange?: (visible: boolean) => void;
  onOpenPrivacy?: () => void;
}> = ({ forceOpenTrigger = 0, onVisibilityChange, onOpenPrivacy }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(!localStorage.getItem(CONSENT_STORAGE_KEY));
    } catch {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (forceOpenTrigger > 0) setVisible(true);
  }, [forceOpenTrigger]);

  useEffect(() => {
    onVisibilityChange?.(visible);
  }, [visible, onVisibilityChange]);

  const savePreference = (analytics: boolean) => {
    try {
      localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({
          essential: true,
          analytics,
          functional: analytics,
          marketing: false,
          timestamp: new Date().toISOString(),
        })
      );
      document.cookie = `brandmint_consent=${analytics ? 'analytics' : 'essential'}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      /* Dismisses cleanly even when storage is restricted */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Browser preferences"
      className="fixed bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-auto sm:w-[395px] z-40 rounded-2xl bg-[#120642] border border-[#7265C2]/50 shadow-xl p-4 text-white"
    >
      <h2 className="font-display text-sm sm:text-base font-bold">Your browser preferences</h2>
      <p className="mt-1 text-xs leading-relaxed text-[#CCC7F2]/85">
        Choose essential site preferences only, or allow anonymous funnel analytics.
      </p>
      <div className="flex flex-wrap gap-2 items-center mt-3">
        <button
          type="button"
          onClick={() => savePreference(true)}
          className="min-h-9 rounded-full px-4 btn-aurora text-white text-xs font-semibold cursor-pointer"
        >
          Allow analytics
        </button>
        <button
          type="button"
          onClick={() => savePreference(false)}
          className="min-h-9 rounded-full px-3.5 bg-[#160952] border border-[#7265C2]/45 text-[#CCC7F2] hover:text-white text-xs font-semibold cursor-pointer"
        >
          Essential only
        </button>
        <button
          type="button"
          onClick={onOpenPrivacy}
          className="min-h-9 text-xs text-[#CCC7F2] underline ml-auto cursor-pointer"
        >
          Privacy
        </button>
      </div>
    </aside>
  );
};
