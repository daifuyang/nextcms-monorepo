import Router from "koa-router";
import { auth } from "@/middlewares/auth";
import { home } from "@/controller/admin";
import { getRole } from "@/controller/admin/role";

const adminRouter = new Router({ prefix: "/admin" });
adminRouter.use(auth);
adminRouter.get("/", home);
adminRouter.get("/user/role", getRole);

export default adminRouter;
