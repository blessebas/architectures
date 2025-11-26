import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { registerSchema, loginSchema } from "../validators/auth.validator";
import { createTaskSchema, listTasksQuerySchema, updateTaskSchema } from "../validators/task.validator";
import { idParamSchema } from "../validators/user.validator";

import { UserController } from "../controllers/UserController";
import { TaskController } from "../controllers/TaskController";
import { AuthController } from "../controllers/AuthController";

export const makeRoutes = (authController: AuthController, userController: UserController, taskController: TaskController) => {
    const router = Router();

    // Auth
    router.post('/auth/login', validate({ body: loginSchema }), (req, res) => authController.login(req, res));
    router.post('/auth/register', validate({ body: registerSchema }), (req, res) => authController.register(req, res));

    // Users
    router.post('/api/users', validate({ body: registerSchema }), (req, res) => userController.create(req, res));
    router.get('/api/users', (req, res) => userController.list(req, res));
    router.get('/api/users/:id', validate({ params: idParamSchema }), (req, res) => userController.get(req, res));
    router.delete('/api/users/:id', validate({ params: idParamSchema }), (req, res) => userController.delete(req, res));

    // Tasks
    router.post('/api/tasks', validate({ body: createTaskSchema }), (req, res) => taskController.create(req, res));
    router.put('/api/tasks/:id', validate({ params: idParamSchema, body: updateTaskSchema }), (req, res) => taskController.update(req, res));
    router.delete('/api/tasks/:id', validate({ params: idParamSchema }), (req, res) => taskController.delete(req, res));
    router.get('/api/tasks', validate({ query: listTasksQuerySchema }), (req, res) => taskController.list(req, res));

    return router;
};