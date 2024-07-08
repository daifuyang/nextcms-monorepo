/**
 * @author: daifuyang
 * @date: 2024-05-08
 * @description: 用户模型文件
 */

import dayjs from "dayjs";
import redis from "@/app/lib/redis";
import prisma from "@/app/lib/prisma";
import type { cmsUser, cmsUserToken, Prisma } from "@prisma/client";

const userIdKey = `${process.env.APP_NAME}:user:id:`;
const userTokenKey = `${process.env.APP_NAME}:user:token:`;

// 统计所有用户数量
export async function getUserTotal(tx = prisma) {
  return tx.cmsUser.count();
}

// 获取用户列表
export async function getUserList(current: number, pageSize: number, tx = prisma) {
  const params: {
    skip?: number;
    take?: number;
  } = {};
  if (pageSize > 0) {
    params.skip = (current - 1) * pageSize;
    params.take = pageSize;
  }

  const user = await tx.cmsUser.findMany({
    ...params,
    orderBy: {
      id: "desc"
    }
  });

  return user;
}

// 获取当前用户信息
export async function currentUser(accessToken: string) {
  const key = `${userTokenKey}${accessToken}`;
  const cache = await redis.get(key);
  let usereToken: cmsUserToken | null = null;
  if (cache) {
    usereToken = JSON.parse(cache);
  }
  if (!usereToken) {
    // 验证token
    usereToken = await prisma.cmsUserToken.findFirst({
      where: {
        accessToken,
        expiryAt: {
          gt: dayjs().unix() // 没有失效
        }
      }
    });
  }
  if (usereToken?.userId) {
    const user = await getUserById(usereToken.userId);
    return user;
  }
  return null;
}

// 根据主键获取用户信息
export async function getUserById(id: number) {
  const key = `${userIdKey}${id}`;
  const cacahe = await redis.get(key);
  let user: cmsUser | null = null;
  if (cacahe) {
    user = JSON.parse(cacahe);
  } else {
    user = await prisma.cmsUser.findFirst({
      where: {
        id
      }
    });
    if (user) {
      redis.set(key, JSON.stringify(user));
    }
  }
  return user;
}

export async function createUser(
  data: Prisma.XOR<Prisma.cmsUserCreateInput, Prisma.cmsUserUncheckedCreateInput>
) {
  const user = await prisma.cmsUser.create({
    data,
  });
  await prisma.$disconnect();
  return user;
}
