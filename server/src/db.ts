import { PrismaClient } from "@prisma/client";

// Singleton Prisma client to avoid exhausting connections in development
// with hot-reloading. In production, one instance per process is fine.

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
