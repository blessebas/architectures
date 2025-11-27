import { Router } from "express";
import { validate } from "../../../../shared/middlewares/validate.middleware";
import { createTaskSchema, updateTaskSchema, listTasksQuerySchema } from "../../../../shared/validators/task.validator";
import { TaskController } from "../controllers/TaskController";
import { PrismaTaskRepository } from "../../outbound/prisma-task.repository";
import { CreateTask } from "../../../application/use-cases/CreateTask";
import { UpdateTask } from "../../../application/use-cases/UpdateTask";
import { DeleteTask } from "../../../application/use-cases/DeleteTask";
import { ListTasks } from "../../../application/use-cases/ListTasks";
import { authMiddleware } from "../../../../shared/middlewares/auth.middleware";

export const makeTaskRoutes = () => {
  const router = Router();
  const repo = new PrismaTaskRepository();
  const controller = new TaskController(new CreateTask(repo), new UpdateTask(repo), new DeleteTask(repo), new ListTasks(repo));
  const auth = authMiddleware(process.env.JWT_SECRET ?? "changeme");
  router.post("/api/tasks", auth, validate({ body: createTaskSchema }), (req, res) => controller.create(req, res));
  router.put("/api/tasks/:id", auth, validate({ body: updateTaskSchema }), (req, res) => controller.update(req, res));
  router.delete("/api/tasks/:id", auth, (req, res) => controller.delete(req, res));
  router.get("/api/tasks", validate({ query: listTasksQuerySchema }), (req, res) => controller.list(req, res));
  return router;
};
