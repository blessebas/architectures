import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema } from "../../validators/auth.validator";
import { idParamSchema } from "../../validators/user.validator";
import { UserController } from "../controllers/UserController";

export const makeUserRoutes = () => {
  const router = Router();
  const controller = new UserController();
  router.post("/users", validate({ body: registerSchema }), (req, res) => controller.create(req, res));
  router.get("/users", (req, res) => controller.list(req, res));
  router.get("/users/:id", validate({ params: idParamSchema }), (req, res) => controller.get(req, res));
  router.delete("/users/:id", validate({ params: idParamSchema }), (req, res) => controller.delete(req, res));
  return router;
};
