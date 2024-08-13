import Router from "koa-router";

const adminRouter = new Router({ prefix: "/admin" });
adminRouter.get("/", (ctx, next) => {
  ctx.body = {
    msg: "admin",
    code: 1,
    data: {}
  };
});

export default adminRouter;