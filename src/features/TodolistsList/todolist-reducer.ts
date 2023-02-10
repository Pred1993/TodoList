import {todolistAPI, TodoListType} from '../../api/todolist-api';
import {Dispatch} from 'redux';
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodoListDomainType> = [
  /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'}*/
];

const slice = createSlice({
  name: 'todolist',
  initialState: initialState,
  reducers: {
    removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
      const index = state.findIndex(el => el.id === action.payload.todolistId)
      if (index > -1) {
        state.splice(index, 1)
      }
    },
    addTodolistAC(state, action: PayloadAction<{ todolist: TodoListType }>) {
      state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
    },
    changeTodolistTitleAC(state, action: PayloadAction<{ todolistId: string, newTodolistTitle: string }>) {
      const index = state.findIndex(el => el.id === action.payload.todolistId)
      if (index > -1) {
        state[index].title = action.payload.newTodolistTitle
      }
    },
    changeTodolistFilterAC(state, action: PayloadAction<{ todolistId: string, filter: FilterType }>) {
      const index = state.findIndex(el => el.id === action.payload.todolistId)
      if (index > -1) {
        state[index].filter = action.payload.filter
      }
    },
    setTodolistAC(state, action: PayloadAction<{ todolist: Array<TodoListType> }>) {
      return action.payload.todolist.map((td) => ({...td, filter: 'all', entityStatus: 'idle'}))
    },
    changeTodolistEntityStatusAC(state, action: PayloadAction<{ todolistId: string, entityStatus: RequestStatusType }>) {
      const index = state.findIndex(el => el.id === action.payload.todolistId)
      if (index > -1) {
        state[index].entityStatus = action.payload.entityStatus
      }
    },

  }
})

export const todolistsReducer = slice.reducer

//types
export type FilterType = 'all' | 'completed' | 'active';
export type TodoListDomainType = TodoListType & {
  filter: FilterType;
  entityStatus: RequestStatusType;
};

// actions
export const {
  changeTodolistTitleAC,
  changeTodolistFilterAC,
  removeTodolistAC,
  setTodolistAC,
  changeTodolistEntityStatusAC,
  addTodolistAC
} = slice.actions

// thunks
export const fetchTodolistTС = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({status: "loading"})); // для отрисовки загрузки во время связи с сервером (бегущая строка)
  todolistAPI
    .getTodolist()
    .then((response) => {
      dispatch(setTodolistAC({todolist: response.data}));
      dispatch(setAppStatusAC({status: "succeeded"}));
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const deleteTodolistTС = (todoListId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({status: "loading"}));
  dispatch(changeTodolistEntityStatusAC({todolistId: todoListId, entityStatus: 'loading'},)); // для задизейбливония кнопки пока идёт ответ с сервера
  todolistAPI
    .DeleteTodolist(todoListId)
    .then((response) => {
      if (response.data.resultCode === 0) {
        const action = removeTodolistAC({todolistId: todoListId});
        dispatch(action);
        dispatch(setAppStatusAC({status: "succeeded"}));
      } else {
        handleServerAppError(response.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const addTodolistTС = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({status: "loading"}));
  todolistAPI
    .CreateTodolist(title)
    .then((response) => {
      if (response.data.resultCode === 0) {
        const action = addTodolistAC({todolist: response.data.data.item});
        dispatch(action);
        dispatch(setAppStatusAC({status: "succeeded"}));
      } else {
        handleServerAppError(response.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const changeTodolistTitleTС =
  (todoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}));
    dispatch(changeTodolistEntityStatusAC({todolistId: todoListId, entityStatus: 'loading'}));
    todolistAPI
      .UpdateTodolistTitle(todoListId, title)
      .then((response) => {
        if (response.data.resultCode === 0) {
          const action = changeTodolistTitleAC({todolistId: todoListId, newTodolistTitle: title});
          dispatch(action);
          dispatch(setAppStatusAC({status: "succeeded"}));
        } else {
          handleServerAppError(response.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      })
      .finally(() => {
        dispatch(changeTodolistEntityStatusAC({todolistId: todoListId, entityStatus: 'idle'}));
      });
  };
