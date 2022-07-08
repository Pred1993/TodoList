import React, {ChangeEvent, useState} from 'react';
export type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
}
const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onBlurHandler = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onDoubleClickHandler = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    return editMode
        ? <input onBlur={onBlurHandler} onChange={onChangeHandler} type="text" value={title} autoFocus/>
        : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
};

export default EditableSpan;
