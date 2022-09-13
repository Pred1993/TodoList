import React, { ChangeEvent, useCallback } from 'react';
import { Checkbox, IconButton } from '@mui/material';
import EditableSpan from './EditableSpan';
import { Delete } from '@mui/icons-material';
import { TaskType } from '../TodoList';
type TaskPropsType = {
  task: TaskType;
  removeTasks: (todoListId: string, taskId: string) => void;
  changeChecked: (todoListId: string, taskId: string, isDone: boolean) => void;
  changeTaskTitle: (todoListId: string, taskId: string, title: string) => void;
  todoListId: string;
};
const Task = React.memo((props: TaskPropsType) => {
  const onclickHandler = useCallback(() => {
    // Функция-обработчик для вызова callback-функции удаления тасок
    props.removeTasks(props.todoListId, props.task.id);
  }, [props.removeTasks, props.todoListId, props.task.id]);

  const onChangeCheckedHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      // Функция-обработчик для вызова callback-функции изменения чекеда
      props.changeChecked(props.todoListId, props.task.id, e.currentTarget.checked);
    },
    [props.todoListId, props.task.id],
  );

  // Промежуточная функция для изменение значения title task за счёт превращения span в input
  const onChangeTitleHandler = useCallback(
    (title: string) => {
      props.changeTaskTitle(props.todoListId, props.task.id, title);
    },
    [props.changeTaskTitle, props.todoListId, props.task.id],
  );
  return (
    <li className={props.task.isDone ? 'is-done' : ''}>
      <Checkbox
        color={'success'}
        checked={props.task.isDone}
        onChange={onChangeCheckedHandler}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <EditableSpan title={props.task.title} onChange={(title) => onChangeTitleHandler(title)} />
      <IconButton onClick={onclickHandler} aria-label="delete">
        <Delete />
      </IconButton>
    </li>
  );
});

export default Task;
