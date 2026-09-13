# MedClinic-API

Este mini-projeto tem como objetivo construir uma base de uma API para uma cínica médica iniciando com a etapa de criação e validação de usuários: identificar quem está fazendo a requisição (autenticação) e verificar o que essa pessoa está autorizada a fazer (autorização). A autenticação e a autorização são príncipios que sustentam a segurança de praticamente todo sistema que expõe dados sensíveis, como é o caso desta aplicação.

O objetivo desta etapa do projeto é consolidar os conhecimentos de configuração de projeto, arquitetura em camadas, modelagem de entidades com TypeORM, autenticação via JWT, autorização baseada em perfis (RBAC) e criptografia de dados, preparando uma base de código organizada e segura sobre a qual as próximas funcionalidades serão construídas.

O projeto completo, que incluirá o gerenciamento de especialidades, médicos, pacientes e consultas, será solicitado em um projeto futuro, utilizando como alicerce a estrutura desenvolvida nesta etapa.

## Tecnologias utilizadas
*   **Node.js & TypeScript:** Ambiente de execução assíncrono acoplado à tipagem estática para maior robustez e manutenibilidade.
*   **Express:** Framework minimalista para gerenciamento de rotas, middlewares e ciclo de requisição/resposta HTTP.
*   **PostgreSQL:** Banco de dados relacional para persistência de dados.
*   **TypeORM & Reflect-Metadata:** Object-Relational Mapping (ORM) baseado no padrão Data Mapper e decorators para modelagem de entidades e sincronização de schema.
*   **pg (node-postgres):** Driver de comunicação de baixo nível entre o Node.js e o PostgreSQL.
*   **bcrypt:** Algoritmo criptográfico utilizado para hashing seguro de senhas com geração de salt.
*   **jsonwebtoken (JWT):** Implementação de autenticação stateless via tokens assinados digitalmente.
*   **class-validator & class-transformer:** Validação declarativa de esquemas de entrada (DTOs) via decorators no payload HTTP.
*   **cors:** Middleware para configuração e liberação segura de Cross-Origin Resource Sharing.
*   **dotenv:** Isolamento e carregamento de configurações sensíveis a partir de variáveis de ambiente.
*   **tsx:** Compilador e executor TypeScript em memória com suporte a hot-reload para ambiente de desenvolvimento.


## Arquitetura e Estrutura de Diretórios

O projeto adota uma arquitetura em camadas orientada à separação de responsabilidades (SoC) com inversão de controle via Injeção de Dependências manual.

```text
medclinic-api/
├── src/
│   ├── controllers/      # Recepção de requisições, orquestração de I/O e respostas HTTP
│   ├── database/         # Configuração e inicialização da instância DataSource do TypeORM
│   ├── dtos/             # Data Transfer Objects com regras de validação (class-validator)
│   ├── entities/         # Modelagem das tabelas do banco de dados via decorators TypeORM
│   ├── mappers/          # Transformação de Entidades em DTOs seguros (sanitização de dados)
│   ├── middlewares/      # Interceptadores (autenticação JWT, controle RBAC, erro global)
│   ├── repositories/     # Abstração de queries e persistência via TypeORM
│   ├── routes/           # Mapeamento e agrupamento das rotas da API
│   ├── services/         # Regras de negócio, validações lógicas e criptografia
│   ├── types/            # Declarações de tipos globais, extensões de interfaces e erros customizados
│   ├── utils/            # Módulos utilitários (geração de hash, emissão e validação JWT)
│   ├── app.ts            # Configuração do Express, middlewares globais e rotas
│   └── server.ts         # Ponto de entrada: inicialização do DataSource e bootstrap do servidor
├── .env.example          # Template das variáveis de ambiente necessárias
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```
### Fluxo de Dados e Camadas

* **Controller:** Extrai os dados das requisições (req.body, req.params), delega o processamento ao Service e retorna os códigos de status adequados (200, 201, etc.).

* **Service**: Camada central de regras de negócio. Valida integridade operacional (duplicidade de e-mail, compatibilidade de senhas), orquestra o hashing e recebe/devolve dados sanitizados.

* **Repository**: Encapsula operações de banco de dados via TypeORM. Retorna exclusivamente instâncias puras de Entity, sem acoplamento com a camada visual ou de transporte.

