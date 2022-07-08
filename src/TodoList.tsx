import React, {ChangeEvent} from 'react';
import './App.css';
import {FilterType} from "./App";
import AddItemForms from "./components/AddItemForms";
import EditableSpan from "./components/EditableSpan";

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
            <input type="checkbox" checked={t.isDone}
            onChange={onChangeCheckedHandler}
            />
            <EditableSpan title={t.title} onChange={(title)=>onChangeTitleHandler(title)}/>
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
                <button onClick={onclickHandlerRemoveTodoList}>X</button>
            </h3>
            <div>
                <AddItemForms callBack={(title:string) => addTask(title)}/>
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
