import fs from "fs";
import path from "path";

import prisma from "@/lib/prisma";
import { now } from "./date";
import { hashPassword } from "./util";

export const install = async () => {
  const lockDir = path.resolve(process.cwd(), "install");
  const lockFile = path.resolve(lockDir, "install.lock");
  if (fs.existsSync(lockFile)) {
    console.log("已经安装过");
    return;
  }

  // 初始化
  const existUser = await prisma.cmsUser.findFirst({
    where: {
      loginName: "admin"
    }
  });
  if (!existUser) {
    const password = await hashPassword("123456")

    const user = await prisma.cmsUser.create({
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

  // 创建安装锁

  if (!fs.existsSync(lockDir)) {
    fs.mkdirSync(lockDir);
  }

  fs.writeFileSync(lockFile, "");
};
