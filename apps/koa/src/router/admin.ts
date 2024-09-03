import Router from "koa-router";
import { auth } from "@/middlewares/auth";
import { home } from "@/controller/admin";
import { addRole, getRoles, getRole, editRole, deleteRole } from "@/controller/admin/role";

const adminRouter = new Router({ prefix: "/admin" });
adminRouter.use(auth);
adminRouter.get("/", home);
adminRouter.get("/roles", getRoles);
adminRouter.get("/roles/:id", getRole);
adminRouter.post("/roles", addRole);
adminRouter.post("/roles/:id", editRole);
adminRouter.delete("/roles/:id", deleteRole);

export default adminRouter;
