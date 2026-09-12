import { UsuarioRole } from "../entities/User";

export interface TokenPayLoad{
    sub: string;
    role: UsuarioRole
}

declare global {
    namespace Express {
        interface Request {
            usuario?: TokenPayLoad
        }
    }
}