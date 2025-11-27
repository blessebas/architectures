import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import openapiDoc from "./docs/openapi/openapi.json";
import { errorHandler } from "./shared/middlewares/error.middleware";
import { makeAuthRoutes } from "./auth/adapters/inbound/http/auth.routes";
import { makeUserRoutes } from "./users/adapters/inbound/http/users.routes";
import { makeTaskRoutes } from "./tasks/adapters/inbound/http/tasks.routes";

const app = express();
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiDoc as any));
app.use("/", makeAuthRoutes());
app.use("/", makeUserRoutes());
app.use("/", makeTaskRoutes());
app.use(errorHandler);

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => console.log(`DDD server running on http://localhost:${port}`));

