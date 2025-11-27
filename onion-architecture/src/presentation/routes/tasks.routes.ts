import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { auth } from "../middlewares/auth.middleware";
import { createTaskSchema, updateTaskSchema, listTasksQuerySchema } from "../../validators/task.validator";
import { idParamSchema } from "../../validators/user.validator";
import { TaskController } from "../controllers/TaskController";
import { PrismaTaskRepository } from "../../infrastructure/repositories/prisma-task.repository";
import { CreateTask } from "../../application/use-cases/create-task";
import { UpdateTask } from "../../application/use-cases/update-task";
import { DeleteTask } from "../../application/use-cases/delete-task";
import { ListTasks } from "../../application/use-cases/list-tasks";

export const makeTaskRoutes = () => {
  const router = Router();
  const repo = new PrismaTaskRepository();
  const controller = new TaskController(
    new CreateTask(repo),
    new UpdateTask(repo),
    new DeleteTask(repo),
    new ListTasks(repo)
  );
  router.post("/tasks", auth, validate({ body: createTaskSchema }), (req, res) => controller.create(req, res));
  router.put("/tasks/:id", auth, validate({ params: idParamSchema, body: updateTaskSchema }), (req, res) => controller.update(req, res));
  router.delete("/tasks/:id", auth, validate({ params: idParamSchema }), (req, res) => controller.delete(req, res));
  router.get("/tasks", validate({ query: listTasksQuerySchema }), (req, res) => controller.list(req, res));
  return router;
};
