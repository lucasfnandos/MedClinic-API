import { UsuarioRole } from "../entities/User";

export interface TokenPayLoad{
    sub: string;
    role: UsuarioRole
}

declare global {
    namespace express {
        interface Request {
            usuario?: TokenPayLoad
        }
    }
}