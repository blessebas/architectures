import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { auth } from "../middlewares/auth.middleware";
import { createTaskSchema, updateTaskSchema, listTasksQuerySchema } from "../../validators/task.validator";
import { idParamSchema } from "../../validators/user.validator";
import { TaskController } from "../controllers/TaskController";

export const makeTaskRoutes = () => {
  const router = Router();
  const controller = new TaskController();
  router.post("/tasks", auth, validate({ body: createTaskSchema }), (req, res) => controller.create(req, res));
  router.put("/tasks/:id", auth, validate({ params: idParamSchema, body: updateTaskSchema }), (req, res) => controller.update(req, res));
  router.delete("/tasks/:id", auth, validate({ params: idParamSchema }), (req, res) => controller.delete(req, res));
  router.get("/tasks", validate({ query: listTasksQuerySchema }), (req, res) => controller.list(req, res));
  return router;
};
