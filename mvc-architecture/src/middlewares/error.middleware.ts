import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  console.error(err);
  return res.status(500).json({ success: false, message: "Internal server error" });
}
