import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { Task } from '../models/model.task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = '/api/tasks';

  /**
   * Get all tasks
   */
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  /**
   * Get all tasks as Promise (for compatibility with existing code)
   */
  listAll(): Promise<Task[]> {
    return firstValueFrom(this.getAllTasks());
  }

  /**
   * Get tasks by project ID
   */
  getTasksByProject(projectId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/project/${projectId}`);
  }

  /**
   * Get tasks by project ID as Promise (for compatibility)
   */
  listByProject(projectId: string): Promise<Task[]> {
    return firstValueFrom(this.getTasksByProject(projectId));
  }

  /**
   * Get a single task by ID
   */
  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new task
   */
  createTask(task: Omit<Task, 'id' | 'createdAt'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  /**
   * Update an existing task
   */
  updateTask(id: string, updates: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, updates);
  }

  /**
   * Delete a task
   */
  deleteTask(id: string): Observable<{ message: string; id: string }> {
    return this.http.delete<{ message: string; id: string }>(
      `${this.apiUrl}/${id}`
    );
  }
}
