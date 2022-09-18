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
    const [title, setTitle] = useState<any>(null)
    // useEffect(() => {
    // }, [])
    const CreateTodolistHandler = () => {
        todolistAPI.CreateTodolist(title)
            .then((response) => {
                debugger
                setState(response.data.data.item)
            })
    }
    return <div>
        {JSON.stringify(state)}
        <div>
            <button onClick={CreateTodolistHandler}>CreateTodolist</button>
            <input value={title} placeholder={'title'} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('60865bd0-1763-476c-a475-9d336b60d75f')
    // useEffect(() => {
    // }, [])
    const DeleteTodolistHandler = () => {
        todolistAPI.DeleteTodolist(todolistId)
            .then((response) => {
                debugger
                setState(response.data.data)
            })
    }
    return <div>
        {JSON.stringify(state)}
        <div>
            Todolist: <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
            <button onClick={DeleteTodolistHandler}>DeleteTodolist</button>
        </div>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('6d4e1092-e567-460c-99a4-40a4e4336501')
    const [title, setTitle] = useState<any>('Avram')

    useEffect(() => {
    }, [])
    const UpdateTodolistTitleHandler = () => {
        todolistAPI.UpdateTodolistTitle(todolistId, title)
            .then((response) => {
                debugger
                setState(response.data.data)
            })
    }
    return <div>
        {JSON.stringify(state)}
        <div>
            Todolist: <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
            Title: <input value={title} placeholder={'title'} onChange={(e) => {
            setTitle(e.currentTarget.value)
        }}/>
            <button onClick={UpdateTodolistTitleHandler}>UpdateTodolistTitle</button>
        </div>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('a08ee21f-155a-48d2-b958-d02abeb762ff')
    const count = 10
    const page = 1
    // useEffect(() => {
    //     // здесь мы будем делать запрос и ответ закидывать в стейт.
    //     // который в виде строки будем отображать в div-ке
    // }, [])
    const GetTasksHandler = () => {
        tasksAPI.getTasks(todolistId, count, page).then((response) => {
            debugger
            setState(response.data)
        })
    }
    return <div>
        {JSON.stringify(state)}
        <button onClick={GetTasksHandler}>GetTasks</button>
        Todolist: <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
        setTodolistId(e.currentTarget.value)
    }}/>
    </div>
}

export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('a08ee21f-155a-48d2-b958-d02abeb762ff')
    const [taskTitle, setTaskTitle] = useState<any>('Oleg')
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])
    const CreateTasksHandler = () => {
        tasksAPI.CreateTasks(todolistId, taskTitle).then((response) => {
            debugger
            setState(response.data)
        })
    }
    return <div>
        {JSON.stringify(state)}
        <div>
            <button onClick={CreateTasksHandler}>CreateTasks</button>
            Todolist: <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
            Title: <input value={taskTitle} placeholder={'title'} onChange={(e) => {
            setTaskTitle(e.currentTarget.value)
        }}/>

        </div>
    </div>
}

export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('5deacba5-7b31-4549-bb5b-927510436421')
    const [taskId, setTaskId] = useState<any>('1a1872a0-239c-4c71-ba12-1789d049335a')
    // useEffect(() => {
    //     // здесь мы будем делать запрос и ответ закидывать в стейт.
    //     // который в виде строки будем отображать в div-ке
    //
    //
    // }, [])
    const DeleteTasksHandler = () => {
        const todolistId = '5deacba5-7b31-4549-bb5b-927510436421'
        tasksAPI.DeleteTasks(todolistId, taskId).then((response) => {
            debugger
            setState(response.data)
        })
    }
    return <div> {JSON.stringify(state)}
        <div>
            Todolist: <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
            Tasks: <input placeholder={'taskId'} value={taskId} onChange={(e) => {
            setTaskId(e.currentTarget.value)
        }}/>
            <button onClick={DeleteTasksHandler}>DeleteTasks</button>
        </div>
    </div>
}

export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('a08ee21f-155a-48d2-b958-d02abeb762ff')
    const [taskId, setTaskId] = useState<any>('99d10f53-06aa-4da7-a7ec-bcfe21862c8e')
    const dataUpdateRequest = {
        title: 'Ha-Ha',
        description: '',
        status: 0,
        priority: 1,
        startDate: '',
        deadline: '',
    }
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])
    const UpdateTasksHandler = () => {
        tasksAPI.UpdateTasks(todolistId, taskId, dataUpdateRequest).then((response) => {
            debugger
            setState(response.data)
        })
    }
    return <div>
        {JSON.stringify(state)}
        <div>
            <button onClick={UpdateTasksHandler}>UpdateTasks</button>
            Todolist: <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
            Task: <input placeholder={'todolistId'} value={taskId} onChange={(e) => {
            setTaskId(e.currentTarget.value)
        }}/>
        </div>
    </div>
}