import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import { CreateUserDto } from "../dtos/CreateUserDto";
import { AppError } from "../types/AppError";

export class UserController {
    constructor(private service: UserService) {}

    async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try{
            const createUserDto = req.body as CreateUserDto;

            const createUser = await this.service.createUser(createUserDto);

            return res.status(201).json(createUser);
            
        } catch(err){
            next(err);
        };
    }

    async userProfile(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            if(!req.usuario) {
                throw new AppError("Usuário não autenticado", 403);
            }
            const user = await this.service.listUser(req.usuario.sub)
            return res.status(200).json(user);
        } catch(err) {
            next(err);
        }
    }

    async list(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            if(!req.usuario) {
                throw new AppError("Usuário não autenticado", 403);
            }
            const usersList = await this.service.listAllUsers();
            return res.status(200).json(usersList);
        } catch(err) {
            next(err);
        }
    }
}