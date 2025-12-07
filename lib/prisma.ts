import { PrismaClient } from "@prisma/client";

declare global {
  // allow global in dev to avoid multiple clients during HMR
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;
