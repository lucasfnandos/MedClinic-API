import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from 'typeorm';

export enum UsuarioRole{
    ATENDENTE = "ATENDENTE",
    ADMINISTRADOR = "ADMIN"
}

@Entity("tb_usuarios")
export class Usuario{
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column("varchar")
    nome!: string

    @Column("varchar")
    email!: string

    @Column("varchar")
    senha!: string

    @Column({
        type: "enum",
        enum: UsuarioRole,
        default: UsuarioRole.ATENDENTE
    })
    role!: UsuarioRole

    @CreateDateColumn()
    criado_em!: Date
}