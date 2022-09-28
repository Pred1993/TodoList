import {todolistAPI, TodoListType} from '../api/todolist-api';
import {Dispatch} from 'redux';

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST';
  id: string;
};
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST';
  todolist: TodoListType
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
export type SetTodolistActionType = {
  type: 'SET-TODOLIST';
  todolist: Array<TodoListType>;
};

const initialState: Array<TodoListDomainType> = [
  /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
  {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
];
export type FilterType = 'all' | 'completed' | 'active';
export type TodoListDomainType = TodoListType & {
  filter: FilterType;
};
export type ActionTodolistType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistActionType;

export const todolistsReducer = (
  state: Array<TodoListDomainType> = initialState,
  action: ActionTodolistType,
): Array<TodoListDomainType> => {
  switch (action.type) {
    case 'SET-TODOLIST':
      return action.todolist.map((td) => ({ ...td, filter: 'all' }));
    case 'REMOVE-TODOLIST':
      return state.filter((td) => td.id !== action.id);
    case 'ADD-TODOLIST':
      // const newTodoList: TodoListDomainType = {
      //   id: action.todolistId,
      //   title: action.title,
      //   filter: 'all',
      //   addedDate: '',
      //   order: 0,
      // };
        const newTodolist:TodoListDomainType  = {...action.todolist, filter: "all"}
      return [newTodolist, ...state]
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

export const addTodolistAC = (todolist: TodoListType): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', todolist: todolist};
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

export const setTodolistAC = (todolist: Array<TodoListType>): SetTodolistActionType => {
  return {
    type: 'SET-TODOLIST',
    todolist: todolist,
  };
};

export const fetchTodolistTС = () => {
  return (dispatch: Dispatch) => {
    todolistAPI.getTodolist().then((response) => {
      dispatch(setTodolistAC(response.data));
    });
  };
};

export const deleteTodolistTС = (todoListId: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.DeleteTodolist(todoListId).then((response) => {
      const action = removeTodolistAC(todoListId);
      dispatch(action);
    });
  };
};

export const addTodolistTС = (title: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.CreateTodolist(title).then((response) => {
      const action = addTodolistAC(response.data.data.item);
      dispatch(action);
    });
  };
};