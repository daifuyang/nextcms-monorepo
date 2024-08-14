import Router from "koa-router";
import { auth } from "@/middlewares/auth";
import { home } from "@/controller/admin";

const adminRouter = new Router({ prefix: "/admin" });
adminRouter.use(auth);
adminRouter.get("/", home);

export default adminRouter;
