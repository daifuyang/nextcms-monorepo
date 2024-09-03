import prisma from "@/lib/prisma";
import redis from "@/lib/redis";
import { serializeData } from "@/lib/util";
import { Prisma } from "@prisma/client";

const roleIdKey = "role:id:";

// 获取角色列表
export const getRoleList = async (
  page: number = 1,
  pageSize: number,
  where: Prisma.cmsRoleWhereInput = {},
  tx = prisma
) => {
  const args: {
    skip?: number;
    take?: number;
    where?: Prisma.cmsRoleWhereInput;
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

  const roles = await tx.cmsRole.findMany({
    ...args
  });

  return roles;
};

// 获取角色详情
export const getRoleById = async (id: number, tx = prisma) => {
  const cache = await redis.get(`${roleIdKey}${id}`);
  if (cache) {
    return JSON.parse(cache);
  }

  const role = await tx.cmsRole.findUnique({
    where: {
      id,
      deletedAt: 0
    }
  });

  if (role) {
    redis.set(`${roleIdKey}${id}`, serializeData(role));
  }

  return role;
};

// 获取角色总数
export const getRoleCount = async (tx = prisma) => {
  return await tx.cmsRole.count({
    where: {
      deletedAt: 0
    }
  });
};

// 创建角色
export const createRole = async (data: any, tx = prisma) => {
  const role = await tx.cmsRole.create({
    data
  });

  if (role) {
    const { id } = role;
    redis.set(`${roleIdKey}${id}`, serializeData(role));
  }

  return role;
};

// 更新角色
export const updateRole = async (id: number, data: Prisma.cmsRoleUpdateInput, tx = prisma) => {
  const role = await tx.cmsRole.update({
    where: {
      id
    },
    data
  });

  if (role) {
    redis.del(`${roleIdKey}${id}`);
  }

  return role;
};
