import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = import.meta.env.VITE_USER_ID;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
export const addTodo = ({
  completed,
  title,
  userId = USER_ID,
}: Omit<Todo, 'id'>) => {
  return client.post<Todo>(`/todos`, { completed, title, userId });
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

type UpdateTodoPayload = {
  todoId: number;
  title?: string;
  completed?: boolean;
  userId?: number;
};

export const updateTodo = ({
  todoId,
  title,
  completed,
  userId = USER_ID,
}: UpdateTodoPayload) => {
  const data: Partial<Todo> = { userId };

  if (title !== undefined) {
    data.title = title;
  }

  if (completed !== undefined) {
    data.completed = completed;
  }

  return client.patch<Todo>(`/todos/${todoId}`, data);
};
