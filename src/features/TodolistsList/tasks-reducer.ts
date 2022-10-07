import { addTodolistAC, removeTodolistAC, setTodolistAC } from './todolist-reducer';
import { dataUpdateRequestType, tasksAPI, TaskType } from '../../api/todolist-api';
import { Dispatch } from 'redux';
import { AppRootStateType } from '../../app/store';
import { TasksStateType } from './TodolistsList';
import { setAppErrorAC, setAppStatusAC } from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

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

// reducer
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
      return { ...state, [action.todolistId]: [action.task, ...state[action.todolistId]] };
    case 'UPDATE-TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((st) =>
          st.id === action.taskId
            ? {
                ...st,
                ...action.dataUpdateRequest,
              }
            : st,
        ),
      };
    case 'ADD-TODOLIST':
      return { ...state, [action.todolist.id]: [] };
    case 'REMOVE-TODOLIST':
      const endState = { ...state };
      delete endState[action.todolistId];
      return endState;
    default:
      return state;
  }
};
// types
export type dataUpdateDomainRequestType = {
  title?: string;
  description?: null | string;
  status?: number;
  priority?: number;
  startDate?: null | string;
  deadline?: null | string;
};

export type ActionTaskType =
  | ReturnType<typeof removeTasksAC>
  | ReturnType<typeof addTasksAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof setTodolistAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setAppStatusAC>;

// actions
export const removeTasksAC = (todolistId: string, taskId: string) =>
  ({
    type: 'REMOVE-TASKS',
    todolistId,
    taskId,
  } as const);

export const addTasksAC = (todolistId: string, task: TaskType) => ({ type: 'ADD-TASKS', todolistId, task } as const);

export const updateTaskAC = (todolistId: string, taskId: string, dataUpdateRequest: dataUpdateDomainRequestType) =>
  ({
    type: 'UPDATE-TASK',
    todolistId,
    taskId,
    dataUpdateRequest,
  } as const);

export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) =>
  ({
    type: 'SET-TASKS',
    todolistId,
    tasks,
  } as const);

// thunks
export const fetchTasksTС = (todolistId: string) => (dispatch: Dispatch<ActionTaskType>) => {
  dispatch(setAppStatusAC('loading'));
  tasksAPI.getTasks(todolistId).then((response) => {
    dispatch(setTasksAC(todolistId, response.data.items));
    dispatch(setAppStatusAC('succeeded'));
  }).catch((error) => {
    handleServerNetworkError(error, dispatch)
  });
};

export const deleteTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch<ActionTaskType>) => {
  dispatch(setAppStatusAC('loading'));// для отрисовки загрузки во время связи с сервером (бегущая строка)
  // Удаление таски
  tasksAPI.DeleteTasks(todoListId, taskId).then((response) => {
    if (response.data.resultCode === 0) {const action = removeTasksAC(todoListId, taskId);
      dispatch(action);
      dispatch(setAppStatusAC('succeeded'));
    } else {
      handleServerAppError(response.data, dispatch)
    }
  }).catch((error) => {
    handleServerNetworkError(error, dispatch)
  });
};

export const addTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch<ActionTaskType>) => {
  dispatch(setAppStatusAC('loading'));
  tasksAPI.CreateTasks(todoListId, title).then((response) => {
    if (response.data.resultCode === 0) {
      const action = addTasksAC(todoListId, response.data.data.item);
      dispatch(action);
      dispatch(setAppStatusAC('succeeded'));
    } else {
      handleServerAppError(response.data, dispatch)
    }
  }).catch((error) => {
    handleServerNetworkError(error, dispatch)
  });
};

export const updateTaskTC = (todoListId: string, taskId: string, dataUpdateRequest: dataUpdateDomainRequestType) => {
  return (dispatch: Dispatch<ActionTaskType>, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC('loading'));
    const state = getState();
    const task = state.tasks[todoListId].find((t) => t.id === taskId); // дальше идет проверка в случае если таска не найдена
    if (task) {
      const model: dataUpdateRequestType = {
        title: task.title,
        status: task.status,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...dataUpdateRequest,
      };
      tasksAPI.UpdateTasks(todoListId, taskId, model).then((response) => {
        if (response.data.resultCode === 0) {const action = updateTaskAC(todoListId, taskId, dataUpdateRequest);
          dispatch(action);
          dispatch(setAppStatusAC('succeeded'));
        } else {
          handleServerAppError(response.data, dispatch)// обработка ошибок, которая приходит с сервера
        }
      }).catch((error) => {
        handleServerNetworkError(error, dispatch)// обработка ошибок из сети, допустим интернет рассоединился
      });
    }
  };
};
