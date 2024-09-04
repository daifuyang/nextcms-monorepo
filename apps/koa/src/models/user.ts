import { now } from "@/lib/date";
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
        id,
        deletedAt: 0
      }
    });

    if (user) {
      redis.set(`${userIdKey}${{ id }}`, serializeData(user));
    }
  }

  return user;
};

// 获取用户总数
export const getUserCount = async (where: Prisma.cmsUserWhereInput = {}, tx = prisma) => {
  return await tx.cmsUser.count({
    where: {
      ...where,
      deletedAt: 0
    }
  });
};

// 获取用户列表
export const getUsersModel = async (
  page: number = 1,
  pageSize: number,
  where: Prisma.cmsUserWhereInput = {},
  tx = prisma
) => {
  const args: {
    skip?: number;
    take?: number;
    where?: Prisma.cmsUserWhereInput;
  } =
    pageSize === 0
      ? {}
      : {
          skip: (page - 1) * pageSize,
          take: pageSize
        };

  args.where = {
    ...where,
    deletedAt: 0
  };

  const users = await tx.cmsUser.findMany({
    ...args
  });

  return users;
};

// 根据条件获取单个用户
export const getUserModel = (where: Prisma.cmsUserWhereUniqueInput, tx = prisma) => {
  return tx.cmsUser.findUnique({
    where
  });
};

// 创建用户
export const createUserModel = async (data: Prisma.cmsUserCreateInput, tx = prisma) => {
  const user = await tx.cmsUser.create({
    data
  });
  if (user) {
    redis.set(`${userIdKey}:${user.id}`, serializeData(user));
  }
  return user;
};

// 更新用户
export const updateUserModel = async (id: number, data: Prisma.cmsUserCreateInput, tx = prisma) => {
  const user = await tx.cmsUser.update({
    where: {
      id
    },
    data
  });
  if (user) {
    redis.del(`${userIdKey}:${id}`);
  }
  return user;
};

// 删除用户
export const deleteUserModel = async (id: number, tx = prisma) => {
  const user = await tx.cmsUser.update({
    where: {
      id
    },
    data: {
      deletedAt: now()
    }
  });
  if (user) {
    redis.del(`${userIdKey}:${id}`);
  }
  return user;
};
