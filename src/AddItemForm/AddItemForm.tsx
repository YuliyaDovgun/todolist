import {AddTask} from "@mui/icons-material";
import {IconButton, TextField} from "@mui/material";
import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";

type AddItemFormPropsType = {
    addItem: (itemTitle: string) => void
    disabled?: boolean
}
export const AddItemForm: React.FC<AddItemFormPropsType> = memo(({addItem, disabled}) => {
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
        if(error) setError(null)
        setTaskTitle(e.currentTarget.value.trim())
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error) setError(null)
        if (e.code === "Enter") {
            onClickHandler()
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
            disabled={disabled}
        />
        <IconButton color={'secondary'} onClick={onClickHandler} disabled={disabled}>
            <AddTask/>
        </IconButton>
    </div>
})