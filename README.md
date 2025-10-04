# 🚀 NGXP Full-Stack Starter Kit

**Stack completa Angular + Node.js + Express + PostgreSQL para desenvolvimento moderno**

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Docker & Docker Compose
- Git

## 🚀 Quick Start

### 1. Configuração Inicial

```bash
# Clone o repositório
git clone <repo-url>
cd monorepo-ngxp-boilerplate

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

### 2. Desenvolvimento

```bash
# Inicie o banco de dados
docker-compose up -d db

# Execute as migrações (quando disponível)
# npm run db:migrate

# Inicie o ambiente de desenvolvimento
npm run dev
```

Isso iniciará:

- �️ **Frontend Angular** em `http://localhost:4200`
- 🟢 **API Backend** em `http://localhost:3000`

### 3. Stack Completa com Observabilidade

```bash
# Inicie todos os serviços
docker-compose up -d

# Acesse os serviços:
# Frontend: http://localhost:4200
# API: http://localhost:3000
# Swagger Docs: http://localhost:3000/api-docs
# PgAdmin: http://localhost:5050
# Grafana: http://localhost:3001
# Jaeger: http://localhost:16686
# Prometheus: http://localhost:9090
```

## 🛠️ Comandos Disponíveis

### Desenvolvimento

```bash
npm run dev              # Frontend + Backend
npm run dev:api          # Apenas API  
npm run dev:web          # Apenas Frontend
npm run build            # Build completo
npm run start            # Start produção
```

### Testes

```bash
npm run test             # Todos os testes
npm run test:api         # Testes da API
npm run test:web         # Testes do frontend
npm run test:watch       # Modo watch
```

### Qualidade de Código

```bash
npm run lint             # Verificar problemas
npm run lint:fix         # Corrigir automaticamente
npm run audit:security   # Verificar vulnerabilidades
```

### Database (quando implementado)

```bash
npm run db:migrate       # Executar migrações
npm run db:seed          # Popular dados de teste
npm run db:reset         # Reset completo
```

### Docker

```bash
docker-compose up -d     # Iniciar todos os serviços
docker-compose down      # Parar todos os serviços
docker-compose logs api  # Ver logs da API
docker-compose logs web  # Ver logs do frontend
```

## 📁 Estrutura do Projeto

```
📦 monorepo-ngxp-starter/
├── 📁 apps/
│   ├── 📁 api/              # Backend Node.js + Express + TypeScript
│   │   ├── 📁 src/
│   │   │   ├── 📁 controllers/   # Controladores da API
│   │   │   ├── 📁 services/      # Lógica de negócio
│   │   │   ├── 📁 middleware/    # Middlewares Express
│   │   │   ├── 📁 validators/    # Validação de dados
│   │   │   └── server.ts         # Configuração do servidor
│   │   └── package.json
│   └── 📁 web/              # Frontend Angular
│       ├── 📁 src/
│       │   ├── 📁 app/           # Componentes Angular
│       │   ├── 📁 environments/  # Configurações de ambiente
│       │   └── main.ts           # Bootstrap da aplicação
│       └── package.json
├── 📁 libs/                 # Bibliotecas compartilhadas
│   ├── 📁 config/              # Configurações
│   ├── 📁 database/            # ORM e entidades
│   └── 📁 logger/              # Sistema de logs
├── 📁 docs/                 # Documentação
├── docker-compose.yml       # Stack completa
└── package.json            # Configuração do monorepo
```

## 🧪 Funcionalidades Implementadas

### ✅ Backend (API)

- [x] Servidor Express com TypeScript
- [x] Documentação Swagger/OpenAPI automática
- [x] Validação de dados com Joi
- [x] Sistema de logs estruturados
- [x] Middleware de tratamento de erros
- [x] Health check endpoint
- [x] Configuração flexível por variáveis de ambiente
- [x] Testes unitários com Jest
- [x] Hot reload para desenvolvimento

### ✅ Frontend (Angular)

- [x] Angular 20 com TypeScript
- [x] Configuração de build otimizada
- [x] Testes unitários com Jasmine/Karma
- [x] Hot reload para desenvolvimento
- [x] Configuração de ambientes
- [x] ESLint configurado

### ✅ Database & ORM

- [x] PostgreSQL como banco principal
- [x] Sequelize ORM com TypeScript
- [x] Entidades User e Role configuradas
- [x] Migrações automáticas (em implementação)

### ✅ Observabilidade

