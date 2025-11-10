# Como Executar o DevPlanner (Frontend + Backend)

## Pré-requisitos

- Node.js instalado (versão 18 ou superior)
- npm ou yarn

## Passo 1: Instalar Dependências

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
# Na raiz do projeto
npm install
```

## Passo 2: Executar a Aplicação

Você precisa executar o backend e o frontend em terminais separados.

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

O backend estará rodando em: `http://localhost:3000`

### Terminal 2 - Frontend
```bash
# Na raiz do projeto
npm start
```

O frontend estará rodando em: `http://localhost:4200`

## Como Funciona

1. O frontend Angular roda na porta 4200
2. O backend Node.js/Express roda na porta 3000
3. O proxy configurado no Angular redireciona chamadas `/api` para `http://localhost:3000`
4. Acesse `http://localhost:4200` no navegador para usar a aplicação

## Estrutura da API

### Endpoints Disponíveis

- `GET /api/tasks` - Lista todas as tarefas
- `GET /api/tasks/:id` - Busca tarefa por ID
- `GET /api/tasks/project/:projectId` - Lista tarefas de um projeto
- `POST /api/tasks` - Cria nova tarefa
- `PUT /api/tasks/:id` - Atualiza tarefa
- `DELETE /api/tasks/:id` - Deleta tarefa

### Exemplo de Uso

#### Criar uma nova tarefa (via API)
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "p1",
    "title": "Nova tarefa",
    "description": "Descrição da tarefa",
    "status": "BACKLOG",
    "priority": "MEDIA"
  }'
```

## CRUD no Frontend

O componente `TaskPageComponent` já possui os seguintes métodos:

- `createTask(taskData)` - Criar nova tarefa
- `updateTaskData(id, updates)` - Atualizar tarefa
- `deleteTask(id)` - Deletar tarefa
- `onDrop(event, status)` - Atualizar status via drag & drop

## Arquitetura

```
Frontend (Angular)
    ↓ HTTP Request (/api/*)
Proxy Config (proxy.conf.json)
    ↓ Redirect to
Backend (Express - localhost:3000)
    ↓
Controllers
    ↓
Repositories (In-Memory)
```

## Próximos Passos

Para produção, considere:

1. Adicionar autenticação (JWT)
2. Conectar a um banco de dados real (MongoDB, PostgreSQL)
3. Adicionar validações mais robustas
4. Implementar tratamento de erros centralizado
5. Adicionar testes unitários e de integração
