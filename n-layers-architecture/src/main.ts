import express from "express";
import bodyParser from "body-parser";
import { errorHandler } from "./presentation/middlewares/error.middleware";
import { makeAuthRoutes } from "./presentation/routes/auth.routes";
import { makeUserRoutes } from "./presentation/routes/users.routes";
import { makeTaskRoutes } from "./presentation/routes/tasks.routes";
import swaggerUi from "swagger-ui-express";
import openapiDoc from "./docs/openapi/openapi.json";

const app = express();
app.use(bodyParser.json());
app.use("/", makeAuthRoutes());
app.use("/", makeUserRoutes());
app.use("/", makeTaskRoutes());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiDoc as any));
app.use(errorHandler);

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => console.log(`N-Layers server running on http://localhost:${port}`));
