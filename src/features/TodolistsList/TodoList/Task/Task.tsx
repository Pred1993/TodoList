import React, { ChangeEvent, useCallback } from 'react';
import { Checkbox, IconButton } from '@mui/material';
import EditableSpan from '../../../../components/EditableSpan/EditableSpan';
import { Delete } from '@mui/icons-material';
import { TaskStatuses, TaskType } from '../../../../api/todolist-api';
import { RequestStatusType } from '../../../../app/app-reducer';

type TaskPropsType = {
  task: TaskType;
  removeTasks: (todoListId: string, taskId: string) => void;
  changeChecked: (todoListId: string, taskId: string, status: TaskStatuses) => void;
  changeTaskTitle: (todoListId: string, taskId: string, title: string) => void;
  todoListId: string;
  entityStatus: RequestStatusType;
};
const Task = React.memo((props: TaskPropsType) => {
  const onclickHandler = useCallback(() => {
    // Функция-обработчик для вызова callback-функции удаления тасок
    props.removeTasks(props.todoListId, props.task.id);
  }, [props.removeTasks, props.todoListId, props.task.id]);

  const onChangeCheckedHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      // Функция-обработчик для вызова callback-функции изменения чекеда
      let newStatusValue = e.currentTarget.checked;
      props.changeChecked(props.todoListId, props.task.id, newStatusValue ? TaskStatuses.Completed : TaskStatuses.New);
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
    <li className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
      <Checkbox
        disabled={props.entityStatus === 'loading'}
        color={'success'}
        checked={props.task.status === TaskStatuses.Completed}
        onChange={onChangeCheckedHandler}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <EditableSpan
        title={props.task.title}
        onChange={(title) => onChangeTitleHandler(title)}
        disabled={props.entityStatus === 'loading'}
      />
      <IconButton onClick={onclickHandler} aria-label="delete" disabled={props.entityStatus === 'loading'}>
        <Delete />
      </IconButton>
    </li>
  );
});

export default Task;
