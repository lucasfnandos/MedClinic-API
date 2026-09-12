import { Request, Response, NextFunction } from "express";
import { tokenVerifier } from "../utils/jwt";
import { AppError } from "../types/AppError";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization as string;
    
    if(!authHeader) {
        return next(new AppError("Token não informado!", 401));
    }
    
    const [scheme, token] = authHeader.split(" ");
    if(scheme !== "Bearer" || !token) {
        return next(new AppError("Token mal formatado!", 401));
    }

    try {
        const payload = tokenVerifier(token);
        req.usuario = payload;
        return next();
    } catch (err) {
        return next(new AppError("Token inválido ou expirado!", 401));
    }
}