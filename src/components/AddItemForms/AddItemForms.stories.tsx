import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import AddItemForms from './AddItemForms';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForms,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    addItem: {
      description: 'callback',
    },
  },
} as ComponentMeta<typeof AddItemForms>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddItemForms> = (args) => <AddItemForms {...args} />;

export const AddItemFormsStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormsStory.args = {
  callBack: action('Clicked form inside form'),
};
