import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";
import { LoginDto } from "../dtos/LoginDto";

export class AuthController {
    constructor(private service: AuthService) {}

    async login(req: Request, res: Response, next: NextFunction): Promise<Response  | void> {
        try {
            const userInfo = req.body as LoginDto;
            const loginInfo = await this.service.login(userInfo);
            return res.status(200).json(loginInfo);
        } catch(err) {
            next(err);
        }
    }
}