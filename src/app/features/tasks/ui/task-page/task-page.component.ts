import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { firstValueFrom } from 'rxjs';
import { TaskService } from '../../../../services/task.service';
import { Task } from '../../../../models/model.task';

export type ColKey = 'BACKLOG' | 'DEV' | 'VALIDACAO' | 'FINALIZADO';

@Component({
  selector: 'app-task-page',
  imports: [CommonModule, CdkDropList, CdkDrag, CdkDropListGroup, FormsModule],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss',
})
export class TaskPageComponent {
  private taskService = inject(TaskService);

  tasks = signal<Task[]>([]);
  search = signal('');
  selectedProject = signal<string | null>(null);

  showCreateModal = signal(false);
  newTaskTitle = '';
  newTaskDescription = '';
  newTaskPriority: 'BAIXA' | 'MEDIA' | 'ALTA' = 'MEDIA';
  newTaskDueDate = '';

  constructor() {
    this.reload();
  }

  async reload() {
    const data = this.selectedProject()
      ? await this.taskService.listByProject(this.selectedProject()!)
      : await this.taskService.listAll();
    this.tasks.set(data);
  }

  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    if (!q) return this.tasks();
    return this.tasks().filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        (t.description ?? '').toLowerCase().includes(q)
    );
  });

  listBy = (status: ColKey) =>
    computed(() => this.filtered().filter((t) => t.status === status));

  backlog = this.listBy('BACKLOG');
  dev = this.listBy('DEV');
  review = this.listBy('VALIDACAO');
  done = this.listBy('FINALIZADO');

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

    try {
      await firstValueFrom(
        this.taskService.updateTask(moved.id, { status: to })
      );

      this.tasks.update((list) =>
        list.map((t) => (t.id === moved.id ? { ...t, status: to } : t))
      );
    } catch (error) {
      console.error('Error updating task status:', error);
      await this.reload();
    }
  }

  /**
   * Create a new task
   */
  async createTask(taskData: Omit<Task, 'id' | 'createdAt'>) {
    try {
      const newTask = await firstValueFrom(
        this.taskService.createTask(taskData)
      );
      if (newTask) {
        this.tasks.update((list) => [...list, newTask]);
      }
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  /**
   * Open create task modal
   */
  openCreateModal() {
    this.showCreateModal.set(true);
  }

  /**
   * Close create task modal
   */
  closeCreateModal() {
    this.showCreateModal.set(false);
    this.clearForm();
  }

  /**
   * Clear form fields
   */
  clearForm() {
    this.newTaskTitle = '';
    this.newTaskDescription = '';
    this.newTaskPriority = 'MEDIA';
    this.newTaskDueDate = '';
  }

  /**
   * Submit new task
   */
  async submitNewTask() {
    console.log('submitNewTask called');
    console.log('Title:', this.newTaskTitle);

    if (!this.newTaskTitle.trim()) {
      alert('O título da tarefa é obrigatório!');
      return;
    }

    const taskData = {
      projectId: this.selectedProject() || 'p1',
      title: this.newTaskTitle.trim(),
      description: this.newTaskDescription.trim() || undefined,
      status: 'BACKLOG' as const,
      priority: this.newTaskPriority,
      dueDate: this.newTaskDueDate || undefined,
    };

    console.log('Creating task with data:', taskData);

    try {
      const newTask = await firstValueFrom(
        this.taskService.createTask(taskData)
      );
      console.log('Task created successfully:', newTask);

      if (newTask) {
        this.tasks.update((list) => [...list, newTask]);
      }

      this.closeCreateModal();
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Erro ao criar tarefa. Verifique o console para mais detalhes.');
    }
  }

  /**
   * Update an existing task
   */
  async updateTaskData(id: string, updates: Partial<Task>) {
    try {
      const updatedTask = await firstValueFrom(
        this.taskService.updateTask(id, updates)
      );
      if (updatedTask) {
        this.tasks.update((list) =>
          list.map((t) => (t.id === id ? updatedTask : t))
        );
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }

  /**
   * Delete a task
   */
  async deleteTask(id: string) {
    try {
      await firstValueFrom(this.taskService.deleteTask(id));
      this.tasks.update((list) => list.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  statusLabel(s: ColKey) {
    return {
      BACKLOG: 'Backlog',
      DEV: 'Em desenvolvimento',
      VALIDACAO: 'Validação',
      FINALIZADO: 'Finalizado',
    }[s];
  }

  priorityColor(p: Task['priority']) {
    return {
      ALTA: 'var(--pri-alta)',
      MEDIA: 'var(--pri-media)',
      BAIXA: 'var(--pri-baixa)',
    }[p];
  }

  trackById(index: number, item: Task) {
    return item.id;
  }
}
