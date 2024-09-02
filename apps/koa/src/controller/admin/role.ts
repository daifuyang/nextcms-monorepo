import { now } from "@/lib/date";
import { parseJson } from "@/lib/request";
import response from "@/lib/response";
import { createRole, getRoleCount, getRoleList } from "@/models/role";
import { Role } from "@/typings/role";
import { Context } from "koa";

// 获取角色列表
export async function getRole(ctx: Context) {
  // 获取查询参数
  const query = ctx.query || {};
  const { page = "1", pageSize = "10" } = query;
  const roleList = await getRoleList(Number(page), Number(pageSize));
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
  const role = await createRole({
    name,
    description,
    sort,
    status,
    createdAt: now(),
    updatedAt: now()
  });
  ctx.body = response.success("新增成功！", role);
}
