import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType, AppThunkType } from '../../app/store';
import {
  addTodolistTС,
  changeTodolistFilterAC,
  changeTodolistTitleTС,
  deleteTodolistTС,
  fetchTodolistTС,
  FilterType,
  TodoListDomainType,
} from './todolist-reducer';
import { addTaskTC, deleteTaskTC, updateTaskTC } from './tasks-reducer';
import { TaskStatuses, TaskType } from '../../api/todolist-api';

import { Grid, Paper } from '@mui/material';
import AddItemForms from '../../components/AddItemForms/AddItemForms';
import { TodoList } from './TodoList/TodoList';
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

const TodolistsList = () => {
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
    <>
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
      );
    </>
  );
};

export default TodolistsList;
