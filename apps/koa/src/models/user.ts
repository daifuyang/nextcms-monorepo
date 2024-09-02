import prisma from "@/lib/prisma";
import redis from "@/lib/redis";
import { serializeData } from "@/lib/util";
import { cmsUser, Prisma } from "@prisma/client";

const userIdKey = "user:id:";
// 根据id获取用户
export const getUserById = async (id: number, tx = prisma) => {
  const cache = await redis.get(`${userIdKey}${id}`);
  let user: cmsUser | null = null;
  if (cache) {
    user = JSON.parse(cache);
  }

  if (!user) {
    user = await tx.cmsUser.findUnique({
      where: {
        id
      }
    });

    if (user) {
      redis.set(`${userIdKey}${{ id }}`, serializeData(user));
    }
  }

  const newUser = {
    ...user,
    createdAt: user?.createdAt.toString(),
    updatedAt: user?.updatedAt.toString()
  }
  
  return newUser;
};

// 根据条件获取单个用户
export const getUser = (where: Prisma.cmsUserWhereUniqueInput, tx = prisma) => {
  return prisma.cmsUser.findUnique({
    where
  });
};
