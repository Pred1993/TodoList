import { v1 } from 'uuid';
import {
  addTodolistAC,
  changeTodolistEntityStatusAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  FilterType,
  removeTodolistAC,
  setTodolistAC,
  TodoListDomainType,
  todolistsReducer,
} from './todolist-reducer';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListDomainType> = [];

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = [
    { id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle' },
    { id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle' },
  ];
});

test('correct todolist should be removed', () => {
  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  let newTodolistTitle = 'New Todolist';
  const endState = todolistsReducer(
    startState,
    addTodolistAC({ id: todolistId1, title: newTodolistTitle, addedDate: '', order: 0 }),
  );
  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle);
  expect(endState[0].filter).toBe('all');
});

test('correct todolist should change its name', () => {
  let newTodolistTitle = 'New Todolist';
  const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));

  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
  let newFilter: FilterType = 'completed';
  const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter));

  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(newFilter);
});

test('todolist should be set to the state', () => {
  const endState = todolistsReducer([], setTodolistAC(startState));

  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe('all');
});

test('property entityStatus should be changed', () => {
  const endState = todolistsReducer(startState, changeTodolistEntityStatusAC(todolistId1, 'loading'));

  expect(endState[0].entityStatus).toBe('loading');
  expect(endState[1].entityStatus).toBe('idle');
});
