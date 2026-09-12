import { Request, Response, NextFunction } from "express";
import { AppError } from "../types/AppError";

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction): void {
    if(err instanceof AppError) {
        res.status(err.statusCode).json({ message: err.message });
    }
    console.error('[Erro inesperado]', err);
    res.status(500).json({ error: "Erro inesperado no servidor!" });
}
