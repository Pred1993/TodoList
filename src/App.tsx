import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {
    const tasks1: Array<TaskType> = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: true}
    ]
    const tasks2: Array<TaskType> = [
        {id: 1, title: 'How I Met Your Mother', isDone: true},
        {id: 2, title: 'Pride and Prejudice', isDone: true},
        {id: 3, title: 'he Fault in Our Stars', isDone: false}
    ]
    return (
        <div className="App">
            <Todolist title={"What to learn"} tasks={tasks1}/>
            <Todolist title={"What to see"} tasks={tasks2}/>
        </div>
    );
}

export default App;
