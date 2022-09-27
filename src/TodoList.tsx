import React, { useCallback } from 'react';
import './App.css';
import AddItemForms from './components/AddItemForms';
import EditableSpan from './components/EditableSpan';
import { Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import Task from './components/Task';
import { TaskStatuses, TaskType } from './api/todolist-api';
import { FilterType } from './state/todolist-reducer';

type TodoListPropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTasks: (todoListId: string, taskId: string) => void;
  changeFilter: (todoListId: string, filter: FilterType) => void;
  addTask: (todoListId: string, title: string) => void;
  changeChecked: (todoListId: string, taskId: string, status: TaskStatuses) => void;
  filter: FilterType;
  todoListId: string;
  removeTodoList: (todoListId: string) => void;
  changeTaskTitle: (todoListId: string, taskId: string, title: string) => void;
  changeTitleTodoList: (todoListId: string, title: string) => void;
};
export const TodoList = React.memo((props: TodoListPropsType) => {
  console.log('Todolists is called');

  let changeTasks = props.tasks; // Фильтрация по новому значению фильтра
  if (props.filter === 'completed') {
    changeTasks = props.tasks.filter((t) => t.status === TaskStatuses.Completed);
  }
  if (props.filter === 'active') {
    changeTasks = props.tasks.filter((t) => t.status === TaskStatuses.New);
  }
  // Отрисовка тасок методом Map
  const reactTodolist = changeTasks.map((t) => {
    return (
      <Task
        key={t.id}
        task={t}
        removeTasks={props.removeTasks}
        todoListId={props.todoListId}
        changeChecked={props.changeChecked}
        changeTaskTitle={props.changeTaskTitle}
      />
    );
  });
  //
  // Функция-обработчик для вызова callback-функций изменения фильтров
  const onClickHandlerAll = useCallback(() => {
    props.changeFilter(props.todoListId, 'all');
  }, [props.changeFilter, props.todoListId]);
  const onClickHandlerCompleted = useCallback(() => {
    props.changeFilter(props.todoListId, 'completed');
  }, [props.changeFilter, props.todoListId]);
  const onClickHandlerActive = useCallback(() => {
    props.changeFilter(props.todoListId, 'active');
  }, [props.changeFilter, props.todoListId]);

  const onclickHandlerRemoveTodoList = () => {
    //Функция-обработчик для вызова callback-функции удаления todoList
    props.removeTodoList(props.todoListId);
  };
  // Промежуточная функция добавления тасок
  const addTask = useCallback(
    (title: string) => {
      props.addTask(props.todoListId, title);
    },
    [props.addTask, props.todoListId],
  );
  // Промежуточная функция изменения title todoList за счёт превращения span в input
  const onChangeTitleTodolistHandler = useCallback(
    (title: string) => {
      props.changeTitleTodoList(props.todoListId, title);
    },
    [props.changeTitleTodoList, props.todoListId],
  );
  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={onChangeTitleTodolistHandler} />
        <IconButton onClick={onclickHandlerRemoveTodoList} aria-label="delete">
          <Delete />
        </IconButton>
      </h3>
      <div>
        <AddItemForms callBack={addTask} />
      </div>
      <ul>{reactTodolist}</ul>
      <div>
        <Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={onClickHandlerAll}>
          All
        </Button>
        <Button
          variant={props.filter === 'completed' ? 'contained' : 'text'}
          color="success"
          onClick={onClickHandlerCompleted}
        >
          Completed
        </Button>
        <Button
          variant={props.filter === 'active' ? 'contained' : 'text'}
          color={'secondary'}
          onClick={onClickHandlerActive}
        >
          Active
        </Button>
      </div>
    </div>
  );
});
