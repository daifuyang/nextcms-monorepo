import response from "@/lib/response";
import { getRoleList } from "@/models/role";
import { Context } from "koa";

export async function getRole(ctx: Context) {
  // 获取查询参数
  const query = ctx.query || {};
  const { page = "1", pageSize = "10" } = query;
  const roleList = await getRoleList(Number(page), Number(pageSize));
  let pagination = {};
  if (pageSize === "0") {
    pagination = roleList;
  } else {
    pagination = {
      page: Number(page),
      pageSize: Number(pageSize),
      total: roleList.length,
      data: roleList
    };
  }
  ctx.body = response.success("获取成功！", pagination);
}
