import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema } from "../validators/auth.validator";
import { z } from "zod";
import { AuthController } from "../controllers/AuthController";
import { UserModel } from "../models/UserModel";

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(8) });

export const makeAuthRoutes = () => {
  const router = Router();
  const controller = new AuthController(new UserModel());
  router.post("/auth/register", validate({ body: registerSchema }), (req, res) => controller.register(req, res));
  router.post("/auth/login", validate({ body: loginSchema }), (req, res) => controller.login(req, res));
  return router;
};
