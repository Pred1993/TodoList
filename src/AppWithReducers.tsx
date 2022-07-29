import React, {useReducer} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import AddItemForms from "./components/AddItemForms";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolist-reducer";
import {addTasksAC, changeTasksStatusAC, changeTasksTitleAC, removeTasksAC, tasksReducer} from "./state/tasks-reducer";

export type FilterType = 'all' | 'completed' | 'active'
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    const todoListId1 = v1()
    const todoListId2 = v1()
    const [todoLists, dispatchToTodoListsReducer] = useReducer(todolistsReducer,[
        {id: todoListId1, title: 'What to eat', filter: 'all'},
        {id: todoListId2, title: 'What to learn', filter: 'all'},
    ])

    const [tasks, dispatchToTasksReducer] =  useReducer(tasksReducer,{
        [todoListId1]: [
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Fish", isDone: true},
            {id: v1(), title: "Beer", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
    })
    const removeTodoList = (todoListId: string) => {// удаление TodoList
        const action = removeTodolistAC(todoListId)
        dispatchToTodoListsReducer(action)
        dispatchToTasksReducer(action)
    }

    const removeTasks = (todoListId: string, taskId: string) => { // Удаление таски
        const action = removeTasksAC(todoListId, taskId)
        dispatchToTasksReducer(action)
    }

    const addTask = (todoListId: string, title: string) => {  // Добавление таски
        const action = addTasksAC(todoListId, title)
        dispatchToTasksReducer(action)
    }
    // Изменение значения title task за счёт превращения span в input
    const changeTaskTitle = (todoListId: string, taskId: string, title: string) => {
        const action = changeTasksTitleAC(todoListId,taskId, title)
        dispatchToTasksReducer(action)
    }
    // Изменение чекеда
    const changeChecked = (todoListId: string, taskId: string, isDone: boolean) => {
        const action = changeTasksStatusAC(todoListId, taskId, isDone)
        dispatchToTasksReducer(action)
    }

    const changeFilter = (todoListId: string, filter: FilterType) => { // Изменение значения фильтра в todoLists
        const action = changeTodolistFilterAC(todoListId, filter)
        dispatchToTodoListsReducer(action)
    }
    //Функция изменения title todoList за счёт превращения span в input
    const changeTitleTodoList = (todoListId: string, title: string) => {
        const action = changeTodolistTitleAC(todoListId, title)
        dispatchToTodoListsReducer(action)
    }

    // Создание нового тодолиста
    const addTodoList = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTodoListsReducer(action)
        dispatchToTasksReducer(action)
    }
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: '10px' }}>
                    <AddItemForms callBack={(title) => addTodoList(title)}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(td => { // Отрисовка компонент todoLists по map
                        let changeTasks = tasks[td.id]  // Фильтрация по новому значению фильтра
                        if (td.filter === 'completed') {
                            changeTasks = tasks[td.id].filter(t => t.isDone)
                        }
                        if (td.filter === 'active') {
                            changeTasks = tasks[td.id].filter(t => !t.isDone)
                        }
                        return <Grid item><Paper style={ { padding: '10px' } }><TodoList
                            key={td.id}
                            title={td.title}
                            tasks={changeTasks}
                            removeTasks={removeTasks}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeChecked={changeChecked}
                            filter={td.filter}
                            todoListId={td.id}
                            removeTodoList={removeTodoList}
                            changeTaskTitle={changeTaskTitle}
                            changeTitleTodoList={changeTitleTodoList}
                        /></Paper></Grid>
                    })}</Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
