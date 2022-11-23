import { applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux';
import { ActionTodolistType, todolistsReducer } from '../features/TodolistsList/todolist-reducer';
import { ActionTaskType, tasksReducer } from '../features/TodolistsList/tasks-reducer';
import thunk, { ThunkDispatch } from 'redux-thunk';
import {AppActionsType, appReducer} from './app-reducer';
import {AuthActionType, authReducer} from '../features/Login/auth-reducer';

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

export type ActionsType = ActionTodolistType | ActionTaskType | AppActionsType | AuthActionType;

export type AppThunkType = ThunkDispatch<AppRootStateType, void, ActionsType>;

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;//for dev
