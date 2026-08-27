import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../db.js";
import { requireAuth } from "../../middleware/auth.js";

const router = Router();
router.use(requireAuth);

// Validation schema for creating/updating commodities
const commoditySchema = z.object({
  name: z.string().min(1),
  organicCertified: z.boolean().optional(),
  sourceOfCoffee: z.string().min(1),
  coffeeGrade: z.string().min(1),
  coffeeType: z.string().min(1),
  coffeeStatus: z.enum(["Available", "Sold Out", "In Transit", "Reserved"]).optional(),
  processingType: z.string().min(1),
  packagingContent: z.string().min(1),
  packageUnit: z.string().min(1),
  weightUnitCode: z.enum(["KG", "LB"]).optional(),
  pricePerUnit: z.number().nullable().optional(),
  stockQuantity: z.number().min(0).optional(),
  availableQty: z.number().min(0).optional(),
  quantitySold: z.number().min(0).optional(),
  minOrderQty: z.number().nullable().optional(),
  description: z.string().nullable().optional(),
});

// GET /api/admin/commodities — list all
router.get("/", async (_req, res) => {
  const commodities = await prisma.coffeeCommodity.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json({ commodities });
});

// GET /api/admin/commodities/:id — get one
router.get("/:id", async (req, res) => {
  const commodity = await prisma.coffeeCommodity.findUnique({
    where: { id: req.params.id },
  });
  if (!commodity) {
    return res.status(404).json({ error: "Commodity not found" });
  }
  res.json({ commodity });
});

// POST /api/admin/commodities — create
router.post("/", async (req, res) => {
  const parsed = commoditySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Validation failed", details: parsed.error.flatten() });
  }

  const commodity = await prisma.coffeeCommodity.create({ data: parsed.data });
  res.status(201).json({ commodity });
});

// PUT /api/admin/commodities/:id — update
router.put("/:id", async (req, res) => {
  const parsed = commoditySchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Validation failed", details: parsed.error.flatten() });
  }

  const commodity = await prisma.coffeeCommodity.update({
    where: { id: req.params.id },
    data: parsed.data,
  });
  res.json({ commodity });
});

// DELETE /api/admin/commodities/:id — delete
router.delete("/:id", async (req, res) => {
  await prisma.coffeeCommodity.delete({ where: { id: req.params.id } });
  res.status(204).end();
});

// GET /api/admin/commodities/stats — summary stats
router.get("/stats/overview", async (_req, res) => {
  const [total, available, totalStock, totalSold] = await Promise.all([
    prisma.coffeeCommodity.count(),
    prisma.coffeeCommodity.count({ where: { coffeeStatus: "Available" } }),
    prisma.coffeeCommodity.aggregate({ _sum: { stockQuantity: true } }),
    prisma.coffeeCommodity.aggregate({ _sum: { quantitySold: true } }),
  ]);

  res.json({
    total,
    available,
    totalStock: totalStock._sum.stockQuantity ?? 0,
    totalSold: totalSold._sum.quantitySold ?? 0,
  });
});

export default router;
