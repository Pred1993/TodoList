import { combineReducers, compose, legacy_createStore } from 'redux';
import { todolistsReducer } from './todolist-reducer';
import { tasksReducer } from './tasks-reducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  todolist: todolistsReducer,
  tasks: tasksReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = legacy_createStore(rootReducer, composeEnhancers());

// @ts-ignore
window.store = store;
