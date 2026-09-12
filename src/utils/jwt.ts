import { TokenPayLoad } from "../types/TokenPayLoad";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

export function tokenBuilder(payload: TokenPayLoad): string{
    return jwt.sign(
        payload,
        JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
        } as jwt.SignOptions
    );
}

export function tokenVerifier(token: string): TokenPayLoad{
    return jwt.verify(token, JWT_SECRET) as TokenPayLoad;
}