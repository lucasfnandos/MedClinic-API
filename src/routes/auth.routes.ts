import { Router } from "express"; 
import { AuthController } from "../controllers/AuthController";
import { AuthService } from "../services/AuthService";
import { UserRepository } from "../repositories/UserRepository";
import { AppDataSource } from "../database/data-source";

const authRoutes = Router();

const userRepo = new UserRepository(AppDataSource);
const authService = new AuthService(userRepo); 
const authController = new AuthController(authService);

authRoutes.post("/login", (req, res, next) => authController.login(req, res, next));

export { authRoutes }

