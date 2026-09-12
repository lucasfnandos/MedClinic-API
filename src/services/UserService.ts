import { UserRepository } from "../repositories/UserRepository";
import { UsuarioMapper } from "../mappers/UsuarioMapper";
import { UsuarioRole } from "../entities/User";
import { hashPassword } from "../utils/hashPassword";
import { UserDto } from "../dtos/UserDto";
import { CreateUserDto } from "../dtos/CreateUserDto";
import { AppError } from "../types/AppError";

export class UserService {
  constructor(private repo: UserRepository) {}

  async createUser(userInfo: CreateUserDto): Promise<UserDto | null> {
    const emailExists = await this.repo.findByEmail(userInfo.email);

    if(emailExists) {
        throw new AppError('Email já cadastrado!', 409);
    }
    const passHash = await hashPassword(userInfo.pwd);
    const userSaved = await this.repo.create(userInfo);
    return UsuarioMapper.toDto(userSaved);
  }

  async listUser(id: string): Promise<UserDto | null> {
    const usuario = await this.repo.findById(id);
    if(!usuario) {
        throw new AppError('Usuario não encontrado', 400);
    }
    return UsuarioMapper.toDto(usuario);
  }
}