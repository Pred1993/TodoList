import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterType = 'all' | 'completed' | 'active'

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "Meat", isDone: true},
        {id: v1(), title: "Fish", isDone: true},
        {id: v1(), title: "Beer", isDone: false},
    ])
    const removeTasks = (id: string) => {
        let filterTasks = tasks.filter(t => t.id !== id)
        setTasks(filterTasks)
    }
    const addTask = (title: string) => {
        const NewTask = {id: v1(), title: title, isDone: false}
        setTasks([NewTask, ...tasks])
    }

    const changeChecked = (id: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === id ? {...t, isDone: isDone} : t))
    }
    const [filter, setFilter] = useState<FilterType>('all')
    const changeFilter = (filter: FilterType) => {
        setFilter(filter)
    }
    let changeTasks = tasks
    if (filter === 'completed') {
        changeTasks = tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
        changeTasks = tasks.filter(t => !t.isDone)
    }
    return (
        <div className="App">

            <TodoList title={'What to eat'}
                      tasks={changeTasks}
                      removeTasks={removeTasks}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeChecked={changeChecked}
                      filter={filter}/>


        </div>
    );
}

export default App;
