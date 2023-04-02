import {AddTask} from "@mui/icons-material";
import {IconButton, TextField} from "@mui/material";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (itemTitle: string) => void
}
export const AddItemForm: React.FC<AddItemFormPropsType> = ({addItem}) => {
    console.log('AddItemForm')
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onClickHandler = () => {
        if (taskTitle.trim() !== "") {
            addItem(taskTitle)
            setTaskTitle('')
        } else {
            setError('Title is required!')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTaskTitle(e.currentTarget.value.trim())
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.code === "Enter") {
            onClickHandler()
        } else {
            setError('Title is required!')
        }
    }
    return <div style={{padding: "10px"}}>
        <TextField
            label="Title"
            size="small"
            color={"secondary"}
            error={!!error}
            helperText={error}
            value={taskTitle}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
        />
        <IconButton color={'secondary'} onClick={onClickHandler}>
            <AddTask/>
        </IconButton>
    </div>
}