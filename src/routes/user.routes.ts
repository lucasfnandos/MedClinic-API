import { Router } from "express"; 
import { UserRepository } from "../repositories/UserRepository";
import { AppDataSource } from "../database/data-source";
import { UserService } from "../services/UserService";
import { UserController } from "../controllers/UserController";

const userRoutes = Router();

const userRepo = new UserRepository(AppDataSource);
const userService = new UserService(userRepo);
const userController = new UserController(userService);

userRoutes.post("/register", (req, res, next) => userController.create(req, res, next));

export { userRoutes }