- [x] Logs estruturados com Pino
- [x] Métricas com Prometheus
- [x] Tracing distribuído com Jaeger
- [x] Dashboards com Grafana
- [x] Agregação de logs com Loki

### ✅ DevOps & Infraestrutura

- [x] Containerização completa com Docker
- [x] Docker Compose para desenvolvimento
- [x] Configuração de ambiente flexível
- [x] Scripts automatizados

## 🚧 Em Desenvolvimento

### Próximas Funcionalidades

- [ ] 🔐 Sistema de autenticação JWT
- [ ] 📝 CRUD completo para usuários
- [ ] 🔄 Comunicação Frontend-Backend integrada
- [ ] 🧪 Testes de integração end-to-end
- [ ] 🎨 Componentes UI mais robustos
- [ ] 📊 Dashboard administrativo
- [ ] 🔍 Sistema de busca e filtros
- [ ] 📈 Métricas de negócio

## 🐳 DevContainer (Recomendado)

Este projeto inclui uma configuração completa de **DevContainer** para
desenvolvimento isolado:

### ✅ **Extensões VSCode Incluídas**

- **GitHub Copilot** + Chat
- **Angular Language Service**
- **ESLint** + Prettier
- **GitLens** + Git Graph
- **Thunder Client** (teste de APIs)
- **Docker** + PostgreSQL tools
- **Muitas outras...**

### 🚀 **Configuração Rápida**

