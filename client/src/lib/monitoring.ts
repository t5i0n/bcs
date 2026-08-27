/**
 * Production error monitoring.
 *
 * Uses Sentry for frontend error tracking.
 * Set VITE_SENTRY_DSN in .env to enable.
 * All errors are reported without exposing sensitive info to users.
 */

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN as string | undefined;

/** Initialize error monitoring — call once in main.tsx */
export function initMonitoring() {
  if (!SENTRY_DSN) return;

  // Dynamically import Sentry only when DSN is configured
  void import("@sentry/react").then(
    (Sentry) => {
      Sentry.init({
        dsn: SENTRY_DSN,
        environment: import.meta.env.MODE,
        tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
        replaysSessionSampleRate: 0,
        replaysOnErrorSampleRate: import.meta.env.PROD ? 0.5 : 1.0,
        integrations: [Sentry.browserTracingIntegration()],
        beforeSend(event) {
          // Strip PII and sensitive data
          if (event.request) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const req = event.request as any;
            delete req.cookies;
            if (req.headers) delete req.headers["Authorization"];
          }
          // Don't report if user hasn't consented to analytics
          if (localStorage.getItem("cookie-analytics") !== "true") {
            return null;
          }
          return event;
        },
      });
    },
    (err: unknown) => {
      console.warn("Failed to initialize error monitoring:", err);
    },
  );
}

/** Manually report a caught error */
export function reportError(
  error: Error | unknown,
  context?: { component?: string; extra?: Record<string, unknown> },
) {
  const message = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : undefined;

  // Always log to console in development
  if (import.meta.env.DEV) {
    console.error("[Error]", message, { stack, ...context });
    return;
  }

  // In production, send to Sentry if available
  void import("@sentry/react")
    .then((Sentry) => {
      Sentry.withScope((scope) => {
        if (context?.component) {
          scope.setTag("component", context.component);
        }
        if (context?.extra) {
          scope.setExtras(context.extra);
        }
        scope.setContext("page", { url: window.location.href });
        Sentry.captureException(error);
      });
    })
    .catch(() => {
      // Sentry not available — fall back to console
      console.error("[Error]", message, { stack, ...context });
    });
}
