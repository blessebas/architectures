import { Request, Response, NextFunction } from "express";
import { ITokenService } from "../../application/ports/ITokenService";

export interface AuthenticatedRequest extends Request {
    userId?: string;
    tokenPayload?: any;
}

export const makeAuthMiddleware = (tokenService: ITokenService) => {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
            const auth = req.headers.authorization;
            if (!auth || !auth.startsWith("Bearer ")) {
                return res.status(401).json({ message: "Missing token" });
            }
            const token = auth.split(" ")[1];
            const payload = await tokenService.verify<any>(token);
            req.userId = payload?.sub ? String(payload.sub) : undefined;
            req.tokenPayload = payload;
            next();
        } catch (err: any) {
            return res.status(401).json({ message: "Invalid token" });
        }
    };
};