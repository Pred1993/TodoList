import { TasksStateType } from '../trash/App1!src/features/TodolistsList/tasks-reducer.test';
import { addTasksAC, removeTasksAC, setTasksAC, tasksReducer, updateTaskAC } from './tasks-reducer';

import { addTodolistAC, removeTodolistAC, setTodolistAC } from './todolist-reducer';
import { TaskPriorities, TaskStatuses } from '../../api/todolist-api';

let startState: TasksStateType = {};
beforeEach(() => {
  startState = {
    todoListId1: [
      {
        id: '1',
        title: 'Meat',
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
        id: '2',
        title: 'Fish',
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
        id: '3',
        title: 'Beer',
        status: TaskStatuses.New,
        todoListId: 'todoListId1',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        addedDate: '',
        deadline: '',
        startDate: '',
      },
    ],
    todoListId2: [
      {
        id: '1',
        title: 'HTML & CSS',
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
        id: '2',
        title: 'React',
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
        id: '3',
        title: 'JS',
        status: TaskStatuses.New,
        todoListId: 'todoListId2',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        addedDate: '',
        deadline: '',
        startDate: '',
      },
    ],
  };
});
test('Reducer has to remove the task', () => {
  const action: ReturnType<typeof removeTasksAC> = removeTasksAC('todoListId2', '2');

  const endState = tasksReducer(startState, action);

  expect(endState['todoListId2'].length).toBe(2);
  expect(endState['todoListId1'].length).toBe(3);
  expect(endState['todoListId2'].every((t) => t.id !== '2')).toBeTruthy();
});

test('Reducer has to add the task', () => {
  const action: ReturnType<typeof addTasksAC> = addTasksAC('todoListId2', {
    id: '1',
    title: 'Meat',
    status: TaskStatuses.Completed,
    todoListId: 'todoListId1',
    description: '',
    order: 0,
    priority: TaskPriorities.Low,
    addedDate: '',
    deadline: '',
    startDate: '',
  });

  const endState = tasksReducer(startState, action);

  expect(endState['todoListId1'].length).toBe(3);
  expect(endState['todoListId2'].length).toBe(4);
  expect(endState['todoListId2'][0].id).toBeDefined();
  expect(endState['todoListId2'][0].title).toBe('Meat');
  expect(endState['todoListId2'][0].status).toBe(2);
});

test('status of specified task should be changed', () => {
  const action: ReturnType<typeof updateTaskAC> = updateTaskAC('todoListId2', '2', { status: 0 });

  const endState = tasksReducer(startState, action);

  expect(endState['todoListId1'][0].status).toBe(2);
  expect(endState['todoListId2'][1].status).toBe(0);
});

test('title of specified task should be changed', () => {
  const action: ReturnType<typeof updateTaskAC> = updateTaskAC('todoListId2', '2', { title: 'Redux' });

  const endState = tasksReducer(startState, action);

  expect(endState['todoListId1'][0].title).toBe('Meat');
  expect(endState['todoListId2'][1].title).toBe('Redux');
});

test('new array should be added when new todolist is added', () => {
  const action: ReturnType<typeof addTodolistAC> = addTodolistAC({
    id: 'todoListId3',
    title: 'What to learn',
    addedDate: '',
    order: 0,
  });

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== 'todoListId1' && k !== 'todoListId2');
  if (!newKey) {
    throw Error('new key should be added');
  }
  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
  const action = removeTodolistAC('todoListId2');

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState['todoListId2']).not.toBeDefined();
});

test('empty arrays should be added when we set todolists', () => {
  const action = setTodolistAC([
    { id: '1', title: 'What to learn', addedDate: '', order: 0 },
    { id: '2', title: 'What to buy', addedDate: '', order: 0 },
  ]);

  const endState = tasksReducer({}, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(2);
  expect(endState['1']).toStrictEqual([]);
  expect(endState['2']).toStrictEqual([]);
});

test('tasks should be added for todolist', () => {
  const action = setTasksAC('todoListId2', [
    {
      id: '1',
      title: 'HTML & CSS',
      status: TaskStatuses.Completed,
      todoListId: 'todoListId2',
      description: '',
      order: 0,
      priority: TaskPriorities.Low,
      addedDate: '',
      deadline: '',
      startDate: '',
    },
  ]);

  const endState = tasksReducer({ todoListId1: [], todoListId2: [] }, action);

  expect(endState['todoListId2'][0].id).toBe('1');
});
