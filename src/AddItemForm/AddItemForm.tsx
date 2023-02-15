import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "../Todolist/Todolist.module.css";

type AddItemFormPropsType = {
    addItem: (itemTitle: string) => void
}
export const AddItemForm: React.FC<AddItemFormPropsType> = ({addItem}) => {

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
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value.trim())
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.code === "Enter" && e.currentTarget.value.trim() !== "") {
            onClickHandler()
        } else {
            setError('Title is required!')
        }
    }

    return <div>
        <input className={error ? s.input : ""} value={taskTitle} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
        <button onClick={onClickHandler}>+</button>
        {error && <div className={error ? s.error : ""}>{error}</div>}
    </div>
}