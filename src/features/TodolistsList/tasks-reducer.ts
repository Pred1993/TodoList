import {dataUpdateRequestType, TaskDomainType, tasksAPI, TaskType} from '../../api/todolist-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../../app/store';
import {TasksStateType} from './TodolistsList';
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {addTodolistAC, removeTodolistAC, setTodolistAC} from "./todolist-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
      removeTasksAC(state, action: PayloadAction<{ todolistId: string, taskId: string }>) {
        const index = state[action.payload.todolistId].findIndex(el => el.id === action.payload.taskId)
        if (index > -1) {
          state[action.payload.todolistId].splice(index, 1)
        }

      },
      addTasksAC(state, action: PayloadAction<{ todolistId: string, task: TaskType }>) {
        const newTask: TaskDomainType = {...action.payload.task, entityStatus: 'idle'};
        state[action.payload.todolistId].unshift(newTask)
      },
      updateTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string, dataUpdateRequest: dataUpdateDomainRequestType }>) {
        const task = state[action.payload.todolistId]
        const index = task.findIndex(el => el.id === action.payload.taskId)
        if (index > -1) {
          task[index] = {...task[index], ...action.payload.dataUpdateRequest}
        }
      },
      setTasksAC(state, action: PayloadAction<{ todolistId: string, tasks: Array<TaskType>, entityStatus: RequestStatusType }>) {
        const tasks = action.payload.tasks.map(el => ({...el, entityStatus: action.payload.entityStatus}))
        state[action.payload.todolistId] = tasks
      },
      changeTaskEntityStatusAC(state, action: PayloadAction<{ todolistId: string, taskId: string, entityStatus: RequestStatusType }>) {
        const task = state[action.payload.todolistId]
        const index = task.findIndex(el => el.id === action.payload.taskId)
        if (index > -1) {
          task[index].entityStatus = action.payload.entityStatus
        }
      }
    },
    extraReducers: (builder) => {
      builder.addCase(addTodolistAC, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      builder.addCase(setTodolistAC, (state, action) => {
        action.payload.todolist.forEach(el => {
          state[el.id] = []
        })
      })
      builder.addCase(removeTodolistAC, (state, action) => {
        delete state[action.payload.todolistId]
      })
    }
  }
)


// reducer
export const tasksReducer = slice.reducer

// types
export type dataUpdateDomainRequestType = {
  title?: string;
  description?: null | string;
  status?: number;
  priority?: number;
  startDate?: null | string;
  deadline?: null | string;
};

// actions
export const {setTasksAC, addTasksAC, updateTaskAC, removeTasksAC, changeTaskEntityStatusAC} = slice.actions

// thunks
export const fetchTasksTС = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({status: "loading"}));
  tasksAPI
    .getTasks(todolistId)
    .then((response) => {
      dispatch(setTasksAC({todolistId: todolistId, tasks: response.data.items, entityStatus: "idle"}));
      dispatch(setAppStatusAC({status: "succeeded"}));
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const deleteTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({status: "loading"})); // для отрисовки загрузки во время связи с сервером (бегущая строка)
  dispatch(changeTaskEntityStatusAC({todolistId: todoListId, taskId: taskId, entityStatus: 'loading'}));
  tasksAPI
    .DeleteTasks(todoListId, taskId)
    .then((response) => {
      if (response.data.resultCode === 0) {
        const action = removeTasksAC({todolistId: todoListId, taskId: taskId});
        dispatch(action);
        dispatch(setAppStatusAC({status: "succeeded"}));
      } else {
        handleServerAppError(response.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const addTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({status: "loading"}));
  tasksAPI
    .CreateTasks(todoListId, title)
    .then((response) => {
      if (response.data.resultCode === 0) {
        const action = addTasksAC( {todolistId: todoListId, task: response.data.data.item} );
        dispatch(action);
        dispatch(setAppStatusAC({status: "succeeded"}));
      } else {
        handleServerAppError(response.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const updateTaskTC = (todoListId: string, taskId: string, dataUpdateRequest: dataUpdateDomainRequestType) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC({status: "loading"}));
    dispatch(changeTaskEntityStatusAC({todolistId: todoListId, taskId: taskId, entityStatus: 'loading'}));
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
      tasksAPI
        .UpdateTasks(todoListId, taskId, model)
        .then((response) => {
          if (response.data.resultCode === 0) {
            const action = updateTaskAC( {taskId: taskId, todolistId: todoListId, dataUpdateRequest: dataUpdateRequest});
            dispatch(action);
            dispatch(setAppStatusAC({status: "succeeded"}));
          } else {
            handleServerAppError(response.data, dispatch); // обработка ошибок, которая приходит с сервера
          }
        })
        .catch((error) => {
          handleServerNetworkError(error, dispatch); // обработка ошибок из сети, допустим интернет рассоединился
        })
        .finally(() => {
          dispatch(changeTaskEntityStatusAC({todolistId: todoListId, taskId: taskId, entityStatus: 'idle'}));
        });
    }
  };
};
