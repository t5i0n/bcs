/**
 * Google Analytics 4 — consent-aware loading.
 *
 * GA4 only loads after the user accepts analytics cookies.
 * Set VITE_GA_MEASUREMENT_ID in .env to enable.
 */

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const GA_ENABLED = Boolean(GA_ID);

/** Load the GA4 gtag script dynamically */
export function loadGA() {
  if (!GA_ENABLED || document.getElementById("ga-script")) return;

  // gtag.js loader
  const script = document.createElement("script");
  script.id = "ga-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  }
  gtag("js", new Date());
  gtag("config", GA_ID!, {
    page_title: document.title,
    send_page_view: true,
  });
}

/** Track a custom event */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  if (!GA_ENABLED || !window.dataLayer) return;
  window.dataLayer.push(["event", eventName, params]);
}

/** Check if user has previously consented */
export function hasAnalyticsConsent(): boolean {
  return localStorage.getItem("cookie-analytics") === "true";
}

/** Save analytics consent choice */
export function setAnalyticsConsent(consented: boolean) {
  localStorage.setItem("cookie-analytics", String(consented));
  if (consented) {
    loadGA();
  }
}

// TypeScript augmentation for dataLayer
declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}
