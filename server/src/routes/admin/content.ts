import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../db.js";
import { requireAuth } from "../../middleware/auth.js";

const router = Router();
router.use(requireAuth);

// ─── List all content entries ───────────────────────────────
router.get("/", async (_req, res) => {
  const entries = await prisma.siteContent.findMany({
    orderBy: [{ section: "asc" }, { key: "asc" }],
  });
  res.json({ entries });
});

// ─── Get content by section ─────────────────────────────────
router.get("/section/:section", async (req, res) => {
  const { section } = req.params;
  const entries = await prisma.siteContent.findMany({
    where: { section },
    orderBy: { key: "asc" },
  });
  res.json({ entries });
});

// ─── Get a single content entry ────────────────────────────
router.get("/key/:key", async (req, res) => {
  const entry = await prisma.siteContent.findUnique({
    where: { key: req.params.key },
  });
  if (!entry) {
    res.status(404).json({ error: "Content entry not found" });
    return;
  }
  res.json({ entry });
});

const contentEntrySchema = z.object({
  key: z.string().min(1).max(200),
  value: z.string(),
  section: z.string().min(1).max(50),
});

// ─── Create or update content entry (upsert by key) ────────
router.post("/", async (req, res) => {
  const parsed = contentEntrySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: parsed.error.flatten().fieldErrors });
    return;
  }

  const { key, value, section } = parsed.data;

  const entry = await prisma.siteContent.upsert({
    where: { key },
    update: { value, section },
    create: { key, value, section },
  });

  res.json({ entry });
});

// ─── Bulk update content entries ───────────────────────────
router.put("/bulk", async (req, res) => {
  const { entries } = req.body;

  if (!Array.isArray(entries)) {
    res.status(400).json({ error: "entries must be an array" });
    return;
  }

  const entryArraySchema = z.array(contentEntrySchema);
  const parsed = entryArraySchema.safeParse(entries);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: parsed.error.flatten().fieldErrors });
    return;
  }

  const results = await Promise.all(
    parsed.data.map(({ key, value, section }) =>
      prisma.siteContent.upsert({
        where: { key },
        update: { value, section },
        create: { key, value, section },
      }),
    ),
  );

  res.json({ updated: results.length });
});

// ─── Delete a content entry ────────────────────────────────
router.delete("/:key", async (req, res) => {
  await prisma.siteContent.delete({
    where: { key: req.params.key },
  });
  res.json({ success: true });
});

export default router;
