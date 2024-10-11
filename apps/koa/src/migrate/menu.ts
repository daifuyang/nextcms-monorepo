import menus from "@/migrate/data/menus.json";
import prisma from "@/lib/prisma";
import { createMenu, getMenuByName, updateMenu } from "@/models/menu";
import { Prisma, sysMenu } from "@prisma/client";
import { now } from "@/lib/date";

interface MenuItem {
  perms: string;
  menuName: string;
  path: string;
  visible?: boolean;
  menuType?: string;
  children?: MenuItem[]; // 子菜单，递归定义
}

// 递归解析菜单项
async function parseMenuItems(menuItems: MenuItem[], level: number = 0) {

  for (const item of menuItems) {
    // 打印菜单的名称和路径
    let menuType = item.menuType || "D";
    const menu = await getMenuByName(item.menuName);
    if (menu?.menuId) {
      await updateMenu(menu.menuId, {
        menuName: item.menuName,
        parentId: level,
        path: item.path,
        perms: item.perms,
        icon: "",
        order: level,
        updatedId: 1,
        updatedBy: "admin",
        createdAt: now(),
        updatedAt: now(),
      });
    } else {
      await createMenu({
        menuName: item.menuName,
        parentId: level,
        path: item.path,
        perms: item.perms,
        icon: "",
        order: level,
        createdId: 1,
        createdBy: "admin",
        updatedId: 1,
        updatedBy: "admin",
        updatedAt: now(),
      });
    }
    // 如果有子菜单，递归调用
    if (item.children && item.children.length > 0) {
      parseMenuItems(item.children, level++);
    } 
  };
}

export default async function migrateMenu() {
  parseMenuItems(menus);
}
