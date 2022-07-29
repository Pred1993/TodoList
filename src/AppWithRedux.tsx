import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import AddItemForms from "./components/AddItemForms";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolist-reducer";
import {addTasksAC, changeTasksStatusAC, changeTasksTitleAC, removeTasksAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootReducerType} from "./state/store";

export type FilterType = 'all' | 'completed' | 'active'
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootReducerType, Array<TodoListType>>(state => state.todolist)
    const tasks = useSelector<AppRootReducerType, TasksStateType>(state => state.tasks)

    const removeTodoList = (todoListId: string) => {// удаление TodoList
        const action = removeTodolistAC(todoListId)
        dispatch(action)
    }

    const removeTasks = (todoListId: string, taskId: string) => { // Удаление таски
        const action = removeTasksAC(todoListId, taskId)
        dispatch(action)
    }

    const addTask = (todoListId: string, title: string) => {  // Добавление таски
        const action = addTasksAC(todoListId, title)
        dispatch(action)
    }
    // Изменение значения title task за счёт превращения span в input
    const changeTaskTitle = (todoListId: string, taskId: string, title: string) => {
        const action = changeTasksTitleAC(todoListId,taskId, title)
        dispatch(action)
    }
    // Изменение чекеда
    const changeChecked = (todoListId: string, taskId: string, isDone: boolean) => {
        const action = changeTasksStatusAC(todoListId, taskId, isDone)
        dispatch(action)
    }

    const changeFilter = (todoListId: string, filter: FilterType) => { // Изменение значения фильтра в todoLists
        const action = changeTodolistFilterAC(todoListId, filter)
        dispatch(action)
    }
    //Функция изменения title todoList за счёт превращения span в input
    const changeTitleTodoList = (todoListId: string, title: string) => {
        const action = changeTodolistTitleAC(todoListId, title)
        dispatch(action)
    }

    // Создание нового тодолиста
    const addTodoList = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
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

export default AppWithRedux;
