import { Request, Response, NextFunction } from "express";
import { JwtTokenServiceImpl } from "../../outbound/jwt-token.service";

export const authMiddleware = (secret: string) => {
  const tokens = new JwtTokenServiceImpl(secret);
  return async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) return res.status(401).json({ message: "Unauthorized" });
    try {
      const payload = await tokens.verify(header.replace("Bearer ", ""));
      (req as any).user = payload;
      return next();
    } catch {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
};
