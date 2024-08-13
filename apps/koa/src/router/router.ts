import Router from "koa-router";
import adminRouter from "./admin";
import prisma from "@/lib/prisma";

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

v1.use(adminRouter.routes());
router.use(v1.routes());
