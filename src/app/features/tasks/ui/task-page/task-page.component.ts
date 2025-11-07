import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { CdkDrag, CdkDropList, CdkDropListGroup, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskMock } from '../../../../data/data.mock.repository';
import { Task } from '../../../../models/model.task';

export type ColKey = 'BACKLOG' | 'DEV' | 'VALIDACAO' | 'FINALIZADO';

@Component({
  selector: 'app-task-page',
  imports: [
    CommonModule,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup
  ],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss'
})
export class TaskPageComponent {
  repo = inject(TaskMock);

  tasks = signal<Task[]>([]);
  search = signal('');
  selectedProject = signal<string | null>(null);

  constructor() {
    this.reload();
  }

  async reload() {
    const data = this.selectedProject()
      ? await this.repo.listByProject(this.selectedProject()!)
      : await this.repo.listAll();
    this.tasks.set(data);
  }

  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    if (!q) return this.tasks();
    return this.tasks().filter(t =>
      t.title.toLowerCase().includes(q) ||
      (t.description ?? '').toLowerCase().includes(q)
    );
  });

  listBy = (status: ColKey) => computed(() =>
    this.filtered().filter(t => t.status === status)
  );

  backlog   = this.listBy('BACKLOG');
  dev       = this.listBy('DEV');
  review    = this.listBy('VALIDACAO');
  done      = this.listBy('FINALIZADO');

  ids: Record<ColKey, string> = {
    BACKLOG: 'list-backlog',
    DEV: 'list-dev',
    VALIDACAO: 'list-review',
    FINALIZADO: 'list-done',
  };

  async onDrop(e: CdkDragDrop<Task[], Task[]>, to: ColKey) {
    const sameList = e.previousContainer === e.container;

    if (sameList) {
      moveItemInArray(e.container.data, e.previousIndex, e.currentIndex);
      return;
    }

    transferArrayItem(
      e.previousContainer.data,
      e.container.data,
      e.previousIndex,
      e.currentIndex
    );

    const moved: Task = e.container.data[e.currentIndex];
    await this.repo.moveTask(moved.id, to);

    this.tasks.update(list =>
      list.map(t => (t.id === moved.id ? { ...t, status: to } : t))
    );
  }

  statusLabel(s: ColKey) {
    return ({
      BACKLOG: 'Backlog',
      DEV: 'Em desenvolvimento',
      VALIDACAO: 'Validação',
      FINALIZADO: 'Finalizado',
    })[s];
  }

  priorityColor(p: Task['priority']) {
    return ({ ALTA: 'var(--pri-alta)', MEDIA: 'var(--pri-media)', BAIXA: 'var(--pri-baixa)' })[p];
  }

  trackById(index: number, item: Task) {
    return item.id;
  }

}
