import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();
prisma.$use(async (params, next) => {
  console.log('params',params);
  return next(params);
})

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;