import {applyMiddleware, combineReducers, compose, legacy_createStore} from 'redux';
import {ActionTodolistType, todolistsReducer} from './todolist-reducer';
import {ActionTaskType, tasksReducer} from './tasks-reducer';
import thunk, {ThunkDispatch} from 'redux-thunk';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type AppActionsType = ActionTodolistType | ActionTaskType;
const rootReducer = combineReducers({
  todolist: todolistsReducer,
  tasks: tasksReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

export type AppThunkType = ThunkDispatch<AppRootStateType, void, AppActionsType>;

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;
