import Router from "koa-router";
import { auth } from "@/middlewares/auth";
import { home } from "@/controller/admin";
import { addRole, getRoles, getRole, updateRole, deleteRole } from "@/controller/admin/role";
import { getUsers, getUser, addUser, updateUser, deleteUser } from "@/controller/admin/user";

const adminRouter = new Router({ prefix: "/admin" });
adminRouter.use(auth);
adminRouter.get("/", home);
adminRouter.get("/roles", getRoles);
adminRouter.get("/roles/:id", getRole);
adminRouter.post("/roles", addRole);
adminRouter.post("/roles/:id", updateRole);
adminRouter.delete("/roles/:id", deleteRole);

adminRouter.get("/users", getUsers);
adminRouter.get("/users/:id", getUser);
adminRouter.post("/users", addUser);
adminRouter.post("/users/:id", updateUser);
adminRouter.delete("/users/:id", deleteUser);

export default adminRouter;
