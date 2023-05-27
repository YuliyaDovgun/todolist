import React, {memo, useCallback} from "react";
import s from "./Todolist.module.css";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import {taskType} from "../App";

type TaskPropsType = {
    task: taskType
    todoListId: string
}
export const Task: React.FC<TaskPropsType> = memo(({task, todoListId}) => {
    const classNameIsDone = task.isDone ? s.isDone : ""
    const dispatch = useDispatch()


    const onClickButtonHandler = () => {
        dispatch(removeTaskAC(task.id, todoListId))
    }
    const onClickInputHandler = () => {
        dispatch(changeTaskStatusAC(task.id, !task.isDone, todoListId))
    }
    const setNewTaskTitle = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(task.id, newTitle, todoListId))
    }, [])

    return <div key={task.id}>
        <Checkbox checked={task.isDone} onClick={onClickInputHandler} color="secondary"/>
        <EditableSpan className={classNameIsDone} title={task.title} setNewTitle={setNewTaskTitle}/>
        <IconButton color={'secondary'} onClick={onClickButtonHandler}>
            <DeleteTwoToneIcon/>
        </IconButton>
    </div>
})