1. **Instale as extensões necessárias:**

   - [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
   - [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)

2. **Abra o projeto no DevContainer:**

   ```bash
   # Clone o repositório
   git clone <repository-url>
   cd monorepo-ngxp-boilerplate

   # Abra no VSCode
   code .

   # VSCode irá detectar o DevContainer e perguntar se quer reabrir no container
   # Ou use: Ctrl+Shift+P -> "Dev Containers: Reopen in Container"
   ```

3. **Aguarde a configuração automática** (primeira vez pode demorar alguns
   minutos)

4. **Pronto!** Ambiente totalmente configurado com:
   - Node.js 20, npm, Angular CLI
   - Todas as extensões instaladas
   - Aliases úteis configurados
   - Dependências instaladas
   - Swagger gerado automaticamente

### 🔧 **Aliases Úteis (no DevContainer)**

```bash
# Navegação
api      # cd apps/api
web      # cd apps/web
root     # cd /workspace

# npm shortcuts
ni       # npm install
nr       # npm run
nrd      # npm run dev
nrb      # npm run build

# Docker
dc       # docker-compose
dcu      # docker-compose up
dcd      # docker-compose down

# Git
gs       # git status
ga       # git add
gc       # git commit
gp       # git push

# Funções especiais
swagger  # Regenera documentação Swagger
dev      # Inicia servidores de desenvolvimento
```

## 💻 Desenvolvimento Local (sem DevContainer)

### Pré-requisitos

- **Node.js** 20.x ou superior
- **npm** 10.x ou superior
- **Docker** e **Docker Compose** (para banco)

### Instalação

```bash
# Clone e configure
git clone <repository-url>
cd monorepo-ngxp-boilerplate
chmod +x setup.sh
./setup.sh

# Ou manualmente:
npm install
npm run build:swagger -w api
```

## 📁 Estrutura do Projeto

```
monorepo-app/
├── apps/
│   ├── api/                    # Express API com TSOA
│   │   ├── src/
│   │   │   ├── controllers/    # Controllers com decorators TSOA
│   │   │   ├── models/         # Modelos de dados
│   │   │   ├── routes/         # (Deprecated - TSOA gera automaticamente)
│   │   │   └── server.ts       # Servidor principal
│   │   ├── build/              # Arquivos gerados pelo TSOA
│   │   │   ├── routes.ts       # Rotas auto-geradas
│   │   │   └── swagger.json    # Swagger auto-gerado
│   │   └── tsoa.json          # Configuração do TSOA
│   └── web/                   # Angular Web App
├── docker-compose.yml         # Docker Compose
├── eslint.config.mjs         # ESLint moderno
├── .prettierrc.json          # Configuração do Prettier
└── package.json              # Workspaces npm
```

## � Scripts e Comandos Disponíveis

Este projeto possui scripts otimizados para uma experiência de desenvolvimento
superior. Todos os comandos incluem feedback visual e verbosidade adequada para
debugging.

### 🏗️ Build e Compilação

```bash
# Build completo do projeto (API + Web)
npm run build

# Build apenas da API com feedback detalhado
npm run build:api

# Build apenas do frontend Angular
npm run build:web

# Build para produção (otimizado)
npm run build:prod

# Gerar documentação Swagger da API
npm run build:swagger

# Limpar todos os arquivos gerados
npm run clean
```

### 🚀 Desenvolvimento e Execução

```bash
# Iniciar todos os servidores em modo desenvolvimento
npm run dev

# Iniciar apenas a API em modo desenvolvimento
npm run dev:api

# Iniciar apenas o frontend Angular
npm run dev:web

# Executar API em modo de produção
npm run start

# Servir build de produção do Angular
npm run serve:dist

# Executar em modo debug (com inspect)
npm run dev:debug
```

## 🛠️ Instalação e Configuração

### Pré-requisitos

- **Node.js** 20.x ou superior
- **npm** 11.x ou superior (atualizado)
- **Docker** e **Docker Compose** (opcional, para DevContainer)
- **Git** para controle de versão

### 🚀 Instalação Rápida

```bash
# 1. Clone o repositório
git clone <repository-url>
cd monorepo-ngxp-boilerplate

# 2. Execute o script de configuração automática
chmod +x setup.sh
./setup.sh

# 3. Ou configure manualmente:
npm install
npm run build:swagger
npm run dev
```

### 🐳 Configuração com DevContainer (Recomendado)

O DevContainer oferece um ambiente isolado e consistente para desenvolvimento:

1. **Instale as extensões necessárias no VS Code:**

   - [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
   - [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)

2. **Abra o projeto:**

   ```bash
   code .
   # VS Code detectará o DevContainer automaticamente
   # Selecione "Reopen in Container" quando solicitado
   ```

3. **Aguarde a configuração (primeira vez pode demorar)**

4. **Pronto!** Ambiente completo com todas as dependências instaladas.

### 🏃‍♂️ Iniciando o Desenvolvimento

```bash
# Iniciar ambos os servidores (API + Frontend)
npm run dev

# Acessar as aplicações:
# - Frontend: http://localhost:4200
# - API: http://localhost:3000
# - Swagger: http://localhost:3000/api-docs
```

### 🔧 Configuração Manual Detalhada

Se preferir configurar manualmente:

```bash
# 1. Instalar dependências
npm install

# 2. Gerar documentação Swagger
npm run build:swagger

# 3. Verificar se tudo está funcionando
npm run lint
npm run build
npm run test

# 4. Iniciar desenvolvimento
npm run dev
```

#### � Linting e Formatação

```bash
# Executar linting em todo o projeto
npm run lint

# Corrigir automaticamente problemas de linting
npm run lint:fix

# Executar linting apenas na API
npm run lint:api

# Executar linting apenas no frontend
npm run lint:web

# Formatar código com Prettier
npm run format
```

## 🏗️ Estrutura do Projeto Detalhada

```
monorepo-ngxp-boilerplate/
├── 📁 apps/                          # Aplicações do monorepo
│   ├── 📁 api/                       # API Node.js + Express + TSOA
│   │   ├── 📁 src/
│   │   │   ├── 📁 controllers/       # Controllers com decorators TSOA
│   │   │   │   ├── hello.controller.ts
│   │   │   │   └── hello.controller.test.ts
│   │   │   ├── 📁 models/            # Modelos de dados TypeScript
│   │   │   ├── 📁 routes/            # Rotas (auto-geradas pelo TSOA)
│   │   │   ├── 📁 swagger/           # Documentação Swagger gerada
│   │   │   ├── 📁 test/              # Configuração de testes
│   │   │   ├── app.ts                # Configuração do Express
│   │   │   └── server.ts             # Servidor principal
│   │   ├── 📄 package.json           # Dependências e scripts da API
│   │   ├── 📄 tsconfig.json          # Configuração TypeScript
│   │   ├── 📄 tsoa.json              # Configuração TSOA
│   │   ├── 📄 jest.config.js         # Configuração Jest
│   │   └── 📄 eslint.config.mjs      # ESLint específico da API
│   └── 📁 web/                       # Frontend Angular
│       ├── 📁 src/
│       │   ├── 📁 app/               # Módulos e componentes Angular
│       │   │   ├── app.component.ts
│       │   │   └── app.module.ts
│       │   ├── 📁 assets/            # Recursos estáticos
│       │   ├── 📁 environments/      # Configurações de ambiente
│       │   ├── index.html            # Página principal
│       │   ├── main.ts               # Bootstrap da aplicação
│       │   ├── polyfills.ts          # Polyfills para compatibilidade
│       │   └── styles.css            # Estilos globais
│       ├── 📄 package.json           # Dependências e scripts do Angular
│       ├── 📄 angular.json           # Configuração Angular CLI
│       ├── 📄 tsconfig.json          # TypeScript base
│       ├── 📄 tsconfig.app.json      # TypeScript para aplicação
│       └── 📄 eslint.config.mjs      # ESLint específico do Angular
├── 📁 docs/                          # Documentação
├── � scripts/                       # Scripts utilitários
├── 📄 package.json                   # Configuração do workspace raiz
├── 📄 eslint.config.mjs              # ESLint global
├── 📄 docker-compose.yml             # Docker Compose para produção
├── 📄 docker-compose.dev.yml         # Docker Compose para desenvolvimento
├── 📄 setup.sh                       # Script de configuração automática
└── 📄 README.md                      # Este arquivo
```

## 🔧 Configurações e Personalizações

### ESLint e Prettier

O projeto utiliza configurações modernas de ESLint (v9) com:

- **Flat config** (eslint.config.mjs)
- **TypeScript** support nativo
- **Angular** rules específicas
- **Prettier** integração
- **Import/export** validation
- **Security** rules

### TypeScript

Configurações otimizadas para:

- **Strict mode** habilitado
- **Path mapping** configurado
- **Decorators** suporte (TSOA)
- **Angular** compatibility
- **Jest** integration

### TSOA (Swagger)

- **Decorators** para definição de rotas
- **Swagger UI** auto-gerado
- **TypeScript** validation
- **OpenAPI 3.0** specification
- **Model** generation

## 🐛 Troubleshooting

### Problemas Comuns e Soluções

#### 🔴 Erro "Cannot find module" ou dependências

```bash
# Limpar cache e reinstalar
npm run clean
rm -rf node_modules apps/*/node_modules
npm install

# Verificar se Swagger foi gerado
npm run build:swagger
```

#### 🔴 Problemas de linting

```bash
# Corrigir automaticamente
npm run lint:fix

# Se ainda houver problemas, verificar configuração
npx eslint --debug apps/api/src/
```

#### 🔴 Build falhando

```bash
# Verificar se todas as dependências estão instaladas
npm install

# Build incremental
npm run build:api
npm run build:web
```

#### 🔴 Testes falhando

```bash
# Limpar cache de testes
npm run test -- --clearCache

# Executar testes com verbose
npm run test -- --verbose
```

#### 🔴 DevContainer não iniciando

1. Verificar se Docker está executando
2. Rebuild do container: `Dev Containers: Rebuild Container`
3. Verificar logs do Docker
4. Tentar com `Dev Containers: Rebuild Without Cache`

#### 🔴 Portas já em uso

```bash
# Verificar processos usando as portas
lsof -i :3000  # API
lsof -i :4200  # Angular

# Matar processos se necessário
kill -9 <PID>
```

### 💡 Dicas de Performance

1. **Use npm workspaces** para comandos específicos:

   ```bash
   npm run dev -w api    # Apenas API
   npm run build -w web  # Apenas frontend
   ```

2. **DevContainer** para ambiente consistente entre desenvolvedores

3. **Hot reload** configurado para desenvolvimento rápido

4. **Incremental builds** para TypeScript

### 🔍 Debug e Logs

```bash
# Logs detalhados da API
npm run dev:debug

# Logs do Angular com verbosidade
npm run dev:web -- --verbose

# Verificar status dos serviços
npm run logs
```

## 🧪 Execução de Testes

```bash
# Executar todos os testes do projeto
npm run test

# Executar testes apenas da API
npm run test:api

# Executar testes apenas do frontend
npm run test:web
# No DevContainer o Google Chrome já está instalado e a variável
# de ambiente `CHROME_BIN` é configurada automaticamente para
# permitir a execução de testes headless.

# Executar testes com coverage detalhado
npm run test:coverage

# Executar testes em modo watch (desenvolvimento)
npm run test:watch
```

### 🔧 Utilitários e Manutenção

```bash
# Verificar vulnerabilidades de segurança
npm run audit

# Corrigir vulnerabilidades automaticamente
npm run audit:fix

# Instalar dependências em todos os workspaces
npm run install:all

# Verificar versões desatualizadas
npm run outdated

# Visualizar logs dos serviços
npm run logs
```

## 📊 API Endpoints e Documentação

### Base URL: `http://localhost:3000`

A API oferece os seguintes endpoints principais:

- **GET** `/health` - Health check do serviço
- **GET** `/hello` - Retorna "Hello World" com timestamp
- **GET** `/hello/{name}` - Retorna saudação personalizada
- **GET** `/api-docs` - Documentação Swagger UI interativa

### Exemplo de Resposta da API

```json
{
  "message": "Hello World",
  "timestamp": "2025-01-22T12:00:00.000Z"
}
```

## 📝 TSOA - Documentação Automática

Este projeto utiliza **TSOA** para gerar automaticamente:

- ✅ Rotas Express baseadas em decorators TypeScript
- ✅ Documentação Swagger/OpenAPI 3.0
- ✅ Validação de tipos em runtime
- ✅ Modelos de dados consistentes entre API e documentação

### Como adicionar novos endpoints

1. Crie um controller em `apps/api/src/controllers/`
2. Use decorators TSOA (`@Route`, `@Get`, `@Post`, etc.)
3. Execute `npm run build:swagger`
4. As rotas e documentação são geradas automaticamente!

### Exemplo de Controller

```typescript
import { Controller, Get, Route, Tags, Example } from 'tsoa';

@Route('users')
@Tags('Users')
export class UsersController extends Controller {
  @Get()
  @Example({ users: [{ id: 1, name: 'João Silva' }] })
  public async getUsers(): Promise<{ users: User[] }> {
    // Sua lógica de negócio aqui
    return { users: [] };
  }
}
```

## 🌐 URLs de Acesso Local

- **Frontend Angular**: <http://localhost:4200>
- **API Node.js**: <http://localhost:3000>
- **Documentação Swagger**: <http://localhost:3000/api-docs>
- **Health Check**: <http://localhost:3000/health>

## 📈 Monitoramento e Serviços Adicionais

O `docker-compose` agora provisiona serviços extras para observabilidade e fila/mensagem:

- **Redis** (cache): `localhost:6379`
- **RabbitMQ**: `localhost:5672` (UI em `http://localhost:15672`)
- **Prometheus**: <http://localhost:9090>
- **Grafana**: <http://localhost:3001>
- **Loki**: <http://localhost:3100>
- **Jaeger**: <http://localhost:16686>

Esses componentes permitem coleta de métricas, logs e traces distribuídos. Para
configurações avançadas consulte
[docs/OBSERVABILIDADE.md](docs/OBSERVABILIDADE.md).

### Nova seção na Interface Web

A aplicação Angular possui agora uma “Seção de Serviços” com cards que
direcionam para Grafana, Prometheus, Loki, Jaeger, Redis e RabbitMQ. Acesse
<http://localhost:4200> e role até a nova seção para abrir rapidamente cada
ferramenta.

## 🔒 Segurança e Boas Práticas

Este projeto implementa:

- ✅ **Headers de segurança** configurados automaticamente
- ✅ **CORS** habilitado e configurável
- ✅ **Validação de tipos** automática via TSOA
- ✅ **ESLint** com regras de segurança
- ✅ **Dependências** sempre atualizadas
- ✅ **Audit** automático de vulnerabilidades
- ✅ **TypeScript strict mode** habilitado

## 🤝 Contribuindo para o Projeto

1. **Fork** o projeto
2. **Clone** seu fork localmente
3. **Crie** uma branch para sua feature: `git checkout -b minha-feature`
4. **Desenvolva** sua funcionalidade
5. **Execute** os testes: `npm run test`
6. **Corrija** linting: `npm run lint:fix`
7. **Commit** suas mudanças: `git commit -m "feat: minha nova feature"`
8. **Push** para sua branch: `git push origin minha-feature`
9. **Abra** um Pull Request

### Padrões de Commit

Utilizamos [Conventional Commits](https://conventionalcommits.org/):

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `style:` formatação
- `refactor:` refatoração
- `test:` testes
- `chore:` manutenção

## 📄 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo LICENSE para
detalhes.

## 🆘 Suporte

- 📧 **Issues**: Use o GitHub Issues para reportar bugs
- 💬 **Discussões**: Use GitHub Discussions para perguntas
- 📚 **Wiki**: Documentação adicional no GitHub Wiki

---

> **Desenvolvido com ❤️ usando as melhores práticas de desenvolvimento moderno**
>
> _Este projeto é um boilerplate otimizado para desenvolvimento fullstack com
> TypeScript, Angular e Node.js_
