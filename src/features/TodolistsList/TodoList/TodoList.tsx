import React, {useCallback, useEffect} from 'react';
import '../../../app/App.css';
import AddItemForms from '../../../components/AddItemForms/AddItemForms';
import EditableSpan from '../../../components/EditableSpan/EditableSpan';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import Task from './Task/Task';
import {TaskDomainType, TaskStatuses} from '../../../api/todolist-api';
import {FilterType, TodoListDomainType} from '../todolist-reducer';
import {useDispatch} from 'react-redux';
import {fetchTasksTС} from '../tasks-reducer';

type TodoListPropsType = {
  todoList: TodoListDomainType;
  tasks: Array<TaskDomainType>;
  removeTasks: (todoListId: string, taskId: string) => void;
  changeFilter: (todoListId: string, filter: FilterType) => void;
  addTask: (todoListId: string, title: string) => void;
  changeChecked: (todoListId: string, taskId: string, status: TaskStatuses) => void;
  removeTodoList: (todoListId: string) => void;
  changeTaskTitle: (todoListId: string, taskId: string, title: string) => void;
  changeTitleTodoList: (todoListId: string, title: string) => void;
  demo?: boolean;
};
export const TodoList = React.memo(({demo = false, ...props}: TodoListPropsType) => {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    if (demo) {
      return;
    }
    dispatch(fetchTasksTС(props.todoList.id));
  }, []);

  let changeTasks = props.tasks;
  if (props.todoList.filter === 'completed') {
    changeTasks = props.tasks.filter((t) => t.status === TaskStatuses.Completed);
  }
  if (props.todoList.filter === 'active') {
    changeTasks = props.tasks.filter((t) => t.status === TaskStatuses.New);
  }

  const reactTodolist = changeTasks.map((t) => {
    return (
      <Task
        entityStatus={props.todoList.entityStatus}
        key={t.id}
        task={t}
        removeTasks={props.removeTasks}
        todoListId={props.todoList.id}
        changeChecked={props.changeChecked}
        changeTaskTitle={props.changeTaskTitle}
      />
    );
  });
  //

  const onClickHandlerAll = useCallback(() => {
    props.changeFilter(props.todoList.id, 'all');
  }, [props.changeFilter, props.todoList.id]);

  const onClickHandlerCompleted = useCallback(() => {
    props.changeFilter(props.todoList.id, 'completed');
  }, [props.changeFilter, props.todoList.id]);

  const onClickHandlerActive = useCallback(() => {
    props.changeFilter(props.todoList.id, 'active');
  }, [props.changeFilter, props.todoList.id]);

  const onclickHandlerRemoveTodoList = () => {
    props.removeTodoList(props.todoList.id);
  };

  const addTask = useCallback(
    (title: string) => {
      props.addTask(props.todoList.id, title);
    },
    [props.addTask, props.todoList.id],
  );

  const onChangeTitleTodolistHandler = useCallback(
    (title: string) => {
      props.changeTitleTodoList(props.todoList.id, title);
    },
    [props.changeTitleTodoList, props.todoList.id],
  );
  return (
    <div>
      <h3>
        <EditableSpan
          title={props.todoList.title}
          onChange={onChangeTitleTodolistHandler}
          disabled={props.todoList.entityStatus === 'loading'}
        />
        <IconButton
          onClick={onclickHandlerRemoveTodoList}
          aria-label="delete"
          disabled={props.todoList.entityStatus === 'loading'}
        >
          <Delete/>
        </IconButton>
      </h3>
      <div>
        <AddItemForms callBack={addTask} disabled={props.todoList.entityStatus === 'loading'}/>
      </div>
      <ul>{reactTodolist}</ul>
      <div>
        <Button variant={props.todoList.filter === 'all' ? 'contained' : 'text'} onClick={onClickHandlerAll}>
          All
        </Button>
        <Button
          variant={props.todoList.filter === 'completed' ? 'contained' : 'text'}
          color="success"
          onClick={onClickHandlerCompleted}
        >
          Completed
        </Button>
        <Button
          variant={props.todoList.filter === 'active' ? 'contained' : 'text'}
          color={'secondary'}
          onClick={onClickHandlerActive}
        >
          Active
        </Button>
      </div>
    </div>
  );
});
