import { 
    IsString, 
    IsNotEmpty, 
    IsEmail, 
    MinLength, 
    IsEnum, 
    IsOptional 
} from 'class-validator';
import { UsuarioRole } from '../entities/User';

export class CreateUserDto {
    @IsNotEmpty({ message: 'O nome é obrigatório.' })
    @IsString({ message: 'O nome deve ser um texto válido.' })
    nome!: string;

    @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
    @IsEmail({}, { message: 'Informe um e-mail válido.' })
    email!: string;

    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    @IsString()
    @MinLength(6, { message: 'A senha deve ter mais de 6 caracteres.' })
    pwd!: string;

    @IsOptional()
    @IsEnum(UsuarioRole, { message: 'A permissão deve ser ATENDENTE ou ADMIN.' })
    role?: UsuarioRole;
}