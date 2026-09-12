import { DataSource, Repository } from "typeorm";
import { Usuario, UsuarioRole } from "../entities/User";

export class UsuarioRepository {
  private ormRepository: Repository<Usuario>;
  constructor(dataSource: DataSource) {
    this.ormRepository = dataSource.getRepository(Usuario);
  }

  async create(nome: string, email: string, role: UsuarioRole, senhaHash: string): Promise<Usuario> {
    const usuario = this.ormRepository.create({
        nome,
        email,
        senha: senhaHash,
        role: role
    })
    
    return await this.ormRepository.save(usuario);
  }

  async findById(id: string): Promise<Usuario | null> {
    return await this.ormRepository.findOneBy({ id: id });
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return await this.ormRepository.findOneBy({ email: email });
  }
}