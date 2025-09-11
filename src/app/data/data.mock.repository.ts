import { Injectable } from "@angular/core";
import { Task } from "../models/model.task";

const seed: Task[] = [
    {
      id: 't1',
      projectId: 'p1',
      title: 'Criar wireframes da tela de login',
      description: 'Desenhar protótipo no Figma',
      status: 'BACKLOG',
      priority: 'MEDIA',
      dueDate: '2025-09-15',
      createdAt: '2025-09-01',
    },
    {
      id: 't2',
      projectId: 'p1',
      title: 'Configurar ambiente Angular',
      status: 'FINALIZADO',
      priority: 'ALTA',
      dueDate: '2025-09-12',
      createdAt: '2025-09-03',
    },
    {
      id: 't3',
      projectId: 'p1',
      title: 'Implementar autenticação básica',
      status: 'VALIDACAO',
      priority: 'ALTA',
      dueDate: '2025-09-10',
      createdAt: '2025-09-04',
    },
    {
      id: 't4',
      projectId: 'p1',
      title: 'Configurar CI/CD no GitHub Actions',
      status: 'FINALIZADO',
      priority: 'MEDIA',
      createdAt: '2025-08-28',
      completedAt: '2025-09-05',
    },
    {
      id: 't5',
      projectId: 'p1',
      title: 'Escrever documentação inicial do projeto',
      status: 'BACKLOG',
      priority: 'BAIXA',
      createdAt: '2025-09-07',
    },
    {
      id: 't6',
      projectId: 'p1',
      title: 'Criar serviço de API mock',
      status: 'DEV',
      priority: 'MEDIA',
      dueDate: '2025-09-14',
      createdAt: '2025-09-05',
    },
    {
      id: 't7',
      projectId: 'p1',
      title: 'Montar layout do Dashboard',
      status: 'VALIDACAO',
      priority: 'ALTA',
      dueDate: '2025-09-09',
      createdAt: '2025-09-02',
    },
    {
      id: 't8',
      projectId: 'p1',
      title: 'Integrar biblioteca de gráficos',
      status: 'FINALIZADO',
      priority: 'ALTA',
      createdAt: '2025-09-01',
      completedAt: '2025-09-08',
    },
    {
      id: 't9',
      projectId: 'p1',
      title: 'Criar componente de card de tarefa',
      status: 'DEV',
      priority: 'MEDIA',
      createdAt: '2025-09-06',
    },
    {
      id: 't10',
      projectId: 'p1',
      title: 'Refatorar estilos globais',
      status: 'BACKLOG',
      priority: 'BAIXA',
      createdAt: '2025-09-05',
    },
    {
      id: 't11',
      projectId: 'p1',
      title: 'Criar modal de detalhes da tarefa',
      status: 'DEV',
      priority: 'MEDIA',
      dueDate: '2025-09-16',
      createdAt: '2025-09-07',
    },
    {
      id: 't12',
      projectId: 'p1',
      title: 'Adicionar responsividade ao layout',
      status: 'VALIDACAO',
      priority: 'ALTA',
      createdAt: '2025-09-08',
      dueDate: '2025-09-11',
    },
    {
      id: 't13',
      projectId: 'p1',
      title: 'Implementar drag-and-drop no Kanban',
      status: 'BACKLOG',
      priority: 'ALTA',
      createdAt: '2025-09-09',
    },
    {
      id: 't14',
      projectId: 'p1',
      title: 'Criar página de calendário',
      status: 'DEV',
      priority: 'MEDIA',
      createdAt: '2025-09-06',
      dueDate: '2025-09-18',
    },
    {
      id: 't15',
      projectId: 'p1',
      title: 'Configurar ESLint e Prettier',
      status: 'FINALIZADO',
      priority: 'BAIXA',
      createdAt: '2025-09-01',
      completedAt: '2025-09-02',
    },
    {
      id: 't16',
      projectId: 'p1',
      title: 'Integrar autenticação com backend',
      status: 'BACKLOG',
      priority: 'ALTA',
      createdAt: '2025-09-10',
    },
    {
      id: 't17',
      projectId: 'p1',
      title: 'Testes unitários de componentes',
      status: 'DEV',
      priority: 'MEDIA',
      createdAt: '2025-09-08',
    },
    {
      id: 't18',
      projectId: 'p1',
      title: 'Testes end-to-end com Cypress',
      status: 'VALIDACAO',
      priority: 'MEDIA',
      createdAt: '2025-09-05',
      dueDate: '2025-09-13',
    },
    {
      id: 't19',
      projectId: 'p1',
      title: 'Deploy inicial no Vercel',
      status: 'FINALIZADO',
      priority: 'ALTA',
      createdAt: '2025-09-03',
      completedAt: '2025-09-06',
    },
    {
      id: 't20',
      projectId: 'p1',
      title: 'Criar tela de registro',
      status: 'BACKLOG',
      priority: 'MEDIA',
      createdAt: '2025-09-09',
    },
    {
      id: 't21',
      projectId: 'p2',
      title: 'Configurar autenticação com Firebase',
      status: 'DEV',
      priority: 'ALTA',
      dueDate: '2025-09-14',
      createdAt: '2025-09-05',
    },
    {
      id: 't22',
      projectId: 'p2',
      title: 'Criar tela de login no app',
      status: 'BACKLOG',
      priority: 'MEDIA',
      createdAt: '2025-09-06',
    },
    {
      id: 't23',
      projectId: 'p2',
      title: 'Implementar push notifications',
      status: 'BACKLOG',
      priority: 'ALTA',
      createdAt: '2025-09-07',
    },
    {
      id: 't24',
      projectId: 'p2',
      title: 'Publicar app no Google Play (beta)',
      status: 'VALIDACAO',
      priority: 'MEDIA',
      dueDate: '2025-09-20',
      createdAt: '2025-09-08',
    },
    {
      id: 't25',
      projectId: 'p2',
      title: 'Criar tela de configurações',
      status: 'DEV',
      priority: 'BAIXA',
      createdAt: '2025-09-09',
    },
    {
      id: 't26',
      projectId: 'p2',
      title: 'Integração com API de geolocalização',
      status: 'FINALIZADO',
      priority: 'ALTA',
      createdAt: '2025-09-01',
      completedAt: '2025-09-05',
    },
    {
      id: 't27',
      projectId: 'p2',
      title: 'Ajustar responsividade em tablets',
      status: 'VALIDACAO',
      priority: 'MEDIA',
      createdAt: '2025-09-03',
      dueDate: '2025-09-12',
    },
    {
      id: 't28',
      projectId: 'p2',
      title: 'Criar onboarding para novos usuários',
      status: 'BACKLOG',
      priority: 'BAIXA',
      createdAt: '2025-09-10',
    },
    {
      id: 't29',
      projectId: 'p3',
      title: 'Escrever introdução do trabalho',
      status: 'FINALIZADO',
      priority: 'BAIXA',
      createdAt: '2025-08-28',
      completedAt: '2025-09-02',
    },
    {
      id: 't30',
      projectId: 'p3',
      title: 'Revisar referencial teórico',
      status: 'DEV',
      priority: 'MEDIA',
      createdAt: '2025-09-04',
      dueDate: '2025-09-15',
    },
    {
      id: 't31',
      projectId: 'p3',
      title: 'Fazer pesquisa bibliográfica',
      status: 'BACKLOG',
      priority: 'ALTA',
      createdAt: '2025-09-05',
    },
    {
      id: 't32',
      projectId: 'p3',
      title: 'Escrever metodologia',
      status: 'DEV',
      priority: 'ALTA',
      createdAt: '2025-09-06',
    },
    {
      id: 't33',
      projectId: 'p3',
      title: 'Analisar resultados preliminares',
      status: 'VALIDACAO',
      priority: 'MEDIA',
      createdAt: '2025-09-07',
      dueDate: '2025-09-13',
    },
    {
      id: 't34',
      projectId: 'p3',
      title: 'Finalizar conclusão do trabalho',
      status: 'BACKLOG',
      priority: 'ALTA',
      createdAt: '2025-09-09',
    },
    {
      id: 't35',
      projectId: 'p3',
      title: 'Preparar apresentação em slides',
      status: 'DEV',
      priority: 'MEDIA',
      createdAt: '2025-09-10',
      dueDate: '2025-09-18',
    },
    {
      id: 't36',
      projectId: 'p3',
      title: 'Revisar normas da ABNT',
      status: 'FINALIZADO',
      priority: 'BAIXA',
      createdAt: '2025-09-01',
      completedAt: '2025-09-08',
    },
];

