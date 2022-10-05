import { addTodolistAC, TodoListDomainType, todolistsReducer } from './todolist-reducer';
import { tasksReducer } from './tasks-reducer';
import { TasksStateType } from '../../trash/AppWithReducers';

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodoListDomainType> = [];

  const action = addTodolistAC({ id: 'todolistId3', title: 'What to learn', addedDate: '', order: 0 });

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.todolist.id);
  expect(idFromTodolists).toBe(action.todolist.id);
});
