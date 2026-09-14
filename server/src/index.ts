import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import * as Sentry from "@sentry/node";
import { prisma } from "./db.js";
import { logger } from "./utils/logger.js";

// Routes
import authRoutes from "./routes/auth.js";
import adminCommodityRoutes from "./routes/admin/commodities.js";
import adminContactRoutes from "./routes/admin/contacts.js";
import adminContentRoutes from "./routes/admin/content.js";
import publicContactRoutes from "./routes/public/contact.js";
import publicCommodityRoutes from "./routes/public/commodities.js";
import publicContentRoutes from "./routes/public/content.js";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

// ─── Sentry Error Monitoring ───────────────────────────────────
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || "development",
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
  });
  app.use(Sentry.Handlers.requestHandler());
  logger.info("Sentry error monitoring initialized");
}

// ─── Global Middleware ─────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
      .split(",")
      .map((o) => o.trim());
    // Allow requests with no origin (mobile apps, curl, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(express.json({ limit: "10kb" }));

// ─── Health Check ──────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── Public Routes ─────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/contact", publicContactRoutes);
app.use("/api/commodities", publicCommodityRoutes);
app.use("/api/content", publicContentRoutes);

// ─── Admin Routes (all require auth) ───────────────────────────
app.use("/api/admin/commodities", adminCommodityRoutes);
app.use("/api/admin/contacts", adminContactRoutes);
app.use("/api/admin/content", adminContentRoutes);

// ─── 404 Handler ──────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

// ─── Error Handler ─────────────────────────────────────────────
if (process.env.SENTRY_DSN) {
  app.use(Sentry.Handlers.errorHandler());
}
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error("Unhandled error", { message: err.message, stack: err.stack });
  const statusCode = (err as unknown as { statusCode?: number }).statusCode || 500;
  res.status(statusCode).json({
    error: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
  });
});

// ─── Start Server ──────────────────────────────────────────────
async function main() {
  await prisma.$connect();
  logger.info("Database connected");

  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
}

main().catch((err) => {
  logger.error("Failed to start server", { message: err.message });
  process.exit(1);
});
