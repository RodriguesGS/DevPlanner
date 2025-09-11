export type TaskStatus = 'BACKLOG' | 'DEV' | 'VALIDACAO' | 'FINALIZADO';
export type TaskPriority = 'BAIXA' | 'MEDIA' | 'ALTA';

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  createdAt: string;
  completedAt?: string;
}
