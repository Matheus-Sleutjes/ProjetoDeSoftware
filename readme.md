# Software Project

## 🛠 Tecnologias Utilizadas
- .NET 9
- Entity Framework Core
- PostgreSQL (Docker)

## 🚀 Estrutura do Projeto
O projeto está organizado em camadas, seguindo o padrão de separação de responsabilidades:

### 📂 `Software.Api`
Camada responsável por:
- Expor os endpoints da API.
- Configurar a injeção de dependências em `Configuration/DependencyConfig.cs`.

### 📂 `Software.Application`
Responsável pela lógica de negócio:
- `Contracts/`: Contém interfaces que definem os contratos de serviços.
- `Services/`: Implementação da lógica de negócios.

### 📂 `Software.Domain`
Contém as definições do domínio:
- `Models/`: Definição das entidades do sistema.
- `Dtos/`: Objetos de transferência de dados.
- `Enums/`: Enumerações utilizadas no sistema.

### 📂 `Software.Infrastructure`
Camada de acesso ao banco de dados:
- `Contracts/`: Interfaces de repositórios.
- `Repository/`: Implementações de repositórios usando Entity Framework Core.
- `Migrations/`: Arquivos de migração do banco de dados.
- `SoftwareContext.cs`: Configuração do contexto do banco de dados.

## 📦 Configuração do Banco de Dados (PostgreSQL via Docker)
Para subir o banco de dados localmente, execute o seguinte comando no terminal:
```sh
docker run --name db-software -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

## 🔧 Configuração de Injeção de Dependências
As injeções de dependência devem ser registradas no arquivo:
```sh
Software.Api/Configuration/DependencyConfig.cs
```

## 🛠 Gerenciando Migrations com Entity Framework Core
Para criar uma migration, execute o seguinte comando no projeto `Software.Infrastructure`:
```sh
dotnet ef migrations add Nome-Migration -p Software.Infrastructure -s Software.Api --context SoftwareContext
```
**Importante:** Sempre adicionar a entidade dentro de `SoftwareContext` para que o EF Core reconheça a mudança.

Para aplicar as migrations no banco, execute:
```sh
dotnet ef database update -p Software.Infrastructure -s Software.Api --context SoftwareContext
```

## 📜 Convenções do Projeto
- `Contracts`: Contém as interfaces para serviços e repositórios.
- `Services`: Responsável pela lógica de negócios.
- `Repository`: Implementa a conexão com o banco de dados usando Entity Framework Core.

## ▶️ Executando o Projeto
1. Suba o banco de dados (caso ainda não tenha feito).
2. Execute as migrations, se necessário:
   ```sh
   dotnet ef database update -p Software.Infrastructure -s Software.Api --context SoftwareContext
   ```
3. Inicie a API:
   ```sh
   dotnet run --project Software.Api
   ```

Agora sua API estará rodando e pronta para uso! 🚀
