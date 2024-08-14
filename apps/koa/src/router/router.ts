import Router from "koa-router";
import adminRouter from "./admin";
import { Login } from "@/controller/login";
import { currentUser } from "@/controller/user";

export const router = new Router();
router.get("/", (ctx, next) => {
  ctx.body = {
    msg: "hello world",
    code: 1,
    data: {}
  };
});

const v1 = new Router({ prefix: "/api/v1" });
v1.get("/", (ctx, next) => {
  ctx.body = {
    msg: "version 1.0",
    code: 1,
    data: {}
  };
});

// 用户登录
v1.post("/login", Login);

// 用户鉴权
v1.get("/currentUser", currentUser);

v1.use(adminRouter.routes());
router.use(v1.routes());
