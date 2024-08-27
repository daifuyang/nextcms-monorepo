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
      schemas: {
        success: {
          type: "object",
          required: ["code", "msg"],
          properties: {
            code: {
              type: "integer",
              description: "Response code",
              example: 1
            },
            msg: {
              type: "string",
              description: "Response message"
            },
            data: {
              oneOf: [
                {
                  type: "object",
                  description: "Response data",
                  additionalProperties: true
                },
                {
                  type: "array",
                  items: {
                    type: "object"
                  },
                  description: "Response data"
                },
                { type: "string" },
                { type: "number" },
                { type: "boolean" }
              ]
            }
          }
        }
      }
    },
    tags: [
      {
        name: "users",
        description: "用户相关"
      }
    ],
    servers: [
      {
        url: "/",
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
