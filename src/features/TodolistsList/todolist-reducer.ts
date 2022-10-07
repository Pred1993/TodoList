import { todolistAPI, TodoListType } from '../../api/todolist-api';
import { Dispatch } from 'redux';
import { RequestStatusType, setAppStatusAC } from '../../app/app-reducer';
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils';

const initialState: Array<TodoListDomainType> = [
  /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'}*/
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
    case 'CHANGE-TODOLIST-ENTITY-STATUS':
      return state.map((td) => (td.id === action.todolistId ? { ...td, entityStatus: action.entityStatus } : td));
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
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof changeTodolistEntityStatusAC>;

// actions
export const removeTodolistAC = (todolistId: string) => ({ type: 'REMOVE-TODOLIST', todolistId } as const);
export const addTodolistAC = (todolist: TodoListType) => ({ type: 'ADD-TODOLIST', todolist } as const);
export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) =>
  ({ type: 'CHANGE-TODOLIST-TITLE', todolistId, newTodolistTitle } as const);
export const changeTodolistFilterAC = (todolistId: string, filter: FilterType) =>
  ({ type: 'CHANGE-TODOLIST-FILTER', todolistId, filter } as const);
export const setTodolistAC = (todolist: Array<TodoListType>) => ({ type: 'SET-TODOLIST', todolist } as const);
export const changeTodolistEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) =>
  ({ type: 'CHANGE-TODOLIST-ENTITY-STATUS', entityStatus, todolistId } as const);

// thunks
export const fetchTodolistTС = () => (dispatch: Dispatch<ActionTodolistType>) => {
  dispatch(setAppStatusAC('loading')); // для отрисовки загрузки во время связи с сервером (бегущая строка)
  todolistAPI
    .getTodolist()
    .then((response) => {
      dispatch(setTodolistAC(response.data));
      dispatch(setAppStatusAC('succeeded'));
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const deleteTodolistTС = (todoListId: string) => (dispatch: Dispatch<ActionTodolistType>) => {
  dispatch(setAppStatusAC('loading'));
  dispatch(changeTodolistEntityStatusAC(todoListId, 'loading')); // для задизейбливония кнопки пока идёт ответ с сервера
  todolistAPI
    .DeleteTodolist(todoListId)
    .then((response) => {
      if (response.data.resultCode === 0) {
        const action = removeTodolistAC(todoListId);
        dispatch(action);
        dispatch(setAppStatusAC('succeeded'));
      } else {
        handleServerAppError(response.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const addTodolistTС = (title: string) => (dispatch: Dispatch<ActionTodolistType>) => {
  dispatch(setAppStatusAC('loading'));
  todolistAPI
    .CreateTodolist(title)
    .then((response) => {
      if (response.data.resultCode === 0) {
        const action = addTodolistAC(response.data.data.item);
        dispatch(action);
        dispatch(setAppStatusAC('succeeded'));
      } else {
        handleServerAppError(response.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const changeTodolistTitleTС =
  (todoListId: string, title: string) => (dispatch: Dispatch<ActionTodolistType>) => {
    dispatch(setAppStatusAC('loading'));
    dispatch(changeTodolistEntityStatusAC(todoListId, 'loading'));
    todolistAPI
      .UpdateTodolistTitle(todoListId, title)
      .then((response) => {
        if (response.data.resultCode === 0) {
          const action = changeTodolistTitleAC(todoListId, title);
          dispatch(action);
          dispatch(setAppStatusAC('succeeded'));
        } else {
          handleServerAppError(response.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      })
      .finally(() => {
        dispatch(changeTodolistEntityStatusAC(todoListId, 'idle'));
      });
  };
