import { Router } from "express";
import { prisma } from "../../db.js";
import { requireAuth } from "../../middleware/auth.js";

const router = Router();
router.use(requireAuth);

// GET /api/admin/contacts — list all submissions
router.get("/", async (req, res) => {
  const { status, page = "1", limit = "20" } = req.query;
  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(100, Math.max(1, Number(limit)));
  const skip = (pageNum - 1) * limitNum;

  const where = status ? { status: String(status) } : {};

  const [submissions, total] = await Promise.all([
    prisma.contactSubmission.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limitNum,
    }),
    prisma.contactSubmission.count({ where }),
  ]);

  res.json({
    submissions,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum),
    },
  });
});

// GET /api/admin/contacts/:id — get one
router.get("/:id", async (req, res) => {
  const submission = await prisma.contactSubmission.findUnique({
    where: { id: req.params.id },
  });
  if (!submission) {
    return res.status(404).json({ error: "Submission not found" });
  }

  // Auto-mark as read when viewed
  if (submission.status === "new") {
    await prisma.contactSubmission.update({
      where: { id: req.params.id },
      data: { status: "read" },
    });
    submission.status = "read";
  }

  res.json({ submission });
});

// PATCH /api/admin/contacts/:id — update status or notes
router.patch("/:id", async (req, res) => {
  const { status, notes } = req.body;
  const validStatuses = ["new", "read", "replied", "archived"];

  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const submission = await prisma.contactSubmission.update({
    where: { id: req.params.id },
    data: {
      ...(status && { status }),
      ...(notes !== undefined && { notes }),
    },
  });

  res.json({ submission });
});

// DELETE /api/admin/contacts/:id — delete submission
router.delete("/:id", async (req, res) => {
  await prisma.contactSubmission.delete({ where: { id: req.params.id } });
  res.status(204).end();
});

// GET /api/admin/contacts/stats/overview — submission stats
router.get("/stats/overview", async (_req, res) => {
  const [total, newCount, readCount, repliedCount] = await Promise.all([
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { status: "new" } }),
    prisma.contactSubmission.count({ where: { status: "read" } }),
    prisma.contactSubmission.count({ where: { status: "replied" } }),
  ]);

  res.json({ total, new: newCount, read: readCount, replied: repliedCount });
});

export default router;
