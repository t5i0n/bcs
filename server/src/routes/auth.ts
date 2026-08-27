import { Router } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../db.js";
import { signToken, requireAuth } from "../middleware/auth.js";

const router = Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = signToken({
    id: admin.id,
    email: admin.email,
    role: admin.role,
  });

  res.json({
    token,
    admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role },
  });
});

// GET /api/auth/me — verify token and return current admin
router.get("/me", requireAuth, async (req, res) => {
  const admin = await prisma.admin.findUnique({
    where: { id: req.admin!.id },
    select: { id: true, email: true, name: true, role: true },
  });

  if (!admin) {
    return res.status(404).json({ error: "Admin not found" });
  }

  res.json({ admin });
});

export default router;
