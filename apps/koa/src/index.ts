import Koa from "koa";
import { v1 } from "./router/router";

const app = new Koa();

const port = 3000;

app.use(v1.routes());

app.listen(port, () => {
  console.log(`🚀 Server is running on port http://localhost:${port}/`);
});