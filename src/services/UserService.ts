import { UsuarioRepository } from "../repositories/User";
import { UsuarioMapper } from "../mappers/UsuarioMapper";
import { UsuarioRole } from "../entities/User";
import { hashPassword } from "../utils/hashPassword";
import { UsuarioDto } from "../dtos/UsuarioDto";

export class UsuarioService {
  constructor(private repo: UsuarioRepository) {}

  async criarUsuario(nome: string, email: string, role: UsuarioRole, senhaAberta: string): Promise<UsuarioDto | null> {
    const emailExiste = await this.repo.findByEmail(email);

    if(emailExiste) {
        throw new AppError('Email já cadastrado!', 409);
    }
    const senhaHash = await hashPassword(senhaAberta);
    const usuarioSalvo = await this.repo.create(nome, email, role, senhaHash);
    return UsuarioMapper.toDto(usuarioSalvo);
  }

  async listarUsuario(id: string): Promise<UsuarioDto | null> {
    const usuario = await this.repo.findById(id);
    if(!usuario) {
        throw new AppError('Usuario não encontrado', 400);
    }
    return UsuarioMapper.toDto(usuario);
  }
}