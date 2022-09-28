import { TasksStateType } from '../App';
import { v1 } from 'uuid';

import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType } from './todolist-reducer';
import { TaskPriorities, tasksAPI, TaskStatuses, TaskType } from '../api/todolist-api';
import { Dispatch } from 'redux';

export type RemoveTasksActionType = ReturnType<typeof removeTasksAC>;

export type AddTasksActionType = ReturnType<typeof addTasksAC>;

export type ChangeTasksStatusActionType = ReturnType<typeof changeTasksStatusAC>;

export type ChangeTasksTitleActionType = ReturnType<typeof changeTasksTitleAC>;

export type SetTasksActionType = ReturnType<typeof setTasksAC>;

export type ActionTaskType =
  | RemoveTasksActionType
  | AddTasksActionType
  | ChangeTasksStatusActionType
  | ChangeTasksTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistActionType
  | SetTasksActionType;

const initialState: TasksStateType = {
  /*"todolistId1": [
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
    ]*/
};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionTaskType): TasksStateType => {
  switch (action.type) {
    case 'SET-TASKS':
      return { ...state, [action.todolistId]: action.tasks };
    case 'SET-TODOLIST':
      const copyState = { ...state };
      action.todolist.forEach((td) => {
        copyState[td.id] = [];
      });
      return copyState;
    case 'REMOVE-TASKS':
      return { ...state, [action.todolistId]: state[action.todolistId].filter((st) => st.id !== action.taskId) };
    case 'ADD-TASKS':
      // const newTask: TaskType = {
      //   id: v1(),
      //   title: action.task.title,
      //   status: TaskStatuses.New,
      //   todoListId: action.todolistId,
      //   description: '',
      //   order: 0,
      //   priority: TaskPriorities.Low,
      //   addedDate: '',
      //   deadline: '',
      //   startDate: '',
      // };
      return { ...state, [action.todolistId]: [action.task, ...state[action.todolistId]] };
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
      return { ...state, [action.todolist.id]: [] };
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

export const addTasksAC = (todolistId: string, task: TaskType) => {
  return {
    type: 'ADD-TASKS',
    todolistId: todolistId,
    task: task,
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

export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
  return {
    type: 'SET-TASKS',
    todolistId: todolistId,
    tasks: tasks,
  } as const;
};

export const fetchTasksTС = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistId).then((response) => {
      dispatch(setTasksAC(todolistId, response.data.items));
    });
  };
};

export const deleteTaskTC = (todoListId: string, taskId: string) => {
  return (dispatch: Dispatch) => {
    // Удаление таски
    tasksAPI.DeleteTasks(todoListId, taskId).then((response) => {
      const action = removeTasksAC(todoListId, taskId);
      dispatch(action);
    });
  }
}

export const addTaskTC = (todoListId: string, title: string) => {
  return (dispatch: Dispatch) => {
    tasksAPI.CreateTasks(todoListId, title).then((response) => {
      const action = addTasksAC(todoListId, response.data.data.item);
      dispatch(action);
    });
  }
}