import {Input} from "@mui/material";
import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    className?: string
    title: string
    setNewTitle: (newTitle: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    console.log('EditableSpan')
    const [editMode, setEditMode] = useState<boolean>(false)

    const openEditMode = () => setEditMode(!editMode)
    const openViewMode = () => setEditMode(!editMode)
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        props.setNewTitle(e.currentTarget.value)
    }
    return editMode
        ? <Input
            value={props.title}
            size="small"
            onChange={onChangeTitle}
            onBlur={openViewMode}/>
        : <span className={props.className} onDoubleClick={openEditMode}>{props.title}</span>
}