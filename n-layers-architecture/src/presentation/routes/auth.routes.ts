import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

export const makeAuthRoutes = () => {
  const router = Router();
  const controller = new AuthController();
  router.post("/auth/register", (req, res) => controller.register(req, res));
  router.post("/auth/login", (req, res) => controller.login(req, res));
  return router;
};
