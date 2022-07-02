import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterType = 'all' | 'completed' | 'active'
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterType
}

function App() {
    const todoListId1 = v1()
    const todoListId2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to eat', filter: 'all'},
        {id: todoListId2, title: 'What to learn', filter: 'all'},
    ])

    const [tasks, setTasks] = useState({
        [todoListId1]: [
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Fish", isDone: true},
            {id: v1(), title: "Beer", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
    })

    const removeTasks = (todoListId: string, taskId: string) => { // Удаление таски
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(td => td.id !== taskId)})
    }

    const addTask = (title: string) => {  // Добавление таски
        // const NewTask = {id: v1(), title: title, isDone: false}
        // setTasks([NewTask, ...tasks])
    }

    const changeChecked = (id: string, isDone: boolean) => {     // Изменение чекеда
        // setTasks(tasks.map(t => t.id === id ? {...t, isDone: isDone} : t))
    }

    const changeFilter = (todoListId: string, filter: FilterType) => { // Изменение значения фильтра в todoLists
        setTodoLists(todoLists.map(td => td.id === todoListId ? {...td, filter: filter} : td))
    }


    return (
        <div className="App">
            {todoLists.map(td => { // Отрисовка компонент todoLists по map
                let changeTasks = tasks[td.id]  // Фильтрация по новому значению фильтра
                if (td.filter === 'completed') {
                    changeTasks = tasks[td.id].filter(t => t.isDone)
                }
                if (td.filter === 'active') {
                    changeTasks = tasks[td.id].filter(t => !t.isDone)
                }
                return <TodoList
                        key={td.id}
                        title={td.title}
                              tasks={changeTasks}
                              removeTasks={removeTasks}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeChecked={changeChecked}
                              filter={td.filter}
                              todoListId={td.id}
                    />})}
        </div>
    );
}

export default App;
