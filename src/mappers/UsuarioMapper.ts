import { Usuario } from "../entities/User";
import { UsuarioDto } from "../dtos/UsuarioDto";

export class UsuarioMapper {
  static toDto(usuario: Usuario): UsuarioDto {
    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      criado_em: usuario.criado_em
    };
  }
  static toDtoList(usuarios: Usuario[]): UsuarioDto[] {
    return usuarios.map(usuario => this.toDto(usuario));
  }
}