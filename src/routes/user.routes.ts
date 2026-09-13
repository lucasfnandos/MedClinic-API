import { Router } from "express"; 
import { UserRepository } from "../repositories/UserRepository";
import { AppDataSource } from "../database/data-source";
import { UserService } from "../services/UserService";
import { UserController } from "../controllers/UserController";
import { UsuarioRole } from "../entities/User";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const userRoutes = Router();

const userRepo = new UserRepository(AppDataSource);
const userService = new UserService(userRepo);
const userController = new UserController(userService);

userRoutes.post("/register", (req, res, next) => userController.create(req, res, next));

userRoutes.use(authMiddleware);

userRoutes.get("/me", (req, res, next) => userController.userProfile(req, res, next));
userRoutes.get("/listall", roleMiddleware(UsuarioRole.ADMINISTRADOR), (req, res, next) => userController.list(req, res, next));

export { userRoutes }

