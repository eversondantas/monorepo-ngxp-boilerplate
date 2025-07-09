# DevContainer Setup Guide

## 🐳 O que é um DevContainer?

Um **DevContainer** é um ambiente de desenvolvimento containerizado que garante que todos os desenvolvedores trabalhem com exatamente a mesma configuração, independentemente do sistema operacional local.

## ✅ Vantagens

- **Ambiente isolado**: Não interfere com seu sistema local
- **Configuração automática**: Todas as ferramentas já instaladas
- **Consistência**: Mesmo ambiente para toda a equipe
- **Extensões incluídas**: VSCode configurado automaticamente
- **Performance**: Otimizado para desenvolvimento

## 🚀 Como usar

### 1. Pré-requisitos

- **Docker Desktop** instalado e funcionando
- **VSCode** com extensão **Dev Containers**

### 2. Primeira execução

```bash
# Clone o projeto
git clone <repo-url>
cd monorepo-ngxp-boilerplate

# Abra no VSCode
code .

# VSCode detectará automaticamente o DevContainer
# Clique em "Reopen in Container" quando aparecer a notificação
```

### 3. Ou use o Command Palette

```
Ctrl+Shift+P (Cmd+Shift+P no Mac)
> Dev Containers: Reopen in Container
```

## 🔧 O que é configurado automaticamente

### **Ferramentas instaladas:**
- Node.js 20.x LTS
- npm, Angular CLI, TypeScript
- Git, GitHub CLI
- PostgreSQL Client
- Utilitários (curl, wget, jq, tree)

### **Extensões VSCode:**
- GitHub Copilot + Chat
- Angular Language Service  
- ESLint + Prettier
- GitLens + Git Graph
- Docker Tools
- Thunder Client (teste de APIs)
- Jest Test Runner
- PostgreSQL Explorer
- E muitas outras...

### **Configurações aplicadas:**
- Format on Save habilitado
- ESLint auto-fix
- Import organization automática
- Temas e ícones configurados
- Aliases úteis no terminal

## 📊 Portas expostas

| Porta | Serviço | URL |
|-------|---------|-----|
| 3000 | API Express | http://localhost:3000 |
| 4200 | Angular Dev | http://localhost:4200 |
| 5432 | PostgreSQL | localhost:5432 |
| 6379 | Redis | localhost:6379 |
| 5672 | RabbitMQ | localhost:5672 |
| 15672 | RabbitMQ UI | http://localhost:15672 |
| 9090 | Prometheus | http://localhost:9090 |
| 3001 | Grafana | http://localhost:3001 |
| 3100 | Loki | http://localhost:3100 |
| 16686 | Jaeger | http://localhost:16686 |
| 8080 | Adminer DB | http://localhost:8080 |

## 🔥 Aliases úteis (terminal)

```bash
# Navegação rápida
api      # cd apps/api
web      # cd apps/web
root     # cd /workspace

# npm shortcuts
ni       # npm install
nr       # npm run
nrd      # npm run dev
nrb      # npm run build

# Docker Compose
dc       # docker-compose
dcu      # docker-compose up
dcd      # docker-compose down

# Git shortcuts
gs       # git status
ga       # git add
gc       # git commit
gp       # git push

# Funções especiais
swagger  # Regenera Swagger automaticamente
dev      # Inicia ambos servidores
```

## 🧪 Comandos de desenvolvimento

```bash
# Instalar dependências
npm install

# Gerar Swagger
npm run build:swagger -w api

# Desenvolvimento
npm run dev -w api     # Só API
npm run start -w web   # Só Web
npm run dev           # Ambos

# Testes
npm run test -w api
npm run test -w web
# Chrome já vem instalado no DevContainer e a variável
# de ambiente CHROME_BIN está configurada automaticamente.

# Linting
npm run lint:fix

# Database (em background)
docker-compose -f docker-compose.dev.yml up -d
```

## 🔧 Personalizações

### Adicionar extensões
Edite `.devcontainer/devcontainer.json`:

```json
{
  "customizations": {
    "vscode": {
      "extensions": [
        "sua-nova-extensao"
      ]
    }
  }
}
```

### Modificar configurações
Edite `.devcontainer/devcontainer.json` na seção `settings`.

### Adicionar ferramentas
Modifique `.devcontainer/Dockerfile` para instalar novas ferramentas.

## 🚨 Troubleshooting

### DevContainer não inicia
1. Verifique se o Docker está rodando
2. Rebuild container: `Ctrl+Shift+P` > "Dev Containers: Rebuild Container"

### Portas ocupadas
1. Pare outros serviços locais nas portas 3000, 4200, 5432
2. Ou modifique as portas em `devcontainer.json`

### Performance lenta
1. Aumente memória do Docker Desktop
2. Use WSL 2 no Windows
3. Feche outros containers não utilizados

### Node modules não encontrados
```bash
# No terminal do container:
npm install
npm run build:swagger -w api
```

## 📱 Acesso remoto

O DevContainer também funciona com:
- **GitHub Codespaces**
- **GitPod**
- **Visual Studio Codespaces**

Apenas abra o repositório nessas plataformas e o ambiente será configurado automaticamente!

## 🎯 Próximos passos

1. ✅ DevContainer funcionando
2. 🚀 Execute `npm run dev`
3. 🌐 Acesse http://localhost:4200
4. 📚 Veja Swagger em http://localhost:3000/api-docs
5. 🎉 Comece a desenvolver!

---

**💡 Dica**: Use `Ctrl+Shift+P` > "Dev Containers: Show Log" para debug se algo não funcionar.
