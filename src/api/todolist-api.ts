import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '109cdbd6-571a-45e5-80a2-833676b0684d'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})
export type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

export type ResponseType<T> = {
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
    data: T
}

export const todolistAPI = {
    getTodolist() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    CreateTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title})
    },
    DeleteTodolist(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    UpdateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title: title})
    }

}

export type TaskType = {
    addedDate: string
    deadline: null | string
    description: null | string
    id: string
    order: number
    priority: number
    startDate: null | string
    status: number
    title: string
    todoListId: string
}

export type GetTasksResponseType = {
    error: string | null
    items: TaskType[]
    totalCount: number
}

export type dataUpdateRequestType = {
    title: string
    description: null | string
    status: number
    priority: number
    startDate: null | string
    deadline: null | string
}

export const tasksAPI = {
    getTasks(todolistId: string, count: number, page: number) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks?count=${count}&page=${page}`)
    },
    CreateTasks(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    DeleteTasks(todolistId: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    UpdateTasks(todolistId: string, taskId: string, dataUpdateRequest: dataUpdateRequestType) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`, dataUpdateRequest)
    },
}
