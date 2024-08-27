import Router from "koa-router";
import swaggerJSDoc from "swagger-jsdoc";

const router = new Router();
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "NextCMS API Documentation",
      version: "1.0.0",
      description: "API documentation for NextCMS project"
    },
    components: {
      schemas: {}
    },
    servers: [
      {
        url: "/api/v1",
        description: "Local server"
      }
    ]
  },
  apis: ["./src/controller/*.ts"] // 这里指定包含Swagger注释的文件路径
};

const swaggerSpec = swaggerJSDoc(options);

router.get("/swagger.json", (ctx) => {
  ctx.body = swaggerSpec;
});

export default router;
