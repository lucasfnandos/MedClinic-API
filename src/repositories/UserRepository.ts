import { DataSource, Repository } from "typeorm";
import { Usuario, UsuarioRole } from "../entities/User";
import { CreateUserDto } from "../dtos/CreateUserDto";

export class UserRepository {
  private ormRepository: Repository<Usuario>;
  constructor(dataSource: DataSource) {
    this.ormRepository = dataSource.getRepository(Usuario);
  }

  async create(userInfo: CreateUserDto): Promise<Usuario> {
    const usuario = this.ormRepository.create(userInfo);
    
    return await this.ormRepository.save(usuario);
  }

  async findById(id: string): Promise<Usuario | null> {
    return await this.ormRepository.findOneBy({ id: id });
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return await this.ormRepository.findOneBy({ email: email });
  }
}