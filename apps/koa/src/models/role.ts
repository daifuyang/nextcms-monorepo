import prisma from "@/lib/prisma";
import redis from "@/lib/redis";
import { serializeData } from "@/lib/util";

const roleIdKey = "role:id:";

// 获取角色列表
export const getRoleList = async (page: number = 1, pageSize: number, tx = prisma) => {
  const args: {
    skip?: number;
    take?: number;
  } =
    pageSize === 0
      ? {}
      : {
          skip: (page - 1) * pageSize,
          take: pageSize
        };
  const roles = await tx.cmsRole.findMany({
    ...args
  });

  const data = roles.map((role) => {
    return {
      ...role,
      createdAt: role.createdAt.toString(),
      updatedAt: role.updatedAt.toString()
    };
  });

  return data;
};

// 获取角色总数
export const getRoleCount = async (tx = prisma) => {
  return await tx.cmsRole.count();
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
