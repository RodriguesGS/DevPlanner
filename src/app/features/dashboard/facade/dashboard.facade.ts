import { computed, inject, Injectable, signal } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../models/model.task';

@Injectable({ providedIn: 'root' })
export class DashboardFacade {
  private taskService = inject(TaskService);
  private tasksSig = signal<Task[]>([]);

  tasks = this.tasksSig.asReadonly();

  days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

  async load() {
    this.tasksSig.set(await this.taskService.listAll());
  }

  total = computed(() => this.tasks().length);

  doneThisWeek = computed(
    () =>
      this.tasks().filter((t) => t.completedAt && inLastDays(t.completedAt!, 7))
        .length
  );

  overdue = computed(() => this.tasks().filter((t) => isOverdue(t)).length);

  byStatus = computed(() => {
    const s = { BACKLOG: 0, DEV: 0, VALIDACAO: 0, FINALIZADO: 0 };
    this.tasks().forEach((t) => s[t.status]++);
    return [s.BACKLOG, s.DEV, s.VALIDACAO, s.FINALIZADO];
  });

  byPriority = computed(() => {
    const p = { BAIXA: 0, MEDIA: 0, ALTA: 0 };
    this.tasks().forEach((t) => p[t.priority]++);
    return [{ name: 'Tarefas', data: [p.BAIXA, p.MEDIA, p.ALTA] }];
  });

  velocity = computed(() => {
    const arr = new Array(7).fill(0);

    this.tasks().forEach((t) => {
      if (!t.completedAt) return;

      const d = new Date(t.completedAt);
      const diff = Math.floor((Date.now() - d.getTime()) / 86400000);

      if (diff >= 0 && diff < 7) arr[6 - diff]++;
    });

    return [{ name: 'Concluídas', data: arr }];
  });
}

function inLastDays(iso: string, days: number) {
  const d = new Date(iso);

  return (Date.now() - d.getTime()) / 86400000 <= days;
}

function isOverdue(t: Task) {
  if (!t.dueDate) return false;

  return new Date(t.dueDate) < new Date() && t.status !== 'FINALIZADO';
}
