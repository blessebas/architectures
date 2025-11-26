import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

/**
 * validate({ body?, params?, query? })
 * - Cada campo: un ZodSchema
 */
export const validate =
    (schemas: { body?: ZodSchema<any>; params?: ZodSchema<any>; query?: ZodSchema<any> }) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                if (schemas.body) {
                    // parse throws ZodError si invalido
                    req.body = schemas.body.parse(req.body);
                }
                if (schemas.params) {
                    req.params = schemas.params.parse(req.params);
                }
                if (schemas.query) {
                    // zod parses query strings into typed values
                    req.query = schemas.query.parse(req.query);
                }
                return next();
            } catch (err: any) {
                // Dejar manejo de errores centralizado; si quieres responder aquí:
                if (err?.issues) {
                    const formatted = err.issues.map((i: any) => ({ path: i.path.join("."), message: i.message }));
                    return res.status(400).json({ success: false, errors: formatted });
                }
                return res.status(400).json({ success: false, message: err.message ?? "Validation error" });
            }
        };