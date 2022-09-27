import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, legacy_createStore } from 'redux';
import { v1 } from 'uuid';
import { tasksReducer } from './tasks-reducer';
import { todolistsReducer } from './todolist-reducer';
import { AppRootStateType } from './store';
import { TaskPriorities, TaskStatuses } from '../api/todolist-api';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolist: todolistsReducer,
});

const initialGlobalState = {
  todolist: [
    { id: 'todoListId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0 },
    { id: 'todoListId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0 },
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
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => <Provider store={storyBookStore}>{storyFn()}</Provider>;
