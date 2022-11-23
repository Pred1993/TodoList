import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Send } from '@mui/icons-material';

export type AddItemFormsPropsType = {
  callBack: (title: string) => void;
  disabled?: boolean;
};
const AddItemForms = React.memo((props: AddItemFormsPropsType) => {
  console.log('AddItemForms is called');
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const onChangeHandlerTitle = (e: ChangeEvent<HTMLInputElement>) => {

    setTitle(e.currentTarget.value);
  };
  const onKeyPressHandlerEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.key === 'Enter') {
      onClickHandlerAddTask();
    }
  };
  //
  const onClickHandlerAddTask = () => {
    if (title.trim() === '') {
      setError('Title is required');
      let clearSpace = '';
      setTitle(clearSpace.trim());
      return;
    }
    props.callBack(title.trim());
    setTitle('');
  };

  return (
    <div>
      <TextField
        disabled={props.disabled}
        error={!!error}
        value={title}
        onChange={onChangeHandlerTitle}
        onKeyPress={onKeyPressHandlerEnter}
        id="outlined-basic"
        label="Type value"
        variant="outlined"
        helperText={error}
        size={'small'}
      />
      <Button
        style={{ maxHeight: '70px' }}
        onClick={onClickHandlerAddTask}
        variant="contained"
        endIcon={<Send />}
        disabled={props.disabled}
      >
        Add
      </Button>
    </div>
  );
});

export default AddItemForms;
