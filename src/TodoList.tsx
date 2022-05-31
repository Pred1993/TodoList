import React from 'react';
import './App.css';
import {FilterType} from "./App";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (id: number) => void
    changeFilter: (filter: FilterType) => void
}
export const TodoList = (props: TodoListPropsType) => {
    const reactTodolist = props.tasks.map(t => <li key={t.id}><input type="checkbox" checked={t.isDone}/>
        <span>{t.title}</span>
        <button onClick={() => {
            props.removeTasks(t.id)
        }}>x
        </button>
    </li>)
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {reactTodolist}
            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter('all')
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter('completed')
                }}>Completed
                </button>
                <button onClick={() => {
                    props.changeFilter('active')
                }}>Active
                </button>
            </div>
        </div>
    );
};
