import { inject } from '@angular/core';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { Todo } from '../model/todo.model';
import { TodoService } from './todo.service';

export const todoKeys = {
  all: ['todos'] as const,
};

export const injectAllTodos = () => {
  const todoService = inject(TodoService);
  return injectQuery(() => ({
    queryKey: todoKeys.all,
    queryFn: () => lastValueFrom(todoService.getAllTodo()),
  }));
};

export const injectTodoUpdate = () => {
  const todoService = inject(TodoService);
  return injectMutation((client) => ({
    mutationFn: (todoId: number) => lastValueFrom(todoService.update(todoId)),
    onSuccess: (todo: Todo) => {
      client.setQueryData(todoKeys.all, (oldData: Todo[]) =>
        oldData
          ? oldData.map((t) => (t.id === todo.id ? { ...todo } : t))
          : oldData,
      );
    },
  }));
};

export const injectTodoDelete = () => {
  const todoService = inject(TodoService);
  return injectMutation((client) => ({
    mutationFn: (todoId: number) => lastValueFrom(todoService.delete(todoId)),
    onSuccess: (_, todoId: number) => {
      client.setQueryData(todoKeys.all, (oldData: Todo[]) =>
        oldData ? oldData.filter((todo) => todo.id !== todoId) : oldData,
      );
    },
  }));
};
