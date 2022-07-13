import React, {ChangeEvent} from 'react';
import './App.css';
import {FilterType} from "./App";
import AddItemForms from "./components/AddItemForms";
import EditableSpan from "./components/EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (todoListId: string, taskId: string) => void
    changeFilter: (todoListId: string, filter: FilterType) => void
    addTask: (todoListId: string, title: string) => void
    changeChecked: (todoListId: string, taskId: string, isDone: boolean) => void
    filter: FilterType
    todoListId: string
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (todoListId: string, taskId: string, title: string) => void
    changeTitleTodoList: (todoListId: string, title: string) => void
}
export const TodoList = (props: TodoListPropsType) => {

    // Отрисовка тасок методом Map
    const reactTodolist = props.tasks.map(t => {
        const onclickHandler = () => { // Функция-обработчик для вызова callback-функции удаления тасок
            props.removeTasks(props.todoListId, t.id)
        }
        const onChangeCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => { // Функция-обработчик для вызова callback-функции изменения чекеда
            props.changeChecked(props.todoListId, t.id, e.currentTarget.checked)
        }
        // Промежуточная функция для изменение значения title task за счёт превращения span в input
        const onChangeTitleHandler = (title: string) => {
            props.changeTaskTitle(props.todoListId, t.id, title)
        }
        return <li className={t.isDone ? 'is-done' : ''} key={t.id}>
            <Checkbox
                color={"success"}
                checked={t.isDone}
                onChange={onChangeCheckedHandler}
                inputProps={{ 'aria-label': 'controlled' }}
            />
            <EditableSpan title={t.title} onChange={(title)=>onChangeTitleHandler(title)}/>
            <IconButton onClick={onclickHandler} aria-label="delete">
                <Delete />
            </IconButton>
        </li>
    })
        //
        // Функция-обработчик для вызова callback-функций изменения фильтров
    const onClickHandlerAll = () => {
        props.changeFilter(props.todoListId, 'all')
    }
    const onClickHandlerCompleted = () => {
        props.changeFilter(props.todoListId,'completed')
    }
    const onClickHandlerActive = () => {
        props.changeFilter(props.todoListId,'active')
    }

    const onclickHandlerRemoveTodoList = () => {//Функция-обработчик для вызова callback-функции удаления todoList
        props.removeTodoList(props.todoListId)
    }
    // Промежуточная функция добавления тасок
    const addTask = (title: string) => {
        props.addTask(props.todoListId, title)
    }
    // Промежуточная функция изменения title todoList за счёт превращения span в input
    const onChangeTitleTodolistHandler = (title: string) => {
        props.changeTitleTodoList(props.todoListId, title)
    }
    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={(title) => onChangeTitleTodolistHandler(title)}/>
                <IconButton onClick={onclickHandlerRemoveTodoList} aria-label="delete">
                    <Delete />
                </IconButton>
            </h3>
            <div>
                <AddItemForms callBack={(title:string) => addTask(title)}/>
            </div>
            <ul>
                {reactTodolist}
            </ul>
            <div>
                <Button variant={props.filter === 'all'?'contained': 'text'}  onClick={onClickHandlerAll}>All</Button>
                <Button variant={props.filter === 'completed'?'contained': 'text'} color="success" onClick={onClickHandlerCompleted}>Completed</Button>
                <Button variant={props.filter === 'active'?'contained': 'text'} color={"secondary"} onClick={onClickHandlerActive}>Active</Button>
            </div>
        </div>
    );
};
