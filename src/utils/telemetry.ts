export const CONSENT_STORAGE_KEY = 'brandmint_cookie_consent_v1';

export interface LeadCapturePayload {
  source: 'booking_modal' | 'contact_page';
  name: string;
  organisation?: string;
  email?: string;
  phone?: string;
  focusArea?: string;
  notes?: string;
  route?: string;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    __brandmintEvents?: Record<string, unknown>[];
  }
}

export function hasAnalyticsConsent(): boolean {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { analytics?: boolean };
    return Boolean(parsed?.analytics);
  } catch {
    return false;
  }
}

/**
 * Consent-Gated Funnel Telemetry
 * Fires only when visitor has granted analytics consent in CookieConsentBanner.
 * Compatible out-of-the-box with Google Tag Manager / GA4 `window.dataLayer`.
 */
export function trackBrandMintEvent(
  event: string,
  params: Record<string, string | number | boolean | undefined> = {}
): void {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return;
  const entry = {
    event,
    ...params,
    timestamp: new Date().toISOString(),
  };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(entry);
  window.__brandmintEvents = window.__brandmintEvents || [];
  if (window.__brandmintEvents.length > 50) window.__brandmintEvents.shift();
  window.__brandmintEvents.push(entry);
}

/**
 * Non-Blocking CRM Webhook Capture
 * Sends structured lead JSON to `VITE_CRM_WEBHOOK_URL` (n8n / Make / HubSpot / Zoho)
 * using `keepalive: true` so lead capture succeeds even as WhatsApp/Calendly opens.
 */
export function dispatchLeadWebhook(payload: LeadCapturePayload): void {
  const webhookUrl = import.meta.env.VITE_CRM_WEBHOOK_URL as string | undefined;
  trackBrandMintEvent('lead_dispatch', {
    source: payload.source,
    focus_area: payload.focusArea || 'general',
  });
  if (!webhookUrl) return;
  try {
    void fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        ...payload,
        submittedAt: new Date().toISOString(),
        origin: window.location.href,
      }),
    }).catch(() => {});
  } catch {
    // Silent fallback — WhatsApp / Calendly primary flow continues uninterrupted
  }
}