function iso(setDay = 0) {
    const d = new Date();
    d.setDate(d.getDate() + setDay);

    return d.toISOString().slice(0, 10);
}

@Injectable({ providedIn: 'root'})
export class TaskMock {
    private k = 'fake_key'

    private readTasks(): Task[] {
        return JSON.parse(localStorage.getItem(this.k) ?? 'null') ?? seed;
    }

    private writeTasks(list: Task[]) {
        localStorage.setItem(this.k, JSON.stringify(list));
    }

    async listAll(): Promise<Task[]> {
        return this.readTasks();
    }

    async listByProject(projectId: string): Promise<Task[]> {
        return this.readTasks().filter((t) => t.projectId === projectId);
    }

    async createTask(task: Task) {
        const list = this.readTasks();
        list.push(task);
        this.writeTasks(list);
    }

    async updateTask(taskId: string, patch: Partial<Task>) {
        const list = this.readTasks();
        const i = list.findIndex((t) => t.id === taskId);

        if (i >= 0) {
          list[i] = { ...list[i], ...patch };
          this.writeTasks(list);
        }
    }

    async moveTask(taskId: string, to: Task['status']) {
        const patch: Partial<Task> = { status: to };
        if (to === 'FINALIZADO') patch.completedAt = iso();

        await this.updateTask(taskId, patch);
    }
}