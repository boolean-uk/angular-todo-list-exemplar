import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private readonly http: HttpClient) {}
  get todos(): Promise<Todo[]> {
    return firstValueFrom(this.http.get<Todo[]>(`${environment.apiUrl}/todo`));
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = await firstValueFrom(
      this.http.post<Todo>(`${environment.apiUrl}/todo`, { title })
    );

    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const todo = await firstValueFrom(
      this.http.put<Todo>(
        `${environment.apiUrl}/todo/${updatedTodo.id}`,
        updatedTodo
      )
    );

    return todo;
  }
}
