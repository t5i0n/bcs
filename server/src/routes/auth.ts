import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../db.js";
import { signToken, requireAuth } from "../middleware/auth.js";
import rateLimit from "express-rate-limit";

const router = Router();

// Rate limit: 10 login attempts per IP per 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many login attempts. Please try again later." },
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// POST /api/auth/login
router.post("/login", loginLimiter, async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const { email, password } = parsed.data;

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
