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
    const reactTodolist = props.tasks.map(t => {
        const onclickHandler = () => {
            props.removeTasks(t.id)
        }
        const onChangeCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
    const onClickHandlerAll = () => {
        props.changeFilter('all')
    }
    const onClickHandlerCompleted = () => {
        props.changeFilter('completed')
    }
    const onClickHandlerActive = () => {
        props.changeFilter('active')
    }
    const onClickHandlerAddTask = () => {
        if (title.trim() === "") {
            setError('Title is required')
            return
        }
        props.addTask(title.trim())
        setTitle('')
    }
    const onChangeHandlerTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandlerEnter = (e: KeyboardEvent<HTMLInputElement>) => {
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
