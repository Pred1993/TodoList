import React, {useEffect, useState} from 'react'
import {tasksAPI, todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

        todolistAPI.getTodolist().then((response) => {
            debugger
            setState(response.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const title = 'Sveta'
    useEffect(() => {
        todolistAPI.CreateTodolist(title)
            .then((response) => {
                debugger
                setState(response.data.data.item)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '60865bd0-1763-476c-a475-9d336b60d75f'
    useEffect(() => {
        todolistAPI.DeleteTodolist(todolistId)
            .then((response) => {
                debugger
                setState(response.data.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const todolistId = '6d4e1092-e567-460c-99a4-40a4e4336501'
    const [state, setState] = useState<any>(null)
    const title = 'Dina'
    useEffect(() => {
        todolistAPI.UpdateTodolistTitle(todolistId, title)
            .then((response) => {
                debugger
                setState(response.data.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '5deacba5-7b31-4549-bb5b-927510436421'
    const count = 10
    const page = 1
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

        tasksAPI.getTasks(todolistId, count, page).then((response) => {
            debugger
            setState(response.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '5deacba5-7b31-4549-bb5b-927510436421'
    const title = 'React'
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

        tasksAPI.CreateTasks(todolistId, title).then((response) => {
            debugger
            setState(response.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '5deacba5-7b31-4549-bb5b-927510436421'
    const taskId = '1a1872a0-239c-4c71-ba12-1789d049335a'
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

        tasksAPI.DeleteTasks(todolistId, taskId).then((response) => {
            debugger
            setState(response.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '5deacba5-7b31-4549-bb5b-927510436421'
    const taskId = '49d84f77-86b6-4d73-bdc7-f662e506686e'
    const dataUpdateRequest = {
        title: 'LoL',
        description: null,
        status: 0,
        priority: 1,
        startDate: null,
        deadline: null,
    }
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

        tasksAPI.UpdateTasks(todolistId, taskId, dataUpdateRequest).then((response) => {
            debugger
            setState(response.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}