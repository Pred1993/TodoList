import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {
  addTodolistTС,
  changeTodolistFilterAC,
  changeTodolistTitleTС,
  deleteTodolistTС,
  fetchTodolistTС,
  FilterType,
  TodoListDomainType,
} from './todolist-reducer';
import {addTaskTC, deleteTaskTC, updateTaskTC} from './tasks-reducer';
import {TaskDomainType, TaskStatuses} from '../../api/todolist-api';

import {Grid, Paper} from '@mui/material';
import AddItemForms from '../../components/AddItemForms/AddItemForms';
import {TodoList} from './TodoList/TodoList';
import {Navigate} from 'react-router-dom';


export type TasksStateType = {
  [key: string]: Array<TaskDomainType>;
};
type PropsType = {
  demo?: boolean;
};

const TodolistsList = ({demo = false}: PropsType) => {
  const dispatch = useDispatch<any>();
  const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>((state) => state.todolist);
  const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks);
  const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
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
    (todoListId: string, taskId: string) => {
      dispatch(deleteTaskTC(todoListId, taskId));
    },
    [dispatch],
  );

  const addTask = useCallback(
    (todoListId: string, title: string) => {
      dispatch(addTaskTC(todoListId, title));
    },
    [dispatch],
  );

  const changeTaskTitle = useCallback(
    (todoListId: string, taskId: string, title: string) => {
      dispatch(updateTaskTC(todoListId, taskId, {title: title}));
    },
    [dispatch],
  );

  const changeChecked = useCallback(
    (todoListId: string, taskId: string, status: TaskStatuses) => {
      dispatch(updateTaskTC(todoListId, taskId, {status: status}));
    },
    [dispatch],
  );

  const changeFilter = useCallback(
    (todoListId: string, filter: FilterType) => {
      const action = changeTodolistFilterAC({todolistId: todoListId, filter: filter});
      dispatch(action);
    },
    [dispatch],
  );

  const changeTitleTodoList = useCallback(
    (todoListId: string, title: string) => {
      dispatch(changeTodolistTitleTС(todoListId, title));
    },
    [dispatch],
  );

  const addTodoList = useCallback(
    (title: string) => {
      dispatch(addTodolistTС(title));
    },
    [dispatch],
  );
  if (!isLoggedIn) {
    return <Navigate to={'/login'}/>;
  }

  return (
    <>
      <Grid container style={{padding: '10px'}}>
        <AddItemForms callBack={addTodoList}/>
      </Grid>
      <Grid container spacing={3}>
        {todoLists.map((td) => {
          return (
            <Grid key={td.id} item>
              <Paper key={td.id} style={{padding: '10px'}}>
                <TodoList
                  todoList={td}
                  key={td.id}
                  tasks={tasks[td.id]}
                  removeTasks={removeTasks}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeChecked={changeChecked}
                  removeTodoList={removeTodoList}
                  changeTaskTitle={changeTaskTitle}
                  changeTitleTodoList={changeTitleTodoList}
                  demo={demo}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default TodolistsList;
