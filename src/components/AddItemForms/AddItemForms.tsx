import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Send } from '@mui/icons-material';

export type AddItemFormsPropsType = {
  callBack: (title: string) => void;
};
const AddItemForms = React.memo((props: AddItemFormsPropsType) => {
  console.log('AddItemForms is called');
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const onChangeHandlerTitle = (e: ChangeEvent<HTMLInputElement>) => {
    // Функция-обработчик для изменения title из импута в стейте
    setTitle(e.currentTarget.value);
  };
  const onKeyPressHandlerEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    // Функция-обработчик для вызова callback-функции добавления новых тасок при помощи нажатия клавиши Enter
    if (error !== null) {
      setError(null);
    }
    if (e.key === 'Enter') {
      onClickHandlerAddTask();
    }
  };
  //
  const onClickHandlerAddTask = () => {
    // Функция-обработчик для вызова callback-функции добавления новых тасок
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
      <Button style={{ maxHeight: '70px' }} onClick={onClickHandlerAddTask} variant="contained" endIcon={<Send />}>
        Add
      </Button>
    </div>
  );
});

export default AddItemForms;