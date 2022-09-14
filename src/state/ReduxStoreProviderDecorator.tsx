import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, legacy_createStore } from 'redux';
import { v1 } from 'uuid';
import { tasksReducer } from './tasks-reducer';
import { todolistsReducer } from './todolist-reducer';
import {AppRootStateType} from "./store";


const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolist: todolistsReducer,
});

const initialGlobalState = {
  todolist: [
    { id: 'todoListId1', title: 'What to learn', filter: 'all' },
    { id: 'todoListId2', title: 'What to buy', filter: 'all' },
  ],
  tasks: {
    ['todoListId1']: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
    ],
    ['todoListId2']: [
      { id: v1(), title: 'Milk', isDone: true },
      { id: v1(), title: 'React Book', isDone: true },
    ],
  },
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => <Provider store={storyBookStore}>{storyFn()}</Provider>;