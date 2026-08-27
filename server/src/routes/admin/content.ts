import { Router } from "express";
import { prisma } from "../../db.js";

const router = Router();

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

// ─── Create or update content entry (upsert by key) ────────
router.post("/", async (req, res) => {
  const { key, value, section } = req.body;

  if (!key || !value || !section) {
    res.status(400).json({ error: "key, value, and section are required" });
    return;
  }

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

  const results = await Promise.all(
    entries.map(({ key, value, section }: { key: string; value: string; section: string }) =>
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
