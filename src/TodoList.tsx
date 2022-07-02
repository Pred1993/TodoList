import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {FilterType} from "./App";

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
}
export const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState <string | null> (null)
    // Отрисовка тасок методом Map
    const reactTodolist = props.tasks.map(t => {
        const onclickHandler = () => { // Функция-обработчик для вызова callback-функции удаления тасок
            props.removeTasks(props.todoListId, t.id)
        }
        const onChangeCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => { // Функция-обработчик для вызова callback-функции изменения чекеда
            props.changeChecked(props.todoListId, t.id, e.currentTarget.checked)
        }
        return <li className={t.isDone ? 'is-done' : ''} key={t.id}>
            <input type="checkbox" checked={t.isDone}
            onChange={onChangeCheckedHandler}
            />
            <span>{t.title}</span>
            <button onClick={onclickHandler}>x</button>
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
        //
    const onClickHandlerAddTask = () => { // Функция-обработчик для вызова callback-функции добавления новых тасок
        if (title.trim() === "") {
            setError('Title is required')
            return
        }
        props.addTask(props.todoListId, title.trim())
        setTitle('')
    }
    const onChangeHandlerTitle = (e: ChangeEvent<HTMLInputElement>) => { // Функция-обработчик для изменения title из импута в стейте
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandlerEnter = (e: KeyboardEvent<HTMLInputElement>) => { // Функция-обработчик для вызова callback-функции добавления новых тасок при помощи нажатия клавиши Enter
        setError(null)
        if (e.key === 'Enter') {
            onClickHandlerAddTask()
        }
    }
    const onclickHandlerRemoveTodoList = () => {//Функция-обработчик для вызова callback-функции удаления todoList
        props.removeTodoList(props.todoListId)
    }
    return (
        <div>
            <span>{props.title}</span><span><button onClick={onclickHandlerRemoveTodoList}>X</button></span>
            <div>
                <input
                    className={ error ? 'error': ''}
                    value={title}
                    onChange={onChangeHandlerTitle}
                    onKeyPress={onKeyPressHandlerEnter}
                />
                <button onClick={onClickHandlerAddTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {reactTodolist}
            </ul>
            <div>
                <button className={props.filter === 'all'?'active-filter': ''} onClick={onClickHandlerAll}>All</button>
                <button className={props.filter === 'completed'?'active-filter': ''} onClick={onClickHandlerCompleted}>Completed</button>
                <button className={props.filter === 'active'?'active-filter': ''} onClick={onClickHandlerActive}>Active</button>
            </div>
        </div>
    );
};
