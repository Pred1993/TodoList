import { todolistAPI, TodoListType } from '../../api/todolist-api';
import { Dispatch } from 'redux';
import { RequestStatusType, setStatusAC } from '../../app/app-reducer';

const initialState: Array<TodoListDomainType> = [
  /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
];

// reducer
export const todolistsReducer = (
  state: Array<TodoListDomainType> = initialState,
  action: ActionTodolistType,
): Array<TodoListDomainType> => {
  switch (action.type) {
    case 'SET-TODOLIST':
      return action.todolist.map((td) => ({ ...td, filter: 'all', entityStatus: 'idle' }));
    case 'REMOVE-TODOLIST':
      return state.filter((td) => td.id !== action.todolistId);
    case 'ADD-TODOLIST':
      const newTodolist: TodoListDomainType = { ...action.todolist, filter: 'all', entityStatus: 'idle' };
      return [newTodolist, ...state];
    case 'CHANGE-TODOLIST-TITLE':
      return state.map((td) => (td.id === action.todolistId ? { ...td, title: action.newTodolistTitle } : td));
    case 'CHANGE-TODOLIST-FILTER':
      return state.map((td) => (td.id === action.todolistId ? { ...td, filter: action.filter } : td));
    default:
      return state;
  }
};

//types
export type FilterType = 'all' | 'completed' | 'active';
export type TodoListDomainType = TodoListType & {
  filter: FilterType;
  entityStatus: RequestStatusType;
};
export type ActionTodolistType =
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof setTodolistAC>
  | ReturnType<typeof setStatusAC>;

// actions
export const removeTodolistAC = (todolistId: string) => ({ type: 'REMOVE-TODOLIST', todolistId } as const);
export const addTodolistAC = (todolist: TodoListType) => ({ type: 'ADD-TODOLIST', todolist } as const);
export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) =>
  ({ type: 'CHANGE-TODOLIST-TITLE', todolistId, newTodolistTitle } as const);
export const changeTodolistFilterAC = (todolistId: string, filter: FilterType) =>
  ({ type: 'CHANGE-TODOLIST-FILTER', todolistId, filter } as const);
export const setTodolistAC = (todolist: Array<TodoListType>) => ({ type: 'SET-TODOLIST', todolist } as const);

// thunks
export const fetchTodolistTС = () => (dispatch: Dispatch<ActionTodolistType>) => {
  dispatch(setStatusAC('loading'));
  todolistAPI.getTodolist().then((response) => {
    dispatch(setTodolistAC(response.data));
    dispatch(setStatusAC('succeeded'));
  });
};

export const deleteTodolistTС = (todoListId: string) => (dispatch: Dispatch<ActionTodolistType>) => {
  dispatch(setStatusAC('loading'));
  todolistAPI.DeleteTodolist(todoListId).then((response) => {
    const action = removeTodolistAC(todoListId);
    dispatch(action);
    dispatch(setStatusAC('succeeded'));
  });
};

export const addTodolistTС = (title: string) => (dispatch: Dispatch<ActionTodolistType>) => {
  dispatch(setStatusAC('loading'));
  todolistAPI.CreateTodolist(title).then((response) => {
    const action = addTodolistAC(response.data.data.item);
    dispatch(action);
    dispatch(setStatusAC('succeeded'));
  });
};

export const changeTodolistTitleTС =
  (todoListId: string, title: string) => (dispatch: Dispatch<ActionTodolistType>) => {
    dispatch(setStatusAC('loading'));
    todolistAPI.UpdateTodolistTitle(todoListId, title).then((response) => {
      const action = changeTodolistTitleAC(todoListId, title);
      dispatch(action);
      dispatch(setStatusAC('succeeded'));
    });
  };
