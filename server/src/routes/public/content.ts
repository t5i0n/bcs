import { Router } from "express";
import { prisma } from "../../db.js";

const router = Router();

// ─── Get all public content ────────────────────────────────
router.get("/", async (_req, res) => {
  const entries = await prisma.siteContent.findMany({
    orderBy: [{ section: "asc" }, { key: "asc" }],
  });

  // Transform into a nested object: { section: { key: value } }
  const content: Record<string, Record<string, string>> = {};
  for (const entry of entries) {
    if (!content[entry.section]) content[entry.section] = {};
    content[entry.section][entry.key] = entry.value;
  }

  res.json({ content });
});

// ─── Get content by section ─────────────────────────────────
router.get("/:section", async (req, res) => {
  const entries = await prisma.siteContent.findMany({
    where: { section: req.params.section },
    orderBy: { key: "asc" },
  });

  const content: Record<string, string> = {};
  for (const entry of entries) {
    content[entry.key] = entry.value;
  }

  res.json({ content });
});

export default router;
