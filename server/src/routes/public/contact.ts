import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../db.js";
import rateLimit from "express-rate-limit";

const router = Router();

// Rate limit: 5 submissions per IP per hour
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many submissions. Please try again later." },
});

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  company: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  email: z.string().email("Invalid email address"),
  interest: z.string().max(200).optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

// POST /api/contact — submit a contact form
router.post("/", contactLimiter, async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: parsed.error.flatten().fieldErrors,
    });
  }

  const { name, company, country, email, interest, message } = parsed.data;

  const submission = await prisma.contactSubmission.create({
    data: {
      name,
      company: company || null,
      country: country || null,
      email,
      coffeeInterest: interest || null,
      message,
    },
  });

  res.status(201).json({
    success: true,
    message: "Your inquiry has been received. We will respond within one business day.",
    id: submission.id,
  });
});

export default router;
