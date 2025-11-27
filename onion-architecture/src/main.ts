import express from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import openapiDoc from "./docs/openapi/openapi.json";
import { errorHandler } from "./presentation/middlewares/error.middleware";
import { makeAuthRoutes } from "./presentation/routes/auth.routes";
import { makeUserRoutes } from "./presentation/routes/users.routes";
import { makeTaskRoutes } from "./presentation/routes/tasks.routes";

const app = express();
app.use(bodyParser.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiDoc as any));
app.use("/", makeAuthRoutes());
app.use("/", makeUserRoutes());
app.use("/", makeTaskRoutes());
app.use(errorHandler);

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => console.log(`Onion server running on http://localhost:${port}`));
