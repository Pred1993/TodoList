import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './TodoList';
import { v1 } from 'uuid';
import AddItemForms from './components/AddItemForms';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export type FilterType = 'all' | 'completed' | 'active';
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterType;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  const todoListId1 = v1();
  const todoListId2 = v1();
  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId1, title: 'What to eat', filter: 'all' },
    { id: todoListId2, title: 'What to learn', filter: 'all' },
  ]);

  const [tasks, setTasks] = useState<TasksStateType>({
    [todoListId1]: [
      { id: v1(), title: 'Meat', isDone: true },
      { id: v1(), title: 'Fish', isDone: true },
      { id: v1(), title: 'Beer', isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: 'HTML & CSS', isDone: true },
      { id: v1(), title: 'React', isDone: true },
      { id: v1(), title: 'JS', isDone: false },
    ],
  });
  const removeTodoList = (todoListId: string) => {
    // удаление TodoList
    setTodoLists(todoLists.filter((td) => td.id !== todoListId));
    delete tasks[todoListId];
  };

  const removeTasks = (todoListId: string, taskId: string) => {
    // Удаление таски
    setTasks({ ...tasks, [todoListId]: tasks[todoListId].filter((td) => td.id !== taskId) });
  };

  const addTask = (todoListId: string, title: string) => {
    // Добавление таски
    const newTask = { id: v1(), title: title, isDone: false };
    setTasks({ ...tasks, [todoListId]: [newTask, ...tasks[todoListId]] });
  };
  // Изменение значения title task за счёт превращения span в input
  const changeTaskTitle = (todoListId: string, taskId: string, title: string) => {
    setTasks({ ...tasks, [todoListId]: tasks[todoListId].map((t) => (t.id === taskId ? { ...t, title: title } : t)) });
  };
  // Изменение чекеда
  const changeChecked = (todoListId: string, taskId: string, isDone: boolean) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((td) => (td.id === taskId ? { ...td, isDone: isDone } : td)),
    });
  };

  const changeFilter = (todoListId: string, filter: FilterType) => {
    // Изменение значения фильтра в todoLists
    setTodoLists(todoLists.map((td) => (td.id === todoListId ? { ...td, filter: filter } : td)));
  };
  //Функция изменения title todoList за счёт превращения span в input
  const changeTitleTodoList = (todoListId: string, title: string) => {
    setTodoLists(todoLists.map((td) => (td.id === todoListId ? { ...td, title: title } : td)));
  };

  // Создание нового тодолиста
  const addTodoList = (title: string) => {
    const newTodoList: TodoListType = { id: v1(), title: title, filter: 'all' };
    setTodoLists([newTodoList, ...todoLists]);
    setTasks({ ...tasks, [newTodoList.id]: [] });
  };
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: '10px' }}>
          <AddItemForms callBack={(title) => addTodoList(title)} />
        </Grid>
        <Grid container spacing={3}>
          {todoLists.map((td) => {
            // Отрисовка компонент todoLists по map
            let changeTasks = tasks[td.id]; // Фильтрация по новому значению фильтра
            if (td.filter === 'completed') {
              changeTasks = tasks[td.id].filter((t) => t.isDone);
            }
            if (td.filter === 'active') {
              changeTasks = tasks[td.id].filter((t) => !t.isDone);
            }
            return (
              <Grid item>
                <Paper style={{ padding: '10px' }}>
                  <TodoList
                    key={td.id}
                    title={td.title}
                    tasks={changeTasks}
                    removeTasks={removeTasks}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeChecked={changeChecked}
                    filter={td.filter}
                    todoListId={td.id}
                    removeTodoList={removeTodoList}
                    changeTaskTitle={changeTaskTitle}
                    changeTitleTodoList={changeTitleTodoList}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
