import { FilterType, TodoListType } from '../App';
import { v1 } from 'uuid';

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST';
  id: string;
};
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST';
  title: string;
  todolistId: string;
};
export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE';
  id: string;
  title: string;
};
export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER';
  id: string;
  filter: FilterType;
};

const initialState: Array<TodoListType> = [];

export type ActionType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;
export const todolistsReducer = (
  state: Array<TodoListType> = initialState,
  action: ActionType,
): Array<TodoListType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter((td) => td.id !== action.id);
    case 'ADD-TODOLIST':
      const newTodoList: TodoListType = { id: action.todolistId, title: action.title, filter: 'all' };
      return [...state, newTodoList];
    case 'CHANGE-TODOLIST-TITLE':
      return state.map((td) => (td.id === action.id ? { ...td, title: action.title } : td));
    case 'CHANGE-TODOLIST-FILTER':
      return state.map((td) => (td.id === action.id ? { ...td, filter: action.filter } : td));
    default:
      return state;
  }
};

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId };
};

export const addTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', title: newTodolistTitle, todolistId: v1() };
};

export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    id: todolistId,
    title: newTodolistTitle,
  } as const;
};

export const changeTodolistFilterAC = (todolistId: string, filter: FilterType): ChangeTodolistFilterActionType => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    id: todolistId,
    filter: filter,
  } as const;
};
