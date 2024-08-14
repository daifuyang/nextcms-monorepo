import 'dotenv/config';

import Koa from "koa";
import bodyParser from 'koa-bodyparser';
import { router } from "./router/router";
import { install } from './lib/install';

install()

const app = new Koa();
app.use(bodyParser());

const port = process.env.PORT || 3000;
app.use(router.routes());


app.listen(port, () => {
  console.log(`🚀 Server is running on port http://localhost:${port}/`);
});