import { Request, Response, NextFunction } from "express";
import { UsuarioRole } from "../entities/User";

export function roleMiddleware(...rolesPermitidas: UsuarioRole[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if(!req.usuario) {
            return res.status(401).json({ erro: "Não autenticado." });
        }
        if(!rolesPermitidas.includes(req.usuario.role)) {
            return res.status(401).json({ erro: "Usuário não autorizado." });
        }
        return next();
    }
}