import {Input} from "@mui/material";
import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    className?: string
    title: string
    setNewTitle: (newTitle: string) => void
    disabled?: boolean
}
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const openEditMode = () => {
        if(props.disabled) return
        setEditMode(true)
        setTitle(props.title)
    }
    const openViewMode = () => {
        setEditMode(false)
        props.setNewTitle(title)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return editMode
        ? <Input
            value={title}
            size="small"
            onChange={onChangeTitle}
            onBlur={openViewMode}/>
        : <span className={props.className} onDoubleClick={openEditMode}>{props.title}</span>
})