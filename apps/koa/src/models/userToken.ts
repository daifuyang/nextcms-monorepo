import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const createUserToken = (data: Prisma.cmsUserTokenCreateInput, tx = prisma) => {
  return tx.cmsUserToken.create({
    data
  });
};
