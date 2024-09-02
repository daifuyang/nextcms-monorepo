import prisma from "@/lib/prisma";
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
  return await tx.cmsRole.findMany({
    ...args
  });
};
