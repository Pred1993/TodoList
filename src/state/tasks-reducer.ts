import {TasksStateType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../TodoList";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";

export type RemoveTasksActionType = ReturnType<typeof removeTasksAC>

export type AddTasksActionType = ReturnType<typeof addTasksAC>

export type ChangeTasksStatusActionType = ReturnType<typeof changeTasksStatusAC>

export type ChangeTasksTitleActionType = ReturnType<typeof changeTasksTitleAC>

export type ActionType =
    RemoveTasksActionType
    | AddTasksActionType
    | ChangeTasksStatusActionType
    | ChangeTasksTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType


export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASKS':
            return {...state, [action.todolistId]: state[action.todolistId].filter((st) => st.id !== action.taskId)}
        case 'ADD-TASKS':
            const newTask: TaskType = {id: v1(), title: action.newTaskTitle, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        case 'CHANGE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((st) => st.id === action.taskId ? {
                    ...st,
                    isDone: action.isDone
                } : st)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((st) => st.id === action.taskId ? {
                    ...st,
                    title: action.title
                } : st)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}
        case 'REMOVE-TODOLIST':
            const endState = {...state}
            delete endState[action.id]
            return endState
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const removeTasksAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASKS',
        todolistId: todolistId,
        taskId: taskId
    } as const
}

export const addTasksAC = (todolistId: string, newTaskTitle: string) => {
    return {
        type: 'ADD-TASKS',
        todolistId: todolistId,
        newTaskTitle: newTaskTitle
    } as const
}

export const changeTasksStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK',
        taskId: taskId,
        todolistId: todolistId,
        isDone: isDone
    } as const
}

export const changeTasksTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        todolistId: todolistId,
        taskId: taskId,
        title: title
    } as const
}