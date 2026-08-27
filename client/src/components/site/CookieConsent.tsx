import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Cookie, X } from "lucide-react";
import { hasAnalyticsConsent, setAnalyticsConsent, loadGA } from "@/lib/analytics";

const CONSENT_KEY = "cookie-consent-given";

export function CookieConsent() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show if consent hasn't been given yet
    if (!localStorage.getItem(CONSENT_KEY)) {
      // Small delay so it doesn't flash on first paint
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
    // If consent was previously given, load analytics if accepted
    if (hasAnalyticsConsent()) {
      loadGA();
    }
  }, []);

  function accept() {
    setAnalyticsConsent(true);
    localStorage.setItem(CONSENT_KEY, "true");
    setShow(false);
  }

  function decline() {
    setAnalyticsConsent(false);
    localStorage.setItem(CONSENT_KEY, "true");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="container-x mx-auto max-w-4xl">
        <div className="rounded-2xl bg-card border border-border shadow-elegant p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent text-accent-foreground grid place-items-center flex-shrink-0">
              <Cookie className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-lg font-bold">
                {t("cookie.title", "Cookie Preferences")}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {t(
                  "cookie.message",
                  "We use cookies to understand how you use our website and to improve your experience. Analytics cookies help us measure site performance. You can accept or decline — your choice.",
                )}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={accept}
                  className="px-5 py-2.5 rounded-xl bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition"
                >
                  {t("cookie.accept", "Accept Analytics")}
                </button>
                <button
                  onClick={decline}
                  className="px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition"
                >
                  {t("cookie.decline", "Decline")}
                </button>
              </div>
            </div>
            <button
              onClick={decline}
              className="p-2 rounded-lg hover:bg-muted transition flex-shrink-0"
              aria-label={t("cookie.dismiss", "Dismiss")}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
