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
    removeTasks: (id: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
    changeChecked: (id: string, isDone: boolean) => void
    filter: FilterType
}
export const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState <string | null> (null)
    // Отрисовка тасок методом Map
    const reactTodolist = props.tasks.map(t => {
        const onclickHandler = () => { // Функция-обработчик для вызова callback-функции удаления тасок
            props.removeTasks(t.id)
        }
        const onChangeCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => { // Функция-обработчик для вызова callback-функции изменения чекеда
            props.changeChecked(t.id, e.currentTarget.checked)
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
        props.changeFilter('all')
    }
    const onClickHandlerCompleted = () => {
        props.changeFilter('completed')
    }
    const onClickHandlerActive = () => {
        props.changeFilter('active')
    }
        //
    const onClickHandlerAddTask = () => { // Функция-обработчик для вызова callback-функции добавления новых тасок
        if (title.trim() === "") {
            setError('Title is required')
            return
        }
        props.addTask(title.trim())
        setTitle('')
    }
    const onChangeHandlerTitle = (e: ChangeEvent<HTMLInputElement>) => { // Функция-обработчик для изменения title из импута в стейте
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandlerEnter = (e: KeyboardEvent<HTMLInputElement>) => { // Функция-обработчик для вызова callback-функции добавления новых тасок при помощи нажатия кдлавиши Enter
        setError(null)
        if (e.key === 'Enter') {
            onClickHandlerAddTask()
        }
    }
    return (
        <div>
            <h3>{props.title}</h3>
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
