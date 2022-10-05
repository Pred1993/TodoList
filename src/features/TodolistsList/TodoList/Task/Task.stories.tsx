import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Task from './Task';
import { TaskPriorities, TaskStatuses } from '../../../../api/todolist-api';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/Task',
  component: Task,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // addItem: {
    //   description: 'callback'
    // }
  },
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStory.args = {
  changeChecked: action('Change TaskStatus'),
  changeTaskTitle: action('Change TaskTitle'),
  removeTasks: action('removeTask'),
  task: {
    id: 'qwer',
    title: 'JS',
    status: TaskStatuses.Completed,
    todoListId: '1111',
    description: '',
    order: 0,
    priority: TaskPriorities.Low,
    addedDate: '',
    deadline: '',
    startDate: '',
  },
  todoListId: '1111',
};
export const TaskIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDoneStory.args = {
  changeChecked: action('Change TaskStatus'),
  changeTaskTitle: action('Change TaskTitle'),
  removeTasks: action('removeTask'),
  task: {
    id: 'qwerdawdawd',
    title: 'HTML',
    status: TaskStatuses.New,
    todoListId: '1111',
    description: '',
    order: 0,
    priority: TaskPriorities.Low,
    addedDate: '',
    deadline: '',
    startDate: '',
  },
  todoListId: '1111',
};
