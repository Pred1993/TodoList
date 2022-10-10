import axios, { AxiosResponse } from 'axios';
import { RequestStatusType } from '../app/app-reducer';

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '109cdbd6-571a-45e5-80a2-833676b0684d',
  },
};

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  ...settings,
});

export const todolistAPI = {
  getTodolist() {
    return instance.get<TodoListType[]>('todo-lists');
  },
  CreateTodolist(title: string) {
    return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodoListType }>>>('todo-lists', {
      title: title,
    });
  },
  DeleteTodolist(todolistId: string) {
    return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`);
  },
  UpdateTodolistTitle(todolistId: string, title: string) {
    return instance.put<{ title: string }, AxiosResponse<ResponseType<{}>>>(`todo-lists/${todolistId}`, {
      title: title,
    });
  },
};

export const tasksAPI = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`);
  },
  CreateTasks(todolistId: string, title: string) {
    return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(
      `todo-lists/${todolistId}/tasks`,
      { title: title },
    );
  },
  DeleteTasks(todolistId: string, taskId: string) {
    return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
  UpdateTasks(todolistId: string, taskId: string, dataUpdateRequest: dataUpdateRequestType) {
    return instance.put<dataUpdateRequestType, AxiosResponse<ResponseType<{}>>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      dataUpdateRequest,
    );
  },
};

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: number }>>>(`auth/login`, data);
  },
  me() {
    return instance.get<ResponseType<{ id: number; email: string; login: string }>>(`auth/me`);
  },
};

//types
export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};

export type TodoListType = {
  addedDate: string;
  id: string;
  order: number;
  title: string;
};

export type ResponseType<T> = {
  fieldsErrors: string[];
  messages: string[];
  resultCode: number;
  data: T;
};

export enum StatusCode {
  Ok,
  Error,
  Captcha,
}

export enum TaskStatuses {
  New,
  InProgress,
  Completed,
  Draft,
}

export enum TaskPriorities {
  Low,
  Middle,
  Hi,
  Urgently,
  Later,
}

export type TaskDomainType = TaskType & { entityStatus: RequestStatusType };
export type TaskType = {
  addedDate: string;
  deadline: null | string;
  description: null | string;
  id: string;
  order: number;
  priority: TaskPriorities;
  startDate: null | string;
  status: TaskStatuses;
  title: string;
  todoListId: string;
};

export type GetTasksResponseType = {
  error: string | null;
  items: TaskType[];
  totalCount: number;
};

export type dataUpdateRequestType = {
  title: string;
  description: null | string;
  status: number;
  priority: number;
  startDate: null | string;
  deadline: null | string;
};
