import Router from "koa-router";

export const v1 = new Router({prefix: "/api/v1"});

const adminRouter = new Router({prefix: "/admin"});
adminRouter.get("/", (ctx, next) => {
  ctx.body = {
    msg: "admin",
    code: 1,
    data: {}
  };
});

v1.get("/", (ctx, next) => {
  ctx.body = {
    msg: "version 1.0",
    code: 1,
    data: {}
  };
});

v1.use(adminRouter.routes());
