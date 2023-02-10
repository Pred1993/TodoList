import {combineReducers, compose} from 'redux';
import {todolistsReducer} from '../features/TodolistsList/todolist-reducer';
import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import thunkMiddleware from 'redux-thunk';
import {appReducer} from './app-reducer';
import {authReducer} from '../features/Login/auth-reducer';
import {configureStore} from "@reduxjs/toolkit";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const rootReducer = combineReducers({
  todolist: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

// export type ActionsType = ActionTodolistType | ActionTaskType | AppActionsType | AuthActionType;

// export type AppThunkType = ThunkDispatch<AppRootStateType, void, ActionsType>;

// export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(thunkMiddleware)
})
// @ts-ignore
window.store = store;//for dev
