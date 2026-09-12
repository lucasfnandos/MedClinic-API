import { Usuario } from "../entities/User";
import { UserDto } from "../dtos/UserDto";

export class UsuarioMapper {
  static toDto(usuario: Usuario): UserDto {
    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      criado_em: usuario.criado_em
    };
  }
  static toDtoList(usuarios: Usuario[]): UserDto[] {
    return usuarios.map(usuario => this.toDto(usuario));
  }
}