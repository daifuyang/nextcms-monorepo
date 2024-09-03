import { now } from "@/lib/date";
import { parseJson } from "@/lib/request";
import response from "@/lib/response";
import { createRole, getRoleById, getRoleCount, getRoleList, updateRole } from "@/models/role";
import { Role } from "@/typings/role";
import { Context } from "koa";
import { Prisma } from "@prisma/client";
import redis from "@/lib/redis";

// 获取角色列表
export async function getRoles(ctx: Context) {
  // 获取查询参数
  const query = ctx.query || {};
  const { page = "1", pageSize = "10", name = "", description = "", status = "" } = query;

  const where: {
    name?: any;
    description?: any;
    status?: any;
  } = {};

  if (name) {
    where.name = {
      contains: name
    };
  }

  if (description) {
    where.description = {
      contains: description
    };
  }

  if (status) {
    where.status = Number(status);
  }

  const roleList = await getRoleList(Number(page), Number(pageSize), where);
  let pagination = {};
  if (pageSize === "0") {
    pagination = roleList;
  } else {
    const total = await getRoleCount();
    pagination = {
      page: Number(page),
      pageSize: Number(pageSize),
      total,
      data: roleList
    };
  }
  ctx.body = response.success("获取成功！", pagination);
}

// 新增角色
export async function addRole(ctx: Context) {
  const { name, description, sort, status } = parseJson(ctx) as Role;
  try {
    const role = await createRole({
      name,
      description,
      sort,
      status,
      createdAt: now(),
      updatedAt: now()
    });
    ctx.body = response.success("新增成功！", role);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        ctx.body = response.error("角色名称已存在！");
        return;
      }
    }
    ctx.body = response.error("系统出错！");
  }
}

// 查看单个角色
export async function getRole(ctx: Context) {
  const { id } = ctx.params;

  if (Number(id) > 0) {
    const role = await getRoleById(Number(id));
    if (!role) {
      ctx.body = response.error("角色不存在！");
      return;
    }
    ctx.body = response.success("获取成功！", role);
    return;
  }

  ctx.body = response.error("参数错误！");
}

// 修改角色
export async function editRole(ctx: Context) {
  const { id } = ctx.params;

  if (Number(id) > 0) {
    const { name, description, sort, status } = parseJson(ctx) as Role;

    const role = await getRoleById(Number(id));
    if (!role) {
      ctx.body = response.error("角色不存在！");
      return;
    }
    const newRole = await updateRole(Number(id), {
      name,
      description,
      sort,
      status,
      updatedAt: now()
    });

    if (newRole) {
      redis.del(`role:${id}`);
    }

    ctx.body = response.success("更新成功！", newRole);
    return;
  }

  ctx.body = response.error("参数错误！");
}

// 删除角色
export async function deleteRole(ctx: Context) {
  const { id } = ctx.params;

  if (Number(id) > 0) {
    const role = await getRoleById(Number(id));
    if (!role) {
      ctx.body = response.error("角色不存在！");
      return;
    }
    const deleted = await updateRole(Number(id), { deletedAt: now() });
    if (deleted) {
      redis.del(`role:${id}`);
    }
    ctx.body = response.success("删除成功！", deleted);
    return;
  }

  ctx.body = response.error("参数错误！");
}
