import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

export type FilterType = 'all' | 'completed' | 'active'

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "Meat", isDone: true},
        {id: 2, title: "Fish", isDone: true},
        {id: 3, title: "Beer", isDone: false},
    ])
    const removeTasks = (id: number) => {
        let filterTasks = tasks.filter(t => t.id !== id)
        setTasks(filterTasks)
        console.log(filterTasks)
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
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
