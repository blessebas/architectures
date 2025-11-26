import express from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import openApiDocument from "./adapters/openapi/docs/openapi.json"; // generado

/*
infrastructure implementations
*/
// import { InMemoryUserRepository } from "./infrastructure/repositories/InMemoryUserRepository";
// import { InMemoryTaskRepository } from "./infrastructure/repositories/InMemoryTaskRepository";
import { PrismaUserRepository } from "./infrastructure/repositories/PrismaUserRepository";
import { PrismaTaskRepository } from "./infrastructure/repositories/PrismaTaskRepository";
import { BcryptPasswordHasher } from "./infrastructure/adapters/BcryptPasswordHasher";
import { JwtTokenService } from "./infrastructure/adapters/JwtTokenService";

/*
application use cases
*/
import { CreateUserUseCase } from "./application/useCases/users/CreateUserUseCase";
import { LoginUseCase } from "./application/useCases/auth/LoginUseCase";
import { ListUsersUseCase } from "./application/useCases/users/ListUsersUseCase";
import { GetUserUseCase } from "./application/useCases/users/GetUserUseCase";
import { DeleteUserUseCase } from "./application/useCases/users/DeleteUserUseCase";

/*
application use cases
*/
import { CreateTaskUseCase } from "./application/useCases/tasks/CreateTaskUseCase";
import { UpdateTaskUseCase } from "./application/useCases/tasks/UpdateTaskUseCase";
import { DeleteTaskUseCase } from "./application/useCases/tasks/DeleteTaskUseCase";
import { ListTasksUseCase } from "./application/useCases/tasks/ListTasksUseCase";

/*
adapters
*/
import { AuthController } from "./adapters/controllers/AuthController";
import { UserController } from "./adapters/controllers/UserController";
import { TaskController } from "./adapters/controllers/TaskController";
import { makeRoutes } from "./adapters/http/routes";
import { makeAuthMiddleware } from "./adapters/middleware/auth.middleware";
import { errorHandler } from "./adapters/middleware/error.middleware";


async function bootstrap() {
    const app = express();
    app.use(bodyParser.json());

    // openapi docs
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument, { explorer: true }));


    // infra implementations
    const userRepo = new PrismaUserRepository();
    const taskRepo = new PrismaTaskRepository();

    // security adapters
    const hasher = new BcryptPasswordHasher(10);
    const jwtSecret = process.env.JWT_SECRET ?? "changeme";
    const jwtExpires = process.env.JWT_EXPIRES_IN ?? "1h";
    const tokenService = new JwtTokenService(jwtSecret, jwtExpires);

    // use cases
    const createUserUC = new CreateUserUseCase(userRepo);
    const loginUC = new LoginUseCase(userRepo, hasher, tokenService);
    const listUsersUC = new ListUsersUseCase(userRepo);
    const getUserUC = new GetUserUseCase(userRepo);
    const deleteUserUC = new DeleteUserUseCase(userRepo);

    const createTaskUC = new CreateTaskUseCase(taskRepo);
    const updateTaskUC = new UpdateTaskUseCase(taskRepo);
    const deleteTaskUC = new DeleteTaskUseCase(taskRepo);
    const listTasksUC = new ListTasksUseCase(taskRepo);

    // controllers
    const authController = new AuthController(loginUC, createUserUC);
    const userController = new UserController(createUserUC, listUsersUC, getUserUC, deleteUserUC);
    const taskController = new TaskController(createTaskUC, updateTaskUC, deleteTaskUC, listTasksUC);

    const authMiddleware = makeAuthMiddleware(tokenService);
    const apiRouter = makeRoutes(authController, userController, taskController);

    // Protege rutas de tasks (ejemplo)
    app.use("/api/tasks", authMiddleware);
    app.use("/", apiRouter);

    // Error handler
    app.use(errorHandler);

    const port = Number(process.env.PORT ?? 3000);
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
}

bootstrap();
