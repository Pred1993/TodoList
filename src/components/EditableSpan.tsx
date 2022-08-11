import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";
export type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
}
const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan is added')
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
        ? <TextField onBlur={onBlurHandler} onChange={onChangeHandler} type="text" value={title} autoFocus
                   id="outlined-basic"
                   variant="standard"
        />
        : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
});

export default EditableSpan;
