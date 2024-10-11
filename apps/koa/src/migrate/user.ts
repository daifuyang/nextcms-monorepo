import prisma from "@/lib/prisma";
import { now } from "../lib/date";
import { hashPassword } from "../lib/util";

export default async function migrateUser() {
      // 初始化
  const existUser = await prisma.sysUser.findFirst({
    where: {
      loginName: "admin"
    }
  });
  if (!existUser) {
    const password = await hashPassword("123456")

    const user = await prisma.sysUser.create({
      data: {
        loginName: "admin",
        password,
        nickname: "admin",
        userType: 1,
        status: 1,
        createdAt: now(),
        updatedAt: now()
      }
    });

    console.log("create admin user", user);
  }
}