* **Mapper**: Converte a Entity retornada pelo repositório em um DTO de saída. Garante que campos confidenciais (como senhas em hash) nunca vazem para o cliente.

* **Injeção de Dependência**: As dependências são instanciadas e repassadas via construtores (Controller -> Service -> Repository -> DataSource), eliminando acoplamentos rígidos e facilitando testes unitários.

* **Error Handling Centralizado**: Falhas operacionais disparam instâncias de AppError. O middleware de erro global captura essas exceções via next(err) e formata uma resposta amigável sem interromper a execução do Node.js.

### Variáveis de ambiente

* Crie um arquivo .env na raiz da aplicação tomando como base o arquivo .env.example:
```
# Porta do Servidor
PORT=numero_da_porta

# Conexão com o PostgreSQL
DB_HOST=localhost
DB_PORT=numero_da_porta
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=medclinic_db

# Configuração de Autenticação JWT
JWT_SECRET=sua_chave_secreta_super_segura
JWT_EXPIRES_IN=1d
```
### Instalação e Execução

#### Pré-requisitos:
* Node.js (versão 18.x ou superior recomendada)

* Instância do PostgreSQL ativa com uma base de dados criada conforme configurado no .env

1. Clone o repositório:
  
  ```
  git clone [https://github.com/lucasfnandos/MedClinic-API.git](https://github.com/lucasfnandos/MedClinic-API.git)
  cd MedClinic-API 
  ```
2. Instale as dependências:
  
  ```
  npm install
  ```
3. Configure as variáveis de ambiente:
  
  ```
  cp .env.example .env
  Preencha os dados do seu banco de dados no arquivo .env
  ```
4. Inicie em modo de desenvolvimento:
  ```
  npm run dev
  ```

### Perfis de Acesso (RBAC)
A aplicação conta com um modelo de autorização baseado em papéis (Role-Based Access Control):

* ATENDENTE: Perfil padrão de operador. Caso a propriedade role não seja explicitada no corpo da requisição durante o cadastro, o usuário assumirá este perfil automaticamente.

* ADMIN: Perfil administrativo com privilégios elevados, necessário para a visualização da listagem de todos os colaboradores do sistema.

## Documentação dos Endpoints

1. Autenticação
#### ```POST /auth/login```
* Autentica um usuário existente e emite o token JWT.
#### Corpo da requisição (JSON):
```
{
  "email": "usuario@medclinic.com",
  "senha": "senhaSegura123"
}
```
#### Respostas:
* ```200 OK```: Login efetuado com sucesso.
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "7c1e5509-f191-4702-861f-366a7b7a44f2",
    "nome": "Nome Sobrenome",
    "email": "usuario@medclinic.com",
    "role": "ATENDENTE",
    "criado_em": "2026-09-13T20:00:00.000Z"
  }
}
```
* ```401 Unauthorized```: Credenciais incorretas ou inexistentes.

2. Usuários
#### ```POST /users/register```

* Cadastra um novo usuário no banco de dados.

#### Corpo da Requisição (JSON):
```
{
  "nome": "Nome Sobrenome",
  "email": "usuario@medclinic.com",
  "senhaAberta": "senhaSegura123",
  "role": "ADMIN" 
}
```
*Nota: A propriedade role é opcional. Caso omitida, o registro assumirá "ATENDENTE" por padrão.*

#### Respostas:
* ```201 Created```: Usuário criado com sucesso (retorna o UsuarioDto sanitizado, sem campo de senha).

* ```400 Bad Request```: Falha de validação estrutural do corpo (ex: senha menor que 6 dígitos ou e-mail inválido).

#### ```GET /users/me```

Retorna as informações de perfil do usuário logado baseado no token de requisição.

#### Headers:

* ```Authorization: Bearer <token_jwt>```

#### Respostas:

* ```200 OK:``` Perfil recuperado.

* ```401 Unauthorized```: Token ausente, inválido ou expirado.

#### ```GET /users/listall```

Lista todos os usuários registrados no sistema. **Exige permissão de Administrador**.

#### Headers:

* ```Authorization: Bearer <token_jwt>```

#### Respostas:

* ```200 OK```: Lista contendo todos os usuários cadastrados.

* ```401 Unauthorized```: Token não fornecido ou inválido.

* ```403 Forbidden```: Usuário autenticado, mas com permissão insuficiente (perfil não é ADMIN).
