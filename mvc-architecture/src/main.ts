import express from "express";
import bodyParser from "body-parser";
import { errorHandler } from "./middlewares/error.middleware";
import { makeUserRoutes } from "./routes/users.routes";
import { makeTaskRoutes } from "./routes/tasks.routes";
import { makeAuthRoutes } from "./routes/auth.routes";
import swaggerUi from "swagger-ui-express";
import openapiDoc from "./docs/openapi/openapi.json";

async function bootstrap() {
  const app = express();
  app.use(bodyParser.json());

  app.use("/", makeAuthRoutes());
  app.use("/", makeUserRoutes());
  app.use("/", makeTaskRoutes());
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiDoc as any));

  app.use(errorHandler);

  const port = Number(process.env.PORT ?? 3000);
  app.listen(port, () => console.log(`MVC server running on http://localhost:${port}`));
}

bootstrap();
