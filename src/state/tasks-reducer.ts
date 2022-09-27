import { TasksStateType } from '../App';
import { v1 } from 'uuid';

import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType } from './todolist-reducer';
import { TaskPriorities, TaskStatuses, TaskType } from '../api/todolist-api';

export type RemoveTasksActionType = ReturnType<typeof removeTasksAC>;

export type AddTasksActionType = ReturnType<typeof addTasksAC>;

export type ChangeTasksStatusActionType = ReturnType<typeof changeTasksStatusAC>;

export type ChangeTasksTitleActionType = ReturnType<typeof changeTasksTitleAC>;

export type ActionType =
  | RemoveTasksActionType
  | AddTasksActionType
  | ChangeTasksStatusActionType
  | ChangeTasksTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistActionType;

const initialState: TasksStateType = {   /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
  switch (action.type) {
    case 'SET-TODOLIST':
        const copyState = {...state}
        action.todolist.forEach(td => {
            copyState[td.id] = []
        })
        return copyState
    case 'REMOVE-TASKS':
      return { ...state, [action.todolistId]: state[action.todolistId].filter((st) => st.id !== action.taskId) };
    case 'ADD-TASKS':
      const newTask: TaskType = {
        id: v1(),
        title: action.newTaskTitle,
        status: TaskStatuses.New,
        todoListId: action.todolistId,
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        addedDate: '',
        deadline: '',
        startDate: '',
      };
      return { ...state, [action.todolistId]: [newTask, ...state[action.todolistId]] };
    case 'CHANGE-TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((st) =>
          st.id === action.taskId
            ? {
                ...st,
                status: action.status,
              }
            : st,
        ),
      };
    case 'CHANGE-TASK-TITLE':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((st) =>
          st.id === action.taskId
            ? {
                ...st,
                title: action.title,
              }
            : st,
        ),
      };
    case 'ADD-TODOLIST':
      return { ...state, [action.todolistId]: [] };
    case 'REMOVE-TODOLIST':
      const endState = { ...state };
      delete endState[action.id];
      return endState;
    default:
      return state;
  }
};

export const removeTasksAC = (todolistId: string, taskId: string) => {
  return {
    type: 'REMOVE-TASKS',
    todolistId: todolistId,
    taskId: taskId,
  } as const;
};

export const addTasksAC = (todolistId: string, newTaskTitle: string) => {
  return {
    type: 'ADD-TASKS',
    todolistId: todolistId,
    newTaskTitle: newTaskTitle,
  } as const;
};

export const changeTasksStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
  return {
    type: 'CHANGE-TASK',
    taskId: taskId,
    todolistId: todolistId,
    status: status,
  } as const;
};

export const changeTasksTitleAC = (todolistId: string, taskId: string, title: string) => {
  return {
    type: 'CHANGE-TASK-TITLE',
    todolistId: todolistId,
    taskId: taskId,
    title: title,
  } as const;
};
