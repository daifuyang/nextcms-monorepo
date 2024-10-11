import fs from "fs";
import path from "path";
import migrateUser from "../migrate/user";
import migrateMenu from "../migrate/menu";

export const install = async () => {
  const lockDir = path.resolve(process.cwd(), "install");
  const lockFile = path.resolve(lockDir, "install.lock");
  if (fs.existsSync(lockFile)) {
    console.log("已经安装过");
    return;
  }

  migrateUser();
  migrateMenu();

  // 创建安装锁

  if (!fs.existsSync(lockDir)) {
    fs.mkdirSync(lockDir);
  }

  fs.writeFileSync(lockFile, "");
};
