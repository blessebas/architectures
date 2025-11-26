import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ZodError) {
        const issues = err.issues.map(i => ({ path: i.path.join('.'), message: i.message }));
        return res.status(400).json({ success: false, errors: issues });
    }

    // Domain errors
    if (err?.name === "DomainError" || err?.name === "Error") {
        return res.status(400).json({ success: false, message: err.message });
    }

    // Fallback
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
}