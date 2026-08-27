import { Router } from "express";
import { prisma } from "../../db.js";

const router = Router();

// GET /api/commodities — public listing (only available items, limited fields)
router.get("/", async (_req, res) => {
  const commodities = await prisma.coffeeCommodity.findMany({
    where: { coffeeStatus: "Available" },
    select: {
      id: true,
      name: true,
      organicCertified: true,
      sourceOfCoffee: true,
      coffeeGrade: true,
      coffeeType: true,
      processingType: true,
      packagingContent: true,
      packageUnit: true,
      weightUnitCode: true,
      minOrderQty: true,
      description: true,
    },
    orderBy: { name: "asc" },
  });
  res.json({ commodities });
});

// GET /api/commodities/:id — public single item
router.get("/:id", async (req, res) => {
  const commodity = await prisma.coffeeCommodity.findUnique({
    where: { id: req.params.id },
    select: {
      id: true,
      name: true,
      organicCertified: true,
      sourceOfCoffee: true,
      coffeeGrade: true,
      coffeeType: true,
      processingType: true,
      packagingContent: true,
      packageUnit: true,
      weightUnitCode: true,
      minOrderQty: true,
      description: true,
    },
  });

  if (!commodity || commodity === null) {
    return res.status(404).json({ error: "Not found" });
  }
  res.json({ commodity });
});

export default router;
