import React, { useCallback, useEffect } from 'react';
import './App.css';
import { TodoList } from './TodoList';
import AddItemForms from './components/AddItemForms';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  addTodolistTС,
  changeTodolistFilterAC,
  changeTodolistTitleTС,
  deleteTodolistTС,
  fetchTodolistTС,
  FilterType,
  TodoListDomainType,
} from './state/todolist-reducer';
import { addTaskTC, deleteTaskTC, updateTaskTC } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType, AppThunkType } from './state/store';
import { TaskStatuses, TaskType } from './api/todolist-api';

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedux() {
  const dispatch = useDispatch<AppThunkType>();
  const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>((state) => state.todolist);
  const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTodolistTС());
  }, []);

  const removeTodoList = useCallback(
    (todoListId: string) => {
      // удаление TodoList
      dispatch(deleteTodolistTС(todoListId));
    },
    [dispatch],
  );

  const removeTasks = useCallback(
    // Удаление таски
    (todoListId: string, taskId: string) => {
      dispatch(deleteTaskTC(todoListId, taskId));
    },
    [dispatch],
  );

  const addTask = useCallback(
    (todoListId: string, title: string) => {
      // Добавление таски
      dispatch(addTaskTC(todoListId, title));
    },
    [dispatch],
  );
  // Изменение значения title task за счёт превращения span в input
  const changeTaskTitle = useCallback(
    (todoListId: string, taskId: string, title: string) => {
      dispatch(updateTaskTC(todoListId, taskId, { title: title }));
    },
    [dispatch],
  );
  // Изменение чекеда
  const changeChecked = useCallback(
    (todoListId: string, taskId: string, status: TaskStatuses) => {
      dispatch(updateTaskTC(todoListId, taskId, { status: status }));
    },
    [dispatch],
  );

  const changeFilter = useCallback(
    (todoListId: string, filter: FilterType) => {
      // Изменение значения фильтра в todoLists
      const action = changeTodolistFilterAC(todoListId, filter);
      dispatch(action);
    },
    [dispatch],
  );
  //Функция изменения title todoList за счёт превращения span в input
  const changeTitleTodoList = useCallback(
    (todoListId: string, title: string) => {
      dispatch(changeTodolistTitleTС(todoListId, title));
    },
    [dispatch],
  );

  // Создание нового тодолиста
  const addTodoList = useCallback(
    (title: string) => {
      dispatch(addTodolistTС(title));
    },
    [dispatch],
  );
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
          <AddItemForms callBack={addTodoList} />
        </Grid>
        <Grid container spacing={3}>
          {todoLists.map((td) => {
            // Отрисовка компонент todoLists по map
            return (
              <Grid key={td.id} item>
                <Paper key={td.id} style={{ padding: '10px' }}>
                  <TodoList
                    key={td.id}
                    title={td.title}
                    tasks={tasks[td.id]}
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

export default AppWithRedux;
