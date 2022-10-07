import React, { useState } from 'react';
import '../app/App.css';
import { TodoList } from '../features/TodolistsList/TodoList/TodoList';
import { v1 } from 'uuid';
import AddItemForms from '../components/AddItemForms/AddItemForms';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { FilterType, TodoListDomainType } from '../features/TodolistsList/todolist-reducer';
import { TaskPriorities, TaskStatuses, TaskType } from '../api/todolist-api';

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App1() {
  const todoListId1 = v1();
  const todoListId2 = v1();
  const [todoLists, setTodoLists] = useState<Array<TodoListDomainType>>([
    { id: todoListId1, title: 'What to eat', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle' },
    { id: todoListId2, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle' },
  ]);

  const [tasks, setTasks] = useState<TasksStateType>({
    [todoListId1]: [
      {
        id: v1(),
        title: 'Meat',
        status: TaskStatuses.Completed,
        todoListId: todoListId1,
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        addedDate: '',
        deadline: '',
        startDate: '',
      },
      {
        id: v1(),
        title: 'Fish',
        status: TaskStatuses.Completed,
        todoListId: todoListId1,
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        addedDate: '',
        deadline: '',
        startDate: '',
      },
      {
        id: v1(),
        title: 'Beer',
        status: TaskStatuses.New,
        todoListId: todoListId1,
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        addedDate: '',
        deadline: '',
        startDate: '',
      },
    ],
    [todoListId2]: [
      {
        id: v1(),
        title: 'Meat',
        status: TaskStatuses.Completed,
        todoListId: todoListId2,
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        addedDate: '',
        deadline: '',
        startDate: '',
      },
      {
        id: v1(),
        title: 'Fish',
        status: TaskStatuses.Completed,
        todoListId: todoListId2,
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        addedDate: '',
        deadline: '',
        startDate: '',
      },
      {
        id: v1(),
        title: 'Beer',
        status: TaskStatuses.New,
        todoListId: todoListId2,
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        addedDate: '',
        deadline: '',
        startDate: '',
      },
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
    const newTask = {
      id: v1(),
      title: title,
      status: TaskStatuses.New,
      todoListId: todoListId,
      description: '',
      order: 0,
      priority: TaskPriorities.Low,
      addedDate: '',
      deadline: '',
      startDate: '',
    };
    setTasks({ ...tasks, [todoListId]: [newTask, ...tasks[todoListId]] });
  };
  // Изменение значения title task за счёт превращения span в input
  const changeTaskTitle = (todoListId: string, taskId: string, title: string) => {
    setTasks({ ...tasks, [todoListId]: tasks[todoListId].map((t) => (t.id === taskId ? { ...t, title: title } : t)) });
  };
  // Изменение чекеда
  const changeChecked = (todoListId: string, taskId: string, status: TaskStatuses) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((td) => (td.id === taskId ? { ...td, status: status } : td)),
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
    const newTodoList: TodoListDomainType = {
      id: v1(),
      title: title,
      filter: 'all',
      addedDate: '',
      order: 0,
      entityStatus: 'idle',
    };
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
              changeTasks = tasks[td.id].filter((t) => t.status === TaskStatuses.Completed);
            }
            if (td.filter === 'active') {
              changeTasks = tasks[td.id].filter((t) => t.status === TaskStatuses.New);
            }
            return (
              <Grid item>
                <Paper style={{ padding: '10px' }}>
                  <TodoList
                    todoList={td}
                    key={td.id}
                    tasks={changeTasks}
                    removeTasks={removeTasks}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeChecked={changeChecked}
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

export default App1;
