import { UsuarioMapper } from "../mappers/UsuarioMapper";
import { UserRepository } from "../repositories/UserRepository";
import { AppError } from "../types/AppError";
import { LoginResponseDto } from "../dtos/LoginResponseDto";
import { LoginDto } from "../dtos/LoginDto";


export class AuthService {
    constructor(private repo: UserRepository) {}

    async login(loginInfo: LoginDto): Promise<LoginResponseDto> {
        const email = loginInfo.email
        const user = await this.repo.findByEmail(email);
        if(!user) {
            throw new AppError("Credenciais inválidas!", 401);
        }
        const pwdMatch = await comparePassword(loginInfo.pwd, user.senha);
        if(!pwdMatch) {
            throw new AppError("Credenciais inválidas!", 401);
        }
        const token = tokenBuilder({ sub: user.id, role: user.role});

        return {
            token,
            user: UsuarioMapper.toDto(user)
        };


    }
}