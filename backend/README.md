# DevPlanner - Backend API

API REST para gerenciamento de tarefas do DevPlanner.

## Tecnologias

- Node.js
- Express.js
- CORS

## Estrutura do Projeto

```
backend/
├── server.js                 # Servidor Express
├── routes/
│   └── task.routes.js       # Rotas da API
├── controllers/
│   └── task.controller.js   # Lógica de negócio
├── repositories/
│   └── task.repository.js   # Camada de dados (in-memory)
└── package.json
```

## Instalação

```bash
cd backend
npm install
```

## Como Executar

### Modo Desenvolvimento (com nodemon)
```bash
npm run dev
```

### Modo Produção
```bash
npm start
```

O servidor estará disponível em: `http://localhost:1919`

## Endpoints da API

### Health Check
- **GET** `/api/health`
  - Verifica se a API está funcionando

### Tasks

#### Listar todas as tarefas
- **GET** `/api/tasks`
- Resposta: Array de tasks

#### Listar tarefas por projeto
- **GET** `/api/tasks/project/:projectId`
- Parâmetros: `projectId` (string)
- Resposta: Array de tasks do projeto

#### Buscar tarefa por ID
- **GET** `/api/tasks/:id`
- Parâmetros: `id` (string)
- Resposta: Task object

#### Criar nova tarefa
- **POST** `/api/tasks`
- Body (JSON):
```json
{
  "projectId": "p1",
  "title": "Título da tarefa",
  "description": "Descrição opcional",
  "status": "BACKLOG",
  "priority": "MEDIA",
  "dueDate": "2025-12-31"
}
```
- Campos obrigatórios: `projectId`, `title`, `status`, `priority`
- Resposta: Task criada

#### Atualizar tarefa
- **PUT** `/api/tasks/:id`
- Parâmetros: `id` (string)
- Body (JSON): Campos a serem atualizados
```json
{
  "title": "Novo título",
  "status": "DEV",
  "priority": "ALTA"
}
```
- Resposta: Task atualizada

#### Deletar tarefa
- **DELETE** `/api/tasks/:id`
- Parâmetros: `id` (string)
- Resposta:
```json
{
  "message": "Task deleted successfully",
  "id": "t1"
}
```

## Modelo de Dados

### Task
```typescript
{
  id: string;              // Gerado automaticamente (UUID)
  projectId: string;       // ID do projeto
  title: string;           // Título da tarefa
  description?: string;    // Descrição (opcional)
  status: TaskStatus;      // BACKLOG | DEV | VALIDACAO | FINALIZADO
  priority: TaskPriority;  // BAIXA | MEDIA | ALTA
  dueDate?: string;        // Data de vencimento (ISO string, opcional)
  createdAt: string;       // Data de criação (ISO string)
  completedAt?: string;    // Data de conclusão (ISO string, opcional)
}
```

## Notas

- Os dados são armazenados em memória (serão perdidos ao reiniciar o servidor)
- Para persistência, considere integrar com MongoDB, PostgreSQL ou outro banco de dados
- O campo `completedAt` é automaticamente preenchido quando o status muda para "FINALIZADO"
