import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { v1 } from 'uuid';
import { tasksReducer } from '../features/TodolistsList/tasks-reducer';
import { todolistsReducer } from '../features/TodolistsList/todolist-reducer';
import { AppRootStateType } from '../app/store';
import { TaskPriorities, TaskStatuses } from '../api/todolist-api';
import thunk from 'redux-thunk';
import { appReducer } from '../app/app-reducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolist: todolistsReducer,
  app: appReducer,
});

const initialGlobalState = {
  todolist: [
    { id: 'todoListId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle' },
    { id: 'todoListId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'loading' },
  ],
  tasks: {
    ['todoListId1']: [
      {
        id: v1(),
        title: 'HTML&CSS',
        status: TaskStatuses.Completed,
        todoListId: 'todoListId1',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        addedDate: '',
        deadline: '',
        startDate: '',
      },
      {
        id: v1(),
        title: 'JS',
        status: TaskStatuses.Completed,
        todoListId: 'todoListId1',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        addedDate: '',
        deadline: '',
        startDate: '',
      },
    ],
    ['todoListId2']: [
      {
        id: v1(),
        title: 'Milk',
        status: TaskStatuses.Completed,
        todoListId: 'todoListId2',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        addedDate: '',
        deadline: '',
        startDate: '',
      },
      {
        id: v1(),
        title: 'React Book',
        status: TaskStatuses.Completed,
        todoListId: 'todoListId2',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        addedDate: '',
        deadline: '',
        startDate: '',
      },
    ],
  },
  app: {
    status: 'idle',
    error: null,
  },
};

export const storyBookStore = legacy_createStore(
  rootReducer,
  initialGlobalState as AppRootStateType,
  applyMiddleware(thunk),
);

export const ReduxStoreProviderDecorator = (storyFn: any) => <Provider store={storyBookStore}>{storyFn()}</Provider>;
