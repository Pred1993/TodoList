import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type AddItemFormsPropsType = {
    callBack: (title: string) => void
}
const AddItemForms = (props: AddItemFormsPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onChangeHandlerTitle = (e: ChangeEvent<HTMLInputElement>) => { // Функция-обработчик для изменения title из импута в стейте
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandlerEnter = (e: KeyboardEvent<HTMLInputElement>) => { // Функция-обработчик для вызова callback-функции добавления новых тасок при помощи нажатия клавиши Enter
        setError(null)
        if (e.key === 'Enter') {
            onClickHandlerAddTask()
        }
    }
    //
    const onClickHandlerAddTask = () => { // Функция-обработчик для вызова callback-функции добавления новых тасок
        if (title.trim() === "") {
            setError('Title is required')
            return
        }
        props.callBack(title.trim())
        setTitle('')
    }

    return (
        <div>
            <input
                className={error ? 'error' : ''}
                value={title}
                onChange={onChangeHandlerTitle}
                onKeyPress={onKeyPressHandlerEnter}
            />
            <button onClick={onClickHandlerAddTask}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};

export default AddItemForms;